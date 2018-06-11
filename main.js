var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHtml(title, list, body, link){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB run by PM2</a></h1>
    <h2>pm2 start main.js --watch</h2>
    <h2>pm2 log</h2>
    ${list}
    ${link}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(`queryData.id : ${queryData.id}, pathname : ${pathname}`);

    if(pathname === '/'){
      if(queryData.id === undefined){

        fs.readdir('./data', function(err, filelist){
          console.log(filelist);

          var title = 'Welcome';
          var description = 'Hi, Node.js';
          var body = `<h2>${title}</h2> ${description}`;
          var link = '<a href="/create">create</a>';
          var list = templateList(filelist);
          var template = templateHtml(title, list, body, link);

          response.writeHead(200);
          response.end(template);
        });

      } else {
        fs.readdir('./data', function(error, filelist){

          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var body = `<h2>${title}</h2> ${description}`;
            var link = `<a href="/create">create</a>
                        <a href="/update?id=${title}">update</a>
                        <form action="/delete_process" method="post">
                          <input type="hidden" name="id" value="${title}">
                          <input type="submit" value="delete">
                        </form>`;
            var list = templateList(filelist);
            var template = templateHtml(title, list, body, link);

            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(err, filelist){
        console.log(filelist);

        var title = 'WEB - create';
        var body = `<h2>${title}</h2>
                    <form action="/create_process" method="post">
                      <p><input type="text" name="title" placeholder="title"></p>
                      <p><textarea name="description" rows="8" cols="80" placeholder="description"></textarea></p>
                      <p><input type="submit" name=""></p>
                    </form>`;
        var link = '';
        var list = templateList(filelist);
        var template = templateHtml(title, list, body, link);

        response.writeHead(200);
        response.end(template);
      });

    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs .parse(body);
        var title = post.title;
        var description = post.description;
        console.log(`title : ${post.title}, description: ${post.description}`);
        fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
          /*
          response.writeHead(200);
          response.end('Success!');
          */
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });

    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var link = `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`;
          var list = templateList(filelist);

          var body = `<h2>${title}</h2>
                      <form action="/update_process" method="post">
                        <p><input type="hidden" name="id" value=${title}></p>
                        <p><input type="text" name="title" placeholder="title" value=${title}></p>
                        <p><textarea name="description" rows="8" cols="80" placeholder="description">${description}</textarea></p>
                        <p><input type="submit" name=""></p>
                      </form>`;

          var template = templateHtml(title, list, body, link);

          response.writeHead(200);
          response.end(template);
        });
      });

    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs .parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        console.log(`id : ${post.id}, title : ${post.title}, description: ${post.description}`);
        fs.rename(`data/${post.id}`, `data/${post.title}`, (err) => {
          if (err) throw err;
          fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
          console.log('Rename complete!');
        });
      });

    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs .parse(body);
        var id = post.id;
        console.log(`id : ${post.id}`);
        // Assuming that 'path/file.txt' is a regular file.
        fs.unlink(`data/${id}`, (err) => {
          if (err) throw err;
          response.writeHead(302, {Location: `/?id=${id}`});
          response.end();
          console.log(`delete ${id}...Okay!`);
        });
      });

    } else {
      response.writeHead(404);
      response.end('Not found');
    }



});
app.listen(3000);
