<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' top="10vh">
        <div class="Contentdialog">
            <el-form :model="sysAttributeManageForm" :rules="sysAttributeManagerules" ref="sysAttributeManageForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="参数名：">
                  <el-input v-model="sysAttributeManageForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="别名：">
                  <el-input v-model="sysAttributeManageForm.alias" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="系统环境TODO：">
                  <el-select v-model="sysAttributeManageForm.sysenvironment" placeholder="全部">
                    <el-option
                      v-for="item in sysenvironments"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span>默认开发环境DEV，若当前环境为测试环境。则将该环境(测试)配置信息覆盖默认(开发)属性配置</span>
                </el-form-item>
                <el-form-item label="分组：">
                  <el-input v-model="sysAttributeManageForm.sysparams" class="el-inputname"></el-input>
                  <el-select v-model="sysAttributeManageForm.sysGroup" @change="nameChange()" placeholder="全部">
                    <el-option
                      v-for="item in sysGroups"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="参数值：">
                  <el-input v-model="sysAttributeManageForm.paramvalue" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="加密存储：">
                  <el-switch 
                      v-model="sysAttributeManageForm.delivery"
                      active-text="是"
                      inactive-text="否">
                  </el-switch>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input type="textarea" v-model="sysAttributeManageForm.desc" class="el-textarename"></el-input>
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
  addEdiAtributes, //点击保存提交
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
       sysAttributeManageForm:{
          name:"",
          alias:"",
          sysenvironment:"",
          sysparams:"",
          sysGroup:"",
          paramvalue:"",
          delivery: 0,
          desc:""
       },
       sysenvironments:[{
          value: '选项1',
          label: '开发-默认'
        }, {
          value: '选项2',
          label: '测试'
        }, {
          value: '选项3',
          label: '用户测试'
        }, {
          value: '选项4',
          label: '灰度'
        }, {
          value: '选项5',
          label: '生产'
        }],
       sysGroups:[{
          value: '选项1',
          label: '系统参数'
        }, {
          value: '选项2',
          label: '系统参数2'
        }],
       sysAttributeManagerules: {
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
                    this.sysAttributeManageForm.id = this.edit_data.id;
                    this.sysAttributeManageForm.name = this.edit_data.name;
                    this.sysAttributeManageForm.alias = this.edit_data.alias;
                    this.sysAttributeManageForm.sysenvironment = this.edit_data.environment;
                    this.sysAttributeManageForm.sysGroup = this.edit_data.group;
                    this.sysAttributeManageForm.paramvalue = this.edit_data.realVal;
                    this.sysAttributeManageForm.delivery = this.edit_data.encrypt;
                    this.sysAttributeManageForm.desc = this.edit_data.description;
                    console.log("edit_data",this.edit_data);
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.sysAttributeManageForm.hasOwnProperty("id")) {
                  delete this.sysAttributeManageForm.id; //删除属性
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
    nameChange(){
      this.sysAttributeManageForm.sysparams=this.sysAttributeManageForm.sysGroup;
    },

    //点击保存脚本信息
    fn_DevescriptSave() {
      let param = this.sysAttributeManageForm;
      addEdiAtributes(param)
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
      this.sysAttributeManageForm.id = "";
      this.sysAttributeManageForm.name = "";
      this.sysAttributeManageForm.alias = "";
      this.sysAttributeManageForm.sysenvironment = "";
      this.sysAttributeManageForm.sysparams = "";
      this.sysAttributeManageForm.sysGroup = "";
      this.sysAttributeManageForm.paramvalue = "";
      this.sysAttributeManageForm.delivery = true;
      this.sysAttributeManageForm.desc = "";
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
  // max-height: 80%;
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
    margin-bottom: 10px;
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
  .el-textarename{
    width: 90%;
  }
  span{
    display: block;
  }
}
.Contentdialog{
  width: 90%;
  height: auto!important;
  height: 100px;
  min-height: 100px;
  margin: 0 auto;
  text-align: center;
  padding-top: 10px;
}

</style>
