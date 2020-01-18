<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="Contentdialog">
            <el-form :model="sysDatadictionaryForm" :rules="sysDatadictionaryrules" ref="deSystemtreeForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="分类：">
                  <!-- <el-input v-model="sysDatadictionaryForm.classify" class="el-inputname"></el-input> -->
                  <el-select v-model="sysDatadictionaryForm.classify" placeholder="请选择">
                    <el-option
                      v-for="item in sysDatadictionaryFormClassifys"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称：">
                  <el-input v-model="sysDatadictionaryForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="KEY：">
                  <el-input v-model="sysDatadictionaryForm.key" class="el-inputname"></el-input>
                </el-form-item>
            </el-form>
            <span>今天是{{timeNow}}</span>
        </div>
        <div slot="footer">
            <el-button type="primary" @click="fn_DevescriptSave()">保存</el-button>
            <el-button type="primary" @click="closeCreatDialog()">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
  sysDatadictTreenodeinfo,  //获取点击的树分类
  savesysDatadictionaryinfo, //点击保存提交
} from "@/api/api.js";

import moment from "moment"  //导入moment文件

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
    add_data:{
      type:String,
      default:""
    }
  },
  data() {
    return {
        
       sysDatadictionaryForm:{
          classify:"",
          name:"",
          key:""
       },
       sysDatadictionaryrules: {
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
        },
        dict: "dict",
        sysDatadictionaryFormClassifys: [],

    };
  },
   watch:{
        visible(newValue){
            if(newValue){
                this.add_OR_editor = this.title;
                this.fn_getTreeData();
                if (this.add_OR_editor === "编辑数据字典") {
                  this.$nextTick(function(){
                    console.log("typeId",this.edit_data.typeId);
                    if(this.edit_data.typeId === "20000007060004"){
                      this.sysDatadictionaryForm.classify = "系统配置"
                    }
                    if(this.edit_data.typeId === "20000007060005"){
                      this.sysDatadictionaryForm.classify = "客户相关"
                    }
                    if(this.edit_data.typeId === "20000007060006"){
                      this.sysDatadictionaryForm.classify = "会议类型"
                    }
                    this.sysDatadictionaryForm.id = this.edit_data.id;
                    this.sysDatadictionaryForm.name = this.edit_data.name;
                    this.sysDatadictionaryForm.key = this.edit_data.key;

                    

                    // let dtime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                    // console.log("dtime",{{timeNow}});
                    
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.add_OR_editor === "新增数据字典"){
                   if(this.add_data === "系统配置"){
                      this.sysDatadictionaryForm.classify = "系统配置"
                    }
                    if(this.add_data === "客户相关"){
                      this.sysDatadictionaryForm.classify = "客户相关"
                    }
                    if(this.add_data === "客户相关"){
                      this.sysDatadictionaryForm.classify = "会议类型"
                    }
                }
                if (this.sysDatadictionaryForm.hasOwnProperty("type_id_^VEQ")) {
                  delete this.sysDatadictionaryForm.type_id_^VEQ; //删除属性
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
    //获取树的数据
    fn_getTreeData(){
      let param = {
        treeKey: this.dict,
        nodeKey:""
      };
      sysDatadictTreenodeinfo(param)
        .then(response => {
          let arr = this.ListToTree(response);
          // console.log("arr",arr);
           this.sysDatadictionaryFormClassifys = arr;

        })
        .catch(errors => {
          console.error(errors);
        });
    },
    timeNow () {
      return moment().utc().format('YYYY年MM月DD日') + ' ' + moment().utc().format('dddd')
    },

    // 对树数据进行处理
    ListToTree(list) {
      const copyList = list.slice(0);
      const tree = [];
      for (let i = 0; i < copyList.length; i++) {
          tree.push(copyList[i]);
      }
      return tree;
    },
    //点击保存
    fn_DevescriptSave() {
      if (this.add_OR_editor === "新增数据字典"){
        let param = {
          dictKey:"",
          dictType: this.dict,
          name: this.sysDatadictionaryForm.name,
          key: this.sysDatadictionaryForm.key,
          typeId: this.sysDatadictionaryForm.typeId,
        };
      }else if(this.add_OR_editor === "编辑数据字典"){
        let param = {
          // createTime: ,
          delete: false,
          deleteFlag: "0",
          dictKey:"",
          dictType: this.dict,
          id:this.sysDatadictionaryForm.id,
          name: this.sysDatadictionaryForm.name,
          key: this.sysDatadictionaryForm.key,
          sn:0,
          typeId: this.sysDatadictionaryForm.typeId,
          version:0
        };
      }
      savesysDatadictionaryinfo(param)
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
      this.sysDatadictionaryForm.id = "";
      this.sysDatadictionaryForm.classify = "请选择";
      this.sysDatadictionaryForm.name = "";
      this.sysDatadictionaryForm.key = "";
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
    margin-bottom: 13px;
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
