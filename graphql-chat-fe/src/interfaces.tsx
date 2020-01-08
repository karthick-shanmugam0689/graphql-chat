export interface IUser {
    id: string
    name: string
    profilePicture: string
    chatHistory: Array<IChatHistory>
}

export interface IChatHistory {
    id: string
    users: Array<IUser>
    chats: Array<IChat>
    chattingUsers?: Array<IUser>
}

export interface IChat {
    id: string
    sender: IUser
    message: string
    createdDate: string
}