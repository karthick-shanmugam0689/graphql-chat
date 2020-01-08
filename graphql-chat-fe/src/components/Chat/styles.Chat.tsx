import styled from 'styled-components'

export const ChatBlock = styled.div`
    width: 100%;
    height: 65px;

    .chat {
        width: 49%;
        display: flex;
        justify-content: space-between;

        &.chat-right {
            float: right;
        }

        .message {
            width: 80%;
            border: 1px solid black;
            border-radius: 10px;
        }
    }
`