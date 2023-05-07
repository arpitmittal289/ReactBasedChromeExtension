import React, { useState, useEffect , useRef} from "react";
import sendicon from '.././images/sendicon.svg';
import { GetDefaultMessages, GetPromptResponseMessage } from "./Utils";
import { animateScroll } from "react-scroll";

function ChatInterface() {

    //Message List to store All messages
    const [messageList, setMessageList] = useState([]);

    // String Variable to store dynamic textBox change
    const [newMessage, setNewMessage] = useState('');

    // Update newMessage variable onChange 
    function onChangeDynamicMessageInput(event) {
        setNewMessage(event.target.value);
    };

    // Send User Message to server, and get the Response from API and display them to User
    function sendMessage() {
        if (!newMessage) {
            return;
        }
        appendMessageToList(newMessage, true)
        let respose = GetPromptResponseMessage(newMessage)
        appendMessageToList(respose.content, respose.sent)
        setNewMessage('');
        setTimeout(() => {
            scrollToBottom()
          }, 0);
          
        
    };

    // helper function to append new Message to Message List
    function appendMessageToList(message,isSent) {
        setMessageList(messageList => {
            return [...messageList, { content: message, sent: isSent }];
        });

    };

    // Async Call for SIde code to get Default Starter Message to Greet User
    useEffect(() => {
        async function getData() {
            const defaultMessages = await GetDefaultMessages();
            setMessageList(defaultMessages)
        }

        getData();

    }, [])

    // Scroll to Bottom of messsage List
    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
          containerId: "messageBox"
        });
    }

    
    return (
        <div className="chatinterface">
            <div className="roomName">
                <h1>R2D2 Project</h1>
            </div>
            <div id="messageBox" className="messages">
                {messageList.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sent ? 'sent' : 'received'}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={onChangeDynamicMessageInput}
                />
                <button onClick={sendMessage}>
                    <img src={sendicon} alt="Send" />
                </button>
            </div>
        </div>
    );
}

export default ChatInterface;