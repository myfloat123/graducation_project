const { infrastructureFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      infra_code: { type: 'string', required: true },
      infra_name: { type: 'string', required: true },
      infra_type: { type: 'int', required: true },
      location: { type: 'string', required: true },
      construction_date: { type: 'date', required: false },
      construction_unit: { type: 'string', required: true },
      construction_capital: { type: 'string', required: false },
      use_condition: { type: 'int', required: false },
      operation_condition: { type: 'int', required: false },
      maintain_condition: { type: 'int', required: false },
      infra_status: { type: 'boolean', required: false },
      exist_issue: { type: 'string', required: false },
      improvement_measure: { type: 'string', required: false }
    })
  } catch (err) {
    infrastructureFormatError.result = err
    return ctx.app.emit('error', infrastructureFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}