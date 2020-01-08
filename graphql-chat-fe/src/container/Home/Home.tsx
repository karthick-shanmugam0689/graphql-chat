import React from 'react'
import { GET_USERS } from '../../queries/user'
import { useQuery } from '@apollo/react-hooks'
import ChatHistory from '../ChatHistory/ChatHistory'
import LoginPage from '../LoginPage/LoginPage'
import { getLoginUser } from '../../utilities/loginConfig'

const Home = () => {

    const userId = getLoginUser()

    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: {
            filter: {
                id: userId,
            },
        },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    
    return (
        <>
            {
                data && data.users && data.users.length > 0 && (
                    <ChatHistory user={data.users[0]}/>
                )
            }
            {
                (!userId || !data || !data.users || data.users.length <= 0) && (
                    <LoginPage refetchUser={refetch}/>
                )
            }
        </>
    )
}

export default Home