import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/todo";
import { RootState } from "../reducers";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export function EditToDo() {
	const location: any = useLocation();
	const history = useHistory();
	console.log(location.state);
	let todoList;
	let todoActions;
	let data: any;

	const [showSnackBar, setShowSnackBar] = useState(false);

	const [tText, setTtext] = useState({
		id: "",
		completed: "",
		text: "",
		created: "",
	});
	let [text, setText] = useState("");

	const updateTodo = () => {
		let obj = {
			created: new Date(),
			id: tText.id,
			text: text,
			completed: tText.completed,
		};
		todoActions.updateTodo(tText.id, obj);
		// alert('Updated Successfully')
		setShowSnackBar(true);
		setTimeout(() => {
			history.push("/tasks");
		}, 1000);
	};
	todoList = useSelector((state: RootState) => state.todoList);
	todoActions = useActions(TodoActions);
	useEffect(() => {
		data = todoList.filter(item => location.state.id === item.id)[0];
		setTtext(data);
		setText(data.text);
	}, []);
	let styleobj = {
		background: "red",
		color: "white",
	};
	return (
		<div className="edit-todo">
			{/* <form> */}
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={showSnackBar}
				autoHideDuration={6000}
				onClose={e => setShowSnackBar(false)}
				message="Updated Successfully."
				action={
					<React.Fragment>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={e => setShowSnackBar(false)}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			Item Text:{" "}
			<input
				type="text"
				name="text"
				value={text}
				onChange={e => setText(e.target.value)}
			/>{" "}
			<br /> <br /> <br />
			<button className="join-now btn save" onClick={updateTodo}>
				Save
			</button>
			<button
				className="join-now btn"
				style={styleobj}
				onClick={e => {
					history.push("/tasks");
				}}
			>
				Back
			</button>
			{/* </form> */}
		</div>
	);
}
