import request from "@/utils/request";
/**
 * 查询所有岗位，支持分页
 * @param param 格式
 * {
 * name:'string',//筛选输入框的值
 * orderBy:'string',//排序，可以为空
 * pageNo:integer($int32),//页码
 * pageSize:integer($int32),//每页条数
 * sort:'',//排序字段，不用理会
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function duties_listJson(param) {
    return request({
        url: "/org/duty/listJson",
        method: "get",
        params: param
    });
}

/**
 * 岗位新增/修改
 * @param param 格式
 * {
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function duties_save(param) {
    return request({
        url: "/org/duty/save",
        method: "post",
        data: param
    });
}

/**
 * 岗位删除
 * @param param 格式
 * {
 * id:string,//岗位ID
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function duties_remove(param) {
    return request({
        url: "/org/duty/remove",
        method: "get",
        params: param
    });
}