//m_require('app/views/tabs.js');
//m_require('app/views/header.js');

KillBill.selFriends = M.PageView.design({
	childViews: 'tabs header selectedFriends friendLabel friendSearch',

	events: {
		pageshow: {
			action: function(){
				M.LoaderView.hide();
			}
        }
    },

	tabs: KillBill.tabs,

	header: KillBill.header,

	selectedFriends: M.SelectionListView.design({
		selectionMode: M.MULTIPLE_SELECTION,
		contentBinding: {
			target: KillBill.appCtrl,
			action: 'selectedFriends'
		}
	}),

	friendLabel: M.LabelView.design({
		value: M.I18N.l('choose_friend'),
		cssClass: 'header'
	}),

	friendSearch: M.ListView.design({
		hasSearchBar: YES,
		usesDefaultSearchBehaviour: YES,
		idName: 'id',
		listItemTemplateView: M.ListItemView.design({
			childViews: 'name',
			name: M.LabelView.design({
				valuePattern: '<%= name %>'
			})
		}),
		contentBinding:{
			target: KillBill.appCtrl,
			property: 'fbFriends'
		},
		events: {
        	click: {
                target: KillBill.billCtrl,
                action: 'addFriend'
            }
    	}
	})
});