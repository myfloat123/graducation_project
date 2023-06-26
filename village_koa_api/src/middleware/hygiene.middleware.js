const { hygieneFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      hygiene_code: { type: 'string', required: true },
      hygiene_accendant: { type: 'string', required: true },
      hygiene_trash_can_number: { type: 'int', required: true },
      hygiene_trash_can_clean_situation: { type: 'int', required: false },
      hygiene_toilet_number: { type: 'int', required: true },
      hygiene_toilet_clean_situation: { type: 'int', required: false },
      hygiene_remark: { type: 'string', required: false }
    })
  } catch (err) {
    console.error(err)
    hygieneFormatError.result = err
    return ctx.app.emit('error', hygieneFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}