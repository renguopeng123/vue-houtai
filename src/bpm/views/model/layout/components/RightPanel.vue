<template>
  <div class="right-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane v-if="isDisplayDataSourceTab" label="数据源" name="first">
        <div class="entity-table-property">
          <div class="entity-table-property-header">
            <svg-icon icon-class="datasource" class="el-button--text"/>
            <div class="title">本地数据源</div>
            <div class="arrow-collapse-expand" @click="showEntityProperty = !showEntityProperty">
              <i :class="showEntityProperty ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
          <div v-show="showEntityProperty">
            <div v-for="(value,key1) in internalDataSource" class="data-source">
                <div class="icon">
                  <svg-icon icon-class="datasource" class="el-button--text"/>
                </div>
                <div class="content">
                  <div class="db-type">{{key1}}</div>
                    <div class="relative-entities">
                      <el-tag class="each-one" closable v-for="child in value" :key="child" type="info">{{child}}</el-tag>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="entity-table-property entity-table-field">
          <div class="entity-table-property-header">
            <svg-icon icon-class="externalDataSource" class="el-button--text" />
            <div class="title">外部表</div>
            <div class="arrow-collapse-expand" @click="showTableFields = !showTableFields">
              <i :class="showTableFields ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
          <div v-show="showTableFields">
            <div v-for="(values,key1) in Object.keys(externalDataSource)" class="data-source">
              <div class="icon">
                <svg-icon icon-class="datasource" class="el-button--text"/>
              </div>
              <div class="content">
                <div class="db-type">{{key1}}</div>
                <div class="relative-entities">
                  <el-tag class="each-one" closable v-for="child in values" :key="child" type="info">{{child}}</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-else label="基本属性" name="first">
        <div class="entity-table-property">
          <div class="entity-table-property-header">
            <svg-icon icon-class="entityTable" class="el-button--text" />
            <div class="title">表单属性</div>
            <div class="arrow-collapse-expand" @click="showEntityProperty = !showEntityProperty">
              <i :class="showEntityProperty ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </div>
          <div class="entity-table-property-body" v-show="showEntityProperty">
            <div class="property-name">
              <div>分类:</div>
              <div>数据源:</div>
              <div>已生成表:</div>
              <div>描述:</div>
              <div>实体名:</div>
              <div>数据库表名:</div>
            </div>
            <div class="property-value">
              <div>{{entityTableAttr.category}}</div>
              <div>{{entityTableAttr.dataSource}}</div>
              <div>
                {{entityTableAttr.isTableCreated ? "是" :"否"}}
                <el-button
                  v-if="!entityTableAttr.isTableCreated"
                  @click="createTableInDB"
                  style="margin-left:auto"
                  size="mini" type="text">
                  创建数据库</el-button>
              </div>
              <div>{{entityTableAttr.description}}</div>
              <div>{{entityTableAttr.entityName}}</div>
              <div>{{entityTableAttr.dbTableName}}</div>
            </div>
          </div>
        </div>
        <div class="entity-table-property entity-table-field">
          <div class="entity-table-property-header">
            <svg-icon icon-class="field" class="el-button--text"/>
            <div class="title">字段&nbsp;({{entityTableAttr.fieldsInfo.length}})</div>
            <div class="arrow-collapse-expand" @click="showTableFields = !showTableFields">
              <i :class="showTableFields ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
            <div class="add-fields">
              <span @click="addField">
                <i title="增加字段" class="el-icon-plus"></i>
              </span>
              <span title="JSON编码" @click="jsonEncoding=true">
                <svg-icon class="el-button--text" style="margin-right:10px;" icon-class="encoding" />
              </span>
            </div>
          </div>
          <draggable :list="entityTableAttr.fieldsInfo" class="entity-field-body" v-show="showTableFields">
            <custom-field
              v-bind:key="item.key"
              v-for="(item,i) in entityTableAttr.fieldsInfo"
              :fieldType="item.type"
              :fieldName="item.key"
              :class="{'field-active': activeFieldIndex == i}"
              :num="i"
              style="width:43%"  @clickOnField="openDetailDlg"></custom-field>
          </draggable>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关联对象" name="second">
        <div class="relative-object-container">
          <relative-objs :key="item.id" v-for="(item, index) in filterRelativeObjs" :objModel="item" :num="index"></relative-objs>
        </div>
      </el-tab-pane>
    </el-tabs>
    <fields-detail-dlg ref="fieldDetailRef" @deleteField="deleteFieldHandler"  @summitData="summitFieldDetails" @close="closeDlg" class="external-style" v-show="showFieldDetail" :fieldDetails="fieldDetails"></fields-detail-dlg>
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
  import draggable from "vuedraggable";
  import FieldsDetailDlg from "./fieldsDetailDlg";
  import RelativeObjs from "./relativeObjs";
  import JsonEditor from '@/components/JsonEditor';
  import {createTable, saveEntityInfo} from "../../../../api/model";
  import {FIELD_INFO_TEMPLATE} from "../src/const";
  import {arrayInvalidIndexProtection, cleanRawData, modifyEntityInfo} from "../src/util";

  const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

  export default {
    name: 'right-panel',
    components: {JsonEditor, RelativeObjs, FieldsDetailDlg, CustomField, draggable},
    props:{
      relativeObjs: {
        type: Array,
        default: []
      },
      isDisplayDataSourceTab:{
        type:Boolean,
        default:true
      },
      rawEntitiesDetail:Object,
      entityAttrs: {
        type:Object,
        default:null
      },
      internalDataSource:{
        type:Object,
        default:{},
      },
      externalDataSource:{
        type:Object,
        default:{},
      },
    },
    data() {
      return {
        activeFieldIndex:-1,
        loading:false,
        jsonContent:JSON.parse(jsonData),
        jsonEncoding:false,
        activeName: 'first',
        showEntityProperty:true,
        entityTableAttr :{
          primaryKey:"",
          category:"",
          dataSource:"",
          isTableCreated:false,
          description:"",
          entityName:"",
          dbTableName:"",
          fieldsInfo:[
            {
              key:"",
              type:"",
            },
          ],
        },
        showTableFields:true,

        //字段详细信息修改和创建时的对话框
        showFieldDetail:false,
      };
    },
    watch:{
      isDisplayDataSourceTab(newValue) {
        if (newValue) {
          this.closeDlg();
        }
      },
      'entityTableAttr.entityName': {
        handler(newValue) {
          this.closeDlg();
        }
      },
      entityAttrs: {
        handler(newValue) {
          this.entityTableAttr = _.cloneDeep(newValue);
        },
        deep:true
      }
    },
    methods: {
      createTableInDB() {
        if (this.entityTableAttr.primaryKey == "") {
          this.$message({
            message: "无效的实体！",
            type: "warning"
          });
          return;
        }
        createTable({id: this.entityTableAttr.primaryKey}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "数据库表创建成功！",
              type: "success"
            });
            this.entityTableAttr.isTableCreated = true;
          }
        });
      },
      addField() {
        this.openDetailDlg(-1);
        this.$refs["fieldDetailRef"].reset();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      deleteFieldHandler() {
        this.$confirm(`确认删除字段吗`).then(_ => {
          this.rawEntitiesDetail.columns.splice(this.activeFieldIndex, 1);
          saveEntityInfo(this.rawEntitiesDetail).then(res => {
            if (200 == res.code && res.isOk) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.activeFieldIndex = arrayInvalidIndexProtection(this.rawEntitiesDetail.columns, this.activeFieldIndex);
              if (this.activeFieldIndex < 0) {
                this.closeDlg();
              }
            }
            this.$emit("modifyEntityDetails");
          });
        })
      },
      summitFieldDetails(data) {
        //this.rawEntitiesDetail这两个对象在下边两个方法中被修改；
        cleanRawData(this.rawEntitiesDetail);
        modifyEntityInfo(this.rawEntitiesDetail, this.activeFieldIndex, data);

        saveEntityInfo(this.rawEntitiesDetail).then(res => {
          if (200 == res.code && res.isOk) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            //失去焦点时，关闭对话框
            if (-1 == this.activeFieldIndex) {
              this.closeDlg();
            }
            this.$emit("modifyEntityDetails");
          }
        });
      },
      closeDlg() {
        this.showFieldDetail = false;
        this.activeFieldIndex = -1;
      },
      openDetailDlg(num) {
        //异常保护
        let fieldsNum = arrayInvalidIndexProtection(this.entityTableAttr.fieldsInfo, num);
        this.activeFieldIndex = fieldsNum;
        if (!this.showFieldDetail) {
          this.showFieldDetail = true;
        }
      }
    },
    computed:{
      filterRelativeObjs() {
        if (this.isDisplayDataSourceTab) {
          return this.relativeObjs;
        } else {
          return this.relativeObjs.filter(item =>{
            return item["entity"].includes(this.entityTableAttr.entityName);
          })
        }
      },
      fieldDetails() {
        if (this.activeFieldIndex >= 0) {
          return  _.cloneDeep(this.entityTableAttr.fieldsInfo[this.activeFieldIndex]);
        } else {
          return {...FIELD_INFO_TEMPLATE};
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";
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
    height:2.5em;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .property-value {
    padding-left:20px;
    padding-right:10px;
    width:70%;
    text-align: left;
  }
  .property-value div {
    height:2.5em;
    border-bottom:1px solid #dcdfe6;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .entity-table-field {
    margin-top:20px;
  }

  .external-style {
    right:$rightPanelW +5;
    bottom:5px;
  }
  .relative-object-container {
    padding: 10px 20px;
    overflow:auto;
    height:calc(100vh - 155px);
  }

  .data-source {
    /*height:7.5em;*/
    /*border:1px solid blue;*/
    display: flex;
    width:100%;
    .icon {
      width:10%;
      text-align: right;
      /*border:1px solid red;*/
    }
    .content {
      width:90%;
      padding:0 5px;
      .db-type {
        font-weight: 600;
        margin-bottom:.25em;
      }
      .relative-entities {
        overflow: auto;
        /*height:6em;*/
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .each-one {
          margin:.25em 1em .25em 0;
        }
      }
    }
  }
</style>
