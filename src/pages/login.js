import React,{useState,useEffect} from 'react';
import {Link,useParams, useHistory} from 'react-router-dom'
import '../style/test.scss'

export default function Login(){
    const [count,setCount] = useState(10)
    const [top,setTop] = useState("200px");
    const [left,setLeft] = useState("200px");
    const [defaultleft,setDefaultLeft] = useState(200);
    const [defaultTop,setDefaultTop] = useState(200);
    useEffect(() => {
        setCount(100)
        
        return () => {
            console.log(321)
        }
    }, [])
    const params = useParams();
    const history = useHistory();
    const change =()=>{
        setInterval(() => {
            let rdX = Math.random()*10;
            let rdY = Math.random()*10;
            if(rdX<5){
                rdX = -rdX
            }
            if(rdY<5){
                rdY = -rdY
            }
            setDefaultLeft(defaultleft + rdX)
            setDefaultTop((defaultTop + rdY))
            console.log(defaultleft+rdX,defaultTop)
            setLeft(defaultleft + rdX+'px')
            setTop(defaultTop + rdY+'px')
           
        }, 1000);
        
    }
    return<div>
        <button onClick={()=>{history.push('/')}}>跳转到首页</button>
        <span>点击次数：{count}</span>
        <button onClick={()=>{setCount(count+1);change()}}>点击</button>
        <br></br>
        <div style={style.item} className="testBot">
            <span style={{top,left}}> 

            </span>
        </div>
    </div>
    
}  


const style =
{
    item:{border: '1px dashed #ccc',
    margin: '10px',
    padding: '10px',
    boxShadow: '0 0 10px #ccc',
    height:'500px',
    position:'relative'
     },
    user: { fontSize: '15px' },
    content:{  fontSize: '13px'},
    bot:{
        display:'block',
        width:'20px',
        height:'20px',
        borderRadius:'5px',
        backgroundColor:'#FFCC00',
        position:'absolute',
        top:'0',
        left:'20px'
    }
}