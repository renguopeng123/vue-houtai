<template>
  <div>
    <el-table
      :data="tableData"
      :show-header="false"
      style="width: 100%">
      <el-table-column width="30" type="expand">
        <template slot-scope="props">
          <field-relationship></field-relationship>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="right"
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="商品名称"
        width="90"
        prop="name">
        <template slot-scope="scope" >
            <svg-icon style="width:100%;color:green" :icon-class="scope.row.name"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="描述"
        prop="desc">
      </el-table-column>
      <el-table-column
        width="30"
        show-overflow-tooltip
        label="操作"
        prop="opr">
        <template slot-scope="scope" >
          <div @click="modifyRelationship">
            <svg-icon class="el-button--text" icon-class="edit"></svg-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="关联关系"
      :visible.sync="dlgVisible"
      :before-close="handleCloseDlg"
      width="50%">
        <div>
          <div class="relation-dlg-common up">
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
              <el-select v-model="value" placeholder="请选择">
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
            </div>
          </div>
          <field-mapping
            v-for="(item,index) in mappingData"
            @addOneRow="insertOneRowBelow"
            @delCurrentRow="delCurrentRow"
            :index="index"
          ></field-mapping>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" plain style="float:left">删除关联</el-button>
        <el-button @click="dlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import FieldRelationship from "./fieldRelationship";
  import FieldMapping from "./field-mapping";
  export default {
    name:"relationShip",
    components: {FieldMapping, FieldRelationship},
    data() {
      return {
        mappingData:[{},{}],
        value:{
        },
        options:[],
        dlgVisible:false,
        tableData: [{
          id: '12987122',
          name: 'one_many',
          desc: '荷兰优质淡奶，奶香浓而不腻',
        },{
          id: '12987122',
          name: 'one_one',
          desc: '荷兰优质淡奶，奶香浓而不腻',
        }]
      }
    },
    methods: {
      insertOneRowBelow(index) {
        this.mappingData.splice(index, 0, {})
      },
      delCurrentRow(index) {
        debugger;
        this.mappingData.splice(index, 1)
      },
      modifyRelationship() {
        this.dlgVisible = true;
      },
      handleCloseDlg(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../style.scss";

  .el-table {
    /deep/ .el-table__expanded-cell {
      padding: 0;
    }
    /deep/ td {
      border-bottom-color: transparent;
    }

    /deep/ th {
      border-bottom-color: transparent;
    }

    &:before {
      height: 0 !important;
    }
  }

  //特定css
  .up .right .el-select {
    width:190px;
  }

  .el-dialog__wrapper {
    /deep/ .el-dialog__header {
      border-bottom: $borderStyle;
    }

    /deep/ .el-dialog__footer {
      border-top: $borderStyle;
    }
    /deep/ .el-dialog__body {
      max-height: 300px;
      overflow: auto;
    }
  }

</style>
