
    setTimeout(function () { 
        $("body").addClass("loading"); 
    }, 200); // Start loading animation

    $(document).ready(function(){
        reorganizeIsotope();
        //preloader 
        const openSection = window.location.hash.substr(1);
        const borderWidthHeight = parseInt($(".bodyborderTop").height());
        $("#pageLoader .pageLoaderInner").delay(200).fadeIn(10, function () {
            $("body").addClass("loadingEnd");
            $("#pageLoader .pageLoaderInner").fadeOut(1000, function () {
                if (openSection) {
                    $('html,body').animate({ scrollTop: $("#" + openSection).offset().top - $("header").height() + 80 }, 10, 'easeInOutExpo');
                }
            });
            $("#pageLoader").delay(1300).animate({ top: borderWidthHeight + 'px', height: $(window).height() - (borderWidthHeight * 2) + 'px' }, 10).slideUp(1000, 'easeInOutExpo', function () { $("#pageLoader").animate({ top: '0', height: '100%' }, 10) });
        });

        //transitions
        $(window).on('unload', function(){});
        $('.transition').on('click',function (e) {
            href = $(this).attr('href');
            if (href.charAt(0) !== '#') {
                smoothtransistion(href);
                return false;
            } else {
                return true;
            }
        });

        function smoothtransistion(url) {
            $("#pageLoader").slideDown(800, 'easeInOutExpo', function () {
                setTimeout(function () { window.location = url; }, 300);
            });
            setTimeout(function () { $("body").removeClass("loadingEnd"); }, 500);
        }


        if ($('').isotope) {

            //call isotope
            $('.masonry').each(function () {
                const container = $(this);

                container.isotope({
                    itemSelector: '.masonry-item',
                    transformsEnabled: true,
                });
            });

            //isotope's filter
            $('.filter li a').on('click', function () {

                const parentul = $(this).parents('ul.filter').data('related-grid');
                
                $(this).parents('ul.filter').find('li a').removeClass('active');
                $(this).addClass('active');

                const selector = $(this).attr('data-option-value');
                $('#' + parentul).isotope({ filter: selector }, function(){});

                return (false);
            });
        }

        function reorganizeIsotope() {
            $('.masonry').each(function () {
                const container = $(this);
                const maxitemwidth = container.data('maxitemwidth');
                if (!maxitemwidth) { maxitemwidth = 370; }
                const containerwidth = Math.ceil(((container.width() + (parseInt(container.css('margin-left')) * 2)) / 120) * 100 - (parseInt(container.css('margin-left')) * 2));
                console.log(containerwidth);
                const itemmargin = parseInt(container.children('div').css('margin-right')) + parseInt(container.children('div').css('margin-left'));
                const rows = Math.ceil(containerwidth / maxitemwidth);
                const marginperrow = (rows - 1) * itemmargin;
                const newitemmargin = marginperrow / rows;
                const itemwidth = Math.floor((containerwidth / rows) - newitemmargin + 1);
                //$container.css({ 'width': '110%' });
                container.children('div').css({ 'width': itemwidth + 'px' });
                if (container.children('div').hasClass('isotope-item')) { 
                    container.isotope('reLayout'); 
                }
            });
        }
        reorganizeIsotope();

        $(window).resize(function () {
            reorganizeIsotope();
        });

        $('nav ul').on("click", "li", function () {
            const href = $(this).find('a').attr('href');
            if (href.charAt(0) !== '#') {
                smoothtransistion(href);
                return false;
            } else {
                hideResponsiveNav();
                return true;
            }
        });

        // open nav
        $('.openNav').on("click",function () {
            const hidden = $('nav').css('display');
            const borderWidthHeight = parseInt($("#pageContent").css("padding-top"));
            const fullheight = $(window).height() - (borderWidthHeight * 2);

            if (hidden == 'block') {
                hideResponsiveNav();
            } else {
                $('.openNav span').toggleClass('isClicked');
                $('nav').slideDown(700, 'easeInOutExpo', function () {
                    $('nav').addClass("navVisible");
                    const menuHeight = $(".navInner").height();
                    $(".navInner").css({ 'max-height': menuHeight + 'px' });
                    if (menuHeight < fullheight) {
                        var marginTop = parseInt((fullheight - menuHeight) / 2);
                    } else {
                        var marginTop = 0;
                    }
                    $(".navInner").animate({ "marginTop": marginTop + 'px', opacity: 1 }, 700, 'easeInOutQuart');
                });
            }
            return false;
        });

        function hideResponsiveNav() {
            $('.openNav span').toggleClass('isClicked');
            $('nav').removeClass("navVisible");
            $('.navInner').animate({ marginTop: '0px', opacity: 0 }, 700, 'easeInOutExpo', function () { });
            $("nav").delay(100).slideUp(700, 'easeInOutExpo');
        }


        //back to top
        $('.backToTop').on('click',function () {
            $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutQuart');
            return false;
        });

        //slider
        if ($().owlCarousel) {
            /* for all owlslider classes (single item) */
            $(".owlslider").owlCarousel({
                autoPlay: false,
                stopOnHover: true,
                navigation: false,
                navigationText: false,
                slideSpeed: 800,			// speed for mouseslide/touchslide
                paginationSpeed: 800,	// speed for autoPlay/pagination bullets
                singleItem: true,
                autoHeight: true
            });

        }


        //parallax
        if ($().parallax) {
            $('.parallax-section').parallax();
        }

    $(window).scroll(function () {
        smoothShow();
    });


    // SMOOTH SHOW FUNCION FOR ELEMENTS THAT TAKE ACTION WHEN VISIBLE (counter & animations & skills, etc)
    function smoothShow() {
        //big letter
        $('h1[data-bigletter],h2[data-bigletter],h3[data-bigletter],h4[data-bigletter],h5[data-bigletter],h6[data-bigletter]').each(function () {
            if ($(window).width() > 700) {
                    if ($(this).hasClass("visible")) {
                    } else { 
                        $(this).addClass("visible"); 
                    }
            } else {
                $(this).addClass("visible");
            }
        });

        //general animation
        $('.sr-animation').each(function () {
            if ($(window).width() > 700) {
                const visible = $(this).visible(true);
                const delay = $(this).attr("data-delay");
                if (!delay) { delay = 0; }
                if ($(this).hasClass("animated")) { }
                else if (visible) {
                    $(this).delay(delay).queue(function () { $(this).addClass('animated') });
                }
            } else {
                $(this).addClass('animated');
            }
        });
    }

    //sticky header and footer
    $(window).scroll(function(){
        const body = document.body 
        const html = document.documentElement;

        const height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        const currentLocation = window.pageYOffset
        const headerHeight = $('header').height()
        const footerHeight = height - window.innerHeight - 250
        //when leave the header
        if (currentLocation > headerHeight){
            $('header').addClass('stickyHeader')
            if (currentLocation < footerHeight){
            $('footer').addClass('stickyFooter')
            }
            else{
                $('footer').removeClass('stickyFooter')
            }
        }
        else{
            $('header').removeClass('stickyHeader')
            $('footer').removeClass('stickyFooter')
        }
    })

})