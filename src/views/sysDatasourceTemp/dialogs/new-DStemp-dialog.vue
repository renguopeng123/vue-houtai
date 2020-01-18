<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="holiday-dialog">
            <el-form ref="templateForm" :model="templateForm" label-width="180px">
                <el-form-item label="模板名字：">
                    <el-input v-model="templateForm.tempName"></el-input>
                </el-form-item>
                <el-form-item label="类路径：">
                    <el-input v-model="templateForm.classPath"></el-input>
                </el-form-item>
            </el-form>
            <el-table
              :data="DStempData"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              @row-click="fn_rowClick"
              style="width: 100%"
              border>
              <el-table-column label="名称" align="center" width="200">
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="描述">
                <template slot-scope="scope">
                    {{scope.row.comment}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="参数类型">
                <template slot-scope="scope">
                    {{scope.row.type}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="是否必填" width="80">
                <template slot-scope="scope">
                  <div v-if="scope.row.required===true">
                    <el-button type="text">必填</el-button>
                  </div>
                  <div v-else>
                    
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="默认值" width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.defaultValue"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="230">
                <template slot-scope="scope">
                    <el-button type="text">删除</el-button>
                    <el-button type="text">上移</el-button>
                    <el-button type="text">下移</el-button>
                    <el-button type="text">置顶</el-button>
                    <el-button type="text">置底</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div slot="footer">
            <el-button @click="saveDstemp()" type="primary">保存</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
  addEdiDStemp,  //新增保存数据源模板
} from "@/api/api.js";

export default {
  name: "holiday-new-dialog",
  props: {
    //对话框标题
    title: {
      type: String,
      default: "新增"
    },
    visible: {
      type: Boolean,
      required: true
    },
    edit_data: {
      type: Object,
      default: function(){
        return {}
      }
    },
  },
  data() {
    return {
        templateForm:{
          tempName:"",
          classPath:""
        },
       DStempData:[],

    };
  },
   watch:{
        visible(newValue){
            if(newValue){
               this.add_OR_editor = this.title;
                if (this.add_OR_editor === "编辑") {
                  this.$nextTick(function(){
                    this.templateForm.id = this.edit_data.id;
                    this.templateForm.tempName = this.edit_data.name;
                    this.templateForm.classPath = this.edit_data.classPath;
                    this.DStempData = this.edit_data.attributes;
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.templateForm.hasOwnProperty("id")) {
                  delete this.templateForm.id; //删除属性
                }
              };
            }
        },
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
    /*创建保存数据源模板*/
    saveDstemp() {
      let param = {
        classPath: this.templateForm.classPath,
        name: this.templateForm.tempName
      };
      addEdiDStemp(param).then(response => {
        this.$message({
          message: response.msg,
          success: "success"
        });
        this.$emit("closed");
        this.dialogVisible=false;
      });
    },

    handleSelectionChange(val) {
      //val是选中选的数组集合，包含每一个选中项的数据
      this.multipleSelection = val; //选择项发生变化时，选中数组变量跟着改变
    },

    //表格单选
    fn_rowClick(row, column, event) {
      // 当某一行被点击时，改行多选框被选中
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    closeCreatDialog(){
      this.templateForm.tempName = "",
      this.templateForm.classPath = ""
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
  max-width: 70%;
  max-height: 90%;
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
    color: #666666;
    padding: 20px;
    height: 90%;
    overflow-y: scroll;
  }
  .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}
/deep/ .el-form-item__content{
  text-align: left;
  .el-inputname{
    width: 30%;
  }
  .el-textarea{
    width: 70%;
  }
}
.holiday-dialog{
  width: auto;
  height: auto!important;
  height: 100px;
  min-height: 100px;
  text-align: center;
  padding-top: 10px;
}
/deep/ .el-form{
  width: 70%;
}
</style>
