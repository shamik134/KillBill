//m_require('app/views/tabs.js');
KillBill.bill = M.PageView.design({

	childViews: 'tabs header detailsLabel detailsBox next',

	tabs: KillBill.tabs,

	header: KillBill.header,

	detailsLabel: M.LabelView.design({
		value: M.I18N.l('details'),
		cssClass: 'header'
	}),

	detailsBox: M.ScrollView.design({
		childViews: 'eventLabel eventInput amtLabel amtInput dateLabel dateInput datePicker descLabel descInput',
		cssClass: 'detailsBox',
		eventLabel: M.LabelView.design({
			value: M.I18N.l('event'),
			cssClass: 'inputLabel required'
		}),

		eventInput: M.TextFieldView.design({
		}),

		amtLabel: M.LabelView.design({
			value: M.I18N.l('amt'),
			cssClass: 'inputLabel required'
		}),

		amtInput: M.TextFieldView.design({
            contentBinding: {
                target: KillBill.billCtrl,
                property: 'billInput'
            },
            contentBindingReverse: {
                target: KillBill.billCtrl,
                property: 'billInput'
            }
		}),

		dateLabel: M.LabelView.design({
			value: M.I18N.l('date'),
			cssClass: 'inputLabel required'
		}),

		dateInput: M.LabelView.design({
			value: M.I18N.l('select_date'),
			cssClass: 'instruction inputLabel'
		}),

		datePicker: M.ButtonView.design({
			value: M.I18N.l('select_date'),
			events: {
				tap:{
					target: KillBill.billCtrl,
					action: 'getDate'
				}
			}
		}),

		descLabel: M.LabelView.design({
			value: M.I18N.l('desc'),
			cssClass: 'inputLabel'
		}),

		descInput: M.TextFieldView.design({
			hasMultipleLines: YES
		}),

	}),

	next: M.ButtonView.design({
		cssClass: 'button right',
		icon: 'arrow-r',
		value: M.I18N.l('next'),
		events:{
			tap:{
				action: function(){
					M.LoaderView.show();
					KillBill.appCtrl.getFBFriends(function(){
						KillBill.appCtrl.moveTo('selFriends');
					});
				}
			}
		}
	})
});