/**
 */
import request from '@/utils/request'
/**
 * 获取公告列表
 * @param param Object
 * 格式：{limit: 10，"name_^VLK": ""，offset: 0，order: "asc"，"subject_^VLK": ""}
 */
export function fetchNoticelist(param) {
    return request({
        url: "/sys/notice/",
        method: "get",
        data: param
    });
}
