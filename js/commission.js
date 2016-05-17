var c_table = 0;

function getData() {
	$.getJSON('https://raw.githubusercontent.com/g0v/urbancode-commission/master/record/TPEUP/JSON/673.json', function(data) {
		records = data;


		$('header').append('<div id="note-title"><h1><span>'+records.title+'</span></h1></div>');

		var $note_head = $('<div id="note-head" class="item"/>');
		$($note_head).append('<h2>會議記錄資訊</h2>');
		$($note_head).append('<p><span class="heading">日期：</span><span>'+records.date+'</span></p>');
		$($note_head).append('<p><span class="heading">時間：</span><span>'+records.start_time+'-'+records.end_time+'</span></p>');
		$($note_head).append('<p><span class="heading">地點：</span><span>'+records.location+'</span></p>');
		$($note_head).append('<p><span class="heading">主席：</span><span>'+records.chairman+'</span></p>');
		$($note_head).append('<p><span class="heading">紀錄彙整：</span><span>'+records.note_taker+'</span></p>');
		$($note_head).append('<p><span class="heading">出席委員：</span><span>'+records.attend_committee+'</span></p>');
		$($note_head).append('<p><span class="heading">出席單位：</span><span>'+records.attend_unit+'</span></p>');
		$('#record-content').append($note_head);

		if(records.report_item != null) {
			var $report_item = $('<div id="report_item" class="item"/>');
			$($report_item).append('<h2>報告事項</h2>');
			$($report_item).append(item_render(records.report_item));
			$('#record-content').append($report_item);
		};
		if(records.deliberate_item != null) {
			var $deliberate_item = $('<div id="deliberate_item" class="item"/>');
			$($deliberate_item).append('<h2>審議事項</h2>');
			$($deliberate_item).append(item_render(records.deliberate_item));
			$('#record-content').append($deliberate_item);
		};
		if(records.discuss_item != null) {
			var $discuss_item = $('<div id="discuss_item" class="item"/>');
			$($discuss_item).append('<h2>討論事項</h2>');
			$($discuss_item).append(item_render(records.discuss_item));
			$('#record-content').append($discuss_item);
		};
	});
};

function item_render(item_object) {
	var length = item_object.length;
	var $item_html = $('<div class="item-content"/>');
	for (var i = 0; i < length; i++) {
		var con_case = item_object[i];
		var $content_html = $('<div class="case"/>');
		$($content_html).append('<h3>'+con_case.case+'</h3>');

		if(con_case.description != null) {
			$($content_html).append('<h4>說明</h4>');
			$($content_html).append(array_render(con_case.description));
		};
		if(con_case.committee_speak != null) {
			$($content_html).append('<h4>委員發言摘要</h4>');
			$($content_html).append(speak_render(con_case.committee_speak));
		};
		if(con_case.response != null) {
			$($content_html).append('<h4>都發局回覆</h4>');
			$($content_html).append(array_render(con_case.response));
		};
		if(con_case.resolution != null) {
			$($content_html).append('<h4>決議</h4>');
			$($content_html).append(array_render(con_case.resolution));
		};
		if(con_case.petition != null) {
			$($content_html).append('<h4>人民陳情意見</h4>');
			$($content_html).append(petition_render(con_case.petition));
		};
		$($item_html).append($content_html);
	};
	return $item_html;
}

function array_render(con_array) {
	var length = con_array.length;
	var $array_html = $('<div class="content list"/>');
	for(var i = 0; i < length; i++) {
		if(typeof con_array[i] === 'object') {
			if(Object.keys(con_array[i])[0] === 'table') {
				c_table++;
				var $table_content = table_render(con_array[i]);
				$($array_html).append($table_content);
			} else {
				$($array_html).append('<p><span>this is an object.</span></p>');
			};
		} else {
			$($array_html).append('<p><span>'+con_array[i]+'</span></p>');
		};
	};
	return $array_html;
}

function table_render(con_table) {

	var $table_html = $('<table/>');
	var $thead_html = $('<thead/>');
	var $tbody_html = $('<tbody/>');

	var cols_name = [];
	var rows_count = 0;

	for (var cols in con_table.table) {
		var keys = Object.keys(con_table.table[cols][0]);
		for (var keys_count = 0; keys_count < keys.length; keys_count++) {
			cols_name.push(keys[keys_count]);
		};
		var cols_length = con_table.table[cols].length;
		if (cols_length > rows_count) {rows_count = cols_length;};
	};

	for (var i = 0; i < cols_name.length; i++) {
		$($thead_html).append('<th>'+cols_name[i]+'</th>');
	};

	var table_frame = [];
	for (var i = 0; i < rows_count; i++) {
		var row_array = [];
		table_frame.push(row_array);
	};

	for (var cols in con_table.table) {
		for (var i = 0; i < rows_count; i++){
			var counter = 0;
			for (var cells in con_table.table[cols][i]) {
				table_frame[i].push(con_table.table[cols][i][cells]);
			};
		};
	};

	var cols_count = 0;
	for (var i = 0; i < rows_count; i++) {
		if (table_frame[i].length > cols_count) {cols_count = table_frame[i].length};
	};

	for (var i = 0; i < rows_count; i++) {
		for (var j = 0; j < cols_count; j++) {
			if (table_frame[i][j]) {
				if (i != rows_count - 1 && typeof table_frame[i+1][j] === 'undefined') {
					table_frame[i][j] = '<td rowspan="' + (rows_count - i) + '">' + table_frame[i][j] + '</td>';
				} else {
					table_frame[i][j] = '<td>' + table_frame[i][j] + '</td>';
				};
			};
		};
		$($tbody_html).append('<tr>' + table_frame[i].join('') + '</tr>');
	};

	$($table_html).append($thead_html);
	$($table_html).append($tbody_html);
	return $table_html;
}

function speak_render(con_speak) {
	var length = con_speak.length
	var $speak_html = $('<div class="content list"/>');
	for(var i = 0; i < length; i++) {
		$($speak_html).append('<p><span>'+con_speak[i].committee+'</span></p>');
		$($speak_html).append('<p><span>'+con_speak[i].speak+'</span></p>');
	}
	return $speak_html;
}

function petition_render(con_petition) {
	var length = con_petition.length
	var $petition_html = $('<div class="content petition"/>')
	for(var i = 0; i < length; i++) {
		var $petition_list = $('<div class="petition-list"/>')
		$($petition_list).append('<p><span class="heading">編號：</span><span>'+con_petition[i].pet_num+'</span></p>');
		$($petition_list).append('<p><span class="heading">陳情人：</span><span>'+con_petition[i].pet_name+'</span></p>');
		if(con_petition[i].pet_reason != null) {
			$($petition_list).append('<p><span class="heading">陳情理由：</span></p>');
			$($petition_list).append(array_render(con_petition[i].pet_reason));
		};
		if(con_petition[i].pet_suggest != null) {
			$($petition_list).append('<p><span class="heading">建議辦法：</span></p>');
			$($petition_list).append(array_render(con_petition[i].pet_suggest));
		};
		if(con_petition[i].pet_response != null) {
			$($petition_list).append('<p><span class="heading">主管單位回應：</span></p>');
			$($petition_list).append(array_render(con_petition[i].pet_response));
		};
		if(con_petition[i].pet_resolution != null) {
			$($petition_list).append('<p><span class="heading">委員會決議：</span></p>');
			$($petition_list).append(array_render(con_petition[i].pet_resolution));
		}
		$($petition_html).append($petition_list);
	}
	return $petition_html;
}
