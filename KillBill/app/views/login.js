KillBill.login = M.PageView.design({

	childViews:'content',

	APP_ID: 481947728510763,
	ipAddress: 'http://192.168.1.8:8000',

	events:{
		pagebeforeshow: {
			target: KillBill.appCtrl,
			action: 'fbLoad'
		}
	},

	content: M.ScrollView.design({
		childViews: 'title fbLogin fbDiv',

		title: M.LabelView.design({
			cssClass: 'loginLabel',
			value: M.I18N.l('login'),
			events: {
                tap: {
                    target: KillBill.appCtrl,
                    action: 'login'
                }
            }
		}),

		fbLogin: M.LabelView.design({
			cssClass: 'fbLogin',
			value: M.I18N.l('fbLogin'),
			events: {
                tap: {
                    action: function(){
                    	var rediectUrl= KillBill.login.ipAddress+"/KillBill/index.html";
        				var perms = "";
        				var	url = '//graph.facebook.com/oauth/authorize?client_id=' +
        				KillBill.login.APP_ID + '&scope=' + perms + '&redirect_uri=' + encodeURIComponent(rediectUrl);
        				window.open(url,'_self');
                    }
                }
            }
		}),

		fbDiv: M.LabelView.design({
			value:''
		})
	})
});