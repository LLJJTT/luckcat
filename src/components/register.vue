<template>
  <div id="register">
    <div id="title">
      注册（1/2）
    </div>
    <div id="div_img">
      <img :src="logo" alt="">
      <p>使用邀请码注册</p>
    </div>
    <div id="sure">
      <ul>
        <li>
          <input v-model="phoneNumber" type="number" placeholder="输入手机号">
        </li>
        <li>
          <input v-model="invCode" type="number" placeholder="输入邀请码">
        </li>
      </ul>
    </div>
    <div id="area">
      <span>当前所在地：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(请如实选择，这决定您的分润利益!)</span>
    </div>
    <div id="option">
      <el-row>
        <el-col :span="8">
          <select>
            <option :value="province">{{province}}</option>
          </select>
        </el-col>
        <el-col :span="8">
          <select>
            <option :value="city">{{city}}</option>
          </select>
        </el-col>
        <el-col :span="8">
          <select >
            <option :value="block">{{block}}</option>
          </select>
        </el-col>
      </el-row>
    </div>
    <div id="btn">
      <button @click="startReg">开始注册</button>
      <p>下一步输入短信验证码</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { testEffective } from '../service'
export default {
  data () {
    return {
      logo:'../static/img/logo.jpeg',
      phoneNumber:'',
      invCode:'',
      province:'省级',
      city:'市级',
      block:'区级',
      allKey:[],
      provinceKey:[],
      cityKey:[],
      blockKey:[],
      allData:[],
      provinceData:[],
      cityData:[],
      blockData:[],
    }
  },
  methods:{
    startReg:function(){
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.phoneNumber=='') {
        this.$notify({
          title: '提示',
          message: '请输入手机号',
          offset: 100,
          type:'error',
          duration:2000,
        });
      }
      else if(reg.test(this.phoneNumber)!=true){
        this.$notify({
          title: '提示',
          message: '请输入正确手机号',
          offset: 100,
          type:'error',
          duration:2000

        });
      }
      else if (this.invCode=='') {
        this.$notify({
          title: '提示',
          message: '请输入邀请码',
          offset: 100,
          type:'error',
          duration:2000

        });
      }
      else{
        this.testEffective()
      }
    },
    async testEffective(){
        const params = {mobile:this.phoneNumber,invite_code:this.invCode}
        const response = await testEffective(params);
        console.log(response)
        if (response.data.success==1) {
          this.$router.push({path:'/registertwo'});
        }
        else{
          console.log(response.data.msg);
        }
    },
    getCityData:function(){
      axios.get('../../../static/json/map.json').then(function(response){
        if (response.status==200) {
          console.log(response.data)
        }
        else{
          console.log(response.status)
        }
      }).catch(function(error){console.log(typeof+ error)})
    }
  },
  created:function(){
   this.getCityData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
#register{
  height:100%;
  overflow:auto;
  #title{
      background: #00bcd5;
      padding:1rem 0;
      font-size:1rem;
      font-weight:bold;
      letter-spacing:.12rem;
      color:#fff;

  }
  #div_img{
    margin-top: 2rem;
    img{
      width:4rem;
      height:4rem;
    }
    p{
      font-size:1.4rem;
      font-weight:bold;
      margin-top: .5rem;
    }
  }
  #sure{
    margin-top: 1rem;
    ul{
      li{
        background: #fff;
        display:block;
        width:98%;
        margin: 0 auto;
        input{
          width:100%;
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
      li:last-child{
        margin-top: 1rem;
      }
    }
  }
  #area{
    margin-top: 1.8rem;
    text-align:left;
    text-indent:.6rem;
    span:first-child{
      font-size:1rem;
      font-weight:bold;
    }
    span:last-child{
      font-size:0.6rem;
      color:#7f7f7f;
    }
  }
  #option{
    margin-top: 1.8rem;
    text-align:center;
    font-size:1rem;
    font-weight:bold;
    select{

      width:80%;
      text-align:center;
      box-shadow:none;
      border:none;
      background:#dcdcdc;
      border-radius:4px;
      padding:.4rem 0.2rem;
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow:hidden;
    }
  }
  #btn{
    width:96%;
    margin: 3rem auto;
    button{
      box-shadow:none;
      border:none;
      color:#fff;
      width:100%;
      background:#00bcd5;
      padding:.6rem 0;
      font-weight:bold;
      border-radius:4px;
      font-size:1rem;
    }
    p{
      text-align:left;
      margin-top: 1.8rem;
      font-size:1rem;
    }
  }




}
</style>






