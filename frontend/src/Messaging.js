import React, { useEffect, useState } from 'react';
import { fbMessaging } from './firebaseInit';
import { storeMessage, getChat } from './services/messaging-service';

export const Messaging = () => {

    fbMessaging.onMessage(payload => {
        //console.log(payload.notification.body);
        const tkn = sessionStorage.getItem('tkn');
        const m = payload.notification.body;

        storeMessage(tkn, "app", m).then(r => {
            console.log(r.data);
            setChat(r.data)
        })

    })

    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([])

    const msgHandle = (e) => {
        setMsg(e.target.value);

    }
    const sendMessage = () => {
        const tkn = sessionStorage.getItem('tkn');
        storeMessage(tkn, "George", msg).then(r => {
            console.log(r.data);
            setChat(r.data)
        })

    }


    useEffect(() => {

        const tkn = sessionStorage.getItem('tkn');

        getChat(tkn).then(r => {
            setChat(r.data)
        })


    }, [])


    return (
        <div>
            <h1>Voice Chat - George</h1>
            <div className={"container"}>
                <div>


                    {chat.map(i => {
                        return (
                            <div key={i.date} className={"row"} >
                                <div className={i.from === "app" ? "col d-flex align-items-start" : "col d-flex justify-content-end"} data-toggle="tooltip" data-placement="top" title={`Sent at ${i.date} by ${i.from}`}  >
                                    <div className={i.from === "app" ? "alert alert-primary" : "alert alert-success"}  >{i.message} </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <input onChange={msgHandle} /> <input type="submit" value="Ok" onClick={sendMessage} />
            </div>


        </div>
    )

}
