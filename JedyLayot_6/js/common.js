$(function() {

//В круглых скобках (после "$") - безграмотно напрямую указывать
//путь к селектуру, к которому будет применяться обработчик события
//(ф-ия: "magnificPopup"). Для этого лучше задать (селектору) уникальный класс, а затем вписать его в скобки,
//либо, как в данном случае, указать через хеш-тэг (т.к. мы задали всплывающее-меню,
//через id).

		$(".slider-wrap").slideDown();

		$(".popup-with-move-anim").magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});
	
	(function ($) {
	  $.fn.equalHeights = function () {
	    var $items = $(this);
	    function equalize() {
	      $items.height('initial');
	      var maxH = $items.eq(0).height();
	      $items.each(function () {
	        maxH = ($(this).height() > maxH) ? $(this).height() : maxH;
	      });
	      $items.height(maxH);
	    }
	    equalize();
	    $(window).bind('resize', function () {
	      equalize();
	    });
	  };
	})(jQuery);

	//Помещаем информацию о форме в текущую форму (селектор: "#callback .forname")
	$("a[href=#callback]").click(function(){
		$("#callback .forname").val($(this).data("form"));
	});

	//Плагин equalHeights нужно применять к каждому селектору персонально
	//(в противном случае он будет выравнивать высоту одинаково у всех вписанных селкторов)
	$('.service-item h4').equalHeights();
	$('.new-item-text').equalHeights();
	$('.link-item').equalHeights();

	$(".top-line .sf-menu").superfish({
		cssArrows: false,
		hoverClass: 'no-class',
		delay: 200
	});

	//След. js-строчкой мы создаем объект карусели слайдера
	var owl = $(".slider");

	owl.owlCarousel({
		loop: true, //Параметр - опис. замкнутое переключение
		items: 1, //Кол-во отобрвж-ых слайдов на странице
		itemClass: "slide-wrap", //Указ. элемент, опис. слайд (по умолч. плагина - это div)
		nav: true, //Параметр - задающий отображение точек (индикаторов) с пом.
		//автоматически добавляемого класса .owl-dots (просм. который можно в инспекторе объектов)
		//в браузере (по умолчанию значение параметра - false) 
		navText: "" //Параметр - делающий ненужную неавигацую пустой
	});
	//Ф-ии осущ. переключение слайдов по нажатию на "ушки"
	$(".owl-next").click(function(){
		owl.trigger('next.owl.carousel');
	})
	$(".owl-prev").click(function(){
		owl.trigger('prev.owl.carousel');
	});

	

	$(".sf-menu").after("<div id='my-menu'>");//в селектор (класс) .sf-menu - мы создаем и вставляем
	//элемент: <div id='my-menu'> 
	$(".sf-menu").clone().appendTo("#my-menu");//клонируем (из .sf-menu) все
	//классы (ф-ей clone) в #my-menu
	$("#my-menu").find("*").attr("style", "");//убираем все стили склонированных ранее классов
	$("#my-menu").find("ul").removeClass("sf-menu");//чтобы ul-элемнтыты в выпадающем меню
	//не имели стандартную плагиновскую стилизацию (плагина sf-menu), данной строкой
	//мы убираем (во всех тегах <ul>) плагиновский-класс .sf-menu 
	$("#my-menu").mmenu({
		//Следующие расширения (опции) плагина mmenu - отв. за стилизацию
		//довольно трудно найти в документации (на оф. сайте) 
		extensions: [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "Меню",
		}
	});	
	
	//Ф-ия описывающая отображение правильной иконки
	//(для плагиновского выпадающего меню)
	var api = $("#my-menu").data("mmenu");//помещаем в api - селектор с id - my-menu
	api.bind("closed", function(){//вычисляем момент закрытия api (меню)
		$(".toggle-mnu").removeClass("on");//у класса - toggle-mnu убираем класс - on
	});

	//Ф-ия описывающая обработку события (клика) для селектора (класса)
	//.mobile-mnu (заготовка автора видео-курса данной верстки) - описание
	//которого представленно файле-руководстве верстки данного макета.
	$(".mobile-mnu").click(function(){ 
		var mmAPI = $("#my-menu").data("mmenu");
		mmAPI.open();
		var thiss = $(this).find(".toggle-mnu");
		thiss.toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;	
	});	

	

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			//Наличие jpg/png-файла в папке проекта (на одном уровне с svg-файлом)
			//достаточно для fallback-а
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	//В данной части js-кода подключается унифицированная-библиотека (обратной связи)
	//"uniMail" - документацию про которую можно прочитать выше.

	$(".callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


	/*$(".callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".success").addClass("visible");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$(".success").removeClass("visible");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});*/

	//Chrome Smooth Scroll
	try{
		$.browserSelector();
		if($("html").hasClass("chrome")){
			$.smoothScroll();
		}	
	}catch(err){
	};


	$("img, a").on("dragstart", function(event) {event.preventDefault();});


});
