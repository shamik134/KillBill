//m_require('app/views/tabs.js');
//m_require('app/views/header.js');

KillBill.home = M.PageView.design({

	childViews: 'tabs content header',

	events: {
        pageshow: {
            target: KillBill.appCtrl,
            action: 'init'
        }
    },

    content: M.ScrollView.design({
    	childViews: 'title friendsList dashboard',

    	title: M.ToolbarView.design({
    		value: M.I18N.l('friends'),
    		isFixed:NO
    	}),

    	friendsList: M.ListView.design({

    	}),

    	dashboard: M.DashboardView.design({
    		contentBinding: {
                target: KillBill.appCtrl,
                property: 'items'
            },
            itemsPerLine: 3,
            cssClass: 'dashboard',
            isEditable: NO
    	})
    }),

    header: KillBill.header,

    tabs: KillBill.tabs

});