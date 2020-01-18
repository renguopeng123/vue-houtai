/**
 * 对话框公用js
 */

/**
 * 判断两个json是否相等 ps：只比较只b中存在的字段
 * 
 * @param a
 * @param b
 * @returns
 */
function jsonEqual(a, b) {
	if (a === b) {
		return true;
	}
	var allEq = true;// 全相等
	var hasOneEq = false;// 有一个字段相等
	for ( var key in b) {
		if (a[key] && b[key] && b[key] !== a[key]) {
			allEq = false;
			break;
		}
		if (a[key] && b[key] && b[key] === a[key]) {
			hasOneEq = true;
		}
	}
	return allEq && hasOneEq;
}

/**
 * 把row转化为返回数据
 * 
 * @param dialog
 * @param row
 * @returns
 */
function transformRow2Data(dialog, row) {
	var data = {};
	angular.forEach(dialog.returnFields, function(field) {
		data[field.returnName] = row[field.columnName];
	});
	return data;
}

/**
 * 把返回数据转化成row
 * 
 * @param dialog
 * @param data
 * @returns
 */
function transformData2Row(dialog, data) {
	// 处理返回字段的返回名映射为字段名
	var itemTemp = {};
	angular.forEach(data, function(val, key) {
		var isMatch = false;
		angular.forEach(dialog.returnFields, function(field) {
			if (field.returnName === key) {
				itemTemp[field.columnName] = val;
				isMatch = true;
			}
		});
		if (!isMatch) {
			itemTemp[key] = val;
		}
	});
	return itemTemp;
}