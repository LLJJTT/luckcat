<template>
	<div id="setpassword">
		<div id="title">
	      设置密码
	    </div>
	    <div id="info">
	    	<input v-model="pw1" type="password" placeholder="请输入密码">
	    	<input v-model="pw2" type="password" placeholder="请再次输入密码">
	    </div>
	    <div id="sure">
	    	<button @click="setPassword">确定</button>
	    </div>
	</div>
</template>

<script>
	import axios from 'axios'
	import crypto from 'crypto'
	export default{
		data(){
			return{
				pw1:'',
				pw2:'',
				mobileNumber:'',
				sureCode:'',
				pw:'',
				url:'http://api.lkmao.com/v1/init_password'
			}
		},
		methods:{
			// 点击确定
			setPassword:function(){
				if (this.pw1=='') {
					this.$notify({
						title: '提示',
			            message: '请设置密码',
			            offset: 100,
			            type:'error',
			            duration:1000
					})
				}
				else if(this.pw1.length<6){
					this.$notify({
						title: '提示',
			            message: '密码长度最少六位',
			            offset: 100,
			            type:'error',
			            duration:1000
					})
				}
				else if(this.pw2==''){
					this.$notify({
						title: '提示',
			            message: '请在设置密码',
			            offset: 100,
			            type:'error',
			            duration:1000
					})
				}
				else if(this.pw2!=this.pw1){
					this.$notify({
						title: '提示',
			            message: '两次密码不一致',
			            offset: 100,
			            type:'error',
			            duration:1000
					})
				}
				else{
					this.setMd5()
					this.sendPassword()
				}
			},
			// 加密密码
			setMd5:function(){
				var md5 = crypto.createHash("md5")
				md5.update(this.pw2)
				this.pw = md5.digest('hex')
			},
			// 发送数据
			sendPassword:function(){
				var bodyFormData = new FormData()
        bodyFormData.append('mobile',this.mobileNumber)
        bodyFormData.append('code',this.sureCode)
        bodyFormData.append('password',this.pw)
        axios({
          method:'post',
          url:this.url,
          data:bodyFormData,
          config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        })
        .then((response)=>{
        	if (response.data.success==1) {
        		this.$notify({
							title: '提示',
	            message:'密码设置成功',
	            offset: 100,
	            type:'success',
	            duration:3000
						})
						this.$router.push({
							path:'/downloadapp'
						})
        	}
        	else{
        		this.$notify({
							title: '提示',
	            message:response.data.msg,
	            offset: 100,
	            type:'error',
	            duration:1000
						})
        	}
        })
        .catch((error)=>{
        	console.log(typeof + error)
        })
			}

		},
		created:function(){
			// 获取传递数据
			this.mobileNumber = this.$route.params.mobile
			this.sureCode = this.$route.params.code
		}
	}
</script>

<style lang="scss" scoped>
	#setpassword{
		height:100%;
		background: #ffffff;
		#title{
	      background: #00bcd5;
	      padding:1rem 0;
	      font-size:1rem;
	      font-weight:bold;
	      letter-spacing:.12rem;
	      color:#fff;
	  	}
	  	#info{
	  		margin-top: 1rem;
	  		input{
	  			width:90%;
	  			margin: 1rem auto;
	  			display:block;
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
	  	}
	  	#sure{
		    width:84%;
		    margin: 4rem auto;
		    button{
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