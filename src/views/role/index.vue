<template>
  <div class="views-container">
    <div class="main">
      <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">
        <!-- 头部左侧添加内容示例 -->
        <template  v-slot:top_left>
          <el-input
            placeholder="请输入需要检索的人员名称"
            suffix-icon="el-icon-search"
            size="small"
            style="width:300px"
            v-model="table.search_value"
          ></el-input>
          <el-button size="small" type="primary" @click="fn_search_click">查询</el-button>
        </template>

        <!-- 头部列表控制按钮右侧添加内容是咧 -->
        <template  v-slot:top_button_left>
          <el-button size="small" type="success"  @click="fn_openDialog('新增')">添加</el-button>
          <el-button size="small" type="primary">导入</el-button>
          <el-button size="small" type="primary">导出</el-button>
        </template>

        <!-- 列表操作示例-操作性别sex列 -->
        <template  v-slot:enabled="slotProps">
          <el-switch
            v-model="slotProps.row.enabled"
            active-text="禁用"
            inactive-text="启用"
            active-color="#ff4949"
            inactive-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
            @change="fn_roleStatus(slotProps.row)"
          ></el-switch>
        </template>

        <!-- 列表操作示例-操作列添加删除按钮 -->
        <template  v-slot:doed="slotProps">
          <el-button type="text" style="color:#409eff" @click="fn_opemDrawer_authorization(slotProps.row)">授权</el-button>
          <span>|</span>
          <el-button type="text" style="color:#67c23a" @click="fn_openDialog('编辑',slotProps.row)">编辑</el-button>
          <span>|</span>
          <el-button type="text" style="color:#e6a23c" @click="fn_opemDrawer_user(slotProps.row)">用户</el-button>
          <span>|</span>
          <el-button type="text" style="color:#f56c6c" @click="fn_roleRemove(slotProps.row)">删除</el-button>
        </template>
      </tableComment>


    </div>
    <!-- 授权抽屉 -->
    <el-drawer
      :title="authorization.title"
      :size="authorization.size"
      :visible.sync="authorization.drawerVisible"
      direction="rtl"
      class="drawer drawer_authorization"
      :before-close="fn_closeDrawer_authorization"
    >
      <div class="drawer_main">
        <el-select v-model="authorization.value" placeholder="请选择" style="width: 100%;padding: 10px 15px 0;" @change="fn_roleGetTreeData">
          <el-option
            v-for="item in authorization.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-tree
          :key="tree.key"
          :data="tree.data"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          accordion
          node-key="id"
          show-checkbox
          :check-strictly='false'
          @check-change="handleCheckChange"
          ref="organization_tree"
          :default-checked-keys="tree.select"
          :props="tree.props"
        ></el-tree>
      </div>
      <div class="drawer_footer">
        <el-button type="primary" @click="fn_Confirm_authorization">确定</el-button>
        <el-button @click="fn_closeDrawer_authorization">取 消</el-button>
      </div>
    </el-drawer>

    <!-- 用户抽屉 -->
    <el-drawer
      :title="user.title"
      :size="user.transfer.drawer_user_if?'300px':'650px'"
      :visible.sync="user.drawerVisible"
      direction="rtl"
      :class="{ 'drawer': true, 'drawer_user': true, 'drawer_user_if':user.transfer.drawer_user_if }"
      :before-close="fn_closeDrawer_user"
    >
      <div class="drawer_main">
        <div class="transfer_user">
          <div class="button_drawer_user_if">
            <el-switch
              style="display: block"
              v-model="user.transfer.drawer_user_if"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="用户"
              inactive-text="管理"
              @change="user.transfer.transfer_key++"
            ></el-switch>
            <!-- <el-button type="primary" @click="user.transfer.drawer_user_if=false">用户管理</el-button> -->
          </div>
          <el-transfer
            :key="user.transfer.transfer_key"
            style="text-align: left; display: inline-block"
            v-model="user.transfer.value"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :titles="['全部用户', '超级管理员']"
            @change="handleChange"
            :data="user.transfer.data"
            :props="{
              key: 'userId',
              label: 'name'
            }"
          >
            <!-- <span slot-scope="{ option }">{{ option.userId }} - {{ option.name }}</span> -->
            <span slot-scope="{ option }">{{ option.name }}</span>
            <!-- <div class="transfer-footer" slot="left-footer">
              <el-pagination
                layout="prev, pager, next"
                small
                :total="50"
              >
              </el-pagination>
            </div>
            <div class="transfer-footer" slot="right-footer">
              <el-pagination
                layout="prev, pager, next"
                small
                :total="50"
              >
              </el-pagination>
            </div>-->
          </el-transfer>
        </div>
      </div>
      <div class="drawer_footer">
        <el-button type="primary" @click="fn_Confirm_user">确定</el-button>
        <el-button @click="fn_closeDrawer_user">取 消</el-button>
      </div>
    </el-drawer>

    <!-- 新增编辑用户 -->
    <el-dialog
      :title="add_user.title+'角色'"
      :visible.sync="add_user.dialogVisible"
      :before-close="resetForm_add"
    >
      <el-form
        :model="add_user.form"
        :rules="add_user.rules"
        ref="add_user"
        label-width="100px"
        class="add_user"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="add_user.form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码：" prop="code">
          <el-input v-model="add_user.form.code"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="enabled">
          <el-select v-model="add_user.form.enabled" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input type="textarea" v-model="add_user.form.description" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_add()">确 定</el-button>
        <el-button @click="resetForm_add()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleListJson,//获取角色列表
  roleStatus,//角色启用禁用
  roleAdd,//角色新增
  roleRemove,//角色删除
  roleGet,//查看角色
  roleEdit,//查看角色
  roleSave,//角色授权
  roleGetTreeData,//获取角色已有授权
  getTreeData, //获取树的数据
  getUsersByRoleId, //获取树的数据
  selectAllUser, //获取树的数据
  allocationUserForRole, //角色分配用户
} from "@/api/api.js";
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
export default {
  name: "role",
  components: {
    tableComment
  },
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          userId: i,
          name: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      // 表格
      table: {
        // 表格数据
        data: [
          {
            name: "超级管理员",
            code: "admin",
            description: "管理整个系统",
            enabled: false,//1正常，0禁用
          },
          {
            name: "超级管理员",
            code: "admin",
            description: "管理整个系统",
            enabled: false,
          }
        ],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "name", //列的属性
            label: "角色名称", //列的表头名字
            width: "", //列的宽度
            minWidth: "120", //列的最小宽度
            disabled: true, //列是否能控制显示隐藏
            sortable:true,//列是否排序
          },
          {
            key: "code",
            label: "角色编码",
            width: "",
            minWidth: "150",
            disabled: false
          },
          {
            key: "description",
            label: "备注",
            width: "",
            minWidth: "200",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "enabled",
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
        table_if: ["name", "code", "description", "enabled","doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 400
        },
        search_value:'',
      },

      // 授权抽屉
      authorization: {
        title: "角色管理 > 超级管理员",
        size: "414px",
        drawerVisible: false,
        select_roleId:'',
        options:[
          {
            value: '1',
            label: '业务流程平台'
          }, 
          {
            value: '2',
            label: '门户平台'
          }
        ],
        value:'1'
      },
      // 用户抽屉
      user: {
        title: "角色用户维护",
        // size: "650px",
        // size: "300px",
        drawerVisible: false,
        transfer: {
          value: [1, 2],
          data: generateData(),
          drawer_user_if: true,
          transfer_key: 0
        },
        select_roleId:''
      },

      //树节点数据
      tree: {
        data: [
          /* {
            id: "1",
            label: "一级 1",
            icon: "el-icon-platform-eleme",
            iconNum: 1,
            children: [
              {
                id: "1_1",
                label: "二级 1-1",
                icon: "el-icon-user",
                iconNum: 2,
                children: [
                  {
                    id: "1_1_1",
                    label: "三级 1-1-1",
                    icon: "el-icon-star-off",
                    iconNum: 3
                  },
                  {
                    id: "1_1_2",
                    label: "三级 1-1-2",
                    icon: "el-icon-star-off",
                    iconNum: 3
                  }
                ]
              }
            ]
          } */
        ],
        key: 0,
        //默认选中
        select: [],
        props: {
          children: "children",
          label: "name"
        },
      },

      // 新增编辑用户
      add_user: {
        dialogVisible: false,
        title: "",
        form: {
          name: "",
          code: "",
          enabled: "",
          description: ""
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入名称",
              trigger: ["blur", "change"]
            }
          ],
          code: [
            {
              required: true,
              message: "请输入编码",
              trigger: ["blur", "change"]
            }
          ],
          enabled: [
            {
              required: true,
              message: "请选择状态",
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
        }
      }
    };
  },
  computed: {},
  mounted() {
    this.fn_roleListJson();
  },
  methods: {
    /* 表格-start */
      fn_search_click(){
        // console.log(this.table.search_value);
        //筛选时，重置页码为1
        this.table.page.currentPage=1;
        this.fn_roleListJson();
      },
      handleSizeChange(data){
        this.table.page.pageSize=data;
        this.table.page.currentPage=1;
        this.fn_roleListJson();
        // console.log('现在是每页'+data+'条');
      },
      handleCurrentChange(data){
        this.table.page.currentPage=data;
        this.fn_roleListJson();
        // console.log('现在是第'+data+'页');
      },
      // 获取角色列表
      fn_roleListJson(row){
        let param={
          orderBy:'',//排序，可以为空
          pageNo:this.table.page.currentPage,//页码
          pageSize:this.table.page.pageSize,//每页条数
          sort:'',//排序字段，不用理会
          roleName:this.table.search_value,//筛选输入框的值
        }
        roleListJson(param).then(response =>{
          this.table.data=[];
          this.table.data=response.data.records;
          this.table.page.total=parseInt(response.data.total);
          // console.log(this.table.data);
        }).catch(errors =>{
          console.log(errors);
        });
      },
      // 角色启用禁用
      fn_roleStatus(row){
        let param={
          roleId:row.roleId,
          status:row.enabled
        }
        roleStatus(param).then(response =>{
          this.$message({
              message: response.message,
              type: 'success'
          });
        }).catch(errors =>{
          console.log(errors);
        });
      },
      //角色删除
      fn_roleRemove(row){
        let param={
          roleId:row.roleId
        };
        roleRemove(param).then(response=>{
          this.$message('删除成功');
          this.fn_roleListJson();
        }).catch(errors=>{
          console.log(errors);
        });
      },
    /* 表格-end */

    /* 授权抽屉-start */
      // 打开抽屉
      fn_opemDrawer_authorization(row) {
        this.authorization.drawerVisible = true;
        this.authorization.select_roleId=row.roleId;
        // this.fn_getTreeData();
        this.fn_roleGetTreeData();
      },
      //关闭抽屉
      fn_closeDrawer_authorization() {
        this.authorization.drawerVisible = false;
        this.authorization.value='1';
        //清空tree选中
        this.$refs.organization_tree.setCheckedKeys([]);
      },
      //树节点选中发生变化时触发
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      //点击确定
      fn_Confirm_authorization() {
        //获取tree树选中节点数据node
        let select_node = this.$refs.organization_tree.getCheckedNodes();
        let arr = [];
        let resId='';
        //整理数据node，提取label和ID
        for (const item of select_node) {
          arr.push({
            name: item.name,
            id: item.id
          });
          resId+=item.id+','
        }
        // console.log(resId);
        this.fn_roleSave(resId);
      },
      //角色授权
      fn_roleSave(resId){
        let param={
          resId:resId,
          roleId:this.authorization.select_roleId,
          sysId:this.authorization.value
        };
        roleSave(param).then(response=>{
          this.$message({
            message:'角色授权成功',
            type:'success'
          })
          this.fn_closeDrawer_authorization();
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //获取树的数据
      fn_getTreeData() {
        let param = {};
        roleGetTreeData(param).then(response=>{
          let resData=response.data;
          let arr = this.ListToTree(resData);
          this.tree.data = arr;
          this.tree.key++;
        }).catch(errors=>{
          console.log(errors);
        })
      },
      // 对树数据进行处理
      ListToTree(list) {
        const copyList = list.slice(0);
        const tree = [];
        for (let i = 0; i < copyList.length; i++) {
          // 找出每一项的父节点，并将其作为父节点的children
          for (let j = 0; j < copyList.length; j++) {
            if ((copyList[i].parentId === copyList[j].id)&&(copyList[i].parentId!=='')) {
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
            copyList[i].parentId === 0
          ) {
            tree.push(copyList[i]);
          }
        }
        return tree;
      },
      //获取角色已有授权
      fn_roleGetTreeData(){
        let param={
          roleId:this.authorization.select_roleId,
          sysId:this.authorization.value
        }
        roleGetTreeData(param).then(response=>{
          this.tree.select = [];
          let resData=response.data;
          for (const item of resData) {
            if(item.checked){
              this.tree.select.push(item.id);
            }
          }
          
          let arr = this.ListToTree(resData);
          this.tree.data = arr;
          this.tree.key++;
        }).catch(errors=>{
          console.log(errors);
        })
      },
    /* 授权抽屉-end */

    /* 角色用户维护-start */
      // 打开抽屉
      fn_opemDrawer_user(row) {
        this.user.drawerVisible = true;
        this.user.select_roleId=row.roleId;
        this.fn_selectAllUser();
        this.fn_getUsersByRoleId(row);
      },
      //关闭抽屉
      fn_closeDrawer_user() {
        this.user.drawerVisible = false;
        this.user.transfer.drawer_user_if = true;
        this.user.transfer.transfer_key++;
      },
      fn_Confirm_user() {
        this.fn_allocationUserForRole();
        this.fn_closeDrawer_user();
      },
      // 右侧列表元素变化时触发
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      //获取角色选中的用户
      fn_getUsersByRoleId(row){
        let param={
          roleIds:row.roleId
        };
        getUsersByRoleId(param).then(response=>{
          this.user.transfer.value=[]
          let arr =response.data;
          for (const item of arr) {
            this.user.transfer.value.push(item.userId);
          }
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //获取所有的用户
      fn_selectAllUser(){
        let param={
          name:''
        };
        // console.log('ssss');
        selectAllUser(param).then(response=>{
          // console.log(response);
          this.user.transfer.data=response.data
        }).catch(errors=>{
          console.log(errors);
        })
      },
      fn_allocationUserForRole(){
        let param={
          roleId:this.user.select_roleId,
          userIds:''
        }
        let resId='';
        //整理数据node，提取label和ID
        for (const item of this.user.transfer.value) {
          resId+=item+','
        }
        param.userIds=resId;
        allocationUserForRole(param).then(response=>{
          this.$message({
            message:'提交成功',
            type:'success'
          })
        }).catch(errors=>{
          console.log(errors);
        })
      },
    /* 角色用户维护-end */

    /* 新增编辑角色-start */
      // 打开dialog
      fn_openDialog(title,row) {
        this.add_user.title = title;
        this.add_user.dialogVisible = true;
        if(this.add_user.title==='编辑'){
          this.add_user.form=JSON.parse(JSON.stringify(row));
          // this.fn_roleGet(row.roleId);
        }
      },
      // 确定提交
      submitForm_add() {
        this.$refs.add_user.validate(valid => {
          if (valid) {
            if (this.add_user.title==='新增') {
              this.fn_roleAdd();
            } else {
              this.fn_roleEdit();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 关闭弹窗
      resetForm_add() {
        this.$refs.add_user.resetFields();
        this.add_user.dialogVisible = false;
      },
      //添加角色
      fn_roleAdd(){
        let param={
          name:this.add_user.form.name,
          code:this.add_user.form.code,
          enabled:this.add_user.form.enabled,
          description:this.add_user.form.description,
        }
        roleAdd(param).then(response=>{
          this.$message({
            message:'添加角色成功',
            type:'success'
          })
          this.fn_roleListJson();
          this.resetForm_add();
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //添加角色
      fn_roleEdit(){
        let param={
          name:this.add_user.form.name,
          code:this.add_user.form.code,
          enabled:this.add_user.form.enabled,
          description:this.add_user.form.description,
          roleId:this.add_user.form.roleId,
        }
        roleEdit(param).then(response=>{
          this.$message({
            message:'编辑角色成功',
            type:'success'
          })
          this.fn_roleListJson();
          this.resetForm_add();
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //查看角色
      fn_roleGet(id){
        let param={
          roleId:id
        };
        roleGet(param).then(response=>{
          // console.log(response);
          this.add_user.form=response.data;
        }).catch(errors=>{
          console.log(errros);
        })
      }
    /* 新增编辑角色-end */
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
.main {
  margin: 0 20px;
  .main_top {
    overflow: hidden;
    .search_user {
      float: left;
      .el-input {
        width: 300px;
      }
    }
    .button_user {
      float: right;
    }
  }
  .main_table {
    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
    /deep/ .el-pagination {
      text-align: right;
      margin: 10px 0;
    }
  }
}
.drawer {
  /deep/ #el-drawer__title {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    color: #303133 !important;
    margin-bottom: 0;
    padding: 10px 20px;
  }
  /deep/ .el-drawer__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    .drawer_main {
      flex: 1;
      overflow: auto;
      position: relative;
    }
    .drawer_footer {
      border-top: 1px solid #dcdfe6;
      padding: 10px 20px;
    }
  }
}
.drawer_authorization {
  .el-tree {
    margin: 20px 50px 0;
  }
}
.drawer_user {
  .transfer_user {
    height: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
    .button_drawer_user_if {
      padding-bottom: 15px;
      text-align: right;
    }
    .el-transfer {
      height: 100%;
      flex: 1;
      /deep/ .el-transfer-panel {
        height: 100%;
        width: 250px;
        .el-transfer-panel__header {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          z-index: 1;
        }
        .el-transfer-panel__body {
          height: 100%;
          padding-top: 40px;
          display: flex;
          flex-direction: column;
          .el-checkbox{
            width: 100%;
          }
          .el-checkbox-group {
            height: auto;
            flex: 1;
          }
        }
        .el-transfer-panel__footer {
          .transfer-footer {
            padding-top: 7px;
            text-align: right;
          }
        }
      }
    }
  }
}
.drawer_user_if {
  /deep/ .el-checkbox__inner{
    display: none;
  }
  /deep/ .el-transfer-panel__item{
    pointer-events:none
  }
  /deep/ .el-transfer-panel:first-child {
    display: none;
  }
  /deep/ .el-transfer__buttons {
    display: none;
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
  max-width: 70%;
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
    .add_user {
      padding: 20px 50px;
    }
  }
  > .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}
</style>