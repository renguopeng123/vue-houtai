<template>
  <div class="right-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="基本属性" name="first">
        <div class="entity-table-property">
          <div class="entity-table-property-header">
            <svg-icon icon-class="objAttr" class="el-button--text" />
            <div class="title">对象属性</div>
            <div class="arrow-collapse-expand" @click="showObjectProperty = !showObjectProperty">
              <i :class="showObjectProperty ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
          <div class="entity-table-property-body" v-show="showObjectProperty">
            <div class="property-name">
              <div>分类:</div>
              <div>持久化方式:</div>
              <div>名称:</div>
              <div>对象名:</div>
              <div>描述:</div>
              <div>实体(主):</div>
              <div>实体(子):</div>
            </div>
            <div class="property-value">
              <div>{{formAttr.category}}</div>
              <div>{{formAttr.dataPersistenceType}}</div>
              <div>{{formAttr.name}}</div>
              <div>{{formAttr.objName}}</div>
              <div>{{formAttr.description}}</div>
              <primary-entity></primary-entity>
              <child-entity-group></child-entity-group>
            </div>
          </div>
        </div>
        <div class="entity-table-property entity-table-field">
          <div class="entity-table-property-header">
            <svg-icon icon-class="relationship" class="el-button--text"/>
            <div class="title">对应关系</div>
            <div class="arrow-collapse-expand" @click="showTableFields = !showTableFields">
              <i :class="showTableFields ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
          <relation-ship></relation-ship>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关联表单" name="second">
        <div class="relative-object-container">
          <relative-objs></relative-objs>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      title="JSON数据结构"
      :visible.sync="jsonEncoding"
      direction="rtl"
      size="40%" class="draw-container">
      <div class="demo-drawer__content json-container">
        <json-editor ref="jsonEditor" v-model="jsonContent"/>
      </div>
      <div class="drawer__footer draw-foot">
        <el-button type="primary" @click="" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        <el-button @click="jsonEncoding = false">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import CustomField from "./custom-field";
  import RelativeForms from "./relativeForms";
  import JsonEditor from '@/components/JsonEditor';
  import PrimaryEntity from "../../../common/business/primary-entity";
  import ChildEntityGroup from "../../../common/business/child-entity-group";
  import RelationShip from "./relationship";

  const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

  export default {
    name: 'right-panel',
    components: {RelationShip, ChildEntityGroup, PrimaryEntity, JsonEditor, RelativeObjs: RelativeForms, CustomField},
    props:{},
    data() {
      return {
        parentEntity:"greatWall",
        childRelativeEntities:[],
        loading:false,
        jsonContent:JSON.parse(jsonData),
        jsonEncoding:false,
        activeName: 'first',
        showObjectProperty:true,
        formAttr :{
          category:"业务对象报销申请",
          dataPersistenceType:"数据库",
          name:"报销单",
          objName:"bxd",
          description:"办公室报销申请",
          entities:"products"
        },
        showTableFields:false,
        fieldsInfo:[
          {
            id:0,
            fieldName:"China",
            fieldType:"String",
          },
          {
            id:1,
            fieldName:"USA",
            fieldType:"Date",
          },
          {
            id:2,
            fieldName:"France",
            fieldType:"Date",
          },
          {
            id:3,
            fieldName:"Japan",
            fieldType:"int",
          },
        ],

        //字段详细信息修改和创建时的对话框
        showFieldDetail:false,
      };
    },
    methods: {
      addField() {
        this.openDetailDlg(true);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      closeDlg() {
        this.showFieldDetail = false;
      },
      openDetailDlg(isClean) {
        if (!this.showFieldDetail) {
          this.showFieldDetail = true;
        }
        if (isClean) {
          this.$refs["fieldDetailRef"].reset();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";
  @import "../../../common/business/style.scss";
  .right-panel {
    width: $rightPanelW;
    background: white;
    border-right:1px solid #dcdfe6;
    border-left:1px solid #dcdfe6;
    position: absolute;
    top:78px;
    height: calc(100% - 82px);
    right:0;
    overflow: hidden;
  }
  .entity-table-property {
    padding:0 10px;
    font-size:$fontSize;
  }
  .arrow-collapse-expand {
    margin-left:8px;
    cursor: pointer;
  }
  .entity-table-property-body {
    display: flex;
  }
  .property-name {
    width:30%;
    text-align: right;
    color:#909399;
  }
  .property-name div {
    border-bottom:1px solid transparent;
    height:2.5em;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .property-value {
    padding-left:20px;
    width:70%;
    text-align: left;
  }

  .property-value div {
    height: 2.5em;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    &:nth-last-child(2) {
      border-bottom: none;
      padding: 6px 0;
    }
    &:last-child {
      height: 7.5em;
      border-bottom: none;
    }
  }

  .entity-table-field {
    /*margin-top:10px;*/
  }

  .external-style {
    right:$rightPanelW +5;
    bottom:5px;
  }
  .relative-object-container {
    padding: 10px 20px;
  }
</style>
