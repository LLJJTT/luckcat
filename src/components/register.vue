<template>
  <div id="register"
      v-loading="loading"
      element-loading-text="注册中请稍后"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
            <div class="border_div"></div>
          </li>
          <li>
            <input v-model="invCode" :disabled="disabled" placeholder="请输入邀请码">
            <div class="border_div"></div>
          </li>
        </ul>
    </div>
    <div id="area">
      <span>当前所在地：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(请如实选择，这决定您的分润利益!)</span>
    </div>
    <div id="option">
      <el-row>
        <el-col :span="8">
          <el-select
            v-model="sheng"
            @change="choseProvince"
            placeholder="请选择地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="shi"
            @change="choseCity"
            placeholder="请选择地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="qu"
            @change="choseBlock"
            placeholder="请选择地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
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
  export default {
    data () {
      return {
        loading:false,
        logo:'../static/img/logo.jpeg',
        mapJson:'../static/json/map.json',
        url:'http://api.lkmao.com/v1/register',
        phoneNumber:'',
        invCode:'',
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',
        E:'',
        URL:'',
        disabled:true
      }
    },
    methods:{
      // 验证输入格式
      startReg:function(){
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (this.phoneNumber=='') {
          this.$notify({
            title: '提示',
            message: '请输入手机号',
            offset: 100,
            type:'error',
            duration:1000,
          });
        }
        else if(reg.test(this.phoneNumber)!=true){
          this.$notify({
            title: '提示',
            message: '请输入正确手机号',
            offset: 100,
            type:'error',
            duration:1000
          });
        }
        else if (this.E=='') {
          this.$notify({
            title: '提示',
            message: '请选择地区',
            offset: 100,
            type:'error',
            duration:1000
          });
        }
        else if (this.invCode=='') {
          this.$notify({
            title: '提示',
            message: '请输入邀请码',
            offset: 100,
            type:'error',
            duration:1000
          });
        }
        else if (reg.test(this.phoneNumber)==true&&this.E!=''&&this.invCode!=''){
          // console.log(this.E)
          this.submitData();
        }
      },
      // 表单提交数据
      submitData:function(){
        var bodyFormData = new FormData()
        bodyFormData.append('mobile',this.phoneNumber);
        bodyFormData.append('invite_code',this.invCode);
        // 后台验证邀请码
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
              message: '邀请验证成功,短信验证已发送',
              offset: 100,
              type:'success',
              duration:3000
            });
            this.$router.push({
              name:'registertwo',
              params:{
                mobile:this.phoneNumber,
                invite_code:this.invCode,
                address_id:this.E
              },
            })
          }
          else{
            this.$notify({
              title: '提示',
              message: response.data.msg,
              offset: 100,
              type:'error',
              duration:3000
            });
            // console.log(response.data.msg);
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      },
      // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
      getUrl:function (){
        this.URL = window.location.search
        var a = this.URL.match(/[0-9]{6,11}$/)
        if (!a) {
          this.disabled=false;
        }
        else{
          this.invCode = a[0]
        }
      }
    },
    created:function(){
      this.getCityData()
      this.getUrl()
    }
}
</script>
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
            color:#141618;
            font-weight:bold;
          }
          .border_div{
            height:1px;
            background: #d0d0d0;
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
      font-size:.8rem;
      font-weight:bold;
      padding:0 1rem;
      .el-select{
        width:96%;
        text-align:left;
        box-shadow:none;
        background:#dcdcdc;
        border-radius:4px;
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






