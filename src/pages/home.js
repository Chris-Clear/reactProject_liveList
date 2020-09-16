import React,{useState,useEffect} from 'react';
import {Link,useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import '../style/home.scss'
import LiveItem from  '../components/liveItem'
import HistoryItem from  '../components/historyItem'
const Banner_world_view  = require("../images/Banner_world_view.png");

export default class Home extends React.Component{
    state={
        tabIndex:'0',
        liveList:[],
        toLiveList:[],
        historyList:[],
        moreText:'',
        moreText_zz:''
    }
    loginJump = ()=>{
        this.props.history.push('/login')
    }
    changeTab = (e)=>{
        this.state.tabIndex = e;
    }
    //点击查看更多
    tapMore = (e) =>{

    }
    componentDidMount(){
        console.log(this.state.tabIndex,12345)
        const baseUrl= " https://cib.feinno.net:19203/h5_video/hginter/query";
        let vip=0;
        let mobileNo="";
        let pagination = {pageIndex:10,pageSize:0}
        console.log(this.props,11111)
        axios.post(baseUrl,{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":1 ,
            "pagination":pagination, 
          }).then((response)=>{
            const res = response.data;
            if(res.code==200){
                this.state.liveList = res.list; 
                axios.post(baseUrl,{
                    "channel":"1",
                    "vip":vip,
                    "mobileNo":mobileNo, 
                    "type":2 ,
                    "pagination":pagination, 
                  }).then((response2)=>{
                    const res2 = response2.data;
                    if(res2.code==200){
                        this.state.toLiveList = res2.list; 
                        
                    }
                    
                })
                
            }
            
        })
        // 获取历史列表
        axios.post(baseUrl,{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":3 ,
            "pagination":pagination, 
          }).then((response)=>{
            const res = response.data;
            if(res.code==200){
                
                var map = {},
                            dest = [];
                            if(pagination.pageSize==0){
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
                                            if(l == ai.liveTime.substr(0,7)){
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
                                this.state.historyList = dest; 
                                console.log(dest,123)
                                // that.totalPage = Math.ceil(res.total/that.pageSize);
                                // moreText = that.totalPage>1?'点击加载更多':'';
            }
        }
        })
    }
    render(){
        return<section id="app" className="main hgt_full flex_column font24r">
        <div className="grayLine"></div>
        <div v-if="contentShow" className="tab_menu" >
            <ul className="title-header around-center">
                <li className={this.tabIndex==0?'tab_active':''} onClick={()=>{this.changeTab(0)}} >直播空间测试<span className="head_line"></span></li>
                <li className={this.tabIndex==1?'tab_active':''} onClick={()=>{this.changeTab(1)}} >往期回顾<span className="head_line"></span></li>
            </ul>
        </div>
        <div className="flex_1 overflow_auto bg-fff">
            {this.tabIndex==0?
            <div  className="tab_content lievSpace l-pad32">
                {this.liveList.length>0?<div className="broadcastTitle">正在直播</div>    :null}  
                <ul className="live_broadcast">
                    <LiveItem type={1} livelist={this.liveList}></LiveItem>
                    <div onClick={this.tapMore(1)} className="moreTap around-center">{this.moreText_zz}</div>
                </ul>
                {this.toLiveList.length>0?<div className="broadcastTitle">即将直播</div>    :null}    
                <ul className="live_broadcast">
                    <LiveItem type={2} livelist={this.toLiveList}></LiveItem>
                    <div onClick={this.tapMore(1)} className="moreTap around-center">{this.moreText_zz}</div>
                </ul>
                {this.liveList.length==0&&this.toLiveList.length==0?<p className="no_data" style={{display: "block"}}>
                    <span className="nodata_img"></span>
                    <i className="nodata_word">新的直播正在赶来...</i>
                </p>:null}
            </div>
            :null}
            {this.tabIndex==1?
                <div className="tab_content historyLive" id="history">
                    <div className="l-pad32">
                        <img className="bannerWV" src={Banner_world_view} />
                    </div>
                    <div style={{height: ".1rem"}} className="grayLine"></div>
                    <ul className="history l-pad32">
                        <HistoryItem historylist={this.historyList}></HistoryItem>
                        <div className="moreTap around-center" >{this.moreText}</div>
                    </ul>
                </div>:null}
        </div>
        {/* <Link to="/detail/dwda">点击跳转到Detail</Link> */}
    </section>
    }
}

// export default function Home(){
//     const [tabIndex,changeTab] = useState(0);
//     const [liveList,setliveList] = useState ([]);
//     const [toLiveList,setToLiveList] = useState ([]);
//     const [historyList,setHistoryList] = useState ([]);
    
//     const [moreText_zz,setmoreText_zz] = useState ('');
//     const [moreText,setmoreText] = useState ('');
    
//     const baseUrl= " https://cib.feinno.net:19203/h5_video/hginter/query";
//     let vip=0;
//     let mobileNo="";
//     let pagination = {pageIndex:10,pageSize:0}
//     useEffect(() => {
//         axios.post(baseUrl,{
//             "channel":"1",
//             "vip":vip,
//             "mobileNo":mobileNo, 
//             "type":1 ,
//             "pagination":pagination, 
//           }).then((response)=>{
//             const res = response.data;
//             if(res.code==200){
//                 setliveList(res.list); 
//                 axios.post(baseUrl,{
//                     "channel":"1",
//                     "vip":vip,
//                     "mobileNo":mobileNo, 
//                     "type":2 ,
//                     "pagination":pagination, 
//                   }).then((response2)=>{
//                     const res2 = response2.data;
//                     if(res2.code==200){
//                         setToLiveList(res2.list); 

//                     }
                    
//                 })
//                 console.log(liveList,res.list)
//             }
            
//         })
//         // 获取历史列表
//         axios.post(baseUrl,{
//             "channel":"1",
//             "vip":vip,
//             "mobileNo":mobileNo, 
//             "type":3 ,
//             "pagination":pagination, 
//           }).then((response)=>{
//             const res = response.data;
//             if(res.code==200){
                
//                 var map = {},
//                             dest = [];
//                             if(pagination.pageSize==0){
//                                 for(var i = 0; i < res.list.length; i++){
//                                     var ai = res.list[i];
//                                     if(!map[ai.liveTime.substr(0,7)]){
//                                         dest.push({
//                                             Group: ai.liveTime.substr(0,7),
//                                             list: [ai]
//                                         });
//                                         map[ai.liveTime.substr(0,7)] = ai;
//                                     }else{
//                                             for(var j = 0; j < dest.length; j++){
//                                                 var dj = dest[j];
//                                                 var l=dj.list[0].liveTime.substr(0,7)
//                                             if(l == ai.liveTime.substr(0,7)){
//                                                 dj.list.push(ai);
//                                                 break;
//                                             }
                                        
//                                         }
//                                     }
//                                 }
                    
//                                 //设置前十条列表数据都展开
//                                 var total=0;
//                                 dest.forEach(function(v,i){
//                                     total= total+v.list.length;
//                                     if(total<10){
//                                         dest[i].selected = 1;
//                                         // that.$set(that.dest[i],'selected',1);
//                                     }
//                                 })
//                                 setHistoryList(dest); 
//                                 console.log(dest,123)
//                                 // that.totalPage = Math.ceil(res.total/that.pageSize);
//                                 // moreText = that.totalPage>1?'点击加载更多':'';
//             }
//         }
//         })
    
        
//         return () => {
//             console.log('关闭组件?')
//         }
//     }, [])
//     const params = useParams();
//     const history = useHistory();
//     const tapMore =(e)=>{
//         console.log(e)
//     }
    
//     return<section id="app" className="main hgt_full flex_column font24r">
//         <div className="grayLine"></div>
//         <div v-if="contentShow" className="tab_menu" >
//             <ul className="title-header around-center">
//                 <li className={tabIndex==0?'tab_active':''} onClick={()=>{changeTab(0)}} >直播空间<span className="head_line"></span></li>
//                 <li className={tabIndex==1?'tab_active':''} onClick={()=>{changeTab(1)}} >往期回顾<span className="head_line"></span></li>
//             </ul>
//         </div>
//         <div className="flex_1 overflow_auto bg-fff">
//             {tabIndex==0?
//             <div  className="tab_content lievSpace l-pad32">
//                 {liveList.length>0?<div className="broadcastTitle">正在直播</div>    :null}  
//                 <ul className="live_broadcast">
//                     <LiveItem type={1} livelist={liveList}></LiveItem>
//                     <div onClick={tapMore(1)} className="moreTap around-center">{moreText_zz}</div>
//                 </ul>
//                 {toLiveList.length>0?<div className="broadcastTitle">即将直播</div>    :null}    
//                 <ul className="live_broadcast">
//                     <LiveItem type={2} livelist={toLiveList}></LiveItem>
//                     <div onClick={tapMore(1)} className="moreTap around-center">{moreText_zz}</div>
//                 </ul>
//                 {liveList.length==0&&toLiveList.length==0?<p className="no_data" style={{display: "block"}}>
//                     <span className="nodata_img"></span>
//                     <i className="nodata_word">新的直播正在赶来...</i>
//                 </p>:null}
//             </div>
//             :null}
//             {tabIndex==1?
//                 <div className="tab_content historyLive" id="history">
//                     <div className="l-pad32">
//                         <img className="bannerWV" src={Banner_world_view} />
//                     </div>
//                     <div style={{height: ".1rem"}} className="grayLine"></div>
//                     <ul className="history l-pad32">
//                         <HistoryItem historylist={historyList}></HistoryItem>
//                         <div className="moreTap around-center" >{moreText}</div>
//                     </ul>
//                 </div>:null}
//         </div>
//         {/* <Link to="/detail/dwda">点击跳转到Detail</Link> */}
//     </section>
// }

