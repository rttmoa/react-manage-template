import React, {Component} from 'react';
import {Layout} from 'antd';
const {Content} = Layout;
class ContentNav extends Component {
    render() {
        return (
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {this.props.children}
            </Content>
        );
    }
}

export default ContentNav;