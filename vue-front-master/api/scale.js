import request from '@/utils/request'

export default {
    getScaleData(id) {
        return request({
            url: `/eduservice/scale-front/getScale/${id}`,
            method: 'get'
        })
    },
    pageScaleFactor(current, limit, scaleQuery) {
        return request({
            url: `/eduservice/scale-front/pageScaleFactor/${current}/${limit}`,
            method: 'post',
            data: scaleQuery
        })
    },
    indexPageScaleFactor(current, limit, scaleQuery) {
        return request({
            url: `/eduservice/scale-front/indexPageScaleFactor/${current}/${limit}`,
            method: 'post',
            data: scaleQuery
        })
    },
    getAllScaleClassifies() {
        return request({
            url: `/eduservice/scale-front/getAllScaleClassifies`,
            method: 'get'
        })
    }
}