<template>
  <div>
    <Button size="small" :key="btn.alias" v-for="btn in buttons" :loading="buttonLoading[btn.alias]"
      :type="getButtonStyle(btn.alias).css" :icon="getButtonStyle(btn.alias).icon" v-on:click="buttonClick(btn)"
      style="margin-right: 15px;">{{btn.name}}</Button>
    <div v-if="dynamicComponent.show" ref="dynamicComponent" :is="dynamicComponent.key" @cancel="cancel"
      @callback="dynamicComponent.callback" :show-dialog="dynamicComponent.show" :passConf="dynamicComponent.flowParam">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import bpmService from './bpmService'
  import opinionDialog from './buttonDialogs/bpm-task-opinion-dialog.vue'
  import taskOpinionHistory from './buttonDialogs/bpm-opinion-history-dialog.vue'
  import instanceImageDialog from './buttonDialogs/bpm-flow-image-dialog.vue'
  import bpmTurnDialog from './buttonDialogs/bpm-task-turn-dialog.vue'

  import {
    mapMutations
  } from 'vuex'
  Vue.component('bpmTaskOpinionDialog', opinionDialog)
  Vue.component('bpmOpinionHistory', taskOpinionHistory)
  Vue.component('bpmFlowImageDialog', instanceImageDialog)
  Vue.component('bpmTurnDialog', bpmTurnDialog)

  /**
   * 流程按钮解析。
   * 关于按钮样式，对话框宽高属性，不做可配置行，因为前段无法统一，
   * 但是、请求资源路径要求一致，比如/bpm/task/   /bpm/instance.
   * 前缀自己前段控制
   */
  export default {
    name: 'bpmButtons',
    props: ['buttons'],
    data: function () {
      return {
        buttonLoading: {},
        dynamicComponent: {
          key: 'bpm-task-opinion-dialog',
          show: false
        }
      }
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),
      cancel(v) {
        this.$set(this.dynamicComponent, 'show', v)
        console.log(v, this.dynamicComponent)
      },
      buttonClick: function (button) {

        // 执行前置js
        this.buttonLoading[button.alias] = true
        if (!this.execuFn(button.beforeScript)) {
          this.buttonLoading[button.alias] = false
          return
        }
        // 获取自定义表单的 context
        let custFormContext = getCustFormComponent(this.$parent)
        // 客户表单自定义 fn:custValid 校验
        //开始 同意 驳回三个按钮
        let validateForm = 'start,agree,oppose'.indexOf(button.alias) != -1
        if (validateForm && custFormContext.custValid) {
          if (custFormContext.custValid() === false) {
            this.buttonLoading[button.alias] = false
            return
          }
        }
        // 获取在线表单数据，并校验内置校验
        let busData = bpmService.getFormData(custFormContext, button)
        if (busData === false) { // 获取数据失败
          this.buttonLoading[button.alias] = false
          return
        }
        let flowData = bpmService.getSubmitFlowParam()
        flowData.data = busData
        flowData.action = button.alias

        // 获取更多完成动作配置
        if (button.configPage) {
          this.buttonLoading[button.alias] = false

          let componentKey = 'bpm-' + button.alias + '-dialog'
          // 特殊处理相同的组件
          if ('agree,oppose,signOppose,signAgree,reject,reject2Start,manualEnd'.indexOf(button.alias) != -1) {
            componentKey = 'bpm-task-opinion-dialog'
          }
          if (button.alias === 'taskOpinion') {
            componentKey = 'bpm-opinion-history'
          }

          //带入意见
          if (componentKey == 'bpm-task-opinion-dialog') {
            if (!this.$parent.opinion || this.$parent.opinion == "") {
              //意见不能为空
              this.$Message.error({
                content: '请输入意见'
              })
              return
            }
            flowData.opinion = this.$parent.opinion;
          }

          this.dynamicComponent = {
            show: true,
            key: componentKey,
            flowParam: flowData,
            callback: (data) => {
              this.postAction(data, button)
            }
          }

        } else {
          this.postAction(flowData, button)
        }
      },
      postAction: function (flowData, button) {
        // 执行动作
        let url = flowData.taskId ? 'bpm/task/doAction' : 'bpm/instance/doAction'
        let defer = Vue.abHttpUtil.post(url, flowData)
        Vue.abTools.getResultMsg(defer, (data) => {
          this.buttonLoading[button.alias] = false

          if (window.parent.flowIframe) {
            window.parent.flowIframe.visible = false;
            //重新装载列表
            window.parent.flowIframe.reload()
            // window.parent.location.reload()
            return
          }

          if (Vue.$router) {
            this.$router.back();
          } else {
            window.history.back();
          }
        }, () => {
          this.buttonLoading[button.alias] = false
        }, 'alert')
      },
      execuFn: function (fnStr) {
        if (!fnStr) return true
        let parentScope = getCustFormComponent(this.$parent)

        let script = 'let tempFunction = function(scope){ ' + fnStr + '};'
        let result = eval(script + 'tempFunction(parentScope);')
        if (result === false) return false
        return true
      },
      getButtonStyle: function (alias) {
        let buttonsStyle = {
          'start': {
            css: 'success',
            icon: 'ios-send'
          },
          'draft': {
            css: 'primary',
            icon: 'md-albums'
          },
          'save': {
            css: 'primary',
            icon: 'md-albums'
          },
          'agree': {
            css: 'success',
            icon: 'md-checkmark',
            dialogHeigth: 422,
            dialogWidth: 690
          },
          'oppose': {
            css: 'primary',
            icon: 'ios-thumbs-down',
            dialogHeigth: 422,
            dialogWidth: 690
          },
          'reject': {
            css: 'error',
            icon: 'ios-redo',
            dialogHeigth: 422,
            dialogWidth: 690
          },
          'reject2Start': {
            css: 'error',
            icon: 'ios-redo',
            dialogHeigth: 300,
            dialogWidth: 500
          },
          'lock': {
            css: 'default',
            icon: 'ios-lock'
          },
          'unlock': {
            css: 'default',
            icon: 'ios-unlock'
          },
          'taskOpinion': {
            css: 'primary',
            icon: 'ios-paper-outline',
            dialogHeigth: 500,
            dialogWidth: 900
          },
          'flowImage': {
            css: 'primary',
            icon: 'ios-image',
            dialogHeigth: 600,
            dialogWidth: 800
          },
          'manualEnd': {
            css: 'error',
            icon: 'md-close-circle',
            dialogHeigth: 300,
            dialogWidth: 500
          },
          'print': {
            css: 'primary',
            icon: 'ios-print',
            dialogHeigth: 300,
            dialogWidth: 500
          },
          'signAgree': {
            css: 'success',
            icon: 'md-checkmark',
            dialogHeigth: 422,
            dialogWidth: 690
          },
          'signOppose': {
            css: 'primary',
            icon: 'ios-thumbs-down',
            dialogHeigth: 422,
            dialogWidth: 690
          }
        }
        if (buttonsStyle[alias]) return buttonsStyle[alias]
        return {
          css: 'primary'
        }
      }
    }
  }

  function getCustFormComponent(pageComponent) {
    // for (let i = 0, c; c = pageComponent.$children[i++];) {
    //   if (c.$options._componentTag === 'ab-custom-form' || c.$options._componentTag === 'ab-url-form') {
    //     return c
    //   }
    // }
    // // 不向下递归
    // console.error('页面中找不到 cust-form 的组件！！！')
    // return null

    return pageComponent.$refs.form;
  }
</script>