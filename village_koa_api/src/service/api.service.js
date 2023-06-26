const { Api } = require('../model/api.model')
let ApiModel = Api
const { SuccessModel, ErrorModel } = require('../utils/respond/ResModel')

class ApiService {
  syncApis = async () => {
    // 获取admin目录下所有不需要授权的api
    let notAuthApis = global.apis.filter(item => (item.path.indexOf('/api/admin') > -1 && item.jwtUnless))
    let apisStr = '|'
    notAuthApis.forEach(api => {
      apisStr += `${api.method}_${api.path}|`
    })
    global[`NO_AUTH_REQUIRED_APIS`] = apisStr
    // 获取admin目录下的所有需要授权的api
    let apis = global.apis.filter(item => (item.path.indexOf('/api/admin') > -1 && !item.jwtUnless))
    let catalogue = []
    let childCatalogue = []
    let catalogueId = 0 //一级目录id
    let parentId = 0
    let allApis = await ApiModel.findAll()
    allApis = allApis.map(item => item.name)
    for (let index = 0; index < apis.length; index++) {
      const item = apis[index]
      if (item.apiGroupInfo) {
        // 1. 创建一级API目录
        let catalogueName = item.apiGroupInfo.catalogue
        if (catalogue.indexOf(catalogueName) < 0 && catalogueName) {
          let catalogueList = await ApiModel.findAll({ where: { name: catalogueName } })
          if (catalogueList.length === 0) {
            let result = await ApiModel.create({
              type: 1101,
              name: catalogueName,
              url: '',
              parentId: 0,
              method: ''
            })
            parentId = result.id
            catalogueId = result.id
          } else {
            catalogueId = catalogueList[0].id
            parentId = catalogueList[0].id
          }
          catalogue.push(catalogueName)
        }

        // 2.创建二级API目录
        let childeCatalogueName = item.apiGroupInfo.name
        if (childCatalogue.indexOf(childeCatalogueName) < 0 && childeCatalogueName) {
          let childCatalogueList = await ApiModel.findAll({ where: { name: childeCatalogueName } })
          if (childCatalogueList.length === 0) {
            let result = await ApiModel.create({
              type: 1101,
              name: childeCatalogueName,
              url: '',
              parentId: catalogueName ? catalogueId : 0,
              method: ''
            })
            parentId = result.id
          } else {
            parentId = childCatalogueList[0].id
          }
          childCatalogue.push(childeCatalogueName)
        }

        // 3.创建api
        let apiName = item.apiInfo.name
        if (allApis.indexOf(apiName) < 0) {
          await ApiModel.create({
            type: 1102,
            name: apiName,
            url: item.path,
            jwtUnless: item.jwtUnless,
            parentId: parentId,
            method: item.method
          })
        } else {
          await ApiModel.update({
            type: 1102,
            name: apiName,
            url: item.path,
            jwtUnless: item.jwtUnless,
            parentId: parentId,
            method: item.method
          }, {
            where: { name: apiName }
          })
        }
        allApis.push(apiName)
      }
    }
  }
}

module.exports = new ApiService()