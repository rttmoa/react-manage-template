import "./index.less";
import { connect } from "react-redux";
import { addTodos } from './store/action'
import AddTodo from './containers/AddTodo'
import TodoList from './containers/TodoList'
import Footer from './containers/Footer'



const Todos = (props: any) => {
	// const { addTodos } = props
 
	return (
		<div id="redux-todo">
        <h1>todos</h1>
        <div className="main">
            <AddTodo />
            <TodoList />
            <Footer />
        </div>
    </div>
	)
}
 

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { addTodos };
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
