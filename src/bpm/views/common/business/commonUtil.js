export function buildObject(input) {
  return {
    "relation": {
      "tableKey": input.tableKey,
      "type": "main",
      "tableComment": "", //TODO 感觉没啥用，暂时不用保存；
      "children": []
    },
    "persistenceType": input.persistenceType,
    "groupName": input.groupName,
    "groupId": input.groupId,
    "name": input.name,
    "key": input.key
  }
}

export const PERSISTENCE_OPTS = [{
  value: "db",
  label: "数据库"
}]

export function parseFlatArrayToTree(flatArray) {
  //创建一个mapping
  let dataMap = flatArray.reduce(function(map, node) {
    map[node.id] = node;
    return map;
  }, {});

  let tree = [];

  flatArray.forEach(function(node) {
    // find parent
    var parent = dataMap[node.parentId || node.groupId];
    if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
      // add node to parent's child array
        .push(node);
    } else {
      // parent is null or missing
      tree.push(node);
    }
  });
  return tree;
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

export function getURIParam(){
  let queryString = decodeURIComponent(window.location.search);
  if (queryString == "") {
    return "";
  }
  queryString = queryString.substring(1);
  let queries = queryString.split("&");
  let temp = {};
  queries.forEach(item =>{
    let condition = item.split('=');
    temp[condition[0]] = condition[1];
  })
  return temp;
}
