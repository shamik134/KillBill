KillBill.userCtrl = M.Controller.extend({
	create: function(data, callback){
		M.Request.init({
			url:'/user/'+data.fbProfile.id,
			method: 'PUT',
			data: data,
			onSuccess: callback,
			beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
			onError: function(xhr, msg){

			}
		}).send();
	}
});