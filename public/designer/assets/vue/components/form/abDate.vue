<template>
<input readonly="readonly" type="text" v-model="value"/>
</template>

<script>
import Vue from 'vue';

export default {
  	props: ['value',"format","datetype","min","max","minformat","maxformat","cal","caltype"],
  	methods: {
    	handleMinMax:function(type){
    		var val = type=="min"?this.min:this.max;
    		var format = type=="min"?this.minformat:this.maxformat;
    		if(!val){
 				this.dateCtrl.config[type] = {
					date:type=="min"?1:31,
					hours:0,
					minutes:0,
					month:type=="min"?0:11,
					seconds:0,
					year:type=="min"?1900:2099
 				};
 			}
 			var date = val.toDate(format);
 			this.dateCtrl.config[type] = {
				date:date.getDate(),
				hours:date.getHours(),
				minutes:date.getMinutes(),
				month:date.getMonth(),
				seconds:date.getSeconds(),
				year:date.getFullYear()
			};
    	},
    	//计算差距 拿最小值跟自身比较
    	handleCal:function(){
    		if(!this.min||!this.value){
    			this.$emit('update:cal',"");
    			return;
    		}
    		var rtl = this.min.toDate(this.minformat).between(this.value.toDate(this.format),this.caltype);
    		this.$emit('update:cal',rtl);
    	}
  	},
  	data :function () {
	    return {
	    	dateCtrl:null,
	    	type:this.datetype
	    }
	},
 	mounted : function(){
 		var input = this.$el;
 		$(input).addClass("dateformat");
		var format = this.format || "yyyy-MM-dd";
		
		//没有设置类型，则根据format计算
		if(!this.type){
			this.type = "date";
			if(format.indexOf("HH:mm:ss") != -1){
				this.type = "datetime";
			}
		}
		
		var that = this;
		var conf = {
			elem: input,
			calendar: true,
			format: format,
			type:this.type,
			done: function(value, date, endDate){
				that.$emit('input', value);
			}	
		}
		
		if(this.min){
			conf.min = this.min.toDate(this.minformat).format("yyyy-MM-dd HH:mm:ss");
		}
		if(this.max){
			conf.max = this.max.toDate(this.maxformat).format("yyyy-MM-dd HH:mm:ss");
		}
		
		this.dateCtrl = laydate.render(conf);
 	},
 	watch : {
 		min : function(newVal,oldVal){
 			this.handleCal();
			this.handleMinMax("min"); 			
 		},
 		max : function(newVal,oldVal){
			this.handleMinMax("max"); 			
 		},
 		value : function(newVal,oldVal){
 			this.handleCal();
 		}
 	}
}
</script>
