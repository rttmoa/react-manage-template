import React from 'react'
import propTypes from 'prop-types'


class IconSvg extends React.Component {
    render () {
        let {className, iconName} = this.props
        return (
            <svg className={`icon ${className}`} aria-hidden="true">
                <use xlinkHref={`#icon-${iconName}`}></use>
            </svg>
        )
    } 
}

IconSvg.propTypes = {
    iconName: propTypes.string.isRequired
}
export default IconSvg

