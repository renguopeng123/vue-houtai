<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-form :model="deveSerialnumForm" :rules="deveSerialnumrules" ref="deveSerialnumForm" label-width="180px" class="demo-ruleForm">
                <el-form-item label="流水号名称">
                  <el-input v-model="deveSerialnumForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="流水号别名">
                  <el-input v-model="deveSerialnumForm.alias" @focus="devpin()" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="流水号规则">
                  <el-input v-model="deveSerialnumForm.regulation" class="el-inputname"></el-input>
                  <div class="introduct">
                      <ul>
                          <li>{yyyy}{MM}{dd}{NO}</li>
                          <li>{yyyy}:表示年份</li>
                          <li>{MM} :表示月份，如果月份小于10，则加零补齐，如1月份表示为01。</li>
                          <li>{mm} :表示月份，月份不补齐，如1月份表示为1。</li>
                          <li>{DD} :表示日，如果小于10号，则加零补齐，如1号表示为01。</li>
                          <li>{dd} :表示日，日期不补齐，如1号表示为1。</li>
                          <li>{NO} :表示流水号，前面补零。</li>
                          <li>{no} :表示流水号，后面补零。</li>
                      </ul>
                  </div>
                </el-form-item>
                <el-form-item label="生成类型">
                  <el-radio-group v-model="deveSerialnumForm.genType">
                    <el-radio :label="1">每天生成</el-radio>
                    <el-radio :label="0">递增</el-radio>
                  </el-radio-group>
                  <div class="introduct">
                      <h2>流水号生成规则：</h2>
                      <ul>
                          <li>1.每天生成。每天从初始值开始计数。</li>
                          <li>2.递增，流水号一直增加。</li>
                      </ul>
                  </div>
                </el-form-item>
                <el-form-item label="流水号长度">
                  <el-input v-model="deveSerialnumForm.noLength" class="el-inputname"></el-input>
                  <div class="introduct">
                      <ul>
                          <li>这个长度表示当前流水号的长度数，只包括流水号部分{NO},如果长度为5，当前流水号为5，则在流水号前补4个0，表示为00005。</li>
                          <li>{no}如果长度为5，当前流水号为501，则在流水号后面补5个0，表示为50100000，如果长度为1，则流水号一直递增。</li>
                      </ul>
                  </div>
                </el-form-item>
                <el-form-item label="初始值">
                  <el-input v-model="deveSerialnumForm.initValue" class="el-inputname"></el-input>
                  <div class="introduct">
                      <ul>
                          <li>这个初始值表示流水号部分{NO}的初始值。如 2015102700001,初始值为1，则流水号部分的初始值为00001</li>
                      </ul>
                  </div>
                </el-form-item>
                <el-form-item label="步长">
                  <el-input v-model="deveSerialnumForm.step" class="el-inputname"></el-input>
                  <div class="introduct">
                      <ul>
                          <li>流水号每次递加的数字，默认步长为1。比如步长为2，则每次获取流水号则在原来的基础上加2。</li>
                      </ul>
                  </div>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button @click="fn_DeveservialSave()" type="primary">保存</el-button>
            <el-button type="primary" @click="closeCreatDialog()">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { 
  saveDeveservial, //点击保存提交
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
        
        deveSerialnumForm:{
          name:"",
          alias:"",
          regulation:"{yyyy}{MM}{dd}{NO}",
          genType:0,
          noLength:"5",
          initValue:"1",
          step:"1"
       },
       deveSerialnumrules: {
          name: [
            { required: true, message: '请输入流水号名称', trigger: 'blur' },
          ],
          alias: [
            { required: true, message: '请输入流水号别名', trigger: 'blur' }
          ],
          regulation: [
            { required: true, message: '请输入流水号规则', trigger: 'blur' }
          ],
          genType: [
            { required: true, message: '请选生成类型', trigger: 'change' }
          ],
          noLength: [
            { required: true, message: '请输入流水号长度', trigger: 'blur' }
          ],
          initValue: [
            { required: true, message: '请输入流水号初始值', trigger: 'blur' }
          ],
          step: [
            { required: true, message: '请输入流水号步长', trigger: 'blur' }
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
                    this.deveSerialnumForm.id = this.edit_data.id;
                    this.deveSerialnumForm.name = this.edit_data.name;
                    this.deveSerialnumForm.alias = this.edit_data.alias;
                    this.deveSerialnumForm.regulation = this.edit_data.regulation;
                    this.deveSerialnumForm.genType = this.edit_data.genType;
                    this.deveSerialnumForm.noLength = this.edit_data.noLength;
                    this.deveSerialnumForm.initValue = this.edit_data.initValue;
                    this.deveSerialnumForm.step = this.edit_data.step;
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.deveSerialnumForm.hasOwnProperty("id")) {
                  delete this.deveSerialnumForm.id; //删除属性
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
    //自动填入别名
    devpin(){
      this.deveSerialnumForm.alias = this.deveSerialnumForm.name;
    },
    //点击保存流水号
    fn_DeveservialSave() {
      let param = this.deveSerialnumForm;
      saveDeveservial(param)
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
      this.deveSerialnumForm.id = "";
      this.deveSerialnumForm.name = "";
      this.deveSerialnumForm.alias = "";
      this.deveSerialnumForm.regulation = "{yyyy}{MM}{dd}{NO}";
      this.deveSerialnumForm.genType = 0;
      this.deveSerialnumForm.noLength = "5";
      this.deveSerialnumForm.initValue = "1";
      this.deveSerialnumForm.step = "1";
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
    height: 50%;
    overflow-y: scroll;
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
