<template>
  <div>
    <el-tag closable v-if="entityName != ''" type="info">{{entityName}}</el-tag>
    <el-tag effect="plain">
      <i title="搜索业务实体" class="el-icon-search el-button--text"></i>
    </el-tag>
  </div>
</template>

<script>
  export default {
    name: "primaryEntity",
    props: {
      entityInfo:{
        type:String,
        default:"primaryEntity"
      }
    },
    computed:{
      entityName(){
        return this.entityInfo;
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-tag {
    &:last-child {
      border-color:transparent;
    }
  }
  i {
    font-weight:600
  }
</style>
