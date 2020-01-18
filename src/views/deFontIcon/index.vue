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
              @click="fn_append(select_data)"
            >机构</el-button>
            <el-button size="small" type="primary">导入</el-button>
          </div>
          <div class="button_right">
            <el-button
              size="small"
              type="success"
              icon="el-icon-top"
              @click="fn_treeUp(select_node,select_data)"
            ></el-button>
            <el-button
              size="small"
              type="success"
              icon="el-icon-bottom"
              @click="fn_treeDown(select_node,select_data)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="fn_remove(select_node,select_data)"
            ></el-button>
          </div>
        </div>
        <div class="left_mian">
          <div class="left_mian_tree">
            <el-tree
              :key="tree_key"
              :data="tree_data"
              @node-click="fn_handleNodeClick"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              draggable
              accordion
              node-key="id"
              :props="tree_props"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <!-- <i :class="data.icon"></i> -->
                <i class="el-icon-platform-eleme" v-if="data.iconNum===1"></i>
                <i class="el-icon-user" v-else-if="data.iconNum===2"></i>
                <i class="el-icon-star-off" v-else-if="data.iconNum===3"></i>
                <i class="el-icon-message-solid" v-else></i>
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-main class="right">
        <div class="right_top">机构信息</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="ruleForm"
        >
          <div class="form_box1">
            <el-form-item label="机构名称：" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="机构全称：" prop="allAame">
              <el-input v-model="ruleForm.allAame"></el-input>
            </el-form-item>
          </div>
          <div class="form_box1">
            <el-form-item label="上级机构：" prop="superior">
              <el-input v-model="ruleForm.superior" disabled></el-input>
            </el-form-item>
            <el-form-item label="机构编码：" prop="coding">
              <el-input v-model="ruleForm.coding"></el-input>
            </el-form-item>
          </div>
          <div class="form_box2">
            <el-form-item label="备注：" prop="remarks">
              <el-input type="textarea" v-model="ruleForm.remarks" :rows="4"></el-input>
            </el-form-item>
          </div>
          <div class="form_button">
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
          </div>
        </el-form>

        <div class="right_top right_top_search">
          <span>用户信息</span>
          <div class="user_search">
            <el-input
              placeholder="请输入需要检索的人员名称"
              suffix-icon="el-icon-search"
              size="small"
              v-model="user_input"
            ></el-input>
            <el-button size="small" type="primary">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" class="user_table">
          <el-table-column prop="name" label="姓名" min-width="150"></el-table-column>
          <el-table-column prop="department" label="部门" min-width="150"></el-table-column>
          <el-table-column prop="post" label="职位" min-width="150"></el-table-column>
          <el-table-column prop="phone" label="电话" min-width="150"></el-table-column>
          <el-table-column prop="date" label="创建时间" min-width="200"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <el-button type="text" @click="fn_open_userMessage">查看</el-button>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="添加子机构" :visible.sync="dialogVisible" :before-close="resetForm_add">
      <div class="diaologMain">
        <el-form
          :model="ruleForm_add"
          :rules="rules_add"
          ref="ruleForm_add"
          label-width="100px"
          class="ruleForm_add"
        >
          <el-form-item label="机构名称：" prop="name">
            <el-input v-model="ruleForm_add.name"></el-input>
          </el-form-item>
          <el-form-item label="机构全称：" prop="allAame">
            <el-input v-model="ruleForm_add.allAame"></el-input>
          </el-form-item>
          <el-form-item label="上级机构：" prop="superior">
            <el-input v-model="ruleForm_add.superior" disabled></el-input>
          </el-form-item>
          <el-form-item label="机构编码：" prop="coding">
            <el-input v-model="ruleForm_add.coding"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input type="textarea" v-model="ruleForm_add.remarks" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_add('ruleForm_add')">确 定</el-button>
        <el-button @click="resetForm_add('ruleForm_add')">取 消</el-button>
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
            <el-input v-model="userMessage.data.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userMessage.data.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="userMessage.data.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="微信号：">
            <el-input v-model="userMessage.data.WeChat" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="userMessage.data.site" disabled></el-input>
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
                  :key="tag.id"
                  v-for="tag in userMessage.data.role"
                  :disable-transitions="false"
                  type="info"
                >{{tag.label}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="机构：">
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.id"
                  v-for="tag in userMessage.data.organization"
                  :disable-transitions="false"
                  type="info"
                >{{tag.label}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="岗位：">
            <div class="organization_body">
              <div class="organization_box">
                <el-tag
                  :key="tag.id"
                  v-for="tag in userMessage.data.post"
                  :disable-transitions="false"
                  type="info"
                >{{tag.label}}</el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-input v-model="userMessage.data.date" disabled></el-input>
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
  getTreeData,//获取树的数据
} from "@/api/api.js";
export default {
  name: "dept",
  data() {
    return {
      tree_data: [
        {
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
        }
      ],
      // tree_props:{
      //     children: 'children',
      //     label: 'groupName',
      // },
      select_node: null,
      select_data: null,
      tree_key: 0,

      ruleForm: {
        name: "",
        allAame: "",
        superior: "",
        coding: "",
        remarks: ""
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
        coding: [
          {
            required: false,
            message: "请输入机构编码",
            trigger: ["blur", "change"]
          }
        ],
        remarks: [
          {
            required: false,
            message: "请填写备注",
            trigger: ["blur", "change"]
          }
        ]
      },
      user_input: "",

      tableData: [
        {
          name: "stylefeng",
          department: "开发部",
          post: "处长",
          phone: "12312341212",
          date: "2019-8-8 18:26:49",
          status: "正常"
        }
      ],
      
      dialogVisible: false,
      ruleForm_add: {
        name: "",
        allAame: "",
        superior: "",
        coding: "",
        remarks: ""
      },
      rules_add: {
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
        coding: [
          {
            required: false,
            message: "请输入机构编码",
            trigger: ["blur", "change"]
          }
        ],
        remarks: [
          {
            required: false,
            message: "请填写备注",
            trigger: ["blur", "change"]
          }
        ]
      },

      // 用户信息
      userMessage:{
        title: "用户信息",
        size:'600px',
        drawerVisible: false,
        data:{
          name: "小王",
          userName: "xiaowang",
          email: "123456",
          phone: "12312311231",
          WeChat: "aaa111111111",
          site: "北京",
          sex: "男",
          role: [
            {
              label: '超级管理员',
              id: '011'
            },
            {
              label: '部门管理员',
              id: '012'
            }
          ],
          organization: [
            {
              label: '综合处',
              id: '021'
            },
            {
              label: '文秘处',
              id: '022'
            }
          ],
          post: [
            {
              label: '科技部-部门经理',
              id: '031'
            },
            {
              label: '宣传部-部门经理',
              id: '032'
            }
          ],
          date:'2019年8月16日16:42:36'
        },
      }
    };
  },
  computed: {},
  mounted(){
    // this.fn_getTreeData();
  },
  methods: {
    //tree选中
    fn_handleNodeClick(data, node, data3) {
      console.log(data);
      console.log(node);
      console.log(data3);
      this.select_data = data;
      this.select_node = node;
      this.$nextTick(function() {
        this.ruleForm.name = data.label;
        this.ruleForm.superior = node.parent.label;
        this.ruleForm_add.superior = data.label;
      });
    },
    //tree删除
    fn_remove(node, data) {
      if (node === null || node === undefined) {
        this.$message("请选中需要删除的节点");
        return false;
      }
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.select_data = null;
      this.select_node = null;
    },
    //tree增加
    fn_append(data) {
      if (data === null || data === undefined) {
        this.$message("请选中节点");
        return false;
      }
      this.dialogVisible = true;
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
      this.tree_key++;
      this.select_data = null;
      this.select_node = null;
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
      this.tree_key++;
      this.select_data = null;
      this.select_node = null;
    },
    /**
     * 数组元素交换位置
     * @param {array} arr 数组
     * @param {number} index1 添加项目的位置
     * @param {number} index2 删除项目的位置
     * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值
     */
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      console.log(arr);
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
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.select_data.label = this.ruleForm.name;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm_add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addID = new Date().getTime();
          const newChild = {
            id: addID,
            iconNum: this.select_data.iconNum + 1,
            label: this.ruleForm_add.name,
            children: []
          };
          if (!this.select_data.children) {
            this.$set(this.select_data, "children", []);
          }
          this.select_data.children.push(newChild);
          this.dialogVisible = false;
          this.resetForm_add(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm_add(formName) {
      this.$refs.ruleForm_add.resetFields();
      this.dialogVisible = false;
    },
    //获取树的数据
    fn_getTreeData(){
      let param = {
      };
      getTreeData(param)
        .then(response => {
          // console.log(response);
          let arr=this.ListToTree(response);
          console.log(arr);
          this.tree_data=arr;
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
            if (copyList[j].children === undefined) {
              copyList[j].children = [];
            }
            copyList[j].children.push(copyList[i]);
          }
        }
        // 把根节点提取出来，parentId为null的就是根节点
        if (
          copyList[i].parentId === null ||
          copyList[i].parentId === undefined
        ) {
          tree.push(copyList[i]);
        }
      }
      return tree;
    },

    /* 用户信息-start */
      // 打开用户信息
      fn_open_userMessage(){
        this.userMessage.drawerVisible=true;
      },
      // 关闭用户信息
      fn_close_userMessage(){
        this.userMessage.drawerVisible=false;
      }
    /* 用户信息-end */
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
.dept_main{
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
    .ruleForm {
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
    .right_top_search {
      overflow: hidden;
      .user_search {
        float: right;
        .el-input {
          width: 300px;
        }
      }
    }
    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
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
</style>