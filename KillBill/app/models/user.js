KillBill.user = M.Model.create({
	__name__: 'user',
	id: M.Model.attr('String',{

	}),
	money: M.Model.attr('Number',{

	}),
	fbProfile: M.Model.attr('Object',{

	}),
	date: M.Model.attr('Date',{

	}),


}, M.DataConsumer.configure({
	appendRecords: NO,
	responsePath: 'results',
	urlParams: function() {
        return 'bill/user';
    },
	map: function(obj){
		return{
			id: obj.fbId,
			money: obj.amt || 0,
			fbProfile: obj.profile,
			date: new Date()
		};
	}
}));