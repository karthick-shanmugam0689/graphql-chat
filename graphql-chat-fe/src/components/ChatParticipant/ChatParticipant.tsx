import React, { useState } from 'react'
import { IProps } from './interfaces.ChatParticipant'
import ParticipantPanel from '../ParticipantPanel/PartcipantPanel'
import ChatWindow from '../ChatWindow/ChatWindow'

const ChatParticipant = (props: IProps) => {

    const { user } = props
    const [showChatter, setShowChatter] = useState(false)

    const handleShowChatter = () => {
        setShowChatter(!showChatter)
    }

    return (
        <>
            <ParticipantPanel user={user} toggleShowChatter={handleShowChatter}/>
            {
                showChatter && (
                    <ChatWindow chattingUser={user}/>
                )
            }
        </>
    )
}

export default ChatParticipant