import request from '@/bpm/utils/request'

//获取单个表单信息 包括需要编辑的html
//http://test.agilebpm.cn/form/formDef/getObject?id=406295032446582785
export function getObject(data) {
    return request({
        url: '/form/formDef/getObject',
        method: 'get',
        params: data
    })
}

//获取分类（新编辑器用不上）
//sys/sysTreeNode/getNodes?treeKey=bdfl&nodeKey=
// export function getNodes(data) {
//     return request({
//         url: '/sys/sysTreeNode/getNodes',
//         method: 'get',
//         params: data
//     })
// }

//通过boKey获取对象模型tree（这个数据不全 编辑器用不上）
//data boKey=Demo
//http://test.agilebpm.cn/form/formDef/boTreeData
export function boTreeData(data) {
    return request({
        url: '/form/formDef/boTreeData',
        method: 'get',
        params: data
    })
}

//先获取表关联信息(模型信息)，使用id或者key，key对应getObject 获取的boKey
//http://test.agilebpm.cn/bus/businessObject/getObject?id=20000000530043
//http://test.agilebpm.cn/bus/businessObject/getObject?key=demo
export function businessObject(data) {
    return request({
        url: '/bus/businessObject/getObject',
        method: 'get',
        params: data
    })
}

//再获取具体的业务模型（可能是多个）
//http://test.agilebpm.cn/bus/businessTable/getObject?key=DemoSub&fill=true
export function businessTable(data) {
    return request({
        url: '/bus/businessTable/getObject',
        method: 'get',
        params: data
    })
}

//保存表单
//https://bpm.ecloud.work/form/formDef/save
export function saveFormDef(data) {
    return request({
        url: '/form/formDef/save',
        method: 'post',
        data
    })
}

/**
 * 表单列表
 */
//https://bpm.ecloud.work/ecloud-bpm-platform/form/formDef/listJson?formType=pc_iview
export function formDefListJson(data) {
    return request({
        url: '/form/formDef/listJson',
        method: 'get',
        params: data
    })
}

/**
 * 业务表单获取表单分类树
 * @param param 格式
 * {
 * treeKey: bdfl
 * rootName: 所有数据
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getNodes(param) {
    return request({
        url: "/sys/sysTreeNode/getNodes",
        method: "post",
        params: param
    });
}
/**
 * 业务对象列表
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function listData_busObjectSelect(param) {
    return request({
        url: "/form/formCustDialog/listData_busObjectSelect",
        method: "post",
        params: param
    });
}
/**
 * 新建表单-用户别名
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function pinyin(param) {
    return request({
        url: "/sys/tools/pinyin",
        method: "post",
        params: param
    });
}
/**
 * 表单删除
 * @param param 格式
 * {
 * id:string
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function pagedEitRemove(param) {
    return request({
        url: "/form/formDef/remove",
        method: "post",
        params: param
    });
}
/**
 * 获取业务对象列表的列名
 * @param param 格式
 * {
 * key
 * fill
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function pagedEitGetObject(param) {
    return request({
        url: "/bus/businessObject/getObject",
        method: "post",
        params: param
    });
}
/**
 * 获取业务对象列表的数据
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function pagedEitGetList(param, key) {
    return request({
        url: "form/formDefData/getList_" + key,
        method: "post",
        params: param
    });
}