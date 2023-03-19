import React from 'react'
import { connect } from 'react-redux'
import { addTodo, toggleTodoAll, setToggleTodoStatus } from 'views/Knowledge/Redux/actions/todo'



class AddTodo extends React.Component {
    state = {
        toggloeClick: false
    }
    // 添加数据
    add (e) {
        if (e.keyCode !== 13) return null;
        this.props.dispatch(addTodo(e.target.value));
        e.target.value = '';
    }
    // 全选/全不选 完成
    togClick (event) {
        this.props.dispatch(toggleTodoAll(this.state.toggloeClick))
        this.setState({
            toggloeClick: !this.state.toggloeClick,
        })
    }

    render () {
        return (
            <header>
                <input type="checkbox" className={`toggle-all df-c ${this.state.toggloeClick ? "active":""}`} onClick={this.togClick.bind(this)}/>
                <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyDown={this.add.bind(this)}/>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    active: state.toggleTodoStatus
})
export default connect()(AddTodo)