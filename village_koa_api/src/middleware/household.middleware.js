const { householdFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      household_number: { type: 'string', required: true },
      household_name: { type: 'string', required: true },
      household_sex: { type: 'string', required: true },
      household_ID: { type: 'string', required: true },
      household_birthday: { type: 'string', required: false },
      household_phone: { type: 'string', required: false },
      is_poor_household: { type: 'boolean', required: false },
      household_status: { type: 'boolean', required: false }
    })
  } catch (err) {
    console.error(err)
    householdFormatError.result = err
    return ctx.app.emit('error', householdFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}
