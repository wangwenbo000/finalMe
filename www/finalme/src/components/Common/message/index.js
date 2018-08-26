import Vue from 'vue'
import message from './message'
let MessageConstructor = Vue.extend(message)

let instance

var Message = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.show = true
  return instance.vm
}

export default Message
