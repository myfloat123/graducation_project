import { typeOf } from '../utils/common'
/**
 * @param 
 */
export async function deleteByIds(model, ids) {
    const deleteResult = await model.destroy({
        where: {
            id: ids
        }
    })
    return deleteResult;
}