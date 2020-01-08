import { gql } from 'apollo-boost'

export const SET_USER_MUTATION = gql `
    mutation($input: UserCreateInput!) {
        createUser(data: $input) {
            id
        }
    }
`

export const GET_USERS = gql `
    query($filter: UserWhereInput!) {
        users(where: $filter) {
            id
            name
            profilePicture
        }
    }
`

export const USER_SUBSCRIPTION = gql`
    subscription($filter: UserSubscriptionWhereInput) {
        user(where: $filter) {
            mutation
            node {
                id
                name
                profilePicture
            }
        }
    }
`

export const GET_USERS_CHAT_HISTORY = gql`
    query($filter: UserWhereInput!, $chatFilter: ChatHistoryWhereInput) {
        users(where: $filter) {
            id
            name
            profilePicture
            chatHistory(where: $chatFilter) {
                id
                users {
                    id
                }
                chats {
                    id
                    sender {
                        id
                        name
                        profilePicture
                    }
                    message
                    createdDate
                }
                chattingUsers {
                    id
                    name
                }
            }
        }
    }
`