import request from '@/utils/request'

export default {

    pageDocScaleFactor(current, limit, docScaleQuery) {
        return request({
            url: `/eduservice/doc-scale/pageDocScaleFactor/${current}/${limit}`,
            method: 'post',
            data: docScaleQuery
        })
    },
    delDocScale(id) {
        return request({
            url: `/eduservice/doc-scale/${id}`,
            method: 'delete'
        })
    }

}