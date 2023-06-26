require('colors')
const rd = require('rd')
const Router = require('koa-router')
const parse = require('co-body')

var routerConfig = [] // 保存所有路由信息
var thisController = {} // 临时保存遍历到的当前控制器信息
var thisActionCount = 0 // 临时保存当前控制器的Action数量
let apisStr = '|'
let authApisStr = '|'
const router = Router()

module.exports.Router = function({ controllerDir, options }) {
    options = Object.assign({
        debug: false
    }, options)
    if (options.debug) {
        console.info('加载Controllers')
    }

    rd.eachSync(`${controllerDir}`, function(f, s) {
        if (f.lastIndexOf('Controller.js') > -1) {
            require(f).default
        }
    })
    router.jwtUnlessPaths = []
    router.paths = []
    router.adminRoutes = []
    for (var i = 0; i < routerConfig.length; i++) {
        var config = routerConfig[i]
        if (options.debug) {
            console.log(`  ${'--'.grey} ${config.method.bold} ${config.path.grey} ${(config.jwtUnless ? '[jwt-unless]'.blue : '')}${(config.apiNoAuthRequired ? '[no-auth-required]'.blue : '')}${(config.deprecated ? '[deprecated]'.blue : '')}`)
        }
        if (config.method === 'ALL') {
            router.all(config.path, config.authFilter, config.jsonBodyHandle, config.fun)
        } else if (config.method === 'GET') {
            router.get(config.path, config.authFilter, config.jsonBodyHandle, config.fun)
        } else if (config.method === 'POST') {
            router.post(config.path, config.authFilter, config.jsonBodyHandle, config.fun)
        } else if (config.method === 'PUT') {
            router.put(config.path, config.authFilter, config.jsonBodyHandle, config.fun)
        } else if (config.method === 'DELETE') {
            router.delete(config.path, config.authFilter, config.jsonBodyHandle, config.fun)
        }

        if (config.jwtUnless) {
            apisStr += `${config.method}_${config.path}|`
            router.jwtUnlessPaths.push(config.path);
        }else{
          if(config.path.includes('/admin/')){
            // 保存所有需要权限的后台管理端接口
            authApisStr += `${config.method}_${config.path}|`
          }
        }
        // // 保存后台管理端的路由。而且是不需要授权的。
        // if (config.path.indexOf('/admin/') > -1 && !config.jwtUnless) {
        //     router.adminRoutes.push(config)
        // }

        router.paths.push({
            path: config.path,
            method: config.method,
            apiGroupInfo: config.apiGroupInfo,
            apiInfo: config.apiInfo,
            deprecated: config.deprecated,
            jwtUnless: config.jwtUnless || false,
            apiNoAuthRequired: config.apiNoAuthRequired || false
        })
    }
    global[`NO_AUTH_REQUIRED_APIS`] = apisStr;
    global[`AUTH_REQUIRED_APIS`] = authApisStr;

    return router
}

module.exports.Controller = function(value) {
    return (target, key, descriptor) => {
        var path = ''
        var authFilter = defaultFun()
        if (value instanceof Object) {
            path = value.path || path
            if (value.auth !== undefined) {
                authFilter = value.auth
            }
        } else {
            path = value
        }
        thisActionCount = 0
        for (var method in thisController) {
            var item = thisController[method]
            var dec = {
                method: item.method || 'ALL',
                path: `${path}${item.path}`,
                fun: item.fun,
                authFilter: item.authFilter || authFilter,
                jsonBodyHandle: item.jsonBodyHandle || defaultFun(),
                apiGroupInfo: item.apiGroupInfo || null,
                apiInfo: item.apiInfo || null,
                deprecated: item.deprecated || false,
                jwtUnless: item.jwtUnless || false,
                apiNoAuthRequired: item.apiNoAuthRequired || false,
                parentPath: path
            }
            routerConfig.push(dec)
            thisActionCount++
        }
        thisController = {}
        return descriptor
    }
}

module.exports.Action = function(path) {
    return (target, key, descriptor) => {
        if (thisController[key] === undefined) {
            thisController[key] = {
                path: path,
                fun: descriptor.value
            }
        } else {
            thisController[key].path = path
            thisController[key].fun = descriptor.value
        }
        return descriptor
    }
}

module.exports.Get = function(path) {
    return (target, key, descriptor) => {
        if (thisController[key] === undefined) {
            thisController[key] = {
                path: path,
                fun: descriptor.value,
                method: 'GET'
            }
        } else {
            thisController[key].path = path
            thisController[key].fun = descriptor.value
            thisController[key].method = 'GET'
        }
        return descriptor
    }
}

module.exports.Post = function(path) {
    return (target, key, descriptor) => {
        if (thisController[key] === undefined) {
            thisController[key] = {
                path: path,
                fun: descriptor.value,
                method: 'POST'
            }
        } else {
            thisController[key].path = path
            thisController[key].fun = descriptor.value
            thisController[key].method = 'POST'
        }
        return descriptor
    }
}

module.exports.Put = function(path) {
    return (target, key, descriptor) => {
        if (thisController[key] === undefined) {
            thisController[key] = {
                path: path,
                fun: descriptor.value,
                method: 'PUT'
            }
        } else {
            thisController[key].path = path
            thisController[key].fun = descriptor.value
            thisController[key].method = 'PUT'
        }
        return descriptor
    }
}

module.exports.delete = function(path) {
    return (target, key, descriptor) => {
        if (thisController[key] === undefined) {
            thisController[key] = {
                path: path,
                fun: descriptor.value,
                method: 'DELETE'
            }
        } else {
            thisController[key].path = path
            thisController[key].fun = descriptor.value
            thisController[key].method = 'DELETE'
        }
        return descriptor
    }
}

/**
 * 标识该API已经丢弃
 */
module.exports.Deprecated = function(target, key, descriptor) {
    if (thisController[key] === undefined) {
        thisController[key] = {
            deprecated: true
        }
    } else {
        thisController[key].deprecated = true
    }
}


/**
 * 标识改API参数为json类型
 */
module.exports.JsonBody = function(target, key, descriptor) {
    if (thisController[key] === undefined) {
        thisController[key] = {
            jsonBodyHandle: jsonBodyHandle()
        }
    } else {
        thisController[key].jsonBodyHandle = jsonBodyHandle()
    }
}

/**
 * 标识该API不需要经常jwt验证
 */
module.exports.JwtUnless = function(target, key, descriptor) {
    if (key === undefined) {
        if (JSON.stringify(thisController) === '{}') {
            for (var i = (routerConfig.length - thisActionCount); i < routerConfig.length; i++) {
                routerConfig[i].jwtUnless = true
            }
        } else {
            for (var method in thisController) {
                var item = thisController[method]
                item.jwtUnless = true
            }
        }
    } else {
        if (thisController[key] === undefined) {
            thisController[key] = {
                jwtUnless: true
            }
        } else {
            thisController[key].jwtUnless = true
        }
    }
    return descriptor
}

/**
 * 标识该API只需验证登录，不需要验证权限
 */
module.exports.ApiNoAuthRequired = function(target, key, descriptor) {
    if (key === undefined) {
        if (JSON.stringify(thisController) === '{}') {
            for (var i = (routerConfig.length - thisActionCount); i < routerConfig.length; i++) {
                routerConfig[i].apiNoAuthRequired = true
            }
        } else {
            for (var method in thisController) {
                var item = thisController[method]
                item.apiNoAuthRequired = true
            }
        }
    } else {
        if (thisController[key] === undefined) {
            thisController[key] = {
                apiNoAuthRequired: true
            }
        } else {
            thisController[key].apiNoAuthRequired = true
        }
    }
    return descriptor
}

/**
 * 标注API的信息，在Controller头部则标识目录的名称和信息，在Action头部则标识具体的api的名称和信息
 */
module.exports.ApiInfo = function(value) {
    return (target, key, descriptor) => {
        var name = ''
        var remark = ''
        var catalogue = ''
        if (value instanceof Object) {
            name = value.name || name
            remark = value.remark || remark
            catalogue = value.catalogue || catalogue
        } else {
            name = value
        }

        if (key === undefined) {
            if (JSON.stringify(thisController) === '{}') {
                for (var i = (routerConfig.length - thisActionCount); i < routerConfig.length; i++) {
                    routerConfig[i].apiGroupInfo = {
                        name,
                        remark,
                        path: routerConfig[i].parentPath,
                        catalogue
                    }
                }
            } else {
                for (var method in thisController) {
                    var item = thisController[method]
                    item.apiGroupInfo = {
                        name,
                        remark,
                        path: item.parentPath,
                        catalogue
                    }
                }
            }
        } else {
            if (thisController[key] === undefined) {
                thisController[key] = {
                    apiInfo: {
                        name,
                        remark
                    }
                }
            } else {
                thisController[key].apiInfo = {
                    name,
                    remark
                }
            }
        }
        return descriptor
    }
}

/**
 * 没有操作的中间件
 */
var defaultFun = () => {
    return async(ctx, next) => {
        await next()
    }
}

var jsonBodyHandle = () => {
    return async(ctx, next) => {
        let isJson = false
        let contentType = ctx.request.headers['content-type']
        if (contentType !== undefined && contentType.indexOf('json') > -1) {
            isJson = true
        }
        if (!isJson) {
            var opts = {
                detectJSON: undefined,
                onerror: undefined,
                returnRawBody: true,
                limit: undefined
            }
            var res = await parse.json(ctx, opts)
            ctx.request.body = 'parsed' in res ? res.parsed : {}
            if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw
        }
        await next()
    }
}
