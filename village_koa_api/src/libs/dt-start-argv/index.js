module.exports.getArgs = function (defalut) {
  var args = process.argv.splice(2)
  var argsData = defalut
  for (var i = 0; i < args.length; i++) {
    var value = args[i]
    if (value === '--port' || value === '-P') {
      argsData.port = parseInt(args[i + 1])
    }
  }
  return argsData
}
