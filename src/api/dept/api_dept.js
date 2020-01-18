import request from "@/utils/request";

/**
 * 获取树的数据
 * @param param 格式
 * {
 * id:'String',//要启用的数据源id
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getTreeData(param) {
    return request({
        url: "org/group/getTreeData",
        method: "get",
        params: param
    });
}
/**
 * 新增修改树节点
 * @param param 格式
 * {
 * code:'string',//机构编码
 * description:'string',//备注
 * id:'string',//节点ID，新增可为空
 * name:'string',//节点名称
 * parentId:'string',//父节点ID
 * sn:'string',//当前层级所在下标
 * type:'string',//类型：0集团，1公司，3部门
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function tree_save(param) {
    return request({
        url: "/org/group/save",
        method: "post",
        data: param
    });
}
/**
 * 删除树节点
 * @param param 格式
 * {
 * id:'string',//节点ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function tree_remove(param) {
    return request({
        url: "/org/group/remove",
        method: "delete",
        params: param
    });
}
/**
 * 修改树节点顺序
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function tree_changeOrder(param) {
    return request({
        url: "/org/group/changeOrder",
        method: "post",
        data: param
    });
}
/**
 * 查询选中机构下的用户
 * @param param 格式
 * {
 * orderBy:'string',//排序，可以为空
 * orgId :'string',//机构ID
 * pageNo:integer($int32),//页码
 * pageSize:integer($int32),//每页条数
 * sort:'',//排序字段，不用理会
 * userName:'',//筛选输入框的值
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function queryGroupUser(param) {
    return request({
        url: "/org/orgRelation/queryGroupUser",
        method: "get",
        params: param
    });
}
/**
 * 用户详情
 * @param param 格式
 * {
 * userId :integer($int64),//用户ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserInfo(param) {
    return request({
        url: "/org/user/getUserInfo",
        method: "get",
        params: param
    });
}