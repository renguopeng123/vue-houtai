<template>
  <div class="el-card is-hover-shadow obj-summary">
    <div class="id-display">{{id}}</div>
    <div class="form-info">
      <div class="name">
        <div>名称:</div>
        <div>别名:</div>
        <div>分组:</div>
      </div>
      <div class="value">
        <div class="common">{{formModel.name}}</div>
        <div class="common">{{formModel.desc}}</div>
        <div class="common">{{formModel.groupName}}</div>
      </div>
    </div>
    <el-button size="mini" type="text" class="see">查看</el-button>
  </div>
</template>

<script>
  export default {
    name: "relativeForms",
    data() {
      return {
        id:1,
        formModel:{
          name:"请假单",
          desc:"demo_qjd",
          groupName:"填报表单"
        },
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../style.scss";
  .obj-summary {
    width:100%;
    height:120px;
    display: flex;
    position:relative;
  }
  .id-display {
    background-color: #ecf8ff;
    width:30px;
    padding-top:5px;
    text-align: center;
  }
  .form-info {
    display: flex;
    padding:5px;
    display: flex;
    font-size: $fontSize;
    width:100%;
  }
  .name {
    width:40px;
    display: flex;
    color:$labelColor;
    flex-direction:column;
    align-items: flex-start;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height:2.5em;
      width:100%
    }
  }
  .value {
    width:100%;
    display: flex;
    padding-left:10px;
    flex-direction:column;
    align-items: flex-start;
    .common {
      width:100%;
      display: flex;
      align-items: center;
      height:2.5em;
    }
  }
  .see {
    position:absolute;
    top:5px;
    right:10px;
  }

</style>
