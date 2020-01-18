<template>
  <div class="shopping-cart-container">
    <div class="header">
      <div style="font-weight: 600">创建对象</div>
      <el-button
        @click="clearCart"
        style="margin-left:auto;color:#f56c6c"
        type="text" size="mini">清空
      </el-button>
    </div>
    <div class="body">
      <shopping-item
        @deleteItem="handleClose"
        @IamPrimaryKey="uniquePrimaryHandle"
        :starOffByParentNotify="notifyStarOff"
        v-for="tag in shoppingItems"
        :key="tag.elementId"
        :label="tag.name">
      </shopping-item>
    </div>
    <div class="foot">
      <el-button @click="createObjDlg" type="success" size="mini">创建</el-button>
      <el-button
        @click="cancel"
        size="mini"
      >取消</el-button>
    </div>
  </div>
</template>

<script>
  import ShoppingItem from "./shoppingItem";
  export default {
    name: "shoppingCart",
    components: {ShoppingItem},
    props:{
      shoppingItems:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        notifyStarOff:""
      }
    },
    methods:{
      createObjDlg() {
        if (this.shoppingItems.length == 0) {
          this.$message({
            message: '至少选择一个实体',
            type: 'warning'
          });
          return;
        }
        else if (this.notifyStarOff == "") {
          this.$message({
            message: '必须指定一个主实体',
            type: 'warning'
          });
          return;
        }
        let params = {
            entitiesCollection:[...this.shoppingItems],
            primaryKey:this.notifyStarOff
        };
        this.$emit("createObj", params);
      },
      uniquePrimaryHandle(name) {
        this.notifyStarOff = name;
      },
      handleClose(tag) {
        let index = this.shoppingItems.findIndex(item => {
          return tag = item.name;
        });
        if (index > -1) {
          this.$emit("unselectedElement", this.shoppingItems[index]);
        }
      },
      clearCart() {
        this.shoppingItems.splice(0, this.shoppingItems.length);
      },
      cancel() {
        this.$emit("cancelHandleShoppingCart");
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../style.scss";
  .shopping-cart-container {
    border: $borderStyle;
    font-size: $fontSize;
    width:230px;
    height:300px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s, -webkit-transform .3s;
    .header {
      height:40px;
      padding:0 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: $borderStyle;
    }
    .body{
      height:200px;
      padding:10px 10px;
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      flex-direction: column;
    }

    .foot {
      display: flex;
      height:40px;
      align-items: center;
      justify-content: center;
      border-top: $borderStyle;
    }

    .each-entity-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      margin-bottom: 10px;
      width:100%;


    }
  }
</style>
