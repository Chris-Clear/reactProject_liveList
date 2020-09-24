import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import {Provider , KeepAlive} from 'react-keep-alive';
// HashRouter as Router //hash路由
import App from './pages/app'
import Home from './pages/home'
import projectList from './pages/projectList' 
import moreProject from './pages/moreProject'
import noMatch from './pages/noMatch'


function IRouter(){
    return <Router>
        <Switch>
            <Route exact path="/" component={Home}>
                {/* <Redirect to="login"></Redirect> */}
            </Route>
            {/* <Route exact path="/" component={App}></Route> */}
            <Route path="/moreProject" component={moreProject}></Route>
            <Route path="/projectList" component={projectList}></Route>
            <Route path="*" component={noMatch}></Route>
        </Switch>
    </Router>
}   
// BrowserRouter.get('/', async (ctx, next) => {
// 	await ctx.render('index.html')
// })

export default IRouter