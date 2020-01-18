<template>
    <div>
        <!--<ab-cust-dialog dialog-key="userSelector" value-name="name" value-key="key" v-model="data" :dialog-setting="dialogSetting" >
        </ab-cust-dialog>-->

        <ab-cust-dialog class="ivu-btn ivu-btn-primary" dialog-key="userSelector" v-model="data" :param="{}" :dialog-setting="{'multiple':true}" value-account="mz">用户查询</ab-cust-dialog>
    </div>
</template>

<script>
  import Vue from 'vue';
  import abCustDialog from '../../../../ab-components/ab-cust-dialog/ab-cust-dialog.vue';

  export default {
    components:{
      abCustDialog
    },
    props: [],
    data :function () {
      return {
        data : [ { "name": "销售部", "key": "xsb" }],
        dialogSetting:{
          multiple : false,
        }
      }
    },
    mounted : function(){
    },
    methods: {
    },
    watch : {
    }
  }
</script>
