import React from 'react';
import {Link} from 'react-router-dom'

// export default function app(){
    
// }

export default class App extends React.Component{
    state={
        id:'234324',
        list:[]
    }
    loginJump = ()=>{
        this.props.history.push('/login')
    }
    componentDidMount(){
        // alert(12)
    }
    render(){
        return<div>
        <h1>welcome to react</h1>
        <p>description:react link demo</p>
        <Link to="/login">点击跳转到登录</Link>
        <br></br>
        <Link to="/home">点击跳转到Home</Link>
        <Link to="/detail/dwda">点击跳转到Detail</Link>
        <button onClick={this.loginJump}>loginJump</button>
    </div>
    }
}