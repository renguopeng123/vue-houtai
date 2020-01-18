<template>
  <div class="model-app-main">
    <div class="paper-btn-panel">
      <el-tag title="新增对象"
              type="success"
              class="el-icon-plus icon-font-size-15"
              @click="createObjDlgVisible=true">
      </el-tag>
      <el-tag title="保存" type="success" class="margin-left-10 icon-font-size-15">
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
      <el-tag effect="plain" title="JSON编码" class="icon-font-size-15">
        <svg-icon icon-class="encoding" />
      </el-tag>
      <el-tag effect="plain" type="danger" @click="deleteObject" title="删除对象" class="margin-left-10 icon-font-size-15">
        <i class="el-icon-delete"/>
      </el-tag>
      <el-tag effect="plain" style="margin-left:auto; font-size:14px;">
        <svg-icon icon-class="formNew" class="el-button--text" />
        <span>创建表单</span>
      </el-tag>
    </div>
    <div class="paper-and-property">
      <div id="modelPaper"></div>
      <right-panel :is-display-data-source-tab="false"></right-panel>
    </div>
    <create-object-dlg :entities-tree="entitiesTree" :isOpenDlg.sync="createObjDlgVisible" @confirmSuccess="successHandler"></create-object-dlg>
  </div>
</template>

<script>
  import * as joint from "jointjs";
  import RightPanel from "./RightPanel";
  import draggable from "vuedraggable";
  import CreateObjectDlg from "../../../common/business/create-obj-dlg";
  import {busObjEventBus} from "../../main";
  import {deleteObjectById, getAllEntities, getEntitiesDetailInfo, getTreeNodesFromSvr} from "../../../../api/model";
  import {getURIParam, parseFlatArrayToTree} from "../../../common/business/commonUtil";

  export default {
    name: 'app-main',
    components: {CreateObjectDlg, RightPanel,draggable},
    data() {
      return {
        entitiesTree:[],
        currentTreeNode: {
          id: "",
          key: "",
          name: ""
        },
        createObjDlgVisible:false,
        loading:false,
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
          }
        ],
        entityForm:{
          classify:"报销申请",
          dataPersistenceType:"本地数据源",
          name:false,
          description:"报销申请明细表",
          description:"reimburseDetailItem",
          tableName:"biz_reimburse_detail"
        },
        graph: null,
        paper: null,

        //选择的业务实体
        selectedEntities:[{
          name:"orders"
        },{
          name:"products"
        },{
          name:"countries"
        }],

      }
    },
    mounted() {
      this.initializePaper();
      busObjEventBus.$on('busObjTreeNodeClick', (node)=> {
        this.currentTreeNode.id = node.id;
        this.currentTreeNode.key = node.key;
        this.currentTreeNode.name = node.name;
        this.graph.clear();

        //界面恢复的时已经保存的，还可能有未保存位置的；
        //TODO 临时注销，暂不支持保存位置；
        // if (node && node.diagramJson) {
        //   this.graph.fromJSON(JSON.parse(node.diagramJson));
        // }

        //TODO 暂时只支持单表；不遍历子表
        if (node && node.relation && node.relation.tableKey) {
          this.getEntitiesDetailInfoByKey({key:node.relation.tableKey});
        }
      });
      //获取所有的业务实体简明信息及其分类（业务对象页面创建对象时需要选择主/子业务实体）
      this.getAllEntities();
    },
    methods: {
      successHandler() {
        //关闭对话框，并通刷新左树
        this.createObjDlgVisible = false;
        this.clearPaper();
        busObjEventBus.$emit("refreshTree");
      },
      buildTree(res) {
        let data = [];
        data = res[0].filter(item => {
          return item.name != "ROOT_NODE";
        });
        let temp = res[1];
        if (temp.code == 200 && temp.isOk) {
          data = data.concat(temp.rows);
        }
        return parseFlatArrayToTree(data);
      },
      getAllEntities() {
        let data = {
          treeKey:"ywbfl",  //需要负责系统配置的tx保证不能修改；
          rootName: "ROOT_NODE" //前端传什么，树的root节点显示什么；
        }
        let param = {limit: 9999, offset: 0}; //TODO 硬编码成9999貌似不太好。
        Promise.all([getTreeNodesFromSvr(data), getAllEntities(param)]).then(res => {
          this.entitiesTree = this.buildTree(res);
        });
      },
      deleteObject() {
        if ("" == this.currentTreeNode.id) {
          this.$message({
            message: '请在左侧选择树上指定对象',
            type: 'warning'
          })
          return;
        }
        this.$confirm(`确认删除对象${this.currentTreeNode.name}吗`)
          .then(_ => {
            deleteObjectById({id:this.currentTreeNode.id}).then((res) =>{
              if (200 == res.code) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.clearPaper();
                //刷新左树
                busObjEventBus.$emit("refreshTree");
              }
            })
          });
      },
      clearPaper() {
        this.graph.clear();
        this.currentTreeNode.name = "";
        this.currentTreeNode.id = "";
        this.currentTreeNode.key = "";
      },

      //根据实体key获取对应的实体字段详情，用于页面展示；
      getEntitiesDetailInfoByKey(input) {
        let param = {
          key: input.key,
          fill: 1
        };
        getEntitiesDetailInfo(param).then(res => {
          if (res.code == 200 && res.data) {
            let name = res.data.key;
            let fields = res.data.columns.map(item => {
              return {
                id: item.key,
                text_left: item.key,
                text_right: item.type
              }
            });
            this.createNewEntityOnPaper(name, fields);
          }
        })
      },
      createNewEntityOnPaper(entityName, fields) {
        let element = new joint.shapes.gwssi.customRec({
          //TODO 将来需要支持新增的实体自动排序；
          position: { x: 300, y: 100 },
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
            // '.checkbox-simulation': {
            //   cursor: 'pointer',
            //   event: 'element:checkboxClick',
            //   refX: '7%',
            //   fill: 'white',
            //   height: 15,
            //   width: 15,
            //   refY: 15,
            // },
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
              magnet: true,
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
              refX: 10,
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
            '<g class="options"></g>',
          optionMarkup: '<g class="option"><rect class="option-rect"/>' +
            '<text class="option-text-left"/><text class="option-text-right"/></g>',

          initialize: function () {

            joint.dia.Element.prototype.initialize.apply(this, arguments);
            this.on('change:options', this.onChangeOptions, this);
            this.on('change:question', function () {
              this.attr('.question-text/text', this.get('question') || '');
              this.autoresize();
            }, this);

            this.on('change:questionHeight', function () {
              this.attr('.options/refY', this.get('questionHeight'), {silent: true});
              this.autoresize();
            }, this);

            this.on('change:optionHeight', this.autoresize, this);

            this.attr('.options/refY', this.get('questionHeight'), {silent: true});
            this.attr('.question-text/text', this.get('question'), {silent: true});

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
            var width = joint.util.measureText(this.get('question'), {
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

        //删除箭头的图标hover时显示。
        this.paper.on('link:mouseenter', function(linkView){
          let tools = [
            new joint.linkTools.Remove({ distance: 20 })
          ];
          linkView.addTools(new joint.dia.ToolsView({
            name: 'onhover',
            tools: tools
          }));
        });
        this.paper.on('link:mouseleave', function(linkView) {
          if (!linkView.hasTools('onhover')) return;
          linkView.removeTools();
        });

        //手动连线；
        let that = this;
        this.paper.on({
          'link:pointerup': function(elementView, evt, x, y) {

            let element = elementView.model;
            let sourceE = elementView.model.getSourceElement();
            let targetE = elementView.model.getTargetElement();

            //如果是在已有连线上点击，不需要删除这条连线；
            var coordinates = new joint.g.Point(x, y);
            let isDragLine = this.model.findModelsFromPoint(coordinates).find(item =>{
              return targetE && item.id == targetE.id;
            })

            if (isDragLine) {
              //先把这个临时连线删除；临时连线只是为了找源和目标节点；
              element.remove();

              //然后看看这两个节点是否已经有连线了。有连线了就不用程序重新连接了;没有连线就从新用程序连接；
              if (targetE
                && that.graph.getNeighbors(targetE).indexOf(sourceE) === -1
                && targetE.id != sourceE.id) {
                // Create a connection between elements.
                let link = new joint.shapes.standard.Link();
                link.source(sourceE);
                link.target(targetE);
                link.addTo(that.graph);

                // Add remove button to the link.
                let tools = new joint.dia.ToolsView({
                  tools: new joint.linkTools.Remove({ distance: 20 })
                });
                link.findView(this).addTools(tools);
              }
            }
          }
        });

        //自定义业务实体；
        this.defBusinessEntity();
        let uriParam = getURIParam();
        if (uriParam != "") {
          this.currentTreeNode.id = uriParam.id;
          this.currentTreeNode.key = uriParam.key;
          this.getEntitiesDetailInfoByKey(uriParam);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";
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
        border-color:#3a8ee6;
      }
      &:hover {
        background: #fff;
        border-color: #409eff;
      }
    }
  }
</style>
