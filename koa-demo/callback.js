function delay(fn) {
  setTimeout(() => {
    console.log('开始')
    fn()
  },1000)
  fn()
}

delay(() => {
  console.log('结束')
})
