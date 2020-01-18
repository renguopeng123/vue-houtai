<template>
  <div class="views-container">
    <el-container style="height: 100%;">
      <el-aside width="230px" class="left">
        <div class="left_top">资源管理</div>
        <div class="left_mian">
          <el-select v-model="leftMenuicon" @change="leftMenuiconChange()" placeholder="请选择">
            <el-option
              v-for="item in leftMenuicons"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="left_mian_tree" v-if="this.leftMenuicon==='业务流程平台'">
            <el-tree
              :key="tree_key"
              :data="tree_data"
              @node-click="fn_handleNodeClick"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              draggable
              accordion
              node-key="id">
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
          <div class="left_mian_tree" v-if="this.leftMenuicon==='门户平台'">
            <el-tree
              :key="tree_key"
              :data="tree_datab"
              @node-click="fn_handleNodeClick"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              draggable
              accordion
              node-key="id">
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
        <div class="right_top">详细信息</div>
        <el-form ref="form" :model="ruleForm" label-width="180px">
            <el-form-item label="资源别名">
                <el-input v-model="ruleForm.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="资源名">
                <el-input v-model="ruleForm.resourceName" readonly></el-input>
            </el-form-item>
            <el-form-item label="默认地址">
                <el-input v-model="ruleForm.defaultAddress" readonly></el-input>
            </el-form-item>
            <el-form-item label="启用">
                <el-input v-model="ruleForm.startUsing" readonly></el-input>
            </el-form-item>
            <el-form-item label="默认展开">
                <el-input v-model="ruleForm.defaltOpen" readonly></el-input>
            </el-form-item>
            <el-form-item label="字体图标">
                <el-input v-model="ruleForm.iconFont" readonly></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="ruleForm.rType" readonly></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="ruleForm.sort" readonly></el-input>
            </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "dept",
  data() {
    return {
      tree_data: [
        {
          id: "1",
          label: "业务流程平台",
          icon: "el-icon-platform-eleme",
          iconNum: 1,
          children: [
            {
              id: "1_1",
              label: "个人办公",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "事项办理",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "我的抄送",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "待办事项",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "办理历史",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                },
                {
                  id: "1_1_2",
                  label: "事项申请",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "我的草稿",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "发起申请",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "申请历史",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_4",
                    label: "流程代理",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_5",
                    label: "代理记录",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                },
                {
                  id: "1_1_3",
                  label: "我的日程",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_4",
                  label: "日程管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                }
              ]
            },
            {
              id: "1_2",
              label: "流程管理",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "任务列表",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_2",
                  label: "流程列表",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_3",
                  label: "流程实例",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_4",
                  label: "流程实例-部门",
                  icon: "el-icon-star-off",
                  iconNum: 3
                }
              ]
            },
            {
              id: "1_3",
              label: "用户组织",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "用户管理",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "添加",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "编辑",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "删除",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_4",
                    label: "搜索",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                },
                {
                  id: "1_1_2",
                  label: "组织管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_3",
                  label: "角色管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                }
              ]
            },
            {
              id: "1_4",
              label: "表单管理",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "业务对象",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "业务实体",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "业务对象",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                },
                {
                  id: "1_1_2",
                  label: "表单定义",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "VUE表单",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "业务表单",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "手机表单",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_4",
                    label: "表单模板",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                }
              ]
            },
            {
              id: "1_5",
              label: "系统配置",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "系统设置",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "资源管理",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "国家节假日",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "系统数据源模板",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_4",
                    label: "数据字典",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_5",
                    label: "系统属性管理",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_6",
                    label: "系统数据源",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_7",
                    label: "子系统管理",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_8",
                    label: "工作台管理",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                },
                {
                  id: "1_1_2",
                  label: "开发辅助",
                  icon: "el-icon-star-off",
                  iconNum: 3,
                  children:[{
                    id: "1_1_1_1",
                    label: "流水号",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_2",
                    label: "常用脚本",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_3",
                    label: "自定义对话框",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_4",
                    label: "组合对话框",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_5",
                    label: "系统树",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_6",
                    label: "异常日志",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  },
                  {
                    id: "1_1_1_7",
                    label: "字体图标",
                    icon: "el-icon-folder",
                    iconNum: 4,
                  }]
                }]
            }]
        }
      ],
      tree_datab: [
        {
          id: "1",
          label: "门户平台",
          icon: "el-icon-platform-eleme",
          iconNum: 1,
          children: [
            {
              id: "1_1",
              label: "用户组织",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "用户管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_2",
                  label: "组织管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_3",
                  label: "角色管理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                }
              ]
            },
            {
              id: "1_2",
              label: "个人办公",
              icon: "el-icon-user",
              iconNum: 2,
              children: [
                {
                  id: "1_1_1",
                  label: "事项办理",
                  icon: "el-icon-star-off",
                  iconNum: 3
                },
                {
                  id: "1_1_2",
                  label: "事项申请",
                  icon: "el-icon-star-off",
                  iconNum: 3
                }
              ]
            }
          ]
        }
      ],

      select_node: null,
      select_data: null,

      tree_key: 0,
      leftMenuicon:"业务流程平台",
      leftMenuicons:[{
        value: '业务流程平台',
        label: '业务流程平台'
      }, {
        value: '门户平台',
        label: '门户平台'
      }],

      ruleForm: {
        name: "",
        resourceName: "",
        defaultAddress: "",
        startUsing: "",
        defaltOpen: "",
        iconFont:"",
        rType:"",
        sort:""
      },
      
    };
  },
  computed: {},
  methods: {
    //tree选中
    fn_handleNodeClick(data, node, data3) {
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

      // let addID = new Date().getTime();
      // const newChild = {
      //   id: addID,
      //   iconNum: data.iconNum + 1,
      //   label: "新增节点",
      //   children: []
      // };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
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
    //下拉选项值变化
    leftMenuiconChange(){
      // this.leftMenuicon=item.value;
      console.log("aaa",this.leftMenuicon);
    },
    
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
.left {
  position: relative;
  .left_top {
    width: 100%;
    padding-left: 5%;
    height: 57px;
    line-height: 57px;
    background: linear-gradient(to bottom,#f5f5f5 0,#e6e5e5 100%);
    color: #0E2D5F;
    font-weight: bold;
  }
  .left_mian {
    box-sizing: border-box;
    height: 100%;
    // overflow: hidden;
    .left_mian_tree {
      height: 100%;
      position: relative;
      background-color: #fbfbfb;
      border-top: 1px solid #dcdfe6;
      border-radius: 3px;
      padding-top: 10px;
    }
    /deep/ .el-tree {
      background-color: #fbfbfb;
      // border: 1px solid #dcdfe6;
      // border-radius: 3px;
    }
    /deep/ .el-input__inner{
      border: none;
    }
  }
}
.right {
  width: 100%;
  margin-right: 10px;
  padding: 0;
  .right_top {
    height: 57px;
    line-height: 57px;
    padding-left: 20px;
    background: linear-gradient(to bottom,#f5f5f5 0,#e6e5e5 100%);
    border-bottom: 1px solid #dcdfe6;
  }
  /deep/ .el-form {
    padding: 30px 60px;
    background-color: #f7f7f7;
    /deep/ .el-form-item {
      width: 90%;
      padding-right: 5%;
    }
  }
}
</style>