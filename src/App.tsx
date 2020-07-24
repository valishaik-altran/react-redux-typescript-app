// prettier-ignore
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import './styles.scss'
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Router } from "react-router-dom";
import { history } from "./configureStore";
import { Todo } from "./model";
import { HomePage, TodoPage,Dashboard,LoginPage,GitReposPage,SignUp,EditToDo } from "./pages";
import { RootState } from "./reducers/index";
import { withRoot } from "./withRoot";
import Header from './pages/common/HeaderPage';
import Album from './pages/album/AlbumPage';
import Checkout from './pages/checkout/CheckoutPage';
import { Redirect } from 'react-router';

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={LoginPage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/tasks" component={TodoPage} />
			{/* <Route exact={true} path="/checkout" component={Checkout} /> */}
			<Route exact={true} path="/users" component={Album} />
			<Route exact={true} path="/dashboard" component={Dashboard} />
			<Route exact={true} path="/login" component={LoginPage} />
			<Route exact={true} path="/git" component={GitReposPage} />
			<Route exact={true} path="/signup" component={SignUp} />
			<Route path="/editTodo" component={EditToDo} />
			{/* <Redirect from="*" to={"/login"} /> */}
		</div>
	);
}

function Drawer(props: { todoList: Todo[] }) {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/todo")}>
					<ListItemIcon>
						<TodoIcon todoList={props.todoList} />
					</ListItemIcon>
					<ListItemText primary="Todo" />
				</ListItem>
			</List>
		</div>
	);
}

function App() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	const todoList = useSelector((state: RootState) => state.todoList);
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);
	let isLoggedin:any = localStorage.getItem("isLoggedin")
	isLoggedin = JSON.parse(isLoggedin)
	// console.log(isLoggedin)
	console.log(history)
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
				{/* {window.location.pathname !=="/login" ? <Header /> : '' }	 */}
				<Header /> 
					<Routes />
				</div>
			</div>
		</Router>
	);
}

function TodoIcon(props: { todoList: Todo[] }) {
	let uncompletedTodos = props.todoList.filter(t => t.completed === false);

	if (uncompletedTodos.length > 0) {
		return (
			<Badge color="secondary" badgeContent={uncompletedTodos.length}>
				<FormatListNumberedIcon />
			</Badge>
		);
	} else {
		return <FormatListNumberedIcon />;
	}
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

export default withRoot(App);
