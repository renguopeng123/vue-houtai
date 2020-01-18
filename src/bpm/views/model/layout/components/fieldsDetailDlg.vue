<template>
  <div class='el-notification top'>
    <entity-field ref="entityFieldDef" @summit="summit" :detailAttr="detailAttrs" class="form-style"></entity-field>
    <div class="foot">
      <div style="margin-right:auto;">
        <el-button size="mini" type="success" >上一条</el-button>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="saveFieldDetailInfo">保存</el-button>
        <el-button size="mini" @click="close">取消</el-button>
        <el-button size="mini" type="danger" @click="deleteEntity">删除</el-button>
      </div>
      <div style="margin-left:auto;">
        <el-button size="mini" type="success" >下一条</el-button>
      </div>
    </div>
    <div class="el-notification__closeBtn el-icon-close" @click="close"></div>
  </div>
</template>

<script>
  import EntityField from "./entityField";
  export default {
    name: "fieldsDetailDlg",
    components: {EntityField},
    props:{
      fieldDetails:Object
    },
    data(){
      return {
        formInline: {
          fieldName: 'id',
          attrName: 'id',
          remarkName:"出发地",
          fieldType:"字符串",
          attrLength:"50",
          attrValidate:"",
          attrWidget:"下拉框",
        },
        validationOpts:[
          {
            value: '选项1',
            label: '必选'
          }, {
            value: '选项2',
            label: '数字'
          },
          {
            value: '选项3',
            label: '手机号'
          }
        ],
        widgetsOpts:[
          {
            value: '选项1',
            label: '下拉框'
          },
        ]
      }
    },
    methods:{
      summit(data) {
        this.$emit("summitData", data);
      },
      saveFieldDetailInfo() {
        this.$refs["entityFieldDef"].formSummit();
      },
      close() {
        this.$emit("close");
      },
      deleteEntity() {
        this.$emit("deleteField");
      },
      reset() {
        this.$refs["entityFieldDef"].resetForm();
      }
    },
    computed:{
      detailAttrs() {
        let check = [];
        if (this.fieldDetails && this.fieldDetails.ctrl && this.fieldDetails.ctrl.validRule) {
          JSON.parse(this.fieldDetails.ctrl.validRule).map(item =>{
            check.push(item.name);
          })
        }
        return {
          name: this.fieldDetails.name || "", //字段名
          propertyName: this.fieldDetails.key || "", //属性名
          remarkName: this.fieldDetails.comment || "", //备注名
          dataType: this.fieldDetails.type || "", //数据类型
          propertyLength: this.fieldDetails.length || 50, //属性长度
          fieldCheck: check || [], //字段校验
          widget:(this.fieldDetails.ctrl ? this.fieldDetails.ctrl.type : ""), //字段控件
          isSaved: false, //是否保存了
          dataTypeLabel: "" //用于数据类型显示
        };
      }
    }
  }
</script>

<style lang="scss" scoped >
  @import "../style.scss";
  $dlg-width:600px;

  .el-notification {
    display:block;
    height:484px;
    width:$dlg-width;
    border-radius:3px;
    padding:10px;
    z-index: 2000;
  }
  .el-notification__closeBtn {
    top: 5px;
    right: 5px;
  }
  .form-style {
    margin-top:15px;
    width:100%;
    /deep/ label {
      font-weight: normal;
      color:#909399;
    }
  }
  .input-width {
    width:190px;
  }
  .input-width-half {
    width:73px;
  }

  .foot {
    border-top:$borderStyle;
    padding:5px;
    display: flex;
    height:40px;
    justify-content: center;
    align-items: center;
  }
</style>
