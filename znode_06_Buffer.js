/**
 *
 */
var buf1 = Buffer.alloc(10);
console.log(buf1);

var buf2 = Buffer.allocUnsafe(10);
console.log(buf2);

var size1 = Buffer.byteLength(buf1);
console.log("size1 :", size1);
console.log("bytes :", buf1.length);

var buf3 = Buffer.from('abcd');
var buf4 = Buffer.from('안녕하세요');
console.log(buf3);
console.log(buf4);

var buf5 = Buffer.from('cccc');
var buf6 = Buffer.from('cccc');
var buf7 = Buffer.from('aaaa');
var buf8 = Buffer.from('dddd');

//...if same 1, or 0.
var v1 = Buffer.compare(buf5, buf6);
console.log("Buffer.compare(buf5, buf6) v1 :", v1);

var v2 = Buffer.compare(buf5, buf7);
console.log("Buffer.compare(buf5, buf7) v2 :", v2);

var v3 = Buffer.compare(buf5, buf8);
console.log("Buffer.compare(buf5, buf8) v3 :", v3);

var array1 = [buf5, buf6, buf7, buf8];

//...create a new array to merge buffers inside array.
var buf9 = Buffer.concat(array1);
console.log('buf9: ', buf9);

var buf10 = Buffer.from('123456789');
var buf11 = Buffer.alloc(10);
buf10.copy(buf11, 0, 2, 5);
console.log('buf10:', buf10);

//...output : [index, value]
console.log('buf5 : ', buf5);
var array2 = buf5.entries();
console.log('array2 :', array2);
for(var str of array2){
	console.log('str : ', str);
}

var buf11 = Buffer.from('abcd');
var buf12 = Buffer.from('abcd');
var buf13 = Buffer.from('zzzz');

var v4 = buf11.equals(buf12);
console.log("v4 :", v4);

var v5 = buf11.equals(buf13);
console.log("v5 :", v5);

var buf14 = Buffer.from('aaaaa');
console.log("buf14 : ", buf14);

buf14.fill('c')
console.log("buf14 : ", buf14);

buf14.fill('abc');
console.log("buf14 : ", buf14);

var buf15 = Buffer.from("Hello Node.js Node.js");
var v6 = buf15.includes("Node");
console.log("v6 :", v6);

var v7 = buf15.includes("JavaScript");
console.log("v7 :", v7);

var v8 = buf15.indexOf("Node");
console.log("v8 :", v8);

var v9 = buf15.indexOf("JavaScript");
console.log("v9 : ", v9);

var v10 = buf15.lastIndexOf("Node");
console.log("v10 :", v10);

var v11 = Buffer.isBuffer(buf15);
console.log('buf15 : ', buf15);
console.log("v11 :", v11);

var obj1 = {
	a1 : 10
};
var v12 = Buffer.isBuffer(obj1);
console.log("v12 :", v12);

//...output : index
var array3 = buf15.keys();
for(var i of array3){
	console.log(i);
}

var v13 = buf15.toString();
console.log("v13 :", v13);
