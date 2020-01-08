import React from 'react'
import { IProps } from './interface.Chat'
import { ChatBlock } from './styles.Chat'
import Avatar from '../Avatar/Avatar'

const Chat = (props: IProps) => {

    const { chat, isMeSender } = props

    const { sender, message } = chat

    return (
        <>
            {
                chat && (
                    <ChatBlock>
                        <div className={isMeSender ? 'chat-right chat' : 'chat'}>
                            <Avatar photoURL={sender.profilePicture}/>
                            <div className="message">
                                {message}
                            </div>
                        </div>
                    </ChatBlock>
                )
            }
        </>
    )
}

export default Chat