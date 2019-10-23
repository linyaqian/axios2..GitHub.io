export const filent = (routes, author) => {
    console.log(routes, '==========item', author)
    let arr = routes.filter(item => item.meta.author.indexOf(author) > -1)
    arr.forEach(item => {
        if (item.children) {
            item.children = filent (item.children, author)
        }
    })
    return arr
}
