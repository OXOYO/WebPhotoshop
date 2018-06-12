// 裁切图片
class Clip {
  getData (imgData, arr) {
    var w = imgData.width
    var data = imgData.data
    // arr里有四个元素，分别为起点的X,Y坐标和长宽
    const x1 = arr[0]
    const x2 = arr[0] + arr[2]
    const y1 = arr[1]
    const y2 = arr[1] + arr[3]
    const outImgData = document.createElement('canvas').getContext('2d').createImageData(arr[2], arr[3])
    var j = 0
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        var i = (w * y + x) * 4
        outImgData.data[j] = data[i]
        outImgData.data[j + 1] = data[i + 1]
        outImgData.data[j + 2] = data[i + 2]
        outImgData.data[j + 3] = data[i + 3]
        data[i] = data[i + 1] = data[i + 2] = 255
        j += 4
      }
    }
    return [imgData, outImgData]
  }
}
export default new Clip()
