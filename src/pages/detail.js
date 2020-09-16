import React,{useState,useEffect} from 'react';
import {Link,useParams, useHistory} from 'react-router-dom'

export default function Detail(){
    const [count,setCount] = useState(10)
    useEffect(() => {
        setCount(100)
        return () => {
            console.log(321)
        }
    }, [])
    const params = useParams();
    const history = useHistory();
    return<div>
        <p>this is detail,参数为{params.id}</p>.
        <div>
            <button onClick={()=>{history.push('/')}}>跳转到首页</button>
        </div>
        <p>点击次数：{count}</p>
        <button onClick={()=>{setCount(count+1)}}>点击</button>
    </div>
}