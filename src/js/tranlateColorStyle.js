var TranslateColorStyle = {
  // hsv转RGB
  hsvToRgb: function (obj) {
    var H = obj.H
    var S = obj.S
    var V = obj.V
    var rgb = {R: 0, G: 0, B: 0}
    H = (H >= 360) ? 0 : H
    if (S === 0) {
      rgb.R = V * 255
      rgb.G = V * 255
      rgb.B = V * 255
    } else {
      var i = Math.floor(H / 60) % 6
      var f = H / 60 - i
      var p = V * (1 - S)
      var q = V * (1 - S * f)
      var t = V * (1 - S * (1 - f))
      switch (i) {
        case 0:
          rgb.R = V; rgb.G = t; rgb.B = p
          break
        case 1:
          rgb.R = q; rgb.G = V; rgb.B = p
          break
        case 2:
          rgb.R = p; rgb.G = V; rgb.B = t
          break
        case 3:
          rgb.R = p; rgb.G = q; rgb.B = V
          break
        case 4:
          rgb.R = t; rgb.G = p; rgb.B = V
          break
        case 5:
          rgb.R = V; rgb.G = p; rgb.B = q
          break
      }
      rgb.R = rgb.R * 255
      rgb.G = rgb.G * 255
      rgb.B = rgb.B * 255
    }
    return rgb
  },
  // RGB转hsv
  rgbTohsv: function (obj) {
    var R = obj.R
    var G = obj.G
    var B = obj.B
    var varMin = Math.min(Math.min(R, G), B)
    var varMax = Math.max(Math.max(R, G), B)
    var hsv = {H: 0, S: 0, V: 0}
    if (varMin === varMax) {
      hsv.H = 0
    } else if (varMax === R && G >= B) {
      hsv.H = 60 * ((G - B) / (varMax - varMin))
    } else if (varMax === R && G < B) {
      hsv.H = 60 * ((G - B) / (varMax - varMin)) + 360
    } else if (varMax === G) {
      hsv.H = 60 * ((B - R) / (varMax - varMin)) + 120
    } else if (varMax === B) {
      hsv.H = 60 * ((R - G) / (varMax - varMin)) + 240
    }
    if (varMax === 0) {
      hsv.S = 0
    } else {
      hsv.S = 1 - (varMin / varMax)
    }
    var varR = (R / 255)
    var varG = (G / 255)
    var varB = (B / 255)
    hsv.V = Math.max(Math.max(varR, varG), varB)
    hsv.H = (hsv.H >= 360) ? 0 : hsv.H
    return hsv
  },
  // RGB转16进制
  rgbToHex: function (obj) {
    var R = Math.round(obj.R)
    var G = Math.round(obj.G)
    var B = Math.round(obj.B)
    return ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)
  },
  // 16进制转RGB
  hexToRgb: function (string) {
    var rgb = {R: 0, G: 0, B: 0}
    rgb.R = parseInt('0x' + string.slice(0, 2))
    rgb.G = parseInt('0x' + string.slice(2, 4))
    rgb.B = parseInt('0x' + string.slice(4, 6))
    return rgb
  }
}
export default TranslateColorStyle
