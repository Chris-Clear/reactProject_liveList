import React from 'react';
// import {useState,useEffect} from 'react';
// import {Link,useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios'
import '../style/home.scss'
import LiveItem from  '../components/liveItem'
import HistoryItem from  '../components/historyItem'
import 'antd-mobile/dist/antd-mobile.css'; 

import JsonP from 'jsonp'

import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const tabs = [
  { title: <Badge>直播空间</Badge> },
  { title: <Badge>往期回顾</Badge> },
];
  
const baseUrl = 'https://cib.feinno.net:19203'
let vip=0;
let mobileNo="";
let pagination = {pageIndex:0,pageSize:10}
export default class Home extends React.Component{
    state={
        tabIndex:0,
        liveList:[],
        toLiveList:[],
        historyList:[],
        projectList:[],//专题列表
        moreText:'',
        moreText_zz:'',
        isClicked:false,
    }
    loginJump = ()=>{
        this.props.history.push('/login')
    }
    changeTab = (e)=>{
        this.setState({
            isClicked:true,
            tabIndex:e
        });
        // this.state.tabIndex = e;
        console.log(e,this.state.tabIndex)
        if(e===1){
            this.get_project(vip,mobileNo,pagination)
            this.get_history(vip,mobileNo,pagination)
        }
    }
    //点击查看更多
    tapMore = (e) =>{

    }
    getjsonp = () =>{
        JsonP('https://app.cibresearch.com/home/getArticleList',{param:'callback'},function(err, data){
 
            　　console.log(data)
             
            })
    }
    componentDidMount(){
        console.log(this.state.tabIndex,12345)
        const url= baseUrl+"/h5_video/hginter/query";
        this.getjsonp()//测试
        console.log(this.props,11111,url)
        axios.post(url,{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":1 ,
            "pagination":pagination, 
          }).then((response)=>{
            const res = response.data;
            if(res.code===200){
                this.state.liveList = res.list; 
                axios.post(url,{
                    "channel":"1",
                    "vip":vip,
                    "mobileNo":mobileNo, 
                    "type":2 ,
                    "pagination":pagination, 
                  }).then((response2)=>{
                    const res2 = response2.data;
                    if(res2.code===200){
                        this.setState({
                            toLiveList:res2.list
                        })
                        if(this.state.toLiveList.length+this.state.liveList.length==0&&!this.state.isClicked){
                            this.setState({
                                tabIndex:1
                            })
                            this.get_project(vip,mobileNo,pagination)
                            this.get_history(vip,mobileNo,pagination)
                            
                        }
                        
                    }
                    
                })
                
            }
            
        })
        
    }
    // 获取历史列表
    get_history=(vip,mobileNo,pagination)=>{
        var that = this;
        // 获取历史列表
        axios.post(baseUrl+"/h5_video/hginter/query",{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":3 ,
            "pagination":pagination, 
          }).then((response)=>{
            const res = response.data;
            
            if(res.code===200){
                
                var map = {},
                            dest = [];
                            if(pagination.pageIndex===0){
                                for(var i = 0; i < res.list.length; i++){
                                    var ai = res.list[i];
                                    if(!map[ai.liveTime.substr(0,7)]){
                                        dest.push({
                                            Group: ai.liveTime.substr(0,7),
                                            list: [ai]
                                        });
                                        map[ai.liveTime.substr(0,7)] = ai;
                                    }else{
                                            for(var j = 0; j < dest.length; j++){
                                                var dj = dest[j];
                                                var l=dj.list[0].liveTime.substr(0,7)
                                            if(l === ai.liveTime.substr(0,7)){
                                                dj.list.push(ai);
                                                break;
                                            }
                                        
                                        }
                                    }
                                }
                    
                                //设置前十条列表数据都展开
                                var total=0;
                                dest.forEach(function(v,i){
                                    total= total+v.list.length;
                                    if(total<10){
                                        dest[i].selected = 1;
                                        // that.$set(that.dest[i],'selected',1);
                                    }
                                })
                                this.setState({
                                    historyList:dest
                                })
                                console.log(dest,123)
                                // that.totalPage = Math.ceil(res.total/that.pageSize);
                                // moreText = that.totalPage>1?'点击加载更多':'';
            }
        }
        })
    }
    // 获取专题列表
    get_project=(vip,mobileNo,pagination)=>{
        var that = this;
        axios.post(baseUrl+'/h5_video/hginter/queryTopic',{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":2 ,
            "pagination":pagination, 
          }).then((response)=>{
            const res = response.data;
            if(res.code===200){
                this.setState({
                    projectList:res.list
                })
            }   
            
        })
    }
    goToTab=()=>{
        alert(123)
    }
    render(){
        let that = this.state;
        return<section id="app" className="main hgt_full bg-fff flex_column font24r">
            <div className="grayLine" id={that.tabIndex}></div>
            <div className="main hgt_full flex_column font24r">
      <Tabs tabs={tabs}  tabBarActiveTextColor="#5580D8" tabBarInactiveTextColor="#333" tabBarBackgroundColor="#fff"
        page={that.tabIndex} 
        onChange={(tab, index) =>{this.changeTab(index) }}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div  className="tab_content lievSpace l-pad32">
                {that.liveList.length>0?<div className="broadcastTitle">正在直播</div>    :null}  
                <ul className="live_broadcast">
                    <LiveItem type={1} livelist={that.liveList}></LiveItem>
                    <div onClick={this.tapMore(1)} className="moreTap around-center">{that.moreText_zz}</div>
                </ul>
                {that.toLiveList.length>0?<div className="broadcastTitle">即将直播</div>    :null}    
                <ul className="live_broadcast">
                    <LiveItem type={2} livelist={that.toLiveList}></LiveItem>
                    <div onClick={this.tapMore(1)} className="moreTap around-center">{that.moreText_zz}</div>
                </ul>
                {that.liveList.length===0&&that.toLiveList.length===0?<p className="no_data" style={{display: "block"}}>
                    <span className="nodata_img"></span>
                    <i className="nodata_word">新的直播正在赶来...</i>
                </p>:null}
            </div>
            <div className="tab_content historyLive" id="history">
                <div className="l-pad32 p-b-20r">
                    <div className="clearfix subjectContent">
                        {that.projectList.slice(0,4).map((item,idx)=>(
                            <Link  key={item.id} id={item.id} className="bannerWV fl" style={{backgroundImage: 'url(' + item.cardImage + ')' }} to={{pathname:'projectList', params:{name:item.topicName,id:item.id,img:item.coverImage}} }></Link>
                        ))}
                    </div>
                    {that.projectList.length>4?<Link className="around-center moreProject" to="moreProject">
                        <p className="center">
                            <i className="moreProject">更多专题</i>
                            <img className="arrowImg" src={require("../images/icon_arrow.png")} />
                        </p> 
                    </Link> :null}
                </div>
                <div style={{height: ".1rem"}} className="grayLine"></div>
                <ul className="history l-pad32">
                    <HistoryItem historylist={that.historyList}></HistoryItem>
                    <div className="moreTap around-center" >{that.moreText}</div>
                </ul>
            </div>
      </Tabs>
    </div>
    </section>  
    }
}


