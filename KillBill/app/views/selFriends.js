//m_require('app/views/tabs.js');
//m_require('app/views/header.js');

KillBill.selFriends = M.PageView.design({
	childViews: 'tabs header selFriendLabel selectedFriends amountLabel saveBtn friendLabel friendSearch',

	events: {
		pageshow: {
			action: function(){
				M.LoaderView.hide();
				KillBill.billCtrl.loadEvent();
			}
        },
    },

	tabs: KillBill.tabs,

	header: KillBill.header,

	friendLabel: M.LabelView.design({
		value: M.I18N.l('choose_friend'),
		cssClass: 'header'
	}),

	friendSearch: M.ListView.design({
		cssClass: 'friendsList',
		hasSearchBar: YES,
		usesDefaultSearchBehaviour: YES,
		idName: 'id',
		listItemTemplateView: M.ListItemView.design({
			childViews: 'pic name',
			name: M.LabelView.design({
				valuePattern: '<div class="left"><%= name %></div>'
			}),
			pic: M.LabelView.design({
				valuePattern: '<img src="<%= pic %>" />'
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
	}),

	selFriendLabel : M.LabelView.design({
		value: M.I18N.l('selected_friends'),
		cssClass: 'header'
	}),

	selectedFriends: M.TableView.design({
		header:{
			data: [M.I18N.l('friend'), M.I18N.l('amt'), M.I18N.l('delete'), M.I18N.l('edit')],
			cols: ['50%', '20%', '15%', '15%']
		},
		contentBinding:{
			target: KillBill.appCtrl,
			property: 'selectedFriends'
		},
		contentBindingReverse:{
			target: KillBill.appCtrl,
			property: 'selectedFriends'
		},
		cssClass: 'selectedFriends'
	}),

	amountLabel: M.ScrollView.design({
		childViews: 'totalAmt',
		cssClass: 'amtBox',

		totalAmt: M.LabelView.design({
			cssClass: 'totalAmt',
			contentBinding: {
				target: KillBill.billCtrl,
                property: 'billInput'
			},
		})
	}),

	saveBtn: M.ButtonView.design({
		cssClass: 'button',
		icon: 'arrow-r',
		value: M.I18N.l('save'),
		events:{
			tap:{
				target: KillBill.billCtrl,
				action: function(){
					/*
					 * VALIDATE UI
					 */
					M.LoaderView.show();
					KillBill.billCtrl.saveBill();
				}
			}
		}
	})
});