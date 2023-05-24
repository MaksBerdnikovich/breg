(function ($) {

    'use strict';

    const scripts = {
        init: () => {
            scripts.mobileToggle();
            //scripts.fixedHeader();
           // scripts.scrollToTop();
            scripts.scrollAnimations();
            scripts.tabs();
            scripts.accordion();
            scripts.dropdown();
            scripts.toggles();
            scripts.collapsed();
            scripts.datepicker();
            scripts.carousel();
            scripts.modals();
            scripts.timer();
            scripts.formElements();
            scripts.clipboard();
            scripts.fancybox();
            scripts.counter();
            scripts.masonry();
            scripts.tooltip();
            scripts.progressbar();
            scripts.onResize();
        },

        fixedHeader: () => {
            const setFixed = () => {
                const sticky = $('[data-sticky]')
                $(window).scrollTop() > 0 ? sticky.addClass('fixed') : sticky.removeClass('fixed')
            }

            setFixed()
            $(window).scroll(() => setFixed())
        },

        mobileToggle: () => {
            const $body = $('body')
            const $toggle = $('[data-menu-toggle]')
            const $nav = $('[data-menu-nav]')

            $toggle.on('click', () => {
                $body.toggleClass('lock')
                $toggle.toggleClass('open')
                $nav.toggleClass('open')
            })
        },

        scrollToTop: () => {
            const offset = 500;
            const $button = $('[data-scroll-to-top]');

            $(window).scroll(function () {
                if ($(this).scrollTop() > offset) {
                    $button.addClass('show');
                } else {
                    $button.removeClass('show');
                }
            });

            $button.on('click', () => {
                $('html, body').animate({scrollTop: 0}, 400);
                return false;
            });
        },

        scrollAnimations: () => {
            AOS.init({
                offset: 400,
                delay: 0,
                duration: 1000,
                easing: 'ease',
                once: false,
                mirror: false,
                anchorPlacement: 'top-bottom',
            });
        },

        tabs: () => {
            const $tabs = $('[data-tab]');
            $tabs.each((i, tab) => {
                const $body = $('[data-tab-body]', tab);
                const $nav = $('[data-tab-nav]', tab);
                const isPreset = $(tab).is('[data-tab-preset]');
                const isHashActive = $(tab).is('[data-tab-hash]');

                if (!isHashActive) {
                    $body.hide().filter(isPreset ? '[data-tab-active]' : ':first').show();
                    $nav.on('click', function(e) {
                        e.preventDefault()

                        $body.hide();
                        $body.filter(this.hash).show();
                        $nav.removeClass('active');
                        $(this).addClass('active');
                        return false;
                    }).filter(isPreset ? '[data-tab-active]' : ':first').click()
                } else {
                    const hash = window.location.hash
                    $body.hide().filter(hash ? hash : ':first').show();
                    $nav.on('click', function(e) {
                        e.preventDefault()

                        $body.hide();
                        $body.filter(this.hash).show();
                        $nav.removeClass('active');
                        $(this).addClass('active');
                        return false;
                    }).filter(hash ? `[data-tab-nav='${window.location.hash}']`: ':first').click()
                }
            })
        },
        
        accordion: () => {
            const $acc = $('[data-acc-body]');
            const $nav = $('[data-acc-nav]');

            $acc.hide().filter(':first').show();

            $nav.on('click', function(e) {
                e.preventDefault()

                $acc.hide();
                $acc.filter(this.hash).show();
                $nav.removeClass('active');
                $(this).addClass('active');
                return false;
            }).filter(':first').click();
        },

        dropdown: () => {
            $('[data-dropdown-toggle]').on('click', function() {
                $(this).toggleClass('open')
                $(this).next('[data-dropdown]').slideToggle(200);
            });

            $(document).click(function(e) {
                const target = e.target;
                if (!$(target).is('[data-dropdown-toggle]') && !$(target).parents().is('[data-dropdown-toggle]')) {
                    $('[data-dropdown-toggle]').removeClass('open');
                    $('[data-dropdown]').slideUp(200);
                }
            });
        },

        toggles: () => {
            $('[data-toggle]').on('click', function() {
                $(this).next('[data-toggle-target]').toggle();
                $(this).toggleClass('active');
            });
        },

        collapsed: () => {
            $('[data-collapsed-right]').each((i, item) => {
                $(item).on('click', function() {
                    $(this).toggleClass('collapse-right');
                    $(this).parents('[data-collapse-right]').toggleClass('collapse-right');
                });
            })

            $('[data-collapsed-bottom]').each((i, item) => {
                $(item).on('click', function() {
                    $(this).toggleClass('collapse-bottom');
                    $(this).parents('[data-collapse-bottom]').toggleClass('collapse-bottom');
                });
            })
        },

        datepicker: () => {
            $('[data-datepicker]').datepicker({
                dateFormat: "yy-mm-dd"
            });
        },

        carousel: () => {
            $('[data-docs-carousel]').each((index, item) => {
                $(item).owlCarousel({
                    items: 3,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true,
                    nav: true,
                    dots: true,
                    center: true,
                    margin: 15,
                    onInitialized: () => $('.owl-dots', item).appendTo($('.owl-nav', item))
                })
            });

            $('[data-single-carousel]').each((index, item) => {
                $(item).owlCarousel({
                    loop: false,
                    mouseDrag: false,
                    touchDrag: true,
                    nav: true,
                    dots: false,
                    items: 1,
                    onInitialized: (e) => {
                        setTimeout(() => {
                            const counter = '<div class="owl-counter"></div>';
                            const current = `<span class="owl-counter-curr">01</span>`;
                            const count = `<span class="owl-counter-all">${e.item.count < 10 ? '0' + e.item.count : e.item.count}</span>`;

                            $('.owl-item.active', item).addClass('animate-start')
                            $(counter).html(current + "/" + count).appendTo($('.owl-nav', item))
                        }, 200)

                        setTimeout(() => {
                            $('.owl-nav', item).css('opacity', '1')
                        }, 1000)
                    },
                    onTranslate: (e) => {
                        $('.owl-item', item).removeClass('animate-start')

                        setTimeout(() => {
                            $('.owl-item.active', item).addClass('animate-start')
                        })

                        const value = (e.item.index + 1) < 10 ? '0' + (e.item.index + 1) : (e.item.index + 1)
                        $('.owl-counter-curr', item).html(value)
                    }
                })
            });

            $('[data-plans-carousel]').owlCarousel({
                items: 6,
                margin: 10,
                loop: false,
                autoWidth: true,
                mouseDrag: false,
                touchDrag: true,
                nav: true,
                dots: false,
            });

            $('[data-ticker-carousel]').each(function (i, ticker){
                const direction = $(ticker).data('ticker-carousel')

                $(ticker).carouselTicker({
                    speed: 1,
                    delay: 30,
                    direction: direction,
                    mode: "horizontal",
                    onCarouselTickerLoad: function () {},
                });
            });

            try {
                if ($('[data-stats-carousel]').length > 0) {
                    new Carousel(document.querySelector("[data-stats-carousel]"), {
                        'slidesPerPage' : 1,
                        'infinite' : false,
                        'friction' : 0.8,
                        'center' : false,
                        Dots: false,
                        Navigation: true,
                        on: {
                            init: (carousel) => {
                                carousel.$viewport = carousel.$container.querySelector(".carousel__viewport");
                            },
                            change: (carousel) => {
                                if (carousel.page > 0) {
                                    carousel.$viewport.classList.add(`viewport--finish`)
                                } else {
                                    carousel.$viewport.classList.remove(`viewport--finish`)
                                }
                            },
                        },
                    });
                }
            } catch(e) {console.log(e)}
        },

        modals: () => {
            const $modal = $('[data-modal]')
            const $openModal = $('[data-modal-opened]')
            const id = $openModal.attr('id')

            if ($openModal.length > 0) {
                Fancybox.show([{
                    src: `#${id}`,
                    type: "inline",
                    dragToClose: false
                }]);
            }

            $modal.on('click', '[data-modal-close]', function(e) {
                $('html').removeClass('with-fancybox')
                Fancybox.close();
            });
        },

        timer: () => {
            let m
            const timer = function () {
                let now = new Date($(this).attr('data-now')),
                    startTime = new Date($(this).attr('data-start')),
                    finishTime = new Date($(this).attr('data-end')),
                    startMS = startTime.getTime(),
                    finishMS = finishTime.getTime(),
                    nowMS = now.getTime(),
                    betweenMS = finishMS - startMS,
                    lastMS = finishMS - nowMS,
                    percent = lastMS * 100 / betweenMS,
                    lastHour,
                    lastMin,
                    lastSec;

                m = setInterval(function () {
                    nowMS = nowMS + 1000;
                    lastMS = finishMS - nowMS;

                    lastHour = Math.floor(lastMS / 1000 / 60 / 60)
                    lastMin = Math.floor((lastMS - (lastHour * 1000 * 60 * 60)) / 1000 / 60)
                    lastSec = Math.floor((lastMS - (lastHour * 1000 * 60 * 60) - (lastMin * 60 * 1000)) / 1000)

                    lastHour = checkTime(lastHour);
                    lastMin = checkTime(lastMin);
                    lastSec = checkTime(lastSec);

                    $(this).find('.hour > span').text(lastHour);
                    $(this).find('.min > span').text(lastMin);
                    $(this).find('.sec > span').text(lastSec);

                    if (lastMS / 1000 < 0) {
                        $(this).find('.hour > span').text('00');
                        $(this).find('.min > span').text('00');
                        $(this).find('.sec > span').text('00');
                    }
                }.bind(this), 1000)
            }

            const checkTime = function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            if ($(".timer").length > 0) {
                $(".timer").map(timer)
            }
        },

        formElements: () => {
            // selectric.js
            try {
                $('[data-select]').selectric();

                $('[data-select-deposit]').selectric({
                    optionsItemBuilder: function(itemData, element, index) {
                        return `<img src="dist/images/pays/${itemData.value}.png" alt="${itemData.text}"/>
                                <span>${itemData.text}</span>`
                    },
                    labelBuilder: function(currItem) {
                        return `<i><img src="dist/images/pays/${currItem.value}.png" alt="${currItem.text}"/></i>
                                <span class="title-h6">${currItem.text}</span></div>`
                    },
                });
            } catch (e){}

            try {
                $('input[type=file]').on('change', function(){
                    const file = this.files[0];
                    $(this).closest('.file-group').find('.file-group__txt').html(file.name);
                });
            } catch (e){}
        },

        clipboard: () => {
            // clipboard.js
            try {
                const clipboard = new ClipboardJS('[data-clipboard]');

                clipboard.on('success', function (e) {
                    const id = e.trigger.getAttribute('data-clipboard-target');
                    id ? $(id).select() : $(e).select()

                    $('[data-clipboard-confirm]').addClass('active')
                    setTimeout(() => $('[data-clipboard-confirm]').removeClass('active'), 2000)
                });
            } catch (e){}
        },

        fancybox: () => {
            // fancybox.js
            Fancybox.bind("[data-fancybox], .data-fancybox > a", {
                Thumbs: false,
                Toolbar : false,
                Hash: false,
                closeButton: true,
                Html: {
                    video: {
                        autoplay: true,
                    },
                },
                on: {
                    shouldClose: (fancybox, slide) => {
                    }
                },
            });
        },

        counter: () => {
            let counter = document.querySelectorAll('[data-counter]')
            let limit = 0

            window.addEventListener('scroll', function(){
                if( limit === counter.length ) return

                for(let i = 0; i < counter.length; i++){
                    let pos = counter[i].getBoundingClientRect().top
                    let win = window.innerHeight - 40
                    if( pos < win && counter[i].dataset.stop === "0" ){
                        counter[i].dataset.stop = 1;
                        let x = 0
                        limit++
                        let int = setInterval(function(){
                            x = x + Math.ceil( counter[i].dataset.to / 50 )
                            counter[i].innerText = x
                            if( x > counter[i].dataset.to ){
                                counter[i].innerText = counter[i].dataset.to + counter[i].dataset.unit
                                clearInterval(int)
                            }
                        }, 60)
                    }
                }
            });
        },

        masonry: () => {
            setTimeout(() => {
                $('[data-masonry]').masonry({
                    itemSelector: '.masonry-item',
                    horizontalOrder: true,
                    percentPosition: true,
                    transitionDuration: 0
                });
            }, 100)
        },

        tooltip: () => {
            $('[data-tooltip]').tooltip({
                classes: {
                    "ui-tooltip": "tooltip",
                },
                position: {
                    my: "top center",
                    at: "top center"
                }
            });
        },

        progressbar: () => {
            $('.progressbar').each(function (i, item){
                var progress = 0;
                const timeout = $(item).data('time')
                const timer = setInterval(updateProgressbar, timeout);

                function updateProgressbar(){
                    $(item).progressbar({
                        value: ++progress
                    });

                    if(progress == 100) clearInterval(timer);
                }

                $(item).progressbar({
                    value: progress
                });
            })
        },

        onResize: () => {
        },
    };

    // Run the function
    $(function () {
        scripts.init();
    });
})(jQuery);