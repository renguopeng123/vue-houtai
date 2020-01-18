<template>
  <el-dialog
    title="新建对象"
    :visible.sync="dlgVisible"
    width="40%"
    :before-close="handleCloseDlg">
    <el-form ref="formInline" :rules="ObjCreateFormRules" :model="formInline" class="create-obj-style">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="分类:" label-width="90px" prop="classify">
            <el-cascader
              :show-all-levels="false"
              :props="{value:'key', label:'name'}"
              clearable
              v-model="formInline.classify"
              :options="objectCategory"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="持久化:" label-width="90px" prop="persistenceType">
            <el-select v-model="formInline.persistenceType" placeholder="请选择">
              <el-option
                v-for="item in persistenceOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="名字:" label-width="90px" prop="name">
            <el-input v-model="formInline.name" class="input-width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="对象名:" label-width="90px" prop="objectName">
            <el-input v-model="formInline.objectName" class="input-width"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="实体(主):" label-width="90px" prop="primaryEntityModel">
          <el-cascader
            v-model="formInline.primaryEntityModel"
            :show-all-levels="false"
            :props="{value:'key',label:'key'}"
            clearable
            :options="entitiesTree"></el-cascader>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item class="child-entity-content" label="实体(子):" label-width="90px" prop="childEntitiesModel">
          <el-cascader
            v-model="formInline.childEntitiesModel"
            :show-all-levels="false"
            :props="{value:'key',label:'key',multiple: true}"
            clearable
            :options="entitiesTree"></el-cascader>
        </el-form-item>
      </el-row>
      <el-form-item label="描述:" label-width="90px" prop="description">
        <el-input type="textarea" v-model="formInline.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dlgVisible = false">取 消</el-button>
    <el-button type="primary"  @click="confirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {getTreeNodesFromSvr, saveObjectInfo} from "@/bpm/api/model";
  import {parseFlatArrayToTree, getNodeByKeys, PERSISTENCE_OPTS, buildObject} from "./commonUtil";
  import {buildEntityModelByKeyCollection} from "../../model/layout/src/util";
  export default {
    name: "createObjectDlg",
    props:{
      isOpenDlg:{
        type:Boolean,
        default:false
      },
      entitiesTree:Array,
      createObjDlgParams:Object,
    },
    data() {
      return {
        ObjCreateFormRules:{
          classify:[
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          persistenceType:[
            { required: true, message: '请选择持久化方式', trigger: 'change' },
          ],
          name:[
            { required: true, message: '请填写名字', trigger: 'blur' },
          ],
          objectName:[
            { required: true, message: '请填写对象名', trigger: 'blur' },
          ],
          primaryEntityModel:[
            { required: true, message: '请选择主实体', trigger: 'change' },
          ],
          childEntitiesModel:[
            { required: false, message: '请选择子实体', trigger: 'change' }, //允许只选择一个主实体
          ],
        },
        objectCategory:[],
        formInline: {
          classify: [],
          persistenceType: PERSISTENCE_OPTS[0].value,
          name:"",
          objectName:"",
          description:"",
          primaryEntityModel:[],
          childEntitiesModel:[]
        },
        persistenceOpts:PERSISTENCE_OPTS
      }
    },
    created(){
      this.getObjectCategoryTree();
    },
    methods:{
      confirm() {
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.$confirm('确定提交吗？')
              .then(_ => {
                let element = getNodeByKeys(this.objectCategory, this.formInline.classify);
                let data = {
                  persistenceType: this.formInline.persistenceType,
                  groupName: element.name,
                  groupId: element.id,
                  name: this.formInline.name,
                  key: this.formInline.objectName,
                  tableKey: this.primaryEntity
                };
                let result = buildObject(data);
                saveObjectInfo(result).then(res => {
                  if (res && res.code == 200 && res.isOk) {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                    //通知父节点业务跳转并关闭对话框；
                    this.$emit("confirmSuccess", {key:this.primaryEntity, id:res.data});
                  } else if (res && res.code == 401) {
                    //登陆超时。
                    this.$message({
                      message: res.msg,
                      type: "warning"
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                });
              });
          };
        });
      },
      getObjectCategoryTree() {
        let data = {
          treeKey: "ywdxfl",  //需要负责系统配置的tx保证不能修改；
          rootName: "ROOT_NODE" //前端传什么，树的root节点显示什么；
        }
        getTreeNodesFromSvr(data).then(res => {
          let data = res.filter(item => {
            return item.name != "ROOT_NODE";
          })
          this.objectCategory = parseFlatArrayToTree(data)
        });
      },
      handleCloseDlg(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    computed:{
      primaryEntity() {
        let temp = this.formInline.primaryEntityModel;
        return temp[temp.length - 1];
      },
      dlgVisible: {
        get() {
          return this.isOpenDlg;
        },
        set(value) {
          this.$emit('update:isOpenDlg',value);
        }
      }
    },
    watch:{
      createObjDlgParams(newValue) {
        console.log(newValue);
        let modelArray = [];
        newValue.entitiesCollection.forEach(item => {
          modelArray.push(item.name);
        })
        let result = buildEntityModelByKeyCollection(this.entitiesTree, modelArray);
        let pk = newValue.primaryKey;
        if (result[pk]) {
          this.formInline.primaryEntityModel = result[pk];
        }
        this.formInline.childEntitiesModel = [];
        modelArray.forEach(item => {
          if (item !== pk) {
            this.formInline.childEntitiesModel.push(result[item]);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .create-obj-style {
    width: 100%;
    /deep/ label {
      font-weight: normal;
      color: #909399;
    }
  }
  .el-cascader {
    width:100%;
  }
  .el-select {
    width:100%;
  }
</style>
