<template>

  <el-form :id="formID" class="model-components-form" size="mini">
    <div :key="tab.key" v-for="tab in biz_obj">

      <span class="components-title">{{tab.name}}</span>

      <!--使用businessColumn能生效 column不能保证数据驱动？-->
      <el-form-item :key="column.id" v-for="column in tab.columns">
        <!-- 排除主键 -->
        <div v-if="column.primary==false">
          <el-col :span="9">
            <el-button :type="generateType(column.id)" @click="columnClick(column.id)"
              :plain="generatePlain(column.id)">
              {{ column.comment }}</el-button>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">

            <el-tag v-show="!businessColumn[column.id].editable" class="components-tag" size="medium"
              :effect="generateEffect(column.id)" :disable-transitions="true">
              <svg-icon :icon-class="column_type_icon[businessColumn[column.id].ctrl.type]" />
              <span>{{ column_type[businessColumn[column.id].ctrl.type] }}</span>
            </el-tag>

            <el-select v-show="businessColumn[column.id].editable" @visible-change="visibleChange($event,column.id)"
              @blur="selectBlur($event,column.id)" @change="selectChange($event,column.id)"
              v-model="businessColumn[column.id].ctrl.type" placeholder="请选择组件">
              <el-option v-for="item in columnOptions(column.type)" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-col>

          <el-col class="components-edit" :span="3">
            <el-link :title="generateTitle(column.comment)" :underline="false" icon="el-icon-edit"
              :disabled="businessColumn[column.id].used" @click="changeComponent(column.id)"></el-link>
          </el-col>
        </div>

        <div v-else>
          <el-col :span="9">
            <el-button :type="generateType(column.id)" @click="columnClick(column.id)"
              :plain="generatePlain(column.id)">
              {{ column.comment }}</el-button>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-tag class="components-tag" size="medium" effect="dark">
              <svg-icon :icon-class="column_type_icon.hidden" />
              <span>{{column_type.hidden}}</span>
            </el-tag>
          </el-col>
        </div>
      </el-form-item>
    </div>

  </el-form>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {
    attr_id,
    column_type,
    column_type_icon,
    column_clob_type,
    column_date_type,
    column_varchar_type,
    column_number_type,
    default_hidden_ctrl,
    default_onetext_ctrl,
    default_multitext_ctrl,
    default_select_ctrl,
    default_checkbox_ctrl,
    default_radio_ctrl,
    default_dic_ctrl,
    default_serialno_ctrl,
    default_file_ctrl,
    default_date_ctrl
  } from '@/bpm/views/page/global'

  import {
    deepClone
  } from '@/utils'


  import {
    addEditorComponent
  } from '@/bpm/views/page/tinymce/editorUtils'

  export default {
    name: 'components-tree',
    props: ["biz_obj", "formID"],

    data() {
      return {
        "column_type": column_type,
        "column_type_icon": column_type_icon
      }
    },

    computed: {
      ...mapGetters([
        'businessColumn',
        'activeComponent'
      ])
    },

    methods: {

      columnOptions(type) {

        // console.log("下拉列表类型" + type);

        var columnType = column_varchar_type;

        if (type == "clob") {
          columnType = column_clob_type;
        }
        if (type == "date") {
          columnType = column_date_type;
        }
        if (type == "number") {
          columnType = column_number_type;
        }

        var options = [];

        for (const _type of columnType) {
          options.push({
            value: _type,
            label: column_type[_type]
          });
        }

        return options;
      },

      selectBlur(val, columnID) {
        this.$store.dispatch('component/setColumnEditable', {
          "id": columnID,
          "editable": false
        });
      },

      selectChange(val, columnID) {
        //只有change事件才重置默认配置
        this.$store.dispatch('component/setColumnEditable', {
          "id": columnID,
          "editable": false
        });


        var data = {};

        if (val == "hidden") {
          data = default_hidden_ctrl;
        }
        if (val == "onetext") {
          data = default_onetext_ctrl;
        }
        if (val == "multitext") {
          data = default_multitext_ctrl;
        }
        if (val == "select") {
          data = default_select_ctrl;
        }
        if (val == "checkbox") {
          data = default_checkbox_ctrl;
        }
        if (val == "radio") {
          data = default_radio_ctrl;
        }
        if (val == "dic") {
          data = default_dic_ctrl;
        }
        if (val == "serialno") {
          data = default_serialno_ctrl;
        }
        if (val == "file") {
          data = default_file_ctrl;
        }
        if (val == "date") {
          data = default_date_ctrl;
        }

        //拷贝一份默认配置之后在赋到store对应的对象中,防止冲突
        if (data) {
          var _data = deepClone(data);
          //校验规则不能改
          _data.validRule = this.$store.state.component.businessColumn[columnID].ctrl.validRule;
          //版本
          _data.version = this.$store.state.component.businessColumn[columnID].ctrl.version;
          this.$store.dispatch('component/setColumnCtrl', {
            "id": columnID,
            "ctrl": deepClone(_data)
          });
        }

      },

      visibleChange(val, columnID) {
        // console.log(val)// 展开true || 收起false
        if (!val) {
          this.$store.dispatch('component/setColumnEditable', {
            "id": columnID,
            "editable": false
          });
        }
      },

      changeComponent(columnID) {
        this.$store.dispatch('component/setColumnEditable', {
          "id": columnID,
          "editable": true
        });
      },

      generatePlain(id) {
        if (this.activeComponent == id) {
          return false
        } else {
          return true
        }
      },

      generateTitle(column) {
        return "编辑 \"" + column + "\" 的组件类型";
      },

      generateType(id) {

        if (!this.businessColumn[id].used) {
          return "primary";
        } else {
          return "info";
        }

      },

      generateEffect(columnID) {
        if (this.$store.state.component.businessColumn[columnID].ctrl.type == null || this.$store.state.component
          .businessColumn[columnID].ctrl.type == "") {
          return "plain"
        } else {
          return "dark"
        }
      },

      columnClick(columnID) {
        try {

          if (this.$store.state.component.editorColumn[columnID] != null) {
            // this.$message({
            //   message: '当前组件已经添加过。',
            //   type: 'warning'
            // })
            //当前组件已经添加过， 定位到编辑器的组件处。直接获取焦点即可。

            //激活当前组件
            this.setActiveComponent(columnID);
            return;
          }

          var column = this.$store.state.component.businessColumn[columnID];
          if (column.editable) {
            this.$message({
              message: '编辑状态无法添加组件，请选择组件后添加。',
              type: 'warning'
            })
            return;
          }

          if (column.ctrl == null || column.ctrl.type == null || column.ctrl.type == "") {
            this.$message({
              message: '当前字段未选择组件对象，请先选择组件。',
              type: 'warning'
            })
            return;
          }

          addEditorComponent(this, columnID);

          //这里需要有延迟 否则焦点获取不了(编辑器的事件造成的？)
          var _this = this;
          setTimeout(function () {
            _this.setActiveComponent(columnID);
          }, 100);

        } catch (e) {
          this.$message({
            message: '操作组件失败' + e,
            type: 'error'
          })
        }
      },
      setActiveComponent(columnID) {
        //激活当前组件
        var gwNode = window.tinymce.activeEditor.dom.getRoot().querySelectorAll("[" + attr_id + "='" + columnID +
          "']");

        if (gwNode.length > 0) {
          //必须使用selection触发事件才行
          var node = tinymce.activeEditor.selection.select(tinymce.activeEditor.dom.select("[" + attr_id + "='" +
            columnID + "']")[0]);
          node.click();
          node.focus();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .model-components-form {

    .components-title {
      display: block;
      font-size: 12px;
      margin-bottom: 5px;
    }

    .el-button--mini {
      padding: 7px;
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .line {
      text-align: center;
    }

    .components-edit {
      text-align: center;
      cursor: pointer
    }

    .components-tag {
      width: 100%;

      span {
        cursor: default;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
      }
    }

    .el-form-item--mini.el-form-item {
      margin-bottom: 10px;
    }

    .el-tag {
      padding: 0 7px;

      .svg-icon {
        margin-right: 5px;
      }
    }
  }
</style>