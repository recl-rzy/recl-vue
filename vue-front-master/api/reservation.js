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
    },
    pageOwnReservation(id, current, limit, reserQuery) {
        return request({
            url: `/eduservice/reservation-front/pageOwnReservation/${id}/${current}/${limit}`,
            method: 'post',
            data: reserQuery
        })
    }
}