import { handleActions } from 'redux-actions'






/** #### 获取Mock数据 使用Loading控制加载  */
export const asyncAction = handleActions({
    GET_ASYNC_ACTION: (state, action) => ({
        list: action.payload.list || [],
        loading: action.payload.loading
    }) 
}, {
	list: [],
	loading: false
}) 