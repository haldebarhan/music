import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
declare var jQuery: any
declare var WOW: any
declare var Swiper: any
declare var PerfectScrollbar: any
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private homeService: HomeService){}
    title = 'frontend';
    cats: any = []
    ngOnInit(): void {
        this.initJS()
    }


    initJS() {

        (function (jQuery) {
            ("use strict");
            // Page loading
            jQuery(window).on("load", function () {
                jQuery("#preloader-active").fadeOut("slow");
            });
            /*-----------------
                Menu Stick
            -----------------*/
            var header = jQuery(".sticky-bar");
            var win = jQuery(window);
            win.on("scroll", function () {
                var scroll = win.scrollTop();
                if (scroll < 200) {
                    header.removeClass("stick");
                    jQuery(".header-style-2 .categories-dropdown-active-large").removeClass("open");
                    jQuery(".header-style-2 .categories-button-active").removeClass("open");
                } else {
                    header.addClass("stick");
                }
            });
            /*------ ScrollUp -------- */
            jQuery.scrollUp({
                scrollText: '<i class="fi-rr-arrow-small-up"></i>',
                easingType: "linear",
                scrollSpeed: 900,
                animation: "fade"
            });
            /*------ Wow Active ----*/
            new WOW().init();
            //sidebar sticky
            if (jQuery(".sticky-sidebar").length) {
                jQuery(".sticky-sidebar").theiaStickySidebar();
            }
            /*----------------------------
                Category toggle function
            ------------------------------*/
            if (jQuery(".categories-button-active").length) {
                var searchToggle = jQuery(".categories-button-active");
                searchToggle.on("click", (e: Event) => {
                    e.preventDefault();
                    if (jQuery(".categories-button-active").hasClass("open")) {
                        jQuery(".categories-button-active").removeClass("open");
                        jQuery(".categories-button-active").siblings(".categories-dropdown-active-large").removeClass("open");
                    } else {
                        jQuery(".categories-button-active").addClass("open");
                        jQuery(".categories-button-active").siblings(".categories-dropdown-active-large").addClass("open");
                    }
                });
            }
            /*---------------------
                Select active
            --------------------- */
            if (jQuery(".select-active").length) {
                jQuery(".select-active").select2();
            }
            /*---- CounterUp ----*/
            if (jQuery(".count").length) {
                jQuery(".count").counterUp({
                    delay: 10,
                    time: 2000
                });
            }
            // Isotope active
            if (jQuery(".grid").length) {
                jQuery(".grid").imagesLoaded(function () {
                    // init Isotope
                    var jQuerygrid = jQuery(".grid").isotope({
                        itemSelector: ".grid-item",
                        percentPosition: true,
                        layoutMode: "masonry",
                        masonry: {
                            // use outer width of grid-sizer for columnWidth
                            columnWidth: ".grid-item"
                        }
                    });
                });
            }
            /*====== SidebarSearch ======*/
            function sidebarSearch() {
                var searchTrigger = jQuery(".search-active"),
                    endTriggersearch = jQuery(".search-close"),
                    container = jQuery(".main-search-active");
                searchTrigger.on("click", function (e: Event) {
                    e.preventDefault();
                    container.addClass("search-visible");
                });
                endTriggersearch.on("click", function () {
                    container.removeClass("search-visible");
                });
            }
            sidebarSearch();
            /*====== Sidebar menu Active ======*/
            function mobileHeaderActive() {
                var navbarTrigger = jQuery(".burger-icon"),
                    endTrigger = jQuery(".mobile-menu-close"),
                    container = jQuery(".mobile-header-active"),
                    wrapper4 = jQuery("body");
                wrapper4.prepend('<div class="body-overlay-1"></div>');
                navbarTrigger.on("click", function (e: Event) {
                    navbarTrigger.toggleClass("burger-close");
                    e.preventDefault();
                    container.toggleClass("sidebar-visible");
                    wrapper4.toggleClass("mobile-menu-active");
                });
                endTrigger.on("click", function () {
                    container.removeClass("sidebar-visible");
                    wrapper4.removeClass("mobile-menu-active");
                });
                jQuery(".body-overlay-1").on("click", function () {
                    container.removeClass("sidebar-visible");
                    wrapper4.removeClass("mobile-menu-active");
                    navbarTrigger.removeClass("burger-close");
                });
            }
            mobileHeaderActive();
            /*---------------------
                Mobile menu active
            ------------------------ */
            var jQueryoffCanvasNav = jQuery(".mobile-menu"),
                jQueryoffCanvasNavSubMenu = jQueryoffCanvasNav.find(".sub-menu");
            /*Add Toggle Button With Off Canvas Sub Menu*/
            jQueryoffCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rr-angle-small-down"></i></span>');
            /*Close Off Canvas Sub Menu*/
            jQueryoffCanvasNavSubMenu.slideUp();
            /*Category Sub Menu Toggle*/
            jQueryoffCanvasNav.on("click", "li a, li .menu-expand", function (e: Event) {
                var jQuerythis = jQuery(jQueryoffCanvasNav);
                if (
                    jQuerythis
                        .parent()
                        .attr("class")
                        .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
                    (jQuerythis.attr("href") === "#" || jQuerythis.hasClass("menu-expand"))
                ) {
                    e.preventDefault();
                    if (jQuerythis.siblings("ul:visible").length) {
                        jQuerythis.parent("li").removeClass("active");
                        jQuerythis.siblings("ul").slideUp();
                    } else {
                        jQuerythis.parent("li").addClass("active");
                        jQuerythis.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                        jQuerythis.closest("li").siblings("li").find("ul:visible").slideUp();
                        jQuerythis.siblings("ul").slideDown();
                    }
                }
            });
            /*--- language currency active ----*/
            jQuery(".mobile-language-active").on("click", function (e: Event) {
                e.preventDefault();
                jQuery(".lang-dropdown-active").slideToggle(900);
            });
            /*--- categories-button-active-2 ----*/
            jQuery(".categories-button-active-2").on("click", function (e: Event) {
                e.preventDefault();
                jQuery(".categori-dropdown-active-small").slideToggle(900);
            });
            /*--- Mobile demo active ----*/
            var demo = jQuery(".tm-demo-options-wrapper");
            jQuery(".view-demo-btn-active").on("click", function (e: Event) {
                e.preventDefault();
                demo.toggleClass("demo-open");
            });
            /*-----More Menu Open----*/
            jQuery(".more_slide_open").slideUp();
            jQuery(".more_categories").on("click", function () {
                jQuery(".more_categories").toggleClass("show");
                jQuery(".more_slide_open").slideToggle();
            });
            /* --- SwiperJS --- */

            jQuery(".swiper-group-9").each(function () {
                var swiper_10_items = new Swiper(".swiper-group-9", {
                    spaceBetween: 20,
                    slidesPerView: 9,
                    slidesPerGroup: 2,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-group-9",
                        prevEl: ".swiper-button-prev-group-9"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1360: {
                            slidesPerView: 9
                        },
                        1199: {
                            slidesPerView: 7
                        },
                        800: {
                            slidesPerView: 5
                        },
                        390: {
                            slidesPerView: 4
                        },
                        250: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                            spaceBetween: 15
                        }
                    }
                });
            });
            jQuery(".swiper-group-7").each(function () {
                var swiper_10_items = new Swiper(".swiper-group-7", {
                    spaceBetween: 20,
                    slidesPerView: 7,
                    slidesPerGroup: 2,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-group-7",
                        prevEl: ".swiper-button-prev-group-7"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1360: {
                            slidesPerView: 7
                        },
                        1199: {
                            slidesPerView: 5
                        },
                        800: {
                            slidesPerView: 4
                        },
                        390: {
                            slidesPerView: 3
                        },
                        250: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                            spaceBetween: 15
                        }
                    }
                });
            });
            jQuery(".swiper-group-6").each(function () {
                var swiper_6_items = new Swiper(".swiper-group-6", {
                    spaceBetween: 30,
                    slidesPerView: 6,
                    slidesPerGroup: 2,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1360: {
                            slidesPerView: 6
                        },
                        1199: {
                            slidesPerView: 5
                        },
                        992: {
                            slidesPerView: 4
                        },
                        600: {
                            slidesPerView: 3
                        },
                        400: {
                            slidesPerView: 2
                        },
                        250: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 15
                        }
                    }
                });
            });
            jQuery(".swiper-group-5").each(function () {
                var swiper_5_items = new Swiper(".swiper-group-5", {
                    spaceBetween: 15,
                    slidesPerGroup: 1,
                    slidesPerView: 5,
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 5
                        },
                        800: {
                            slidesPerView: 3
                        },
                        475: {
                            slidesPerView: 2
                        },
                        350: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        },
                        275: {
                            slidesPerView: 1
                        }
                    }
                });
            });
            jQuery(".swiper-group-4-border").each(function () {
                var swiper_4_items_border = new Swiper(".swiper-group-4-border", {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-border",
                        prevEl: ".swiper-button-prev-border"
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1360: {
                            slidesPerView: 4
                        },
                        1199: {
                            slidesPerView: 3
                        },
                        600: {
                            slidesPerView: 2
                        },
                        350: {
                            slidesPerView: 1
                        },
                        150: {
                            slidesPerView: 1
                        }
                    }
                });
            });
            jQuery(".swiper-group-4").each(function () {
                var swiper_3_items = new Swiper(".swiper-group-4", {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-4",
                        prevEl: ".swiper-button-prev-4"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 4
                        },
                        800: {
                            slidesPerView: 2
                        },
                        400: {
                            slidesPerView: 1
                        },
                        150: {
                            slidesPerView: 1
                        }
                    }
                });
            });
            jQuery(".swiper-group-4-banner").each(function () {
                var swiper_3_items = new Swiper(".swiper-group-4-banner", {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-4",
                        prevEl: ".swiper-button-prev-4"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 4
                        },
                        800: {
                            slidesPerView: 4
                        },
                        400: {
                            slidesPerView: 3
                        },
                        150: {
                            slidesPerView: 2
                        }
                    }
                });
            });
            jQuery(".swiper-group-3").each(function () {
                var swiper_3_items = new Swiper(".swiper-group-3", {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 3
                        },
                        800: {
                            slidesPerView: 2
                        },
                        400: {
                            slidesPerView: 1
                        },
                        250: {
                            slidesPerView: 1
                        }
                    }
                });
            });
            jQuery(".swiper-group-3-explore").each(function () {
                var swiper_3_items = new Swiper(".swiper-group-3-explore", {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 3
                        },
                        600: {
                            slidesPerView: 3
                        },
                        350: {
                            slidesPerView: 2
                        },
                        250: {
                            slidesPerView: 1
                        }
                    }
                });
            });
            jQuery(".swiper-group-2").each(function () {
                var swiper_2_items = new Swiper(".swiper-group-2", {
                    spaceBetween: 30,
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    autoplay: {
                        delay: 10000
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 2
                        },
                        800: {
                            slidesPerView: 1
                        },
                        600: {
                            slidesPerView: 1
                        },
                        400: {
                            slidesPerView: 1
                        },
                        250: {
                            slidesPerView: 1
                        }
                    }
                });
            });

            jQuery(".swiper-group-1").each(function () {
                var swiper_1_items = new Swiper(".swiper-group-1", {
                    spaceBetween: 30,
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next-1",
                        prevEl: ".swiper-button-prev-1"
                    },
                    autoplay: {
                        delay: 10000
                    }
                });
            });

            //Dropdown selected item
            jQuery(".dropdown-menu li a").on("click", function (e: Event) {
                e.preventDefault();
                jQuery(".dropdown-menu li a")
                    .parents(".dropdown")
                    .find(".btn span")
                    .html(jQuery(".dropdown-menu li a").text() + ' <span class="caret"></span>');
                jQuery(".dropdown-menu li a").parents(".dropdown").find(".btn").val(jQuery(".dropdown-menu li a").data("value"));
            });
            jQuery(".list-tags-job .remove-tags-job").on("click", function (e: Event) {
                e.preventDefault();
                jQuery(".list-tags-job .remove-tags-job").closest(".job-tag").remove();
            });
            // Video popup
            if (jQuery(".popup-youtube").length) {
                jQuery(".popup-youtube").magnificPopup({
                    type: "iframe",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }
            // Init function billed
            checkBilled();
        })(jQuery);
        // Check billed
        function checkBilled() {
            var checkBox = jQuery("#cb_billed_type");
            var forMonth = jQuery(".for-month");
            var forYear = jQuery(".for-year");
            for (var i = 0; i < forMonth.length; i++) {
                if (checkBox.is(":checked")) {
                    forYear.eq(i).addClass("display-year");
                    forMonth.eq(i).removeClass("display-month");
                } else {
                    forYear.eq(i).removeClass("display-year");
                    forMonth.eq(i).addClass("display-month");
                }
            }
        }
        //Perfect Scrollbar
        const ps = new PerfectScrollbar(".mobile-header-wrapper-inner");

    }

   
}
