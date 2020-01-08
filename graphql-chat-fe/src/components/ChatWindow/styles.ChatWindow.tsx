import styled from 'styled-components'

export const Chatter = styled.div`
    width: 100%;
    height: 500px;
    margin-top: 5px;

    .up-arrow {
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #2f2f2f;
        margin: 0 0 0 6%;
    }

    .chat-body {
        width: 90%;
        height: 400px;
        border: 1px solid black;
        margin: auto;
        border-radius: 10px;
        padding: 30px;

        .chat-section {
            width: 100%;
            height: 320px;
            overflow: auto;
        }

        .chat-input {
            width: 100%
            margin: auto;
            
            textArea {
                border-radius: 10px;
                width: 100%;
                height: 60px;
                font-size: 15px;
            }

            button {
                width: 20%;
                float: right;
                height: 25px;
                background-color: green;
                font-size: 20px;
                letter-spacing: 2px;
            }
        }
    }
`