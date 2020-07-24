import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        position: 'relative',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


export default function Album() {
    const classes = useStyles();
    const [users, setUsers] = useState<any[]>([]);
    const [showSnackBar, setShowSnackBar] = useState(false)


    useEffect(() => {
        let localUsers: any = localStorage.getItem('users')
        localUsers = JSON.parse(localUsers)
        setUsers(localUsers)
    }, []);

    const deleteUser = (u, i) => {
        if (window.confirm("Are you sure, you want to delete the user?")) {
            let tempUsers = [...users]
            tempUsers.splice(i, 1)
            setUsers(tempUsers)
            localStorage.setItem("users", JSON.stringify(tempUsers))
            setShowSnackBar(true);
        }
    }
    return (
        <React.Fragment>
            <main className="auto-height all-users">

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={showSnackBar}
                    autoHideDuration={6000}
                    onClose={e => (setShowSnackBar(false))}
                    message="User deleted succesfully."
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={e => (setShowSnackBar(false))}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />

                <Container className={classes.cardGrid} maxWidth="md">
                    {users.length > 0 ? <Grid container spacing={4}>
                        {users.map((user: any, index) => (
                            <Grid item key={user.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={'https://picsum.photos/200/300?random=' + index}
                                        title="Image title">
                                        <div className="user-avatar">
                                            <span className="user-avatar-inner">
                                                {user.fname.substring(0, 1)}  {user.lname.substring(0, 1)}
                                            </span>
                                        </div>
                                    </CardMedia>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {user.fname}  {user.lname}
                                        </Typography>
                                        <Typography className="ellipsis" title={user.email}>
                                            {user.email}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View User
                                                </Button>
                                        <Button onClick={e => deleteUser(user, index)} size="small" color="primary">
                                            Delete
                                                </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid> : <Container maxWidth="sm">
                            <Typography style={{ border: '1px solid #eee', padding: '15px', boxShadow: '1px 2px 5px' }} component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                No registered users found
                        </Typography>
                            <a style={{ display: 'flex', justifyContent: 'center' }} href="/signup">Create users here</a>
                        </Container>
                    }
                </Container>
            </main>
        </React.Fragment>
    );
}