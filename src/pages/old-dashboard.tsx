import React, { useState } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
function Dashboard() {


    // const []
    const [isJoined, setJoined] = useState(false);

    // ****************************************************************************
    const [isJoined_f, setJoined_f] = useState(false);
    const [isJoined_s, setJoined_s] = useState(false);
    const [isJoined_t, setJoined_t] = useState(false);
    const [meetingTime, setMeetingTime] = useState()
    const [meetingEndTime, setMeetingEndTime] = useState();

    const cameraAccess = () => {
        let localstream;
        let vid: any = document.getElementById('vid')
        console.log(vid);
        
        if (navigator.mediaDevices.getUserMedia !== null) {
            var options = {
                video: true,
                audio: true
            };
            navigator.getUserMedia(options, function (stream) {
                vid.srcObject = stream;
                localstream = stream;
                vid.play();
                localStorage.setItem('meeting', "true")
                console.log(stream, "streaming");
            }, function (e) {
                console.log("background error : " + e.name);
            });
        }


    }

    const capOff = () => {
        let localstream;
        let vid: any = document.getElementById('vid')
        localStorage.removeItem('meeting')

        if (navigator.mediaDevices.getUserMedia !== null) {
            var options = {
                video: true,
                audio: true
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
        console.log("all capture devices off");
        var sound: any = document.getElementById("audio");
        sound.play()
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
            setTimeout(() => {
                
                cameraAccess()
            }, 1000);
            setMeetingTime(new Date())
            setMeetingEndTime(false)

            setTimeout(() => {
                setJoined_f(true)
                // alert('User 1 is joined')
            }, 2000);
            setTimeout(() => {
                setJoined_s(true)
                // alert('User 2 is joined')
            }, 5000);
            setTimeout(() => {
                setJoined_t(true)
                // alert('User 2 is joined')
            }, 10000);
        } else {
            capOff()
            setJoined_f(false)
            setJoined_s(false)
            setJoined_t(false)
            get_time_diff()
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
                                M V
                            </span>
                        </div>
                    </CardMedia>
                    <div className="user-meeting-id">
                        Hi <span>  User Name </span>, Your meeting ID is
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
                        <input type="text" placeholder="please enter a meeting number" />
                        <button className="join-now btn" onClick={e => (
                            handleJoin(true)
                        )}>Join Meeting s</button>
                    </div>
                    <div className="meeting">
                        camera & controls
                    </div>
                </div>
            </div>

            {isJoined ?
                <div className="meeting-window pos-ab">

                    <div id="myModal" className="modal">

                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <div className="meeting-inner">
                                <audio id="audio" src="http://www.soundjay.com/button/beep-07.wav" autoPlay={false} ></audio>
                                <div className="meeting-wrapper">
                                    <div title="logged user" className="joined-user">
                                        start meeting...
                                        <video id="vid" className="video" autoPlay={true}></video>
                                    </div>

                                    <div className="other-users">
                                        {isJoined_f && <div title="test user 1" className="other-user">
                                            <img src="https://image.flaticon.com/icons/svg/924/924874.svg" alt="user" />
                                        </div>}

                                        {isJoined_s && <div title="test user 2" className="other-user">
                                            <img src="https://image.flaticon.com/icons/svg/2922/2922561.svg" alt="user" />
                                        </div>}

                                        {isJoined_t && <div title="test user 3" className="other-user">
                                            <img src="https://image.flaticon.com/icons/svg/3048/3048122.svg" alt="user" />
                                        </div>}
                                    </div>
                                    <div className="controls">
                                        {!isJoined && <button className="my-btn" onClick={e => handleJoin(true)}>Start Meeting</button>}
                                        {isJoined && <button className=" join-now btn my-btn" onClick={e => handleJoin(false)}>End meeting</button>}

                                    </div>
                                </div>

                                <div>
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
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                : ''}
        </div>
    )
}

export { Dashboard };
