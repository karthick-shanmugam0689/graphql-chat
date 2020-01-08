import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks'
import {LoginSection, LoginForm} from './styles.LoginPage'
import { SET_USER_MUTATION } from '../../queries/user'
import { setLoginUser } from '../../utilities/loginConfig'
import { IProps } from './interfaces.LoginPage'
import { getPhotoURL } from '../../utilities/genericUtils'

const LoginPage = (props: IProps) => {
    
    const [userName, setUserName] = useState('')
    const [setUser] = useMutation(SET_USER_MUTATION)

    const { refetchUser } = props

    const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault()
            const { data } = await setUser({
                variables: {
                    input: {
                        name: userName,
                        profilePicture: getPhotoURL(),
                    }
                },
            })
            const {createUser} = data
            if(createUser) {
                const {id} = createUser
                setLoginUser(id)
                refetchUser(
                    {
                        filter: {
                            id,
                        },
                    },
                )
            }
        } catch(ex) {
            alert(ex)
        }
    }

    return (
        <LoginSection>
            <LoginForm>
                <form onSubmit={handleSubmit}>
                    <div className="flex-item">
                        <input type="text" value={userName} onChange={handleInputUserName} placeholder="How do you like to be called"/>
                    </div>
                    {
                        userName && (
                            <div className="flex-item">
                                <button type="submit">
                                    Submit
                                </button>
                            </div>
                        )
                    }
                </form>
            </LoginForm>
        </LoginSection>
    )
}

export default LoginPage