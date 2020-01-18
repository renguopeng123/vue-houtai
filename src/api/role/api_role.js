import request from "@/utils/request";
/**
 * 获取角色列表
 * @param param 格式
 * {
 * orderBy:'string',//排序，可以为空
 * pageNo:integer($int32),//页码
 * pageSize:integer($int32),//每页条数
 * sort:'',//排序字段，不用理会
 * roleName:'',//筛选输入框的值
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleListJson(param) {
    return request({
        url: "/org/role/listJson",
        method: "get",
        params: param
    });
}
/**
 * 角色启用禁用
 * @param param 格式
 * {
 * roleId :string,//角色ID
 * status:string,//状态值
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleStatus(param) {
    return request({
        url: "/org/role/setStatus",
        method: "get",
        params: param
    });
}
/**
 * 角色新增
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleAdd(param) {
    return request({
        url: "/org/role/add",
        method: "post",
        data: param
    });
}
/**
 * 角色删除
 * @param param 格式
 * {
 * roleId:string,//角色ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleRemove(param) {
    return request({
        url: "/org/role/remove",
        method: "delete",
        params: param
    });
}
/**
 * 角色编辑
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleEdit(param) {
    return request({
        url: "/org/role/edit",
        method: "post",
        data: param
    });
}
/**
 * 查看角色
 * @param param 格式
 * {
 * roleId:string,//角色ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleGet(param) {
    return request({
        url: "/org/role/get",
        method: "get",
        params: param
    });
}
/**
 * 角色授权
 * @param param 格式
 * {
 * resId:string,//选中的树节点ID，多个用','分开
 * roleId:string,//角色ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleSave(param) {
    return request({
        url: "/org/resRole/save",
        method: "post",
        params: param
    });
}
/**
 * 获取角色已有授权
 * @param param 格式
 * {
 * roleId :string,//角色ID
 * sysId :string,//
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function roleGetTreeData(param) {
    return request({
        url: "/org/resRole/getTreeData",
        method: "get",
        params: param
    });
}
/**
 * 角色分配用户
 * @param param 格式
 * {
 * roleId :string,//角色ID
 * userIds  :string,//用户ID用','隔开的字符串
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function allocationUserForRole(param) {
    return request({
        url: "/org/role/allocationUserForRole",
        method: "get",
        params: param
    });
}