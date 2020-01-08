import styled from 'styled-components'

export const LoginSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;

    .flex-item {
        width: 500px;
        margin-bottom: 20px;

        input {
            width: 100%;
            height: 50px;
            font-size: 30px;
            text-align: center;
        }

        button {
            width: 100%;
            height: 40px;
            background-color: green;
            font-size: 20px;
            letter-spacing: 2px;
        }

    }
`