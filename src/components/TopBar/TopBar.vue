<template>
  <div style="border-bottom:1px solid #eee;flex:0 0 45px;position:relative;" class="main_header ui-sys-bar">
    <i class="iconfont icon-houtui2" @click="left()"></i>
    <i class="iconfont icon-qianjin3 ui-sys-bar1" @click="right()"></i>
    <i class="iconfont icon-refresh ui-sys-bar1" @click="refresh()"></i>
    <div style="float:right;" >
      <el-badge :value="3" :max="99" class='myBadge'>
        <el-popover
        class='myBadge'
          ref="popover4"
          placement="bottom"
          width="208"
          trigger="hover"
          >
          <div style='height:207px;width:228px;margin-left:-10px' >
            <ul class='radingMsg'>
              <li class='list-style-red'>
                <div class='nextTime'>23小时前</div>
                <div class='text-gray-6' style='width:152px'>
                  <h1 class='h6'><span></span><b>申诉报告</b></h1>
                  <p style='padding-left:9px;' class='myOverElli'>您的申诉经过我们的审核cgj,gfj,vg,jgvf,</p>
                </div>
                <div style='border-bottom:1px solid #EEEDED;margin-top:13px;margin-left:9px;margin-right:9px'></div>
              </li>
              <li class='list-style-red'>
                <div class='nextTime'>2分钟前</div>
                <div class='text-gray-6' style='width:152px'>
                  <h1 class='h6'><span></span><b>申诉报告</b></h1>
                  <p style='padding-left:9px;' class='myOverElli'>您的申诉经过我们的审核cgj,gfj,vg,jgvf,</p>
                </div>
                <div style='border-bottom:1px solid #EEEDED;margin-top:13px;margin-left:9px;margin-right:9px'></div>
              </li>
              <li class='list-style-red'>
                <router-link to='' class='text-gray-6'>
                  <h1 class='h6'><span></span><b>申诉报告</b></h1>
                  <p style='padding-left:9px'>您的申诉就给你过我们的审核</p>
                  <div style='border-bottom:1px solid #EEEDED;margin-top:13px;margin-left:9px;margin-right:9px'></div>
                </router-link>
              </li>
            </ul>
            <p style='height:20px;line-height:20px;text-align:center;margin-top:10px'> <router-link to='' class='text-gray-6'>查看全部消息</router-link></p>
          </div>
        </el-popover>
        <el-button v-popover:popover4 class="iconfont icon-lingdang myBtn"></el-button>
      </el-badge>
      <i class="iconfont icon-fankui"></i>
      <i class="iconfont icon-zuixiaohua ui-sys-bar1" @click="small()"></i>
      <i class="iconfont icon-guanbi1 ui-sys-bar1" @click="close"></i>
    </div>
  </div>               
</template>

<script>
     export default {
        name:'topbar',
        data() {
          return {
            is:true,
          };
        },
        computed: {

        },
        methods: {
          close(){
            if (typeof hostEditor != 'undefined')
            {
              hostEditor.closeWindow();
            }
          },
          small(){
            if (typeof hostEditor != 'undefined')
            {
              hostEditor.minimunWindow()
            }
          },
          left(){
            this.$router.go(-1)
          },
          right(){
            this.$router.go(1)
          },
          refresh(){
            this.$store.dispatch('loadingAction',true);
            this.$store.dispatch('refreshAction',true);
          }
        },
        mounted(){
        }
    }


</script>
 
<style scoped>
  .header{background: #20a0ff!important}
  .el-menu-item, .el-submenu__title{color: white!important}
  .main_header{padding: 15px 30px 0px}
  .main_header i{color: rgb(102,102,102)!important;margin-left: 10px;cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
  .main_header i:nth-child(1){margin-left: 0px}
  .el-menu img{width: 14px;position: relative;top: -1px;margin-right: 5px}
  .el-menu-item{color: #333333!important;border-radius: 5px;height: 35px!important;line-height: 35px!important}
  .el-menu-item.is-active{background: #ffa58c;color: white!important}
 /* .ui-sys-bar{
    -webkit-app-region: drag;
  }
  .ui-sys-bar1{
      -webkit-app-region: no-drag;
  }*/
  .icon-houtui2:hover,.icon-qianjin3:hover,.icon-refresh:hover,.icon-lingdang:hover,.icon-fankui:hover,.icon-zuixiaohua:hover{color: #fe9039!important}
  .icon-guanbi1:hover{color:#e7230b!important;}
  .myBadge{
    margin-top:-3px;
  }
  .myBadge .myBtn{
    border:1px solid #fff;
    padding:0;
  }
  .radingMsg li{
    padding:13px 10px 0 10px;
  }
  .radingMsg li:hover{
    background-color:#F3F3F3;
  }
  /* 距离现在时间的样式 */
  .radingMsg .nextTime{
    width:52px;height:36px;float:right;padding-bottom:10px;line-height:36px;color:#999;
  }
  
</style>
<style>
  
</style>

