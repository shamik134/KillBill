m_require('app/views/tabs.js');

KillBill.settings = M.PageView.design({

	childViews: 'tabs',

	tabs: KillBill.tabs
});