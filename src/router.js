import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import {Provider , KeepAlive} from 'react-keep-alive';
// HashRouter as Router //hash路由
import App from './pages/app'
import Home from './pages/home'
import projectList from './pages/projectList' 
import moreProject from './pages/moreProject'
import login from './pages/login'
import noMatch from './pages/noMatch'


function IRouter(){
    return <Switch>
            <Route exact path="/" component={Home}>
                {/* <Redirect to="login"></Redirect> */}
                <KeepAlive name="Home">
                    <Home />
                </KeepAlive>
            </Route>
            <Route path="/moreProject" component={moreProject}></Route>
            <Route path="/projectList" component={projectList}></Route>
            <Route path="/login" component={login}></Route>
            <Route path="*" component={noMatch}></Route>
        </Switch>
    
}   

export default IRouter