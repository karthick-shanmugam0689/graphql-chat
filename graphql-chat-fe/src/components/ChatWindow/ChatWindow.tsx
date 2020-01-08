import React, { useState, useEffect } from 'react'
import { IProps } from './interfaces.ChatWindow'
import { Chatter } from './styles.ChatWindow'
import { IChatHistory, IUser } from '../../interfaces'
import { getLoginUser } from '../../utilities/loginConfig'
import { CHAT_HISTORY_SUBSCRIPTION } from '../../queries/chat'
import { useSubscription } from '@apollo/react-hooks'
import ChatBlock from '../ChatBlock/ChatBlock'
import ChatInput from '../ChatInput/ChatInput'

const ChatWindow = (props: IProps) => {

    const { chattingUser } = props

    const userId = getLoginUser()
    //const [isOtherUserTyping, setIsOtherUserTyping] = useState(false)
    const [chatHistoryFromState, setChatHistoryFromState] = useState<IChatHistory | undefined>()

    const { data: subscription } = useSubscription(
        CHAT_HISTORY_SUBSCRIPTION,
        {
            shouldResubscribe: true,
            variables: {
                filter: {
                    mutation_in: ["CREATED"],
                    node: {
                        users_some: {
                            id_in: [userId, chattingUser.id],
                        }
                    }
                },
            },
        }
    )

    useEffect(
        () => {
            if(subscription && subscription.chatHistory) {
                setChatHistoryFromState(subscription.chatHistory.node)
            }
        },
        [subscription]
    )

    useEffect(
        () => {
          if(chattingUser && chattingUser.id) {
            const chatHistoryList = (chattingUser && chattingUser.chatHistory.filter((eachHistory: IChatHistory) =>
                eachHistory.users.filter((eachUser: IUser) => eachUser.id === userId)
            )) || []

            const chatHistory = (chatHistoryList && chatHistoryList.length && chatHistoryList[0]) || null
            if(chatHistory) {
                setChatHistoryFromState(chatHistory)
            }
          }
        },
        [chattingUser]
    )

    const setChatHistoryFromBlock = (chatHistoryFromBlock: IChatHistory) => {
        setChatHistoryFromState(chatHistoryFromBlock)
    }

    return (
        <Chatter>
            <div className="up-arrow"/>
            <div className="chat-body ">
                {
                    chatHistoryFromState && (
                        <ChatBlock chatHistory={chatHistoryFromState} chattingUser={chattingUser} updateChatHistory={setChatHistoryFromBlock}/>
                    )
                }
                <ChatInput chatHistory={chatHistoryFromState} chattingUser={chattingUser} setChatHistoryFromParent={setChatHistoryFromBlock}/>
            </div>
        </Chatter>
    )
}

export default ChatWindow