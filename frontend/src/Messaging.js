import React, { useEffect, useState } from 'react';
import { fbMessaging } from './firebaseInit';
import { storeMessage } from './services/messaging-service';

export const Messaging = () => {

    fbMessaging.onMessage(payload => {
        console.log(payload.notification.body);
    })

    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([])

    const msgHandle = (e) => {
        setMsg(e.target.value);

    }
    const sendMessage = () => {
        const tkn = sessionStorage.getItem('tkn');
        storeMessage(tkn, "George", msg).then(r => {
            console.log(r);
            setChat(r)
        })

    }


    return (
        <div>
            <h1>Voice Chat - George</h1>
            <div>
                <input onChange={msgHandle} /> <input type="button" value="Ok" onClick={sendMessage} />
            </div>
            <div>
                <pre>
                    {JSON.stringify(chat)}
                </pre>
            </div>

        </div>
    )

}
