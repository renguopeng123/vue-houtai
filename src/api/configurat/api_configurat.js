import request from "@/utils/request3";

//国家节假日页面相关接口
/**
 * 获取节假日的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getHolidayData(param) {
    return request({
        url: "/calendar/holidayConf/listJson",
        method: "post",
        data: param
    });
}

/**
 * 根据ID返回该行完整数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getHolidayfullInfoById(param) {
    return request({
        url: "/calendar/holidayConf/get",
        method: "post",
        params: param
    });
}

/**
 * 初始化日历表
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function calendarHolidayInitwork(param) {
    return request({
        url: "/calendar/holidayConf/initWorkCalenDar",
        method: "post",
        params: param
    });
}

/**
 * 新增保存节假日
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addEditHoliday(param) {
    return request({
        url: "/calendar/holidayConf/save",
        method: "post",
        data: param
    });
}

/**
 * 删除节假日
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeHoliday(param) {
    return request({
        url: "/calendar/holidayConf/remove",
        method: "post",
        params: param
    });
}


