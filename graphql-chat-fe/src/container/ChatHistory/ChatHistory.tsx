import React from 'react'
import { IProps } from './interface.ChatHistory'
import ChatListHeader from '../../components/ChatListHeader/ChatListHeader'
import ChatParticipants from '../../components/ChatParticipants/ChatParticipants'

const ChatHistory = (props: IProps) => {

    const { user } = props

    const { name, profilePicture } = user

    return (
        <div>
            <ChatListHeader
                userName={name}
                profilePicture={profilePicture}
            />
            <ChatParticipants/>
        </div>
    )
}

export default ChatHistory