import React from 'react'
import { IProps } from './interface.ParticipantPanel'
import { Participant } from './styles.ParticipantPanel'
import Avatar from '../Avatar/Avatar'

const ParticipantPanel = (props: IProps) => {

    const { user, toggleShowChatter } = props

    const handleShowChatter = (event: React.MouseEvent) => {
        event.preventDefault()
        toggleShowChatter()
    }

    return (
        <Participant onClick={handleShowChatter}>
            <Avatar photoURL={user.profilePicture}/>
            <div className="flex-item">
                {user.name}
            </div>
        </Participant>
    )
}

export default ParticipantPanel