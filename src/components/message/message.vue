<template>
  <div>
    <h1 class=' myProject'>全部消息</h1>
    <div class='listTitle'>
      <template>
        <el-checkbox v-model="allChecked" @change='allCheckedFun' class='myCheck'></el-checkbox>
      </template>
      <el-button class='begin1 myBtn margin-lf-10'>删除</el-button>
      <el-button class='begin1 myBtn margin-lf-5'>标记已读</el-button>
    </div>
    <ul class='Mylist'>
      <li class='list-style-red-1 text-gray-6' v-for='(msg,index) in msgList' :key='index' v-if='msg.status==1'>
        <div class='rt text-gray-9 h5' style='width:100px'>
          <p style='text-align:right'>{{msg.create_time[0]}}</p>
          <p style='text-align:right'>{{msg.create_time[1]}}</p>
        </div>
        <div class='rt' style='width:680px'>
          <p><b>{{msg.title}}</b></p>
          <p>{{msg.content}}</p>
        </div>
        <div style='width:160px;' class='radingMsg'>
          <template>
            <el-checkbox v-model="msg.checked" @change='checkedFun' class='myCheck'></el-checkbox>
          </template>
          <u></u>
          <img src="./img/1.jpg" alt="" style='width:38px;height:38px;margin-top:21px;vertical-align:top;border-radius:50%'>
          <span style='padding-left:5px' class='myOverElli'>云小朱</span>
        </div>
        
      </li>
      <li class='list-style-red-1 text-gray-6' v-for='(msg,index) in msgList' :key='index' v-if='msg.status!=1'>
        <div class='rt text-gray-9 h5' style='width:100px'>
          <p style='text-align:right'>{{msg.create_time[0]}}</p>
          <p style='text-align:right'>{{msg.create_time[1]}}</p>
        </div>
        <div class='rt' style='width:680px'>
          <p><b>{{msg.title}}</b></p>
          <p>{{msg.content}}</p>
        </div>
        <div style='width:160px;' class='radingMsg'>
          <template>
            <el-checkbox v-model="msg.checked" @change='checkedFun' class='myCheck'></el-checkbox>
          </template>
          <u style='background:transparent'></u>
          <img src="./img/1.jpg" alt="" style='width:38px;height:38px;margin-top:21px;vertical-align:top;border-radius:50%'>
          <span style='padding-left:5px' class='myOverElli'>云小朱avrserserv</span>
        </div>
      </li>
    </ul>
    <div style='text-align:center'>
        <el-pagination
          layout="prev, pager, next"
          @current-change='getData'
          :total="Math.ceil(count/limit)*10">
        </el-pagination>
    </div>


    <AlertDetailCmn :title="alert.title"  :isshow="alert.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="close" >
      <div slot="alert_con"> 
         <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn"  @click.prevent='close()'>删除</el-button>
            <el-button type="primary" class="begin qianRuBtn"  @click.prevent='close()'>去抢单</el-button>
          </div>
      </div>
    </AlertDetailCmn> 
  </div>
</template>

<script>
  import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
  export default {
    name: 'checkAccount',
    components:{
      AlertDetailCmn
    },
    data () {
      return {
        images:['../static/banner1.png','../static/banner2.png','../static/banner3.png'],
        alert:{//弹出的确认框
          title:'雇主评分',
          isshow:false,
          width:'545',
          height:'390'
        },
        page:1,//页数
        limit:6,//每页的条数
        allChecked:false,//全选的复选框是否选中
        msgList:[],//后台请求返回的消息列表
        count:0//消息的总条数
      }
    },
    created(){
      //初始化请求
      this.getData(1);
    
    },
    mounted:function(){
      document.getElementById('main_content').scrollTop=0;
      this.$store.dispatch('defaultIndexAction','/index/work');
      var that=this
      setTimeout(function(){
        that.$store.dispatch('loadingAction',false);
      },1000)
    },
    computed:{
      refresh(){
        return this.$store.getters.GetRefresh
      }  
    },
    watch:{
      refresh:function(val){
        if(val){
          var that=this
          setTimeout(function(){
            that.$store.dispatch('refreshAction',false);
            that.$store.dispatch('loadingAction',false);
          },1000)
        }
      }
    },
    methods:{
      getData(page){
        //请求消息列表的数据
       var  _this=this;
        this.$http('/message/list',{page:page,limit:this.limit}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            _this.count=d.data.count;
            _this.msgList=d.data.list;
            for(var i=0;i<_this.msgList.length;i++){
              _this.msgList[i].checked=false;
              //把后台的时间变成日期+时间
              _this.msgList[i].create_time=_this.msgList[i].create_time.split(' ');
            }
            console.log(_this.msgList);
            _this.msgList=_.cloneDeep(_this.msgList)
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 
      },
      allCheckedFun(){
        for(var i=0;i<this.msgList.length;i++){
          if(this.allChecked==true){
            this.msgList[i].checked=true;
          }else{
            this.msgList[i].checked=false;
          }  
        }
      },
      checkedFun(index){
         console.log(this.msgList) ;
         console.log(this.allChecked) ;
         console.log(index)
         for(var i=0;i<this.msgList.length;i++){
            if(this.msgList[i].checked==false){
              this.allChecked=false;
              return;              
            } 
          }
          // alert(1)  
        this.allChecked=true;
       /*  if(this.allChecked==true){
          for(var i=0;i<this.msgList.length;i++){
            if(this.msgList[i].checked=false){
              this.allChecked==false;
            } 
          }
        }else{
          for(var i=0;i<this.msgList.length;i++){
            if(this.msgList[i].checked=false){
              return;
            } 
          }
          this.allChecked==true;
        } 
        console.log(this.msgList)   */
      },
      close(){
          this.alert.isshow=false
      }
    }
  }
</script>
<style scoped>
  h1,h2,h3,h4,h5,h6,p{font-weight:normal;padding:0;margin:0}
  ul,li,tr,td,th{margin:0;padding:0}
  div{
    box-sizing:border-box;
  }
  .C-color{
      color:#fe9039;
  }
  .mag-btm-20{
    margin-bottom:20px;
  }
  .myProject{
    margin:25px 0 0 0;
    font-size:20px;
    color:#333;
  }
  .listTitle{
    height:70px;
    line-height:70px;
  }
  .Mylist{
    height:480px;
    background:#eee;
    margin-bottom:10px;
  }
  .Mylist li{
    height:80px;
    box-sizing:border-box;
    line-height:80px;
    border-top:1px solid #EEEDED;
    font-size:14px;
    color:#666;
  }
  .Mylist li .rt{
    height:80px;
    padding:15px 0;
    line-height:25px;
    box-sizing:border-box;
  }
  .Mylist li .rt b{
    font-weight:normal;
    color:#333;
  }
  .radingMsg .myOverElli{
    display:inline-block;
    width:65px;
    vertical-align:top;
  }
  .myCheck{
    width:23px;
  }
  .begin1{
  border-color: #feb339;
  color:#feb339;
  transition:all .2s linear;
  }
  .begin1:hover{
    border-color: #feb339;
    background-color:#feb339;
    color:#fff;
  } 
  .myBtn{
    width:76px;
    height:30px;
    line-height:30px;
    text-align:center;
    font-size:14px;
    padding:0;
  }
  .margin-rt-10{
    margin-right:10px;
  }
  .margin-lf-5{
    margin-left:5px;
  }
  .margin-lf-10{
    margin-left:10px;
  }
  .list-style-red-1 u{
  display:inline-block;margin-right:3px;background:#FB5E4B;width:6px;height:6px;border-radius:50%;position:relative;top:-1px;
}
  </style>

