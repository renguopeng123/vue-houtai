<template>
  <el-form ref="entityField" :rules="formRules" :model="entityField">
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="85px" label="字段名:" prop="name">
          <el-input v-model="entityField.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="85px" label="属性名:" prop="propertyName">
          <el-input v-model="entityField.propertyName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="85px" label="备注名:" prop="remarkName">
          <el-input v-model="entityField.remarkName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="85px" label="数据类型:">
          <el-select @change="dataTypeChange" style="width:100%" v-model="entityField.dataType" placeholder="请选择">
            <el-option
              v-for="item in dataTypeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label-width="85px" label="属性长度:">
          <el-input v-if="isAttrLengthVisible" v-model="entityField.propertyLength"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label-width="85px" label="字段校验:" prop="fieldCheck">
          <el-select multiple style="width:100%" v-model="entityField.fieldCheck" placeholder="请选择">
            <el-option
              v-for="item in fieldCheckArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label-width="85px" label="字段控件:" prop="widget">
          <el-select style="width:100%" v-model="entityField.widget" placeholder="请选择">
            <el-option
              v-for="item in fieldWidgetCollection"
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
  import {FIELD_CHECK, FIELD_DATA_TYPE, FIELD_DATA_TYPE_INDEX, FIELD_INFO_TEMPLATE} from "../src/const";
  const DATA_TYPE = FIELD_DATA_TYPE;
  export default {
    name: "entityField",
    props:{
      detailAttr:Object
    },
    data() {
      return {
        entityField:{...FIELD_INFO_TEMPLATE},
        dataTypeArray:DATA_TYPE, //数据类型
        fieldCheckArray:FIELD_CHECK,
        widgetArray:DATA_TYPE, //字段控件
        widgetArrayIndex:FIELD_DATA_TYPE_INDEX,
        formRules:{
          name:[
            { required: true, message: '请输入字段名', trigger: 'blur' },
          ],
          propertyName:[
            { required: true, message: '请输入属性名', trigger: 'blur' },
          ],
          remarkName:[
            { required: true, message: '请输入备注名', trigger: 'blur' },
          ],
          fieldCheck:[
            { required: false, message: '请选择字段校验', trigger: 'blur' },
          ],
          widget:[
            { required: false, message: '请选择字段控件', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {
      isAttrLengthVisible() {
        if (this.entityField.dataType != "") {
          let index = this.widgetArrayIndex[this.entityField.dataType];
          return this.widgetArray[index].isHaveLength;
        }
        return false;
      },
      fieldWidgetCollection() {
        if (this.entityField.dataType != "") {
          let index = this.widgetArrayIndex[this.entityField.dataType];
          return this.widgetArray[index].fieldWidget;
        }
        return [];
      }
    },
    watch:{
      detailAttr: {
        deep:true,
        handler(newValue) {
          this.entityField = {...newValue};
        }
      }
    },
    methods:{
      dataTypeChange(value) {
        this.entityField.widget = "";
      },
      resetForm() {
        this.$refs["entityField"].resetFields();
      },
      formSummit() {
        this.$refs["entityField"].validate((valid) => {
          if (valid) {
            //有效性校验通过后，所有的字段都带出来发送给父亲保存；
            let index = this.widgetArrayIndex[this.entityField.dataType];
            this.$emit("summit", Object.assign({}, this.entityField, {dataTypeLabel:this.widgetArray[index].label}));
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
