function delay(word) {
  return new Promise((reslove,reject) => {
    setTimeout(() => {
      reslove(word)
    },1000)
  })
}

delay('孙悟空')
  .then((word) => {
    console.log(word)
    return delay('猪八戒')
  })
  .then((word) => {
    console.log(word)
    return delay('沙悟净')
  })
  .then((word) => {
    console.log(word)
  })
