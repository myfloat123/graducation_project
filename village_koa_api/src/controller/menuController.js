import { Controller, Get, Post, ApiInfo, JwtUnless } from '@libs/koa-action-decorator/index'
import { addMenu, getAllMenu, getMenuDetail, updateMenu } from '../service/menuService'
import { verifiMenus, Menu } from '../models/menuModel'
import { deleteByIds } from '@db/util'
import { SuccessModel } from '@utils/respond/ResModel'
export default @ApiInfo({ name: '菜单管理接口', catalogue: '系统管理' })
@Controller('/api/admin/system/menu')
class MenuControllers {
  @Post('/add')
  @ApiInfo('添加菜单')
  async addMenu(ctx) {
    const body = ctx.request.body
    const { checkSuccess, checkResult } = verifiMenus(body)
    ctx.body = checkSuccess && await addMenu(body) || checkResult
  }

  @Get('/list')
  @ApiInfo('获取所有菜单')
  async getAllMenu(ctx) {
    ctx.body = await getAllMenu()
  }

  @Get('/detail')
  @ApiInfo('获取菜单详情')
  async getMenuDetail(ctx) {
    const menuId = ctx.getQueryString('menuId')
    ctx.body = await getMenuDetail(menuId)
  }

  @Post('/update')
  @ApiInfo('修改菜单')
  async updateMenu(ctx) {
    const body = ctx.request.body
    const { checkSuccess, checkResult } = verifiMenus(body)
    ctx.body = checkSuccess && await updateMenu(body) || checkResult
  }

  @Post('/delete')
  @ApiInfo('删除菜单')
  async deleteMenu(ctx) {
    const body = ctx.request.body
    const { ids } = body
    let result = await deleteByIds(Menu, ids)
    ctx.body = new SuccessModel({ message: result })
  }
}
