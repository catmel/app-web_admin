<template>
  <div class="login">
    <el-row :gutter="17">
      <el-col :span="8" :offset="8">
        <h1 class="title">用户登陆</h1>
        <div class="grid-content bg-purple">
          <br />
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="name">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-user" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                placeholder="密码"
                prefix-icon="el-icon-lock"
                v-model="form.pwd"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script >
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      var tab=this;
      this.$refs[form].validate(function(res) {
        if (res) {
             var pacc={account:tab.form.name,password:tab.form.pwd}
             tab.$axios.post(tab.$url+'sell/users.php?a=login',tab.$qs.stringify(pacc)).then((res)=>{
            if(res.data.code == "0"){
                   tab.$message({
                        message: res.data.msg+"欢迎您！"+res.data.data.account,
                        type: 'success'
                       });//登录成功提示
                      var data={//登录成功后 登录信息存入session 
                        id:res.data.data.id,
                        token:res.data.token
                      }
                      sessionStorage.setItem("user",JSON.stringify(data));//转换成字符串之后存在session
                      tab.$router.push("index");//跳转到首页
              }else{
                tab.$message.error(res.data.msg);//登录失败提示原因
              }
          })
        }
      });
    }
  }
};
</script>
<style >
.login {
  height: 100%;
  background-color: #2d3a4d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login .el-row {
  width: 1200px;
}
.login .title {
  text-align: center;
  font-size: 24px;
  color: #fff;
}
.login .el-button {
  width: 100%;
}
.login .el-input__inner {
  background-color: #283443;
  color:#fff;
}
</style>