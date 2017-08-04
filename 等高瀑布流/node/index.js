const fs = require('fs')

let nameArr = []
fs.readdir('../nice', function(err, files) {
    if (err) {
        console.log('出错了')
    } else {
        files.forEach(function(filename) {
            // 去除以.开头的默认文件
            if (filename.indexOf('.') === 0) {
                return
            }
            nameArr.push(filename)
        })
        fs.writeFile('../scripts/data.js',
            `let nameArr = ${JSON.stringify(nameArr)}`,
            function(err) {
                err && console.log(err)
            }
        )
    }
})
