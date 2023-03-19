import React, { Component } from 'react'




export default class params extends Component {
    constructor(props){
        super(props)
    }
    render() {
        // console.log(this.props.match.params)
        return (
            <div>Params页面中props的值为: (this.props.match.params)</div>
        )
    }
}
