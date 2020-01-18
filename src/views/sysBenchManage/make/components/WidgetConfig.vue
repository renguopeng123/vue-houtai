<template>
  <div v-if="show">
    <el-form label-position="top">
      <!--gw系列-->
      <template v-if="data.type.includes('gw') || data.dataType==='iframe'">
        <el-form-item label="列占比">
          <el-slider
            v-model="data.width"
            :min="1"
            :max="24"
            :format-tooltip="(val)=>val+'/24'"
          />
        </el-form-item>
        <!--<el-form-item label="列偏移">-->
          <!--<el-slider-->
            <!--v-if="Object.keys(data).indexOf('offset')>=0"-->
            <!--v-model="data.options.offset"-->
            <!--:min="0"-->
            <!--:max="24"-->
            <!--:format-tooltip="(val)=>val+'/24'"-->
          <!--/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="高度是否自适应">-->
          <!--<el-switch v-if="Object.keys(data.options).indexOf('colHeightAuto')>=0" v-model="data.options.colHeightAuto" />-->
        <!--</el-form-item>-->
        <el-form-item  label="高度">
          <el-input-number v-model="data.height" size="small" :min="150" :step="50" /> px
        </el-form-item>
        <!--<el-form-item v-if="Object.keys(data.options).indexOf('overflow')>=0" label="overflow">-->
          <!--<el-select v-model="data.options.overflow">-->
            <!--<el-option value="visible" label="visible" />-->
            <!--<el-option value="hidden" label="hidden" />-->
            <!--<el-option value="scroll" label="scroll" />-->
            <!--<el-option value="auto" label="auto" />-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </template>
    </el-form>
  </div>
</template>

<script>

export default {
  props: ['data'],
  data() {
    return {
    }
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  watch: {

  },
  methods: {


  }
}
</script>
