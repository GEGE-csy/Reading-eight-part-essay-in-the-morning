// 实现订阅-发布模式
class EventCenter {
  constructor() {
    this.events = {}
  }
  // 添加
  addEvent(type, handler) {
    if(!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }
  // 触发
  dispatchEvent(type) {
    this.events[type].forEach(e => {
      e();
    })
  }
  // 不传handler的话就是直接移除事件，传了的话就是移除事件下的handler
  removeEvent(type, handler) {
    if(!handler) {
      delete this.events[type];
    } else {
      let index = this.events[type].findIndex(e => e === handler);
      this.events[type].splice(index, 1);
    }
  }
}

const ec = new EventCenter();
ec.addEvent('load', function() { console.log('load handler')})
ec.addEvent('load', function() { console.log('load2 handler')})

ec.addEvent('error', function() { console.log('error handler')})

ec.dispatchEvent('load')
ec.removeEvent('error')
ec.removeEvent('load',function() { console.log('load2 handler')})

console.log(ec)