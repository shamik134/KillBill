//m_require('app/views/tabs.js');
//m_require('app/views/header.js');

KillBill.home = M.PageView.design({

	childViews: 'tabs content friendList header',

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

    friendList: M.ListView.design({
		cssClass: 'friendsList',
		idName: 'id',
		usesDefaultSearchBehaviour: YES,
		listItemTemplateView: M.ListItemView.design({
			childViews: 'pic name amt',
			name: M.LabelView.design({
				valuePattern: '<div style="margin-left:70px"><%= name %></div>'
			}),
			amt: M.LabelView.design({
				valuePattern: '<div style="margin-left:70px"><%= amt %></div>'
			}),
			pic: M.LabelView.design({
				valuePattern: '<img src="<%= pic %>" /> '
			}),
		}),
		contentBinding:{
			target: KillBill.appCtrl,
			property: 'summaryList'
		}
	}),

    header: KillBill.header,

    tabs: KillBill.tabs

});