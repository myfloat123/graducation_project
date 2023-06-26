const { Menu } = require('../model/menu.model')
const { Api } = require('../model/api.model')

const { SuccessModel, ErrorModel } = require('../utils/respond/ResModel')

class MenuService {
  /**
 * 添加菜单
 */
  async addMenu(data) {
    try {
      const { name, type, perm } = data
      const condition = {}
      // 如果是菜单和目录，根据路由名称来判断是否重复，如果是按钮。根据按钮标识来判断
      type === 1103 ? condition['perm'] = perm : condition['name'] = name
      let menu = await Menu.findOne({
        where: condition
      })
      if (menu) {
        return new ErrorModel({ message: '该菜单已存在' })
      } else {
        let menus = await Menu.create({ ...data })
        const apiIds = data.apiIds
        if (apiIds && apiIds.length > 0) {
          let apis = await Api.findAll({ where: { id: apiIds } })
          menus.setApis(apis)
        }
        return new SuccessModel({ data: menus })
      }

    } catch (error) {
      return new ErrorModel({ message: error })
    }
  }

  /**
 * 查找所有菜单，为了复用
 */
  async findAllMenu() {
    let menus = await Menu.findAll({
      include: [{
        model: Api,
        through: {
          attributes: []
        }
      }]
    })
    return menus
  }

  /**
   * 获取所有菜单和按钮
   */
  async getAllMenu() {
    try {
      let menusList = await menuservice.findAllMenu()
      return new SuccessModel({ menusList })
    } catch (error) {
      console.log('error', error)
      return new ErrorModel({ message: error })
    }
  }
}

let menuservice = new MenuService()

module.exports = menuservice