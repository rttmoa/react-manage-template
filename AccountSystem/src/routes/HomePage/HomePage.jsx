import React from 'react';
import Header from '../../components/Header/Header';
import {connect} from 'dva';
import SystemInfo from '../../components/SystemInfo/SystemInfo';
import {homePage, container} from './index.css';


/***--- 主页面： 左侧菜单栏 && 顶部系统标题 || 用户登陆/注册 ---**/
const HomePage = ({children, home})=> {
    const {activeIndex} = home;
    const height = window.innerHeight - 64;

    return (
        <div className={homePage}>

            {/* TODO: 侧边栏 */}
            <Header activeIndex={activeIndex}/>

            {/* TODO: 头部 */}
            <SystemInfo/>

            {/* TODO: 内容children */}
            <div className={container} style={{height}}>
                {children}
            </div>

        </div>
    );
};
function mapStateToProps({home}) {
    return {home};
}
export default connect(mapStateToProps)(HomePage);
