import React, { Component } from 'react'








export default class paramsData extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props.match.params)
        return (
            <div>paramsData页面中props的值为: (this.props.match.params) `${this.props.match.params.age}`</div>
        )
    }
}
