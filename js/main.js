;$(function(){
	
	
	var sidebar = $('#sidebar'),
		mask=$('.mask'),
		backButton=$('.back-to-top'),
		sidebar_trigger = $('#sidebar_trigger');
		
		function showSidebar()
		{
			mask.fadeIn();
			sidebar.css('right',0);
		}
		
		function hideSidebar(){
			mask.fadeOut();
			sidebar.css('right',-sidebar.width())
		}
		
		function backTop(){
			$('html,body').animate({
				scrollTop: 0
			},800)
		}
		
		sidebar_trigger.on('click',showSidebar)
		mask.on('click',hideSidebar)	
		backButton.on('click',backTop)
		
		$(window).on('scroll',function(){
			if($(window).scrollTop()>$(window).height())
				backButton.fadeIn();
			else
				backButton.fadeOut();
		})
		
		$(window).trigger('scroll');
})
