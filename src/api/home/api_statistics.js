import request from "@/utils/request"
import request3 from "@/utils/request3"


export function getMeetingAndMemberCount() {
    return request({
        url: "/oa/count",
        method: "get"
    })
}
export function getOthersCount() {
    return request3({
        url: "/bpm/my/getMyTaskNum",
        method: "get"
    })
}

