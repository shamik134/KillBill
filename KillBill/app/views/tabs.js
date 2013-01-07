KillBill.tabs = M.TabBarView.design({

    childViews: 'user bill group setting',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabs',

    user: M.TabBarItemView.design({
        value: M.I18N.l('home'),
        page: 'home',
        isActive: NO,
        icon:'home'

    }),

    bill: M.TabBarItemView.design({
    	value: M.I18N.l('bill'),
    	page: 'bill',
    	isActive: NO,
    	icon: 'dollar'
    }),

    group: M.TabBarItemView.design({
    	value: M.I18N.l('group'),
    	page: 'group',
    	isActive: NO,
    	icon: 'person'
    }),

    setting: M.TabBarItemView.design({
    	value: M.I18N.l('settings'),
    	page: 'settings',
    	isActive: NO,
    	icon: 'gear'
    })

});