class Tools {
  // 灰度化
  setGrayscale (imgData) {
    var rgb
    var data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      rgb = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      data[i] = data[i + 1] = data[i + 2] = rgb
    }
    return imgData
  }
  // 黑白
  setBlack (imgData) {
    var rgb
    var data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      rgb = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (rgb >= 100) {
        rgb = 255
      } else {
        rgb = 0
      }
      data[i] = data[i + 1] = data[i + 2] = rgb
    }
    return imgData
  }
  // 反色
  setInverted (imgData) {
    var data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    return imgData
  }
  // 高斯模糊
  setGaussian (imgData) {
    var data = imgData.data
    var w = imgData.width
    for (var i = 0, n = data.length; i < n; i += 4) {
      if (i > w * 4 && i < n - w * 4 && i % (w * 4) !== 0 && i % (w * 4) !== 1) {
        data[i] = abc(i)
        data[i + 1] = abc(i + 1)
        data[i + 2] = abc(i + 2)
      }
    }
    function abc (num) {
      return data[num - w * 4 - 4] * 0.0947416 + data[num - w * 4] * 0.118318 + data[num - w * 4 + 4] * 0.0947416 +
      data[num - 4] * 0.118318 + data[num] * 0.147761 + data[num + 4] * 0.118318 +
      data[num + w * 4 - 4] * 0.0947416 + data[num + w * 4] * 0.118318 + data[num + w * 4 + 4] * 0.0947416
    }
    return imgData
  }
}
export default Tools
