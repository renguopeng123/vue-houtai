<template>
  <div class="model-app-main">
    <div class="paper-btn-panel">
      <el-tag title="新增实体"
              type="success"
              class="el-icon-plus icon-font-size-15"
              @click="createNewEntity=true">
      </el-tag>
      <el-tag title="新增外部表" type="success" class="margin-left-10 icon-font-size-15">
        <svg-icon icon-class="add-more"/>
      </el-tag>
      <el-tag effect="plain" @click="saveDiagram(false)" title="保存" type="success" class="margin-left-10 icon-font-size-15">
        <svg-icon icon-class="save"/>
      </el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag effect="plain" title="放大" class="icon-font-size-15 el-icon-zoom-in">
      </el-tag>
      <el-tag effect="plain" title="缩小" class="margin-left-10 icon-font-size-15 el-icon-zoom-out">
      </el-tag>
      <el-tag effect="plain" title="原始大小" class="margin-left-10 icon-font-size-15">
        <svg-icon icon-class="actualSize"/>
      </el-tag>
      <el-tag effect="plain" title="适应窗口" class="margin-left-10 icon-font-size-15">
        <svg-icon icon-class="fitZoomToWindow"/>
      </el-tag>
      <el-tag effect="plain" title="刷新" class="margin-left-10 icon-font-size-15 el-icon-refresh">
      </el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag effect="plain" title="新建数据库表" class="icon-font-size-15">
        <svg-icon icon-class="addDbTable"/>
      </el-tag>
      <el-tag effect="plain" title="删除数据库表" class="margin-left-10 icon-font-size-15">
        <svg-icon icon-class="delDbTable"/>
      </el-tag>
      <el-tag effect="plain" type="danger" @click="deleteEntity" title="删除实体" class="margin-left-10 icon-font-size-15">
        <i class="el-icon-delete"/>
      </el-tag>
      <el-badge style="margin-left:auto" :value="selectedEntities.length">
        <el-tag
          effect="plain"
          title="创建对象"
          @click="openShoppingCartDlg"
          class="create-obj-btn
          icon-font-size-15">
          <svg-icon icon-class="cube"/>
        </el-tag>
      </el-badge>
    </div>
    <div class="paper-and-property">
      <div id="modelPaper"></div>
      <right-panel
        :internalDataSource="internalDataSource"
        :external-data-source="externalDataSource"
        :rawEntitiesDetail="rawEntitiesInfoFromServer"
        :entityAttrs="entitiesDetailInfo"
        :is-display-data-source-tab="isClickOnPaperBlank"
        :relativeObjs="relativeObjects"
        @modifyEntityDetails="modifyEntityDetailsHandler"></right-panel>
    </div>
    <shopping-cart
      :shoppingItems="selectedEntities"
      class="create-obj"
      v-show="showShoppingCart"
      @cancelHandleShoppingCart="closeShoppingCartDlg"
      @createObj="createObjHandle"
      @unselectedElement="unSelectElementHandler"
    ></shopping-cart>
    <el-drawer
      title="新建实体"
      :before-close="closeCreateEntityDlg"
      :visible.sync="createNewEntity"
      @opened="initCreateEntityDlg"
      direction="rtl"
      ref="createEntityDrawerRef"
      size="55%" class="draw-container">
      <div class="drawer__content json-container">
        <el-form ref="entityForm" :rules="entityFormRules" :model="entityForm">
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label-width="50px" label="分类" prop="classify">
                <el-cascader
                  :show-all-levels="false"
                  :props="{value:'key',label:'name'}"
                  clearable
                  v-model="entityForm.classify"
                  :options="entitiesCategory"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="70px" label="数据源" prop="dataSourceModel">
                <el-select v-model="entityForm.dataSourceModel" placeholder="请选择">
                  <el-option
                    v-for="item in dataSourceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label-width="100px" label="是否已生成表">
                <!--<el-input v-model="entityForm.classify"></el-input>-->
                <el-row>
                  <div>
                    <span>{{entityForm.isTableCreated ? '是':'否'}}</span>
                    <!--<el-button style="float: right;" v-if="!entityForm.isTableCreated" type="text">创建数据库</el-button>-->
                  </div>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label-width="50px" label="描述" prop="description">
                <el-input v-model="entityForm.description"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="70px" label="实体名" prop="entityName">
                <el-input v-model="entityForm.entityName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label-width="100px" label="数据库表名" prop="tableName">
                <el-input v-model="entityForm.tableName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="entity-table-property-header">
          <svg-icon icon-class="field" class="el-button--text"/>
          <div class="title">字段</div>
          <div class="add-fields">
              <span @click="">
                <i title="增加字段" class="el-icon-plus"></i>
              </span>
          </div>
        </div>
        <div class="all-fields">
          <div class="primary-key">
            <svg-icon class="icon" icon-class="key"/>
          </div>
          <div class="left">
            <el-scrollbar class="scrollbar-style">
              <draggable :list="fieldsInfos" class="entity-field-body">
                <custom-field
                  :key="item.name"
                  v-for="(item, index) in fieldsInfos"
                  :fieldType="item.dataTypeLabel" :num="index"
                  :fieldName="item.name"
                  style="width:43%;"
                  :class="{'field-active': activeFieldIndex == index}"
                  @clickOnField="fieldActiveHandle">
                </custom-field>
                <div class="add-new-field"
                     @click="addNewField"
                     title="增加字段">
                  <svg-icon icon-class="plus" style="color:rgb(102,194,59)"></svg-icon>
                </div>
              </draggable>
            </el-scrollbar>
          </div>
          <div class="right">
            <el-scrollbar class="scrollbar-style">
              <div class="body">
                <entity-field
                  :detail-attr="fieldDetailAttrs"
                  @summit="summitHandle"
                  ref="entityFieldDef"></entity-field>
              </div>
              <div class="foot">
                <el-button type="success" @click="saveField">保存</el-button>
                <el-button @click="cancelOpr">取消</el-button>
                <el-button type="success" plain>保存并新增</el-button>
                <el-button type="danger" plain style="margin-left:auto" @click="deleteOpr">删除</el-button>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div class="draw-foot">
        <el-button type="primary" @click="$refs.createEntityDrawerRef.closeDrawer()">确 定</el-button>
        <el-button @click="createNewEntity=false">取 消</el-button>
      </div>
    </el-drawer>
    <create-object-dlg @confirmSuccess="confirmSuccessHandler" :isOpenDlg.sync="createObjDlgVisible" :createObjDlgParams="createObjDlgParams" :entitiesTree="allEntitiesTree"></create-object-dlg>
    <!--<element-mate v-for="items in entitiesCollections" :element="items"></element-mate>-->
  </div>
</template>

<script>
  import * as joint from "jointjs";
  import RightPanel from "./RightPanel";
  import ShoppingCart from "./shoppingCart";
  import draggable from "vuedraggable";
  import CustomField from "./custom-field";
  import EntityField from "./entityField";
  import CreateObjectDlg from "../../../common/business/create-obj-dlg";
  import {CHECKBOX_FILL, DATA_SOURCE, FIELD_INFO_TEMPLATE} from "../src/const";
  import ElementMate from "./elementMate";
  import {
    getDataSourceInfo,
    getEntitiesDetailInfo,
    getEntitiesDiagram, getEntitiesUnderSpecificTreeNode, getRelativeObjectsByGroupId, removeEntityById,
    saveEntitiesDiagram,
    saveEntityInfo
  } from "../../../../api/model";
  import {buildElementData, buildEntityInfo, dynamicObject, getNodeByKeys, parseChildrenEntities} from "../src/util";
  import {eventBus} from "../../main";

  export default {
    name: 'app-main',
    props:{
      entitiesCategory: {
        type: Array,
        default: []
      },
      allEntitiesTree: {
        type: Array,
        default: []
      }
    },
    components: {
      ElementMate, CreateObjectDlg, EntityField,
      CustomField, ShoppingCart, RightPanel,draggable},
    data() {
      return {
        relativeObjects:[],
        selectedElementOnPaper:null,
        internalDataSource:{},
        externalDataSource:{},
        rawEntitiesInfoFromServer:null, //这块缓存用于更新操作；基于该缓存更新数据；TODO 后续考虑将下边的entitiesDetailInfo缓存去掉；
        entitiesDetailInfo:{
          dataSource:"",
          isTableCreated:false,
          description:"",
          entityName:"",
          dbTableName:"",
          fieldsInfo:[],
          primaryKey:""
        },
        diagramIndex:undefined, //用于图保存时，同一个分类保存在同一条记录中；
        currentNode: {nodeId: "", nodeName: ""},
        entitiesCollections:[],
        fieldDetailAttrs:null,
        entityFormRules:{
          classify:[
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          entityName:[
            { required: true, message: '请填写实体名', trigger: 'blur' },
          ],
          description:[
            { required: true, message: '请填写描述信息', trigger: 'blur' },
          ],
          tableName:[
            { required: true, message: '请填写数据库表名', trigger: 'blur' },
          ]
        },
        createObjDlgVisible:false,
        createObjDlgParams:{},
        loading:false,
        activeFieldIndex:null,
        fieldsInfos:[],
        entityForm:{
          classify:[],
          dataSourceModel:"local",
          isTableCreated:false,
          description:"",
          entityName:"",
          tableName:""
        },
        dataSourceOptions:DATA_SOURCE,
        createNewEntity:false,
        graph: null,
        paper: null,

        //选择的业务实体
        selectedEntities:[],

        //是否展示购物车对话框
        showShoppingCart:false,

        //购物车中物件的数量
        numOfItemsInCart:0,

        //是否在paper空白处点击
        isClickOnPaperBlank:true,

        //数据源缓存。用于显示不同的数据源类型下包含的实体
        dataSourceCache:undefined
      }
    },
    created(){
      getDataSourceInfo().then(res => {
      if (res.code == 200 && res.isOk && res.rows) {
        this.dataSourceCache = res.rows.reduce(function (map, node) {
          map[node["key_"]] = {dbType:node["db_type_"], id:node["id_"]};
          return map;
        }, {});
      }
    })
    },
    mounted() {
      this.initializePaper();
      this.initializeSelection();

      eventBus.$on('treeNodeClick', (node) => {
        this.graph.clear();
        this.diagramIndex = undefined;
        this.isClickOnPaperBlank = true;
        this.currentNode.nodeName = node["nodeName"];
        this.currentNode.nodeId = node["nodeId"];
        //
        Promise.all([getEntitiesUnderSpecificTreeNode({groupId:node["nodeId"]}),
          getEntitiesDiagram({id: node["nodeId"]}), getRelativeObjectsByGroupId({tableGroupKey:node["nodeId"]})]).then(res => {

          //获取位置信息；实际字段信息以数据库为准；
          let positionsMap = {};
          if (res[1].data) {
            this.diagramIndex = res[1].data.id;
            let diagramJson = JSON.parse(res[1].data.diagramJson);
            if (diagramJson) {
              positionsMap = diagramJson["cells"].reduce(function (map, node) {
                map[node.question] = node;
                return map;
              }, {});
            }
          }
          this.internalDataSource = {};
          res[0].rows.forEach((item, index) => {
            //用于点击paper空白处时，显示已经创建的内外部表
            if (item.createdTable) {
              let dbType = "others";
              if (this.dataSourceCache) {
                dbType = this.dataSourceCache[item["dsKey"]].dbType;
              }
              //外部表
              if (item["external"]) {
                dynamicObject(this.externalDataSource, dbType, item["key"]);
              } else { //内部表
                dynamicObject(this.internalDataSource, dbType, item["key"]);
              }
            }
            //已数据库为准，看看改实体是否保存了位置信息。若未保存则显示在paper的默认位置；
            let name = item.key + "_" + item.id;
            let fields = buildElementData(item["fieldNames"], item["fieldTypes"]);
            let position = positionsMap[name] ? positionsMap[name].position : undefined;
            this.createNewEntityOnPaper(name, fields, position);
          });
          this.restoreSpecificElementSelected();

          this.relativeObjects = [];
          //分组关联的对象信息；
          (res[2]||[]).forEach(item => {
            this.relativeObjects.push({
              id:item.id, //主要用于跳转到对象页面定位；
              name:item.name||"",
              desc:item.desc||"",
              entity:parseChildrenEntities(item)
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
        // getEntitiesDiagram({id: node["nodeId"]}).then(res => {
        //   let result = res.data;
        //   if (result) {
        //     this.graph.fromJSON(JSON.parse(result.diagramJson));
        //     this.diagramIndex = result.id;
        //     this.restoreSpecificElementSelected()
        //   }
        // });
      });
    },
    methods: {
      modifyEntityDetailsHandler() {
        if (this.selectedElementOnPaper != null) {
          this.getElementById(this.selectedElementOnPaper, true);
        }
      },
      confirmSuccessHandler(param) {
        this.createObjDlgVisible = false;
        let url = document.location.protocol + "//" + window.location.host + '/businessObject.html';
        let params = `?id=${param.id}` + `&key=${param.key}`;
        window.open(url + params, "_blank");
      },
      deleteEntity() {
        let temp = this.entitiesDetailInfo.entityName;
        if (temp != "") {
          this.$confirm(`确认删除实体${temp}吗`)
            .then(_ => {
              let pk = this.entitiesDetailInfo.primaryKey;
              if (pk != "") {
                removeEntityById({id: pk}).then(res => {
                  //从数据库中删除实体成功后，从画布上删除对应的实体
                  if (res.isOk) {
                    this.$message({
                      message: '实体删除成功',
                      type: 'success'
                    });
                    if (this.selectedElementOnPaper)
                      this.selectedElementOnPaper.remove();
                    this.saveDiagram(true);
                  }
                })
              }
            })
            .catch(_ => {});
        }
      },
      restoreSpecificElementSelected() {
        this.selectedEntities.forEach(item => {
          let element = this.graph.getCell(item.elementId);
          element.attr(CHECKBOX_FILL, 'blue');
        })
      },
      unSelectElement(ele, item) {
        if (ele) {
          ele.attr(CHECKBOX_FILL, 'white');
        }
        let index = this.selectedEntities.findIndex(i => {
          return i.elementId == item.elementId;
        });
        if (index > -1) {
          this.selectedEntities.splice(index, 1);
        }
      },
      saveDiagram(silent) {
        let param = {
          diagramJson: JSON.stringify(this.graph),
          groupId: this.currentNode.nodeId,
          groupName: this.currentNode.nodeName
        }
        if (this.diagramIndex) {
          param.id = this.diagramIndex;
        }
        saveEntitiesDiagram(param).then(res => {
          if (res.code == 200) {
            if (!silent) {
              this.$message({
                message: "位置保存成功！",
                type: "success"
              });
            }
            if (res.data) {
              this.diagramIndex = res.data;
            }
          }
        });
      },
      initCreateEntityDlg() {
        //清空所有字段
        this.fieldsInfos=[];

        //清空公共字段；
        this.$refs['entityForm'].resetFields();

        //帮用户新增一个新字段；
        this.addNewField();
      },
      closeCreateEntityDlg(done) {
        this.$refs['entityForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确定提交吗？')
              .then(_ => {
                let entityInfo = {
                  fields:[...this.fieldsInfos],
                  ...this.entityForm
                };
                let element = getNodeByKeys(this.entitiesCategory, this.entityForm.classify);
                let obj = buildEntityInfo(entityInfo, element);
                saveEntityInfo(obj).then(res => {
                  if (res.code == 200 && res.data) {
                    let name = entityInfo.entityName + "_" + res.data;
                    let fields = entityInfo.fields.map(item => {
                      return {
                        id: item.propertyName,
                        text_left: item.propertyName,
                        text_right: item.dataTypeLabel
                      }
                    });
                    //新建的实体分组和paper显示的分组一致时，在界面上展示；否则在点击分组时显示。
                    if (element.id == this.currentNode.nodeId) {
                      this.createNewEntityOnPaper(name, fields);
                    }
                    done();
                  }
                });
              })
              .catch(_ => {});
          } else {
            return false;
          }
        });
      },
      summitHandle(input) {
        //找到对应的field，因为位置允许移动，所以还需要找；
        let index = this.getUnsavedFieldIndex();
        Object.assign(this.fieldsInfos[index], input, {isSaved:true});
      },
      saveField() {
        this.$refs["entityFieldDef"].formSummit();
      },
      getUnsavedFieldIndex() {
        return this.fieldsInfos.findIndex(item => !item["isSaved"]);
      },
      deleteOpr(){
        let name = this.fieldsInfos[this.activeFieldIndex].name;
        this.$confirm(`确定删除字段${name}吗？`)
          .then(_ => {

            this.fieldsInfos.splice(this.activeFieldIndex, 1);
          })
          .catch(_ => {});
      },
      cancelOpr() {
        // this.$refs["entityFieldDef"].resetForm();
        let index = this.getUnsavedFieldIndex();

      },
      addNewField() {
        //按钮点击前，需要保证已经新增的字段已保存。
        let index = this.getUnsavedFieldIndex();

        //没有找到，则index=-1；
        if (index > -1) {
          this.$message({
            message: '请先保存新增字段',
            type: 'warning'
          });
        } else {
          //新增字段
          this.fieldsInfos.push({...FIELD_INFO_TEMPLATE});
          //焦点应该在新增的未保存的实体上。
          this.activeFieldIndex = this.fieldsInfos.length - 1;

          //reset右侧对话框中的内容；
          this.$refs["entityFieldDef"].resetForm();
        }
      },
      fieldActiveHandle(index) {
        this.activeFieldIndex = index;
        //TODO 有个bug 双击正在修改的字段会重置为空；也不算bug把。
        this.fieldDetailAttrs = {...this.fieldsInfos[index]};
      },
      openShoppingCartDlg() {
        this.showShoppingCart = true;
      },
      closeShoppingCartDlg() {
        this.showShoppingCart = false;
      },
      createObjHandle(data) {
        this.createObjDlgVisible=true;
        this.createObjDlgParams = data;
      },
      unSelectElementHandler(data) {
        let element = this.graph.getCell(data.elementId);
        this.unSelectElement(element,data);
      },

      createNewEntityOnPaper(entityName, fields, position) {
        let element = new joint.shapes.gwssi.customRec({
          //TODO 将来需要支持新增的实体自动排序；
          position: position || { x: 300, y: 200 },
          size: { width: 100, height: 70 },
          question: entityName,
          options: [...fields]
        });
        this.graph.addCell(element);
      },

      defBusinessEntity() {
        joint.dia.Element.define('gwssi.customRec', {

          optionHeight: 30,
          questionHeight: 45,
          // paddingBottom: 30,
          minWidth: 200,
          attrs: {
            '.': {
              magnet: false
            },
            '.body': {
              refWidth: '100%',
              refHeight: '100%',
              fill: '#316896',
              // rx: '1%',
              // ry: '2%',
              stroke: 'none',
              // fill: {
              //   type: 'linearGradient',
              //   stops: [
              //     { offset: '0%', color: '#FEB663' },
              //     { offset: '100%', color: '#31D0C6' }
              //   ],
              //   // Top-to-bottom gradient.
              //   attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
              // }
            },
            '.checkbox-simulation': {
              cursor: 'pointer',
              event: 'element:checkboxClick',
              refX: '7%',
              fill: 'white',
              height: 15,
              width: 15,
              refY: 15,
            },
            '.image-db-status': {
              width: 15,
              height: 15,
              refY: 15,
              refX: '85%',
              xlinkHref: "", //TODO 图片暂时不清楚如何引用
            },
            // '.btn-add-option': {
            //   refX: 10,
            //   refDy: -22,
            //   cursor: 'pointer',
            //   fill: 'white'
            // },
            // '.btn-remove-option': {
            //   xAlignment: 10,
            //   yAlignment: 13,
            //   cursor: 'pointer',
            //   fill: 'white'
            // },
            '.options': {
              refX: 0,
            },

            // Text styling.
            text: {
              fontFamily: 'Arial',
            },
            '.option-text-left': {
              fontSize: 11,
              fill: '#4b4a67',
              refX: 10,
              yAlignment: 'middle'
            },
            '.option-text-right': {
              fontSize: 11,
              fill: '#4b4a67',
              refX: '95%',
              yAlignment: 'middle',
              textAnchor: 'end',
            },
            '.question-text': {
              fill: 'white',
              refX: '20%',
              refY: 15,
              fontSize: 14,
              textAnchor: 'left',
              style: {
                textShadow: '1px 1px 0px gray'
              }
            },

            // Options styling.
            '.option-rect': {
              // rx: 3,
              // ry: 3,
              stroke: 'white',
              strokeWidth: 1,
              strokeOpacity: .7,
              fillOpacity: .9,
              fill: '#f6f6f6',
              refWidth: '100%'
            }
          }
        }, {

          markup: '<rect class="body"/>' +
            '<text class="question-text"/>' +
            '<rect class="checkbox-simulation"></rect>' +
            '<image class="image-db-status"></image>' +
            '<g class="options"></g>',
          optionMarkup: '<g class="option"><rect class="option-rect"/>' +
            '<text class="option-text-left"/><text class="option-text-right"/></g>',

          getTitle: function(text) {
            let titleIndex = text.lastIndexOf("_");
            return text.substring(0, titleIndex);
          },
          initialize: function () {
            joint.dia.Element.prototype.initialize.apply(this, arguments);
            this.on('change:options', this.onChangeOptions, this);
            this.on('change:question', function () {
              this.attr('.question-text/text', this.getTitle(this.get('question')) || '');
              this.autoresize();
            }, this);

            this.on('change:questionHeight', function () {
              this.attr('.options/refY', this.get('questionHeight'), {silent: true});
              this.autoresize();
            }, this);

            this.on('change:optionHeight', this.autoresize, this);

            this.attr('.options/refY', this.get('questionHeight'), {silent: true});
            this.attr('.question-text/text', this.getTitle(this.get('question')), {silent: true});

            this.onChangeOptions();
          },

          onChangeOptions: function () {

            var options = this.get('options');
            var optionHeight = this.get('optionHeight');

            // First clean up the previously set attrs for the old options object.
            // We mark every new attribute object with the `dynamic` flag set to `true`.
            // This is how we recognize previously set attributes.
            var attrs = this.get('attrs');
            _.each(attrs, function (attrs, selector) {

              if (attrs.dynamic) {
                // Remove silently because we're going to update `attrs`
                // later in this method anyway.
                this.removeAttr(selector, {silent: true});
              }
            }.bind(this));

            // Collect new attrs for the new options.
            var offsetY = 0;
            var attrsUpdate = {};
            var questionHeight = this.get('questionHeight');

            _.each(options, function (option) {

              var selector = '.option-' + option.id;

              attrsUpdate[selector] = {transform: 'translate(0, ' + offsetY + ')', dynamic: true};
              attrsUpdate[selector + ' .option-rect'] = {height: optionHeight, dynamic: true};
              attrsUpdate[selector + ' .option-text-left'] = {text: option.text_left, dynamic: true, refY: optionHeight / 2};
              attrsUpdate[selector + ' .option-text-right'] = {text: option.text_right, dynamic: true, refY: optionHeight / 2};

              offsetY += optionHeight;

              // var portY = offsetY - optionHeight / 2 + questionHeight;
              // if (!this.getPort(option.id)) {
              //   this.addPort({ group: 'out', id: option.id, args: { y: portY }});
              // } else {
              //   this.portProp(option.id, 'args/y', portY);
              // }
            }.bind(this));

            this.attr(attrsUpdate);
            this.autoresize();
          },

          autoresize: function () {

            var options = this.get('options') || [];
            // var gap = this.get('paddingBottom') || 20;
            var height = options.length * this.get('optionHeight') + this.get('questionHeight');// + gap;
            var width = joint.util.measureText(this.getTitle(this.get('question')), {
              fontSize: this.attr('.question-text/fontSize')
            }).width;
            this.resize(Math.max(this.get('minWidth') || 150, width), height);
          },

          addOption: function (option) {

            var options = JSON.parse(JSON.stringify(this.get('options')));
            options.push(option);
            this.set('options', options);
          },

          removeOption: function (id) {

            var options = JSON.parse(JSON.stringify(this.get('options')));
            this.removePort(id);
            this.set('options', _.without(options, _.find(options, {id: id})));
          },

          changeOption: function (id, option) {

            if (!option.id) {
              option.id = id;
            }

            var options = JSON.parse(JSON.stringify(this.get('options')));
            options[_.findIndex(options, {id: id})] = option;
            this.set('options', options);
          }
        });

        joint.shapes.gwssi.customRecView = joint.dia.ElementView.extend({

          events: {
            // 'click .btn-add-option': 'onAddOption',
            // 'click .btn-remove-option': 'onRemoveOption'
          },

          presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
            options: ['OPTIONS']
          }),

          confirmUpdate: function (flags) {
            joint.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
            if (this.hasFlag(flags, 'OPTIONS')) this.renderOptions();
          },

          renderMarkup: function () {

            joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

            // A holder for all the options.
            this.$options = this.$('.options');
            // Create an SVG element representing one option. This element will
            // be cloned in order to create more options.
            this.elOption = joint.V(this.model.optionMarkup);

            this.renderOptions();
          },

          renderOptions: function () {

            this.$options.empty();

            _.each(this.model.get('options'), function (option, index) {

              var className = 'option-' + option.id;
              var elOption = this.elOption.clone().addClass(className);
              elOption.attr('option-id', option.id);
              this.$options.append(elOption.node);

            }.bind(this));

            // Apply `attrs` to the newly created SVG elements.
            this.update();
          },

          onAddOption: function () {

            this.model.addOption({
              id: _.uniqueId('option-'),
              text: 'Option ' + this.model.get('options').length
            });
          },

          onRemoveOption: function (evt) {

            this.model.removeOption(joint.V(evt.target.parentNode).attr('option-id'));
          }
        });

        joint.shapes.gwssi.Selection = Backbone.Collection.extend();
        joint.shapes.gwssi.SelectionView = joint.mvc.View.extend({

          PADDING: 3,

          BOX_TEMPLATE: joint.V('rect', {
            'fill': 'none',
            'stroke': '#409eff',
            'stroke-width': 2,
            'pointer-events': 'none'
          }),

          init: function() {
            this.listenTo(this.model, 'add reset change', this.render);
          },

          render: function() {

            _.invokeMap(this.boxes, 'remove');

            this.boxes = this.model.map(function(element) {
              return this.BOX_TEMPLATE
                .clone()
                .attr(element.getBBox().inflate(this.PADDING))
                .appendTo(this.options.paper.cells);
            }.bind(this));

            return this;
          },

          onRemove: function() {
            _.invokeMap(this.boxes, 'remove');
            delete this.boxes;
          }
        });

        // Utils
        joint.util.measureText = function (text, attrs) {

          var fontSize = parseInt(attrs.fontSize, 10) || 10;

          var svgDocument = joint.V('svg').node;
          var textElement = joint.V('<text><tspan></tspan></text>').node;
          var textSpan = textElement.firstChild;
          var textNode = document.createTextNode('');

          textSpan.appendChild(textNode);
          svgDocument.appendChild(textElement);
          document.body.appendChild(svgDocument);

          var lines = text.split('\n');
          // var lines = ["123", "3456"];
          var width = 0;

          // Find the longest line width.
          _.each(lines, function (line) {

            textNode.data = line;
            var lineWidth = textSpan.getComputedTextLength();

            width = Math.max(width, lineWidth);
          });

          var height = lines.length * (fontSize * 1.2);

          joint.V(svgDocument).remove();

          return {width: width, height: height};
        };
      },
      getElementById(evt, isSaveDiagram) {
        //从title中获取这个节点的Id
        let temp = evt.get("question");
        let index = temp.lastIndexOf("_");
        //根据id从后台取数据并刷新页面；
        if (index > -1) {
          let entitiesPK = temp.substring(index + 1);
          this.entitiesDetailInfo.primaryKey = entitiesPK;
          this.entitiesDetailInfo.entityName = temp.substring(0, index);
          this.rawEntitiesInfoFromServer = null;
          getEntitiesDetailInfo({id: entitiesPK, fill: 1}).then(res => {
            if (res.code == 200 && res.data) {
              this.rawEntitiesInfoFromServer = _.cloneDeep(res.data);
              this.entitiesDetailInfo.category = res.data.groupName;
              this.entitiesDetailInfo.dataSource = res.data.dsName;
              this.entitiesDetailInfo.isTableCreated = res.data.createdTable;
              this.entitiesDetailInfo.description = res.data.comment;
              this.entitiesDetailInfo.dbTableName = res.data.name;
              this.entitiesDetailInfo.fieldsInfo = res.data.columns;
              let fields = [];
              res.data.columns.map(item =>{
                fields.push({
                  id: item.key,
                  text_left: item.key,
                  text_right: item.type
                })
              });
              //基于后台取到的最新数据更新paper上的element；
              evt.set("options", fields);
              if (isSaveDiagram){
                this.saveDiagram(true);
              }
            }
          })
        }
      },
      initializePaper() {
        this.graph = new joint.dia.Graph;
        this.paper = new joint.dia.Paper({
          el: $('#modelPaper'),
          width: "100%",
          height: "100%",
          model: this.graph,
          gridSize: 10,
          drawGrid: true,
          linkPinning: false,
        });

        let that = this;

        //设置paper上监听事件；
        this.paper.on('element:checkboxClick', function (elementView) {
          const ELEMENT_TITLE = ".question-text/text";
          let fill = elementView.model.attr(CHECKBOX_FILL);
          let title =  elementView.model.attr(ELEMENT_TITLE);
          let elementId = elementView.model.get("id");
          let item = {elementId: elementId, name: title};

          if (fill === "white") {
            elementView.model.attr(CHECKBOX_FILL, 'blue');
            that.selectedEntities.push(item);
          } else {
            that.unSelectElement(elementView.model, item);
          }
        });
        //点击paper空白处时，显示数据源tab；
        this.paper.on('blank:pointerdown', function (evt) {
          that.isClickOnPaperBlank = true;
          that.entitiesDetailInfo.primaryKey = "";
          that.entitiesDetailInfo.entityName = "";
          that.selectedElementOnPaper = null;
        });

        //点击element时，显示对应的基本属性tab；
        this.paper.on('element:pointerup', function (evt) {
          that.selectedElementOnPaper = evt.model;
          that.getElementById(evt.model);
          that.isClickOnPaperBlank = false;
        });

        //自定义业务实体；
        this.defBusinessEntity();
      },
      initializeSelection() {
        var paper = this.paper;
        var graph = this.graph;
        var selection = this.selection = new joint.shapes.gwssi.Selection;

        selection.on('add reset', function() {
          var cell = this.selection.first();
          // if (cell) {
          //   this.status('Selection: ' + cell.get('type'));
          // } else {
          //   this.status('Selection emptied.');
          // }
        }, this);

        paper.on({
          'element:pointerup': function(elementView) {
            this.selection.reset([elementView.model]);
          },
          'blank:pointerdown': function() {
            this.selection.reset([]);
          }
        }, this);

        graph.on('remove', function() {
          this.selection.reset([]);
        }, this);

        new joint.shapes.gwssi.SelectionView({
          model: selection,
          paper: paper
        });

        // document.body.addEventListener('keydown', _.bind(function(evt) {
        //
        //   var code = evt.which || evt.keyCode;
        //   // Do not remove the element with backspace if we're in inline text editing.
        //   if ((code === 8 || code === 46) && !this.textEditor && !this.selection.isEmpty()) {
        //     this.selection.first().remove();
        //     this.selection.reset([]);
        //     return false;
        //   }
        //
        //   return true;
        //
        // }, this), false);
      }

    },
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";
  @import "../../../common/business/style.scss";
  .model-app-main {
    height: 100%;
    background: #e6e6e6;
    margin-left: $leftSideBarW + 1;
  }
  .el-tag {
    cursor: pointer;
  }
  .create-obj-btn{
    margin-left:10px;
    cursor: pointer;
  }
  .margin-left-10 {
    margin-left:10px;
  }
  .paper-and-property {
    height:100%;
  }
  .paper-btn-panel {
    padding: 0 18px 0 10px;
    height: 40px;
    background-color:white;
    border-bottom:1px solid #dcdfe6;
    border-right:1px solid #dcdfe6;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .icon-font-size-15{
    font-size: 15px;
  }
  .create-obj {
    position:absolute;
    top:73px;
    right:19px;
    border-radius: 4px;
    z-index: 2000;
  }
  .drawer__content {
    padding:10px;
    font-size:$fontSize;
    /deep/ label {
      font-weight: normal;
      color:#909399;
    }
  }
  .all-fields {
    /*border:1px solid red;*/
    display: flex;
    height:calc(100% - 156px);
    .primary-key {
      width:1em;
      /*border-right:1px solid black;*/
      .icon {
        color:red;
        margin-top:8px;
      }
    }
    .left {
      width:40%;
      /*border-right:1px solid black;*/
    }
    .right {
      margin-left:2%;
      width:58%;
      border: $borderStyle;
      .body {
        padding: 10px;
        height:calc(100% - 83px);
        min-height:424px; //适配不同的分辨率，很关键；
      }
      .foot {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top:$borderStyle;
        width:calc(100% - 20px);
        padding: 10px 10px 10px 10px;
        height:3em;
      }
    }
    .add-new-field {
        width:43%;
        border:1px solid #dcdfe6;
        padding:5px;
        display: flex;
        justify-content: center;
        height:20px;
        cursor: pointer;
        align-items: center;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      &:active {
        color: #205b93;
        border-color: #205b93;
        outline: none;
      }
      &:hover, :focus {
        background-color: #e9f0f6;
      }
    }
  }
</style>
