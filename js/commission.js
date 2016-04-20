function getData(){
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/674.json', function(data) {
		records = data;
		$('.record-content').append('<div><p>'+records.title+'</p></div>');
		$('.record-content').append('<div><p>日期：'+records.date+'</p></div>');
		$('.record-content').append('<div><p>時間：'+records.start_time+'-'+records.end_time+'</p></div>');
		$('.record-content').append('<div><p>地點：'+records.location+'</p></div>');
		$('.record-content').append('<div><p>主席：'+records.chairman+'</p></div>');
		$('.record-content').append('<div><p>紀錄彙整：'+records.note_taker+'</p></div>');
		$('.record-content').append('<div><p>出席委員：'+records.attend_committee+'</p></div>');
		$('.record-content').append('<div><p>出席單位：'+records.attend_unit+'</p></div>');

		$('.record-content').append('<div><p>報告事項：</p></div>');
		item_render(records.report_item);

		$('.record-content').append('<div><p>審議事項：</p></div>');
		item_render(records.deliberate_item);

		$('.record-content').append('<div><p>討論事項：</p></div>');
		item_render(records.discuss_item);
	});
};

function item_render(item_object){
	var length = item_object.length
	for (var i = 0; i < length; i++){
		var con_case = item_object[i];
		$('.record-content').append('<div><p>案名：</p></div>');
		$('.record-content').append('<div><p>'+con_case.case+'</p></div>');
		$('.record-content').append('<div><p>說明：</p></div>');
		// $('.record-content').append('<div><p>'+con_case.description+'</p></div>');
		array_render(con_case.description);
		$('.record-content').append('<div><p>委員發言摘要：</p></div>');
		$('.record-content').append('<div><p>'+con_case.committee_speak+'</p></div>');
		$('.record-content').append('<div><p>都發局回覆：</p></div>');
		$('.record-content').append('<div><p>'+con_case.response+'</p></div>');
		$('.record-content').append('<div><p>決議：</p></div>');
		$('.record-content').append('<div><p>'+con_case.resolution+'</p></div>');
	}
}

function array_render(con_array){
	var length = con_array.length
	for(var i = 0;i <length; i++){
		var con_section = con_array[i];
			$('.record-content').append('<div><p>'+con_section+'</p></div>');
	}
}
