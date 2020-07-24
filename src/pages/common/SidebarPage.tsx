import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Link from '@material-ui/core/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import GitHubIcon from '@material-ui/icons/GitHub';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showDropdown, setDrpdown] = React.useState(false)
  const [loggedinUser, setLoggedinUser] = useState('')

  useEffect(() => {
    let usr: any = localStorage.getItem('loggedinUser')
    usr = JSON.parse(usr)
    // console.log(usr);
    if(usr){
      usr = usr.fname.substring(0, 1) + ' ' + usr.lname.substring(0, 1)
      setLoggedinUser(usr)
    }
  })
  function myFunction() {
    setDrpdown(!showDropdown)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img className="header-logo" src="data:image/png;base64,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 " alt="" />
          </Typography>
          <div className="logout-info" id="SecondsUntilExpire"></div>
          <div className="user">
            <ul className="app-navs">
              <li >
                <a href="/home">Home</a>
              </li>
              <li >
                <a href="/dashboard">Meetings</a>
              </li>
              <li >
                <a href="/tasks">Tasks </a>
              </li>
              {/* <li >
                <a href="/registration">Register</a>
              </li> */}
            </ul>
            <div title="user name" onClick={myFunction} className="user-tile" > {loggedinUser} </div>
            {showDropdown && <div className="dropdown-content" id="myDropdown">
              <a href="#">Settings</a>
              <a href="/login" onClick={e => {
                localStorage.setItem('isLoggedin', "false")
                localStorage.removeItem('loggedinUser')
              }}>Logout</a>
            </div>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{name:'home',icon:<HomeIcon/>},{name:'users',icon:<PeopleIcon/>},{name:'git',icon:<GitHubIcon/>},{name:'dashboard',icon:<VideoCallIcon/>},{name:'tasks',icon:<FormatListNumberedIcon/>}].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <Link title={item.name} color="inherit" href={item.name}>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {item.icon}
                </Link>

              </ListItemIcon>
              <Link title={item.name} color="inherit" href={item.name}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider /> 
        <List>
          {[{name:'signup',icon:<PersonAddIcon/>}].map((item, index) => (
            <ListItem button key={index}>
             <ListItemIcon>
                <Link title={item.name} color="inherit" href={item.name}>
                  {item.icon}
                </Link>

              </ListItemIcon>
              <Link title={item.name} color="inherit" href={item.name}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
