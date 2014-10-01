(function( $ ) {
	methods = 
	$.fn.krate = function( options ) {
		elementid = Math.floor(Math.random()*10000);
		elementid = 'krateElement' + elementid;
		var settings = $.extend( {
		}, options);
		if (
			settings['star'] != undefined &&
			settings['rating'] != undefined &&
			settings['url'] != undefined &&
			settings['size'] != undefined
		) {
			if (settings['star-disabled'] == undefined) settings['star-disabled'] = settings['star'];
			if (settings['star-hover'] == undefined) settings['star-hover'] = settings['star'];
			$(this).html('');
			$tmpelement = $('<div id="'+elementid+'"/>').appendTo(this);
			container = $tmpelement;
			container.css({'width':(settings['size']*5)+'px','background':'url('+settings['star-disabled']+') left center repeat-x','height':settings['size']+'px'})
			stars = new Array;
			$tmpelement = $('<div class="kStars" data-val="'+settings['rating']+'"/>').appendTo(container);
			$tmpelement.css({'position':'absolute','width':(settings['size']*settings['rating'])+'px','background':'url('+settings['star']+') left center repeat-x','height':settings['size']+'px'});
			zindex=10;
			for (i = 5; i >= 1; i--){
				$tmpelement = $('<div class="kDoRate" data-val="'+i+'"/>').appendTo(container);
				stars[i] = $tmpelement;
				stars[i].css({'z-index':zindex++,'position':'absolute','cursor':'pointer','height':settings['size']+'px','width':(settings['size']*i)+'px'});
				stars[i].hover(function(){
					$(this).css('background','url('+settings['star-hover']+') left center repeat-x');
				},function(){
					$(this).css('background','none');
				});
			}
			$('#'+elementid+' .kDoRate').click(function(){
				element = $(this);
				val = element.attr('data-val');
				elementid = element.parent().attr('id');
				postData = {value:val};
				if (settings['data'] != undefined) {
					postData = $.extend({}, postData, settings['data']);
				}
				if (settings['before'] != undefined) {
					settings['before'].call(element);
				}
				$.ajax({
					type: "POST",
					url: settings['url'],
					dataType: "JSON",
					data: postData,
					success: function(data){
						if (data.rating) {
							$tmpelement = $('#'+elementid+' .kStars');
							$tmpelement.css({'position':'absolute','width':(settings['size']*data.rating)+'px','background':'url('+settings['star']+') left center repeat-x','height':settings['size']+'px'});
							$tmpelement.attr('data-val',data.rating);
						}
						if (settings['after'] != undefined) {
							settings['after'].call(element,data);
						}
					}
				});
			});
		}
	};
})(jQuery);