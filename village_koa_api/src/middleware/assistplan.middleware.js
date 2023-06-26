const { assistplanFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      assist_demand: { type: 'string', required: true },
      assist_type: { type: 'int', required: true },
      accountability_unit: { type: 'string', required: false },
      principal: { type: 'string', required: true },
      assistplan_status: { type: 'boolean', required: false }
    })
  } catch (err) {
    console.error(err)
    assistplanFormatError.result = err
    return ctx.app.emit('error', assistplanFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}