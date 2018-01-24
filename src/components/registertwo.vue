<template>
	<div id="registertwo"
			v-loading="loading"
	    element-loading-text="注册中请稍后"
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(0, 0, 0, 0.8)"
	>
			<div id="title">
	      注册（2/2）
	    </div>
	    <div id="hidden">
	    	<div id="tel_fa">
		    	<input  value="手机号" disabled="disabled"><input value="邀请码"  disabled="disabled" >
		    </div>
		    <div id="tel">
		    	<input v-model="telNumber" type="text" disabled="disabled"><input v-model="invCode" disabled="disabled" >
		    </div>
	    </div>
	    <div id="code">
	    	<input v-model="sureCode" type="number" placeholder="输入短信验证码"><button @click="reSend" id="resend">立即发送</button>
	    </div>
	    <div id="end">
	      <button @click="endReg">确定注册</button>
	    </div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				telNumber:'',
				invCode:'',
				sureCode:'',
				addressId:'',
				loading:false,
				url:'http://api.lkmao.com/v1/register_validate',
				urlCode:'http://api.lkmao.com/v1/register',
			}
		},
		methods:{
			// 确定注册
			endReg:function(){
				if (this.sureCode=='') {
					this.$notify({
						title: '提示',
	            message: '请输入验证码',
	            offset: 100,
	            type:'error',
	            duration:1000
					})
				}
				else if(this.sureCode.length!=6){
					this.$notify({
						title: '提示',
	            message: '验证码长度为6位',
	            offset: 100,
	            type:'error',
	            duration:1000
					})
				}
				else{
					this.sendData()
				}
			},
			// 发送验证码
			send:function(){
				let time = 60;
				const oResend = document.querySelector('#resend');
				const timer = setInterval(function(){
					time --;
					oResend.innerText=time+'s重发';
					oResend.setAttribute('disabled','disabled')
					oResend.style.background='#6d9fa6';
					if (time==1) {
						clearInterval(timer);
						time = 60;
						oResend.innerText = '重新发送';
						oResend.removeAttribute('disabled');
						oResend.style.background='#00bcd5';
					}
				},1000)
			},
			// 点击重新发送验证码
			reSend:function(){
				this.reSendData();
			},
			//重新发验证码
			reSendData:function(){
				var newFormData = new FormData()
				newFormData.set('mobile',this.telNumber)
				newFormData.set('invite_code',this.invCode)
				axios({
	        method:'post',
	        url:this.urlCode,
	        data:newFormData,
	        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
      	})
      	.then((response)=>{
      		if (response.data.success==1) {
						this.send();
    				this.$notify({
	            title: '提示',
	            message: '短信验证已发送',
	            offset: 100,
	            type:'error',
	            duration:3000
          	});
  					// console.log(response.data.msg);
    			}
      		else{
      			this.$notify({
	            title: '提示',
	            message: response.data.msg,
	            offset: 100,
	            type:'error',
	            duration:4000
		        });
    				// console.log(response.data.msg);
      		}
      	})
      	.catch((error)=>{
      		console.log(typeof + error)
      	})
			},
			// 接收数据
			receiveData:function(){
				this.telNumber = this.$route.params.mobile
				this.invCode = this.$route.params.invite_code
				this.addressId = this.$route.params.address_id
			},
			// 发送数据
			sendData:function(){
				this.loading=true
				var bodyFormData = new FormData()
				bodyFormData.append('mobile',this.telNumber);
  			bodyFormData.append('code',this.sureCode);
  			bodyFormData.append('invite_code',this.invCode);
  			bodyFormData.append('address_id',this.addressId);
				axios({
					method:'post',
		        url:this.url,
		        data:bodyFormData,
		        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
				})
				.then((response)=>{
					// console.log(response.data);
					// console.log(this.telNumber+this.sureCode+this.invCode+this.addressId)
					if (response.data.success==1) {
						this.loading=false
						this.$notify({
							title: '提示',
	            message: response.data.msg,
	            offset: 100,
	            type:'success',
	            duration:3000
						})
						this.$router.push({
							name:'setPassword',
              params:{
                mobile:this.telNumber,
                code:this.sureCode,
              },})
					}
					else{
						this.loading=false
						this.$notify({
							title: '提示',
	            message:response.data.msg,
	            offset: 100,
	            type:'error',
	            duration:3000
						})
					}
				})
				.catch((error)=>{
					console.log(typeof + error)
				})
			}
		},
		mounted:function(){
			this.send();
		},
		created:function(){
			this.receiveData();
		}
	}
</script>

<style lang="scss" scoped>
	#registertwo{
		height:100%;
		background: #fff;
		overflow:auto;
		#title{
	      background: #00bcd5;
	      padding:1rem 0;
	      font-size:1rem;
	      font-weight:bold;
	      letter-spacing:.12rem;
	      color:#fff;
	  }
	  #hidden{
	  	display:none;
	  }
	  	#code{
	  		margin-top: 2rem;
	  		input{
	  			-webkit-appearance:none;
	  			border-radius:0 !important;
	  			width:60%;
        	border:none;
        	box-shadow:none;
        	padding:.6rem 0;
        	font-size:.8rem;
        	text-indent:.6rem;
        	color:#4b4745;
        	font-weight:bold;
    			border-bottom:1px solid #cac9c9;
	  		}
	  		#resend{
	  			width:20%;
	  			padding:.6rem 0;
        	font-size:.8rem;
        	background: #00bcd5;
        	border:none;
        	box-shadow:none;
        	color:#fff;
        	font-weight:bold;
	  		}
	  	}
	  	#tel_fa{
	  		margin-top: 2rem;
	  		input{
	  			-webkit-appearance:none;
	  			border-radius:0 !important;
	  			text-align:center;
        	border:none;
        	box-shadow:none;
        	padding:.6rem 0;
        	font-size:.8rem;
        	text-indent:.6rem;
        	color:#4b4745;
        	font-weight:bold;
	  		}
	  		input:first-child{
	  			width:40%;
	  			border-right:1px solid #c3bfbf;
	  		}
	  		input:nth-child(2){
					width:40%;
	  		}
	  	}
	  	#tel{
	  		input{
	  			-webkit-appearance:none;
	  			border-radius:0 !important;
	  			text-align:center;
        	border:none;
        	box-shadow:none;
        	padding:.6rem 0;
        	font-size:.8rem;
        	text-indent:.6rem;
        	color:#f63300;
        	font-weight:bold;
    			border-bottom:1px solid #cac9c9;
	  		}
	  		input:first-child{
	  			width:40%;
	  		}
	  		input:nth-child(2){
					width:40%;
	  		}
	  	}
	  	#end{
		    width:84%;
		    margin: 3rem auto;
		    button{
	  			-webkit-appearance:none;
	        box-shadow:none;
	        border:none;
	        color:#fff;
	        width:100%;
	        background:#00bcd5;
	        padding:.5rem 0;
	        font-weight:bold;
	        border-radius:4px;
	        font-size:.8rem;
	      	}
    	}
	}
</style>