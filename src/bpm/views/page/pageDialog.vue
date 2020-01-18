<template>
    <el-dialog v-if="src != null && src != ''" :key="src" ref="pageIframe" class="pageDialog" :visible.sync="visible"
        :fullscreen="true">
        <iframe id="_pageIframe" class="pageIframe" :src="src" frameborder="0" scrolling="no" marginheight="0"
            marginwidth="0" style="width:100%;"></iframe>
    </el-dialog>
</template>


<script>
    export default {
        name: 'page-dialog',
        props: ['src'],
        data() {
            return {
                visible: false
            }
        },
        mounted() {
            window.pageIframe = this;
        },
        methods: {
            reload() {
                this.$emit('reload');
            },
            onresize(iheight) {
                var iframe = document.getElementById('_pageIframe');
                iframe.style.height = iheight + "px";
            }
        },
        destroyed() {
            console.log("pageIframe组件销毁");
        },
        created: function () {
            console.log("pageIframe组件创建");
        }
    }
</script>


<style lang="scss">
    .pageDialog {

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

        .pageIframe {
            min-height: 500px;
        }

    }
</style>