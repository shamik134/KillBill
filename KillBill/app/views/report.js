m_require('app/views/tabs.js');

KillBill.report = M.PageView.design({

	childViews: 'tabs',

	tabs: KillBill.tabs
});