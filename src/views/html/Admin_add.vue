<template>
  <div class="add">
    <h1>用户新增</h1>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="yhz">
        <el-select placeholder="请选择用户组" v-model="form.yhz" style="width:220px">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
          <el-option label="普通用户" value="普通用户"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button  @click="cz">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
        //定义 用户验证规则 
			var user = (rule, value, callback) => {
				if(value.length <=2) {
					callback(new Error('请输入3位以上用户名'));
				}else{
          var tab=this;
          this.$axios.get(tab.$url+`/sell/users.php?a=userExists&account=${value}`).then((res)=>{
          if(res.data.code === 0){
              callback()
          }else{
              callback(new Error(res.data.msg));
          }
      })
				}
			};

    return {
      form: {
        user: "",
        pwd: "",
        yhz:"",
        mate:""
      },
      rules: {
        user: [
						{ validator: user, trigger: 'blur' }
					],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((result)=>{
					if(result){
            //创建账号
            var tab=this;
             var pacc=new URLSearchParams();
                pacc.append("account",tab.form.user)
                  pacc.append("password",tab.form.pwd)
                  pacc.append("userGroup",tab.form.yhz)
            this.$axios.post(tab.$url+"/sell/users.php?a=add",pacc).then((res)=>{
              if(res.data.code == "0"){
                 tab.$message({
                        message: res.data.msg,
                        type: 'success'
                       });//添加成功提示
                tab.$router.push("/admin_list")
              }else{
                 tab.$message.error(res.data.msg)
              }
            })
					}else{
						return false;
					}
        });
        
    },cz(){
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style>
.add {
  color: #303133;
  background: #fff;
  border-radius: 12px;
}
.add h1 {
  font-size: 24px;
  color: #303133;
  width: 98%;
  line-height: 50px;
  text-align: left;
  padding-left: 30px;
  border-bottom: 2px solid #eff1f7;
}
.add .el-form {
  width: 300px;
  height: 600px;
  margin: 30px 0 0 96px;
}
</style>