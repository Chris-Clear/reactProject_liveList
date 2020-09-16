import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Button,Input} from 'antd';
import 'antd/dist/antd.css'
import { render } from 'react-dom';
 
class App extends React.Component{
    state={
        val:'',
        list:[]
    }
    handleChange = (e)=>{
        let val = e.target.value;
        this.setState({
            val
        })
    }
    confirm = ()=>{
        let {val,list} = this.state;
        if(!val){
            alert('输入不能为空')
            return;
        }
        list.push(val);
        this.state.val ='';
        this.setState({
            list
        })

    }
    render(){  
        const {val,list} = this.state;
        const listItem = list.map((item,index)=>{
            return <li idx={index} key={index}>{item}{index}</li>
            })
        return  <div className = "App" >
                <div className="nametest">787 <p>123</p></div>
                <img className="App-logo" src={logo} alt="logo"/> 
                <br/>
                <Input type="text" style={{width:'300px'}} value={val} onChange={this.handleChange}></Input>     
                <Button type="primary" onClick={this.confirm}>confirm</Button> 
                <ul>{listItem}</ul> 
            </div>
    }
}

export default App; 