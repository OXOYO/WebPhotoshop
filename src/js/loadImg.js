function loadImg (file, img) {
  var canvas = document.createElement('canvas')
  canvas.setAttribute('width', img.width)
  canvas.setAttribute('height', img.height)
  var context = canvas.getContext('2d')
  context.drawImage(img, 0, 0)
  var data = context.getImageData(0, 0, img.width, img.height)
  var obj = {
    name: file.name,
    width: img.width,
    height: img.height,
    context: '',
    canvas: '',
    imgData: '',
    scaleProportion: 1,
    dataArr: [{
      id: 33,
      imgData: data
    }],
    index: 0,
    light: {
      name: 'light',
      title: '亮度/对比度',
      data: [{
        title: '亮度',
        num: 0,
        len: [-150, 150]
      }, {
        title: '对比度',
        num: 0,
        len: [-100, 100]
      }]
    },
    colorpalettes: {
      name: 'colorpalettes',
      title: '色相/饱和度',
      data: [{
        title: '色相',
        num: 0,
        len: [-180, 180]
      }, {
        title: '饱和度',
        num: 0,
        len: [-100, 100]
      }]
    }
  }
  return obj
}
export default loadImg
