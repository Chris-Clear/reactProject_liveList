import React from 'react';

export default class error extends React.Component{
    state={
        index:1
    }
    loginJump = ()=>{
        this.props.history.replace('/')
    }
    componentDidMount(){
        setTimeout(()=>{
            this.loginJump();
        },5000)
    }
    render(){
        let that = this.state;
        console.log(that)
        return<div>
            404 error
            <div>没有该页面</div>
            <p>正在跳转到首页...</p>
        </div>
    }
    
}