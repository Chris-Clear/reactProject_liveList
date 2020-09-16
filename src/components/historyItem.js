import React from 'react';
import {Link} from 'react-router-dom'
import '../style/home.scss'

export default class historyItem extends React.Component{
    state={
        id:'234324',
        list:[],
    }
    loginJump = ()=>{
        this.props.history.push('/login')
    }
    componentDidMount(){
        console.log(this.props)
    }
    selectSwitch =(index)=>{
        const list = this.props.historylist;
        console.log(list,index)
        list[index].selected = !list[index].selected;

    }
    historyTab=(it)=>{
        // alert(22)
        console.log(it)
    }
    render(){
        const list = this.props.historylist;
        return list.map((item,index)=>{
            return <li key={index} id={item.id} className="active">
                    <p className="frist_head">
                        <span>{item.Group}</span>
                        <img onClick={this.selectSwitch(index)} src={item.selected?require("../images/before.png"):require("../images/next.png")} className="next" />
                    </p>
                    {item.selected?<ul className="small_title">
                        {item.list.map((it,idx)=>(
                            <a key={idx} className={it.liveLink}>
                                <li onClick={this.historyTab(it)} id={it.id} className="twolevel_title center">
                                    <div className="history_broadcastimg">
                                        <img src={it.themeImage} /><span></span>
                                    </div>
                                    <div className="flex_1 m-l-30r hgt16rem column-between inherit">
                                        <p className="history_broadcasttitle line2" >{it.title}</p>
                                        <div className="small_history_broadcastimg center-end inherit" data-time={it.liveTime}>
                                            {/* <div className="center inherit">
                                                <i></i>
                                                <b>{it.viewer?it.viewer:'暂无'}</b>
                                            </div>   */}
                                            <s>{it.liveTime.substr(0,10)}</s>
                                        </div>
                                    </div>
                                </li>
                            </a>
                        ))}
                    </ul>:null}
                    
                    
                        
                    
                </li>
            })
        
    }
}