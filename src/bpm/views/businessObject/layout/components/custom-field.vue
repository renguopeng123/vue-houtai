<template>
  <div class="body" @click="handleClick">
    <div class="left-group">
      <span style="color:#dcdfe6">{{num}}</span>
      <span style="margin-left:3px;font-weight: 500">{{fieldName}}</span>
    </div>
    <span style="color:#dcdfe6">{{fieldType}}</span>
  </div>
</template>

<script>
  export default {
    name: "custom-field",
    props: {
      num: {
        default: 1,
        type: Number
      },
      fieldName: {
        default: "china",
        type: String
      },
      fieldType:{
        default: "String",
        type: String
      }
    },
    methods:{
      handleClick() {
        this.$emit("fieldOnClick");
      }
    }
  }

</script>

<style scoped>
  .body {
    border:1px solid #dcdfe6;
    padding:5px;
    display: flex;
    height:20px;
    cursor: pointer;
    align-items: center;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-bottom:10px;
  }
  .body:active {
    border-color:#3a8ee6;
  }
  .body:hover {
    background: #fff;
    border-color: #409eff;
  }
  .body span {
    margin-left:auto;
  }
</style>
