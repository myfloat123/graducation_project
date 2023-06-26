const path = require('path')

const { addResourceError, unSupportFileType, fileUploadError, invalidResourceId } = require('../constant/err.type')

const { addResource, updateResource, findResource, removeResource, restoreResource } = require('../service/resource.service')

class ResourceController {

  async upload(ctx, next) {
    // console.log(ctx.request.files)
    const { file } = ctx.request.files
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '资源图片上传成功',
        result: {
          resource_picture: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async add(ctx, next) {
    try {
      const res = await addResource(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增村民信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addResourceError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateResource(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改自然资源信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidResourceId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { resource_code, resource_name, resource_kind, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findResource({ resource_code, resource_name, resource_kind }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '自然资源信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取自然资源信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeResource(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除自然资源信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidResourceId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreResource(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复自然村民信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidResourceId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('resources', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeResource(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidResourceId, ctx)
    }
  }
}

module.exports = new ResourceController()