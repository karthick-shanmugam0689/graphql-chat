import { gql } from 'apollo-boost'

export const SET_CHAT_HISTORY = gql`
    mutation($input: ChatHistoryCreateInput!) {
        createChatHistory(data: $input) {
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
`

export const UPDATE_CHAT_HISTORY = gql`
    mutation($filter: ChatHistoryWhereUniqueInput!, $input: ChatHistoryUpdateInput!) {
        updateChatHistory(data: $input, where: $filter) {
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
`

export const CREATE_CHAT = gql`
    mutation($input: ChatCreateInput!) {
        createChat(data: $input) {
            id
            sender {
                id
                name
                profilePicture
            }
            message
            createdDate
        }
    }
`

export const CHAT_SUBSCRIPTION = gql`
    subscription($filter: ChatSubscriptionWhereInput) {
        chat(where: $filter) {
            mutation
            node {
                id
                sender {
                    id
                    name
                    profilePicture
                }
                message
                createdDate
            }
        }
    }
`

export const CHAT_HISTORY_SUBSCRIPTION = gql`
    subscription($filter: ChatHistorySubscriptionWhereInput) {
        chatHistory(where: $filter) {
            mutation
            node {
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