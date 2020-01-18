<template>
	<div class="gw-dic">
		<ab-dict v-model="$parent.data[boKey][columnKey]" :placeholder="columnPlaceholder"
			v-bind:ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"
			v-ab-validate="v_validate" :dict-key="columnDicKey"></ab-dict>
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
	 * gw-dic
	 * 字典
	 */
	export default {
		name: 'gw-dic',
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

<style lang="scss">
	.gw-dic {
		 .ivu-poptip-rel { width: 100%;}
	}
</style>

<style lang="scss" scoped>

</style>