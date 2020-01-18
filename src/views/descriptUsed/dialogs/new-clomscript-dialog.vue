<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-form :model="devecloscriptForm" :rules="deveCloscriptrules" ref="devecloscriptForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="脚本名称">
                  <el-input v-model="devecloscriptForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="脚本">
                  <el-input
                    v-model="devecloscriptForm.script"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="脚本分类">
                  <el-input v-model="devecloscriptForm.category" class="el-inputname"></el-input>
                  <el-select v-model="devecloscriptForm.category" placeholder="全部">
                    <el-option
                      v-for="item in devecategorys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="devecloscriptForm.memo"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容">
                  </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button type="primary" @click="fn_DevescriptSave()">保存</el-button>
            <el-button type="primary" @click="closeCreatDialog()">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { 
  saveDescriptinfo, //点击保存提交
} from "@/api/api.js";

export default {
  name: "deveserialnum-new-dialog",
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
        
       devecloscriptForm:{
          name:"",
          script:"",
          category:"",
          memo:""
       },
       devecategorys:[],
       deveCloscriptrules: {
          name: [
            { required: true, message: '请输入脚本名称', trigger: 'blur' },
          ],
          script: [
            { required: true, message: '请输入脚本', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择脚本分类', trigger: 'blur' }
          ],
          memo: [
            { required: true, message: '请输入备注', trigger: 'change' }
          ]
        }

    };
  },
   watch:{
        visible(newValue){
            if(newValue){
                this.add_OR_editor = this.title;
                if (this.add_OR_editor === "编辑") {
                  this.$nextTick(function(){
                    this.devecloscriptForm.id = this.edit_data.id;
                    this.devecloscriptForm.name = this.edit_data.name;
                    this.devecloscriptForm.script = this.edit_data.script;
                    this.devecloscriptForm.category = this.edit_data.category;
                    this.devecloscriptForm.memo = this.edit_data.memo;
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.devecloscriptForm.hasOwnProperty("id")) {
                  delete this.devecloscriptForm.id; //删除属性
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
    //点击保存脚本信息
    fn_DevescriptSave() {
      let param = this.devecloscriptForm;
      saveDescriptinfo(param)
        .then(response => {
          this.$message({
            message: response.data,
            type: "success"
          });
          this.$emit("closed");
          this.closeCreatDialog();
        })
        .catch(error => {
          console.error(error);
        });
    },

    closeCreatDialog(){
      this.dialogVisible = false; //关闭弹窗
      // this.$refs.deveSerialnumForm.resetFields(); //表单数据重置
      this.devecloscriptForm.id = "";
      this.devecloscriptForm.name = "";
      this.devecloscriptForm.script = "";
      this.devecloscriptForm.category = "";
      this.devecloscriptForm.memo = ""
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
    height: 99%;
    color: #666666;
    padding: 20px;
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
  text-align: center;
  padding-top: 10px;
  padding-right: 5%;
}
.introduct{
  width: auto;
  padding-left: 10px;
  border: 1px solid #ddd;
  margin-top: 5px;
}
.introduct h2{
  margin: 0;
  padding: 0px;
  font-size: 14px;
}
.introduct ul{
  margin: 0;
  padding: 0;
}
.introduct ul li{
  list-style-type: none;
  line-height: 28px;
}

</style>
