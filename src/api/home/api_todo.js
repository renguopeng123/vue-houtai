/**
 * Created by 李君 on 2019/9/5.
 */
import request from '@/utils/request3'
/**
 * 我的待阅-获取待阅列表
 * @param param Object
 * 格式：{limit: 10，"name_^VLK": ""，offset: 0，order: "asc"，"subject_^VLK": ""}
 */
export function fetchNovellooker(param) {
    return request({
        url: "bpm/my/todoTaskList",
        method: "post",
        data: param
    });
}
/**
 * 我的待阅-全部已读
 * @param param Object
 * 格式：{"id_^VIN": string， ...}
 */
export function fetchReadStatus(param) {
    return request({
        url: "bpm/my/updateCheckState",
        method: "post",
        data: param
    });
}