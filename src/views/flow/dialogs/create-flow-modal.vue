<template>
    <!--对话框-创建项目-->
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            @close='closeCreateDialog'
            class="flow-create-dialog"
            top="10vh">
        <div class="project-dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item size="mini" label="流程分类：" prop="typeId">
                    <el-select v-model="ruleForm.typeId" placeholder="请选择">
                        <el-option
                                v-for="item in treeData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="流程名称：" prop="name">
                    <el-input style="width: 80%" v-model="ruleForm.name" placeholder="请输入流程名称"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="流程KEY：" prop="key">
                    <el-input style="width: 80%" v-model="ruleForm.key" placeholder="请输入流程KEY"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="描述：" prop="desc">
                    <el-input style="width: 80%" v-model="ruleForm.desc" placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button size="mini" plain @click="dialogVisible = false">取消</el-button>
            <el-button size="mini" @click="addFlowData" type="primary">创建</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { addFlow, fetchSysTreeNode } from "@/api/api.js";
    import qs from "qs";
    export default {
        name: "flow-create-dialog",
        props: {
            //对话框标题
            title: {
                type: String,
                default: ""
            },
            visible: {
                type: Boolean,
                required: true
            },
        },
        data() {
            return {
                treeData: [],
                ruleForm: {
                    typeId: '',
                    name: '',
                    key: '',
                    desc: '',
                },
                rules: {
                    typeId: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    key: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                },
            };
        },
        methods: {
            // 创建流程定义
            addFlowData() {
                // 项目名称校验
                if (this.ruleForm.typeId == "") {
                    this.$message.error("请输入流程分类！");
                    return;
                }
                if (this.ruleForm.name == "") {
                    this.$message.error("请输入流程名称！");
                    return;
                }
                if (this.ruleForm.key == "") {
                    this.$message.error("请输入流程KEY！");
                    return;
                }
                if (this.ruleForm.desc == "") {
                    this.$message.error("请输入描述！");
                    return;
                }
                let param = {
                    typeId: this.ruleForm.typeId,
                    name: this.ruleForm.name,
                    key: this.ruleForm.key,
                    desc: this.ruleForm.desc
                };
                addFlow(qs.stringify(param)).then(response => {
                    if(response.code === '200') {
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                    this.$emit("operationSuccess");
                    this.dialogVisible = false;
                }
                }).catch(errors => {
                    console.error(errors);
            });

            },
            // 获取选择框的数据
            fn_getTreeData() {
                let param = {
                    treeKey: 'flow',
                    nodeKey: '',
                };
                fetchSysTreeNode(qs.stringify(param)).then(response => {
                    this.treeData = response;
            })
            .catch(errors => {
                    console.error(errors);
            });
            },
            // 关闭模态窗
            closeCreateDialog() {
                this.ruleForm.typeId = "",
                this.ruleForm.name = "",
                this.ruleForm.key = "",
                this.ruleForm.desc = ""
            }
        },
        computed: {
            dialogVisible: {
                get() {
                    return this.visible;
                },
                set(val) {
                    this.$emit("update:visible", val);
                }
            }
        },
        mounted() {
            this.fn_getTreeData();
        }
    };
</script>

<style scoped lang="scss">
    .project-dialog {
        width: auto;
        height: 200px;
        padding-top: 10px;
    }
    .project-dialog /deep/ .el-form-item__label {
        color: #000;
        font-size: 14px;
        font-weight: normal;
    }
</style>