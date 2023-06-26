const { Menu, verifiMenus } = require('../model/menu.model')

const { addMenu, getAllMenu } = require('../service/menu.service')

class MenuController {
  async add(ctx, next) {
    const body = ctx.request.body
    const { checkSuccess, checkResult } = verifiMenus(body)
    ctx.body = checkSuccess && await addMenu(body) || checkResult
  }

  async getAll(ctx, next) {
    ctx.body = await getAllMenu()
  }
}

module.exports = new MenuController()