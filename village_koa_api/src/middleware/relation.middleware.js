const { relationFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      household_number: { type: 'string', required: true },
      name: { type: 'string', required: false },
      relation: { type: 'string', required: false },
      relation_status: { type: 'boolean', required: false }
    })
  } catch (err) {
    console.error(err)
    relationFormatError.result = err
    return ctx.app.emit('error', relationFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}
