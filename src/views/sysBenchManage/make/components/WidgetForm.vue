<template>
  <div class="widget-form-container">
    <div v-if="data.list.length === 0" class="form-empty">从左侧拖拽添加布局组件</div>
    <div style="height: 200px">
      <draggable
        v-model="data.list"
        tag="el-row"
        class="widget-form-list"
        :componentData="getComponentData()"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200}"
        @add="handleWidgetAdd"
      >
        <template v-for="(element, index) in data.list">
          <genetate-form-item :key="element.id"
                              class="widget-col"
                              :class="{active: selectWidget && selectWidget.id == element.id}"
                              @click.native="handleSelectWidget(index)"
                              :widget="element"
                              :config="data.config"/>
        </template>

        <!--<template v-for="(element, index) in data.list">-->
          <!--<el-col-->
            <!--v-if="element.type.includes('gw')"-->
            <!--:key="element.key"-->
            <!--:span="element.options.span"-->
            <!--:offset="element.options.offset"-->
            <!--:style="getColStyles(element.options)"-->
            <!--class="widget-col widget-view"-->
            <!--:class="{active: selectWidget && selectWidget.key == element.key}"-->
            <!--@click.native="handleSelectWidget(index)"-->
          <!--&gt;-->


            <!--<div v-if="selectWidget && selectWidget.key == element.key" class="widget-view-action widget-col-action">-->
              <!--<i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)" />-->
              <!--<i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" />-->
            <!--</div>-->

            <!--<div v-if="selectWidget && selectWidget.key == element.key" class="widget-view-drag widget-col-drag">-->
              <!--<i class="iconfont icon-drag drag-widget" />-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</template>-->
      </draggable>
    </div>

  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import GenetateFormItem from './GenerateFormItem'

export default {
  components: {
    Draggable,GenetateFormItem
  },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  mounted() {
    document.body.ondrop = function(event) {
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    getComponentData() {
      return {
        props: {
          gutter: this.data.config.gutter ? this.data.config.gutter : 0
        }
      };
    },
    handleMoveEnd({newIndex, oldIndex}) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget(index) {
      console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex
      //为拖拽到容器的元素添加唯一 key
      //const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      // this.$set(this.data.list, newIndex, {
      //   ...this.data.list[newIndex],
      //   // options: {
      //   //   ...this.data.list[newIndex].options,
      //   //   remoteFunc: 'func_' + key
      //   // },
      //   key,
      //   // 绑定键值
      //   model: this.data.list[newIndex].type + '_' + key,
      //   rules: []
      // })

      this.selectWidget = this.data.list[newIndex]
    },

    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        options: {...this.data.list[index].options},
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({...item}))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
    getColStyles({colHeight}) {
      const height = colHeight + 'px'
      return {height}
    }
  }
}
</script>
