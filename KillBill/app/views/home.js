m_require('app/views/tabs.js');

KillBill.home = M.PageView.design({

	childViews: 'tabs content header',

	events: {
        pageshow: {
            target: KillBill.appCtrl,
            action: 'init'
        }
    },

    content: M.ScrollView.design({
    	childViews: 'title dashboard',

    	title: M.ToolbarView.design({
    		value: 'summary',
    		isFixed:NO
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

    header: M.ToolbarView.design({
        value: M.I18N.l('title'),
        anchorLocation: M.BOTTOM
    }),

    tabs: KillBill.tabs

});