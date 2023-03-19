import React from 'react'
import SideBar from './Sidebar'
import BreadCrumbs from './BreadCrumbs'
import TabViews from './TabViews'
import Hamburger from './Hamburger'
import Account from './Account'
import Screenfull from 'components/Screenfull'
import './index.less'
import connect from 'connect'



@connect
export default class extends React.Component {
    render () {
        const {children, state, history} = this.props;
        return (
            <div>
                {/* 侧边栏 */}
                <SideBar />
                <div id="container" className={state.collapsed ? 'collapsed':''}>
                    <header className="layout-header">
                        <div className="layout-header-bar">
                            {/* 图标 */}
                            <Hamburger className='hamburger'/>
                            {/* 面包屑 - 首页/?  - 返回 <Breadcrumb></Breadcrumb> */}
                            <BreadCrumbs className='breadCrumbs'/>
                            <div className="fr r-btn">
                                {/* 全屏 - 返回 <svg></svg> */}
                                <Screenfull className="screenfull"/>
                                {/* 账户 */}
                                <Account />
                            </div>
                        </div>
                        <div className="layout-header-tabs">
                            {/* 已访问的侧边栏、 Tag标签形式 */}
                            <TabViews />
                        </div>
                    </header>
                    
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        )
    }
}

