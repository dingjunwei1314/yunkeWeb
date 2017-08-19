<template>
  <div class="content">
    <div class="header">
      <div class="tit">
        <span>{{MainData.name}}</span>
        <img v-if="MainData.authen_type=='个人'" src="../../assets/business/qi.png">
        <img v-else="" src="../../assets/business/qi.png">
      </div>
      <div class="call_content">
        <input type="text" name="" placeholder="手机号">
        <img src="./img/phone1.png">
        <span style="color:#666;font-size14px;line-height:24px;">00:01</span>
        <el-button style="height:30px;padding:0px 10px;line-height:30px">挂断重播</el-button>
      </div>
      <div class="phonenum">
        <img src="./img/phone2.png">
        <span>呼出量</span>
        <span>{{MainData.call_count}}</span>
        <img src="./img/phone2.png">
        <span>接通量</span>
        <span>{{MainData.call_answered}}</span>
      </div>
      <div class="state">
        <span>自动外呼状态</span>
        <el-switch
          style="width:25px;"
          v-model="value1"
          on-text=""
          off-text="">
        </el-switch>
        <i style="margin-left:30px" class="iconfont icon-lingdang"></i>
        <i style="margin-left:10px" class="iconfont icon-fankui"></i>
      </div>
    </div>
    <div class="con bea_scroll">
      <div class="left bea_scroll">
        <p class="left_tit">用户资料</p>
        <div style="margin-top:40px;font-size:14px;color:#666">
          <ul class="customer_list" v-for="(item,index) in Customer_data._fields" :key="index">
            <li style="line-height:25px">{{Customer_data.record_fields[item]}}：</li>
            <li class="form_item">
              <p @click="change_form_item($event,item)">
                {{Customer_data.record[item]}}
                <i class="el-icon-edit"></i>
              </p>
              <el-input @blur="submit_input($event,item)" style="margin-top:-5px;display:none" v-model="Customer_data.record[item]" placeholder=""></el-input>
            </li>
          </ul>
        </div>
      </div>
      <div class="center bea_scroll">
        <p style="color: #333;font-size: 18px;line-height: 24px;margin-left:15px;position:absolute;">业务问卷</p>
        <div style="display:flex;flex-direction:column;height:100%">
          <div style="flex:1;padding:15px;margin-top:20px;color:#666;font-size:14px;line-height:24px;">
            <ul class="main_question_answer">
              <li v-for="(item,index) in MainData.survey.list" v-show="item.is_show">
                <p style="margin-bottom:15px">{{item.q_title}}<span v-if="item.not_null!=1" style="color:#fe9039;margin-left:3px">*</span></p>
                <div style="margin-bottom:25px;padding-left:33px" v-if="item.q_type>=100&&item.q_type<200">
                  
                  <el-radio-group @change="chosed(item.q_no,item.q_id)" v-model="formInline.survey[index].answered">
                    <el-radio v-for="(item1,index1) in item.answer_list" :key="index1" :label="item1.val">{{item1.title}}</el-radio>
                  </el-radio-group>
                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else-if="item.q_type>=200&&item.q_type<300">
                  
                  <el-checkbox-group @change="chosed(item.q_no,item.q_id)" v-model="formInline.survey[index].answered">
                    <el-checkbox v-for="(item1,index1) in item.answer_list" :key="index1"  :label="item1.val">{{item1.title}}</el-checkbox>
                  </el-checkbox-group>

                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else>
                  <el-input
                    @change="chosed(item.q_no,item.q_id)"
                    type="textarea"
                    autosize
                    style="width:400px"
                    resize="none"
                    placeholder=""
                    v-model="formInline.survey[index].answered">
                  </el-input>
                </div>
              </li>
            </ul>    
          </div>
          <div style="border-top:1px solid #eee;padding:20px 20px 20px 20px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="呼叫结果">
                <el-select v-model="formInline.call_status" placeholder="请选择">
                  <el-option label="接通" value="1"></el-option>
                  <el-option label="无人接听" value="2"></el-option>
                  <el-option label="拒接" value="3"></el-option>
                  <el-option label="关机" value="4"></el-option>
                  <el-option label="停机" value="5"></el-option>
                  <el-option label="空号" value="6"></el-option>
                  <el-option label="其他" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约跟进">
                <el-date-picker
                  @change="pickerChange"
                  v-model="formInline.callback_time"
                  align="right"
                  type="datetime"
                  placeholder="请选择"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <div>

                <el-form-item label="工单备注">
                  <el-input style="width:472px" v-model="formInline.note"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button style="width:90px" class="begin" type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
              </div>
              
            </el-form>
          </div>
        </div>
      </div>
      <div class="right bea_scroll">
        <el-tabs  v-model="activeName" class="detailsTabs">
          <el-tab-pane  label="常见问题" name="first">
            <div v-html="MainData.common_problem"></div>
          </el-tab-pane>
          <el-tab-pane label="话术" name="second" style="padding-left:2px">
            <div v-html="MainData.speechcraft_content"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="btn_wap" :class="{'btn_wap_active':is_show_right_mask_content,'btn_wap_not_active':!is_show_right_mask_content}">
      <p :class="{'tab_active':tab_active==1}" @click="show_right_mask(true,1)">通话流水</p>
      <p :class="{'tab_active':tab_active==2}" @click="show_right_mask(true,2)">预约</p>
      <p :class="{'tab_active':tab_active==3}" @click="show_right_mask(true,3)">知识库</p>
    </div>

    <transition name="fade">
    <div class="right_mask" v-show="is_show_right_mask" @click.stop.prevent="show_right_mask(false)">
      <transition name="slide">
        <div class="right_mask_content" @click.stop="click_stop()" v-if="is_show_right_mask_content">
          <div v-if="tab_active==1">
            <p style="margin-top:15px;margin-left:15px;">今日全部通话</p>
            <div>
              <div class="tab_tit">
                <span style="margin-left:15px;">客户电话</span>
                <span>状态</span>
                <span style="margin-right:15px">备注</span>
              </div>

              <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in CdrListTodayData" :key="index">
                  <template slot="title">
                    <div style="display:flex;justify-content:space-between;float:left;width:56%;padding-right:35%;">
                      <span>{{item.phone}}</span>
                      <span>{{item.status}}</span>
                    </div>
                  </template>
                  <div>{{item.note}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>

          <div v-else-if="tab_active==2">
            <p style="margin-top:15px;margin-left:15px;">预约待跟进</p>
            <div>
              <div class="tab_tit">
                <span style="margin-left:15px;">待跟进时间</span>
                <span>回拨</span>
                <span style="margin-right:15px">备注</span>
              </div>

              <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in CallbackData" :key="index">
                  <template slot="title">
                    <div style="display:flex;justify-content:space-between;float:left;width:56%;padding-right:35%;align-items:center">
                      <span>{{item.record.call_back_time}}</span>
                      <img @click.stop="hb()" style="cursor:pointer" src="./img/phone2.png">
                    </div>
                    
                  </template>
                  <div>{{item.record.note}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>

          <div v-else-if="tab_active==3">
            <p style="margin-top:15px;margin-left:15px;">知识库</p>
            <!-- <div>
              <div class="tab_tit">
                <span style="margin-left:15px;">待跟进时间</span>
                <span>回拨</span>
                <span style="margin-right:15px">备注</span>
              </div>

              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <div style="display:flex;justify-content:space-between;float:left;width:167px;padding-right:93px;align-items:center">
                      <span>2017/3/31 12:00</span>
                      <img @click.stop="hb()" style="cursor:pointer" src="./img/phone2.png">
                    </div>
                    
                  </template>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
              </el-collapse>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
    </transition>
  </div>
</template>
<script>

export default {
    name:'workbench',
    props:{
      
    },
    data() {
      return{
        value1:1,
        activeName:'first',
        is_show_right_mask:false,
        is_show_right_mask_content:false,
        tab_active:0,
        Customer_data:{},
        MainData:{
          survey:{
            list:[]
          }
        },
        CdrListTodayData:'',
        CallbackData:'',
        formInline:{
          project_id:'',
          record_id:'',
          survey:[{q_id:'',q_no:'',answered:''}],
          call_result:'',
          call_status:'',
          callback_time:'',
          note:''
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },

        cur_val:''
      }
    },
    computed:{
       
    },
    watch:{
     
    },
    methods: {
      change_form_item(event,field){
        this.cur_val=this.Customer_data.record[field]
        event.target.style.display='none'
        event.target.nextElementSibling.style.display='block'
        event.target.nextElementSibling.childNodes[2].focus()
      },
      submit_input(event,field){

        let _this=this;
        let data={field:this.Customer_data.record_fields[field],val:this.Customer_data.record[field]}
        event.target.parentElement.style.display='none'
        event.target.parentElement.previousElementSibling.style.display='block'
        
        if(this.cur_val==this.Customer_data.record[field]){
          return;
        }
        this.$http('/workbench/record_customer_update',data).then(function(res){
          if(res.data.code==1000){
            _this.$message({
              message: '修改成功',
              type: 'success'
            }); 
          }else{
             _this.$message({
              message: '修改失败',
              type: 'warning'
            }); 
          }
        },function(err){
          console.log(err)
        })
       
      },
      chosed(q_no,q_id){
        let _this=this

        this.formInline.survey.forEach(function(item_answer){
          if(item_answer.q_no>q_no){
            if(typeof item_answer.answered=='object'){
              item_answer.answered=[]
            }else{
              item_answer.answered=''
            }
          }
        })

        this.MainData.survey.list.forEach(function(item_question){
          if(item_question.q_no>q_no){
            item_question.is_show=false;
          }
        })

        this.MainData.rule.forEach(function(item_rule){
          let rule_arr=item_rule.split(',')
          if(rule_arr[1]==q_id){
            let current_question=_this.MainData.survey.list[q_no-1];
            if(current_question.q_type>=200&&current_question.q_type<300){
              console.log('arr')
              let rule_detail_arr=rule_arr[2].split('|').map(function(item){
                return Number(item)
              })
              
              let len1=_this.formInline.survey[q_no-1].answered.concat(rule_detail_arr).length;
              let len2=new Set(_this.formInline.survey[q_no-1].answered.concat(rule_detail_arr)).size
              if(len2<len1){
                _this.MainData.survey.list.forEach(function(_item_question_){
                  if(_item_question_.q_id==rule_arr[0]){
                    _item_question_.is_show=true;
                  }
                })
              }
             
            }else{
              console.log('str')
              if(_this.formInline.survey[q_no-1].answered==rule_arr[2]){
                _this.MainData.survey.list.forEach(function(_item_question){
                  if(_item_question.q_id==rule_arr[0]){
                    _item_question.is_show=true;
                  }
                })
              }
            }
          }  
        })

      },
      show_right_mask(swi,index){
        if(swi){
          if(index==1&&this.CdrListTodayData==''){
            this.getCdrListTodayData()   
          }else if(index==2&&this.CallbackData==''){
            this.getCallbackData()
          }else{

          }
          this.is_show_right_mask=true
          this.is_show_right_mask_content=true
          this.tab_active=index
        }else{
          this.is_show_right_mask=false
          this.is_show_right_mask_content=false
          this.tab_active=0
        }
      },
      click_stop(){

      },
      hb(){

      },
      pickerChange(){

      },
      onSubmit(){
        
        let _this=this
        let swi=true;
        for(let i=0; i<this.MainData.survey.list.length;i++){
          if(this.MainData.survey.list[i].is_show&&this.MainData.survey.list[i].not_null==0){

            _this.formInline.survey.forEach(function(item){
              if(item.q_id==_this.MainData.survey.list[i].q_id){
                if(item.answered==''||item.answered==[]){
                  swi=false
                }
              }
            })

           
          }
        }

        if(!swi){
          _this.$message({
            message: '带*的是必答题',
            type: 'warning'
          });
          return  
        }

        
        if(this.formInline.call_status==''){
          this.$message({
            message: '请选择呼叫结果',
            type: 'warning'
          });  
          return
        }
        if(this.formInline.callback_time==''){
          this.$message({
            message: '请选择跟进时间',
            type: 'warning'
          });  
          return
        }
        
        this.$http('/workbench/get_record',_this.formInline).then(function(res){
          if(res.data.code==1000){
            _this.$message({
              message: '提交成功',
              type: 'success'
            });
            

            _this.formInline.survey=[];
            _this.formInline.call_result='';
            _this.formInline.call_status='';
            _this.formInline.callback_time='';
            _this.formInline.note='';

            for(let i=0;i<_this.MainData.survey.list.length;i++){
              if(i==0){
                _this.MainData.survey.list[i].is_show=true;
              }else{
                _this.MainData.survey.list[i].is_show=false;
              }

              if(_this.MainData.survey.list[i].q_type>=200&&_this.MainData.survey.list[i].q_type<300){
                _this.formInline.survey.push({
                  q_id:_this.MainData.survey.list[i].q_id,
                  q_no:_this.MainData.survey.list[i].q_no,
                  answered:[]
                })
              }else{
                _this.formInline.survey.push({
                  q_id:_this.MainData.survey.list[i].q_id,
                  q_no:_this.MainData.survey.list[i].q_no,
                  answered:''
                })
              }
              
            }
            _this.MainData.survey.list=_.cloneDeep(_this.MainData.survey.list)
            _this.getCustomerData()             
          }
        },function(reject){
          console.log(reject)
        })
      },
      getCustomerData(){

        var _this=this
        this.$http('/workbench/get_record').then(function(res){
          _this.Customer_data=res.data.data;
          _this.Customer_data._fields=Object.keys(res.data.data.record_fields)
          console.log(_this.Customer_data)
        },function(reject){
          console.log(reject)
        })
      },
      getMainData(){
        var _this=this
        this.$http('/workbench/enter2').then(function(res){
          _this.MainData=res.data.data;
          _this.MainData.survey.list.sort(function(previous,latter){
            return previous.q_no-latter.q_no
          })
          _this.formInline.survey=[];
          _this.formInline.call_result='';
          _this.formInline.call_status='';
          _this.formInline.callback_time='';
          _this.formInline.note='';

          for(let i=0;i<_this.MainData.survey.list.length;i++){
            if(i==0){
              _this.MainData.survey.list[i].is_show=true;
            }else{
              _this.MainData.survey.list[i].is_show=false;
            }

            if(_this.MainData.survey.list[i].q_type>=200&&_this.MainData.survey.list[i].q_type<300){
              _this.formInline.survey.push({
                q_id:_this.MainData.survey.list[i].q_id,
                q_no:_this.MainData.survey.list[i].q_no,
                answered:[]
              })
            }else{
              _this.formInline.survey.push({
                q_id:_this.MainData.survey.list[i].q_id,
                q_no:_this.MainData.survey.list[i].q_no,
                answered:''
              })
            }
            
          }
          _this.MainData.survey.list=_.cloneDeep(_this.MainData.survey.list)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        
        },function(reject){
          console.log(reject)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        })
      },
      getCdrListTodayData(){
        let _this=this
        this.$http('/workbench/cdr_list_today').then(function(res){
          _this.CdrListTodayData=res.data.data;
        },function(reject){
          console.log(reject)
        })
      },
      getCallbackData(){
        let _this=this
        this.$http('/workbench/callback').then(function(res){
          _this.CallbackData=res.data.data;
        },function(reject){
          console.log(reject)
        })
      }
    },
    mounted(){
      this.getCustomerData()
      this.getMainData()
    }
  }
</script>

<style scoped>
  .content{background:white;width: 100%;height: 100%;position: relative;display: flex;flex-direction: column;}
  .header{border-bottom: 1px solid #eee;display: flex;align-items: center;justify-content: space-between;padding: 0px 20px;font-size: 14px;color: #666;box-sizing:border-box;flex: 0 0 55px}
  .tit{border-left: 2px solid #fe9039;color: #333;font-size: 18px;line-height: 24px;height: 24px;padding-left: 5px}
  .header img{vertical-align: middle;}
  .call_content{position: relative;}
  .call_content input{width: 150px;height: 30px;border: 1px solid #eee;border-radius: 5px;text-indent: 10px;color: #666;font-size: 14px;line-height: 24px;padding-right: 30px}
  .call_content img{position: absolute;top: 8px;left: 158px;cursor: pointer;}
  .phonenum span:nth-child(3),.phonenum span:nth-child(6){display: inline-block;width: 35px;height: 20px;line-height: 20px;text-align: center;background-color: #fee2cc;color: #fecba7;border-radius:10px;}
  .phonenum img:nth-child(4){margin-left: 10px}
  .state span{vertical-align: middle;margin-right: 5px}
  .con{flex: 1;display: flex;}
  .left,.right{border-right: 1px solid #eee;background-color: #f9f9f9;width: 23%;height: 100%;padding:15px;position: relative;}
  .right{border: none}
  .center{border-right: 1px solid #eee;width: 54%;height: 100%;padding: 15px 0px}
  .left .left_tit,.center .left_tit,.right_mask_content .tit{color: #333;font-size: 18px;line-height: 24px;position: absolute;left: 15px;top: 15px;}
  .customer_list{display: inline-table;width: 100%;margin-top:32px}
  .customer_list:nth-child(1){margin-top:12px}
  .customer_list li{float: left;}
  .form_item{max-width:75%;padding-left:3px;cursor:pointer;line-height: 25px;}
  .form_item>p{position: relative;cursor: pointer;line-height: 25px;}
  .form_item:hover i{display: block}
  .form_item i{color: #666;position: absolute;right: -20px;top: -3px;cursor: pointer;color: #999;display: none}

  .right_mask{position: fixed;left: 0;right: 0;top: 0px;bottom: 0;z-index: 3;overflow: hidden;}
  .right_mask_content::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
  .right_mask_content::-webkit-scrollbar-track{background: #ccc;width: 3px}
  .right_mask_content::-webkit-scrollbar{width: 5px}
  .right_mask_content{position: absolute;top: 55px;bottom: 0;width: 25%;background: #f9f9f9;z-index: 4;overflow-y: auto;overflow-x: hidden;border-left: 1px solid #eee;right: 0}
  /*.right_mask_content>div{padding: 15px}*/
  .btn_wap{display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;z-index: 5;position: fixed;height: 100%;transition: right .5s}
  .btn_wap p{width: 17px;padding: 10px 3px;border:1px solid #fe9039;color: #fe9039;border-radius: 3px;margin-top: 10px;cursor: pointer;}
  .btn_wap_active{right: 25%}
  .btn_wap_not_active{right: 0px}
  .tab_active{background-color: #fe9039;color: #fafafa!important}
  .tab_tit{display: flex;justify-content: space-between;color: #666;font-size: 14px;margin-top: 30px;margin-bottom: 10px}
  .slide-enter-active, .slide-leave-active {
    transition: right .5s
  }
  .slide-enter,.slide-leave-to{
    right:-25%; 
  }
  .slide-enter-to, .slide-leave{
    right:0px; 
  }

  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-leave-to{
    opacity: 0
  }
  .begin:hover{background: #feb339;border-color: #feb339}
  
</style>
<style type="text/css">
  .right .el-tabs__header{border-bottom: none;margin-bottom: 25px}
  .right .el-tabs__item:nth-child(1){padding-left: 0px}
  .right_mask_content  .el-collapse{border-left: none;border-right: none}
  
  
  .right_mask_content .el-collapse-item__header{background: #f9f9f9}
  .right_mask_content .el-collapse-item__wrap{background-color: white}

  .main_question_answer .el-checkbox+.el-checkbox{margin-left: 40px;}
  .main_question_answer .el-radio+.el-radio{margin-left: 60px}
</style>