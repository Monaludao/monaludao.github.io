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

	for (var i = 1; i < rows_count + 1; i++) {
		var $rows_html = $('<tr id=table'+c_table+'-row'+i+'/>');
		$($tbody_html).append($rows_html);
	};

	for (var i = 0; i < cols_name.length; i++) {
		$($thead_html).append('<th>'+cols_name[i]+'</th>');
	};

	for (var cols in con_table.table) {
		for (var m_cols in con_table.table[cols]) {
			for (var cells in con_table.table[cols][m_cols]) {
				console.log(cells);
				console.log(con_table.table[cols][m_cols][cells]);
			};
		};
	};

	// console.log(rows_count);
		// console.log(cols);
		// console.log(keys);
		// console.log(cols_length);
		// console.log(con_table.table[cols][0]);
		// console.log(Object.keys(con_table.table[cols][0]));
		// console.log(Object.keys(con_table.table[cols][0])[keys_count]);
		// console.log(keys);
			// console.log(Object.keys(con_table.table[cols][cols_content]));
			// console.log(con_table.table[cols][cols_content]);
			// for (var i = 1; i < cols_length + 1; i++) {
			// keys = Object.keys(con_table.table[cols][i]);
			// console.log(con_table.table[cols][i]);
			// };
		// cols_name.push('0');
		// console.log('cols_name is ' + cols_name);
		// console.log(cols_length);
	// console.log(cols_name);

	// $($table_html).append('<tr/>')
	// console.log(con_table);
	// console.log(Object.keys(con_table));
	// var table_keys = Object.keys(con_table.table);
	// console.log(table_keys);
	// var a = table_keys[0];
	// console.log(a);
	// console.log(con_table.table[table_keys[0]]);
	// $($table_html).append($cols_html);
	// var $cols_html = $('<td/>')
	// var tmp = [];
	// var json = records.deliberate_item[0].description[3].table;
	// console.log(typeof json);
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

	// var keys = [];
	// console.log("total " + keys.length + " keys: " + keys);
	// console.log(records.deliberate_item[0].description[3].table.原計畫.k);
	// $($table_html).append('<p><span>this is a table.</span></p>');
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
		// $($petition_html).append
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
