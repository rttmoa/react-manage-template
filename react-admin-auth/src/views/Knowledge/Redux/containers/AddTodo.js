import React from 'react'
import { connect } from 'react-redux'
import { addTodo, toggleTodoAll, setToggleTodoStatus } from '../actions/todo'

class AddTodo extends React.Component {
    constructor (){
        super() 
        this.add = this._add.bind(this);
        this.togClick = this._togClick.bind(this);
    }
    state = {
        toggloeClick: false
    }
    _add (e) {
        if (e.keyCode !== 13) return null
        this.props.dispatch(addTodo(e.target.value))
        e.target.value = ''
 
    }
    _togClick(event) {
        this.props.dispatch(toggleTodoAll(this.state.toggloeClick))
        this.setState({
            toggloeClick: !this.state.toggloeClick
        })
    }
    render () {
        return (
            <header>
                <input type="checkbox" className={this.state.toggloeClick ? "toggle-all active":"toggle-all"} onClick={this.togClick}/>
                <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyDown={this.add}/>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    active: state.toggleTodoStatus
})
export default connect()(AddTodo)