<template>
	<div id="downapp">
		<div id="title">
	      下载App
	    </div>
	    <div id="banner">
	    	<img :src="bannerImg" alt="">
	    </div>
	    <div id="nowdown">
	    	<button @click="download">点击立即下载</button>
	    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bannerImg:'../static/img/logo.jpeg'
			}
		},
		methods:{
			download:function(){
				window.location.href="http://zhushou.360.cn/detail/index/soft_id/3915598?recrefer=SE_D_%E8%8E%B1%E5%AE%A2%E7%8C%AB"
			}
		}
	}
</script>

<style lang="scss" scoped>
	#downapp{
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
	  	#banner{
	  		margin-top: 1rem;
	  		img{
	  			width:80%;
	  			height:80%;
	  		}
	  	}
	  	#nowdown{
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