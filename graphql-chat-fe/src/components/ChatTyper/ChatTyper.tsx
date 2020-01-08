import React, { useState, useEffect } from 'react'
import { IProps } from './interface.ChatTyper'
import { useSubscription } from '@apollo/react-hooks'
import { CHAT_HISTORY_SUBSCRIPTION } from '../../queries/chat'
import { getLoginUser } from '../../utilities/loginConfig'
import { IUser } from '../../interfaces'

const ChatTyper = (props: IProps) => {

    const { chatHistory, chattingUser, setChatHistory } = props
    const userId = getLoginUser()

    const [isOtherUserTyping, setIsOtherUserTyping] = useState(false)

    const { data: subscription } = useSubscription(
        CHAT_HISTORY_SUBSCRIPTION,
        {
            shouldResubscribe: true,
            variables: {
                filter: {
                    mutation_in: ["UPDATED"],
                    updatedFields_contains_some: "chattingUsers"
                },
            },
        }
    )

    useEffect(
        () => {
          if(subscription && subscription.chatHistory) {
            setChatHistory(subscription.chatHistory.node)
          }
        },
        [subscription]
    )

    useEffect(
        () => {
          if(chatHistory && chatHistory.chattingUsers) {
            const chatUsers = (chatHistory && chatHistory.chattingUsers.filter((eachUser: IUser) =>
                eachUser.id !== userId
            )) || []

            setIsOtherUserTyping(chatUsers && chatUsers.length > 0)
          }
        },
        [chatHistory]
    )

    return (
        <>
            {
                isOtherUserTyping && (
                    <div className="chat-in-progress">
                        {
                            `${chattingUser.name} is typing`
                        }
                    </div>
                )
            }
        </>
    )
}

export default ChatTyper