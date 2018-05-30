import store from '../store'
function flip (num) {
  var index = store.state.nowCanvas
  var canvasArr = store.state.canvasArr[index]
  var context = canvasArr.context
  var imgData = canvasArr.imgData
  var data = imgData.data
  var width = imgData.width
  var height = imgData.height
  var output = context.createImageData(imgData)
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var l = (j + i * width) * 4
      var k = num === 0 ? (width - j + i * width) * 4 : (j + (height - i) * width) * 4
      output.data[k] = data[l]
      output.data[k + 1] = data[l + 1]
      output.data[k + 2] = data[l + 2]
      output.data[k + 3] = data[l + 3]
    }
  }
  context.clearRect(0, 0, width, height)
  context.putImageData(output, 0, 0)
  canvasArr.imgData = output
}
export default flip
