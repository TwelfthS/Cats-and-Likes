import { Like } from './entity/Like'
import { AppDataSource } from './data-source'

export const getLikes = async () => {
    const likes = await AppDataSource.manager.find(Like)
    return {
        data: likes
    }
}

export const addLike = async (catId: string) => {
    const like = new Like()
    like.cat_id = catId
    await AppDataSource.manager.save(like)
    return like
}

export const deleteLike = async (catId: string) => {
    const like = await AppDataSource.manager.findOne(Like, {
        where: {
            cat_id: catId
        }
    })
    await AppDataSource.manager.remove(like)
}