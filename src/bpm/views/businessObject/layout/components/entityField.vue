<template>
  <el-form ref="entityField" :model="entityField">
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="80px" label="字段名:">
          <el-input v-model="entityField.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="80px" label="属性名:">
          <el-input v-model="entityField.propertyName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="80px" label="备注名:">
          <el-input v-model="entityField.remarkName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="80px" label="数据类型:">
          <el-select  style="width:100%" v-model="entityField.dataType" placeholder="请选择">
            <el-option
              v-for="item in entityField.dataTypeArray"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label-width="80px" label="属性长度:">
          <el-input v-model="entityField.propertyLength"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label-width="80px" label="字段校验:">
          <el-select multiple style="width:100%" v-model="entityField.fieldCheck" placeholder="请选择">
            <el-option
              v-for="item in entityField.fieldCheckArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="80px" label="字段控件:">
          <el-select style="width:100%" v-model="entityField.widget" placeholder="请选择">
            <el-option
              v-for="item in entityField.widgetArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  const DATA_TYPE = ["date","int"];
  const FIELD_VALIDATION_COLLECTION = [{
    label:'必填',
    value:'requiredField'
  },{
    label:'手机号',
    value:'phoneNum'
  },{
    label:'数字',
    value:'digital'
  }]
  const WIDGET_COLLECTION = [
    {
      label:'下拉框',
      value:'select'
    }
  ]
  export default {
    name: "entityField",
    data() {
      return {
        entityField:{
          name:"", //字段名
          propertyName:"", //属性名
          remarkName:"", //备注名
          dataTypeArray:DATA_TYPE, //数据类型
          dataType:"", //数据类型
          propertyLength:50, //属性茶长度
          fieldCheckArray:FIELD_VALIDATION_COLLECTION,//
          fieldCheck:"",//字段校验
          widgetArray:WIDGET_COLLECTION, //下拉框
          widget:"" //下拉框
        }
      }
    }
  }
</script>

<style scoped>

</style>
