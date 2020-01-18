<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-form :model="decustomboxForm" :rules="decustomboxFormrules" ref="decustomboxForm" label-width="200px" class="decustomboxForm">
                <el-form-item label="名字：">
                  <el-input v-model="decustomboxForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="别名：">
                  <el-input v-model="decustomboxForm.key" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input
                    v-model="decustomboxForm.desc"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容：">
                  </el-input>
                </el-form-item>
                <el-form-item label="是否系统内部对话框：">
                  <el-radio-group v-model="decustomboxForm.system">
                    <el-radio label=true>是</el-radio>
                    <el-radio label=false>否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="显示类型：">
                  <el-select v-model="decustomboxForm.style" placeholder="请选择">
                    <el-option
                      v-for="item in decustomboxFormStyles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="尺寸：">
                  宽度：<el-input v-model="decustomboxForm.width" class="el-inputInner"></el-input>
                  高度：<el-input v-model="decustomboxForm.height" class="el-inputInner"></el-input>
                </el-form-item>
                <el-form-item label="单选/多选：">
                  <el-radio-group v-model="decustomboxForm.multiple">
                    <el-radio label=true>单选</el-radio>
                    <el-radio label=false>多选</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="分页：">
                  <el-radio-group v-model="decustomboxForm.page">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                  <span v-show="decustomboxForm.page ==='是'" class="pagesize">分页大小：<el-input v-model="decustomboxForm.pagesize" class="custboxPagesize"></el-input></span>
                </el-form-item>
                <el-form-item label="数据来源：">
                  <el-radio-group v-model="decustomboxForm.style">
                    <el-radio label=true>数据库</el-radio>
                    <el-radio label=false>列表</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="数据源：">
                  <el-select v-model="decustomboxForm.dsName" placeholder="请选择">
                    <el-option
                      v-for="item in decustomboxFormDsnames"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="查询：">
                  <el-select v-model="decustomboxForm.objType" placeholder="请选择">
                    <el-option
                      v-for="item in decustomboxFormObjtypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="decustomboxForm.objName" class="el-fechinputname"></el-input>
                  <el-button type="success" @click="fn_DevescriptSave()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button type="primary" @click="fn_DecustomboxSave()">保存</el-button>
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
        
       decustomboxForm:{
          name:"",
          key:"",
          desc:"",
          system:false,
          style:"",
          width:"",
          height:"",
          multiple:false,
          page:false,
          pagesize:"",
          style:"",
          dsName:"",
          objType:"",
          objName:""
       },
       decustomboxFormStyles: [{
          value: '选项1',
          label: '列表'
        }, {
          value: '选项2',
          label: '树形'
        }],
       decustomboxFormDsnames: [{
          value: '选项1',
          label: 'Aschs本地数据库'
        }, {
          value: '选项2',
          label: '本地数据源'
        }],
       decustomboxFormObjtypes: [{
          value: '选项1',
          label: '表'
        }, {
          value: '选项2',
          label: '视图'
       }],
       decustomboxFormrules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          key: [
            { required: true, message: '请输入别名', trigger: 'blur' }
          ],
          objName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
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
                    this.decustomboxForm.id = this.edit_data.id;
                    this.decustomboxForm.name = this.edit_data.name;
                    this.decustomboxForm.script = this.edit_data.script;
                    this.decustomboxForm.category = this.edit_data.category;
                    this.decustomboxForm.memo = this.edit_data.memo;
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.decustomboxForm.hasOwnProperty("id")) {
                  delete this.decustomboxForm.id; //删除属性
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
    fn_DecustomboxSave() {
      let param = this.decustomboxForm;
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
      this.decustomboxForm.id = "";
      this.decustomboxForm.name = "";
      this.decustomboxForm.key = "";
      this.decustomboxForm.desc = "";
      this.decustomboxForm.system = "";
      this.decustomboxForm.style = "";
      this.decustomboxForm.width = "";
      this.decustomboxForm.height = "";
      this.decustomboxForm.multiple = "";
      this.decustomboxForm.page = "";
      this.decustomboxForm.pagesize = "";
      this.decustomboxForm.style = "";
      this.decustomboxForm.dsName = "";
      this.decustomboxForm.objType = "";
      this.decustomboxForm.objName = "";
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
  max-width: 100%;
  max-height: 100%;
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
    height: 100%;
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
/deep/ .decustomboxForm{
  text-align: left;
  .el-inputname{
    width: 50%;
  }
  .el-inputInner{
    width: 15%;
  }
  .el-fechinputname{
    width: 30%;
  }
  .pagesize{
    margin-left: 15px;
  }
}
.custboxPagesize{
  width: 15%;
}
.Contentdialog{
  width: auto;
  height: auto!important;
  height: 100px;
  min-height: 100px;
  text-align: left;
  padding-top: 10px;
  padding-right: 5%;
}
</style>
