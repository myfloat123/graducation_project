const { landFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      land_code: { type: 'string', required: true },
      land_transfer_person: { type: 'string', required: true },
      land_receive_person: { type: 'string', required: true },
      land_sign_contract_date: { type: 'date', required: true },
      land_transfer_type: { type: 'int', required: true },
      land_transfer_term: { type: 'date', required: true },
      land_transfer_price: { type: 'string', required: true },
      land_unit: { type: 'int', required: true },
      land_use: { type: 'string', required: false, allowEmpty: true }
    })
  } catch (err) {
    console.error(err)
    landFormatError.result = err
    return ctx.app.emit('error', landFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}