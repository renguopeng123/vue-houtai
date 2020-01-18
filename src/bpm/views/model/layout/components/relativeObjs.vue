<template>
  <div class="el-card is-hover-shadow obj-summary">
    <div class="id-display">{{num + 1}}</div>
    <div class="object-info">
      <div class="name">
        <div>名称:</div>
        <div>描述:</div>
        <div>实体:</div>
      </div>
      <div class="value">
        <div class="common">{{objModel.name}}</div>
        <div class="common">{{objModel.desc}}</div>
        <div class="entity-array">
          <div class="each-tag" v-for="item in objModel.entity">
            <el-tag size="small" type="info">{{item}}</el-tag>
          </div>
        </div>
      </div>
    </div>
    <el-button size="mini" type="text" class="see">查看</el-button>
  </div>
</template>

<script>
  export default {
    name: "relativeObjs",
    props:{
      objModel: {
        name: "请假单",
        desc: "普通员工请假申请单",
        entity: []
      },
      num:Number
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../style.scss";
  .obj-summary {
    width:100%;
    height:150px;
    display: flex;
    position:relative;
    margin-bottom:5px;
  }
  .id-display {
    background-color: #ecf8ff;
    width:30px;
    padding-top:5px;
    text-align: center;
  }
  .object-info {
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
    .entity-array {
      width:100%;
      display: flex;
      flex-wrap:wrap;
      .each-tag {
        display: flex;
        align-items: center;
        height:2.5em;
        margin-right:5px
      }
    }

  }
  .see {
    position:absolute;
    top:5px;
    right:10px;
  }

</style>
