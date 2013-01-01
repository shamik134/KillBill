KillBill.userCtrl = M.Controller.extend({
	create: function(data, callback){
		M.Request.init({
			url:'/bill/user',
			method: 'PUT',
			isJSON: YES,
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