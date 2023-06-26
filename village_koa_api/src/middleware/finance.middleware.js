const { financeFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      finance_code: { type: 'string', required: true },
      finance_type: { type: 'int', required: true },
      finance_money: { type: 'string', required: true },
      finance_money_unit: { type: 'int', required: true },
      finance_explain: { type: 'string', required: false }
    })
  } catch (err) {
    console.error(err)
    financeFormatError.result = err
    return ctx.app.emit('error', financeFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}