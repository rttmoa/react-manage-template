/* eslint-disable no-unused-labels */
import * as types from "./contant";

interface TodoOptions {
	id: number;
	text?: string;
	completed?: boolean; 
}

let nextTodoId = 8



/** #### 添加 todo  */
export const addTodos = ( text: TodoOptions ) => { 
	return ({
		type: types.ADD_TODOS,
		todoList: {
			id: nextTodoId++,
			text
		}
	});
}
 

// 删除
export const delTodo = (id: number) => ({
	type: types.DEL_TODOS,
	todoList: {
		id 
	}
})

// 清除
export const clearTodo = () => ({
	type: types.CLEAR_TODO
})

// 切换
export const toggleTodo = (id: number) => ({
	type: types.TOGGLE_TODO,
	todoList: {
		id
	}
})


// 设置全选/全不选的状态
export const setToggleTodoStatus = () => {
	type: types.SET_TOGGLE_TODO_STATUS
}


// 全选/全不选
export const toggleTodoAll = (active: boolean) => ({
	type: types.TOGGLE_TODO_ALL,
	active
})


// 过滤
export const setVisibilityFilter = (filter: string) => ({
	type: types.SET_VISIBILITY_FILTER,
	filter
})

// 状态
export const visibilityStatus = [
	{ filter: 'SHOW_ALL',  text: 'All' },
	{ filter: 'SHOW_COMPLETED',  text: 'Completed' },
	{ filter: 'SHOW_ACTIVE',  text: 'Active' }
]
