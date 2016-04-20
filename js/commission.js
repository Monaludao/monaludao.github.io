function getData(){
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/674.json', function(data) {
		records = data;
		$('.record-content').append('<p><div>'+records.title+'</div></p>');
		// $('.record-content').append('<p><div>'+records.session+'</div></p>');
		$('.record-content').append('<p><div>日期：'+records.date+'</div></p>');
		$('.record-content').append('<p><div>時間：'+records.start_time+'-'+records.end_time+'</div></p>');
		$('.record-content').append('<p><div>地點：'+records.location+'</div></p>');
		$('.record-content').append('<p><div>主席：'+records.chairman+'</div></p>');
		$('.record-content').append('<p><div>紀錄彙整：'+records.note_taker+'</div></p>');
		$('.record-content').append('<p><div>出席委員：'+records.attend_committee+'</div></p>');
		$('.record-content').append('<p><div>出席單位：'+records.attend_unit+'</div></p>');

		$('.record-content').append('<p><div>報告事項：</div></p>');
		$('.record-content').append('<p><div>案名：</div></p>');
		$('.record-content').append('<p><div>'+records.report_item[0].case+'</div></p>');
		$('.record-content').append('<p><div>說明：</div></p>');
		$('.record-content').append('<p><div>'+records.report_item[0].description+'</div></p>');
		$('.record-content').append('<p><div>委員發言摘要：</div></p>');
		$('.record-content').append('<p><div>'+records.report_item[0].committee_speak+'</div></p>');
		$('.record-content').append('<p><div>都發局回覆：</div></p>');
		$('.record-content').append('<p><div>'+records.report_item[0].response+'</div></p>');
		$('.record-content').append('<p><div>決議：</div></p>');
		$('.record-content').append('<p><div>'+records.report_item[0].resolution+'</div></p>');

		$('.record-content').append('<p><div>審議事項：</div></p>');
		$('.record-content').append('<p><div>案名：</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item[0].case+'</div></p>');
		$('.record-content').append('<p><div>說明：</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item[0].description+'</div></p>');
		$('.record-content').append('<p><div>委員發言摘要：</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item[0].committee_speak+'</div></p>');
		$('.record-content').append('<p><div>都發局回覆：</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item[0].response+'</div></p>');
		$('.record-content').append('<p><div>決議：</div></p>');
		$('.record-content').append('<p><div>'+records.deliberate_item[0].resolution+'</div></p>');

		$('.record-content').append('<p><div>討論事項：</div></p>');
		$('.record-content').append('<p><div>案名：</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item[0].case+'</div></p>');
		$('.record-content').append('<p><div>說明：</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item[0].description+'</div></p>');
		$('.record-content').append('<p><div>委員發言摘要：</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item[0].committee_speak+'</div></p>');
		$('.record-content').append('<p><div>都發局回覆：</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item[0].response+'</div></p>');
		$('.record-content').append('<p><div>決議：</div></p>');
		$('.record-content').append('<p><div>'+records.discuss_item[0].resolution+'</div></p>');

		case_render(records.discuss_item);
	});
};

function case_render(item_object){
	var length = item_object.length
	for (var i = 0; i < length; i++){
		var con_case = item_object[i];
		$('.record-content').append('<p><div>案名：</div></p>');
		$('.record-content').append('<p><div>'+con_case.case+'</div></p>');
		$('.record-content').append('<p><div>說明：</div></p>');
		$('.record-content').append('<p><div>'+con_case.description+'</div></p>');
		$('.record-content').append('<p><div>委員發言摘要：</div></p>');
		$('.record-content').append('<p><div>'+con_case.committee_speak+'</div></p>');
		$('.record-content').append('<p><div>都發局回覆：</div></p>');
		$('.record-content').append('<p><div>'+con_case.response+'</div></p>');
		$('.record-content').append('<p><div>決議：</div></p>');
		$('.record-content').append('<p><div>'+con_case.resolution+'</div></p>');
	}
}
