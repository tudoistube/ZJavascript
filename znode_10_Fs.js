/**
 *
 */
var fs = require("fs");
/*
fs.writeFile("data1.txt", "fs.writeFile : 비동기저장1", function(error){
	console.log("비 동기식 저장 1");
});
fs.writeFile("data2.txt", "fs.writeFile : 비동기저장2", function(error){
	console.log("비 동기식 저장 2");
});

fs.appendFile("data1.txt", "1 안녕하세요", function(error){
	console.log("비 동기식 추가 1");
});
fs.appendFile("data2.txt", "2 반갑습니다", function(error){
	console.log("비 동기식 추가 2");
});

//...if no comment in above writeFile, error occurs.
fs.readFile("data1.txt", function(error, data){
	console.log("data1 :", data.toString());
});
fs.readFile("data2.txt", function(error, data){
	console.log("data2 :", data.toString());
});
*/


fs.writeFileSync("data3.txt", "fs.writeFileSync : 1. Sync needs no callback function.");
console.log("동기식 저장 1");

fs.writeFileSync("data4.txt", "fs.writeFileSync : 2. Sync needs no callback function.");
console.log("동기식 저장 2");

fs.appendFileSync("data3.txt", "안녕하세요");
console.log("파일 내용 추가 1");

fs.appendFileSync("data4.txt", "반갑습니다");
console.log("파일 내용 추가 2");

var data3 = fs.readFileSync("data3.txt");
console.log("data3 :", data3.toString());

var data4 = fs.readFileSync("data4.txt");
console.log("data4 :", data4.toString());
