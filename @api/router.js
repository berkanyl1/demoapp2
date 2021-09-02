import {ADMIN_API, ASSETS_JSON, PAGES_JSON, THEMES, THEMES_JSON} from "../constants/endpoints";
import Router from "koa-router";
import {SLASH} from "../constants/characters";
const axios = require('axios');
const router = new Router({
    prefix: '/api'
});


router.get("/get/page/list", async (ctx) => {

    ctx.body = await axios({
        url: ctx.SERVER_CONTEXT.BASE_URL + ADMIN_API + SLASH + ctx.SERVER_CONTEXT.API_VERSION + PAGES_JSON,
        headers: {
            "X-Shopify-Access-Token": ctx.SERVER_CONTEXT.API_TOKEN
        }
    }).then(res => {
        if(res.status === 200) {
            return {
                success: true,
                data: res.data,
                status: 200
            }
        } else {
            return {
                success: false,
                data: res.data,
                status: res.status
            }
        }

    })
})
router.get("/get/theme/list", async (ctx, next) => {
    ctx.body = await axios({
        url: ctx.SERVER_CONTEXT.BASE_URL + ADMIN_API + SLASH + ctx.SERVER_CONTEXT.API_VERSION + THEMES_JSON,
        headers: {
            "X-Shopify-Access-Token": ctx.SERVER_CONTEXT.API_TOKEN
        }
    }).then(res => {
        if(res.status === 200) {
            return {
                success: true,
                data: res.data,
                status: 200
            }
        } else {
            return {
                success: false,
                data: res.data,
                status: res.status
            }
        }

    })
})
router.get("/get/:theme_id/assets", async (ctx, next) => {
    let params = {};
    if(ctx.query.assetKey) {
        params['asset[key]'] = ctx.query.assetKey
    }
    ctx.body = await axios({
        url: ctx.SERVER_CONTEXT.BASE_URL + ADMIN_API + SLASH + ctx.SERVER_CONTEXT.API_VERSION + THEMES + SLASH + ctx.params.theme_id +  ASSETS_JSON,
        headers: {
            "X-Shopify-Access-Token": ctx.SERVER_CONTEXT.API_TOKEN
        },
        params: params
    }).then(res => {
        if(res.status === 200) {
            return {
                success: true,
                data: res.data,
                status: 200
            }
        } else {
            return {
                success: false,
                data: res.data,
                status: res.status
            }
        }

    })
})

module.exports = router
