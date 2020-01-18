import request from "@/utils/request2";

//系统工作台管理页面相关接口
/**
 * 获取系统数据源模板的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSysBenchManageListData(param) {
    return request({
        url: "/bpm/definition/listJson",
        method: "get",
        params: param
    });
}

/**
 * 保存
 * @param param
 */
export function savePanel(param) {
    return request({
        url: "/sys/workbenchPanel/save",
        method: "post",
        data: param
    });
}

/**
 * 通过id获取数据
 * @param param id
 */
export function getWorkbenchById(param) {
    return request({
        url: "/sys/workbenchPanel/get",
        method: "get",
        params: param
    });
}
/**
 * 通过id删除数据
 * @param param id
 */
export function delWorkbenchById(param) {
    return request({
        url: "/sys/workbenchPanel/remove",
        method: "delete",
        params: param
    });
}
/**
 * 保存布局
 * @param param
 * {layoutKey：String,layoutList :String}
 */
export function saveLayout(param) {
    return request({
        url: "/sys/workbenchPanel/saveMyPanel",
        method: "post",
        data: param
    });
}
/**
 * 获取布局
 * @param param
 * {layoutKey：String}
 */
export function getLayout(param) {
    return request({
        url: "/sys/workbenchPanel/getMyWorkbench",
        method: "get",
        params: param
    });
}

