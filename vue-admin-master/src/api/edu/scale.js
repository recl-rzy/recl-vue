import request from '@/utils/request'


export default {
    getAllClassifyInfo() {
        return request ({ 
            url: `/eduservice/test-classify/getTestClassify`,
            method: 'get',
        })
    },
    getAllCounselor() {
        return request({
            url: `/eduservice/edu-counselor/findAll`,
            method: 'get',
        })
    },
    updateScaleInfo(scaleInfo) {
        return request({
            url: `/eduservice/edu-scale/updateScaleInfo`,
            method: 'post',
            data: scaleInfo
        })
    },
    addScaleInfo(scaleInfo) {
        return request({
            url: `/eduservice/edu-scale/addScaleInfo`,
            method: 'post',
            data: scaleInfo
        })
    },
    getScaleInfo(scaleId) {
        return request({
            url: `/eduservice/edu-scale/getScaleInfo/${scaleId}`,
            method: 'get'
        })
    },
    getScaleInfoVo(scaleId) {
        return request({
            url: `/eduservice/edu-scale/getScaleInfoVo/${scaleId}`,
            method: 'get'
        })
    },
    delScale(scaleId) {
        return request({
            url: `/eduservice/edu-scale/${scaleId}`,
            method: 'delete'
        })
    },
    publishScale(scaleId) {
        return request({
            url: `/eduservice/edu-scale/publishScale/${scaleId}`,
            method: 'put'
        })
    },
    confirmScaleInfo(scaleId) {
        return request({
            url: `/eduservice/edu-scale/confirmScaleInfo/${scaleId}`,
            method: 'post'
        })
    },
    getScaleSubject(scaleId) {
        return request({
            url: `/eduservice/edu-scale/getScaleSubject/${scaleId}`,
            method: 'get'
        })
    },
    delScaleSubject(scaleId) {
        return request({
            url: `/eduservice/edu-scale/delScaleSubject/${scaleId}`,
            method: 'delete'
        })
    },
    getScaleAppraisal(scaleId) {
        return request({
            url: `/eduservice/edu-scale/getScaleAppraisal/${scaleId}`,
            method: 'get'
        })
    },
    delScaleAppraisal(scaleId) {
        return request({
            url: `/eduservice/edu-scale/delScaleAppraisal/${scaleId}`,
            method: 'delete'
        })
    },
    pageScaleFactor(current, limit, scaleQuery) {
        return request({
            url: `/eduservice/edu-scale/pageScaleFactor/${current}/${limit}`,
            method: 'post',
            data: scaleQuery
        })
    }
}