<template>
  <el-col :span="span" :offset="offset">
    <el-button @click="openDialog" :type="type" :class="buttonClass" plain>
      <svg-icon :icon-class="icon" />
      {{buttonName}}</el-button>

    <el-dialog title="配置子表类型" :visible.sync="dialogFormVisible" width="500px">
      <el-form status-icon :rules="rules" :model="form" ref="form" :label-position="labelPosition" :label-width="formLabelWidth"
        size="mini">
        <el-form-item label="选择子表" prop="table">
          <el-select v-model="form.table" placeholder="选择子表">
            <el-option v-for="item in biz_sub" :key="item.id" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="子表类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio border label="表格类子表">表格类子表</el-radio>
            <el-radio border label="表单类子表">表单类子表</el-radio>
          </el-radio-group>
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
    gw_text,
    gw_sub_tab,
    attr_sub_type,
    attr_sub_col
  } from '@/bpm/views/page/global'


  export default {
    name: 'sub-table',
    props: ["span", "offset", "buttonClass", "buttonName", "icon", "type" , "biz_sub"],
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '80px',
        labelPosition: 'right',
        form: {
          table: "",
          type: "",
          col: ""
        },
        rules: {
          table: [{
            required: true,
            message: '请选择子表',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择子表类型',
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
      openDialog() {
        this.form.table = "";
        this.form.type = "";
        this.form.col = "";
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

            var gw = dom.create(gw_sub_tab);
            gw.setAttribute(attr_sub_type, this.form.type);
            gw.setAttribute(attr_sub_col, this.form.col);
            gw.innerHTML = '<' + gw_text + '>' + "表格类子表(四行)" + " </" + gw_text + ">" + "<div>" +
              '<div class="ibox-title"><span class="title">刘凯测试子表误删误修改</span><ab-sub-add href="javascript:void(0)" class="btn btn-primary btn-sm fa fa-plus" v-model="data.lkcswscxg.lkcszbwswxgList" v-bind:init-data="initData.lkcswscxg.lkcszbwswxg" v-ab-permission:edit="tablePermission.lkcswscxg.lkcszbwswxg">添加</ab-sub-add>		</div>		<ab-sub-scope v-slot="scope" :permissiona="permission" :table-permissiona="tablePermission" v-for="(lkcszbwswxg,index) in data.lkcswscxg.lkcszbwswxgList"> 		<ab-sub-del href="javascript:void(0);" v-model="data.lkcswscxg.lkcszbwswxgList" v-bind:index="index" class="btn btn-danger btn-xs fa fa-delete pull-right" v-ab-permission:edit="scope.tablePermission.lkcswscxg.lkcszbwswxg">移除</ab-sub-del>			<table class="form-table">				<tbody><tr class="firstRow">					<th>姓名</th>					<td><input type="text" class=" form-control" v-model="lkcszbwswxg.xm" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.xm" desc="刘凯测试子表误删误修改-姓名" v-ab-validate="{&quot;maxlength&quot;:50}"></td>					<th>年龄</th>					<td><input type="text" class=" form-control" v-model="lkcszbwswxg.nl" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.nl" desc="刘凯测试子表误删误修改-年龄" v-ab-validate="{&quot;maxlength&quot;:10}"></td>					<th>性别</th>					<td><ab-checkbox v-model="lkcszbwswxg.xb" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.xb" desc="刘凯测试子表误删误修改-性别" v-ab-validate="{&quot;maxlength&quot;:50}"><div slot-scope="checkboxScope"><label class=" checkbox-inline"><input type="checkbox" v-model="checkboxScope.tempData.currentValue" value="1" name="lkcswscxg-lkcszbwswxg-xb" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.xb">1</label></div></ab-checkbox></td>				</tr>				<tr>					<th>省</th>					<td><select class=" form-control" v-model="lkcszbwswxg.s" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.s" desc="刘凯测试子表误删误修改-省" v-ab-validate="{&quot;maxlength&quot;:50}"><option value="">请选择</option><option value="1">1</option></select></td>					<th>照片</th>					<td><ab-upload href="javascript:void(0)" class=" btn btn-primary fa-upload" v-model="lkcszbwswxg.zp" :ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.zp" desc="刘凯测试子表误删误修改-照片"></ab-upload><br></td>					<th>爱好</th>					<td><textarea type="text" class=" form-control" v-model="lkcszbwswxg.ah" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.ah" desc="刘凯测试子表误删误修改-爱好" v-ab-validate="{}"></textarea></td>				</tr>				<tr>					<th>外键</th>					<td colspan="5"><input type="text" class=" form-control" v-model="lkcszbwswxg.wj" v-ab-permission="scope.permission.lkcswscxg.lkcszbwswxg.wj" desc="刘凯测试子表误删误修改-外键" v-ab-validate="{&quot;maxlength&quot;:50}"></td>				</tr>			</tbody></table>			 		</ab-sub-scope>' +
              "</div>";
            selection.setNode(gw);

          }
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
</style>