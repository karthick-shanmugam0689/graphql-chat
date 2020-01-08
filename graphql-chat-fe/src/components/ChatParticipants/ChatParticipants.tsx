import React, { useEffect } from 'react'
import { GET_USERS_CHAT_HISTORY, USER_SUBSCRIPTION } from '../../queries/user'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { getLoginUser } from '../../utilities/loginConfig'
import { IUser } from '../../interfaces'
import ChatParticipant from '../ChatParticipant/ChatParticipant'

const ChatParticipants = () => {

    const userId = getLoginUser()

    const { loading, error, data, refetch } = useQuery(GET_USERS_CHAT_HISTORY, {
        variables: {
            filter: {
                id_not: userId,
            },
            chatFilter: {
                users_some: {
                    id_in: [userId]
                }
            }
        },
    })

    const { data: subscription } = useSubscription(
        USER_SUBSCRIPTION,
        {
            shouldResubscribe: true,
        }
    )

    useEffect(
        () => {
          if(subscription && subscription.user) {
              refetch()
          }
        },
        [subscription]
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    
    return (
        <>
            {
                data && data.users && data.users.length > 0 && data.users.map((eachUser: IUser, index: number) => {
                    return (
                        <ChatParticipant user={eachUser} key={index}/>
                    )
                })
            }
            {
                (!userId || !data || !data.users || data.users.length <= 0) && (
                    <div className="no-users">
                        No users to chat
                    </div>
                )
            }
        </>
    )
}

export default ChatParticipants