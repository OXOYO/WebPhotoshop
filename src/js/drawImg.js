// 特殊效果
import effect from './effect'
class DrawImg {
  constructor () {
    this.obj = {
      '黑白': ['setBlack', 0],
      '反色': ['setInverted', 1],
      '模糊': ['gaussBlur', 2],
      '灰度化': ['setGrayscale', 3],
      '锐化': ['setSharpen', 4],
      '浮雕': ['setRelief', 5],
      '柔化': ['setSoften', 6],
      '油画': [7],
      '积木': [8],
      '雕刻': ['setSculpture', 9],
      '怀旧': ['setNostalgia', 10]
    }
  }
  change (str, vue) {
    const canvasArr = vue.nowCanvasArr
    const context = canvasArr.context
    const val = this.obj[str][0]
    const imgData = effect[val](canvasArr.imgData)
    canvasArr.imgData = imgData
    context.putImageData(imgData, 0, 0)
    const obj = {
      id: vue.tools.length + this.obj[str][1],
      imgData: imgData
    }
    vue.$store.commit('changeDataArr', obj)
  }
}
export default new DrawImg()
