import React, { useState, useEffect } from 'react'
import { IProps } from './interface.ChatInput'
import { useMutation } from '@apollo/react-hooks'
import { SET_CHAT_HISTORY, CREATE_CHAT, UPDATE_CHAT_HISTORY } from '../../queries/chat'
import { getLoginUser } from '../../utilities/loginConfig'
import ChatTyper from '../ChatTyper/ChatTyper'

const ChatInput = (props: IProps) => {

    const { chatHistory, chattingUser, setChatHistoryFromParent } = props
    const userId = getLoginUser()

    const [chatMessage, setChatMessage] = useState('')

    const [setChatHistory] = useMutation(SET_CHAT_HISTORY)
    const [setCreateChat] = useMutation(CREATE_CHAT)
    const [updateChatHistoryMutation] = useMutation(UPDATE_CHAT_HISTORY)

    const updateChatHistoryForTyping = async (message: String) => {
        if(chatHistory && chatHistory.id) {
            const { data } = await updateChatHistoryMutation({
                variables: {
                    input: {
                        chattingUsers: {
                            [(message && 'connect') || 'disconnect']: [
                                {
                                    id: userId,
                                }
                            ]
                        },
                    },
                    filter: {
                        id: chatHistory.id
                    }
                }
            })
            const { updateChatHistory } = data
            if(updateChatHistory) {
                setChatHistoryFromParent(updateChatHistory)
            }
        }
    }

    const handleChatMessageInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const myMessage = event.target.value
        setChatMessage(myMessage)
        updateChatHistoryForTyping(myMessage)
    }

    const handleSendMessage = async (event: React.MouseEvent) => {
        if(!chatHistory || !chatHistory.id) {
            const { data } = await setChatHistory({
                variables: {
                    input: {
                        users: {
                            connect: [
                                {
                                    id: userId,
                                },
                                {
                                    id: chattingUser && chattingUser.id
                                },
                            ]
                        },
                        chats: {
                            create: [
                                {
                                    message: chatMessage,
                                    sender: {
                                        connect: {
                                            id: userId
                                        }
                                    }
                                }
                            ]
                        },
                    }
                },
            })
            const {createChatHistory} = data
            if(createChatHistory) {
                setChatHistoryFromParent(createChatHistory)
            }
            setChatMessage('')
        } else {
            const { data } = await setCreateChat({
                variables: {
                    input: {
                        message: chatMessage,
                        sender: {
                            connect: {
                                id: userId,
                            },
                        },
                        chatHistoryId: {
                            connect: {
                                id: chatHistory.id,
                            }
                        },
                    }
                }
            })
            const { createChat } = data
            if(createChat) {
                const clonedChatHistory = JSON.parse(JSON.stringify(chatHistory))
                clonedChatHistory.chats.push(createChat)
                setChatHistoryFromParent(clonedChatHistory)
            }
            updateChatHistoryForTyping('')
            setChatMessage('')
        }
    }

    return (
        <div className="chat-input">
            <textarea value={chatMessage} onChange={handleChatMessageInput} placeholder={`What do you wish to convey to ${chattingUser.name}`}/>
            {
                chatMessage && (
                    <button onClick={handleSendMessage}>
                        Send
                    </button>
                )
            }
            {
                chatHistory && (
                    <ChatTyper chatHistory={chatHistory} chattingUser={chattingUser} setChatHistory={setChatHistoryFromParent}/>
                )
            }
        </div>
    )
}

export default ChatInput