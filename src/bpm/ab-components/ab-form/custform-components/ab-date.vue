<template>
	<DatePicker :style="style" :type="dateType" :readonly="readonly" :disabled="readonly" v-model="date"
		:format="dateFormat" :placeholder="placeholder" :options="options"></DatePicker>
</template>

<script>
	import Vue from 'vue';
	/**
	 * ab日期控件，用法基本跟date-picker一样
	 *<ab-date type="date" v-model="data.kjcs.rqkj" placeholder="Select date" style="width: 200px"></ab-date>
	 */
	export default {
		props: ['value', "format", "type", "placeholder", "abPermission", "min", "max", "minformat", "maxformat", "cal",
			"caltype"
		],
		data: function () {
			return {
				date: null,
				dateType: "date",
				dateFormat: "",
				readonly: false,
				style: {
					width: "100%"
				},
				options: {}
			}
		},
		mounted: function () {
			if (this.format) {
				this.dateFormat = this.format;
			} else if (this.type == "date") {
				this.dateFormat = "yyyy-MM-dd";
			} else if (this.type == "datetime") {
				this.dateFormat = "yyyy-MM-dd HH:mm:ss";
			}

			if (this.type) {
				this.dateType = this.type;
			} else if (this.dateFormat.indexOf("HH:mm:ss") != -1) {
				this.dateType = "datetime";
			} else {
				this.dateType = "date";
			}

			if (this.value) {
				this.date = this.value.toDate(this.dateFormat);
			}

			this.handlePermission();
		},
		methods: {
			handlePermission: function () {

				let formContext = this.$vnode.context;

				//判断是否是gw标签 如果是gw标签 则上一级才是form
				if (formContext && formContext.$vnode && formContext.$vnode.data.staticClass && formContext.$vnode.data
					.staticClass.indexOf("gw-components") > -1) {
					formContext = formContext.$vnode.context
				}

				if (this.abPermission == "b") {
					if (!this.value) {
						formContext.$validity[this.$attrs.desc] = "必填";
						this.style.border = "1px solid red";
					} else {
						delete formContext.$validity[this.$attrs.desc];
						delete this.style.border;
					}
				}
				if (this.abPermission == "r") {
					this.readonly = true;
				}
			},
			handleMinMax: function () {
				this.options.disabledDate = (date) => {
					let min = new Date("1900");
					let max = new Date("9999");
					if (this.min) {
						min = this.min.toDate(this.minformat);
					}
					if (this.max) {
						max = this.max.toDate(this.maxformat);
					}
					return date < min || date > max;
				};
			},
			//计算差距 拿最小值跟自身比较
			handleCal() {
				if (!this.min || !this.value) {
					this.$emit('update:cal', "");
					return;
				}
				var rtl = this.min.toDate(this.minformat).between(this.value.toDate(this.format), this.caltype);
				this.$emit('update:cal', rtl);
			}
		},
		watch: {
			date: function () {
				if (!this.date) {
					this.$emit('input', null);
				} else {
					this.$emit('input', this.date.format(this.dateFormat));
				}
			},
			value: function () {
				this.handlePermission();
				this.handleCal();
			},
			min: function (newVal, oldVal) {
				this.handleCal();
				this.handleMinMax();
			},
			max: function (newVal, oldVal) {
				this.handleMinMax();
			}
		}
	}
</script>