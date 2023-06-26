const { villagerFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  console.log(ctx.request.body.villager_picture)
  try {
    ctx.verifyParams({
      villager_name: { type: 'string', required: true },
      villager_age: { type: 'number', required: true },
      villager_sex: { type: 'string', required: true },
      villager_phone: { type: 'string', required: true },
      villager_ID_number: { type: 'string', required: true },
      villager_address: { type: 'string', required: true },
      villager_birthday: { type: 'string', required: true },
      villager_marriage: { type: 'boolean', required: true },
      villager_picture: { type: 'string', required: false },
      villager_email: { type: 'string', required: false, empty: true },
      villager_status: { type: 'boolean', required: false }
    })
  } catch (err) {
    console.error(err)
    villagerFormatError.result = err
    return ctx.app.emit('error', villagerFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}
