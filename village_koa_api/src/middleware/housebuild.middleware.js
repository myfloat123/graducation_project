const { housebuildFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      housebuild_code: { type: 'string', required: true },
      villager_name: { type: 'string', required: true },
      have_or_not_safety_danger: { type: 'number', required: true },
      have_or_not_violate_build: { type: 'number', required: true }
    })
  } catch (err) {
    console.error(err)
    housebuildFormatError.result = err
    return ctx.app.emit('error', housebuildFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}
