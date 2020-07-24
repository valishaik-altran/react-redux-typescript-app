// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/todo";
import { Todo } from "../model";
import { RootState } from "../reducers";
import { useHistory, useLocation } from "react-router-dom";
import AsyncSelect from 'react-select/async';


export function TodoTable() {
	const classes = useStyles();
	const history = useHistory();

	let allTodoItems = useSelector((state: RootState) => state.todoList);
	const [todoList, setTodoList] = React.useState(allTodoItems)
	const todoActions = useActions(TodoActions);
	const [inputValue, setInputValue] = React.useState('')

	const onRowClick = (todo: Todo) => {
		if (todo.completed) {
			todoActions.uncompleteTodo(todo.id);
		} else {
			todoActions.completeTodo(todo.id);
		}
		setTimeout(() => {
			window.location.reload()
		}, 1000)
	};
	const filterColors = (inputValue: string) => {
		return todoList.filter(i => {
			i.text.toLowerCase().includes(inputValue.toLowerCase())
		}
		);
	};

	const loadOptions = (inputValue, callback) => {
		setTimeout(() => {
			callback(filterColors(inputValue));
		}, 1000);
	};

	const handleInputChange = (newValue: string) => {
		const inputValue = newValue.replace(/\W/g, '');
		setInputValue(inputValue)

		return inputValue;
	};
	const handleSeletedItem = (item) => {
		setInputValue(item)
		console.log(item);
		if (item) {

			let tempTodo = [...todoList]
			tempTodo = allTodoItems.filter(todoitem => todoitem.text == item.value)
			setTodoList(tempTodo)
		} else {
			setTodoList(allTodoItems)
		}
	}
	return (
		<div className="todo-table">
			<div className="search">
				<AsyncSelect
					// cacheOptions
					loadOptions={(input, cb) => {
						// console.log(input);
						let data = allTodoItems.filter(item => item.text.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
						let items = data.map(d => ({ value: d.text, label: d.text }));
						cb(items);
					}
					}
					isClearable
					value={inputValue}
					loadingMessage={(input) => { console.log(input); return `Searching for ${input.inputValue}...` }}
					onInputChange={handleInputChange}
					onChange={handleSeletedItem}
				/>
			</div>
			<Paper className={classes.paper + " results-table"}>

				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell padding="default">Completed</TableCell>
							<TableCell padding="default">Text</TableCell>
							<TableCell padding="default">Created Date</TableCell>
							<TableCell padding="default">Delete</TableCell>
							<TableCell padding="default">Edit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todoList.map((n: Todo) => {
							let dt = new Date(n.created).toLocaleDateString() + ' ' + new Date(n.created).toLocaleTimeString();
							return (
								<TableRow
									key={n.id}
									hover
								// onClick={event => onRowClick(n)}
								>
									<TableCell padding="none">
										<Checkbox onChange={event => onRowClick(n)} checked={n.completed} />
									</TableCell>
									<TableCell padding="none">{n.text}</TableCell>
									<TableCell padding="none">{dt.toString()}</TableCell>
									<TableCell padding="none">
										<IconButton
											aria-label="Delete"
											color="default"
											onClick={() => {
												todoActions.deleteTodo(n.id);
												setTimeout(() => {
													window.location.reload()
												}, 1000)
											}
											}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
									<TableCell padding="none">
										<IconButton
											aria-label="Delete"
											color="default"
											onClick={() =>
												history.push("/editTodo", { id: n.id })
											}
										>
											<EditIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});
