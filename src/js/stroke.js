var Stroke = {
  // 擦除
  clear: function () {
    this.context.clearRect(0, 0, this.canvasLen[0], this.canvasLen[1])
  },
  // 设置RGBA
  rgba: function (a) {
    return 'rgba(' + this.globalColor[0] + ',' + this.globalColor[1] + ',' + this.globalColor[2] + ',' + a + ')'
  },
  // 线条样式
  lineCap: function (string) {
    switch (string) {
      case '粗':
        return 'butt'
      case '圆':
        return 'round'
      case '平':
        return 'square'
    }
  },
  // 绘制直线
  strokeLine: function (obj) {
    this.context.beginPath()
    this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
    this.context.lineTo(this.offset[0], this.offset[1])
    if (!obj) {
      obj = {
        lineWidth: this.toolsArray[0].choose,
        alpha: parseInt(this.toolsArray[1].choose) / 100,
        lineCap: this.lineCap(this.toolsArray[2].choose),
        isFill: false
      }
    }
    this.changeStyle(obj)
  },
  // 绘制矩形
  strokeRect: function (obj) {
    this.context.beginPath()
    this.context.rect(this.beginPoint[0], this.beginPoint[1], this.offset[0] - this.beginPoint[0], this.offset[1] - this.beginPoint[1])
    if (!obj) {
      obj = {
        lineWidth: this.toolsArray[0].choose,
        alpha: parseInt(this.toolsArray[1].choose) / 100,
        isFill: this.toolsArray[3].isCheck
      }
    }
    this.changeStyle(obj)
  },
  // 绘制圆形
  strokeArc: function (obj) {
    var r = Math.sqrt(Math.pow((this.offset[0] - this.beginPoint[0]), 2) + Math.pow((this.offset[1] - this.beginPoint[1]), 2)) / 2
    var x = (this.beginPoint[0] + this.offset[0]) / 2
    var y = (this.beginPoint[1] + this.offset[1]) / 2
    this.context.beginPath()
    this.context.arc(x, y, r, 0, 2 * Math.PI, true)
    this.changeStyle(obj)
  },
  // 绘制三角形
  strokeTriangular: function () {
    this.context.beginPath()
    if (this.toolsArray[4].choose === '直角三角形') {
      this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
      this.context.lineTo(this.beginPoint[0], this.offset[1])
      this.context.lineTo(this.offset[0], this.offset[1])
    } else {
      this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
      this.context.lineTo((2 * this.beginPoint[0] - this.offset[0]), this.offset[1])
      this.context.lineTo(this.offset[0], this.offset[1])
    }
    this.context.closePath()
    var obj = {
      lineWidth: this.toolsArray[0].choose,
      alpha: parseInt(this.toolsArray[1].choose) / 100,
      isFill: this.toolsArray[3].isCheck
    }
    this.changeStyle(obj)
  },
  // 绘制椭圆
  strokeEllipse: function () {
    var obj = {
      lineWidth: this.toolsArray[0].choose,
      alpha: parseInt(this.toolsArray[1].choose) / 100,
      isFill: this.toolsArray[3].isCheck
    }
    if (this.toolsArray[4].isCheck) {
      this.strokeArc(obj)
    } else {
      var x = (this.beginPoint[0] + this.offset[0]) / 2
      var y = (this.beginPoint[1] + this.offset[1]) / 2
      var a = Math.abs(this.offset[0] - this.beginPoint[0]) / 2
      var b = Math.abs(this.offset[1] - this.beginPoint[1]) / 2
      this.context.save()
      // 选择a、b中的较大者作为arc方法的半径参数
      var r = (a > b) ? a : b
      var ratioX = a / r // 横轴缩放比率
      var ratioY = b / r // 纵轴缩放比率
      this.context.scale(ratioX, ratioY) // 进行缩放（均匀压缩）
      this.context.beginPath()
      // 从椭圆的左端点开始逆时针绘制
      this.context.moveTo((x + a) / ratioX, y / ratioY)
      this.context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI)
      this.context.closePath()
      this.changeStyle(obj)
      this.context.restore()
    }
  },
  // 画笔
  pen: function () {
    var obj = {
      lineWidth: this.toolsArray[0].choose,
      alpha: parseInt(this.toolsArray[1].choose) / 100,
      lineCap: this.lineCap(this.toolsArray[2].choose),
      isFill: false
    }
    this.strokeLine(obj)
    this.getImageData()
    this.beginPoint[0] = this.offset[0]
    this.beginPoint[1] = this.offset[1]
  },
  // 绘制参数
  changeStyle: function (obj) {
    // obj内有lineWidth, alpha, blur, isFill等参数
    for (var prop in obj) {
      switch (prop) {
        case 'lineWidth':
          this.context.lineWidth = obj.lineWidth
          break
        case 'alpha':
          this.context.fillStyle = this.rgba(obj.alpha)
          this.context.strokeStyle = this.rgba(obj.alpha)
          break
        case 'lineCap':
          this.context.lineCap = obj.lineCap
          break
        case 'isFill':
          if (obj.isFill) {
            this.context.fill()
          } else {
            this.context.stroke()
          }
      }
    }
  },
  // 绘制橡皮擦
  strokeSubber: function () {
    this.context.globalCompositeOperation = 'destination-out'
    var obj = {
      lineWidth: this.toolsArray[0].choose,
      isFill: false
    }
    this.strokeLine(obj)
    this.getImageData()
    this.beginPoint[0] = this.offset[0]
    this.beginPoint[1] = this.offset[1]
  },
  // 选择工具
  selectTool: function () {
    this.imgData = this.selectToolObj.imgData
    this.selectToolObj.isShow = true
    this.putImageData()
    if (this.toolsArray[0].choose === '矩形') {
      this.selectToolObj.margin = [
        this.beginPoint[0] < this.offset[0] ? this.beginPoint[0] : this.offset[0],
        this.beginPoint[1] < this.offset[1] ? this.beginPoint[1] : this.offset[1]
      ]
      this.selectToolObj.moveBoxLen = [
        Math.abs(this.offset[0] - this.beginPoint[0]),
        Math.abs(this.offset[1] - this.beginPoint[1])
      ]
    }
  },
  // 移动工具
  moveSelectTool: function () {
    // 更新canvas
    this.$nextTick(function () {
      this.selectToolObj.canvas = document.getElementById('moveBox')
      this.selectToolObj.context = this.selectToolObj.canvas.getContext('2d')
      this.getMoveData()
      this.selectToolObj.canvas.addEventListener('mousedown', this.moveBox)
    })
  },
  // 获取移动数据
  getMoveData: function () {
    var context = this.selectToolObj.context
    var imgData = this.imgData
    var w = imgData.width
    var moveBoxData = context.getImageData(0, 0, this.selectToolObj.moveBoxLen[0], this.selectToolObj.moveBoxLen[1])
    var data = imgData.data
    var x1 = document.getElementById('moveBox').offsetLeft
    var x2 = document.getElementById('moveBox').offsetLeft + this.selectToolObj.moveBoxLen[0]
    var y1 = document.getElementById('moveBox').offsetTop
    var y2 = document.getElementById('moveBox').offsetTop + this.selectToolObj.moveBoxLen[1]
    var j = 0
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        var i = (w * y + x) * 4
        moveBoxData.data[j] = data[i]
        moveBoxData.data[j + 1] = data[i + 1]
        moveBoxData.data[j + 2] = data[i + 2]
        moveBoxData.data[j + 3] = data[i + 3]
        data[i] = data[i + 1] = data[i + 2] = 255
        j += 4
      }
    }
    this.selectToolObj.moveBoxData = moveBoxData
    this.putImageData()
    context.putImageData(moveBoxData, 0, 0)
  },
  putMoveData: function () {
    var moveBoxData = this.selectToolObj.moveBoxData.data
    var x1 = document.getElementById('moveBox').offsetLeft
    var x2 = document.getElementById('moveBox').offsetLeft + this.selectToolObj.moveBoxLen[0]
    var y1 = document.getElementById('moveBox').offsetTop
    var y2 = document.getElementById('moveBox').offsetTop + this.selectToolObj.moveBoxLen[1]
    var imgData = this.imgData
    var data = imgData.data
    var w = imgData.width
    var h = imgData.height
    var k = 0
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        if (x > 0 && x < w && y > 0 && y < h) {
          if (!(moveBoxData[k] === 0 && moveBoxData[k + 1] === 0 && moveBoxData[k + 2] === 0 && moveBoxData[k + 3] === 0)) {
            var i = (w * y + x) * 4
            data[i] = moveBoxData[k]
            data[i + 1] = moveBoxData[k + 1]
            data[i + 2] = moveBoxData[k + 2]
            data[i + 3] = moveBoxData[k + 3]
          }
        }
        k += 4
      }
    }
    this.putImageData()
    this.selectToolObj.isShow = false
    var obj = {
      id: 1,
      imgData: imgData
    }
    this.$store.commit('changeDataArr', obj)
  }
}
export default Stroke
