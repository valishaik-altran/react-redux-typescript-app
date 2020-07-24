import React, { useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
 
export function LoginPage() {
    const history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    
    const handleLogin = () => {

        let users: any = localStorage.getItem('users')
        users = JSON.parse(users)
        // console.log(users)
        if (users && users.length == 0 || users == null) {
            if (email == "admin" && pwd == "admin") {
                history.push("/dashboard");
                localStorage.setItem('isLoggedin',"true")
                localStorage.setItem("loggedinUser",'{"id":"ckcnd4c9o00013b5r1j1lf2aj","fname":"admin","lname":"admin","email":"admin","pwd":"admin"}')
                window.location.reload();
            } 
            alert('no registered users found. try logging with username: "admin", password: "admin"')
        } else {
            const isUserFound = (element: any) => (element.email == email && element.pwd == pwd);
            let i = users.findIndex(isUserFound)
            // console.log(i);
            localStorage.setItem("loggedinUser",JSON.stringify(users[i]))
            if (i !== -1) {
                history.push("/dashboard");
                localStorage.setItem('isLoggedin', "true")
                window.location.reload();
            } else {
                alert('invalid credentials')
            }
        }



        // if (email == "admin" && pwd == "admin") {
        //     history.push("/dashboard");
        //     localStorage.setItem('isLoggedin',"true")
        //     window.location.reload();
        // } else {
        //     alert('invalid credentials')
        // }
    }
    useEffect(()=>{
        let el:any = document.getElementsByClassName('header')[0]
        el.style.display='none'
    })
    return (
        <Grid container component="main" className={classes.root + " login "}>
            <CssBaseline />
            <Grid item className={classes.image + " main-wrapper auto-height"}  >
                <Grid item component={Paper} elevation={6} square className="login-form">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                autoComplete="email"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={pwd}
                                onChange={e => setPwd(e.target.value)}


                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                className={classes.submit}
                            >
                                Sign In
                        </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </Grid>
    );
}