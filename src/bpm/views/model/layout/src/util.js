
const DEL_COMMON_ATTRS = ["columnsWithOutHidden", "columnsWithoutPk", "pkColumn"];
const DEL_COLUMN_ATTRS = ["table"];

export function cleanRawData(rawData) {
  DEL_COMMON_ATTRS.forEach(item => {
    delete rawData[item];
  });
  if (rawData.columns) {
    rawData.columns.forEach(item => {
      DEL_COLUMN_ATTRS.forEach(i => {
        delete item[i];
      })
    })
  }
}


export function modifyEntityInfo(rawBaseData, activeIndex, updateData) {
  let columnTemp = [];
  //新增字段
  if (activeIndex == -1) {
    if (!rawBaseData.columns || rawBaseData.columns.length == 0) {
      rawBaseData.columns.push({
        type: updateData.dataType,
        length: updateData.propertyLength,
        decimal: 0,  //TODO 前端需要增加配置；
        required: true, //TODO 前端需要增加配置；
        primary: true,
        comment: updateData.remarkName,
        key: updateData.propertyName, //属性名
        name: updateData.name, //数据库字段名
      });
    } else {
      rawBaseData.columns.push({
        type: updateData.dataType,
        length: updateData.propertyLength,
        decimal: 0, //TODO 前端需要增加配置；
        required: false, //TODO 前端需要增加配置；
        primary: false, //不在第一个，都是非主键；
        ctrl: {
          type: updateData.widget,
          config: {},              //TODO 前端需要增加配置；
          validRule: updateData.fieldCheck.map(item => {
            return {
              name: item,
              title: "" //TODO 需要确认是否需要；
            }
          }),
          newRule: null  //TODO 前端需要增加配置；
        },
        comment: updateData.remarkName,
        key: updateData.propertyName, //属性名
        name: updateData.name, //数据库字段名
      })
    }
  } else {  //修改字段；
      rawBaseData.columns[activeIndex].type = updateData.dataType;
      rawBaseData.columns[activeIndex].length = updateData.propertyLength;
      rawBaseData.columns[activeIndex].comment = updateData.remarkName;
      rawBaseData.columns[activeIndex].key = updateData.propertyName;//属性名
      rawBaseData.columns[activeIndex].name = updateData.name;//数据库字段名
    if (activeIndex != 0) {
      rawBaseData.columns[activeIndex].ctrl.type = updateData.widget;
      rawBaseData.columns[activeIndex].ctrl.config = {}; //TODO 前端需要增加配置；
      rawBaseData.columns[activeIndex].ctrl.newRule = null;
      rawBaseData.columns[activeIndex].ctrl.validRule = updateData.fieldCheck.map(item => {
        return {
          name: item,
          title: "" //TODO 需要确认是否需要；
        }
      });
    }
  }
}


//新增时的构造实体信息；
export function buildEntityInfo(rawInfo, classifyInfo) {
  debugger;
  let temp = rawInfo.fields.map((item, index) => {

    let result = {};
    if (index == 0) { //主键和其他不要太一样
      result = {
        type:item.dataType,
        length:item.propertyLength,
        decimal: 0,  //TODO 前端需要增加配置；
        required: true, //TODO 前端需要增加配置；
        primary: true,
        comment: item.remarkName,
        key: item.propertyName, //属性名
        name: item.name, //数据库字段名
      }
    } else {
        result = {
          type: item.dataType,
          length: item.propertyLength,
          decimal: 0, //TODO 前端需要增加配置；
          required: false, //TODO 前端需要增加配置；
          primary: false, //不在第一个，都是非主键；
          ctrl: {
            type: item.widget,
            config: {
            },              //TODO 前端需要增加配置；
            validRule: item.fieldCheck.map(item => {
              return {
                name:item,
                title:"" //TODO 需要确认是否需要；
              }
            }),
            newRule: null  //TODO 前端需要增加配置；
          },
          comment: item.remarkName,
          key: item.propertyName, //属性名
          name: item.name, //数据库字段名
        }
    }
    console.log(result);
    return result;
  });
  return {
    dsKey:"dataSourceDefault",// 默认本地数据源
    external:false,
    columns:temp,
    groupName:classifyInfo.name,
    groupId:classifyInfo.id,
    comment:rawInfo.description,
    key:rawInfo.entityName, //实体名
    name:rawInfo.tableName, //表名
    dsName:"本地数据源",  //TODO  也许不能硬编码
  }
}
export function getNodeByKeys(treeNode, keys) {
  let temp = treeNode;
  for (let i = 0; i < keys.length; i++) {
    let result = temp.findIndex(item => {
      return item.key === keys[i];
    });
    if (temp[result].hasOwnProperty("children")) {
      temp = temp[result].children;
    } else {
      return temp[result];
    }
  }
}

export function buildElementData(fieldNames, fieldTypes) {
  let names = fieldNames.split(",");
  let types = fieldTypes.split(",");
  if (fieldNames && fieldTypes &&
    names.length == types.length) {
     let results = [];
     for (let i = 0; i < names.length; i++){
       results.push({
         id: names[i],
         text_left: names[i],
         text_right: types[i]
       })
     }
     return results;
  }
  return []
}

export function dynamicObject(obj, key, value) {
  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }
  obj[key].push(value);
}

export function parseChildrenEntities(data) {
  debugger;
  let relation = data["relation"];

  let temp = [relation["tableKey"]];//初始化
  temp = temp.concat(loopChildren(relation["children"]));
  return temp;
}

function loopChildren(childrenArray) {
  let temp = [];
  (childrenArray||[]).forEach(item => {
    temp.push(item["tableKey"]);
    temp = temp.concat(loopChildren(item["children"]));
  })
  return temp;
}

export function arrayInvalidIndexProtection(array, index) {
  if (index >= array.length) {
    index = array.length - 1;
  }
  return index; //可能为-1
}

export function buildEntityModelByKeyCollection(entityTree, keyCollection) {
  let temp = {};
  keyCollection.forEach(item => {
    temp[item] = [];
  });
  for (let i = 0; i < entityTree.length; i++) {
    let each = entityTree[i];
    if (each.hasOwnProperty("children")) { //非叶子节点
      for (let key in temp) {
        if (!temp[key].includes(key)) {
          temp[key] = [];
          temp[key].push(each.key);
        }
      }
      let result = buildEntityModelByKeyCollection(each["children"], keyCollection);
      for (let item in result) {
          temp[item] = temp[item].concat(result[item]); //找到了
      }
    } else { //叶子节点
      if (keyCollection.includes(each.key)) {
        temp[each.key].push(each.key);
      }
    }
  }
  return temp;
}
