; (function () {
  /**
   * 通用错误处理函数
   * @param {Function} fn 传入一个函数
   * @param {Boolean} is 是否启用撤销组
   * @returns {Function} 返回一个函数
   */
  function err_fun(fn, is) {
    return function (data) {
      // 尝试打印函数执行是的this
      // alert(JSON.stringify(this));
      try {
        if (is === true) {
          app.beginUndoGroup("LoYoi:" + fn.name)
        }
        /**重新给函数绑定this，并传递参数 */
        return fn.apply(this, [data])
      } catch (error) {
        if (is === true) {
          app.endUndoGroup()
        }
        alert(error.message, "AE6错误提示：" + error.line)
      }
    }
  }

  // 高级用法，在对象上绑定错误处理函数，thsi为整个对象
  var obj = {
    a: 1,
    b: 2,
    c: err_fun(function (c) {
      // 检查参数是否为数字，如果不是数字，则抛出错误
      if (isNaN(c)) throw new Error("参数必须为数字")
      // 打印执行结果
      alert(this.a + this.b + c)
    }),
  }
  
  // obj.c(5) // 输出 8
  // obj.c(0) // 输出 3
  obj.c() // 输出 一个错误提示

  // err_fun(obj.c)();
})()
