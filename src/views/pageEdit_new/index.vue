<template>
  <div class="page-edit">
    <el-container style="height:100%">
      <el-aside width="393px" class="left">
        <div class="left_title">
          表单分类
        </div>
        <div class="left_mian_tree">
          <el-tree
            :key="tree.key"
            :data="tree.data"
            @node-click="fn_handleNodeClick"
            default-expand-all
            highlight-current
            :expand-on-click-node="false"
            accordion
            :props="tree.props"
            node-key="id"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <i class="treeLevel treeLevel1" v-if="node.level===1"></i>
              <i class="treeLevel treeLevel2" v-else-if="node.level===2"></i>
              <i class="treeLevel treeLevel3" v-else-if="node.level===3"></i>
              <i class="treeLevel treeLevel4" v-else></i>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main class="right">
        <div class="right_top">
          <div class="top_left">
            <el-input
              placeholder="请输入表单名称查询"
              suffix-icon="el-icon-search"
              v-model="list.search"
              @keyup.enter.native="fn_formDefListJson"
            >
            </el-input>
          </div>
          <div class="top_right">
            <el-button type="success" @click="fn_openDialog('新增')">
              <span>新增</span>
            </el-button>
            <!-- <el-button type="danger" plain>
              删除
            </el-button> -->
          </div>
        </div>
        <div class="right_main">
          <div class="box" v-for="(item,key) in list.data" :key="key">
            <div class="triangle">
              <div class="triangle_bg"></div>
              <div class="triangle_main">
                <i class="el-icon-circle-check" v-if="list.select.indexOf(item.id) > -1" style="font-weight: bold;"></i>
                <i class="el-icon-cloudy icon_normal" v-if="list.select.indexOf(item.id) === -1"></i>
                <!-- <i class="el-icon-thumb" v-if="list.select.indexOf(item.id) === -1"></i> -->
                <!-- <i class="el-icon-cloudy"></i> -->
              </div>
            </div>
            <div class="boxMain" @click="fn_boxClick(item)">
              <div class="boxMain_title" :title="item.name">
                <i class="el-icon-tickets box-icon1"></i>
                <span>{{item.name}}</span>
              </div>
              <div class="boxMain_name">
                <p>别名：</p>
                <p :title="item.key">{{item.key}}</p>
              </div>
              <div class="boxMain_description">
                <p>描述：</p>
                <p>{{item.desc}}</p>
              </div>
            </div>
            <div class="doed">
                <div class="doed_button doed1">
                  <i class="el-icon-edit-outline"></i>
                  <!-- <span>编辑</span> -->
                  <span><el-link :href="'/page.html?id='+item.id" target="_blank" type="primary" style="color:#fff;">编辑</el-link></span>
                </div>
                <div class="doed_button doed2">
                  <i class="el-icon-key"></i>
                  <span>权限</span>
                  <!-- <span><el-link :href="'/designer/bus/businessPermission/businessPermissionEdit.html?id='+item.id" target="_blank" type="primary" style="color:#fff;">权限</el-link></span> -->
                </div>
                <div class="doed_button doed3" @click="open_list_business(item)">
                  <i class="el-icon-notebook-2"></i>
                  <span>业务对象列表</span>
                </div>
                <div class="doed_button doed4"  @click="fn_pagedEitRemove(item.id)">
                  <i class="el-icon-delete"></i>
                  <span>删除</span>
                </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    
    <!-- 新增表单 -->
    <el-dialog
      :title="addForm.title+'表单'"
      :visible.sync="addForm.dialogVisible"
      :before-close="resetForm_add"
      class="addForm_dialog"
    >
      
      <div class="diaologMain">
        <el-form
          :model="addForm.form"
          :rules="addForm.rules"
          ref="addForm"
          label-width="120px"
          class="addForm"
        >
          <el-form-item label="分类：" prop="groupName">
            <el-select v-model="addForm.form.groupName" placeholder="请选择" style="width:500px;" @change='fn_groupNameChange'>
              <el-option
                v-for="item in addForm.groupName_list"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="addForm.form.name" style="width:500px;" @blur='fn_pinyin'></el-input>
          </el-form-item>
          <el-form-item label="别名：" prop="key">
            <el-input v-model="addForm.form.key" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="业务对象别名：" prop="boKey">
            <el-select v-model="addForm.form.boKey" placeholder="请选择" style="width:500px;" @change='fn_boKeyChange'>
              <el-option
                v-for="item in addForm.boKey_list"
                :key="item.key_"
                :label="item.key_"
                :value="item.key_">
                <span style="float: left">{{ item.key_ }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name_ }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务对象名称：" prop="boName">
            <el-input v-model="addForm.form.boName" disabled="" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="desc">
            <el-input type="textarea" v-model="addForm.form.desc" :rows="4"  style="width:500px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_add()">确 定</el-button>
        <el-button @click="resetForm_add()">取 消</el-button>
      </span>
    </el-dialog>
    
    <!-- 业务对象列表 -->
    <el-dialog
      :title="list_business.title"
      :visible.sync="list_business.dialogVisible"
      :before-close="close_list_business"
      class="list_business_dialog"
    >
      <div class="diaologMain" v-cloak>
        <tableComment v-bind:table_getdata.sync="list_business.table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">
          <!-- 头部左侧添加内容示例 -->
          <template  v-slot:top_left>
            <el-button type="primary">新增</el-button>
          </template>
          <!-- 列表操作示例-操作性别sex列 -->
          <template  v-slot:status="slotProps">
            <el-switch
              v-model="slotProps.row.status"
              active-text="禁用"
              inactive-text="启用"
              active-color="#ff4949"
              inactive-color="#13ce66"
              :active-value="0"
              :inactive-value="1"
            ></el-switch>
          </template>

          <!-- 列表操作示例-操作列添加删除按钮 -->
          <template  v-slot:doed="slotProps">
            <el-button type="text" style="color:#409eff">编辑</el-button>
            <span>|</span>
            <el-button type="text" style="color:#f56c6c">删除</el-button>
          </template>
        </tableComment>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary">确 定</el-button> -->
        <el-button @click="close_list_business">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getNodes,//业务表单获取表单分类树
    formDefListJson,//获取表单列表
    listData_busObjectSelect,//业务对象列表
    pinyin,//新建表单-用户别名
    saveFormDef,//新建提交
    pagedEitRemove,//表单删除
    pagedEitGetObject,//获取业务对象列表的列名
    pagedEitGetList,//获取业务对象列表的数据
  } from '@/bpm/api/page'
  import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
  export default {
    name: 'pageEdit_new',
    components:{
      tableComment
    },
    data() {
      var validateKey = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入别名"));
        } else {
          var reg = /^[a-zA-Z]\w{5,17}$/;
          if (!reg.test(value)) {
            callback(new Error("只能为字母开头,允许字母、数字和下划线"));
          } else {
            callback();
          }
        }
      };
      return {
        //树节点数据
        tree:{
          data: [
            {
              children: [
                {
                  children: [],
                  icon: "",
                  id: "11",
                  name: "填报表单",
                },
                {
                  children: [],
                  icon: "",
                  id: "12",
                  name: "审批表单",
                },
                {
                  children: [],
                  icon: "",
                  id: "13",
                  name: "移动端表单",
                }
              ],
              icon: "",
              id: "1",
              name: "全部表单 ",
            }
          ],
          key: 0,
          select_node: null,
          select_data: null,
          props: {
            children: "children",
            label: "name"
          },
        },
        // 列表数据
        list:{
          data:[
            /* {
              id:1,
              name:'SchoolStudentSchoolStudentSchoolStudentSchoolStudentSchoolStudent',
              key:'SchoolStudent_vueSchoolStudent_vueSchoolStudent_vueSchoolStudent_vueSchoolStudent_vueSchoolStudent_vueSchoolStudent_vue',
              desc:'学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生学校班级学生'
            }, */
          ],
          select:[],
          search:'',
        },
        
        // 新增编辑用户
        addForm: {
          dialogVisible: false,
          title: "",
          form: {
            groupName:'',
            groupId:'',
            name: "",
            key: "",
            boName: "",
            boKey: "",
            desc: "",
          },
          rules: {
            groupName: [
              { required: true, message: '请选择分类', trigger: 'change' }
            ],
            name: [
              {
                required: true,
                message: "请输入名称",
                trigger: ["blur", "change"]
              }
            ],
            key: [
              {
                required: true,
                validator: validateKey,
                trigger: ["blur", "change"]
              }
            ],
            boKey: [
              { required: true, message: '请选择业务对象别名', trigger: 'change' }
            ],
            boName: [
              {
                required: false,
                message: "请选择业务对象名称",
                trigger: ["blur", "change"]
              }
            ],
            description: [
              {
                required: false,
                message: "请填写描述",
                trigger: ["blur", "change"]
              }
            ]
          },
          groupName_list:[],
          boKey_list:[],
        },

        //业务对象列表
        list_business:{
          dialogVisible: false,
          title: "业务对象列表",
          select_bokey:'',
          // 表格
          table: {
            // 表格数据
            data: [
              {
                account: "admin",
                name: "stylefeng",
                orgName: "开发部",
                mobile: "12312341212",
                createTime: "2019-8-8 18:26:49",
                status: 0,//1正常，0禁用
              },
            ],
            // 列表复选框选中
            multipleSelection: [],
            // 列的属性操作
            header: [
              {
                key: "account", //列的属性
                label: "账号", //列的表头名字
                width: "", //列的宽度
                minWidth: "120", //列的最小宽度
                disabled: true, //列是否能控制显示隐藏
                sortable:true,//列是否排序
              },
              {
                key: "name",
                label: "姓名",
                width: "",
                minWidth: "150",
                disabled: false
              },
              {
                key: "orgName",
                label: "部门",
                width: "",
                minWidth: "150",
                disabled: false,
                sortable:true,//列是否排序
              },
              {
                key: "mobile",
                label: "电话",
                width: "",
                minWidth: "150",
                disabled: false
              },
              {
                key: "createTime",
                label: "创建时间",
                width: "",
                minWidth: "200",
                disabled: false
              },
              {
                key: "status",
                label: "状态",
                width: "",
                minWidth: "150",
                disabled: false
              },
              {
                key: "doed",
                label: "操作",
                width: "",
                minWidth: "250",
                disabled: true
              }
            ],
            // 默认显示的列
            table_if: ["account", "name", "orgName","mobile","createTime", "status","doed"],
            // 表格下面页码控制
            page: {
              currentPage: 1,
              pageSizes: [10, 20, 30, 40],
              pageSize: 10,
              total: 0
            },
            search_value:'',
          },
        }
      }
    },
    created() {

    },
    mounted() {
      this.fn_getNodes();
      this.fn_formDefListJson();
    },
    methods: {
      /* tree操作-start */
        //tree选中
        fn_handleNodeClick(data, node, data3) {
          this.tree.select_data = data;
          this.tree.select_node = node;
          this.fn_formDefListJson();
        },
        //获取树的数据
        fn_getNodes() {
          let param = {
            treeKey: 'bdfl',
            rootName: '所有数据',
          };
          getNodes(param)
            .then(response => {
              // console.log(response);
              this.addForm.groupName_list=response;
              let arr = this.ListToTree(response);
              this.tree.data = arr;
              this.tree.key++;
            })
            .catch(errors => {
              console.error(errors);
            });
        },
        // 对树数据进行处理
        ListToTree(list) {
          const copyList = list.slice(0);
          const tree = [];
          for (let i = 0; i < copyList.length; i++) {
            // 找出每一项的父节点，并将其作为父节点的children
            for (let j = 0; j < copyList.length; j++) {
              if (copyList[i].parentId === copyList[j].id) {
                if (
                  copyList[j].children === undefined ||
                  copyList[j].children == ""
                ) {
                  copyList[j].children = [];
                }
                // 根据sn确定当前层级下标
                copyList[j].children.push(copyList[i]);
                // copyList[j].children[copyList[i].sn - 1] = copyList[i];
              }
            }
            // 把根节点提取出来，parentId为null的就是根节点
            if (
              copyList[i].parentId === null ||
              copyList[i].parentId === undefined ||
              copyList[i].parentId === "0" ||
              copyList[i].parentId === 0||
              copyList[i].parentId === -1
            ) {
              tree.push(copyList[i]);
            }
          }
          return tree;
        },

      /* tree操作-end */

      /* 列表操作-start */
        //点击列表
        fn_boxClick(row){
          if(this.list.select.indexOf(row.id) > -1){//如果有则去掉
            let index=this.list.select.indexOf(row.id);
            this.list.select.splice(index,1);
          }else{//没有则添加
            this.list.select.push(row.id);
          }
          console.log(this.list.select);
        },
        //获取表单列表
        fn_formDefListJson(){
          let id='';
          if(this.tree.select_data){
            if (this.tree.select_data.id==-1) {
              id='';
            }else{
              id=this.tree.select_data.id;
            }
          }else{
            id='';
          }
          let param={
            formType:'pc',
            'a.group_id_$VEQ':id,
            'a.name_^VLK':this.list.search,
          }
          formDefListJson(param).then(response => {
            this.list.data=response.rows;
          }).catch(error => {
            console.error(error);
          })

        },
        // 删除
        fn_pagedEitRemove(removeid){
          let param={
            id:removeid
          }
          pagedEitRemove(param).then(res=>{
            if (res.isOk) {
              this.$message(res.msg);
              this.fn_formDefListJson();
            }
          }).catch(error=>{
            console.log(error);
          })
        },
      /* 列表操作-end */
    
      /* 新增编辑角色-start */
        // 打开dialog
        fn_openDialog(title,row) {
          // console.log(row);
          this.addForm.title = title;
          this.addForm.dialogVisible = true;
          this.fn_listData_busObjectSelect()
        },
        // 确定提交
        submitForm_add() {
          this.$refs.addForm.validate(valid => {
            if (valid) {
              this.fn_saveFormDef();
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        },
        // 关闭弹窗
        resetForm_add() {
          this.$refs.addForm.resetFields();
          this.addForm.dialogVisible = false;
        },
        //添加角色
        fn_saveFormDef(){
          let param={
            groupName:this.addForm.form.groupName,//分类
            groupId:this.addForm.form.groupId,//分类ID

            name:this.addForm.form.name,//名称
            key:this.addForm.form.key,//名称别名


            boName:this.addForm.form.boName,//业务对象名称
            boKey:this.addForm.form.boKey,//业务对象别名

            desc:this.addForm.form.desc,//描述

            html:"",
            isDeveloper:false,
            type:"pc",
          }
          // console.log(param);
          saveFormDef(param).then(response=>{
            this.$message({
              message:'添加角色成功',
              type:'success'
            })
            this.fn_formDefListJson();
            this.resetForm_add();
          }).catch(errors=>{
            console.log(errors);
          })
        },
        //获取业务对象列表
        fn_listData_busObjectSelect(){
          let param={}
          listData_busObjectSelect(param).then(res=>{
            this.addForm.boKey_list=res.rows;
          }).catch(error=>{
            console.log(error);
          })
        },
        //获取分类ID
        fn_groupNameChange(data){
          for (const item of this.addForm.groupName_list) {
            if (item.name===data) {
              this.addForm.form.groupId=item.id;
            }
          }
        },
        //获取业务对象名称
        fn_boKeyChange(data){
          for (const item of this.addForm.boKey_list) {
            if (item.key_===data) {
              this.addForm.form.boName=item.name_;
            }
          }
        },
        //获取别名
        fn_pinyin(){
          let param={
            chinese:this.addForm.form.name
          }
          pinyin(param).then(res=>{
            this.addForm.form.key=res;
          }).catch(error=>{
            console.log(error);
          })
        },
      /* 新增编辑角色-end */
      
      /* 业务对象列表-start */
        // 打开弹窗
        open_list_business(item){
          this.list_business.select_bokey=item.boKey;
          this.list_business.title=item.name;
          this.fn_pagedEitGetObject();
          this.fn_pagedEitGetList();
        },
        // 关闭弹窗
        close_list_business() {
          this.list_business.dialogVisible = false;
        },
        handleSizeChange(data){
          // console.log('现在是每页'+data+'条');
          //改变每页条数时，重新展现列表，重置页码为1
          this.list_business.table.page.pageSize=data;
          this.list_business.table.page.currentPage=1;
          this.fn_pagedEitGetList();
        },
        handleCurrentChange(data){
          this.list_business.table.page.currentPage=data;
          // console.log('现在是第'+data+'页');
          this.fn_pagedEitGetList();
        },
        //获取业务对象列表的列名
        fn_pagedEitGetObject(){
          let param={
            key:this.list_business.select_bokey,
            fill:true
          }
          pagedEitGetObject(param).then(res=>{
            let arr=[];
            let arr2=[];
            for (const item of res.data.relation.table.columns) {
              if (item.name!=='id'&&item.name!=='ID'&&item.name!=='user_id'&&item.comment!=='主键') {
                arr.push({
                  key: item.name, //列的属性
                  label: item.comment, //列的表头名字
                  width: "", //列的宽度
                  minWidth: "150", //列的最小宽度
                  disabled: false, //列是否能控制显示隐藏
                  sortable:false,//列是否排序
                })
                arr2.push(item.name);
              }
            }
            arr.push({
              key: "doed",
              label: "操作",
              width: "",
              minWidth: "150",
              disabled: true
            })
            arr2.push('doed');
            this.$nextTick(function(){
              this.list_business.table.header=arr;
              this.list_business.table.table_if=arr2;
            })
            this.list_business.dialogVisible = true;
          }).catch(errors=>{
            console.log(errors);
          })
        },
        //获取业务对象列表的数据
        fn_pagedEitGetList(){
          let param={
            order: 'asc',
            offset: (this.list_business.table.page.currentPage-1)*10,
            limit: this.list_business.table.page.pageSize,
          }
          pagedEitGetList(param,this.list_business.select_bokey).then(res=>{
            // console.log(res);
            this.list_business.table.data=res.rows;
          }).catch(errors=>{
            console.log(errors);
          })
        }
      /* 业务对象列表-end */
    }
  }
</script>

<style lang="scss" scoped>
  .page-edit {
    margin-top: 10px;
    padding: 10px;
    overflow: hidden;
    height: 100%;
  }
  .left {
    position: relative;
    display: flex;
    flex-direction: column;
    .left_title{
      height: 50px;
      line-height: 50px;
      background-color: #fbfbfb;
      border: 1px solid #dcdfe6;
      text-align: center;
      font-size: 16px;
    }
    .left_mian_tree {
      flex: 1;
      position: relative;
      overflow: auto;
      background-color: #fbfbfb;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
    }
    /deep/ .el-tree {
      background-color: #fbfbfb;
    }
  }
  .right{
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    padding: 0;
    .right_top{
      height: 50px;
      border-bottom: 2px solid #dcdfe6;
      overflow: hidden;
      padding: 6px 0;
      .top_left{
        float: left;
        .el-input{
          width: 300px;
        }
      }
      .top_right{
        float: right;
      }
    }
    .right_main{
      flex: 1;
      overflow: hidden;
      .box{
        float: left;
      }
    }
  }

  .box{
    width: 240px;
    height: 275px;
    margin:27px 29px 0;
    border: 1px solid #a0cfff;
    position: relative;
    border-radius: 5px 47px 5px 5px;
    box-shadow: 0 0 6px #C0C4CC;
    cursor: pointer;
    .triangle{
      position: absolute;
      top: -1px;
      right: -1px;
      // overflow: hidden;
      width: 40px;
      height: 40px;
      
      .triangle_bg{
        position: absolute;
        width: 0;
        height: 0;
        border: 20px solid;
        border-color: transparent transparent #a0cfff #a0cfff;
        border-radius: 4px;
        top: 1px;
        right: 1px;
        box-shadow: -2px 2px 2px #dcdfe6;
      }
      .triangle_bg:after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: -21px;
        left: -19px;
        border: 20px solid;
        border-color: transparent transparent #fff #fff;
        border-radius: 4px;
      }
      .triangle_main{
        width: 30px;
        height: 30px;
        margin-top: 10px;
        text-align: center;
        line-height: 30px;
        position: relative;
        z-index: 2;
        color: #55c177;
        font-weight: bold;
      }
      .icon_normal{
        color: #a0cfff;
      }
    }
    .boxMain{
      .boxMain_title{
        height: 57px;
        line-height: 65px;
        margin: 0 14px;
        padding-left: 5px;
        padding-right: 50px;
        border-bottom: 1px solid #a0cfff;
        font-size: 14px;
        overflow: hidden;     /*设置超出的部分进行影藏*/
        text-overflow: ellipsis;     /*设置超出部分使用省略号*/
        white-space:nowrap ;
        font-weight: bold;
        .box-icon1{
          width: 26px;
          height: 26px;
          background-color: #a0cfff;
          font-size: 18px;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 26px;
        }
        span{
          color: #303133;
        }
      }
      .boxMain_name,.boxMain_description{
        margin: 16px 26px 0;
        p{
          padding: 0;
          margin: 0;
          padding-left: 5px;
          height: 26px;
          line-height: 26px;
          color: #909399;
          font-size: 14px;
        }
        p+p{
          background-color: #f7fafe;
          color: #303133;
          overflow: hidden;     /*设置超出的部分进行影藏*/
          text-overflow: ellipsis;     /*设置超出部分使用省略号*/
          white-space:nowrap ;
          font-size: 14px;
        }
      }
      .boxMain_description{
        p+p{
          height: 80px;
          overflow: hidden;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          white-space: normal;
        }
      }
    }
    .doed{
      min-width: 50px;
      display: none;
      position: absolute;
      bottom: 0;
      left: 239px;
      padding-bottom: 11px;
      z-index: 9;
      .doed_button{
        margin-bottom: 5px;
        // width: 65px;
        height: 26px;
        line-height: 26px;
        border-radius: 0 4px 4px 0;
        padding: 0 5px;
        color: #fff;
        display: block;
        width: 30px;
        cursor: pointer;
        i{
          color: #fff;
        }
        span{
          display: none;
        }
      }
      .doed1{
        background-color: #409eff;
      }
      .doed1:hover{
        width: 65px;
        span{
          display: inline-block;
        }
      }

      .doed2{
        background-color: #67c23a;
      }
      .doed2:hover{
        width: 65px;
        span{
          display: inline-block;
        }
      }
      .doed3{
        background-color: #e6a23c;
      }
      .doed3:hover{
        width: 130px;
        span{
          display: inline-block;
        }
      }
      .doed4{
        background-color: #f56c6c;
      }
      .doed4:hover{
        width: 65px;
        span{
          display: inline-block;
        }
      }
    }
  }
  .box:hover{
    border: 1px solid #409eff;
    .triangle{
      .triangle_bg{
        border-color: transparent transparent #409eff #409eff;
      }
      .triangle_bg:after {
        border-color: transparent transparent #fff #fff;
      }
      .icon_normal{
        color: #409eff;
      }
    }
    .boxMain{
      .boxMain_title{
        border-bottom: 1px solid #409eff;
        .box-icon1{
          background-color: #409eff;
        }
        span{
          color: #409eff;
        }
      }
      .boxMain_name,.boxMain_description{
        p+p{
          font-weight: bold;
          background-color: #f0f6fd;
        }
      }
    }
    .doed{
      display: block;
    }
  }
  // tree的图标样式
  .el-tree{
    .treeLevel {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-bottom: -2px;
    }
    .treeLevel1 {
      background: url(/static/img/tree/国徽.svg) center center no-repeat;
      background-size: auto 19px;
    }
    .treeLevel2 {
      background: url(/static/img/tree/机构.svg) center center no-repeat;
      background-size: auto 23px;
    }
    .treeLevel3 {
      background: url(/static/img/tree/房子.svg) center center no-repeat;
      background-size: auto 23px;
    }
    .treeLevel4 {
      background: url(/static/img/tree/小组.svg) center center no-repeat;
      background-size: auto 12px;
    }
  }
  
  /deep/ .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    // max-height:calc(100% - 30px);
    // max-width:calc(100% - 30px);
    max-height: 80%;
    max-width: 80%;
    width: auto;
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    overflow: hidden;
    > .el-dialog__header {
      background-color: #fff;
      border-bottom: 1px solid #dcdfe6;
      > .el-dialog__title {
        color: #303133 !important;
      }
    }
    > .el-dialog__body {
      overflow: auto;
      color: #666666;
      padding: 20px;
      .diaologMain {
        padding: 20px 50px;
      }
    }
    > .el-dialog__footer {
      padding: 10px 20px 10px;
      border-top: 1px solid #dcdfe6 !important;
    }
  }
  .addForm_dialog{
    /deep/ .el-dialog {
      max-width: 800px;
    }
  }
  .list_business_dialog{
    /deep/ .el-dialog {
      min-width: 60%;
      > .el-dialog__body {
        .diaologMain {
          padding: 0;
        }
      }
    }

  }
</style>