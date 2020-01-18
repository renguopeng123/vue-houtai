<template>
  <div class="views-container">
    <el-container style="height:100%">
      <el-aside width="393px" class="left">
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
            <el-button size="small" type="success" @click="fn_openDrawer('添加')">添加</el-button>
            <el-button size="small" type="primary">导入</el-button>
            <el-button size="small" type="primary">导出</el-button>
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
              @change="fn_userStatus(slotProps.row)"
            ></el-switch>
          </template>

          <!-- 列表操作示例-操作列添加删除按钮 -->
          <template  v-slot:doed="slotProps">
            <el-button type="text" style="color:#409eff" @click="fn_openDrawer('修改',slotProps.row.userId)">修改</el-button>
            <span>|</span>
            <!-- <el-button type="text" style="color:#67c23a">分配角色</el-button> -->
            <!-- <span>|</span> -->
            <el-button type="text" style="color:#e6a23c" @click="fn_userReset(slotProps.row)">重置密码</el-button>
            <span>|</span>
            <el-button type="text" style="color:#f56c6c" @click="fn_userRemove(slotProps.row.userId)">删除</el-button>
          </template>
        </tableComment>
      </el-main>
    </el-container>
    <!-- 添加修改用户抽屉 -->
    <el-drawer
      :title="drawer_user.title+'用户'"
      :visible.sync="drawer_user.drawerVisible"
      direction="rtl"
      class="drawer drawer_user"
      :size="drawer_user.size"
      :before-close="fn_closeDrawer_user"
    >
      <div class="drawer_main">
        <el-form
          :model="form.data"
          :rules="form.rules"
          ref="addForm"
          label-width="110px"
          class="addForm"
        >
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.data.name"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input v-model="form.data.account" :disabled="drawer_user.title==='修改'"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" v-if="drawer_user.title==='添加'">
            <el-input v-model="form.data.password" type="password" show-password readonly onfocus="this.removeAttribute('readonly')" :disabled="drawer_user.title==='修改'"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkpassword" v-if="drawer_user.title==='添加'">
            <el-input v-model="form.data.checkpassword" type="password" show-password readonly onfocus="this.removeAttribute('readonly')" :disabled="drawer_user.title==='修改'"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.data.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="mobile">
            <el-input v-model="form.data.mobile"></el-input>
          </el-form-item>
          <el-form-item label="微信号：" prop="weixin">
            <el-input v-model="form.data.weixin"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="form.data.address"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="form.data.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-switch
              v-model="form.data.status"
              active-text="禁用"
              inactive-text="启用"
              active-color="#ff4949"
              inactive-color="#13ce66"
              :active-value="0"
              :inactive-value="1"
            ></el-switch>
          </el-form-item>
          <el-form-item label="角色：" prop="roles">
            <el-select
              v-model="form.data.roles"
              filterable
              placeholder="请选择"
              multiple
              style="width:100%;"
            >
              <el-option
                v-for="item in form.options_roles"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构：" prop="organizations">
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.id"
                  v-for="tag in form.data.organizations"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="el-tag--info el-tag--small"
                >{{tag.name}}</el-tag>
              </div>
              <el-button class="organization_search" icon="el-icon-search" @click="fn_open_tree"></el-button>
            </div>
            <!-- 下面这个是为了表单验证，隐藏不显示状态 -->
            <el-checkbox-group v-model="form.data.organizations" v-show="false"></el-checkbox-group>
          </el-form-item>
          <el-form-item label="岗位：" prop="duties">
            <el-select
              v-model="form.data.duties"
              filterable
              placeholder="请选择"
              multiple
              style="width:100%;"
            >
              <el-option
                v-for="item in form.options_posts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="organization_tree" v-if="tree_organization.treeVisible">
          <div class="organization_tree_box">
            <el-tree
              :key="tree_organization.key"
              :data="tree_organization.data"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              accordion
              node-key="id"
              show-checkbox
              check-strictly
              @check-change="handleCheckChange"
              ref="organization_tree"
              :default-checked-keys="tree_organization.select"
              :props="tree_organization.props"
            >
              <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                <i class="treeLevel treeLevel1" v-if="node.level===1"></i>
                <i class="treeLevel treeLevel2" v-else-if="node.level===2"></i>
                <i class="treeLevel treeLevel3" v-else-if="node.level===3"></i>
                <i class="treeLevel treeLevel4" v-else></i>
                <span>{{ node.label }}</span>
              </span> -->
            </el-tree>
            <div class="organization_fotter">
              <el-button type="primary" @click="fn_treeConfirm">确定</el-button>
              <el-button @click="fn_close_tree">取 消</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer_footer">
        <el-button type="primary" @click="submitForm_add()">确定</el-button>
        <el-button @click="fn_closeDrawer_user()">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getTreeData, //获取树的数据
  queryGroupUser, //查询选中机构下的用户
  userStatus,//用户启用禁用
  userReset,//重置用户密码
  userAdd,//添加用户
  roleListJson,//获取角色列表
  getUserInfo,//用户详情
  userEdit,//修改用户
  userRemove,//删除用户
  duties_selectAll,//查询所有岗位
} from "@/api/api.js";
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
export default {
  name: "user",
  components: {
    tableComment
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.data.checkpassword !== "") {
          this.$refs.addForm.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.data.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validPhone = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    var validateWeixin = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("微信号不能为空"));
      } else {
        var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的微信号码"));
        } else {
          callback();
        }
      }
    };
    return {
      //树节点数据
      tree:{
        data: [],
        key: 0,
        select_node: null,
        select_data: null,
        props: {
          children: "children",
          label: "name"
        },
      },

      // 表格
      table: {
        // 表格数据
        data: [
          // {
          //   account: "admin",
          //   name: "stylefeng",
          //   orgName: "开发部",
          //   mobile: "12312341212",
          //   createTime: "2019-8-8 18:26:49",
          //   status: 0,//1正常，0禁用
          // },
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
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 0
        },
        search_value:'',
      },

      //添加修改用户抽屉
      drawer_user:{
        title: "新增",
        size: "600px",
        drawerVisible: false,
        select_userId:''
      },

      //表单数据
      form:{
        data:{
          name: "",//姓名
          account: "",//账号
          password: "",//密码
          checkpassword: "",//确认密码
          email: "",//邮箱
          mobile: "",//电话号码
          weixin: "",//微信
          address: "",//地址
          sex: "",//性别
          status:1,
          roles: [],//角色
          organizations: [],//机构
          duties: []//岗位
        },
        rules:{
          name: [
            {
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }
          ],
          account: [
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              validator: validatePass,
              trigger: ["blur", "change"]
            }
          ],
          checkpassword: [
            {
              required: true,
              validator: validatePass2,
              trigger: ["blur", "change"]
            }
          ],
          // email: [
          //   { required: true, message: "请输入邮箱地址", trigger: "blur" },
          //   { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
          // ],
          // mobile: [
          //   {
          //     required: true,
          //     validator: validPhone,
          //     trigger: "blur"
          //   }
          // ],
          // weixin: [
          //   {
          //     required: true,
          //     validator: validateWeixin,
          //     trigger: "blur"
          //   }
          // ],
          // address: [
          //   {
          //     required: true,
          //     message: "请输入地址",
          //     trigger: "blur"
          //   }
          // ],
          // resource: [
          //   { required: true, message: "请选择性别", trigger: "change" }
          // ],
          roles: [{ required: true, message: "请选择角色", trigger: "change" }],
          organizations: [
            {
              type: "array",
              required: true,
              message: "请选择机构",
              trigger: "change"
            }
          ],
          duties: [{ required: true, message: "请选择岗位", trigger: "change" }]
        },
        options_roles: [],
        options_posts: [
          {
            value: "选项1",
            label: "科技部-部门经理",
            id:'123001'
          },
          {
            value: "选项2",
            label: "科技部-项目经理",
            id:'123002'
          },
          {
            value: "选项3",
            label: "科技部-产品经理",
            id:'123003'
          },
          {
            value: "选项4",
            label: "科技部-前端工程师",
            id:'123004'
          }
        ],
      },

      // 选择机构的树
      tree_organization:{
        treeVisible: false,
        data: [],
        props: {
          children: "children",
          label: "name"
        },
        key: 0,
        //默认选中
        select:[],
      },
    };
  },
  computed: {
  },
  mounted(){
    this.fn_getTreeData();
    this.fn_roleListJson();
    this.fn_duties_selectAll();
  },
  methods: {
    /* tree操作-start */
      //tree选中
      fn_handleNodeClick(data, node, data3) {
        this.tree.select_data = data;
        this.tree.select_node = node;
        // 获取列表数据
        this.fn_queryGroupUser2();
      },
      //获取树的数据
      fn_getTreeData() {
        let param = {};
        getTreeData(param)
          .then(response => {
            // console.log(response);
            let arr = this.ListToTree(response);
            this.tree.data = arr;
            this.tree_organization.data = arr;
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
            copyList[i].parentId === 0
          ) {
            tree.push(copyList[i]);
          }
        }
        return tree;
      },
    /* tree操作-end */

    /* 表格操作-start */
      fn_search_click(){
        // console.log(this.table.search_value);
        //筛选时，重置页码为1
        this.table.page.currentPage=1;
        this.fn_queryGroupUser();
      },
      handleSizeChange(data){
        // console.log('现在是每页'+data+'条');
        //改变每页条数时，重新展现列表，重置页码为1
        this.table.page.pageSize=data;
        this.table.page.currentPage=1;
        this.fn_queryGroupUser();
      },
      handleCurrentChange(data){
        this.table.page.currentPage=data;
        // console.log('现在是第'+data+'页');
        this.fn_queryGroupUser();
      },
      fn_queryGroupUser2(){
        this.table.search_value='';
        this.table.page.currentPage=1;
        this.table.page.pageSize=100;
        this.fn_queryGroupUser();
      },
      fn_queryGroupUser(){
        let param={
          orderBy:'',//排序，可以为空
          orgId :this.tree.select_data.id,//机构ID
          pageNo:this.table.page.currentPage,//页码
          pageSize:this.table.page.pageSize,//每页条数
          sort:'',//排序字段，不用理会
          userName:this.table.search_value,//筛选输入框的值
        };
        queryGroupUser(param).then(response => {
          this.table.data=[];
          this.table.data=response.data.records;
          this.table.page.total=parseInt(response.data.total);
        }).catch(errors => {
          console.error(errors);
        });
      },
      // 用户启用禁用
      fn_userStatus(row){
        let param={
          userId:row.userId,
          status:row.status
        }
        userStatus(param).then(response =>{
          this.$message({
              message: response.message,
              type: 'success'
          });
        }).catch(errors =>{
          console.log(errors);
        });
      },
      // 重置用户密码
      fn_userReset(row){
        let param={
          userId:row.userId,
        }
        userReset(param).then(response =>{
          this.$message({
              message: response.message,
              type: 'success'
          });
        }).catch(errors =>{
          console.log(errors);
        });
      },
    /* 表格操作-end */

    /* 添加修改用户抽屉-start */
      //打开抽屉
      fn_openDrawer(type,id) {
        this.drawer_user.title = type;
        this.drawer_user.select_userId=id;
        this.drawer_user.drawerVisible = true;
        if (this.tree.select_data) {
          this.form.data.organizations=[{
            name: this.tree.select_data.name,
            id: this.tree.select_data.id
          }]
        }
        if(type==='修改'){
          this.fn_getUserInfo(id);
        }
      },
      //关闭抽屉
      fn_closeDrawer_user(){
        this.$refs.addForm.resetFields();
        this.drawer_user.drawerVisible = false;
        this.fn_close_tree();
      },
      // 添加用户
      fn_userAdd(row){
        let param={
          name:this.form.data.name,//姓名
          account:this.form.data.account,//账号
          password:this.form.data.password,//密码
          // checkpassword:this.form.data.checkpassword,//确认密码
          email:this.form.data.email,//邮箱
          mobile:this.form.data.mobile,//电话号码
          weixin:this.form.data.weixin,//微信
          address:this.form.data.address,//地址
          sex:this.form.data.sex,//状态
          status:this.form.data.status,//性别
          // roles:this.form.data.roles,//角色
          // organizations:this.form.data.organizations,//机构
          // duties:this.form.data.duties,//岗位
          orgRelationList:[]
        }
        let arr=[];
        console.log(this.form.data.roles);
        for (const item of this.form.data.roles) {
          arr.push({
            roleId: item,
            type: "userRole",
          })
        }
        for (const item of this.form.data.organizations) {
          arr.push({
            orgId: item.id,
            type: "groupUser",
          })
        }
        for (const item of this.form.data.duties) {
          arr.push({
            dutyId: item,
            orgId: this.form.data.organizations[0].id,
            type: "groupUserRole",
          })
        }
        param.orgRelationList=arr;
        userAdd(param).then(response =>{
          this.$message({
            message: "恭喜你，添加用户成功",
            type: "success"
          });
          this.fn_queryGroupUser2();
          this.fn_closeDrawer_user();
        }).catch(errors =>{
          console.log(errors);
        });
      },
      // 修改用户
      fn_userEdit(row){
        let param={
          userId:this.drawer_user.select_userId,
          name:this.form.data.name,//姓名
          account:this.form.data.account,//账号
          // password:this.form.data.password,//密码
          // checkpassword:this.form.data.checkpassword,//确认密码
          email:this.form.data.email,//邮箱
          mobile:this.form.data.mobile,//电话号码
          weixin:this.form.data.weixin,//微信
          address:this.form.data.address,//地址
          sex:this.form.data.sex,//性别
          status:this.form.data.status,//状态
          // roles:this.form.data.roles,//角色
          // organizations:this.form.data.organizations,//机构
          // duties:this.form.data.duties,//岗位
          orgRelationList:[]
        }
        let arr=[];
        // console.log(this.form.data.roles);
        for (const item of this.form.data.roles) {
          arr.push({
            roleId: item,
            type: "userRole",
          })
        }
        for (const item of this.form.data.organizations) {
          arr.push({
            orgId: item.id,
            type: "groupUser",
          })
        }
        for (const item of this.form.data.duties) {
          arr.push({
            dutyId: item,
            orgId: this.form.data.organizations[0].id,
            type: "groupUserRole",
          })
        }
        param.orgRelationList=arr;
        console.log(JSON.stringify(param))
        userEdit(param).then(response =>{
          this.$message({
            message: "恭喜你，修改用户成功",
            type: "success"
          });
          this.fn_queryGroupUser2();
          this.fn_closeDrawer_user();
        }).catch(errors =>{
          console.log(errors);
        });
      },
      //删除用户
      fn_userRemove(id){
        let param={
          userId:id
        }
        userRemove(param).then(response=>{
          this.$message('删除成功');
          this.fn_queryGroupUser2();
        }).catch(errors=>{
          console.log(errors);
        })
      },
      // 获取角色列表
      fn_roleListJson(row){
        let param={
        }
        roleListJson(param).then(response =>{
          this.form.options_roles=response.data.records;
        }).catch(errors =>{
          console.log(errors);
        });
      },
      //获取岗位列表
      fn_duties_selectAll(){
        let param={};
        duties_selectAll(param).then(response=>{
          this.form.options_posts=response.data;
        }).catch(errors =>{
          console.log(errors);
        });
      },
      //机构tag标签删除
      handleClose(tag) {
        this.form.data.organizations.splice(
          this.form.data.organizations.indexOf(tag),
          1
        );
      },
      //获取用户信息
      fn_getUserInfo(userId){
        let param={
          userId:userId
        };
        getUserInfo(param).then(response => {
          this.form.data=response.data;
          // 角色赋值
          let arr_roles=[];
          for(const item of response.data.roles){
            arr_roles.push(item.roleId);
          }
          this.form.data.roles=arr_roles;
          // 岗位赋值
          let arr_duties=[];
          for(const item of response.data.duties){
            arr_duties.push(item.id);
          }
          this.form.data.duties=arr_duties;
        }).catch(errors => {
          console.error(errors);
        });
      },

      //表单验证
      submitForm_add(formName) {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            if (this.drawer_user.title==='添加') {
              this.fn_userAdd();
            } else {
              this.fn_userEdit();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    /* 添加修改用户抽屉-start */

    /* tree_机构-start */
      //显示树
      fn_open_tree() {
        this.drawer_user.size = "820px";
        this.tree_organization.treeVisible = true;
        this.tree_organization.select = [];
        for (const item of this.form.data.organizations) {
          this.tree_organization.select.push(item.id);
        }
      },
      //隐藏tree
      fn_close_tree() {
        this.drawer_user.size = "600px";
        this.tree_organization.treeVisible = false;
      },
      //树节点选中发生变化时触发
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
        /* 单选操作 */
        if (checked) {
          let arr = [data.id];
          this.$refs.organization_tree.setCheckedKeys(arr);
        }
      },
      //树选中复选框后点击确定
      fn_treeConfirm() {
        // console.log(this.$refs.organization_tree.getCheckedKeys());//获取选中节点的key（也就是ID）
        // console.log(this.$refs.organization_tree.getCheckedNodes());//获取选中节点的node
        let select_node = this.$refs.organization_tree.getCheckedNodes();
        let arr = [];
        for (const item of select_node) {
          arr.push({
            name: item.name,
            id: item.id
          });
        }
        this.$nextTick(function() {
          this.form.data.organizations = arr;
        });
        this.fn_close_tree();
      },
    /* tree_机构-end */

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

.left {
  position: relative;
  .left_mian_tree {
    height: 100%;
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

.right {
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0;
  .right_top {
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
  .main_table{
    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
    /deep/ .el-pagination{
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
.drawer_user {
  .addForm {
    margin-top: 20px;
    width: 500px;
    padding: 10px 20px;
    .organization_body {
      height: 36px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      .organization_box {
        flex: 1;
        height: 36px;
        border: 1px solid #dfe4ed;
        border-radius: 4px 0 0 4px;
        border-right: 0;
        // background-color: #f6f7fb;
        line-height: 35px;
        .el-tag {
          margin: 2px 0px 2px 6px;
          .el-tag__close {
            background-color: #c0c4cc;
          }
        }
      }
      .organization_search {
        border-radius: 0 4px 4px 0;
      }
    }
  }
  .organization_tree {
    position: absolute;
    right: 20px;
    top: 0;
    height: 100%;
    width: 290px;
    padding-top: 15px;
    padding-bottom: 60px;
    .organization_tree_box {
      height: 100%;
      border: 1px solid #409efe;
      display: flex;
      flex-direction: column;
      background-color: #fbfbfb;
      .el-tree {
        flex: 1;
        background-color: #fbfbfb;
        overflow: auto;
      }
      .organization_fotter {
        border-top: 1px solid #dcdfe6;
        padding: 10px 20px;
        text-align: center;
      }
    }
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
</style>