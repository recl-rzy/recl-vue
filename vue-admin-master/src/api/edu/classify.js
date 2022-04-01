import request from '@/utils/request'


export default {
    getAllClassifyInfo() {
        return request ({ 
            url: `/eduservice/test-classify/getTestClassify`,
            method: 'get',
        })
    }
}