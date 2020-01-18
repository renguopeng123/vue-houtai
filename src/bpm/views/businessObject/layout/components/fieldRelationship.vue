<template>
  <el-table
    :data="tableData"
    :show-header="false">
    <el-table-column
      show-overflow-tooltip
      label="商品 ID"
      align="right"
      prop="id">
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      label="商品名称"
      width="90"
      prop="name">
      <template slot-scope="scope" >
        <div style="height:0px; border: 1px none #cdd1d5;border-top-style: dotted;"></div>
      </template>
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      label="描述"
      prop="desc">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "fieldRelationship",
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-table {
  /deep/td {
    border-bottom-color: transparent;
  }

  /deep/th {
    border-bottom-color: transparent;
  }

  &:before {
     height: 0 !important;
   }
  }
</style>
