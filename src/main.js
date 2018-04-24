// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    offset: [20, 40],
    toolsArray: [
      [{
        // 选择工具
        key: 0,
        title: '选择框',
        choose: '矩形',
        optional: ['矩形', '圆形']
      }],
      [],
      [],
      [{
        // 缩放工具
        key: 2,
        imgName: ['zoomin', 'zoomout']
      }],
      [],
      [],
      [{
        // 渐变工具
        key: 0,
        title: '渐变模式',
        choose: '线性',
        optional: ['线性', '反射', '钻石', '放射']
      }],
      [{
        // 画笔
        key: 0,
        title: '笔型',
        choose: '书法画笔',
        optional: ['书法画笔', '喷枪', '蜡笔', '记号笔', '水彩画笔']
      }, {
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }],
      [{
        // 铅笔
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }],
      [{
        // 橡皮
        key: 3,
        title: '宽度',
        choose: 8
      }],
      [],
      [],
      [{
        // 文本
        key: 0,
        title: '字体',
        choose: '微软雅黑',
        optional: ['微软雅黑', '宋体', '楷体', '隶书', '新宋体', '幼圆', '仿宋', '黑体', '华文彩云', 'Arial', 'Arial Black', 'Batang', 'Bell MT', 'Courier New', 'Courier', 'Calibri']
      }, {
        key: 0,
        title: '字号',
        choose: 8,
        optional: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 26, 48, 72]
      }, {
        key: 1,
        title: '加粗',
        isCheck: false
      }, {
        key: 1,
        title: '倾斜',
        isCheck: false
      }, {
        key: 1,
        title: '下划线',
        isCheck: false
      }, {
        key: 1,
        title: '删除线',
        isCheck: false
      }, {
        key: 0,
        title: '对齐',
        choose: '左对齐',
        optional: ['左对齐', '居中', '右对齐']
      }],
      [{
        // 直线
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 0,
        title: '线条样式',
        choose: '实线',
        optional: ['实线', '虚线1', '虚线2', '虚线3']
      }],
      [{
        // 曲线
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }],
      [{
        // 矩形
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 1,
        title: '是否圆角',
        isCheck: false
      }],
      [{
        // 椭圆
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 1,
        title: '是否圆',
        isCheck: false
      }],
      [{
        // 三角形
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 0,
        title: '三角形',
        choose: '直角三角形',
        optional: ['直角三角形', '等腰三角形']
      }],
      [{
        // 多变形
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 1,
        title: '是否为正多变形',
        isCheck: false
      }],
      [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 0,
        title: '选择形状',
        choose: '箭头',
        optional: ['箭头', '花', '人物', '太阳']
      }],
      [{
        // 图章
        key: 3,
        title: '宽度',
        choose: 8
      }],
      [{
        // 透明度
        key: 2,
        imgName: ['edit_add', 'edit_remove']
      }, {
        key: 3,
        title: '调节比例',
        choose: '1%'
      }]
    ],
    tools: [
      {
        name: 'Select',
        title: '选择工具 (S)',
        description: '点击并拖拽去画一个选择区。'
      },
      {
        name: 'Move',
        title: '移动工具 (M)',
        description: '拖动选择可以移动位置。'
      },
      {
        name: 'Lasso',
        title: '套索工具 (A)',
        description: '点击并拖拽为选择区画轮廓。'
      },
      {
        name: 'ZoomAll',
        title: '缩放工具 (Z)',
        description: '左击放大，右击缩小。'
      },
      {
        name: 'Hand',
        title: '手抓工具 (H)',
        description: '点击按下并拖拽以沿想要的方向滚动图像。'
      },
      {
        name: 'Fill',
        title: '填充工具 (F)',
        description: '点击按下想要的图像区域填充颜色。'
      },
      {
        name: 'Gradient',
        title: '渐变工具 (N)',
        description: '点击按下并拖动产生渐变。'
      },
      {
        name: 'PaintBrush',
        title: '画笔 (B)',
        description: '点击按下并拖动绘图。'
      },
      {
        name: 'Pencil',
        title: '铅笔 (P)',
        description: '点击按下并拖动绘图。'
      },
      {
        name: 'Eraser',
        title: '橡皮擦 (E)',
        description: '点击按下并拖动清除图像。'
      },
      {
        name: 'ZoomMiro',
        title: '放大镜 (O)',
        description: '左击局部放大图像，右击局部缩小图像。'
      },
      {
        name: 'SelectCut',
        title: '裁剪 (C)',
        description: '点击按下并拖动选择需要裁剪的图像。'
      },
      {
        name: 'Text',
        title: '文本 (T)',
        description: '左击放置文本光标，然后输入文字。'
      },
      {
        name: 'Line',
        title: '直线 (L)',
        description: '左击并且拖动绘制直线。'
      },
      {
        name: 'Curve',
        title: '曲线 (V)',
        description: '左击并且拖动绘制直线，然后选择点拖动变为曲线。'
      },
      {
        name: 'Rectangle',
        title: '矩形 (R)',
        description: '左击并且拖动绘制矩形。'
      },
      {
        name: 'Ellipse',
        title: '椭圆 (I)',
        description: '左击并且拖动绘制椭圆。'
      },
      {
        name: 'Triangle',
        title: '三角形 (G)',
        description: '左击并且拖动绘制三角形。'
      },
      {
        name: 'Polygon',
        title: '多边形 (Y)',
        description: '左击并且拖动绘制多边形。 尺寸：464x146'
      },
      {
        name: 'OtherShap',
        title: '其他形状 (W)',
        description: '左击并且拖动绘制选择的形状。 尺寸：464x146'
      },
      {
        name: 'Clone',
        title: '图章 (X)',
        description: '按Ctrl键的同时左击选择物体，然后左键拖动复制。 尺寸：464x146'
      },
      {
        name: 'Alpha',
        title: '透明度 (D)',
        description: '点击减淡或加深按钮改变图像透明度。 尺寸：464x146'
      }
    ],
    effectArr: [
      {
        name: 'blackwhite',
        title: '黑白 Ctrl+Shift+W'
      }, {
        name: 'opsitecolor',
        title: '反色 Ctrl+Shift+I'
      }, {
        name: 'light',
        title: '亮度/对比度'
      }, {
        name: 'blur',
        title: '模糊 Ctrl+Shift+B'
      }, {
        name: 'cloud',
        title: '雾化 Ctrl+Shift+M'
      }, {
        name: 'sharpen',
        title: '锐化 Ctrl+Shift+S'
      }, {
        name: 'float',
        title: '浮雕 Ctrl+Shift+F'
      }, {
        name: 'soft',
        title: '柔化 Ctrl+Shift+T'
      }, {
        name: 'painting',
        title: '油画 Ctrl+Shift+P'
      }, {
        name: 'wood',
        title: '积木 Ctrl+Shift+D'
      }, {
        name: 'curve',
        title: '雕刻 Ctrl+Shift+V'
      }, {
        name: 'turnold',
        title: '怀旧 Ctrl+Shift+O'
      }, {
        name: 'new',
        title: '新建'
      }
    ],
    toolId: 8,
    globalColor: [0, 0, 0],
    canvasArr: [{
      name: '新建画布1.png',
      width: 820,
      height: 520,
      context: '',
      canvas: '',
      imgData: '',
      dataArr: [{
        id: 34,
        imgData: ''
      }],
      index: 0,
      // 亮度/对比度
      lightObj: {
        name: 'light',
        title: '亮度/对比度',
        data: [{
          title: '亮度',
          num: 0,
          len: [-50, 50]
        }, {
          title: '对比度',
          num: 0,
          len: [-50, 50]
        }]
      }
    }],
    nowCanvas: 0,
    selectGrayscale: '',
    showColorPicker: false,
    // 窗口
    showPops: {
      showRecord: true,
      showTools: true
    },
    // 各种弹窗开启
    popUpsKey: {
      newCanvas: false,
      closeCanvas: false,
      clearCanvas: false,
      fieldset: false,
      aboutWebPhotoshop: false
    }
  },
  mutations: {
    changeOffset (state, offsetArr) {
      state.offset = {...state.offset, offsetArr}
    },
    changeToolsArray (state, toolsArray) {
      state.toolsArray = {...state.toolsArray, toolsArray}
    },
    changeToolId (state, toolId) {
      state.toolId = toolId
    },
    addCanvasArr (state, obj) {
      state.canvasArr.push(obj)
    },
    popCanvasArr (state, index) {
      state.canvasArr.splice(index, 1)
      if (index < state.nowCanvas) state.nowCanvas = state.nowCanvas - 1
      if (state.canvasArr.length - 1 < state.nowCanvas) state.nowCanvas = state.canvasArr.length - 1
    },
    // 改变dataArr
    changeDataArr (state, obj) {
      state.canvasArr[state.nowCanvas].index = state.canvasArr[state.nowCanvas].dataArr.length
      state.canvasArr[state.nowCanvas].dataArr.push(obj)
    },
    // 改变index
    changeIndex (state, index) {
      state.canvasArr[state.nowCanvas].index = index
    },
    // 清除画布
    clearCanvas (state) {
      state.canvasArr[state.nowCanvas].dataArr = [].concat(state.canvasArr[state.nowCanvas].dataArr[0])
      state.canvasArr[state.nowCanvas].index = 0
    },
    changeCanvasArr (state, obj) {
      state.canvasArr[state.nowCanvas] = {...state.canvasArr[state.nowCanvas], obj}
    },
    changeNowCanvas (state, nowCanvas) {
      state.nowCanvas = nowCanvas
      state.selectGrayscale = ''
    },
    changeSelectGrayscale (state, string) {
      state.selectGrayscale = string
      if (string === '亮度/对比度') {
        state.popUpsKey.fieldset = true
      }
    },
    changeglobalColor (state, arr) {
      state.globalColor = [].concat(arr)
    },
    changeShowColorPicker (state, bol) {
      state.showColorPicker = bol
    },
    changePopUpsKey (state, arr) {
      state.popUpsKey[arr[0]] = arr[1]
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
