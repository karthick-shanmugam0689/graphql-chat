import React from 'react'
import { Header } from './styles.ChatListHeader'
import { IProps } from './interface.ChatListHeader'
import Avatar from '../Avatar/Avatar'

const ChatListHeader = (props: IProps) => {

    const {userName, profilePicture} = props

    return (
        <Header>
            <div className="flex-item">
                Welcome, {userName}
            </div>
            <div className="flex-item">
                <Avatar photoURL={profilePicture}/>
            </div>
        </Header>
    )

}

export default ChatListHeader