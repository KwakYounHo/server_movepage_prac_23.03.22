const fs    = require('fs');
const http  = require('http');
const mysql = require('mysql2');
const conn  = mysql.createConnection({
  host     : '127.0.0.1',
  password : 'root',
  user     : 'root',
  database : 'test_youn'
})



const server = http.createServer((req,rep)=>{
  //---최초 접속
  if (req.method === 'GET' && req.url === '/') {
    const mainPage = fs.readFileSync('./index.html','utf-8');
    rep.writeHead(200,{'Content-Type':'text/html'});
    rep.end(mainPage);
  }
  
  //---메인
  if (req.method === 'GET' && req.url === '/index.html') {
    const mainPage = fs.readFileSync('./index.html','utf-8');
    rep.writeHead(200,{'Content-Type':'text/html'});
    rep.end(mainPage);
  }
  
  //---두 번째 페이지
  if (req.method === 'GET' && req.url.startsWith('/newIndex.html')) {
    const secondPage = fs.readFileSync('./newindex.html','utf-8');
    rep.writeHead(200, {'Content-Type':'text/html'});
    rep.end(secondPage);
  }
})


conn.connect();

let command = `
desc testtable3
`
conn.query(
  command,
  (err,result)=>{
    if (err) throw err;
    console.log(result);
  }
)

conn.end();

server.listen(2080,(err)=>{
  if (err) {
    throw err;
  } else {
    console.log('Server Run Port : 2080');
  }
})