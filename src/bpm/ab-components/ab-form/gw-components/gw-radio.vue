<template>
	<div class="gw-radio">
		<radio-group v-model="$parent.data[boKey][columnKey]"
			v-ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"
			v-ab-validate="v_validate">
			<radio v-for="item in options" :label="item.key" :key="item.key">{{ item.txt }}</radio>
		</radio-group>
	</div>
</template>
<script>
	import Vue from 'vue';

	import {
		methods,
		props,
		componentsINIT
	} from '../formUtils';

	/**
	 * gw-radio
	 * 单选按钮
	 */
	export default {
		name: 'gw-radio',
		props: props,
		data() {
			return {
				v_validate: "",
				options: []
			}
		},
		computed: {},
		created() {
			componentsINIT(this);
			var columnOptions = JSON.parse(this.columnOptions);
			if (columnOptions) {
				this.options = JSON.parse(this.columnOptions);
			}
		},
		mounted() {},
		methods: {
			abGetNumber: function (data) {
				return this.$parent.abGetNumber(data);
			},
			abSubAvg: function (subDataList, key) {
				return this.$parent.abSubAvg(subDataList, key);
			},
			abSubSum: function (subDataList, key) {
				return this.$parent.abSubSum(subDataList, key);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gw-radio {}
</style>