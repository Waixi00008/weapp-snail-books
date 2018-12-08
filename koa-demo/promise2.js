function timeout1(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

// 因为上面函数返回是的Promise对象，所以直接使用链式方法then时，是在Promise对象内的函数执行完之后执行的，这样就可以达到上面同样的结果
timeout1(5000).then(() => {
  console.log('timeout1'); // 5s之后打印出'timeout1'
})
