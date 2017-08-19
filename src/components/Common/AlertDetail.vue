<template>
   <transition
    name="custom-classes-transition" 
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"> 
  <div class="successAlert"  v-show="isshow" :style="{width:AlertWidth+'px',height:AlertHeight+'px',marginLeft:'-'+AlertWidth/2+'px',marginTop:'-'+AlertHeight/2+'px'}">
    <p class="tit">
      {{title}}
      <img @click="close" src="./img/close.png">
    </p>
        
    <div class="content bea_scroll" :style="{height:ConHeight+'px'}">
      <slot name="alert_con"></slot>
    </div>
   
    <div style="text-align:center">
      <p class="btn" @click="sure">{{btntext}}</p>
    </div>    
  </div>  
  </transition> 
 
</template>
<script>

export default {
    name:'AlertDetail',
    props:{
      isshow:{
        required:true,
        type:Boolean,
        default:false
      },
      title:{
        required:true,
        type:String,
        default:'标题'
      },
      btntext:{
        required:true,
        type:String,
        default:'按钮'
      },
      AlertWidth:{
        required:false,
        type:String,
        default:'546'
      },
      AlertHeight:{
        required:false,
        type:String,
        default:'390'
      },
      ConHeight:{
        required:false,
        type:String,
        default:'200'
      }
    },
    data() {
      return{
        
      }
    },
    computed:{
      
    },
    methods: {
      close(){
        this.$emit('close')
      },
      sure(){
        this.$emit('sure')
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .successAlert{position: fixed;z-index: 999;left: 50%;top: 50%;box-shadow: 0px 3px 3px #eee;background: white;border-radius: 3px;border-top: 5px solid #fe9039}
  .tit{height: 47px;line-height: 47px;font-size: 20px;color: #333;font-weight: bold;padding: 0px 20px;border-bottom: 1px solid #eee;position: relative;}
  .tit img{position: absolute;right: 20px;top: 17px;cursor: pointer;}
  .content{padding: 20px;overflow-x: hidden;overflow-y: auto;}
  .content p{font-size: 14px;color: #666;flex: 1;align-items: center;display: flex;padding-left: 15px;}
  .btn{height: 35px;line-height: 35px;padding: 0px 20px;background: #fe9039;color:white;display: inline-block;border-radius: 3px;font-size: 14px;margin: 10px auto 0px;cursor: pointer;}
</style>
