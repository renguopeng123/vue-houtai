import request from '@/bpm/utils/request'

//保存业务实体；
export function saveEntityInfo(params) {
  return request({
    url: '/bus/businessTable/newSave',
    method: 'post',
    data:params
  });
};

//获取左侧的实体分类树或者对象分类树
export function getTreeNodesFromSvr(data) {
  return request({
    url: '/sys/sysTreeNode/getNodes',
    method: 'post',
    params:data
  })
}

//获取指定树节点下的实体(带字段信息)
export function getEntitiesUnderSpecificTreeNode(data) {
  return request({
    url: '/bus/businessTable/getEntities',
    method: 'post',
    params:data
  })
}

//获取所有实体(不带字段信息)
export function getAllEntities(data) {
  return request({
    url: '/bus/businessTable/listJson',
    method: 'post',
    params:data
  })
}

//保存实体位置到数据库
export function saveEntitiesDiagram(data) {
  return request({
    url: '/bus/BusTableDiagram/save',
    method: 'post',
    data:data
  })
}

//从数据库获取实体位置
export function getEntitiesDiagram(data) {
  return request({
    url: '/bus/BusTableDiagram/get',
    method: 'post',
    params:data
  })
}

//从数据库获取指定的实体详细信息
export function getEntitiesDetailInfo(input) {
  return request({
    url: '/bus/businessTable/getObject',
    method: 'post',
    params:input
  })
}

export function getBusinessObjects(input) {
  return request({
    url: '/bus/businessObject/listJson',
    method: 'post',
    params:input
  })
}


//创建数据库表
export function createTable(data) {
  return request({
    url: '/bus/businessTable/createTable',
    method: 'post',
    params:data
  })
}

//删除实体
export function removeEntityById(params) {
  return request({
    url: '/bus/businessTable/remove',
    method: 'post',
    params:params
  })
}

//保存业务对象
export function saveObjectInfo(id) {
  return request({
    url: '/bus/businessObject/save',
    method: 'post',
    data:id
  })
}

//从后台获取数据源信息
export function getDataSourceInfo() {
  return request({
    url: '/form/formCustDialog/listData_sysDataSource',
    method: 'get',
  })
}

//从数据库获取实体或实体所在分组关联的对象
export function getRelativeObjectsByGroupId(params) {
  return request({
    url: '/bus/businessObject/listJsonByKey',
    method: 'post',
    params:params
  })
}

//删除对象
export function deleteObjectById(param) {
  return request({
    url: '/bus/businessObject/remove',
    method: 'post',
    params:param
  })
}
