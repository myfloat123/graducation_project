const { getPermissionInfo } = require('../service/permission.service')

const { permissionFormatError, permissionAddError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      permission_name: { type: 'string', required: true },
    })
  } catch (err) {
    console.error(err)
    permissionFormatError.result = err
    return ctx.app.emit('error', permissionFormatError, ctx)
  }

  await next()
}

const verifyPermission = async (ctx, next) => {
  const { permission_name } = ctx.request.body
  try {
    const res = await getPermissionInfo({ permission_name })
    console.log(res)

    if (res.list.length > 1) {
      console.error('权限项已经存在', { permission_name })
      ctx.app.emit('error', permissionAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取权限项信息错误', err)
    ctx.app.emit('error', permissionAddError, ctx)
    return
  }

  await next()
}

module.exports = {
  validator,
  verifyPermission
}