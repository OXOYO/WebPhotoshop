import store from '../store'
function rotate (angle) {
  var index = store.state.nowCanvas
  var canvasArr = store.state.canvasArr[index]
  var width = canvasArr.width
  var height = canvasArr.height
  var context = canvasArr.context
  var canvas = canvasArr.canvas
  var image = new Image()
  image.src = canvas.toDataURL('image/png')
  // 擦除画布
  context.clearRect(0, 0, width, height)
  // 移动坐标轴
  context.translate(width / 2, height / 2)
  // 旋转画布
  context.rotate(angle * (Math.PI / 180))
  context.translate(-width / 2, -height / 2)
  image.onload = function () {
    context.drawImage(image, 0, 0)
    // 纠正坐标轴
    context.rotate(-angle * (Math.PI / 180))
    context.translate(-height / 2 - width / 2, width / 2 - height / 2)
    canvasArr.imgData = context.getImageData(0, 0, width, height)
  }
}
export default rotate
