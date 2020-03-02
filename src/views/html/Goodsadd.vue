<template>
  <div class="goodsadd box">
    <el-card class="box-card">
      <h1 slot="header" class="clearfix">添加商品</h1>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option label="电子产品" value="电子产品"></el-option>
            <el-option label="食品饮料" value="食品饮料"></el-option>
            <el-option label="衣服鞋帽" value="衣服鞋帽"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品特色">
          <el-checkbox-group v-model="form.feature">
            <el-checkbox label="新品上市" name="feature"></el-checkbox>
            <el-checkbox label="第二单半价" name="feature"></el-checkbox>
            <el-checkbox label="主打产品" name="feature"></el-checkbox>
            <el-checkbox label="火爆产品" name="feature"></el-checkbox>
            <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
            <el-checkbox label="源自四川" name="feature"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="图片上传">
          <el-upload
            class="avatar-uploader"
            action="http://work.08321.org/sell/goods.php?a=uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否促销">
          <el-radio-group v-model="form.sales">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="食品规格">
          <el-radio-group v-model="form.specs">
            <el-radio label="单规格"></el-radio>
            <el-radio label="多规格"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="包装费">
          <el-input-number
            v-model="form.packprice"
            @change="packchange"
            :min="0"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="价格">
          <el-input-number
            v-model="form.price"
            @change="pricechange"
            :min="5"
            :max="50"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        category: "电子产品",
        feature: ["新品上市", "火爆产品"],
        imageUrl: "",
        sales: "促销",
        specs: "单规格",
        packprice: 0,
        price: 20,
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //创建账号
      var tab = this;
      var pacc = {
        goodsname: this.form.name, //产品名称
        goodscategory: this.form.category, //商品分类
        goodsfeature: this.form.feature.join(","), //商品特性
        imgUrl: this.form.imageUrl, //商品图片地址
        isPromotion: this.form.sales, //是否促销
        standard: this.form.specs, //规格
        packprice: this.form.packprice, //包装费
        price: this.form.price, //价格
        goodsdesc: this.form.desc //商品描述
      };

      this.$axios
        .post(tab.$url + "/sell/goods.php?a=add", tab.$qs.stringify(pacc))
        .then(res => {
          if (res.data.code == "0") {
            tab.$message({
              message: res.data.msg,
              type: "success"
            }); //添加成功提示
            tab.$router.push("/Goodslist");
          } else {
            tab.$message.error(res.data.msg);
          }
        });
    },
    handleAvatarSuccess(res) {
      this.form.imageUrl = "http://work.08321.org" + res.data;
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //修改包装费时触发
    packchange(value) {
      console.log(value);
    },
    //修改价格时触发
    pricechange(v) {
      console.log(v);
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-card__body .el-form {
  width: 1200px;
}
.goodsadd .clearfix {
  text-align: left;
  font-size: 1.8em;
}
.goodsadd .el-card ,.goodsadd {
  border-radius: 12px;

}
</style>