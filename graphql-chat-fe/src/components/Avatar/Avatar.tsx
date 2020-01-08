import React from 'react'
import { IProps } from './interface.Avatar'
import { Photo } from './styles.Avatar'

const Avatar = (props: IProps) => {

    const {photoURL} = props

    return (
        <Photo>
            <img src={photoURL} alt="profile of user"/>
        </Photo>
    )

}

export default Avatar