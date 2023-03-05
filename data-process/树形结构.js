// 先在map中存(id, item)
// 遍历data，从map中把每个item的parent取出来，parent.children中加入此item
//                                       如果找不到parent，说明就是第一个item，直接加入结果数组 
function jsonToTree(data) {
  let tree = []
  let map = new Map()
  data.forEach(item => {
    map.set(item.id, item)
  })
  data.forEach(item => {
    let parent = map.get(item.pid)
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item)
    }
  })
}
const data = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}]
// tree = [{
//   id: 1,
//   pid: 0,
//   name: 'body',
//   children: [{
//     id: 2,
//     pid: 1,
//     name: 'title',
//     children: [{
//       id: 3,
//       pid: 1,
//       name: 'div'
//     }]
//   }
// }]

console.log(jsonToTree(data))