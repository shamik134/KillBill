KillBill.billCtrl = M.Controller.extend({

	getDate: function(){
		M.DatePickerView.show({
			source: M.ViewManager.getView('bill', 'dateInput'),
		    dateFormat: 'mm/dd/yy',
			dateOrder: 'mmddyy',
			showLabels: YES,
			showDatePicker: YES,
			showTimePicker: NO,
			yearLabel: M.I18N.l('year'),
			monthLabel: M.I18N.l('month'),
			dateLabel: M.I18N.l('date'),
			callbacks: {
				before:{
					target: this,
					action: function(value, date){
					}
				},
				confirm:{
					target: this,
					action: function(value, date){
					}
				},
				cancel:{
					target: this,
					action: function(value, date){

					}
				}
			}
		});
	},

	addFriend: function(element){
		var val = M.ViewManager.getViewById(element);

		var selFriend = KillBill.appCtrl.selectedFriends.push(val.value);
		KillBill.appCtrl.setData('selectedFriends', selFriend);

		var index = KillBill.appCtrl.fbFriends.indexOf(val.value);
		var fbFriends = KillBill.appCtrl.fbFriends.splice(index, 1);
		KillBill.appCtrl.setData('fbFriends', fbFriends);
	}
});