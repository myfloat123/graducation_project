const { resourceFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      resource_code: { type: 'string', required: true },
      resource_name: { type: 'string', required: true },
      resource_picture: { type: 'string', required: false },
      resource_kind: { type: 'number', required: false },
      resource_reserves: { type: 'string', required: true },
      resource_reserves_unit: { type: 'number', required: true },
      resource_location: { type: 'string', required: true },
      resource_use: { type: 'string', required: false },

    })
  } catch (err) {
    console.error(err)
    resourceFormatError.result = err
    return ctx.app.emit('error', resourceFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}