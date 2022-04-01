import request from '@/utils/request'

export default {
    getCounselor(id) {
        return request({
            url: `/eduservice/counselor-front/getCounselor/${id}`,
            method: 'get'
        })
    },
    addReserRecord(reserRecord) {
        return request({
            url: `/eduservice/counselor-front/addReserRecord`,
            method: 'post',
            data: reserRecord
        })
    }
}