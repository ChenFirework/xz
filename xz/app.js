const express=require('express');
const bodyParser=require('body-parser');
//引入路由器
const userRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js');
var app=express();
app.listen(8080);
//使用第三方中间件-------中间件只能在服务器端使用
app.use(bodyParser.urlencoded({
	extended:false
}));
//托管静态资源到public目录
app.use( express.static('./public') );
//使用路由器，挂载到/user下
app.use('/user',userRouter);
app.use('/product',productRouter);











