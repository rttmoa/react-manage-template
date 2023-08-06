import { AnyAction } from "redux";
import produce from "immer";
import * as types from "./contant";

interface TodoOptions {
	id: number;
	text?: string;
	completed?: boolean; 
}

interface TodoListInterface {
	todoList: TodoOptions[]
	filter: string
	status: boolean
}

const TodoListState: TodoListInterface = {
	todoList: [
		{id: 1, text: 'star this repository', completed: true},
    {id: 2, text: 'fork this repository', completed: true},
    {id: 3, text: 'follow author', completed: false},
    {id: 4, text: '任务1', completed: false},
    {id: 5, text: '任务2', completed: true},
	],
	filter: "SHOW_ALL",
	status: false
};


const TodoList = (state: TodoListInterface = TodoListState, action: AnyAction) =>
	produce(state, draftState => {
		console.log('state', state.todoList);
		// console.log(draftState.todoList);
		// console.log(action);
		switch (action.type) {
			case types.ADD_TODOS:
				draftState.todoList = [...state.todoList, action.todoList]
				break;
			default:
				return draftState;
		}
	});



export default TodoList;
