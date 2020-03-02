<template>
  <div class="index">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #304156">
        <el-menu
          :default-active="path"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#3a8adc"
          router
          unique-opened
          @click.native="zx"
        >
          <!-- 没有子菜单的菜单项 -->
          <div class="logo">
            <img src="../assets/images/login_03.png" />
            <span>外卖商家中心</span>
          </div>
          <!-- 首台首页 -->
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <!-- 订单管理 -->
          <el-menu-item index="/Order">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <!-- 商品管理 -->
          <el-submenu index="/goole">
            <template slot="title">
              <i class="el-icon-shopping-bag-2"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/Goodsadd">新增商品</el-menu-item>
            <el-menu-item index="/Goodslist">商品列表</el-menu-item>
          </el-submenu>
          <!-- 店铺管理 -->
          <el-menu-item index="/shop">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>
          <!-- 账号管理 -->
          <el-submenu index="/admin">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/admin_list">账号列表</el-menu-item>
            <el-menu-item index="/admin_add">添加账号</el-menu-item>
            <el-menu-item index="/admin_edit">修改密码</el-menu-item>
          </el-submenu>
          <!-- 销售统计 -->
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-eleme"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="Sales_statistics">商品统计</el-menu-item>
            <el-menu-item index="Order_statistics">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          style="text-align: right; font-size: 12px background-color: #fff;"
        >
          <el-breadcrumb>
            <el-breadcrumb-item to="/index" v-if="routed.path != '/index'"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item to v-for="(v, i) in routed.meta" :key="i">{{
              v
            }}</el-breadcrumb-item>
            <el-dropdown>
              <el-avatar
                ><img
                  :src="imageUrl" 
              /></el-avatar>
              <el-dropdown-menu slot="dropdown" route>
                <el-dropdown-item>欢饮您，{{ user }}</el-dropdown-item>
                <el-dropdown-item
                  ><router-link to="/Editor"
                    ><a @click="zx" >用户信息</a></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item><a @click="logou">退出</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <!-- 二级页面显示 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      routed: "",
      user: "",
      imageUrl:""
    };
  },
  created() {
    //验证登录状态
    var tab = this;
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      //第一次验证是否存在user的值
      this.$axios
        .get(tab.$url + `/sell/users.php?a=chklogin&id=${user["id"]}&token=${user["token"]}`)
        .then(res => {
          if (res.data.code === 0) {
            //第二次服务器验证是否通过
            //已登录获取用户名
            this.$axios
              .get(tab.$url + `/sell/users.php?a=readOne&id=${user["id"]}`)
              .then(res => {
                tab.user = res.data.data.account;
                tab.imageUrl = res.data.data.imgUrl;
              });
          } else {
            tab.$message.error("请登录");
            tab.$router.push("/");
          }
        });
    } else {
      tab.$message.error("请登录");
      tab.$router.push("/");
    }
  },
  mounted() {
    this.path = this.$route.path;
    this.zx();
  },
  methods: {
    zx() {
      var tab = this;
      //定时器 延时加载只执行一次
      setTimeout(function() {
        tab.routed = tab.$route;
      }, 10);
    },
    logou() {
      //退出
      sessionStorage.removeItem("user");
      this.$router.push("/"); //跳转到登录页
    }
  }
};
</script>

<style scoped>
.index .el-container {
  height: 100%;
}
.index .el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.index .title {
  font-weight: bold;
}
.index .el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
.index .el-aside h3 {
  color: #fff;
  padding: 30px 0;
}
.index .el-menu {
  background-color: #e9eef3;
  border-right: 0 !important;
  color: #333;
}
.index .logo {
  width: 100%;
  line-height: 100px;
}
.index .logo span {
  display: block;
  color: #fff;
  float: right;
  margin-right: 30px;
}
.index .el-main {
  background: #f0f2f5;
}
.index .el-header {
  line-height: 60px;
  background: #fff;
}
.index .el-breadcrumb {
  line-height: 60px;
}
.index .el-avatar {
  margin-top: 10px;
}
</style>
