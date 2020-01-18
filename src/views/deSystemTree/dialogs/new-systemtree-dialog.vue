<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-form :model="deSystemtreeForm" :rules="deveCloscriptrules" ref="deSystemtreeForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="名字：">
                  <el-input v-model="deSystemtreeForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="别名：">
                  <el-input v-model="deSystemtreeForm.alias" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input
                    v-model="deSystemtreeForm.desc"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="是否系统内部树：">
                  <el-tooltip :content="'Switch value: ' + deSystemtreeForm.isnointree" placement="top">
                    <el-switch
                      v-model="deSystemtreeForm.isnointree"
                      active-color="#2365A3"
                      inactive-color="#13ce66"
                      active-text="否"
                      inactive-text="是"
                      active-value="1"
                      inactive-value="0">
                    </el-switch>
                  </el-tooltip>
                  <!-- <el-switch
                    v-model="deSystemtreeForm.isnointree"
                    active-text="是"
                    inactive-text="否">
                  </el-switch> -->
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
  saveEditsystemTreeinfo, //点击保存提交
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
        
       deSystemtreeForm:{
          name:"",
          alias:"",
          desc:"",
          isnointree: "0"
       },
       deveCloscriptrules: {
          // name: [
          //   { required: true, message: '请输入脚本名称', trigger: 'blur' },
          // ],
          // script: [
          //   { required: true, message: '请输入脚本', trigger: 'blur' }
          // ],
          // category: [
          //   { required: true, message: '请选择脚本分类', trigger: 'blur' }
          // ],
          // memo: [
          //   { required: true, message: '请输入备注', trigger: 'change' }
          // ]
        }

    };
  },
   watch:{
        visible(newValue){
            if(newValue){
                this.add_OR_editor = this.title;
                if (this.add_OR_editor === "编辑") {
                  this.$nextTick(function(){
                    this.deSystemtreeForm.id = this.edit_data.id;
                    this.deSystemtreeForm.name = this.edit_data.name;
                    this.deSystemtreeForm.alias = this.edit_data.key;
                    this.deSystemtreeForm.isnointree = this.edit_data.identity+'';
                    this.deSystemtreeForm.desc = this.edit_data.description;
                    
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.deSystemtreeForm.hasOwnProperty("id")) {
                  delete this.deSystemtreeForm.id; //删除属性
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
    //点击保存
    fn_DevescriptSave() {
      let param = {
        name: this.deSystemtreeForm.name,
        code: this.deSystemtreeForm.alias,
        description: this.deSystemtreeForm.desc,
        identity: this.deSystemtreeForm.isnointree
      };
      saveEditsystemTreeinfo(param)
        .then(response => {
          this.$message({
            // message: response.message,
            message: "保存成功",
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
      this.deSystemtreeForm.id = "";
      this.deSystemtreeForm.name = "";
      this.deSystemtreeForm.alias = "";
      this.deSystemtreeForm.desc = "";
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
