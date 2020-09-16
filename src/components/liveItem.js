import React from 'react';
import {Link} from 'react-router-dom'
import '../style/home.scss'

export default class liveItem extends React.Component{
    state={
        id:'234324',
        list:[],
        type:''
    }
    loginJump = ()=>{
        this.props.history.push('/login')
    }
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        const list = this.props.livelist;
        const type = this.props.type;
        return list.map((item,index)=>{
            return <li key={index} id={item.id}>
                        <div  className="smalllive_broadcastimg between-center" style={{width: "100%",height:"2.3rem"}} >
                            <div className="live_broadcastimg"><img src={item.themeImage}/><span></span></div>
                            <div className="flex_1 m-l-30r hgt16rem column-between inherit">
                                <p className="live_broadcasttitle line2">{item.title}</p>
                                {type==1?<div className="small_live_broadcastimg center-end inherit" data-time={item.liveTime}>
                                    <i></i>
                                    <b style={{whiteSpace:'nowrap'}}>直播中...</b>
                                </div>:null}
                                {type==2?<div className="small_Upcoming_broadcastimg center-end">
                                <i style={{color:"#F78B30"}}>{item.liveTime.substr(0,16)}开始直播</i>
                                </div>:null}
                                
                            </div>
                        </div> 
                        {item.qrcodeImage&&type==1?<img style={{paddingBottom: ".35rem"}} className="qrPicArea" src={item.qrcodeImage} />:null}
                    </li>
            })
        
    }
}