import { useState, useEffect } from 'react';

// to be Set False, When we have Working APIs
const getDummyResponse = true;

// Example UPIS, to be changed later
const getDefaultMessageUP = "www.example.dummyupi.com/toBeReplacedWithActualDefaultApi"
const getPromptResponseUPI = "www.example.dummyupi.com/toBeReplacedWithActualPromptApi"

// Util Function to get Start Messages For User
export function GetDefaultMessages(){
    if (getDummyResponse){
        return GetDefaultJsonMessage()
    }
    else{
        return GetDefaultMessageFromAPI()
    }
};

// Util Function to get Response Prompt Message
export function GetPromptResponseMessage(message){
    if (getDummyResponse){
        return GetPromptResponseJsonMessage()
    }
    else{
        return GetPromptResponseMessageFromAPI()
    }
};

// Dummy JSON Starter Message
function GetDefaultJsonMessage(){
    return [{content: "Welcome to R2D2!", sent: false},{content: "Please write your prompt below, and we will give you suggestions for the possible replies", sent: false}]
};

// Dummy JSON Prompt Message
function GetPromptResponseJsonMessage(){
    return {content: "This is a Dummy Response which can be used", sent: false}
};

// Starter Message tp be populated from APIs which gives us default Message
function GetDefaultMessageFromAPI(){
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(getDefaultMessageUP)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        }, []);

        return data;
};

// Prompt Response Message to be populated from APIs - probably using AI Services, which gives us default Message
function GetPromptResponseMessageFromAPI(){
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(getPromptResponseUPI)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        }, []);

        return data;
};