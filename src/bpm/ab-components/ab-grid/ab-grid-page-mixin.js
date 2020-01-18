export default {
  components: {  },
  data () {
      return {
        searchParam:{}
      }
   },
  methods: {
    search (key) {
      key = key ||'abGrid';
      this.$refs[key].postPageData();
    },
    
    
    resetSearchForm(key){
      key = key ||'searchForm';
      this.$refs[key].resetFields();
    },
    
    openDialog(dom,param){
    	
    	var modal = h("Modal",{
			  props:{
				  title:dialogTitle,
				  footerHide:true,
				  value : this.dialog[params.index][openDialog]
			  },
			  on: {
				  input: (event) => {
					  this.dialog[params.index][openDialog] = false;
				  }
			  }
		  },[
			  h("user-edit",{
				  props:params
			  })
		  ]);
    	
    	 
    }
  }
}
