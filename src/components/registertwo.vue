<template>
	<div id="registertwo">
		<div id="title">
	      注册（2/2）
	    </div>
	    <div id="code">
	    	<input v-model="sureCode" placeholder="输入短信验证码"><button @click="reSend" id="resend">重新发送</button>
	    </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				sureCode:''
			}
		},
		methods:{
			send:function(){
				let time = 15;
				const oResend = document.querySelector('#resend');
				const timer = setInterval(function(){
					time --;
					oResend.innerText=time+'s重发';
					oResend.setAttribute('disabled','disabled')
					oResend.style.background='#6d9fa6';
					if (time==1) {
						clearInterval(timer);
						time = 15;
						oResend.innerText = '重新发送';
						oResend.removeAttribute('disabled');
						oResend.style.background='#00bcd5';
					}

				},1000)
			},
			reSend:function(){
				this.send();
			}

		},
		mounted:function(){
			this.send();
		},
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
	  	#code{
	  		margin-top: 2rem;
	  		input{
	  			width:60%;
	          	border:none;
	          	box-shadow:none;
	          	padding:.6rem 0;
	          	font-size:.8rem;
	          	text-indent:.6rem;
	          	color:#f63300;
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
	}
</style>