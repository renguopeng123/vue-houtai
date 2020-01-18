<template>
  <div class="views-container">
    <el-container style="height: 100%;" class="dept_main">
      <el-aside width="393px" class="left">
        <div class="left_top">
          <div class="button_left">
            <el-button
              size="small"
              type="success"
              icon="el-icon-plus"
              @click="fn_append(tree.select_data)"
            >机构</el-button>
            <el-button size="small" type="primary">导入</el-button>
          </div>
          <div class="button_right">
            <el-button
              size="small"
              type="success"
              icon="el-icon-top"
              @click="fn_treeUp(tree.select_node,tree.select_data)"
            ></el-button>
            <el-button
              size="small"
              type="success"
              icon="el-icon-bottom"
              @click="fn_treeDown(tree.select_node,tree.select_data)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="fn_remove(tree.select_node,tree.select_data)"
            ></el-button>
          </div>
        </div>
        <div class="left_mian">
          <div class="left_mian_tree">
            <el-tree
              ref="tree"
              :key="tree.key"
              :data="tree.data"
              @node-click="fn_handleNodeClick"
              default-expand-all
              :highlight-current='true'
              :expand-on-click-node="false"
              draggable
              accordion
              node-key="id"
              :props="tree.props"
              :allow-drop="allowDrop"
              @node-drop="handleDrop"
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
        </div>
      </el-aside>
      <el-main class="right">
        <div class="right_top">机构信息</div>
        <!-- 编辑树节点 -->
        <el-form
          :model="form_edit.data"
          :rules="form_edit.rules"
          ref="form_edit"
          label-width="100px"
          class="form_edit"
        >
          <div class="form_box1">
            <el-form-item label="机构名称：" prop="name">
              <el-input v-model="form_edit.data.name"></el-input>
            </el-form-item>
            <el-form-item label="组织类型：" prop="type">
              <el-select v-model="form_edit.data.type" placeholder="请选择活动区域">
                <el-option label="集团" value="0"></el-option>
                <el-option label="公司" value="1"></el-option>
                <el-option label="部门" value="3"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="机构全称：" prop="allAame">
              <el-input v-model="form_edit.data.allAame"></el-input>
            </el-form-item> -->
          </div>
          <div class="form_box1">
            <el-form-item label="上级机构：" prop="superior">
              <el-input v-model="form_edit.data.superior" disabled></el-input>
            </el-form-item>
            <el-form-item label="机构编码：" prop="code">
              <el-input v-model="form_edit.data.code"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="form_box1">
            <el-form-item label="组织类型：" prop="type">
              <el-select v-model="form_edit.data.type" placeholder="请选择活动区域">
                <el-option label="集团" value="0"></el-option>
                <el-option label="公司" value="1"></el-option>
                <el-option label="部门" value="3"></el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <div class="form_box2">
            <el-form-item label="备注：" prop="description">
              <el-input type="textarea" v-model="form_edit.data.description" :rows="4"></el-input>
            </el-form-item>
          </div>
          <div class="form_button">
            <el-button size="small" type="primary" @click="submitForm()">确定</el-button>
            <el-button size="small" @click="resetForm()">取消</el-button>
          </div>
        </el-form>

        <div class="right_table">
          <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">

            <template  v-slot:top_left>
              <span>用户信息</span>
            </template>

            <template  v-slot:top_button_left>
              <el-input
                placeholder="请输入需要检索的人员名称"
                suffix-icon="el-icon-search"
                size="small"
                style="width:300px"
                v-model="table.search_value"
              ></el-input>
              <el-button size="small" type="primary" @click="fn_search_click">查询</el-button>
            </template>

            <template  v-slot:status="slotProps">
              <span>{{slotProps.row.status===0?'禁用':'正常'}}</span>
            </template>
            <template  v-slot:doed="slotProps">
              <el-button type="text" @click="fn_open_userMessage(slotProps.row.userId)">查看</el-button>
            </template>
          </tableComment>
        </div>
      </el-main>
    </el-container>

    <!-- 添加子机构 -->
    <el-dialog title="添加子机构" :visible.sync="form_add.dialogVisible" :before-close="resetForm_add">
      <div class="diaologMain">
        <el-form
          :model="form_add.data"
          :rules="form_add.rules"
          ref="form_add"
          label-width="100px"
          class="form_add"
        >
          <el-form-item label="机构名称：" prop="name">
            <el-input v-model="form_add.data.name"></el-input>
          </el-form-item>
          <el-form-item label="组织类型：" prop="type">
              <el-select v-model="form_add.data.type" placeholder="请选择活动区域">
                <el-option label="集团" value="0"></el-option>
                <el-option label="公司" value="1"></el-option>
                <el-option label="部门" value="3"></el-option>
              </el-select>
            </el-form-item>
          <!-- <el-form-item label="机构全称：" prop="allAame">
            <el-input v-model="form_add.data.allAame"></el-input>
          </el-form-item> -->
          <el-form-item label="上级机构：" prop="superior">
            <el-input v-model="form_add.data.superior" disabled></el-input>
          </el-form-item>
          <el-form-item label="机构编码：" prop="code">
            <el-input v-model="form_add.data.code"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="description">
            <el-input type="textarea" v-model="form_add.data.description" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_add()">确 定</el-button>
        <el-button @click="resetForm_add()">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 用户信息 -->
    <el-drawer
      :title="userMessage.title"
      :size="userMessage.size"
      :visible.sync="userMessage.drawerVisible"
      direction="rtl"
      class="drawer drawer_userMessage"
      :before-close="fn_close_userMessage"
    >
      <div class="drawer_main">
        <el-form
          :model="userMessage.data"
          ref="form_userMessage"
          label-width="110px"
          class="form_userMessage"
        >
          <el-form-item label="姓名：">
            <el-input v-model="userMessage.data.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input v-model="userMessage.data.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userMessage.data.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="userMessage.data.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="微信号：">
            <el-input v-model="userMessage.data.weixin" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="userMessage.data.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="userMessage.data.sex" disabled>
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色：" disabled>
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.name"
                  v-for="tag in userMessage.data.roles"
                  :disable-transitions="false"
                  type="info"
                >{{tag.name}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="机构：">
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.name"
                  v-for="tag in userMessage.data.organizations"
                  :disable-transitions="false"
                  type="info"
                >{{tag.name}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="岗位：">
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.name"
                  v-for="tag in userMessage.data.duties"
                  :disable-transitions="false"
                  type="info"
                >{{tag.name}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-input v-model="userMessage.data.createTime" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="drawer_footer">
        <el-button @click="fn_close_userMessage">关 闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getTreeData, //获取树的数据
  tree_save, //新增修改树节点
  tree_remove, //删除树节点
  tree_changeOrder, //修改树节点顺序
  queryGroupUser, //查询选中机构下的用户
  getUserInfo, //用户详情
} from "@/api/api.js";
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
export default {
  components: {
    tableComment
  },
  name: "dept",
  data() {
    return {
      // 树的数据
      tree:{
        data: [
          {
            children: [
              {
                children: [
                  {
                    children: "",
                    chkDisabled: false,
                    click: true,
                    code: "10101",
                    description: "",
                    icon: "",
                    id: "1161879264967012354",
                    name: "大数据室验室",
                    nocheck: false,
                    parentId: "1161878692905889794",
                    sn: 1,
                    title: "大数据室验室",
                    type: "",
                    userOrgRelationDtoList: ""
                  },
                  {
                    children: "",
                    chkDisabled: false,
                    click: true,
                    code: "11111111111111",
                    description: "",
                    icon: "",
                    id: "1161871111111111111111111",
                    name: "OA",
                    nocheck: false,
                    parentId: "1161878692905889794",
                    sn: 1,
                    title: "OA",
                    type: "",
                    userOrgRelationDtoList: ""
                  },
                  {
                    children: "",
                    chkDisabled: false,
                    click: true,
                    code: "222222222222222",
                    description: "",
                    icon: "",
                    id: "11618722222222222222211111",
                    name: "1DATA",
                    nocheck: false,
                    parentId: "1161878692905889794",
                    sn: 1,
                    title: "1DATA",
                    type: "",
                    userOrgRelationDtoList: ""
                  }
                ],
                chkDisabled: false,
                click: true,
                code: "10100",
                description: "",
                icon: "",
                id: "1161878692905889794",
                name: "长城软件",
                nocheck: false,
                parentId: "1",
                sn: 1,
                title: "长城软件",
                type: "",
                userOrgRelationDtoList: ""
              }
            ],
            chkDisabled: false,
            click: true,
            code: "10000",
            description: "",
            icon: "",
            id: "1",
            name: "中国软件 ",
            nocheck: false,
            parentId: "0",
            sn: 1,
            title: "中国软件 ",
            type: "",
            userOrgRelationDtoList: ""
          }
        ],
        props: {
          children: "children",
          label: "name"
        },
        select_node: null,
        select_data: null,
        key: 0,
      },

      // 编辑树节点
      form_edit:{
        data: {
          name: "",
          allAame: "",
          superior: "",
          code: "",
          type:'',
          description: ""
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入机构名称",
              trigger: ["blur", "change"]
            }
          ],
          allAame: [
            {
              required: false,
              message: "请输入机构全称",
              trigger: ["blur", "change"]
            }
          ],
          superior: [
            {
              required: false,
              message: "请输入上级机构",
              trigger: ["blur", "change"]
            }
          ],
          code: [
            {
              required: false,
              message: "请输入机构编码",
              trigger: ["blur", "change"]
            }
          ],
          type: [
            { required: false, message: '请选择组织类型', trigger: 'change' }
          ],
          description: [
            {
              required: false,
              message: "请填写备注",
              trigger: ["blur", "change"]
            }
          ]
        },
      },

      // 表格数据
      table: {
        // 表格数据
        data: [
          // {
            // name: "stylefeng",
            // orgName: "开发部",
            // mobile: "12312341212",
            // createTime: "2019-8-8 18:26:49",
            // status: "正常",//1正常，0禁用
          // }
        ],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "name", //列的属性
            label: "姓名", //列的表头名字
            width: "", //列的宽度
            minWidth: "150", //列的最小宽度
            disabled: true, //列是否能控制显示隐藏
            sortable:true,//列是否排序
          },
          {
            key: "orgName",
            label: "部门",
            width: "",
            minWidth: "150",
            disabled: false
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
            minWidth: "100",
            disabled: true
          },
          {
            key: "doed",
            label: "操作",
            width: "",
            minWidth: "100",
            disabled: true
          }
        ],
        // 默认显示的列
        table_if: ["name", "orgName", "mobile", "createTime", "status","doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 0
        },
        search_value:'',
      },

      // 新增树节点
      form_add:{
        dialogVisible: false,
        data: {
          name: "",
          allAame: "",
          superior: "",
          code: "",
          type:'',
          description: ""
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入机构名称",
              trigger: ["blur", "change"]
            }
          ],
          allAame: [
            {
              required: false,
              message: "请输入机构全称",
              trigger: ["blur", "change"]
            }
          ],
          superior: [
            {
              required: false,
              message: "请输入上级机构",
              trigger: ["blur", "change"]
            }
          ],
          code: [
            {
              required: false,
              message: "请输入机构编码",
              trigger: ["blur", "change"]
            }
          ],
          type: [
            { required: false, message: '请选择组织类型', trigger: 'change' }
          ],
          description: [
            {
              required: false,
              message: "请填写备注",
              trigger: ["blur", "change"]
            }
          ]
        },
      },

      // 用户信息
      userMessage: {
        title: "用户信息",
        size: "600px",
        drawerVisible: false,
        data: {
          name: "小王",
          account: "xiaowang",
          email: "123456",
          mobile: "12312311231",
          weixin: "aaa111111111",
          address: "北京",
          sex: "男",
          roles: [
            {
              label: "超级管理员",
              id: "011"
            },
            {
              label: "部门管理员",
              id: "012"
            }
          ],
          organizations: [
            {
              label: "综合处",
              id: "021"
            },
            {
              label: "文秘处",
              id: "022"
            }
          ],
          duties: [
            {
              label: "科技部-部门经理",
              id: "031"
            },
            {
              label: "宣传部-部门经理",
              id: "032"
            }
          ],
          createTime: "2019年8月16日16:42:36"
        }
      }
    };
  },
  computed: {},
  mounted() {
    this.fn_getTreeData();
  },
  methods: {
    /* tree操作-start */
      //获取树的数据
      fn_getTreeData() {
        let param = {};
        getTreeData(param)
          .then(response => {
            // console.log(response);
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
            copyList[i].parentId === 0
          ) {
            tree.push(copyList[i]);
          }
        }
        return tree;
      },
      //tree选中
      fn_handleNodeClick(data, node, data3) {
        // console.log(node);
        this.tree.select_data = data;
        this.tree.select_node = node;
        this.$nextTick(function() {
          this.form_edit.data = data;
          this.form_edit.data.superior = node.parent.label;
          this.form_add.data.superior = data.name;
        });
        // 获取列表数据
        this.table.search_value='';
        this.table.page.currentPage=1;
        this.table.page.pageSize=100;
        this.fn_queryGroupUser();
      },
      //tree删除
      fn_remove(node, data) {
        if (node === null || node === undefined) {
          this.$message("请选中需要删除的节点");
          return false;
        }
        this.$confirm('删除组织会级联删除下属组织，确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fn_tree_remove();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
        // this.tree.select_data = null;
        // this.tree.select_node = null;
      },
      fn_tree_remove() {
        let param = {
          id:this.tree.select_data.id
        };
        tree_remove(param)
          .then(response => {
            // console.log(response);
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.fn_getTreeData();
          })
          .catch(errors => {
            console.error(errors);
          });
      },

      //tree上移
      fn_treeUp(node, data) {
        if (node === null || node === undefined) {
          this.$message("请选中需要移动的节点");
          return false;
        }
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        this.zIndexUp(children, index, children.length);

        let arr=[];
        for (let index = 0; index < children.length; index++) {
          children[index].sn=index+1;
          arr.push({
            id:children[index].id,
            sn:index+1,
          })
        }
        this.fn_tree_changeOrder(arr);

        this.tree.key++;
        
        // this.tree.select_data = null;
        // this.tree.select_node = null;
      },
      //tree下移
      fn_treeDown(node, data) {
        if (node === null || node === undefined) {
          this.$message("请选中需要移动的节点");
          return false;
        }
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        this.zIndexDown(children, index, children.length);

        let arr=[];
        for (let index = 0; index < children.length; index++) {
          children[index].sn=index+1;
          arr.push({
            id:children[index].id,
            sn:index+1,
          })
        }
        this.fn_tree_changeOrder(arr);

        this.tree.key++;
        // this.tree.select_data = null;
        // this.tree.select_node = null;
      },
      // 修改树节点顺序
      fn_tree_changeOrder(arr) {
        let param = arr;
        console.log(param);
        tree_changeOrder(param)
          .then(response => {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.$nextTick(function(){
              this.$refs['tree'].setCurrentKey(this.tree.select_data.id);
            })
            // this.fn_getTreeData();
          })
          .catch(errors => {
            console.error(errors);
          });
      },

      //拖拽控制
      allowDrop(draggingNode, dropNode, type){
        if(draggingNode.level === dropNode.level){
          if(draggingNode.parent.id === dropNode.parent.id){
            return type === 'prev'
          }
        }else{
          // 不同级进行处理
          // this.$message({
          //   message: '不能跨级拖拽',
          //   type: 'warning'
          // });
          //  this.$message.error('不能跨级拖拽');
        }
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        // console.log('tree drop: ', dropNode.label, dropType);
        console.log(dropNode);
        const parent = dropNode.parent;
        const children = parent.data.children || parent.data;
        let arr=[];
        for (let index = 0; index < children.length; index++) {
          children[index].sn=index+1;
          arr.push({
            id:children[index].id,
            sn:index+1,
          })
        }
        // console.log(arr);
        // console.log(children);
        this.fn_tree_changeOrder(arr);
      },
    /* tree操作-end */

    /* 数组元素交换位置-start */
      /**
       * 数组元素交换位置
       * @param {array} arr 数组
       * @param {number} index1 添加项目的位置
       * @param {number} index2 删除项目的位置
       * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值
       */
      swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        // console.log(arr);
        return arr;
      },
      //元素后移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
      zIndexDown(arr, index, length) {
        if (index + 1 != length) {
          this.swapArray(arr, index, index + 1);
        } else {
          this.$message("已经处于置底，无法下移");
        }
      },
      //元素前移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
      zIndexUp(arr, index, length) {
        if (index != 0) {
          this.swapArray(arr, index, index - 1);
        } else {
          this.$message("已经处于置顶，无法上移");
        }
      },
    /* 数组元素交换位置-end */

    /* 编辑节点-start */
      //表单验证
      submitForm(formName) {
        this.$refs.form_edit.validate(valid => {
          if (valid) {
            if (this.tree.select_node === null || this.tree.select_node === undefined) {
              this.$message("请选中需要编辑的节点");
              return false;
            }
            this.fn_tree_save();
            this.tree.select_data.name = this.form_edit.data.name;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 清空表单
      resetForm() {
        this.$refs.form_edit.resetFields();
      },
      
      //编辑树的节点
      fn_tree_save() {
        let param = {
          code:this.form_edit.data.code,//机构编码
          description:this.form_edit.data.description,//备注
          id:this.form_edit.data.id,//节点ID，新增可为空
          name:this.form_edit.data.name,//节点名称
          parentId:this.form_edit.data.parentId,//父节点ID
          sn:this.form_edit.data.sn,//当前层级所在下标
          type:this.form_edit.data.type,//类型：0集团，1公司，3部门
        };
        // console.log(param);
        tree_save(param)
          .then(response => {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.tree.key++;
          })
          .catch(errors => {
            console.error(errors);
          });
      },
    /* 编辑节点-end */

    /* 新增节点-start */
      //打开新增窗口
      fn_append(data) {
        if (data === null || data === undefined) {
          this.$message("请选中节点");
          return false;
        }
        this.form_add.dialogVisible = true;
      },
      // 点击确定
      submitForm_add(formName) {
        this.$refs.form_add.validate(valid => {
          if (valid) {
            /* let addID = new Date().getTime();
            const newChild = {
              id: addID,
              name: this.form_add.data.name,
              sn:this.tree.select_node.parent.childNodes.length,
              children: []
            };
            if (!this.tree.select_data.children) {
              this.$set(this.tree.select_data, "children", []);
            }
            this.tree.select_data.children.push(newChild);
            this.form_add.dialogVisible = false;
            this.resetForm_add(formName); */

            this.fn_tree_add();
            this.resetForm_add();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //新增树的节点
      fn_tree_add() {
        let param = {
          code:this.form_add.data.code,//机构编码
          description:this.form_add.data.description,//备注
          // id:this.form_add.data.id?this.form_add.data.id:'',//节点ID，新增可为空
          name:this.form_add.data.name,//节点名称
          parentId:this.tree.select_data.id,//父节点ID
          sn:this.tree.select_node.childNodes?this.tree.select_node.childNodes.length+1:1,//当前层级所在下标
          type:this.form_add.data.type,//类型：0集团，1公司，3部门
        };
        // console.log(param);
        tree_save(param)
          .then(response => {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.fn_getTreeData();
          })
          .catch(errors => {
            console.error(errors);
          });
      },
      resetForm_add(formName) {
        this.$refs.form_add.resetFields();
        this.form_add.dialogVisible = false;
      },
    /* 新增节点-end */

    /* 用户信息-start */
      // 打开用户信息
      fn_open_userMessage(userId) {
        this.userMessage.drawerVisible = true;
        this.fn_getUserInfo(userId);
      },
      // 关闭用户信息
      fn_close_userMessage() {
        this.userMessage.drawerVisible = false;
      },
      //获取用户信息
      fn_getUserInfo(userId){
        let param={
          userId:userId
        };
        getUserInfo(param).then(response => {
          this.userMessage.data=response.data;
          // console.log(response);
        }).catch(errors => {
          console.error(errors);
        });
      },
    /* 用户信息-end */

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
    /* 表格操作-end */
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
.dept_main {
  .left {
    position: relative;
    .left_top {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      background-color: #fff;
      width: 100%;
      height: 57px;
      padding-top: 14px;
      padding-bottom: 11px;
      overflow: hidden;
      /deep/ i {
        font-weight: bold;
      }
      .button_left {
        float: left;
      }
      .button_right {
        float: right;
        /deep/ .el-button {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
    .left_mian {
      box-sizing: border-box;
      height: 100%;
      padding-top: 57px;
      // overflow: hidden;
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
        // border: 1px solid #dcdfe6;
        // border-radius: 3px;
      }
    }
  }
  .right {
    width: 100%;
    margin-left: 32px;
    margin-right: 10px;
    padding: 0;
    .right_top {
      height: 57px;
      line-height: 57px;
      padding-left: 20px;
      border-bottom: 2px solid #dcdfe6;
    }
    .form_edit {
      padding: 20px 60px 0;
      .form_box1 {
        overflow: hidden;
        .el-form-item {
          float: left;
          width: 50%;
          padding-right: 5%;
        }
        .el-form-item + .el-form-item {
          float: left;
          width: 50%;
          padding-right: 0;
          padding-left: 5%;
        }
      }
      .form_button {
        text-align: center;
      }
    }
    .right_table{
      margin-top: 60px;
      /deep/ .table_comment{
        .main_top{
          height: 57px;
          line-height: 57px;
          padding-left: 20px;
          border-bottom: 2px solid #dcdfe6;
          .select_help_btn{
            line-height: 57px;
          }
        }
        .main_table{
          margin-top: 20px;
        }
      }
    }
  }
}

// 弹窗样式
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
    .diaologMain {
      padding: 20px 50px;
    }
  }
  > .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}

// 抽屉样式
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

// 用户信息
.form_userMessage {
  margin-top: 20px;
  width: 500px;
  padding: 10px 20px;
  /deep/ .el-input.is-disabled .el-input__inner {
    // background-color: #F5F7FA;
    // border-color: #dfe4ed;
    color: #909399;
    // cursor: not-allowed;
  }
  .organization_body {
    height: 36px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .organization_box {
      flex: 1;
      height: 36px;
      // border: 1px solid #dfe4ed;
      // border-radius: 4px;
      // background-color: #f6f7fb;
      line-height: 35px;
      .el-tag {
        margin: 2px 0px 2px 6px;
      }
    }
    .organization_search {
      border-radius: 0 4px 4px 0;
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