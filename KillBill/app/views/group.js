m_require('app/views/tabs.js');

KillBill.group = M.PageView.design({

	childViews: 'tabs',

	tabs: KillBill.tabs
});