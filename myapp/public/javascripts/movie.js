var json = null;
$(function() {
	var mdata={};
	var url = '/javascripts/movie.json';
	$.getJSON(url, function(data) {
		mdata = data;
		render_editor_form(mdata);
		render_event_form(mdata);
	});
	var render_editor_form=function(data){
		$('#c_editor').val($.toJSON(data));
	};
	var render_event_form=function(){
		$('#c_save').on('click',function(event){
			var data = {};
			data.content = JSON.stringify(mdata);
			$.ajax({
				type: "POST",
				url: '/movie/add',
				data: data,
				success: function (data, textStatus){
					if(data.success){
						$('#msg').html('成功保存!');
						$('#msg').addClass('alert alert-success');
						$(location).attr('href','/movie/'+mdata.name);
					} else {
						$('#msg').html(data.err);
						$('#msg').addClass('alert alert-error');
					}
				}
			});
		});
	};
});