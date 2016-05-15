function getData(){
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/673.json', function(data) {
		records = data;

		// $records = JSON.parse(JSON.stringify(records).replace("\n","<br>"));

		// var tmp = [];
		// var json = records.deliberate_item[0].description[3].table.原計畫;
		// var keys = Object.keys(json);
		// console.log(keys);
		// console.log(json);
		// for (var j=0; j < keys.length; j++) {
		//    var key = "test" + keys[j].replace(/^element_/, "");
		//    tmp[key] = json[keys[j]];
		// }
		// json = tmp;
		// console.log(key);
		// console.log(json);
		// console.log(tmp);
		//
		// var keys = [];
		// for(var k in records.deliberate_item[0].description[3].table.原計畫) {keys.push(k);console.log(k)}
		// console.log("total " + keys.length + " keys: " + keys);
		// console.log(records.deliberate_item[0].description[3].table.原計畫.k);

		$('header').append('<div id="note-title"><h1><span>'+records.title+'</span></h1></div>');

		var $note_head = $('<div id="note-head"/>');
		$($note_head).append('<p><span class="heading">日期：</span><span>'+records.date+'</span></p>');
		$($note_head).append('<p><span class="heading">時間：</span><span>'+records.start_time+'-'+records.end_time+'</span></p>');
		$($note_head).append('<p><span class="heading">地點：</span><span>'+records.location+'</span></p>');
		$($note_head).append('<p><span class="heading">主席：</span><span>'+records.chairman+'</span></p>');
		$($note_head).append('<p><span class="heading">紀錄彙整：</span><span>'+records.note_taker+'</span></p>');
		$($note_head).append('<p><span class="heading">出席委員：</span><span>'+records.attend_committee+'</span></p>');
		$($note_head).append('<p><span class="heading">出席單位：</span><span>'+records.attend_unit+'</span></p>');
		$('#record-content').append($note_head);

		if(records.report_item != null){
			var $report_item = $('<div id="report_item" class="item"/>');
			$($report_item).append('<p><span class="heading">報告事項：</span></p>');
			$($report_item).append(item_render(records.report_item));
			$('#record-content').append($report_item);
		};
		if(records.deliberate_item != null){
			var $deliberate_item = $('<div id="deliberate_item" class="item"/>');
			$($deliberate_item).append('<p><span class="heading">審議事項：</span></p>');
			$($deliberate_item).append(item_render(records.deliberate_item));
			$('#record-content').append($deliberate_item);
		};
		if(records.discuss_item != null){
			var $discuss_item = $('<div id="discuss_item" class="item"/>');
			$($discuss_item).append('<p><span>討論事項：</span></p>');
			$($discuss_item).append(item_render(records.discuss_item));
			$('#record-content').append($discuss_item);
		};
	});
};

function item_render(item_object){
	var length = item_object.length;
	var $item_html = $('<div class="item content"/>');
	for (var i = 0; i < length; i++){
		var con_case = item_object[i];
		$($item_html).append('<p><span class="heading">案名：</span><span>'+con_case.case+'</span></p>');

		if(con_case.description != null){
			$($item_html).append('<p><span class="heading">說明：</span></p>');
			$($item_html).append(array_render(con_case.description));
		};
		if(con_case.committee_speak != null){
			$($item_html).append('<p><span class="heading">委員發言摘要：</span></p>');
			$($item_html).append(speak_render(con_case.committee_speak));
		};
		if(con_case.response != null){
			$($item_html).append('<p><span class="heading">都發局回覆：</span></p>');
			$($item_html).append(array_render(con_case.response));
		};
		if(con_case.resolution != null){
			$($item_html).append('<p><span class="heading">決議：</span></p>');
			$($item_html).append(array_render(con_case.resolution));
		};
		if(con_case.petition != null){
			$($item_html).append('<p><span class="heading">人民陳情意見：</span></p>');
			$($item_html).append(petition_render(con_case.petition));
		};
	}
	return $item_html;
}

function array_render(con_array){
	var length = con_array.length;
	var $array_html = $('<div class="content list"/>');
	for(var i = 0; i < length; i++){
		$($array_html).append('<p><span>'+con_array[i]+'</span></p>');
	}
	return $array_html;
}

function speak_render(con_speak){
	var length = con_speak.length
	var $speak_html = $('<div class="content list"/>');
	for(var i = 0; i < length; i++){
		$($speak_html).append('<p><span>'+con_speak[i].committee+'</span></p>');
		$($speak_html).append('<p><span>'+con_speak[i].speak+'</span></p>');
	}
	return $speak_html;
}

function petition_render(con_petition){
	var length = con_petition.length
	var $petition_html = $('<div calss="content list"/>')
	for(var i = 0; i < length; i++){
		$($petition_html).append('<p><span class="heading">編號：</span><span>'+con_petition[i].pet_num+'</span></p>');
		$($petition_html).append('<p><span class="heading">陳情人：</span><span>'+con_petition[i].pet_name+'</span></p>');
		if(con_petition[i].pet_reason != null){
			$($petition_html).append('<p><span class="heading">陳情理由：</span></p>');
			$($petition_html).append(array_render(con_petition[i].pet_reason));
		};
		if(con_petition[i].pet_suggest != null){
			$($petition_html).append('<p><span class="heading">建議辦法：</span></p>');
			$($petition_html).append(array_render(con_petition[i].pet_suggest));
		};
		if(con_petition[i].pet_response != null){
			$($petition_html).append('<p><span class="heading">主管單位回應：</span></p>');
			$($petition_html).append(array_render(con_petition[i].pet_response));
		};
		if(con_petition[i].pet_resolution != null){
			$($petition_html).append('<p><span class="heading">委員會決議：</span></p>');
			$($petition_html).append(array_render(con_petition[i].pet_resolution));
		}
	}
	return $petition_html;
}
