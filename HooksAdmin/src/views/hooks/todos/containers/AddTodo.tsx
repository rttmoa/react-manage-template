import React from 'react'
import { connect } from 'react-redux'
import { addTodos, toggleTodoAll, setToggleTodoStatus } from '../store/action'

class AddTodo extends React.Component {
    // constructor (){
    //     super() 
    //     this.add = this._add.bind(this);
    //     this.togClick = this._togClick.bind(this);
    // }
    // state = {
    //     toggloeClick: false
    // }
    // _add (e) {
    //     if (e.keyCode !== 13) return null
    //     this.props.dispatch(addTodos(e.target.value))
    //     e.target.value = ''
 
    // }
    // _togClick(event) {
    //     this.props.dispatch(toggleTodoAll(this.state.toggloeClick))
    //     this.setState({
    //         toggloeClick: !this.state.toggloeClick
    //     })
    // }
    render () {
        return (
            <header>
                <input type="checkbox" className={this.state.toggloeClick ? "toggle-all active":"toggle-all"} onClick={this.togClick}/>
                <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyDown={this.add}/>
            </header>
        )
    }
}

const mapStateToProps = (state: any) => ({
    active: state.toggleTodoStatus
})
const mapDispatchToProps = () => ({
	active: state.toggleTodoStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
