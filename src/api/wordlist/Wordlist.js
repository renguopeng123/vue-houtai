import request from "@/utils/request3";
export function savePanel(param) {
    return request({
        url: "/bpm/task/listJson",
        method: "post",
        data: param
    });
}