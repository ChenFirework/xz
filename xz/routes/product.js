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

//商品详情
router.get('/detail',function(req,res){
	if (!req.query.lid)
	{
		res.send('lid required');
		return;
	}
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',[req.query.lid],function(err,result){
		if(err) throw err;
		if(result.length===0){
			res.send({code:301,msg:'can not found'});
			return;
		}else{
			res.send(result[0]);
		}
	});
});

//商品添加
router.post('/add',function(req,res){
	//验证数据是否为空
	//console.log(req.body);
	var obj=req.body;
	var num=400;
	for (var key in obj )
	{
		num++;
		if(!obj[key]){
			res.send({code:num,msg:key+' required'});
			return;
		}
	}
	//执行SQL语句
	pool.query('INSERT INTO xz_laptop SET ?',[obj],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
		}
	});
});


//修改商品
router.post('/update',function(req,res){
	var obj=req.body;
	pool.query('UPDATE xz_laptop SET ? WHERE lid=?',[obj,obj.lid],function(err,result){
		if(err) throw err;
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
	var obj=req.query;
	if(!obj.lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
		if(err) throw err;
		if (result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		}
	});
});


module.exports=router;








