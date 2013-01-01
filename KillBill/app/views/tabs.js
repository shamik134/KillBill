KillBill.tabs = M.TabBarView.design({

    childViews: 'user report setting',

    anchorLocation: M.TOP,

    transition: M.TRANSITION.NONE,

    name: 'tabs',

    user: M.TabBarItemView.design({
        value: M.I18N.l('home'),
        page: 'home',
        isActive: NO

    }),

    report: M.TabBarItemView.design({
    	value: M.I18N.l('report'),
    	page: 'report',
    	isActive: NO
    }),

    setting: M.TabBarItemView.design({
    	value: M.I18N.l('settings'),
    	page: 'settings',
    	isActive: NO
    })

});
