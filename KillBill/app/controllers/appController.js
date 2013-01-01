KillBill.appCtrl = M.Controller.extend({

	items: [{
		icon: 'theme/images/icons-36-black.png',
        label: 'Settings',
        value: 'settings'
	},{
		icon: 'theme/images/appicon.png',
        label: 'Edit',
        value: 'edit'
	}],

	APP_ID: 481947728510763,

	init: function(){
		this.set('items', KillBill.appCtrl.items);
	},

	login: function(page){
		this.switchToPage(page);
	},

	fbLoad: function(){
		window.fbAsyncInit = function() {
			FB.init({
				appId      : KillBill.appCtrl.APP_ID,
				status     : true,
				cookie     : true,
				xfbml      : true,
				oauth      : true
			});

			FB.getLoginStatus(function(response) {
				if(response.authResponse){
					KillBill.appCtrl.getFBDate(function(res){
						var obj = {
							fbProfile: res,
							id: res.is
						};
						KillBill.userCtrl.create(obj, function(res){
							console.log(res);
							KillBill.appCtrl.moveTo('home');
						});
					});
				}else{
					M.DialogView.alert({
						title: 'Please Login',
						message: 'Click on Login via FB',
						confirmButtonValue: 'OK'
					});
				}
			});
	    };

	    var e = document.createElement('script');
		e.src = '//connect.facebook.net/en_US/all.js';
		e.async = true;
		document.getElementById('m_4').appendChild(e);
	},

	getFBDate: function(callback){
		FB.api('/me', callback);
	}

});