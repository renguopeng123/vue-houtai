<template>
  <el-col
    v-if="element && element.key"
    class="widget-view "
    :span="element.options.span"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type==='gw-Examination'">
      <Examination />
    </template>
    <template v-else-if="element.type==='gw-Meeting'">
      <Meeting />
    </template>
    <template v-else-if="element.type==='gw-Notice'">
      <Notice />
    </template>
    <template v-else-if="element.type==='gw-Schedule'">
      <Schedule />
    </template>
    <template v-else-if="element.type==='gw-Shortcut'">
      <Shortcut />
    </template>
    <template v-else-if="element.type==='gw-Statistics'">
      <Statistics />
    </template>
    <template v-else-if="element.type==='gw-Supervision'">
      <Supervision />
    </template>
    <template v-else-if="element.type==='gw-Todo'">
      <Todo />
    </template>

    <div v-if="selectWidget.key == element.key" class="widget-view-action">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)" />
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" />
    </div>

    <div v-if="selectWidget.key == element.key" class="widget-view-drag">
      <i class="iconfont icon-drag drag-widget" />
    </div>
        
  </el-col>
</template>

<script>
import Examination from '../../../../views/home/module/Examination'
import Meeting from '../../../../views/home/module/Meeting'
import Notice from '../../../../views/home/module/Notice'
import Schedule from '../../../../views/home/module/Schedule'
import Shortcut from '../../../../views/home/module/Shortcut'
import Statistics from '../../../../views/home/module/Statistics'
import Supervision from '../../../../views/home/module/Supervision'
import Todo from '../../../../views/home/module/Todo'
export default {
  components: {
    Examination, Meeting,Notice,Schedule,Shortcut,Statistics,Supervision,Todo
  },
  props: ['element', 'select', 'index', 'data'],
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
    
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
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
    }
  }
}
</script>
