$().ready(function(){
	/*
	script send to url variable with name 'value' consists selected star value 
	*/
	$('#rate').krate({
		'best':10,
		'star':'/star.png', // path to image star
		'star-disabled':'/star-disabled.png', // path to disabled star
		'star-hover':'/star-hover.png', // path to mouse over star
		'rating':0, // curent rating
		'url':'/ajax.php', // path to send data
		'data':{'id':1}, // additional data to send
		'size':18, // stars size
		'after':function(e){
			// success to do: e - json received data
		}
	});
});