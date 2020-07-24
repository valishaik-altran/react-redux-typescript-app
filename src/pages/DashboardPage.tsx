import React, { useState, useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import GroupIcon from '@material-ui/icons/Group';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SendIcon from '@material-ui/icons/Send';
function Dashboard() {

    const [isJoined, setJoined] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [cameraStatus, setCameraStatus] = useState(false);
    const [micStatus, setMicStatus] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [loggedinUser, setLoggedinUser] = useState('')
    const [curTime, setCurTime] = useState(new Date().toString());

    const [chatMessages, setChatMessages] = useState([])
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        let usr: any = localStorage.getItem('loggedinUser')
        usr = JSON.parse(usr)
        // console.log(usr);

        usr = usr.fname.substring(0, 1) + ' ' + usr.lname.substring(0, 1)
        setLoggedinUser(usr)

        let localUsers: any = localStorage.getItem('users')
        localUsers = JSON.parse(localUsers)
        setUsers(localUsers)
    }, [])
    // ****************************************************************************
    const [isJoined_f, setJoined_f] = useState(false);
    const [isJoined_s, setJoined_s] = useState(false);
    const [isJoined_t, setJoined_t] = useState(false);
    const [meetingTime, setMeetingTime] = useState()
    const [meetingEndTime, setMeetingEndTime] = useState();
    const [newChatMsg, setNewChatMsg] = useState('');

    const capOff = () => {
        let localstream;
        let vid: any = document.getElementById('vid')
        localStorage.removeItem('meeting')

        if (navigator.mediaDevices.getUserMedia !== null) {
            var options = {
                video: true,
                audio: false
            };
            navigator.getUserMedia(options, function (stream) {
                vid.srcObject = stream;
                localstream = stream;
                localstream.getTracks().forEach(x => x.stop());

            }, function (e) {
                console.log("background error : " + e.name);
            });
        }
        vid.pause();
        vid.src = "";
    }

    const get_time_diff = () => {
        var date1 = new Date(meetingTime);
        var date2 = new Date();

        var diff = date2.getTime() - date1.getTime();

        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        setMeetingEndTime(hh + " Hours : " + mm + " Mins : " + ss + " Seconds")
    }

    const handleJoin = (status: boolean) => {
        setJoined(status)
        if (status) {
            localStorage.setItem('meeting', 'true')
            setTimeout(() => {

                handleCameraStatus()
                handleMicStatus()
                // cameraAccess()
            }, 1000);
            setMeetingTime(new Date())
            setMeetingEndTime(false)

            setTimeout(() => {
                setJoined_f(true)
            }, 2000);
            setTimeout(() => {
                setJoined_s(true)
            }, 5000);
            setTimeout(() => {
                setJoined_t(true)
            }, 10000);
        } else {
            capOff()
            handleCameraStatus()
            handleMicStatus()
            setJoined_f(false)
            setJoined_s(false)
            setJoined_t(false)
            get_time_diff()
        }
    }
    window.setInterval(() => {
        setCurTime(new Date().toString().substring(0, 25))
    }, 1000)

    const handleShowParticipants = () => {
        setShowParticipants(!showParticipants)
    }
    const handleCameraStatus = () => {
        let localstream;
        let vid: any = document.getElementById('vid')
        // console.log(cameraStatus)
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                vid.srcObject = stream
                vid.srcObject.getTracks()[0].enabled = !cameraStatus;
            })
            .catch(e => console.log(e));
        setCameraStatus(!cameraStatus)
    }
    const handleMicStatus = () => {
        let localstream;
        let audio: any = document.getElementById('audio')
        // localStorage.removeItem('meeting')
        // console.log(cameraStatus)
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audio.srcObject = stream
                audio.srcObject.getTracks()[0].enabled = !micStatus;
            })
            .catch(e => console.log(e));
        setMicStatus(!micStatus)
    }
    const handleChatWindow = () => {
        setShowChat(!showChat)
    }
    const updateChatMessages = () => {
        // newChatMsg
        let msgs = [...chatMessages]
        if (newChatMsg.trim().length > 0) {
            msgs.push({
                text: newChatMsg,
                time: new Date().toString().substring(0, 21)
            })
            setChatMessages(msgs)
            setNewChatMsg('')
        }

    }
    return (
        <div className="auto-height">
            <div className="new-meeting">
                <div className="meet-left">
                    <CardMedia
                        className="user-card"
                        image={'https://picsum.photos/200/300?random=1'}
                        title="Image title">
                        <div className="user-avatar">
                            <span className="user-avatar-inner">
                                {loggedinUser}
                            </span>
                        </div>
                    </CardMedia>
                    <div className="user-meeting-id">
                        Hi <span>  {JSON.parse(localStorage.getItem('loggedinUser')).fname} </span>, Your meeting ID is
                        <p>
                            <input type="text" readOnly disabled value="674 894 2345" />
                        </p>
                        <p>
                            Share the above meeting number with your friends/colleagues to start the meeting.
                        </p>
                        <p>
                            OR
                        </p>
                        <p>
                            <a href="#">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
                                </span> Send the meeting invive through email</a>
                        </p>
                    </div>
                </div>
                <div className="meet-right">
                    <div className="new-meet">
                        <p className="join-header">Join a meeting</p>
                        <p className="join-header-desc"> Enter meeting number to join a meeting </p>
                        <input type="text" placeholder="Please enter a meeting number" />
                        <button className="join-now btn" onClick={e => (
                            handleJoin(true)
                        )}>Join Meeting</button>
                    </div>
                    <div className="new-meet meeting-info">
                        {/* camera & controls */}
                        {/* Show date & time along with day info <br/> */}
                        <p>
                            {curTime}
                        </p>
                        <CalendarTodayIcon /> You have no upcoming meeting today.
                    </div>
                </div>
            </div>

            {isJoined ?
                <div className="meeting-window pos-ab">

                    <div id="myModal" className="modal">

                        <div className="modal-content">
                            <div className="">
                                <audio id="audio" autoPlay={true} ></audio>
                                <div className="">
                                    <div title="logged user" className="video-wrapper">
                                        <video id="vid" autoPlay={true}></video>
                                    </div>
                                    <div className="controls">
                                        {/* <button className=" join-now btn my-btn" onClick={e => handleJoin(false)}>Record</button> */}
                                        <button title="Participants" className=" join-now btn-icon" onClick={handleShowParticipants}>
                                            <GroupIcon />
                                        </button>
                                        <button title="Chat" onClick={handleChatWindow} className=" join-now btn-icon" >
                                            <ChatBubbleIcon />
                                        </button>


                                        {!micStatus && <button title="Turn On Mic" className=" join-now btn-icon" onClick={handleMicStatus}>
                                            <MicIcon />
                                        </button>}
                                        {micStatus && <button title="Turn Off Mic" className=" join-now btn-icon" onClick={handleMicStatus}>
                                            <MicOffIcon />
                                        </button>}

                                        {!cameraStatus && <button title="Turn On Video" className=" join-now btn-icon" onClick={handleCameraStatus}>
                                            <VideocamIcon />
                                        </button>}
                                        {cameraStatus && <button title="Turn Off Video" className=" join-now btn-icon" onClick={handleCameraStatus}>
                                            <VideocamOffIcon />
                                        </button>}


                                        {/* <button className=" join-now btn-icon" >Toggle Mute others</button> */}
                                        {isJoined && <button title="End Meeting" className=" join-now btn-icon call-end" onClick={e => handleJoin(false)}>
                                            <CallEndIcon />
                                        </button>}

                                    </div>
                                    {showParticipants && <div className="other-users custom-scroller">
                                        <span onClick={handleShowParticipants} className="close-participants">&times;</span>

                                        {users.map((user: any, index) => (
                                            <div  className="other-user" style={{ marginTop: "30px" }}>
                                                {/* <img src='https://picsum.photos/200/300?random=`${index}`' alt="user" /> */}
                                                <img src={`https://picsum.photos/200/300?random=${index}`} alt="user" />
                                                <div className="joined-user-info">
                                                    <p title={user.fname}>  {user.fname}  {user.lname} </p>
                                                    <p title={user.email}> {user.email} </p>
                                                </div>

                                            </div>
                                        ))}


                                        {/* <div title="test user 2" className="other-user">
                                            <img src="https://image.flaticon.com/icons/svg/2922/2922561.svg" alt="user" />
                                            <span>Emy</span>
                                        </div>

                                        <div title="test user 3" className="other-user">
                                            <img src="https://image.flaticon.com/icons/svg/3048/3048122.svg" alt="user" />
                                            <span>Mike</span>
                                        </div> */}
                                    </div>
                                    }
                                    {showChat && <div className="chat-window">
                                        <span onClick={handleChatWindow} className="close-participants cls-chat">&times;</span>
                                        <div className="chat">
                                            <ul className="messages">
                                                {chatMessages.map((message: any, index) => (
                                                    <li title={message.time} key={index}>
                                                        {message.text}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="new-message">
                                                <input type="text" placeholder="type something" value={newChatMsg} onChange={e => {
                                                    setNewChatMsg(e.target.value)
                                                }} /> <button className="send-msg" onClick={updateChatMessages}>
                                                    <SendIcon />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    }
                                </div>

                                {/* <div>
                                    {isJoined &&
                                        <div>
                                            <p> <b> In the meeting : </b> {isJoined_f ? 'test user 1' : ''} {isJoined_s ? ', test user 2' : ''} {isJoined_t ? ',test user 3' : ''} </p>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {meetingEndTime &&
                                        <span> <b> Meeting duration is : </b> {meetingEndTime} </span>
                                    }
                                </div> */}
                            </div>
                        </div>

                    </div>

                </div>
                : ''}
        </div>
    )
}

export { Dashboard };
