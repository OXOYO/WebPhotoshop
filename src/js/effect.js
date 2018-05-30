class Tools {
  constructor (a) {
    for (const prop in a) {
      this[prop] = a[prop]
    }
  }
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
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var outputData = output.data
    var rgb
    var data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      rgb = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (rgb >= 100) {
        rgb = 255
      } else {
        rgb = 0
      }
      outputData[i] = outputData[i + 1] = outputData[i + 2] = rgb
      outputData[i + 3] = data[i + 3]
    }
    return output
  }
  // 反色
  setInverted (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var outputData = output.data
    var data = imgData.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      outputData[i] = 255 - data[i]
      outputData[i + 1] = 255 - data[i + 1]
      outputData[i + 2] = 255 - data[i + 2]
      outputData[i + 3] = data[i + 3]
    }
    return output
  }
  // 锐化
  setSharpen (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var w = imgData.width
    var outputData = output.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      outputData[i] = abc(i)
      outputData[i + 1] = abc(i + 1)
      outputData[i + 2] = abc(i + 2)
      outputData[i + 3] = 255
    }
    function abc (num) {
      return data[num - w * 4 - 4] * 0 + data[num - w * 4] * -1 + data[num - w * 4 + 4] * 0 +
      data[num - 4] * -1 + data[num] * 5 + data[num + 4] * -1 +
      data[num + w * 4 - 4] * 0 + data[num + w * 4] * -1 + data[num + w * 4 + 4] * 0
    }
    return output
  }
  // 高斯模糊
  gaussBlur (imgData) {
    var pixes = imgData.data
    var width = imgData.width
    var height = imgData.height
    var gaussMatrix = []
    var gaussSum = 0
    var x
    var y
    var r
    var g
    var b
    var a
    var i
    var j
    var k
    var len
    var radius = 10
    var sigma = 5

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
    b = -1 / (2 * sigma * sigma)
    // 生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
      g = a * Math.exp(b * x * x)
      gaussMatrix[i] = g
      gaussSum += g
    }
    // 归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
      gaussMatrix[i] /= gaussSum
    }
    // x 方向一维高斯运算
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        r = g = b = a = 0
        gaussSum = 0
        for (j = -radius; j <= radius; j++) {
          k = x + j
          if (k >= 0 && k < width) {
            // 确保 k 没超出 x 的范围
            // r,g,b,a 四个一组
            i = (y * width + k) * 4
            r += pixes[i] * gaussMatrix[j + radius]
            g += pixes[i + 1] * gaussMatrix[j + radius]
            b += pixes[i + 2] * gaussMatrix[j + radius]
            // a += pixes[i + 3] * gaussMatrix[j];
            gaussSum += gaussMatrix[j + radius]
          }
        }
        i = (y * width + x) * 4
        // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
        // console.log(gaussSum)
        pixes[i] = r / gaussSum
        pixes[i + 1] = g / gaussSum
        pixes[i + 2] = b / gaussSum
        // pixes[i + 3] = a ;
      }
    }
    // y 方向一维高斯运算
    for (x = 0; x < width; x++) {
      for (y = 0; y < height; y++) {
        r = g = b = a = 0
        gaussSum = 0
        for (j = -radius; j <= radius; j++) {
          k = y + j
          if (k >= 0 && k < height) {
            // 确保 k 没超出 y 的范围
            i = (k * width + x) * 4
            r += pixes[i] * gaussMatrix[j + radius]
            g += pixes[i + 1] * gaussMatrix[j + radius]
            b += pixes[i + 2] * gaussMatrix[j + radius]
            // a += pixes[i + 3] * gaussMatrix[j];
            gaussSum += gaussMatrix[j + radius]
          }
        }
        i = (y * width + x) * 4
        pixes[i] = r / gaussSum
        pixes[i + 1] = g / gaussSum
        pixes[i + 2] = b / gaussSum
      }
    }
    return imgData
  }
  // 浮雕
  setRelief (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var w = imgData.width
    var outputData = output.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      outputData[i] = abc(i)
      outputData[i + 1] = abc(i + 1)
      outputData[i + 2] = abc(i + 2)
      outputData[i + 3] = 255
    }
    function abc (num) {
      return data[num - w * 4 - 4] * -2 + data[num - w * 4] * -1 + data[num - w * 4 + 4] * 0 +
      data[num - 4] * -1 + data[num] * 1 + data[num + 4] * 1 +
      data[num + w * 4 - 4] * 0 + data[num + w * 4] * 1 + data[num + w * 4 + 4] * 2
    }
    return output
  }
  // 柔化
  setSoften (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var w = imgData.width
    var outputData = output.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      outputData[i] = abc(i) / 16
      outputData[i + 1] = abc(i + 1) / 16
      outputData[i + 2] = abc(i + 2) / 16
      outputData[i + 3] = 255
    }
    function abc (num) {
      return data[num - w * 4 - 4] * 1 + data[num - w * 4] * 2 + data[num - w * 4 + 4] * 1 +
      data[num - 4] * 2 + data[num] * 4 + data[num + 4] * 2 +
      data[num + w * 4 - 4] * 1 + data[num + w * 4] * 2 + data[num + w * 4 + 4] * 1
    }
    return output
  }
  // 雕刻
  setSculpture (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var outputData = output.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      outputData[i] = abc(i)
      outputData[i + 1] = abc(i + 1)
      outputData[i + 2] = abc(i + 2)
      outputData[i + 3] = 255
    }
    function abc (num) {
      return data[num + 4] - data[num - 4] + 128
    }
    return output
  }
  // 怀旧
  setNostalgia (imgData) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var outputData = output.data
    for (var i = 0, n = data.length; i < n; i += 4) {
      var dr = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]
      var dg = 0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2]
      var db = 0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2]

      var scale = Math.random() * 0.5 + 0.5
      outputData[i] = scale * dr + (1 - scale) * data[i]
      scale = Math.random() * 0.5 + 0.5
      outputData[i + 1] = scale * dg + (1 - scale) * data[i + 1]
      scale = Math.random() * 0.5 + 0.5
      outputData[i + 2] = scale * db + (1 - scale) * data[i + 2]
      outputData[i + 3] = 255
    }
    return output
  }
  // 亮度/对比度
  setLight (imgData, Brightness, Contrast) {
    var output = document.createElement('canvas').getContext('2d').createImageData(imgData)
    var data = imgData.data
    var w = imgData.width
    var h = imgData.height
    var outputData = output.data
    var allGray = 0
    // 获取图像的灰度平均值
    for (let i = 0, n = data.length; i < n; i += 4) {
      allGray = allGray + (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
      outputData[i] = data[i]
      outputData[i + 1] = data[i + 1]
      outputData[i + 2] = data[i + 2]
      outputData[i + 3] = data[i + 3]
    }
    var Threshold = allGray / (w * h)
    for (let i = 0, n = outputData.length; i < n; i += 4) {
      if (Contrast >= 0) {
        brightness(i)
        contrast(1 / (1 - Contrast / 255) - 1, i)
      } else {
        contrast(Contrast / 255, i)
        brightness(i)
      }
    }
    function contrast (con, i) { // 调节对比度
      outputData[i] = outputData[i] + (outputData[i] - Threshold) * con
      outputData[i + 1] = outputData[i + 1] + (outputData[i + 1] - Threshold) * con
      outputData[i + 2] = outputData[i + 2] + (outputData[i + 2] - Threshold) * con
    }
    function brightness (i) { // 调节亮度
      outputData[i] = outputData[i] + Brightness
      outputData[i + 1] = outputData[i + 1] + Brightness
      outputData[i + 2] = outputData[i + 2] + Brightness
    }
    return output
  }
}
export default Tools
