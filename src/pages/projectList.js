import React from 'react';
import axios from 'axios'
import '../style/home.scss'
import 'antd-mobile/dist/antd-mobile.css'; 
import HistoryItem from  '../components/historyItem'

const baseUrl = 'https://cib.feinno.net:19203'
let vip=0;
let mobileNo="";
let pagination = {pageIndex:0,pageSize:10}

export default class projectList extends React.Component{
    state={
        id:'',
        projectList:[],
        coverImage:''
    }
    componentDidMount(){
        let params = this.props.location.params;
        if(params){
            localStorage.setItem("params", JSON.stringify(params) );
        }
        params =  JSON.parse(localStorage.getItem("params")) ;
        this.setState({
            id:params.id,
            coverImage:params.img,
            name:params.name
        })
        document.getElementsByTagName("title")[0].innerText = params.name;
        //获取列表
        let id = params.id;
        this.get_history(vip,mobileNo,pagination,id)
    }
    // 获取历史列表
    get_history=(vip,mobileNo,pagination,id)=>{
        var that = this;
        // 获取历史列表
        axios.post(baseUrl+"/h5_video/hginter/query",{
            "channel":"1",
            "vip":vip,
            "mobileNo":mobileNo, 
            "type":4 ,
            "pagination":pagination, 
            "specialTopicId":id
          }).then((response)=>{
            const res = response.data;
            
            if(res.code==200){
                
                var map = {},
                            dest = [];
                            if(pagination.pageIndex==0){
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
                                this.setState({
                                    projectList:dest
                                })
                                console.log(dest,123)
                                // that.totalPage = Math.ceil(res.total/that.pageSize);
                                // moreText = that.totalPage>1?'点击加载更多':'';
            }
        }
        })
    }
    render(){
        let that= this.state;
        return <section  className="main hgt_full flex_column font24r">
        <div className="flex_1 overflow_auto bg-fff tab_content">
            <div className="l-pad32">
                <img className="coverBanner" src={that.coverImage} />
            </div>
            {that.projectList.length==0?<p className="no_data" style={{display: "block"}}>
                    <span className="nodata_img"></span>
                    <i className="nodata_word">新的直播正在赶来...</i>
                </p>:null}
            <div id="history" >
                {/* <HistoryItem historylist={that.projectList}></HistoryItem>
                <div className="moreTap around-center" >{that.moreText}</div> */}
                <ul className="history l-pad32">
                    <HistoryItem historylist={that.projectList}></HistoryItem>
                    <div className="moreTap around-center" >{that.moreText}</div>
                </ul>
            </div>
        </div>
        
    </section>
        
    }
}