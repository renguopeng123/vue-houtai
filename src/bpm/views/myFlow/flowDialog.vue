<template>
    <el-dialog v-if="src != null && src != ''" :key="src" ref="flowIframe" class="flowDialog" :visible.sync="visible"
        :fullscreen="true">
        <iframe id="_flowIframe" class="flowIframe" :src="src" frameborder="0" scrolling="no" marginheight="0"
            marginwidth="0" style="width:100%;"></iframe>
    </el-dialog>
</template>


<script>
    export default {
        name: 'flow-dialog',
        props: ['src'],
        data() {
            return {
                visible: false
            }
        },
        mounted() {
            window.flowIframe = this;
        },
        methods: {
            reload() {
                this.$emit('reload');
            },
            onresize(iheight) {
                var iframe = document.getElementById('_flowIframe');
                iframe.style.height = iheight + "px";
            }
        },
        destroyed() {
            console.log("flowIframe组件销毁");
        },
        created: function () {
            console.log("flowIframe组件创建");
        }
    }
</script>


<style lang="scss">
    .flowDialog {

        .is-fullscreen {
            background-color: #eeeeee;
        }

        .el-dialog__header {
            padding: 0px;
        }

        .el-dialog__body {
            padding: 0px;
        }

        .el-dialog__headerbtn {
            top: 13px;

            .el-dialog__close {
                border-radius: 50%;
                padding: 3px;
                color: #fff;
                background-color: #f56c6c;
                border-color: #f56c6c;
            }

            .el-dialog__close:focus,
            .el-dialog__close:hover {
                background: #f78989;
                border-color: #f78989;
            }
        }

        .flowIframe {
            min-height: 500px;
        }

    }
</style>