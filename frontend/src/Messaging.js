import React, { useEffect, useState } from 'react';
import { fbMessaging } from './firebaseInit';
import { storeMessage, getChat } from './services/messaging-service';

export const Messaging = () => {


    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([])
    const [divMessages, setDivMessages] = useState(React.createRef());

    const scrollToBottom = () => {
        divMessages.current.scrollTop = divMessages.current.scrollHeight;
    };


    fbMessaging.onMessage(payload => {

        const tkn = sessionStorage.getItem('tkn');
        const m = payload.notification.body;

        storeMessage(tkn, "app", m).then(r => {
            setChat(r.data)
            scrollToBottom();
        })

    })

    const msgHandle = (e) => {
        setMsg(e.target.value);

    }
    const sendMessage = () => {
        const tkn = sessionStorage.getItem('tkn');
        storeMessage(tkn, "George", msg).then(r => {
            setChat(r.data)
            scrollToBottom();
            setMsg('');
        })

    }




    useEffect(() => {

        const tkn = sessionStorage.getItem('tkn');

        getChat(tkn).then(r => {
            setChat(r.data)
            scrollToBottom();
        })


    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        sendMessage();

    }

    return (
        <div>
            <h1>Voice Chat - George</h1>
            <div className={"container"}>
                <div style={{ width: "600px" }, { height: "600px" }} className={"overflow-auto"} ref={divMessages} >


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

                <div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input className={"form-control"} onChange={msgHandle} value={msg} placeholder="Type a message" /> <input className={"btn btn-primary"} type="submit" value="Send" />
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )

}
