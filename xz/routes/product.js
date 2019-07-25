const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//商品列表
router.get('/list',function(req,res){
	var obj=req.query;
	if (!obj.pno)
	{
		obj.pno=1;
	}
	if (!obj.count)
	{
		obj.count=9;
	}
	obj.pno=parseInt((obj.pno-1)*obj.count);
	pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[obj.pno,parseInt(obj.count)],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});
/*
//商品详情
router.get('/detail',function(req,res){
	//console.log(req.query.uid);
	if (!req.query.uid)
	{
		res.send('uid required');
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uid=?',[req.query.uid],function(err,result){
		if(err) throw err;
		//console.log(result);
		if(result.length===0){
			res.send({code:301,msg:'can not found'});
			return;
		}else{
			res.send(result[0]);
		}
	});
});
//商品添加
router.post('/reg',function(req,res){
	//验证数据是否为空
	if (!req.body.uname)
	{
		res.send({code:401,msg:'uname required'});
		return;
	}
	if (!req.body.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if (!req.body.email)
	{
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!req.body.phone)
	{
		res.send({code:404,msg:'phone required'});
		return;
	}
	//执行SQL语句
	pool.query('INSERT INTO xz_user SET ?',[req.body],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
	});
});
//修改商品
router.get('/update',function(req,res){
	//console.log(req.query);
	var obj=req.query;
	var i=400;
	for (var key in obj )
	{
		i++;
		if (!obj[key])
		{
			res.send({code:302,msg:key+' required'});
			return;
		}
	}
	if (obj.gender=='男')
	{
		obj.gender=1;
	}else if (obj.gender=='女')
	{
		obj.gender=0;
	}
	//res.send('修改成功');
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
		if(err) throw err;
		//console.log(result);
		if (result.affectedRows>0)
		{
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:301,msg:'update fail'});
		}
	});
});
//删除商品
router.get('/delete',function(req,res){
	if(!req.query.uid){
		res.send('uid required');
		return;
	}
	pool.query('DELETE FROM xz_user WHERE uid=?',[req.query.uid],function(err,result){
		if(err) throw err;
		if (result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		}
	});
});
*/







module.exports=router;








