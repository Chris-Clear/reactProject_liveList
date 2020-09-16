import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
// hashRouter as Router //hash路由
import App from './pages/app'
import Login from './pages/login'
import Home from './pages/home'
import Detail from './pages/detail'
import noMatch from './pages/noMatch'


function IRouter(){
    return <Router>
        <Switch>
            <Route exact path="/" component={Home}>
                {/* <Redirect to="login"></Redirect> */}
            </Route>
            {/* <Route exact path="/" component={App}></Route> */}
            <Route path="/login" component={Login}></Route>
            
            <Route path="/detail/:id" component={Detail}></Route>
            <Route path="*" component={noMatch}></Route>
        </Switch>
    </Router>
} 

export default IRouter