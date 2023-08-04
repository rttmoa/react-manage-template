import { allRoutes } from '../router/config'





/** #### TODO: 根据 处理地址栏得到处理后的数组 （路由中面包屑使用、侧边栏展开项使用）  */
export const filterRoutes = pathname => {
    // 访问的是 react动画 -> 滑动
    let pathSnippets = pathname.split('/').filter(path => path)
    let paths = pathSnippets.map((path, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`)
    // console.log(pathname)       // 路由：  /animate/slide 
    // console.log(pathSnippets)   // 分割：  ['animate', 'slide']
    // console.log(paths)          // 处理：  ['/animate', '/animate/slide']
    let filter = (arr, index) => {
        if (index < paths.length) {
            let p = paths[index]
            index ++
            let route = arr.find(route => route.path === p)
            return route ? [route].concat(route.children ? filter(route.children, index) : []) : []
        }
        return []
    }
    let handleRoutes = [allRoutes.find( route => route.path === '/')].concat(filter(allRoutes, 0))
    // console.log(handleRoutes) // 处理后的路由：首页 + 当前访问的模块 + 当前访问的路由
    return handleRoutes
}

/*
    判断对象是否相等 ??
 */
export const diff_obj = (obj1,obj2) => {
    let o1 = obj1 instanceof Object
    let o2 = obj2 instanceof Object
    if(!o1 || !o2){
        return obj1 === obj2
    }
    if(Object.keys(obj1).length !== Object.keys(obj2).length) return false

    for(let attr in obj1){
        let t1 = obj1[attr] instanceof Object
        let t2 = obj2[attr] instanceof Object
        if(t1 && t2){
            return diff_obj(obj1[attr],obj2[attr])
        }else if(obj1[attr] !== obj2[attr]){
            return false
        }
    }
    return true
}


