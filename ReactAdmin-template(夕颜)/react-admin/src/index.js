import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd';
import "./locale/en.json";
//引入i18n.js
import './i18n'

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </ConfigProvider>,
    document.getElementById('root')
);