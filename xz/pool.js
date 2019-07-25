//创建一个独立的连接池模块，供其他路由使用
//引入mysql模块
const mysql=require('mysql');
//创建连接池对象
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'xz',
	connectionLimit:20
});
module.exports=pool;



