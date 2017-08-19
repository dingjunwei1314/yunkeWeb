<template>
	<div style="padding-top:16px">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="成长" name="first">
    			<div class="echart">
    				<div class="text-regular" style="margin-top:8px;margin-bottom:20px;float:left">成长等级</div>
    				<div class="upgrade">升级条件</div>
    				<img src="./img/userCenter_echar.jpg" height="223" width="941" alt="">
    			</div>
    			<div class="level" style="margin-top:28px">
    				<div class="text-regular" style="margin-bottom: 20px">我的等级</div>
					<div class="level_content">
						<p>
							<span style="float:left">当前等级：</span>
        					<span style="float:left;color:#fe9039;font-weight:bold">
        						<template>新手</template>
        					</span>
        					<el-progress :percentage="50" :show-text="false" :stroke-width="12" style="width:220px;float:left;margin-left:10px;margin-top:5px"></el-progress>
        				 	<span style="position:relative;top:-2px;margin-left:44px;color:#999">完成以下任务可升级为LV1云客</span>
						
						</p>
						 <p class="img_wap" style="text-align:center;">
       					 <span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">实名认证</div>
        					<img  src="./img/level1.png" height="64" width="64" alt="">
        					<!-- <img v-else="data.data.level.upgrade_condition.identify_verify=='1'" src="./img/level1_active.png" height="64" width="64" alt=""> -->

        				</span><i></i>

        				<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">学历认证</div>
        					<img  src="./img/level2.png" height="64" width="64" alt="">
        					<!-- <img v-else="data.data.level.upgrade_condition.identify_verify=='1'" src="./img/level2_active.png" height="64" width="64" alt=""> -->
        				</span><i></i>

        				<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">打字测试</div>
        					<img  src="./img/level3.png" height="64" width="64" alt="">
        					<!-- <img v-else="data.data.level.upgrade_condition.rapidtyping=='1'" src="./img/level3_active.png" height="64" width="64" alt=""> -->

        				</span><i></i>

        				<span>
        					<div style=";text-align:center;color:#f1f1f1;font-size:12px;">
          						<p style="margin-top:15px;">普通话</p>
          						<p style="margin-top:0px">测试</p>
        					</div>
        					<img src="./img/level4.png" height="64" width="64" alt="">
        					<!-- <img v-else="data.data.level.upgrade_condition.mandarin=='1'" src="./img/level4_active.png" height="64" width="64" alt=""> -->

        				</span><i></i>

        				<span>
         					<div style=";text-align:center;color:#f1f1f1;font-size:12px;">
            					<p style="margin-top:15px;">基础知识</p>
            					<p style="margin-top:0px">培训考试</p>
          					</div>
        					<img  src="./img/level5.png" height="64" width="64" alt="">
        					<!-- <img v-else="data.data.level.upgrade_condition.exam=='1'" src="./img/level5_active.png" height="64" width="64" alt=""> -->
        
        				</span><i></i>

       					<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">首单任务</div>
        					<img src="./img/level6.png" height="64" width="64" alt="">
       						<!--  <img v-else="data.data.level.upgrade_condition.novice_task=='1'" src="./img/level6_active.png" height="64" width="64" alt=""> -->

        				</span>
      				</p>

					</div>
					
    			</div>
    			<div class="privilege" style="margin-top:28px">
    				<div class="text-regular" style="margin-top:8px;margin-bottom: 20px">全部特权</div>
    				<table class="user_table">
    					<tr style="background:#eee">
    						<th class="tlevel" style="width:70px;text-align:center;">等级</th>
    						<th>新手客服</th>
    						<th>普通客服</th>
    						<th>高级客服</th>
    						<th>金牌客服</th>
    					</tr>
    					<tr>
    						<td rowspan="3" class="tq" style="text-align:center;background:#eee">特权</td>
    						<td style="padding-left:20px">接新手订单</td>
    						<td>承接普通订单</td>
    						<td>承接平台所有订单</td>
    						<td>承接平台所有订单</td>
    					</tr>
    					<tr>
    						<!-- <td>特权</td> -->
    						<td style="padding-left:20px">参加新手培训</td>
    						<td>参加高级客服培养计划</td>
    						<td>参加金牌客服培养计划</td>
    						<td>获得增值服务项目收益</td>
    					</tr>
    					<tr>
    						<!-- <td> - </td> -->
    						<td>-</td>
    						<td>-</td>
    						<td>高级客服</td>
    						<td>平台金牌客服奖学金</td>
    					</tr>
    					
    				</table>
    			</div>

    		</el-tab-pane>
    		<el-tab-pane label="动态" name="second">配置管理</el-tab-pane>
    		<el-tab-pane label="设置" name="third">角色管理</el-tab-pane>
    		<el-tab-pane label="认证" name="fourth">定时任务补偿</el-tab-pane>


 		</el-tabs>

	</div>
</template>

<script>
	export default{
		data(){
			return {
				activeName:'first',
			}
		},
		methods: {
      		handleClick(tab, event) {
        		console.log(tab, event);
      		}
    	}
	}
</script>
<style scoped>
	.level{margin-top:30px;}
	.upgrade{float:right;margin-top:8px;cursor: pointer}
	.level p:nth-of-type(1) span:nth-of-type(1){margin-left: 2px}
	.level p:nth-of-type(1) span:nth-of-type(2){color: #ffac52}
	.level p:nth-of-type(1) span:nth-of-type(3){color: #999;font-size: 14px;margin-left: 40px}
	.level p:nth-of-type(2){margin:34px 0 0px 0px}
	.level p:nth-of-type(2) i{display: inline-block;width: 100px;height: 1px;background: #fe9039;position: relative;top: -29px}
	.level_content{border:1px solid #DDDDDD;height: 166px;padding:20px;font-size: 14px;box-sizing: border-box}
	.img_wap span{display: inline-block;position: relative;width: 64px;height: 64px;margin-left: -5px;cursor: pointer;}
	.img_wap span:hover div{display: block;}
	.img_wap span:nth-child(1){margin-left: 0px!important}
	.img_wap span div{position:absolute;left:0;top:0px;width:64px;height:64px;border-radius:100%;background:rgba(0,0,0,.5);z-index: 2;display: none;}
	.img_wap span img{position: absolute;left: 0;top: 0;width: 64px;height: 64px;margin-left: 0px!important}
	.user_table{width: 100%;height: 165px;font-size: 14px;border-collapse:collapse;color:#666;box-sizing: border-box;border:1px solid #ddd;}
	.tlevel{border-right: 1px solid #ddd;border-bottom: 1px solid #ddd}
	.tq{border-right: 1px solid #ddd}
	.user_table tr{height: 41px;text-align: left}
	.user_table td{border-bottom: 1px solid #ddd;}
	.user_table tr th:nth-child(2){width: 200px;padding-left: 20px}
	.user_table tr th:nth-child(3){width: 246px}
	.user_table tr th:nth-child(4){width: 235px}
</style>