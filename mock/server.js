// 后台只提供接口，前端只调用接口
let http = require('http');
let fs = require('fs');
let url = require('url');
let sliders = require('./slider');
function read(callback) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    data = data.length === 0 ? [] : JSON.parse(data);
    callback(data);
  });
}
/**
 *
 * @param data 要写入的数据
 * @param callback 写入成功后的回调
 */
function write(data, callback) {
  fs.writeFile('./book.json', JSON.stringify(data), callback)
}


http.createServer(function (req, res) {
  let { pathname, query } = url.parse(req.url, true);
  let id = query.id; //如果传递id 将id保留下来
  if (pathname === '/api/slider') {
    return res.end(JSON.stringify(sliders));
  }
  if (pathname === '/api/hot') {
    read(function (data) { //data表示读到的结果
      var books = data.reverse().slice(0, 6);
      res.end(JSON.stringify(books));
    });
    return;
  }
  // 图书的增删改查
  if (pathname === '/api/book') {
    switch (req.method) {
      case 'GET':
        if (id) { //获取一本图书
          read(function (books) {
            let book = books.find(item => item.id == id);
            res.end(JSON.stringify(book));
          })
        } else {
          read(function (data) {//data代表所有数据
            res.end(JSON.stringify(data));
          });
        }
        break;
      case 'POST':
        //发送过来的请求体默认就是对象格式{}
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          read(function (books) { //读取所有的书 获取最后一项的id 累加
            book.id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
            books.push(book);//将新书放回去
            write(books, function () {
              res.end(JSON.stringify(book));
            })
          });
        });
        break;
      case 'DELETE':
        // /api/book?id=1;
        read(function (books) {
          books = books.filter(item => id != item.id);
          write(books, function () {
            res.end(JSON.stringify({}));
          });
        });
        break;
      case 'PUT':
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          //book代表的是要修改成什么样
          let book = JSON.parse(str);
          read(function (books) {
            books = books.map(item => {
              if (item.id == id) {
                return book;
              }
              return item;
            });
            write(books, function () {
              res.end(JSON.stringify(book));
            });
          })
        });
        break;
    }

  }


}).listen(3000);
