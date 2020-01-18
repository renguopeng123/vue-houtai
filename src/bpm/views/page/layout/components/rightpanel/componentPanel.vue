<template>
    <el-collapse :accordion="false" class="attribute-panel" v-model="componentsActiveNames">

        <el-collapse-item name="field" class="el-collapse-item-field">
            <template slot="title">
                <svg-icon :style="{color:color}" class="svg-icon" icon-class="table" /> 字段属性
            </template>
            <div v-if="activeComponent != null && activeComponent != '' && businessColumn[activeComponent] != null">

                <el-form size="mini" label-width="70px">
                    <el-form-item label="字段备注：">
                        <el-input :disabled="true" :value="businessColumn[activeComponent].comment"></el-input>
                    </el-form-item>
                    <el-form-item label="字段标识：">
                        <el-input :disabled="true" :value="businessColumn[activeComponent].key"></el-input>
                    </el-form-item>
                    <el-form-item label="字段类型：">
                        <el-input :disabled="true" :value="businessColumn[activeComponent].type"></el-input>
                    </el-form-item>
                    <el-form-item label="字段长度：">
                        <el-input :disabled="true" :value="businessColumn[activeComponent].length"></el-input>
                    </el-form-item>
                </el-form>

            </div>
            <div class="no-attribute" v-else>
                未选择组件
            </div>
        </el-collapse-item>

        <el-collapse-item
            v-if="activeComponent != null && activeComponent != '' && businessColumn[activeComponent] != null"
            name="control" class="el-collapse-item-control">

            <template slot="title">
                <svg-icon :style="{color:color}" class="svg-icon" icon-class="component" /> 组件属性
            </template>

            <el-form size="mini" label-width="70px">
                <el-form-item label="组件类型：">
                    <el-input :disabled="true" :value="column_type[businessColumn[activeComponent].ctrl.type]">
                    </el-input>
                </el-form-item>
                <el-form-item label="版本：">
                    <el-input :disabled="true" :value="businessColumn[activeComponent].ctrl.version"></el-input>
                </el-form-item>
                <el-form-item label="校验规则：">
                    <el-input class="valid-rule-textarea" type="textarea" :rows="1" :disabled="true"
                        :value="getRule (businessColumn[activeComponent].ctrl.validRule)">
                    </el-input>
                </el-form-item>

                <!-- 这里使用动态组件，根据选中组件的类型切换 -->
                <component v-bind:is="currentTabComponent()"></component>
            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        column_type
    } from '@/bpm/views/page/global'
    import {
        getRuleTitle
    } from '@/bpm/views/page/function'

    import panel_onetext from './onetext'
    import panel_hidden from './hidden'
    import panel_multitext from './multitext'
    import panel_select from './select'
    import panel_checkbox from './checkbox'
    import panel_radio from './radio'
    import panel_dic from './dic'
    import panel_serialno from './serialno'
    import panel_date from './date'
    import panel_file from './file'

    export default {
        name: 'component-panel',
        data() {
            return {
                componentsActiveNames: ["field", "control"],
                'column_type': column_type
            }
        },
        components: {
            panel_onetext,
            panel_hidden,
            panel_multitext,
            panel_select,
            panel_checkbox,
            panel_radio,
            panel_dic,
            panel_serialno,
            panel_date,
            panel_file
        },
        computed: {
            color() {
                return this.$store.state.settings.theme;
            },
            ...mapGetters([
                "activeComponent", "businessColumn"
            ])
        },
        methods: {
            currentTabComponent() {
                return "panel_" + this.businessColumn[this.activeComponent].ctrl.type
            },
            getRule(validRule) {
                return getRuleTitle(validRule);
            }
        }
    }
</script>

<style lang="scss">
    .app-form-wrapper-19 {
        .attribute-panel {
            .el-button--mini {
                padding: 7px;
                text-align: left;
            }

            .valid-rule-textarea textarea {
                background-color: #F5F7FA !important;
                border-color: #dfe4ed !important;
                color: #999 !important;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .no-attribute {
        text-align: center;
        color: #333333;
        font-weight: bold;
    }
</style>