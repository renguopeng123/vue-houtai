<template>
    <!--对话框-新建-->
    <el-dialog :title="title" :visible.sync="dialogVisible">
        <el-form label-width="130px" :model="formData">
            <el-form-item label="名称">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="接口类型">
                <el-select v-model="formData.dataType" placeholder="请选择">
                    <el-option
                            v-for="item in dataTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="iframe链接" v-if="formData.dataType==='iframe'">
                <el-input v-model="formData.dataSource" placeholder="请填写完整的url,如https://www.xx.com"></el-input>
            </el-form-item>
            <el-form-item label="组件类型" v-if="formData.dataType==='component'">
                <el-select v-model="formData.type" placeholder="请选择">
                    <el-option
                            v-for="item in componentTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="宽">
                <el-slider
                        v-model="formData.width"
                        :min="1"
                        :max="24"
                        :format-tooltip="(val)=>val+'/24'"
                />
            </el-form-item>
            <el-form-item label="高">
                <el-input-number v-model="formData.height" size="small" :min="0" :step="100" /> px
            </el-form-item>
            <!--<el-form-item label="更多链接">-->
                <!--<el-input v-model="formData.moreUrl"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="自动刷新时间间隔">-->
                <!--<el-input-number v-model="formData.refresh" size="small" :min="0" :step="1" /> 秒-->
            <!--</el-form-item>-->

            <el-form-item label="描述">
                <el-input v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item label="展示内容">
                <el-input v-model="formData.displayContent"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="save()">保存</el-button>
            <el-button type="primary" @click="preview()">预览</el-button>
        </div>
        <prewiew title="组件预览" :visible.sync="previewVisible" :data="formData"></prewiew>
    </el-dialog>
</template>

<script>
  import {
    savePanel
  } from "@/api/sysBenchManage/api_sysBenchManage.js";
  import prewiew from './preview-dialog';
export default {
  name: "workbench-new-dialog",
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
  components:{prewiew},
  data() {
    return {
      previewVisible:false,
      dataTypeOptions:[
        {label:'组件',value:'component'},
        {label:'iframe',value:'iframe'}
      ],
      componentTypeOptions:[
        {label:'常用流程',value:'gw-Examination'},
        {label:'最新会议',value:'gw-Meeting'},
        {label:'通知公告',value:'gw-Notice'},
        {label:'我的日程',value:'gw-Schedule'},
        {label:'快捷入口',value:'gw-Shortcut'},
        {label:'工作统计',value:'gw-Statistics'},
        {label:'系统概览',value:'gw-Overview'},
        {label:'督办事项',value:'gw-Supervision'},
        {label:'待办事宜',value:'gw-Todo'},
      ],
      formData:{
        refresh: 0,
        dataSource: "",//这个字段当ifame的src
        dataType: "component",
        description: "",
        displayContent: "",
        height: 100,
        moreUrl: "",
        style:"",
        title: "",
        type: "",
        width: 6,
      }

    };
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
    save(){
      savePanel(this.formData).then(res=>{
        if(res.success){
          this.$message.success(res.message)
          this.$emit("closed")
        }else{
          this.$message.error(res.message)
        }
      }).catch(error=>{
        console.error(error)
      })

    },
    preview(){
      this.previewVisible = true

    }


  },
  mounted: function() {
    //编辑
    if(this.edit_data.hasOwnProperty('id')){
      this.formData = this.edit_data;
    }
  }
};
</script>

<style scoped lang="scss">


</style>
