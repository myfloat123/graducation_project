const batchRemoveHandler = (ctx, ids, removeFunc, errorType) => {
  let Ids

  if (Object.prototype.toString.call(ids) === '[object Array]') {
    Ids = ids
  } else {
    for (const key in ids) {
      Ids = ids[key]
    }
  }

  try {
    Ids.forEach(async Id => {
      await removeFunc(Id)
    })
    ctx.body = {
      code: 0,
      message: '批量删除成功',
      result: ''
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', errorType, ctx)
  }
}

module.exports = batchRemoveHandler