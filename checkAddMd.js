const fs = require('fs');
const path = require('path'); //解析需要遍历的文件夹
const readline = require('readline');

const jsmkdir = path.resolve('./docs');
//调用文件遍历方法
fileDisplay(jsmkdir);
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            // console.log(filedir);　　　　　　　　　　　　　　　　　 // 文件绝对路径

                            var stat = fs.statSync(filedir);
                            const editTime = Math.ceil(stat.mtimeMs / 1000); //文件修改时间
                            if (isLatelyUpdated(editTime)) {
                                console.log(filedir)
                                var fRead = fs.createReadStream(filedir);

                                var objReadline = readline.createInterface({
                                    input: fRead,
                                    // 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
                                    // 但文件末尾会多算一次index计数   sodino.com
                                    //  output: fWrite, 
                                    //  terminal: true
                                });


                                var index = 1;
                                objReadline.on('line', (line) => {
                                    var tmp = 'line' + index.toString() + ':' + line;
                                    console.log(index, line);
                                    index++;
                                });
                            }
                            // var content = fs.readFileSync(filedir, 'utf-8');
                            // console.log(content);

                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

function isLatelyUpdated(edit_time) {
    let daySecond = 86400;
    let hourSecond = 60 * 60;
    let nowTime = Math.round(new Date() / 1000);
    if (nowTime - edit_time < hourSecond) {
        return true;
    } else {
        return false;
    }


}