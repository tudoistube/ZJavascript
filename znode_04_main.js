/**
 * 	main.js
 */

var second = require("./znode_04_other.js");

function f1(){

	console.log("a1 함수 호출");
}


console.log("Hello World");

var a1 = 100;
var a2 = "문자열1";

console.log("a1 : %d, a2 : %s", a1, a2);

console.log("a1 :", a1);
console.log("a1 :", a1, "a2 :", a2);

f1();
second.f2();
