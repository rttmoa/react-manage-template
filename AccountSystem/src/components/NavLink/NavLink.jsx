import React from 'react';
import {Link} from 'dva/router';
import {link} from './index.css';

const NavLink = ({target, linkText})=>(
    <Link to={target} className={link}>{linkText}</Link>
);

export default NavLink;
