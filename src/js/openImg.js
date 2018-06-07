// 打开本地图片
import store from '../store'
class OpenImg {
  constructor () {
    this.loadImg = function (name, img) {
      var canvas = document.createElement('canvas')
      canvas.setAttribute('width', img.width)
      canvas.setAttribute('height', img.height)
      var context = canvas.getContext('2d')
      context.drawImage(img, 0, 0)
      var data = context.getImageData(0, 0, img.width, img.height)
      var obj = {
        name: name,
        width: img.width,
        height: img.height,
        context: '',
        canvas: '',
        imgData: data,
        scaleProportion: 1,
        dataArr: [{
          id: 24,
          imgData: data
        }],
        index: 0
      }
      return obj
    }
    this.reader = function (file) {
      var local = this
      var reader = new FileReader()
      // 转化成base64数据类型
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        var img = new Image()
        img.src = this.result
        img.onload = function () {
          store.state.canvasArr.push(local.loadImg(file.name, img))
        }
      }
    }
  }
  // 通过拖拽打开本地图片
  dropImg (e) {
    var file = e.dataTransfer.files[0]
    this.reader(file)
  }
  // 通过表单打开本地图片
  openLocalImg () {
    var local = this
    var inputObj = document.createElement('input')
    inputObj.addEventListener('change', readFile, false)
    inputObj.type = 'file'
    inputObj.accept = 'image/*'
    inputObj.click()
    function readFile () {
      // 获取input输入的图片
      var file = this.files[0]
      local.reader(file)
    }
  }
  // 打开从服务器获取的图片
  openOnlineImg (src) {
    var local = this
    var name = /[^/+]+\.\w+/.exec(src)[0]
    var img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = function () {
      store.state.canvasArr.push(local.loadImg(name, img))
    }
  }
  // 新建图片
  createImg (name, width, height) {
    const data = document.createElement('canvas').getContext('2d').createImageData(width, height)
    const obj = {
      name: name,
      width: width,
      height: height,
      context: '',
      canvas: '',
      imgData: data,
      scaleProportion: 1,
      dataArr: [{
        id: 24,
        imgData: data
      }],
      index: 0
    }
    store.state.canvasArr.push(obj)
  }
}
export default new OpenImg()
