<template>
  <el-col :span="span" :offset="offset">
    <el-button @click="openDialog" :type="type" :class="buttonClass" plain>
      <svg-icon :icon-class="icon" />
      {{buttonName}}</el-button>

    <el-dialog top="5vh" title="页面构建配置" :visible.sync="dialogFormVisible" width="600px">
      <el-form status-icon :rules="rules" :model="form" ref="form" :label-position="labelPosition"
        :label-width="formLabelWidth" size="mini">

        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="选择字段" prop="field">
          <el-select v-model="form.field" placeholder="选择字段">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="label对齐方式" prop="align">
          <el-radio-group v-model="form.align">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">中对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="label宽（百分比）" prop="labelWidth">
          <el-input type="number" v-model.number="form.labelWidth" placeholder="请输入宽度"></el-input>
        </el-form-item>

        <el-form-item label="字体颜色">
          <el-color-picker popper-class="theme-picker-dropdown" :predefine="predefineColors" v-model="form.color">
          </el-color-picker>
        </el-form-item>

        <el-form-item label="label背景色">
          <el-color-picker popper-class="theme-picker-dropdown dropdownLabelColors" class="predefineLabelColors"
            :predefine="predefineLabelColors" v-model="form.label">
          </el-color-picker>
        </el-form-item>

        <el-form-item label="表格线颜色">
          <el-color-picker popper-class="theme-picker-dropdown" :predefine="predefineBorderColors"
            v-model="form.border"></el-color-picker>
        </el-form-item>

        <el-form-item label="表格列" prop="col">
          <el-radio-group v-model="form.col">
            <el-radio border label="2">两列</el-radio>
            <el-radio border label="4">四列</el-radio>
            <el-radio border label="6">六列</el-radio>
            <el-radio border label="8">八列</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buildSubTab">确 定</el-button>
      </div>
    </el-dialog>

  </el-col>
</template>

<script>
  import {
    createEditorComponent
  } from '@/bpm/views/page/tinymce/editorUtils'

  export default {
    name: 'build-page',
    props: ["span", "offset", "buttonClass", "buttonName", "icon", "type"],

    data() {

      return {
        options: [{
          value: '1',
          label: '所有字段'
        }, {
          value: '2',
          label: '未使用字段'
        }],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        labelPosition: 'right',
        form: {
          field: "",
          title: "",
          color: "#7a7a83",
          label: "#f7f7f7",
          border: "#e5e5e5",
          align: "",
          labelWidth: 10,
          col: ""
        },
        predefineColors: [
          '#7a7a83',
          '#e74c3c'
        ],
        predefineLabelColors: [
          '#f7f7f7',
          '#ffffff'
        ],
        predefineBorderColors: [
          '#e5e5e5',
          '#e74c3c'
        ],
        rules: {
          field: [{
            required: true,
            message: '请选择字段类型',
            trigger: 'blur'
          }],
          align: [{
            required: true,
            message: '请选择对齐方式',
            trigger: 'blur'
          }],
          labelWidth: [{
              required: true,
              message: '请设置labe宽度',
              trigger: 'blur'
            },
            {
              type: 'number',
              min: 1,
              max: 50,
              message: '宽度设置在1到50之间',
              trigger: 'blur'
            }
          ],
          color: [{
            required: true,
            message: '请选择字体颜色',
            trigger: 'blur'
          }],
          label: [{
            required: true,
            message: '请选择label颜色',
            trigger: 'blur'
          }],
          border: [{
            required: true,
            message: '请选择border颜色',
            trigger: 'blur'
          }],
          col: [{
            required: true,
            message: '请选择表格列',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      //默认配置
      openDialog() {
        this.form.field = "1";
        this.form.title = "";
        this.form.color = "#7a7a83";
        this.form.label = "#f7f7f7";
        this.form.border = "#e5e5e5";
        this.form.col = "4";
        this.form.align = "center";
        this.form.labelWidth = 10;
        this.dialogFormVisible = true;
      },
      buildSubTab() {

        this.$refs["form"].validate((valid) => {

          if (valid) {

            this.dialogFormVisible = false;
            //编辑器
            var editor = window.tinymce.activeEditor;
            //编辑器的dom，相当于html的dom
            var dom = editor.dom;
            //选择器
            var selection = editor.selection;

            if (this.form.title != "") {
              var gw = dom.create("h1");
              gw.setAttribute("style", "text-align: center;");
              gw.innerHTML = '<span style="color: ' + this.form.color + ';">' + this.form.title + '</span>';
              selection.setNode(gw);
            }

            //table
            var table = dom.create("table");
            table.setAttribute("style",
              "border-collapse: collapse; width: 100%; background-color: #ffffff; border: 1px solid " + this.form
              .border + ";");
            table.setAttribute("border", 1);

            //如果是全部字段要删除页面已有字段
            if (this.form.field == "1") {
              for (var val in this.$store.state.component.editorColumn) {
                var node = this.$store.state.component.editorColumn[val];
                if (node != null && node != "") {
                  node.parentNode.removeChild(node);
                }
              }
            }

            //循环生成表格
            var that = this;
            //设置一个延时
            setTimeout(function () {

              const col = that.form.col;
              var i = col;

              var html = "";
              var labelWidth = that.form.labelWidth;

              for (var val in that.$store.state.component.businessColumn) {
                var node = that.$store.state.component.businessColumn[val];
                if (node != null && node != "" && node.relationType == "main") {

                  //如果不是构建全部字段
                  if (that.form.field == "2") {
                    if (that.$store.state.component.editorColumn[val] != null) {
                      continue
                    }
                  }

                  if (i % col == 0) {
                    html += "<tr>"
                  }

                  //左侧label标题
                  //只需要再第一行设置宽度 后续调整也只需要调整第一行的宽度即可
                  var width = "";
                  if (parseInt(i / col) == 1) {
                    width = "width: " + labelWidth + "%;";
                  }
                  html +=
                    '<td style="' + width + ' text-align: ' + that.form.align +
                    '; padding: 10px; border-style: solid; border-color: ' +
                    that.form.border + '; background-color: ' + that.form.label +
                    ';"><strong><span style="color: ' + that.form.color + ';">' + node.comment +
                    '</span></strong></td>';
                  i++;

                  //右侧表单项
                  //创建组件
                  var dom = createEditorComponent(that, val);
                  width = "";
                  if (parseInt(i / col) == 1) {
                    width = "width: " + (100 - col / 2 * labelWidth) / (col / 2) + "%;";
                  }
                  html +=
                    '<td style="' + width +
                    ' text-align: left; padding: 10px; border-style: solid; border-color: ' +
                    that.form.border + ';">' + dom.outerHTML + '</td>';
                  i++;

                  if (i % col == 0) {
                    html += "</tr>"
                  }

                }
              }

              //没有关闭
              if (i % col != 0) {
                //补全colspan
                html +=
                  '<td colspan="' + (col - (i % col)) +
                  '" style="padding: 10px; border-style: solid; border-color: ' +
                  that.form.border + ';">&nbsp;</td>';
                html += "</tr>"
              }

              table.innerHTML = '<tbody>' + html + '</tbody>';
              selection.setNode(table);

            }, 500);
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .predefineLabelColors {
    .el-icon-arrow-down {
      color: #333333
    }
  }

  .dropdownLabelColors {
    background-color: #eee;
  }
</style>

<style lang="scss" scoped>
  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>