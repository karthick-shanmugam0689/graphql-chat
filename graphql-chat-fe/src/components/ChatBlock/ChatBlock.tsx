import React, { useEffect, RefObject, useRef } from 'react'
import { IProps } from './interface.ChatBlock'
import { IChat } from '../../interfaces'
import Chat from '../Chat/Chat'
import { getLoginUser } from '../../utilities/loginConfig'
import { CHAT_SUBSCRIPTION } from '../../queries/chat'
import { useSubscription } from '@apollo/react-hooks'

const ChatBlock = (props: IProps) => {

    const { chatHistory, chattingUser, updateChatHistory } = props

    let messageEndRef: RefObject<HTMLDivElement> = useRef(null)

    const userId = getLoginUser()

    const { data: subscription } = useSubscription(
        CHAT_SUBSCRIPTION,
        {
            shouldResubscribe: true,
            variables: {
                filter: {
                    mutation_in: ["CREATED"],
                    node: {
                        chatHistoryId: {
                            id: chatHistory.id,
                        },
                    },
                },
            },
        }
    )

    useEffect(
        () => {
            if(subscription && subscription.chat && subscription.chat.node.sender.id !== userId) {
                const clonedChatHistory = JSON.parse(JSON.stringify(chatHistory))
                clonedChatHistory.chats.push(subscription.chat.node)
                updateChatHistory(clonedChatHistory)
            }
        },
        [subscription]
    )

    useEffect(
        () => {
          if(chatHistory && chatHistory.id && 
                messageEndRef && messageEndRef.current && messageEndRef.current.parentElement) {
            messageEndRef.current.parentElement.scrollTo(
                {
                    top: messageEndRef.current.offsetTop,
                    behavior: "smooth"
                }
            )
          }
        },
        [chatHistory, messageEndRef]
    )

    return (
        <div className="chat-section">
            {
                chatHistory && chatHistory.chats && 
                chatHistory.chats.length > 0 && chatHistory.chats.map((chat: IChat, index: number) =>{
                    return (
                        <Chat 
                            chat={chat} 
                            isMeSender={chat.sender.id === userId}
                            key={index}
                        />
                    )
                })
            }
            <div ref={messageEndRef}></div>
        </div>
    )
}

export default ChatBlock