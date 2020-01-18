<template>
	<div class="gw-file">
		<ab-upload v-model="$parent.data[boKey][columnKey]" :placeholder="columnPlaceholder"
			v-bind:ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"></ab-upload>
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
	 * gw-file
	 * 附件控件
	 */
	export default {
		name: 'gw-file',
		props: props,
		data() {
			return {
				v_validate: ""
			}
		},
		computed: {},
		created() {
			componentsINIT(this);
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
	.gw-file {}
</style>