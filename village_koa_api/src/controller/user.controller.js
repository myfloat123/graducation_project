const path = require('path')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const { userRegisterError, unSupportFileType, fileUploadError, invalidUserId } = require('../constant/err.type')

const User = require('../model/user.model')
const Role = require('../model/role.model')
const UserRole = require('../model/user_role.model')

const { createUser, getUserInfo, updateById, findUser, updateUser, removeUser, restoreUser, deleteUsers, deleteOneUsers, getOneUserRoles, getUserPermissions } = require('../service/user.service')

const { getRoleInfoById } = require('../service/role.service')

const { JWT_SECRET } = require('../config/config.default')
class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password)
      await updateById({ id: res.id, avatar: '2562ab1071734b269da6eb205.png' })
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    // 1. 获取用户信息（在token的payload中，记录id，user_name，state）
    try {
      const { password, avatar, ...res } = await getUserInfo({ user_name })
      // console.log(avatar)

      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          avatar
        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }

  async changePassword(ctx, next) {
    // 1. 获取数据
    // 修改密码的用户id
    const id = ctx.state.user.id
    // 修改后的密码加密为密文
    const password = ctx.request.body.password
    // 2. 操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: ''
      }
    }
  }

  async getUserData(ctx, next) {
    const id = ctx.state.user.id

    const res = await getUserInfo({ id })
    // const { password, ...res } = await getUserInfo({ id })
    // console.log(res)

    ctx.body = {
      code: 0,
      message: '获取用户信息成功',
      result: {
        ...res,
        avatar: res.avatar !== null ? (res.avatar.indexOf('http') === -1 ? path.basename(res.avatar) : res.avatar) : null
      }
    }
  }

  async update(ctx, next) {
    const user = ctx.request.body
    try {
      const res = await updateUser(user.id, user)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改用户信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidUserId, ctx)
      }
    } catch (err) {
      console.error(err)
    }

  }

  async findUserById(ctx, next) {
    const id = ctx.params.id
    console.log(id)
    const res = await getUserInfo({ id })
    // console.log(res)
    ctx.body = {
      code: 0,
      message: '获取用户信息成功',
      result: {
        ...res,
        avatar: res.avatar !== null ? (res.avatar.indexOf('http') === -1 ? path.basename(res.avatar) : res.avatar) : null
      }
    }
  }

  async getRoles(ctx, next) {
    const userId = ctx.params.id
    const { page = 1, limit = 3 } = ctx.request.query
    const res = await getOneUserRoles(userId, page, limit)

    ctx.body = {
      code: 0,
      message: '获取用户所有角色成功',
      result: res
    }
  }

  async getUserPermission(ctx, next) {
    const { id, page = 1, limit = 3 } = ctx.request.body
    const userId = id
    const res = await getUserPermissions({ userId }, page, limit)

    ctx.body = {
      code: 0,
      message: '获取用户所有权限信息成功',
      result: res
    }
  }

  async find(ctx, next) {
    const { user_name, page = 1, limit = 3 } = ctx.request.query

    const res = await findUser({ user_name }, page, limit)
    // console.log(res)
    if (res.list.length < 1) {

      res.pageList.forEach(user => {
        if (user.avatar) {
          user.avatar = user.avatar.indexOf('http') === -1 ? path.basename(user.avatar) : user.avatar
        } else {
          user.avatar = null
        }
      })
      res.list.forEach(user => {
        if (user.avatar) {
          user.avatar = user.avatar.indexOf('http') === -1 ? path.basename(user.avatar) : user.avatar
        } else {
          user.avatar = null
        }
      })
      ctx.body = {
        code: 0,
        message: '用户信息为空',
        result: res
      }
    } else {
      res.pageList.forEach(user => {
        if (user.avatar) {
          user.avatar = user.avatar.indexOf('http') === -1 ? path.basename(user.avatar) : user.avatar
        } else {
          user.avatar = null
        }
      })
      res.list.forEach(user => {
        if (user.avatar) {
          user.avatar = user.avatar.indexOf('http') === -1 ? path.basename(user.avatar) : user.avatar
        } else {
          user.avatar = null
        }
      })
      ctx.body = {
        code: 0,
        message: '获取用户信息成功',
        result: res
      }
    }

    return res
  }

  async logout(ctx, next) {
    ctx.request.header.authorization = ''
    // console.log('logout')
    ctx.body = {
      code: 0,
      message: '退出登录成功',
      result: ''
    }
  }

  async updateAvatar(ctx, next) {
    // console.log(ctx.request.files)
    const { avatar } = ctx.request.files
    const { file } = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    // console.log(avatar.filepath)
    // console.log(file.filepath)
    if (avatar !== undefined) {
      if (!fileTypes.includes(avatar.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      const id = ctx.state.user.id
      const avatar1 = avatar.filepath
      if (await updateById({ id, avatar: avatar1 })) {
        ctx.body = {
          code: 0,
          message: '更新头像成功',
          result: {
            imgUrl: path.basename(avatar.filepath)
            // imgUrl: avatar.filepath
          }
        }
      } else {
        ctx.body = {
          code: '10105',
          message: '更新头像失败',
          result: ''
        }
      }
    } else if (file !== undefined) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      const id = ctx.state.user.id
      const avatar = file.filepath
      if (await updateById({ id, avatar })) {
        ctx.body = {
          code: 0,
          message: '更新头像成功',
          result: {
            imgUrl: path.basename(file.filepath)
            // imgUrl: avatar.filepath
          }
        }
      } else {
        ctx.body = {
          code: '10105',
          message: '更新头像失败',
          result: ''
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async remove(ctx, next) {
    const res = await removeUser(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除用户信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidUserId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreUser(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复用户信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidUserId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    // const { ids } = ctx.request.body
    // console.log(ctx.request.body)
    // console.log(Object.prototype.toString.call(ctx.request.body))
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('users', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeUser(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidUserId, ctx)
    }
  }

  async doAssign(ctx, next) {
    // 获取请求体中的用户id，角色id和操作类型（add或remove）
    const { userId, roleIds, action } = ctx.request.body
    // 查询数据库中是否有该用户和该角色
    const user = await User.findByPk(userId)
    const roleList = await Role.findAll({
      where: {
        id: {
          [Op.in]: roleIds
        }
      }
    })
    console.log('roleList', roleList)
    let roles = []
    roles = roleList.map(item => item.id)
    console.log('roles', roles)
    // const user = await getUserInfo(userId)
    // const role = await getRoleInfoById(roleId)
    // 如果没有该用户或该角色，返回400错误
    // if (!user || roleIds.length === 0) {
    //   ctx.status = 400
    //   ctx.body = { code: -1, message: '无效的参数' }

    // }
    // 如果有该用户和该角色，根据操作类型添加或删除用户和角色的关联
    if (action === 'add') {
      // await UserRole.destroy({
      //   where: {},
      //   truncate: true
      // })

      await user.setRoles(roles)
      const res = await getOneUserRoles(userId)
      // console.log(res)
      let role_name_str = res.list.map(item => item.role_name).join(',')
      await User.update({ role_name: role_name_str }, {
        where: { id: userId }
      })

      ctx.body = { code: 0, message: '分配角色成功' }
      return
    } else if (action === 'remove') {

      await user.removeRoles(roles)
      ctx.body = { code: 0, message: '取消角色成功' }
      return
    } else {
      // 如果操作类型不是add或remove，返回400错误
      ctx.status = 400
      ctx.body = { code: -1, message: '无效的操作类型' }
      return
    }

  }

  async deleteUser(ctx, next) {
    const { ids } = ctx.request.body

    const res = await deleteUsers(ids)

    ctx.body = {
      code: 0,
      message: '批量删除用户成功',
      result: res
    }
  }

  async deleteOneUser(ctx, next) {

    const id = ctx.params.id

    const res = await deleteOneUsers(id)

    ctx.body = {
      code: 0,
      message: '删除用户成功',
      result: res
    }
  }
}

module.exports = new UserController()
