function mouseBlur(){//消除光标
	document.getElementById('imgCode').blur();
}
function reloadcode(){
  	var verify=document.getElementById('imgCode');
  	verify.style.backgroundImage="url(tools/makeCertPic.jsp?it="+Math.random()+")";
}
function errorHandle(){
	var form=document.getElementById('login_form');
	form.reset();
	reloadcode();
}
function verify(){
	var u=document.getElementById('user');
	var p=document.getElementById('pwd');
	var c=document.getElementById('code');
	
	if(u.value == ""){
		return alert("请输入管理员账号");
	}
	else if(p.value == ""){
		return alert("请输入管理员密码");
	}
	else if(c.value == ""){
		return alert("请输入验证码");
	}else{	
		var req = $.ajax({
			url: "tools/validate.jsp",
			type: "POST",
			data: {user:u.value, pwd:$.md5(p.value), code:c.value.toLowerCase()},
			dataType: "json"
		});

		req.done(function(msg) {
			
			if(msg.error==""){
				window.location.href = 'page/business/main_business.jsp';
			}else if(msg.error=="c"){
				alert("您输入的验证码错误");
				document.getElementById('code').value="";
				reloadcode();
			}else{
				alert("您输入的用户名或密码错误");
				errorHandle();
			}
		});

		req.fail(function(jqXHR, textStatus) {
			//alert("网络故障,请稍后再试");
		});
	}		
}
function enter(event){
	 e = event ? event :(window.event ? window.event : null); 
     if(e.keyCode==13){
    	 verify();
     }
}	
	
 