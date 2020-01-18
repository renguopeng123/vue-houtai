<template>
  <div class="shopping-items-container" @mouseover="isShowStar=true" @mouseleave="isShowStar=false">
    <div class="left-hand" :style="isShowStar || isPrimary ? 'visibility:visible':'visibility:hidden'">
      <svg-icon
        :style="isPrimary ? 'color:red':'color:#cdd1d5'"
        @click="starClick" :icon-class="isPrimary ? 'starOn':'starOff'" style="font-size: 1em"/>
      <span v-show="isPrimary" style="margin-left:5px;">主</span>
    </div>
    <el-tag class="tag" closable disable-transitions :key="label" type="info"
      @close="handleClose(label)">{{label}}</el-tag>
  </div>
</template>

<script>
  export default {
    name: "shoppingItem",
    props:{
      label:{
        type:String,
        default:""
      },
      starOffByParentNotify: {
        type:String,
        default:""
      }
    },
    data() {
      return {
        isPrimary:false,
        isShowStar:false,

      }
    },
    methods:{
      starClick() {
        this.isPrimary = !this.isPrimary;
      },
      handleClose(label) {
        this.$emit("deleteItem", this.label);
      },
      handleStarShow() {
        return this.isShowStar && this.isPrimary ? 'visibility:visible':'visibility:hidden'
      }
    },
    watch:{
      isPrimary(newValue) {
        if (newValue) {
          this.$emit("IamPrimaryKey", this.label);
        }
      },
      starOffByParentNotify(newValue) {
        if (newValue !== this.label && this.isPrimary) {
          this.starClick();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shopping-items-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-bottom: 10px;
    width:100%;
    .left-hand {
      width:3em;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .tag {
      margin-left: 5px;
      width:calc(100% - 4em);
    }
    /deep/ .el-icon-close {
      float:right;
      margin-top:6px;
    }
  }
</style>
