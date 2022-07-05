const fs = require('fs')
const path = require('path')

// 复制文件
function copyFile (srcPath, tarPath, cb) {
  var rs = fs.createReadStream(srcPath)
  rs.on('error', function (err) {
    if (err) {
      console.log('read error', srcPath)
    }
    cb && cb(err)
  })

  var ws = fs.createWriteStream(tarPath)
  ws.on('error', function (err) {
    if (err) {
      console.log('write error', tarPath)
    }
    cb && cb(err)
  })

  ws.on('close', function (ex) {
    cb && cb(ex)
  })

  rs.pipe(ws)
}

function copyDir (srcDir, tarDir, cb) {
  if (fs.existsSync(tarDir)) {
    fs.readdir(srcDir, function (err, files) {
      var count = 0
      var checkEnd = function () {
        ++count === files.length && cb && cb()
      }

      if (err) {
        checkEnd()
        return
      }

      files.forEach(function (file) {
        var srcPath = path.join(srcDir, file)
        var tarPath = path.join(tarDir, file)

        fs.stat(srcPath, (err, stats) => {
          if (err) return
          if (stats.isDirectory()) {
            fs.mkdir(tarPath, function (err) {
              if (err) {
                console.log(err)
                return
              }

              copyDir(srcPath, tarPath, checkEnd)
            })
          } else {
            copyFile(srcPath, tarPath, checkEnd)
          }
        })
      })

          // 为空时直接回调
      files.length === 0 && cb && cb()
    })
  } else {
    fs.mkdir(tarDir, function (err) {
      if (err) {
        console.log(err)
        return
      }
      copyDir(srcDir, tarDir, cb)
    })
  }
}

// 删除
function rmDirFile (path, cb) {
  let files = []
  console.log('开始删除')
  if (fs.existsSync(path)) {
    var count = 0
    var checkEnd = function () {
      ++count === files.length && cb && cb()
    }
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        rmDirFile(curPath, checkEnd)
      } else {
        fs.unlinkSync(curPath)
        checkEnd()
      }
    })
    // 如果删除文件夹为放置文件夹根目录  不执行删除
    fs.rmdirSync(path)
    // 为空时直接回调
    files.length === 0 && cb && cb()
  } else {
    cb && cb()
  }
}

module.exports = {
  copyDir,
  rmDirFile
}
