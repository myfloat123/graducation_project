const path = require('path')

const { addVillagerError, unSupportFileType, fileUploadError, invalidVillagerId } = require('../constant/err.type')

const { addVillager, updateVillager, findVillager, removeVillager, restoreVillager, findOneVillager, findMoreVillager } = require('../service/villager.service')

class VillagerController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
    // console.log(file)
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '村民头像上传成功',
        result: {
          villager_picture: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async add(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await addVillager(ctx.request.body)
      if (!res.villager_picture) await updateVillager(res.id, { ...res, villager_picture: '2562ab1071734b269da6eb205.png' })
      ctx.body = {
        code: 0,
        message: '新增村民信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addVillagerError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateVillager(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改村民信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidVillagerId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findVillager(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '村民信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取村民信息成功',
        result: res
      }
    }

    return res
  }

  async findOne(ctx, next) {
    const { villager_name, villager_ID_number, villager_phone } = ctx.request.query

    const res = await findOneVillager({ villager_name, villager_ID_number, villager_phone })

    ctx.body = {
      code: 0,
      message: '获取村民个人信息成功',
      result: res
    }
  }

  async findMore(ctx, next) {
    const { villager_name, villager_ID_number, villager_phone, page = 1, limit = 3 } = ctx.request.query

    const res = await findMoreVillager({ villager_name, villager_ID_number, villager_phone }, page, limit)

    ctx.body = {
      code: 0,
      message: '获取村民信息成功',
      result: res
    }
  }

  async remove(ctx, next) {
    const res = await removeVillager(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除村民信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidVillagerId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreVillager(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复村民信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidVillagerId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    // const { ids } = ctx.request.body
    // console.log(ctx.request.body)
    // console.log(Object.prototype.toString.call(ctx.request.body))
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('villagers', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeVillager(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidVillagerId, ctx)
    }
  }
}

module.exports = new VillagerController()
