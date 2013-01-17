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

	fbFriends: null,
	summaryList: null,
	selectedFriends: {
		content: [],
	},

	page: '',

	APP_ID: 481947728510763,

	userData: null,

	init: function(){
		KillBill.billCtrl.getList(KillBill.appCtrl.userData.id, KillBill.billCtrl.normalizeUserSummary);
	},

	moveTo: function(page){
		this.switchToPage(page);
	},

	login: function(){
		this.switchToPage('home');
	},

	setData: function(name, value){
		this.set(name, value);
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
					KillBill.appCtrl.getFBData(function(res){
						var obj = {
							fbProfile: res,
							fbId: res.id
						};
						KillBill.appCtrl.setData('userData', res);
						KillBill.userCtrl.create(obj, function(res){
							if(res[0])
							{
								KillBill.appCtrl.moveTo('home');
							}
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

	getFBData: function(callback){
		FB.api('/me', callback);
	},

	getFBFriends: function(callback){
		var me = this;
		FB.api('/me/friends?fields=id,name,picture', function(res){
			for(var i=0; i<res.data.length; i++){
				res.data[i].pic = res.data[i].picture.data.url;
			}
			res.data.push({
				id: KillBill.appCtrl.userData.id,
				name: KillBill.appCtrl.userData.name
			});
			KillBill.appCtrl.setData('fbFriends', res.data);
			KillBill.appCtrl.setData('selectedFriends', {content: []});
			callback();
		});
	}

});