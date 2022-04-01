import request from '@/utils/request'

export default {

    // 咨询师分页
    getCounselorListPage(current, limit, counselorQuery) {
        return request({
            url: `/eduservice/edu-counselor/pageCounselorFactor/${current}/${limit}`,
            method: 'post',
            data: counselorQuery
          })
    },
    deleteCounselorById(id) {
        return request({
            url: `/eduservice/edu-counselor/${id}`,
            method: 'delete',
        })
    },
    addCounselor(counselor) {
        return request({
            url: `/eduservice/edu-counselor/addCounselor`,
            method: 'post',
            data: counselor
        })
    },
    getCounselor(id) {
        return request({
            url: `/eduservice/edu-counselor/getCounselor/${id}`,
            method: 'get',

        })
    },
    updateCounselor(counselor) {
        return request({
            url: `/eduservice/edu-counselor/updateCounselor`,
            method: 'post',
            data: counselor
        })
    }

}
