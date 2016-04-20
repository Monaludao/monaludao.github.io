function getData(){
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/674.json', function(data) {
		records = data;
		$('.record-content').append('<p><div>'+records.title+'</div></p>');
		$('.record-content').append('<p><div>'+records.session+'</div></p>');
		$('.record-content').append('<p><div>'+records.date+'</div></p>');
		$('.record-content').append('<p><div>'+records.start_time+'</div></p>');
		$('.record-content').append('<p><div>'+records.end_time+'</div></p>');
		$('.record-content').append('<p><div>'+records.location+'</div></p>');
		$('.record-content').append('<p><div>'+records.chairman+'</div></p>');
		$('.record-content').append('<p><div>'+records.note_taker+'</div></p>');
		$('.record-content').append('<p><div>'+records.attend_committee+'</div></p>');
		$('.record-content').append('<p><div>'+records.attend_unit+'</div></p>');
		$('.record-content').append('<p><div>'+records.report_item+'</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item+'</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item+'</div></p>');
	});

};
