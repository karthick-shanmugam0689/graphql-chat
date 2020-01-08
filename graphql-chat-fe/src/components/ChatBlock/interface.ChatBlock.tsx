import { IChatHistory, IUser } from "../../interfaces";

export interface IProps {
    chatHistory: IChatHistory
    chattingUser: IUser
    updateChatHistory?: any
}