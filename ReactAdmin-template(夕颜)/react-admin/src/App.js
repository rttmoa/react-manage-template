import './App.less';
import React, {Fragment} from "react";
import {Switch, Route} from 'react-router-dom'
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
    return (
        <Fragment>
            {/*只匹配一个，匹配成功就不往下匹配，效率高*/}
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/" component={Admin}></Route>
            </Switch>
        </Fragment>
    );
}

export default App;