<template>
  <div class="admininfo">
    <span>管理员信息</span>
    <el-divider></el-divider>
    <span>管理员ID ：{{id}}</span>
       <el-divider></el-divider>
    <span>账号：{{account}}</span>
    <el-divider></el-divider>
    <span>用户组：{{userGroup}}</span>
    <el-divider></el-divider>
    <span>创建时间：{{ctime}}</span>
    <el-divider></el-divider>
    <div class="uplode">
      <span>管理员头像</span>
      <el-upload
        class="avatar-uploader"
        action="http://work.08321.org/sell/goods.php?a=uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl:'',
      id:null,
      ctime:null,
      userGroup:"",
      account:""
      
    }
  },
  methods:{
     handleAvatarSuccess(res) {
      this.imageUrl = 'http://work.08321.org'+res.data;
      var tab=this;
       this.$axios.post(tab.$url+`/sell/users.php?a=chgImg`,tab.$qs.stringify({id:tab.id,imgUrl:tab.imageUrl})).then((res)=>{
        if(res.data.code === 0){
             tab.$message({
                        message: res.data.msg,
                        type: 'success'
        });//头像修改成功
       this.$router.go(0) //更新
        }
       })
     
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created(){
      var tab=this;
      var user =JSON.parse(sessionStorage.getItem("user"));
      this.$axios.get(tab.$url+`/sell/users.php?a=readOne&id=${user["id"]}`).then((res)=>{
          this.id=res.data.data.id
          this.ctime=res.data.data.ctime
          this.userGroup=res.data.data.userGroup
          this.account=res.data.data.account
          this.imageUrl=res.data.data.imgUrl
      })
  }

};
</script>
<style>

.el-upload  .avatar{
    width: 180px;
    height: 180px;
    border-radius: 50%
}

.admininfo span{
    display: flex;
    align-items: center;
}

</style>