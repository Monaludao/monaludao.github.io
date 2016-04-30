function getData(){
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/673.json', function(data) {
		records = data;

		$('.record-content').append('<div class="note-title"><p><span>'+records.title+'</span></p></div>');

		var $notehead = $('<div class="note-head"/>');

		$($notehead).append('<p><span>日期：</span><span>'+records.date+'</span></p>');
		$($notehead).append('<p><span>日期：</span><span>'+records.date+'</span></p>');
		$($notehead).append('<p><span>時間：</span><span>'+records.start_time+'-'+records.end_time+'</span></p>');
		$($notehead).append('<p><span>地點：</span><span>'+records.location+'</span></p>');
		$($notehead).append('<p><span>主席：</span><span>'+records.chairman+'</span></p>');
		$($notehead).append('<p><span>紀錄彙整：</span><span>'+records.note_taker+'</span></p>');
		$($notehead).append('<p><span>出席委員：</span><span>'+records.attend_committee+'</span></p>');
		$($notehead).append('<p><span>出席單位：</span><span>'+records.attend_unit+'</span></p>');
		$('.record-content').append($notehead);

		if(records.report_item != null){
			$('.record-content').append('<div class="report item">');
			$('.record-content').append('<p>報告事項：</p>');
			item_render(records.report_item);
			$('.record-content').append('</div>');
		};
		if(records.deliberate_item != null){
			$('.record-content').append('<div class="deliberate item">');
			$('.record-content').append('<div><p>審議事項：</p></div>');
			item_render(records.deliberate_item);
			$('.record-content').append('</div>');
		};
		if(records.discuss_item != null){
			$('.record-content').append('<div class="discuss item">');
			$('.record-content').append('<div><p>討論事項：</p></div>');
			item_render(records.discuss_item);
			$('.record-content').append('</div>');
		};
	});
};

function item_render(item_object){
	var length = item_object.length
	for (var i = 0; i < length; i++){
		var con_case = item_object[i];
		$('.record-content').append('<div><p>案名：</p></div>');
		$('.record-content').append('<div><p>'+con_case.case+'</p></div>');
		if(con_case.description != null){
			$('.record-content').append('<div><p>說明：</p></div>');
			array_render(con_case.description);
		};
		if(con_case.committee_speak != null){
			$('.record-content').append('<div><p>委員發言摘要：</p></div>');
			speak_render(con_case.committee_speak);
		};
		if(con_case.response != null){
			$('.record-content').append('<div><p>都發局回覆：</p></div>');
			array_render(con_case.response);
		};
		if(con_case.resolution != null){
			$('.record-content').append('<div><p>決議：</p></div>');
			array_render(con_case.resolution);
		};
		if(con_case.petition != null){
			$('.record-content').append('<div><p>人民陳情意見：</p></div>');
			petition_render(con_case.petition);
		};
	}
}

function array_render(con_array){
	var length = con_array.length
	for(var i = 0; i < length; i++){
		$('.record-content').append('<div><p>'+con_array[i]+'</p></div>');
	}
}

function speak_render(con_speak){
	var length = con_speak.length
	for(var i = 0; i < length; i++){
		$('.record-content').append('<div><p>'+con_speak[i].committee+'</p></div>');
		$('.record-content').append('<div><p>'+con_speak[i].speak+'</p></div>');
	}
}

function petition_render(con_petition){
	var length = con_petition.length
	for(var i = 0; i < length; i++){
		$('.record-content').append('<div><p>編號：'+con_petition[i].pet_num+'</p></div>');
		$('.record-content').append('<div><p>陳情人：'+con_petition[i].pet_name+'</p></div>');
		if(con_petition[i].pet_reason != null){
			$('.record-content').append('<div><p>陳情理由：</p></div>');
			array_render(con_petition[i].pet_reason);
		};
		if(con_petition[i].pet_suggest != null){
			$('.record-content').append('<div><p>建議辦法：</p></div>');
			array_render(con_petition[i].pet_suggest);
		};
		if(con_petition[i].pet_response != null){
			$('.record-content').append('<div><p>主管單位回應：</p></div>');
			array_render(con_petition[i].pet_response);
		};
		if(con_petition[i].pet_resolution != null){
			$('.record-content').append('<div><p>委員會決議：</p></div>');
			array_render(con_petition[i].pet_resolution);
		}
	}
}
