KillBill.billCtrl = M.Controller.extend({

	loadEvent: function(){
		$('.selectedFriends').on('tap', '.removeIcon', function(e){
			var elemId = $(e.target).data('elemid');
			var selectedFriends = $.extend(true, {}, KillBill.appCtrl.selectedFriends);
			var index = $(e.target).parent('td').parent('tr').index();

			selectedFriends.content.splice(index, 1);
			KillBill.appCtrl.setData('selectedFriends', selectedFriends);
			KillBill.billCtrl.computeEvenValue(selectedFriends);

			$('#'+elemId).removeClass('hide');
		});

		$('.selectedFriends').on('tap', '.editIcon', function(e){
			$(e.target).parent('td').parent('tr').find('input').prop('disabled', false);
			$(e.target).addClass('hide');
			$(e.target).parent('td').children('.checkIcon').removeClass('hide');
			var editIcons = $(e.target).parent('td').parent('tr').siblings().find('.editIcon');

			for(var i=0; i<editIcons.length; i++){
				$(editIcons).addClass('hide');
			}
		});

		$('.selectedFriends').on('tap', '.checkIcon', function(e){
			$(e.target).parent('td').parent('tr').find('input').prop('disabled', true);
			$(e.target).addClass('hide');
			$(e.target).parent('td').children('.editIcon').removeClass('hide');
			var editIcons = $(e.target).parent('td').parent('tr').siblings().find('.editIcon');

			for(var i=0; i<editIcons.length; i++){
				$(editIcons).removeClass('hide');
			}
		});

		$('.selectedFriends').on('change', 'input', function(e){
			$(e.target).data('changed', true);
			var inputList = $(e.target).parent('td').parent('tr').siblings('tr').find('input');
			KillBill.billCtrl.computeChangedValues(e.target, inputList);
		});

		KillBill.billCtrl.addFriend(null, KillBill.appCtrl.userData);
	},

	billInput: null,

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

	computeChangedValues: function(element, inputList){
		for(var i=0; i<inputList.length; i++){
			console.log($(inputList[i]).data('changed'));
		}
	},

	computeEvenValue: function(friendsList){
		var amt = parseFloat(KillBill.bill.detailsBox.amtInput.value);
		var table = $('.selectedFriends');
		var inputList = $(table).children('tbody').children('tr').children('td').find('input');
		var totalFromInput = 0;

		for(var i=0, j=inputList.length; i<inputList.length; i++, j--){
			var val = ((amt-totalFromInput)/j).toFixed(2);
			$(inputList[i]).val(val);
			totalFromInput += parseFloat(val);
		}
	},

	addFriend: function(element, user){
		var selectedFriends = $.extend(true, {}, KillBill.appCtrl.selectedFriends);
		var val = null;
		if(element){
			val = M.ViewManager.getViewById(element);
			$('#'+element).addClass('hide');
		}else if(user){
			var list = $('.friendsList').children('li');
			var userObj = list[list.length-1];
			var element = $(userObj).attr('id');
			val = {
				item:{
					name: user.name,
					id: user.id,
					picture:{
						data:{
							url: ''
						}
					}
				}
			};
		}

		selectedFriends.content.push([val.item.name, '<input type="text" data-picture="'+val.item.picture.data.url+'" data-userid="'+val.item.id+'" data-username="'+val.item.name+'" disabled=true>', '<div class="ui-icon ui-icon-delete removeIcon" data-elemid="'+element+'"/>', '<div class="ui-icon ui-icon-edit editIcon" data-elemid="'+element+'"/><div class="hide ui-icon ui-icon-check checkIcon" data-elemid="'+element+'"/>']);

		var fbFriends = $.extend(true, [], KillBill.appCtrl.fbFriends);
		var index = fbFriends.indexOf(val.value);
		for(var i=0; i<fbFriends.length; i++){
			if(i === index){
				fbFriends.splice(i,1);
				break;
			}
		}

		KillBill.appCtrl.setData('selectedFriends', selectedFriends);
		KillBill.billCtrl.computeEvenValue(selectedFriends);
	},

	saveBill: function(){
		var table = $('.selectedFriends');
		var inputValues= table.children('tbody').children('tr').children('td').children('input');
		var userAmt = [];

		if(typeof KillBill.bill.detailsBox.dateInput.value.getMonth !== 'function'){
			KillBill.bill.detailsBox.dateInput.value = new Date();
		}

		for(var i=0; i<inputValues.length; i++){
			var data = {
				userId: $(inputValues[i]).data('userid'),
				amt: parseFloat($(inputValues[i]).val()),
				picture: $(inputValues[i]).data('picture'),
				name: $(inputValues[i]).data('username'),
			};
			userAmt.push(data);
		}

		var obj = {
			totalAmount : KillBill.bill.detailsBox.amtInput.value,
			userAmt : userAmt,
			date : new Date(),
			billDate: KillBill.bill.detailsBox.dateInput.value || new Date(),
			user: KillBill.appCtrl.userData.id,
			event: KillBill.bill.detailsBox.eventInput.value,
			note: KillBill.bill.detailsBox.descInput.value
		};

		KillBill.billCtrl.create(KillBill.appCtrl.userData.id, obj, function(res){
			if(res[0])
			{
				KillBill.appCtrl.moveTo('bill');
			}
		});
	},

	create: function(id, data, callback){
		M.Request.init({
			url:'/bill/'+id,
			method: 'PUT',
			data: data,
			onSuccess: callback,
			beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
			onError: function(xhr, msg){

			}
		}).send();
	},

	getList: function(id, funcName){
		M.Request.init({
			url:'/bill/'+id,
			method: 'GET',
			isJSON: YES,
			onSuccess: funcName,
			onError: function(xhr, msg){
			}
		}).send();
	},

	normalizeUserSummary: function(res){
		var userAmtMap = {};
		var userNameMap = {};
		var userPicMap={};

		if(res){
			for(var i=0; i<res.length; i++){
				var bill = res[i];
				for(var j=0; j<bill.userAmt.length; j++){
					var user = bill.userAmt[j];
					if(user.userId !== KillBill.appCtrl.userData.id){
						if(!userAmtMap[user.userId]){
							/* NEW OBJECT*/
							if(res[i].user.toString() === KillBill.appCtrl.userData.id){
								/* BILL OWNER*/
								userAmtMap[user.userId] = parseFloat(user.amt);
							}else{
								/* NOT A BILL OWNER*/
								userAmtMap[user.userId] = 0 - parseFloat(user.amt);
							}
							userNameMap[user.userId] = user.name;
							userPicMap[user.userId] = user.picture;
						}else{
							var amt = parseFloat(user.amt);
							if(res[i].user.toString() === KillBill.appCtrl.userData.id){
								userAmtMap[user.userId] += amt;
							}else{
								/* NOT A BILL OWNER*/
								userAmtMap[user.userId] -= amt;
							}
						}
					}
				}
			}
		}

		var userList = [];
		for(x in userAmtMap){
			var data = {
				id: x,
				amt: userAmtMap[x],
				name: userNameMap[x],
				pic: userPicMap[x]
			};
			userList.push(data);
		}

		KillBill.appCtrl.setData('summaryList', userList);
	}
});