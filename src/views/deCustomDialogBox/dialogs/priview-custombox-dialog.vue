<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
        </div>
        <div slot="footer">
            <el-button @click="confirm()" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
  // getdecusdialogboxData,  //获取自定义对话框列表数据
} from "@/api/api.js";
export default {
  name: "deveserialnum-info-dialog",
  props: {
    //对话框标题
    visible: {
      type: Boolean,
      required: true
    },
    priview_data: {
      type: Object,
      default:{}
    },
  },
  data() {
    return {
        title:"提示信息",
        tableData:[],
    };
  },
   watch:{
      visible(newValue){
          if(newValue){
            this.priview_data.id = this.priview_data.id;
          };
      }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    confirm(){
      this.dialogVisible = false; //关闭弹窗
    },

    closeCreatDialog(){
      this.dialogVisible = false; //关闭弹窗
    }

  },
  mounted: function() {
    
  }
};
</script>

<style scoped lang="scss">
/deep/ .el-dialog {
  //弹窗居中最大宽高70%
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  
  // max-height:calc(100% - 30px);
  // max-width:calc(100% - 30px);
  max-width: 20%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  .el-dialog__header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 5px;
    .el-dialog__title {
      color: #303133 !important;
    }
  }
  .el-dialog__body {
    height: 50%;
    overflow-y: scroll;
    color: #666666;
    padding: 5px 20px;
  }
  /deep/ .el-form-item{
    margin-bottom: 5px;
  }
  .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}
/deep/ .el-form-item__content{
  text-align: left;
  .el-inputname{
    width: 50%;
  }
}
.Contentdialog{
  width: auto;
  height: auto!important;
  height: 100px;
  min-height: 100px;
}


</style>
