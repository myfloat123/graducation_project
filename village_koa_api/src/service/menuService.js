const { Menu } = require('../model/menu.model')
const { Api } = require('../model/api.model')
import { SuccessModel, ErrorModel } from '@utils/respond/ResModel'

/**
 * 添加菜单
 */
export const addMenu = async (data) => {
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
async function findAllMenu() {
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
export const getAllMenu = async () => {
  try {
    let menusList = await findAllMenu()
    return new SuccessModel({ menusList })
  } catch (error) {
    console.log('error', error)
    return new ErrorModel({ message: error })
  }
}

/**
 * 获取菜单详情
 */
export const getMenuDetail = async (menuId) => {
  try {
    let menuInfo = await Menu.findOne({
      where: { id: menuId }
    })
    return new SuccessModel({ menuInfo })
  } catch (error) {
    console.log('error', error)
    return new ErrorModel({ message: error })
  }
}

export const updateMenu = async (body) => {
  try {
    const { id, apiIds, label, name, parentId, perm, sort, type, hidden, icon } = body
    let updateResult = await Menu.update({ id, apiIds, label, name, parentId, perm, sort, type, hidden, icon }, {
      where: { id }
    })
    // mysql不支持更新后返回更新内容
    if (updateResult && updateResult.length > 0) {
      const menu = await Menu.findOne({ where: { id } })
      if (apiIds && apiIds.length > 0) {
        let apis = await Api.findAll({ where: { id: apiIds } })
        menu.setApis(apis)
      }
      return new SuccessModel({ menu })
    }
    return new ErrorModel({ message: "更新失败" })

  } catch (error) {
    console.log('error', error)
    return new ErrorModel({ message: error })
  }
}
