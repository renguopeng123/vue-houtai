<template>
  <div id="app" class="app-flow-form">
    <div class="top">
      <div class="title">
        <Icon class="icon" type="md-aperture" color="#2d8cf0" />
        <p><b>政务OA</b><br />流程：<span style="color: #2d8cf0">{{defName}}</span>{{ nodeName }}</p>
      </div>
      <RadioGroup class="radioGroup" v-model="radioGroup" type="button">
        <Radio label="form">流程表单</Radio>
        <Radio label="image">流程图</Radio>
      </RadioGroup>
      <bpm-buttons :buttons="buttons" :class="[buttonStyle, 'buttons']"></bpm-buttons>
    </div>

    <div class="app-form-main">
      <Split v-model="split">
        <div v-show="radioGroup == 'form'" slot="left" class="main" v-if="form.type=='INNER'">
          <ab-custom-form ref="form"></ab-custom-form>
        </div>
        <div v-show="radioGroup == 'form'" slot="left" class="main" v-if="form.type=='FRAME'">
          <ab-url-form :form="form" ref="form"></ab-url-form>
        </div>

        <div v-if="radioGroup == 'image'" slot="left" class="main">
          <img title="流程图" :src="getImageUrl()" style="display: block;">
        </div>

        <div slot="right" class="sidebar">
          <div v-if="nodeMarker == 'opinion'">
            <h2>审批意见</h2>
            <Divider />
            <div class="content">
              <Form label-position="top">
                <FormItem :required="true" label="意见">
                  <Input v-model="opinion" type="textarea" :rows="4" placeholder="请输入意见" />
                </FormItem>
                <FormItem class="usefulOpinion" label="常用语">
                  <Button size="small" style="margin-left: 5px;" type="info" :key="item" v-for="item in usefulOpinion"
                    @click="setOpinion(item)">{{item}}</Button>
                </FormItem>
              </Form>
            </div>
          </div>

          <h2>审批历史</h2>
          <Divider />
          <div class="content">
            <div v-if="loadOpinion == true && opinionList.length == 0">暂无审批历史</div>
            <Timeline>
              <TimelineItem v-for="(opinion,index) in opinionList" class="timelineItem" :key="opinion.id"
                :color="getColor(index)">
                <div :class="'opinionIndex opinionIndex' + index">{{getNodeIndex(opinionList.length,index)}}</div>
                <Icon v-if="index == 0" type="md-cog" slot="dot"></Icon>
                <div :class="'activation' + index">
                  <Avatar icon="ios-person" />
                  <p><b>{{opinion.approverName}}&nbsp;</b> <em>{{opinion.createTime}}</em></p>
                  <p>{{opinion.taskName}} : <b :class="'opinion_' + opinion.status">{{getByStatus(opinion.status)}}</b>
                  </p>
                  <p>意见 ：{{opinion.opinion}}</p>
                </div>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
  import abBpmButtons from '@/bpm/ab-components/ab-bpm/ab-bpm-buttons.vue'
  import config from '@/bpm/ab-config'
  import bpmService from '@/bpm/ab-components/ab-bpm/bpmService'

  import {
    onresize
  } from '@/bpm/ab-components/ab-form/formUtils'
  import qs from 'qs'

  import elementResizeDetectorMaker from 'element-resize-detector'
  var erd = elementResizeDetectorMaker();

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    props: ['buttonStyle'],
    name: 'formMain',
    components: {
      'bpmButtons': abBpmButtons
    },
    data() {
      return {
        //草稿的instance
        instance: '',
        //表单项
        form: '',
        //按钮列表
        buttons: '',
        //左右比例
        split: 0.75,
        //流程名
        defName: "",
        //流程ID
        defId: "",
        //启动实例ID
        instId: "",
        //按钮组切换
        radioGroup: "form",
        //环节名
        nodeName: "",
        //当前环节标记 是否是审批环节 用于显示隐藏右侧填写意见
        nodeMarker: "",
        //审理历史
        opinionList: [],
        loadOpinion: false,
        //意见框
        opinion: "",
        usefulOpinion: []
      }
    },
    destroyed() {
      console.log("formMain 组件销毁");
      erd.removeAllListeners(document.body);
    },
    methods: {

      getNodeIndex: function (length, index) {
        if (index == 0) {
          return "当前环节";
        } else {
          return "环节 " + (length - index)
        }
      },
      getColor: function (index) {
        if (index == 0) {
          return "blue";
        }
        return "green";
      },
      getByStatus: function (status) {
        if (status == 'create') return '待审批'
        if (status == 'start') return '发起流程'
        if (status == 'against') return '反对'
        if (status == 'reject') return '驳回'
        if (status == 'manualEnd') return '人工终止'
        if (status == 'end') return '终止'
        if (status == 'agree') return '同意'
        if (status == 'awaiting_check') return '待审核'
        return status
      },
      initData(data) {
        this.form = data.form
        this.buttons = data.buttonList
        this.instance = data.instance
        this.defName = data.defName
        this.defId = data.defId
        //草稿
        if (data.instance) {
          this.defName = data.instance.subject
          this.defId = data.instance.defId
          this.instId = data.instance.id
        }
        //待办
        if (data.task) {
          this.defName = data.task.subject
          this.nodeName = " - " + data.task.name
          this.instId = data.task.instId
        }

        //审批历史
        if (this.instId != null && this.instId != "") {

          let defer = this.abHttpUtil.postForm('/bpm/instance/getInstanceOpinion', {
            instId: this.instId
          })

          this.abTools.getResultData(defer, data => {
            this.opinionList = data.reverse();
            this.loadOpinion = true;
          })

        } else {
          this.loadOpinion = true;
        }
        this.usefulOpinion = ['同意', '请注意，情况复杂！', '情况紧急，请尽快处理！', '驳回'];
      },

      setOpinion: function (str) {
        this.opinion = str;
      },
      getImageUrl() {
        return baseUrl + "bpm/instance/flowImage?instId=" + this.instId + "&defId=" + this.defId
      }

    },
    mounted() {
      console.log("增加elementResizeDetectorMaker监听");
      erd.listenTo(document.body, function (element) {
        onresize();
      });
    },
    created: function () {}
  }
</script>

<style lang="scss">
  .app-flow-form {
    background: #eeeeee;
  }

  .app-form-main {
    .ivu-split-horizontal .ivu-split-trigger-con {
      top: 150px;
    }

    .ivu-split-trigger-vertical .ivu-split-trigger-bar {
      width: 15px;
    }

    .ivu-split-trigger-bar-con.vertical {
      left: -5px;
    }
  }
</style>

<style lang="scss" scoped>
  // 间距都是10px
  $padding: 15px;
  $box-shadow: #cccccc;

  .top {
    height: 50px;
    width: 100%;
    padding: 13px 10px 10px 10px;
    overflow: hidden;
    background: #ffffff;
    -webkit-box-shadow: 1px 1px 2px $box-shadow;
    -moz-box-shadow: 1px 1px 2px $box-shadow;
    box-shadow: 1px 1px 2px $box-shadow;

    .title {
      float: left;
      display: block;
      margin-left: 15px;
      margin-top: -5px;

      .icon {
        font-size: 40px;
        display: block;
        float: left;
      }

      p {
        display: block;
        float: left;
        margin-left: 5px;
      }
    }

    .radioGroup {
      margin-left: 15px;
      margin-top: -3px;
      padding-left: 15px;
      border-left: 1px dotted #333333;
    }

    .buttons {
      float: right;
      display: block;
      margin-right: 35px;
    }
  }

  .app-form-main {
    clear: both;
 
    .sidebar {
      // height: 100vh;
      min-height: 600px;
      background-color: #ffffff;
      -webkit-box-shadow: -1px -1px 2px $box-shadow;
      -moz-box-shadow: -1px -1px 2px $box-shadow;
      box-shadow: -1px -1px 2px $box-shadow;
      border-radius: 0.3em;
      margin: 10px 0px 0px 10px;

      .content {
        padding: $padding;
        padding-bottom: 5px;

        .usefulOpinion {
          margin-bottom: 5px;
        }

      }

      h2 {
        padding: $padding;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
      }

      .ivu-divider-horizontal {
        margin: 5px 0;
      }

      .timelineItem {

        .opinionIndex {
          width: 100%;
          display: block;
          float: left;
          margin-bottom: 5px;
          border: 0px;
          background-color: #ccc;
          color: #333333;
          text-align: center;
          font-weight: bold;
        }

        .opinionIndex0 {
          background-color: #2d8cf0;
          color: #fff;
        }

        div {
          width: 100%;
          border-radius: 0.5em;
          border: 1px solid #ccc;
          padding: 8px 8px 6px 8px;

          .ivu-avatar {
            display: block;
            float: left;
            margin: 5px 10px 5px 0px;
          }

          p {
            margin: 0px 0px 2px 0px;
            width: 100%;
            display: block;

            em {
              float: right;
              display: block;
            }

            b {
              color: #2d8cf0;
            }

            b.opinion_against,
            b.opinion_reject {
              color: #ed4014;
            }

            b.opinion_manualEnd,
            b.opinion_end {
              color: #ccc;
            }
          }
        }

        div.activation0 {
          border: 1px solid #2d8cf0;

          .ivu-avatar {
            background-color: #2d8cf0;
          }
        }
      }

    }

    .main {
      padding: $padding;
      background-color: #ffffff;
      -webkit-box-shadow: 1px -1px 2px $box-shadow;
      -moz-box-shadow: 1px -1px 2px $box-shadow;
      box-shadow: 1px -1px 2px $box-shadow;
      border-radius: 0.3em;
      min-height: 600px;
      margin: 10px 5px 0px 0px;

      .saveButton {
        display: inline;
        vertical-align: top;
      }
    }
  }
</style>