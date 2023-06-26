const path = require('path')

const { unSupportFileType, fileUploadError, addFileError, invalidFileId, updateFileError } = require('../constant/err.type')

const { addFile, updateFile, findFile, removeFile, restoreFile } = require('../service/file.service')
const { log } = require('console')

class FileController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    // console.log(file.mimetype)
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }

      const res = await fileController.add({ file_originalFilename: file.originalFilename, file_basename: path.basename(file.filepath), file_mimetype: file.mimetype })
      ctx.body = {
        code: 0,
        message: '文件上传成功',
        result: res
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async add(ctx, next) {
    console.log(ctx)
    try {
      const res = await addFile(ctx)
      return res
      // ctx.body = {
      //   code: 0,
      //   message: '新增文件成功',
      //   result: res
      // }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addFileError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      // console.log(ctx.params.id)
      // console.log(ctx.request.files.file)
      const { id } = ctx.params
      const { file } = ctx.request.files
      const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (file) {
        if (!fileTypes.includes(file.mimetype)) {
          return ctx.app.emit('error', unSupportFileType, ctx)
        }

        const res = await updateFile(id, { file_originalFilename: file.originalFilename, file_basename: path.basename(file.filepath), file_mimetype: file.mimetype })
        if (res) {
          ctx.body = {
            code: 0,
            message: '修改文件成功',
            result: ''
          }
        } else {
          return ctx.app.emit('error', invalidFileId, ctx)
        }
      } else {
        return ctx.app.emit('error', invalidFileId, ctx)
      }

    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { file_originalFilename, page = 1, limit = 3 } = ctx.request.query
    const res = await findFile({ file_originalFilename }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '文件为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取文件成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeFile(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除文件成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidFileId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreFile(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复文件成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidFileId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('files', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeFile(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidFileId, ctx)
    }
  }
}

const fileController = new FileController()

module.exports = fileController