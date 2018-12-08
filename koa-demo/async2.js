function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}
// 调用函数
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
// 调用函数
asyncPrint('timeout', 2000);
// 2s之后打印出'timeout',如果不相信可以使用vscode编辑器的run code插件，会把执行时间展示给你！
