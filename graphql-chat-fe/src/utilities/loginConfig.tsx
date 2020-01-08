import { LOGIN_USER_SESSION_STORAGE_ID } from "../constants/authConstants"

export const getLoginUser = () => {
    return sessionStorage.getItem(LOGIN_USER_SESSION_STORAGE_ID)
}

export const setLoginUser = (loginUserId: string) => {
    sessionStorage.setItem(LOGIN_USER_SESSION_STORAGE_ID, loginUserId)
}