const { assistinfoFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      recipient: { type: 'string', required: true },
      assist_content: { type: 'string', required: true },
      executive_condition: { type: 'boolean', required: false },
      assistinfo_status: { type: 'boolean', required: false }
    })
  } catch (err) {
    console.error(err)
    assistinfoFormatError.result = err
    return ctx.app.emit('error', assistinfoFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}