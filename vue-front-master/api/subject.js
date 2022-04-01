import request from '@/utils/request'

export default {
    addScaleComment(scaleComment) {
        return request({
            url: `/eduservice/subject-front/addScaleComment`,
            method: 'post',
            data: scaleComment
        })
    },
    getScaleSubject(id) {
        return request({
            url: `/eduservice/subject-front/getScaleSubject/${id}`,
            method: 'get'
        })
    },
    getScaleAppraisal(scaleId, userId, scaleResult) {
        return request({
            url: `/eduservice/subject-front/getScaleAppraisal/${scaleId}/${userId}`,
            method: 'post',
            data: scaleResult
        })
    },
    getScaleComment(id) {
        return request({
            url: `/eduservice/subject-front/getScaleComment/${id}`,
            method: 'get'
        })
    },
    addScaleRadio(scaleEvaluate) {
        return request({
            url: `/eduservice/subject-front/addScaleRadio`,
            method: 'post',
            data: scaleEvaluate
        })
    }
}