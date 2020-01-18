<template>
  <div class="relation-dlg-common down">
    <div class="left">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="middle">
      <el-select v-model="index" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="right">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <i @click="addRow"><svg-icon icon-class="add-row" style="color:green"></svg-icon></i>
      <i @click="delRow"><svg-icon icon-class="plus-row" style="color:red"></svg-icon></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "field-mapping",
    props:{
      index:{
        type:Number,
      }
    },
    data(){
      return {
        value:{
        },
        options:[]
      }
    },
    methods:{
      addRow() {
        this.$emit("addOneRow", this.index);
      },
      delRow() {
        this.$emit("delCurrentRow", this.index);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../style.scss";
  .down {
    .left {
      display: flex;
      justify-content: flex-end;
      .el-select {
        width:160px;
      }
    }
    .right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-select {
        width:160px;
      }
      i {
        margin-left:auto;
      }
      .svg-icon {
        font-size:1.5em;
      }
    }
  }
</style>
