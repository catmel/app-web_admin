<template>
  <div class="edit">
    <h1>修改密码</h1>
    <el-form ref="pwdForm" :model="pwdForm" label-width="80px" :rules="rules">
      <el-form-item label="原始密码" prop="oldpwd">
        <el-input v-model="pwdForm.oldpwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="pwdForm.newpwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repwd">
        <el-input v-model="pwdForm.repwd" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwd">确定</el-button>
        <el-button @click="cz">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    //定义 checkNewpwd新密码验证规则
    var checkNewpwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入6位以上的密码"));
      } else {
        callback();
      }
    };
    //定义 checkRepwd确认密码验证规则
    var checkRepwd = (rule, value, callback) => {
      if (value != this.pwdForm.newpwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      
      }
    };
    return {
      pwdForm: {
        oldpwd: "",
        newpwd: "",
        repwd: ""
      },
      //1. 设置自定义验证的规则
      rules: {
        newpwd: [{ validator: checkNewpwd, trigger: "blur" }],
        repwd: [{ validator: checkRepwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    //3. 点击确定按钮时，触发。验证新密码规则
    changePwd() {
      this.$refs.pwdForm.validate(result => {
        if (result) {
          var tab = this;
          var user = JSON.parse(sessionStorage.getItem("user"));
          var pacc = {
            newPassword: this.pwdForm.newpwd, //新密码
            oldPassword: this.pwdForm.oldpwd, //旧密码
            token: user["token"], //令牌
            id: user["id"]
          }; //用户id
          this.$axios
            .post(
              tab.$url + `/sell/users.php?a=chgpwd`,
              tab.$qs.stringify(pacc)
            )
            .then(res => {
              if (res.data.code === 0) {
                tab.$message({
                  message: res.data.msg,
                  type: "success"
                });
                //退出
                sessionStorage.removeItem("user");
                this.$router.push("/"); //跳转到登录页
              } else {
                tab.$message.error("原始密码错误");
              }
            });
        } else {
          return false;
        }
      });
    },
    cz() {
      this.$refs.pwdForm.resetFields();
    }
  }
};
</script>

<style>
.edit {
  color: #303133;
  background: #fff;
  border-radius: 12px;
}
.edit h1 {
  font-size: 24px;
  color: #303133;
  width: 98%;
  line-height: 50px;
  text-align: left;
  padding-left: 30px;
  border-bottom: 2px solid #eff1f7;
}
.edit .el-form {
  width: 300px;
  height: 600px;
  margin: 30px 0 0 96px;
}
</style>
