import React, { lazy, Suspense,Component } from 'react';
import {Layout} from "antd";
import { Route, Switch, Redirect } from 'react-router-dom';
const SiderBar = lazy(() => import(/* webpackChunkName: "layout" */ '../components/layout/SiderBar'));
const HeaderBar = lazy(() => import(/* webpackChunkName: "layout" */ '../components/layout/HeaderBar'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/home/Home'));
const Connect = lazy(() => import(/* webpackChunkName: "connect" */ '../pages/user/connect/Connect'));
const List = lazy(() => import(/* webpackChunkName: "userList" */ '../pages/user/list/List'));
const Rich = lazy(() => import(/* webpackChunkName: "rich" */ '../pages/tool/rich/Rich'));
const NotFind = lazy(() => import(/* webpackChunkName: "notFind" */ '../pages/notFind/NotFind'));

const params = lazy(() => import('../pages/reactrouter/params'))
const paramsData = lazy(() => import('../pages/reactrouter/paramsData'))
const Query = lazy(() => import('../pages/reactrouter/Query'))
const State = lazy(() => import('../pages/reactrouter/State'))




class Index extends React.Component {

  render() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const mainPage = (
      <>
        <Suspense fallback={<div>Loading... </div>}>
          <Layout>
            <SiderBar history={this.props.history}></SiderBar>
            <Layout>
              <HeaderBar history={this.props.history}></HeaderBar>
                <div className="layout-content">
                  
                    <Switch>
                      <Route exact path="/" component={ Home }/>
                      <Route path="/user/connect" component={ Connect }/>
                      <Route path="/user/list" component={ List }/>
                      <Route path="/tool/rich" component={ Rich }/>
                      {/* <Route component={ NotFind }/> */}

                      
                      {/* https://blog.csdn.net/QTFYING/article/details/77939171?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5-77939171-blog-81355310.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5-77939171-blog-81355310.pc_relevant_aa2&utm_relevant_index=6 */}
                      
                      <Route exact path="/route/:name" component={params}></Route>
                      <Route exact path="/routeData/:data" component={paramsData}></Route>
                      <Route exact path="/Query" component={Query}></Route>
                      <Route exact path="/State" component={State}></Route>

                      {/* https://blog.csdn.net/weixin_42799526/article/details/114297245?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-114297245-blog-106645039.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-114297245-blog-106645039.pc_relevant_default&utm_relevant_index=1 */}
                      {/* 1、params参数 */} 
                      {/* this.props.history.push(`/home/message/detail/${id}/${title}`);  1、push跳转+携带params参数 */}
                      {/* <Link to='/demo/test/tom/18'>详情</Link>  1、路由链接（携带参数） */}
                      {/* <Route path='/demo/test/:name/:age' component={Test} />  2、注册路由，声明接收 */}
                      {/* const {name, age} = this.props.match.params;  3、接收参数 */}
                      {/* 2、search参数 */}
                      {/* this.props.history.push(`/home/message/detail?id=${id}&title=${title}`); */}
                      {/* <Link to='/demo/test?name=tom&age=18'>详情</Link> */}
                      {/* <Route path='/demo/test' component={Test} /> */}
                      {/* this.props.location.search */}
                      {/* 3、state参数 */}
                      {/* this.props.history.push('/home/message/detail', {id, title}); */}
                      {/* <Link to={{pathname: '/demo/test', state: {name: 'tom', age: 18}}}>详情</Link> */}
                      {/* <Route path='/demo/test' component={Test} /> */}
                      {/* this.props.location.state */}

                      {/* react-router总结之路由传值: https://blog.csdn.net/my_love_download/article/details/109522517?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4-109522517-blog-81355310.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4-109522517-blog-81355310.pc_relevant_aa2&utm_relevant_index=5 */}





                    </Switch>
                </div>
            </Layout>
          </Layout>
        </Suspense>
      </>
    );
    return (
      loggedIn ? (
        mainPage
      ) : (
        <Redirect to="/login"/>
      )
    );
  }
}

export default Index; 