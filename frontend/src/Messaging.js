import React, { useEffect, useState } from 'react';
import { fbMessaging } from './firebaseInit';
import { storeMessage, getChat } from './services/messaging-service';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });


export const Messaging = () => {


    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([])
    const [divMessages, setDivMessages] = useState(React.createRef());


    /*  AUDIO  */
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    /*  AUDIO  */




    const [inputMsg, setInputMsg] = useState(React.createRef());

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



    /* AUDIO */
    const start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                }).catch((e) => console.error(e));
        }
    };


    const stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)

                setBlobURL(blobURL);
                setIsRecording(false);
            }).catch((e) => console.log(e));
    };
    /* AUDIO */




    useEffect(() => {

        const tkn = sessionStorage.getItem('tkn');
        getChat(tkn).then(r => {
            setChat(r.data || [])
            scrollToBottom();
            inputMsg.current.focus();
        })

        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                setIsBlocked(false);
            },
            () => {
                console.log('Permission Denied');
                setIsBlocked(true);
            },
        );




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
                        <div className={"row"}>
                            <div className={"col-10"} >
                                <input ref={inputMsg} className={"form-control"} onChange={msgHandle} value={msg} placeholder="Type a message" />
                            </div>
                            <div className={"col-1"} >
                                <input className={"btn btn-primary"} type="submit" value="Send" />
                            </div>
                            <div className={"col-1"} >
                                <input className={"btn btn-primary"} type="button" value="Record" />
                            </div>
                        </div>

                    </form>

                    <div>
                        <button onClick={start} disabled={isRecording}>Record</button>
                        <button onClick={stop} disabled={!isRecording}>Stop</button>
                        <audio src={blobURL} controls="controls" />
                    </div>


                </div>
            </div>

        </div>
    )

}
