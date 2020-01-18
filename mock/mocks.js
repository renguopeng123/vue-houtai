import user from './user'
import role from './role'
import article from './article'
import search from './remoteSearch'
import page from './bpm/page'

// (...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
export default [
    ...user,
    ...role,
    ...article,
    ...page,
    ...search
]