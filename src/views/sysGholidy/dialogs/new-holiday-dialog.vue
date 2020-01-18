<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='closeCreatDialog' class="db-insert-dialog" top="10vh">
        <div class="holiday-dialog">
            <el-form :model="holidayForm" :rules="holidayrules" ref="holidayForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="名字">
                  <el-input v-model="holidayForm.name" class="el-inputname"></el-input>
                  <el-select v-model="selectname" @change="nameChange()" placeholder="请选择">
                    <el-option
                      v-for="item in selectnames"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="分类">
                  <el-select v-model="holidayForm.type" placeholder="请选择">
                    <el-option
                      v-for="item in festivals"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始日期">
                  <el-date-picker
                    v-model="holidayForm.startDay"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="holidayForm.endDay"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="系统">
                  <el-select v-model="holidayForm.system" placeholder="请选择">
                    <el-option
                      v-for="item in systems"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="holidayForm.remark"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button @click="saveHoliday()" type="primary">保存</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
  addEditHoliday,  //新增保存节假日
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
        selectname:"",
        selectnames:[{
          value: '元旦',
          label: '选项1'
        }, {
          value: '春节',
          label: '选项2'
        }, {
          value: '清明节',
          label: '选项3'
        }, {
          value: '劳动节',
          label: '选项4'
        }, {
          value: '端午节',
          label: '选项5'
        },{
          value: '中秋节',
          label: '选项5'
        },{
          value: '国庆节',
          label: '选项5'
        }],
        holidayForm:{
          name:"",
          festival:"",
          startDay:"",
          endDay:"",
          system:"",
          remark:""
       },
       festivals:[{
          value: 'LR',
          label: '法定节假日'
        }, {
          value: 'LW',
          label: '法定工作日'
        }, {
          value: 'CR',
          label: '公司节假日'
        }, {
          value: 'CW',
          label: '公司工作日'
        }],
      //  festivals:[{
      //     value: 'LR',
      //     label: '法定节假日'
      //   }, {
      //     value: 'LW',
      //     label: '法定工作日'
      //   }],
      //  festivals:[{
      //     value: 'DW',
      //     label: '工作日'
      //   },{
      //     value: 'DR',
      //     label: '周末'
      //   },{
      //     value: 'LR',
      //     label: '法定节假日'
      //   }, {
      //     value: 'LW',
      //     label: '法定工作日'
      //   }, {
      //     value: 'CR',
      //     label: '公司节假日'
      //   }, {
      //     value: 'CW',
      //     label: '公司工作日'
      //   }],
       systems:[{
          value: 'public',
          label: '公有'
        }, {
          value: 'agilebpm',
          label: 'AgileBPM'
        }],
       holidayrules: {
          
        }

    };
  },
   watch:{
        visible(newValue){
            if(newValue){
                this.add_OR_editor = this.title;
                if (this.add_OR_editor === "编辑") {
                  this.$nextTick(function(){
                    this.holidayForm.id = this.edit_data.id;
                    this.holidayForm.name = this.edit_data.name;
                    this.holidayForm.startDay = this.edit_data.startDay;
                    this.holidayForm.endDay = this.edit_data.endDay;
                    this.holidayForm.type = this.edit_data.type;
                    this.holidayForm.remark = this.edit_data.remark;
                  })
              } else {
                //若果form有属性id，则去掉，因为编辑后会新增的id属性，新增提交不需要该属性
                if (this.holidayForm.hasOwnProperty("id")) {
                  delete this.holidayForm.id; //删除属性
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
      this.holidayForm.name=this.selectname;
    },

    /*创建保存节假日*/
    saveHoliday() {
      let param = {
        startDay: this.holidayForm.startDay,
        endDay: this.holidayForm.endDay,
        name: this.holidayForm.name,
        remark: this.holidayForm.remark,
        type: this.holidayForm.type,
        // year: 2019 new
        system: this.holidayForm.system 
      };
      addEditHoliday(param).then(response => {
        this.$message({
          message: response.msg,
          success: "success"
        });
        this.$emit("closed");
        this.dialogVisible=false;
      });
      
    },

    closeCreatDialog(){
      this.holidayForm.name = "",
      this.holidayForm.festival = "",
      this.holidayForm.startDay = "",
      this.holidayForm.endDay = "",
      this.holidayForm.system = "",
      this.holidayForm.type = "",
      this.holidayForm.remark = ""
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
.holiday-dialog p{
  width: auto;
  height: 36px;
}
.db-dialog p b{
  padding: 0 5px;
  color: #ff0000;
}
</style>
