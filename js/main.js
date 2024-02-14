const gratitudes = new Swiper('.gratitude_slider', {
    pagination: {
        el: '.gratitude_pager',
        clickable: true,
    },
    centeredSlides: true,
    effect: 'coverflow',
    initialSlide: 1,
    slidesPerView: 1,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 0,
        slideShadows : false
    },
    breakpoints: {
        768: {
            initialSlide: 3,
            slidesPerView: 3,
            coverflowEffect: {
                rotate: 0,
                stretch: 100,
                depth: 150,
                modifier: 1,
                slideShadows : false
            }
        },
    }
});




const clients = new Swiper('.clients_slider', {
    pagination: {
        el: '.clients_pager',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 5,
        }
    }
});


if ($('.related_prods_slider').length > 0){
    const relatedProducts = new Swiper('.related_prods_slider', {
        pagination: {
            el: '.rp_pager',
            clickable: true,
        },
        spaceBetween: 30,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
}



function menuHandler(){

    let menuLogic = false;

    $('.burger_btn').on('click', function(){


        if (!menuLogic){

            menuLogic = true;

            let clickDelay = 500,
                clickDelayTimer = null,
                burger = $(this);

            burger.toggleClass('active')

            if(!burger.hasClass('active')){
                burger.addClass('closing');
            }

            clickDelayTimer = setTimeout(function(){
                burger.removeClass('closing');
                clearTimeout(clickDelayTimer);
                clickDelayTimer = null;
            }, clickDelay);


            if ($('.dropdown_menu').hasClass('opened')) {
                $('.dropdown_menu').removeClass('opened').slideUp(300);


                setTimeout(function() {
                    menuLogic = false;
                    $('html, body').removeClass('menu_opened');
                }, 300);

                $('body').css('position','').css('left','auto').css('right','auto').css('top','auto');

            } else {
                $('.dropdown_menu').addClass('opened').slideDown(300);
                $('html, body').addClass('menu_opened');

                setTimeout(function() {
                    menuLogic = false;
                }, 300);
            }
        }
    });
}

menuHandler();


function customSelect(){
    $('.custom_select').each(function(index){
        let select = $(this);

        $(this).find('.cs_current_option').on('click', function(){
            select.toggleClass('open');
        });

        $(this).find('.cs_option').on('click', function(){
            let currentVal = $(this).text();

            select.find('.cs_current_option').html(currentVal);
            select.attr('value', currentVal);
            select.removeClass('open');
        });

        $(window).on('click', function(e){ 
             if (!select.has(e.target).length) {
                select.removeClass('open');
            }
        });

    });
}

customSelect();


function modalWindow(){
    $('.open_modal').on('click', function(e){
        e.preventDefault();

        let currentModal = $(this).attr('href');

        $('.overlay').css('display', 'flex').hide().fadeIn(200);
        $(currentModal).fadeIn(200);
    });

    $('.modal_close').on('click', function(){
        $('.modal, .overlay').fadeOut(200);
    });
}

modalWindow();



if ($('.content_slider').length > 0){
    const caseSlider = new Swiper('.content_slider',{
        slidesPerView: 'auto',
        effect: 'coverflow',
        centeredSlides: true,
        loop: true,
        speed: 1000,
        autoHeight: true,
        spaceBetween: 30,
        slideToClickedSlide: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 0,
            slideShadows: false,
        },
        pagination: {
            el: '.content_slider .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                coverflowEffect: {
                    rotate: 30,
                    stretch: 0,
                    depth: 10,
                    modifier: 1,
                    slideShadows : true,
                },
                spaceBetween: 30,
            }
        }
    });
}



function collision($div1, $div2) {
    let x1 = $div1.offset().left;
    let w1 = 40;
    let r1 = x1 + w1;
    let x2 = $div2.offset().left;
    let w2 = 40;
    let r2 = x2 + w2;

    if (r1 < x2 || x1 > r2) return false;
    return true;
}


function rangePriceSlider(){
    if ($('.price_slider').length > 0){
        $('.price_slider').slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function(event, ui){

                $('.ui-slider-handle:eq(0) .price-range-min').html(ui.values[ 0 ]);
                $('.ui-slider-handle:eq(1) .price-range-max').html(ui.values[ 1 ]);
                $('.price-range-both').html('<i>' + ui.values[ 0 ] + ' - </i>' + ui.values[ 1 ] );

                if ( ui.values[0] == ui.values[1] ) {
                    $('.price-range-both i').css('display', 'none');
                } else {
                    $('.price-range-both i').css('display', 'inline');
                }

                if (collision($('.price-range-min'), $('.price-range-max')) == true) {
                    $('.price-range-min, .price-range-max').css('opacity', '0');
                    $('.price-range-both').css('display', 'block');
                } else {
                    $('.price-range-min, .price-range-max').css('opacity', '1');
                    $('.price-range-both').css('display', 'none');
                }
            }
        });

        $('.ui-slider-range').append('<span class="price-range-both value"><i>$' + $('.price_slider').slider('values', 0 ) + ' - </i>' + $('#slider').slider('values', 1 ) + '</span>');
        $('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('.price_slider').slider('values', 0 ) + '</span>');
        $('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('.price_slider').slider('values', 1 ) + '</span>');
    }
}

rangePriceSlider();


function catalogItemImgSlider(){

    $('.catalog_item').each(function(index){
        let imgs = $(this).find('.cat_item_gal_img');

        for (let i = 0; i < imgs.length; i++) {
            $(this).find('.cat_item_gal_pager').append('<div class="cat_item_gal_page" data-index="'+i+'"></div>')
        }

        $(this).find('.cat_item_gal_page:first-child').addClass('active');
    });

    $(document).on('click', '.cat_item_gal_page', function(){
        let index = $(this).data('index');
        $(this).closest('.catalog_item').find('.cat_item_gal_page').removeClass('active');
        $(this).addClass('active');

        $(this).closest('.catalog_item').find('.cat_item_gal_img').hide();
        let currImg = $(this).closest('.catalog_item').find('.cat_item_gal_img').eq(index).show();
    });


    $(document).on('click', '.cat_item_arr.prev', function(){
        let slideNum = $(this).closest('.cat_item_gal').find('.cat_item_gal_page').length;
        let currSlide = $(this).closest('.cat_item_gal').find('.cat_item_gal_page.active').data('index');

        $(this).closest('.catalog_item').find('.cat_item_gal_img').hide();

        if (currSlide <= 0){
            $(this).closest('.catalog_item').find('.cat_item_gal_img').eq(slideNum - 1).show();
            $(this).closest('.catalog_item').find('.cat_item_gal_page').removeClass('active');
            $(this).closest('.catalog_item').find('.cat_item_gal_page').eq(slideNum - 1).addClass('active');
        } else {
            $(this).closest('.catalog_item').find('.cat_item_gal_img').eq(currSlide - 1).show();
            $(this).closest('.catalog_item').find('.cat_item_gal_page').removeClass('active');
            $(this).closest('.catalog_item').find('.cat_item_gal_page').eq(currSlide - 1).addClass('active');
        }
    });

    $(document).on('click', '.cat_item_arr.next', function(){
        let slideNum = $(this).closest('.cat_item_gal').find('.cat_item_gal_page').length;
        let currSlide = $(this).closest('.cat_item_gal').find('.cat_item_gal_page.active').data('index');

        $(this).closest('.catalog_item').find('.cat_item_gal_img').hide();

        if ((currSlide + 1) >= slideNum){
            $(this).closest('.catalog_item').find('.cat_item_gal_img:first-child').show();
            $(this).closest('.catalog_item').find('.cat_item_gal_page').removeClass('active');
            $(this).closest('.catalog_item').find('.cat_item_gal_page:first-child').addClass('active');
        } else {
            $(this).closest('.catalog_item').find('.cat_item_gal_img').eq(currSlide + 1).show();
            $(this).closest('.catalog_item').find('.cat_item_gal_page').removeClass('active');
            $(this).closest('.catalog_item').find('.cat_item_gal_page').eq(currSlide + 1).addClass('active');
        }
    });
}

catalogItemImgSlider();



function scrollToTop(){
    let scrollTop = $('.body_scroll_top');

    $(window).scroll(function(){
        let topPos = $(this).scrollTop();
        if (topPos > 100 && (topPos + $(window).height()) < ($('footer').position().top - 100)){
            $(scrollTop).fadeIn(300);
        } else {
            $(scrollTop).fadeOut(300);
        }
    });

    //Click event to scroll to top
    $('.scroll_top').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
}

scrollToTop();


let productThumbs = new Swiper('.product_thumbs', {
    spaceBetween: 25,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
        320: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 5
        }
    }
});

let productSlider = new Swiper('.product_slider', {
    spaceBetween: 0,
    pagination: {
        el: '.ps_pager',
        clickable: true
    },
    thumbs: {
        swiper: productThumbs
    }
});


/*
Кнопка "Наверх"
 */
$(document).ready(function(){
    $('.js_go_to_top').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $(window).scroll(function(){
        var $top = $('.js_go_to_top');
        var cPos = parseFloat($(this).scrollTop());
        var fPos = parseFloat($('footer').position().top);
        var wPos = parseFloat($(window).height());

        // Скрыть в начале страницы
        if(cPos > 150){
            $top.addClass('show');
        }else{
            $top.removeClass('show');
        }

        // Поменять внешний вид при входе в футер
        if(cPos+wPos > fPos){
            $top.addClass('in_footer');
        }else{
            $top.removeClass('in_footer');
        }
    });
});

function expandFormFields(){
    $('.of_add').on('click', function(){
        $(this).toggleClass('active').next('.order_form_additional').slideToggle(200);
    });
}

expandFormFields();


function expandFilter(){
    $('.cat_filter_trig').on('click', function(){
        $(this).toggleClass('active').next('.cat_filter_hidden').slideToggle(200);
    });
}

expandFilter();




function animateValue(id, incr, time) {

    if (document.getElementById(id)){
        let end = document.getElementById(id).innerHTML;
        if (0 === end) return;
        let range = end;
        let current = 0;
        let increment = incr;
        let stepTime = Math.abs(Math.floor(0.0001));
        let obj = document.getElementById(id);
        let timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current.toLocaleString();
            if (current == end) {
                clearInterval(timer);
            }
        }, time);
    }
}

animateValue("a_num1", 10, 100);
animateValue("a_num2", 100, 40);
animateValue("a_num3", 1000, 10);
animateValue("a_num4", 10000, 10);



// $('.selector').datepicker( "refresh" );


$('.form_date').each(function(index){
    let df = $(this);

    $(this).datepicker({
        firstDay: 1, 
        showAnim: '',
        dateFormat : "dd.mm.yy",
        monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    });

    $('.order_form').on('scroll', function(){
        if (df.is(':focus')){
            df.datepicker( "hide" );
            df.datepicker( "show" );
        }
    });
});

