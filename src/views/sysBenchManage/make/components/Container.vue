<template>
  <el-container class="fm2-container">
    <el-aside width="200px" style="margin-right: 10px" class="components-list" height="auto">
      <el-button type="text"> 可选组件</el-button>
      <div class="separator"></div>
      <draggable
              tag="el-row"
              :list="layoutComponents"
              v-bind="{group:{ name:'people'}, ghostClass: 'ghost'}"
              :move="handleMove"
              @end="handleMoveEnd"
              @start="handleMoveStart"
      >
        <el-col v-for="(item, index) in layoutComponents" v-if="layoutFields.indexOf(item.type) >=0 || item.dataType==='iframe'" :key="index" :span="24" class="form-edit-widget-label no-put">
          <a>
            <!--<i class="icon iconfont" :class="item.icon" />-->
            <span>{{ `${item.title} (${item.width})` }}</span>
          </a>
        </el-col>
      </draggable>

    </el-aside>
    <el-container>
      <el-main :class="{'widget-empty': widgetForm.list.length === 0}">
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" />
      </el-main>
      <!--<el-footer class="components-list" height="auto">-->
        <!--<draggable-->
          <!--tag="el-row"-->
          <!--:list="layoutComponents"-->
          <!--v-bind="{group:{ name:'people'}, ghostClass: 'ghost'}"-->
          <!--:move="handleMove"-->
          <!--@end="handleMoveEnd"-->
          <!--@start="handleMoveStart"-->
        <!--&gt;-->
          <!--<el-col v-for="(item, index) in layoutComponents" v-if="layoutFields.indexOf(item.type) >=0" :key="index" :span="4" class="form-edit-widget-label no-put">-->
            <!--<a>-->
              <!--&lt;!&ndash;<i class="icon iconfont" :class="item.icon" />&ndash;&gt;-->
              <!--<span>{{ `${item.name} (${item.options.span})` }}</span>-->
            <!--</a>-->
          <!--</el-col>-->
        <!--</draggable>-->
      <!--</el-footer>-->
    </el-container>
    <el-aside width="200px" style="margin-left: 10px">
      <el-tabs v-model="activeName" class="config-tab">
        <el-tab-pane label="组件属性" name="first">
          <widget-config :data="widgetFormSelect" />
        </el-tab-pane>
        <!--<el-tab-pane label="容器属性" name="second">-->

          <!--<form-config :data="widgetForm.config" />-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </el-aside>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import WidgetForm from './WidgetForm'
import FormConfig from './FormConfig'
import { layoutComponents} from './componentsConfig.js'

export default {
  name: 'FmMakingForm',
  components: {
    Draggable,
    WidgetConfig,
    WidgetForm,
    FormConfig
  },
  props: {
    //可选组件列表的配置项
    componentsConfig:{
      type:Array,
      default:()=>[]
    },
    layoutAreaObject:{
      type:Object,
      default: ()=> {
        return {
          list: [],
          config: {
            gutter: 10,
            isCard: false
          }
        }
      }
    },
    layoutFields: {
      type: Array,
      default: () => ['gw-Examination', 'gw-Meeting', 'gw-Notice', 'gw-Schedule', 'gw-Shortcut', 'gw-Statistics','gw-Overview', 'gw-Supervision', 'gw-Todo']
    }
  },
  data() {
    return {
      activeName: 'first',
      layoutComponents:this.componentsConfig,
      widgetForm: {
        list: [],
        config: {
          gutter: 10,
          isCard: true
        }
      },
      configTab: 'widget',
      widgetFormSelect: null,
      widgetModels: {},
      blank: ''

    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
        this.$emit("change", val)
        console.log(this.$refs.widgetForm)
      }
    },
    layoutAreaObject: {
      deep: true,
      handler: function(val) {
        this.widgetForm = val
      }
    },
    componentsConfig: {
      deep: true,
      handler: function(val) {
        this.layoutComponents = val
      }
    }
  },
  mounted(){
  },
  methods: {
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },

  }
}
</script>

<style lang="scss">
  .layout-spirit  {
    .el-dialog__header{
      padding: 0 0 0 10px;
      border-bottom: 1px solid #dce0e6;
    }
    .el-dialog__body{
      padding: 10px;
    }
    .el-dialog__footer{
      padding: 10px;
    }
    .el-form{
      padding: 10px;

    }
    .el-form--label-top .el-form-item__label{
      font-size: 14px;
      padding: 0;
      height: 20px;
      line-height: 20px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .config-tab{
      margin-left: 10px;
      border: 1px solid #dce0e6;
    }

  }
  .fm2-container{
    .el-tabs__content{
      padding-left: 10px;
    }
    .separator{
      margin-bottom: 10px;
      height: 1px;
      background-color: #999999;
    }
  }


</style>
