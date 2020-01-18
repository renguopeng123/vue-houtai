import request from "@/utils/request";
/**
 * 用户启用禁用
 * @param param 格式
 * {
 * userId:string,//用户ID
 * status:integer($int32),//状态值
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userStatus(param) {
    return request({
        url: "/org/user/status",
        method: "post",
        params: param
    });
}
/**
 * 重置用户密码
 * @param param 格式
 * {
 * userId:integer($int64),//用户ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userReset(param) {
    return request({
        url: "/org/user/reset",
        method: "post",
        params: param
    });
}
/**
 * 添加用户
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userAdd(param) {
    return request({
        url: "/org/user/add",
        method: "post",
        data: param
    });
}
/**
 * 修改用户
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userEdit(param) {
    return request({
        url: "/org/user/edit",
        method: "post",
        data: param
    });
}
/**
 * 删除用户
 * @param param 格式
 * {
 * userId:string,//用户ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userRemove(param) {
    return request({
        url: "/org/user/remove",
        method: "delete",
        params: param
    });
}
/**
 * 查询角色下的用户信息
 * @param param 格式
 * {
 * roleIds:string,//角色ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUsersByRoleId(param) {
    return request({
        url: "/org/user/getUsersByRoleId",
        method: "get",
        params: param
    });
}
/**
 * 查询角色下的所有用户信息
 * @param param 格式
 * {
 * name:string,//用户ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function selectAllUser(param) {
    return request({
        url: "/org/user/selectAllUser",
        method: "get",
        params: param
    });
}
/**
 * 查询所有岗位
 * @param param 格式
 * {
 * name:string,//用户ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function duties_selectAll(param) {
    return request({
        url: "/org/duty/selectAll",
        method: "get",
        params: param
    });
}