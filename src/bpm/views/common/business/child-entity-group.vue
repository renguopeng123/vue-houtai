<template>
  <div class="child-entity-container">
    <el-scrollbar class="scrollbar-style">
      <el-tag
        closable
        v-for="item in relativeEntities"
        :key="item.elementId" type="info">{{item.name}}
      </el-tag>
      <el-tag effect="plain">
        <i title="搜索业务实体" class="el-icon-search el-button--text"></i>
      </el-tag>
    </el-scrollbar>
  </div>

</template>

<script>
  export default {
    name: "childEntityGroup",
    props:{
      relativeEntities:{
        type:Array,
        default:[]
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "./style.scss";
  .el-tag {
    margin: .25em .5em .25em 0;
    &:nth-last-child(2) {
      margin: .25em 0;
    }
    &:last-child {
      border-color:transparent;
    }
  }
  i {
    font-weight:600;
  }
  .child-entity-container {
    width:100%;
    height:100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
  }
</style>
