import request from '@/utils/request'


export default {
    delArticle(id) {
        return request ({ 
            url: `/eduservice/edu-article/delArticle/${id}`,
            method: 'delete'
        })
    },
    getAllArticle() {
        return request ({ 
            url: `/eduservice/edu-article/getAllArticle`,
            method: 'get'
        })
    },
    getArticle(id) {
        return request ({ 
            url: `/eduservice/edu-article/getArticle/${id}`,
            method: 'get'
        })
    },
    getArticleListPage(articleQuery, current, limit) {
        return request ({ 
            url: `/eduservice/edu-article//pageArticleFactor/${current}/${limit}`,
            method: 'post',
            data: articleQuery
        })
    },
    getCheckArticleListPage(articleQuery, current, limit) {
        return request ({ 
            url: `/eduservice/edu-article//pageCheckArticleFactor/${current}/${limit}`,
            method: 'post',
            data: articleQuery
        })
    },
    updateArticle(eduArticle) {
        return request ({ 
            url: `/eduservice/edu-article/updateArticle`,
            method: 'post',
            data: eduArticle
        })
    },
    addArticle(eduArticle) {
        return request ({ 
            url: `/eduservice/edu-article/addArticle`,
            method: 'post',
            data: eduArticle
        })
    },
    getAllArticleClassify() {
        return request ({ 
            url: `/eduservice/edu-article/getAllArticleClassify`,
            method: 'get'
        })
    },
    delArticleClassify(id) {
        return request ({ 
            url: `/eduservice/edu-article/delArticleClassify/${id}`,
            method: 'delete',
        })
    },
    publishArticle(id) {
        return request ({ 
            url: `/eduservice/edu-article/publishArticle/${id}`,
            method: 'get',
        })
    }
}