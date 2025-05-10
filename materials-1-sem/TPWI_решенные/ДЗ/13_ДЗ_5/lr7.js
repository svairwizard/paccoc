window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
window.isiOS = !1;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.isiOS = !0
}
window.isiOSVersion = '';
if (window.isiOS) {
    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (version !== null) {
        window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]
    }
}
window.isSafari = !1;
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    window.isSafari = !0
}
window.isSafariVersion = '';
if (window.isSafari) {
    var version = (navigator.appVersion).match(/Version\/(\d+)\.(\d+)\.?(\d+)? Safari/);
    if (version !== null) {
        window.isSafariVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]
    }
}
window.browserLang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2);
window.tildaBrowserLang = window.browserLang;
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t503_init(recId) {
    t_onFuncLoad('t_card__moveClickOnCard', function() {
        t_card__moveClickOnCard(recId)
    });
    t_onFuncLoad('t_card__addFocusOnTab', function() {
        t_card__addFocusOnTab(recId)
    })
}
var t776_POPUP_SHOWED_EVENT_NAME = 'catalog:popupShowed';
var t776_POPUP_CLOSED_EVENT_NAME = 'catalog:popupClosed';
function t776__init(recid) {
    setTimeout(function() {
        t_onFuncLoad('t_prod__init', function() {
            t_prod__init(recid)
        });
        t776_initPopup(recid);
        t776__hoverZoom_init(recid);
        t776__updateLazyLoad(recid);
        t776__alignButtons_init(recid);
        t_onFuncLoad('t_store_addProductQuantityEvents', function() {
            t776_initProductQuantity(recid)
        });
        var event = document.createEvent('HTMLEvents');
        event.initEvent('twishlist_addbtn', !0, !1);
        document.body.dispatchEvent(event)
    }, 500)
}
function t776_initProductQuantity(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var productList = rec.querySelectorAll('.t776__col, .t776__product-full');
    Array.prototype.forEach.call(productList, function(product) {
        t_store_addProductQuantityEvents(product)
    })
}
function t776__showMore(recid) {
    var rec = document.querySelector('#rec' + recid + ' .t776');
    if (!rec)
        return;
    var cardsCount = parseInt(rec.getAttribute('data-show-count'), 10);
    if (isNaN(cardsCount) || cardsCount < 1)
        return;
    var showMoreButton = rec.querySelector('.t776__showmore');
    if (!showMoreButton)
        return;
    if (!showMoreButton.querySelector('td').textContent) {
        showMoreButton.querySelector('td').textContent = t776__dict()
    }
    var firstProductCard = rec.querySelector('.t776__col');
    if (!firstProductCard)
        return;
    var productCards = rec.querySelectorAll('.t776__col');
    var cardsLenght = productCards.length;
    if (!window.getComputedStyle)
        return;
    var originalDisplayProperty = window.getComputedStyle(firstProductCard).display;
    if (cardsLenght > cardsCount) {
        showMoreButton.style.display = 'inline-block'
    }
    Array.prototype.forEach.call(productCards, function(card) {
        card.style.display = 'none'
    });
    t776__showSeparator(rec, cardsCount);
    for (var i = 0; i < cardsCount; i++) {
        if (productCards[i]) {
            productCards[i].style.display = originalDisplayProperty
        }
    }
    window.addEventListener('resize', function() {
        Array.prototype.forEach.call(productCards, function(card) {
            card.style.display = 'none'
        });
        for (var i = 0; i < cardsCount; i++) {
            if (productCards[i]) {
                productCards[i].style.display = originalDisplayProperty
            }
        }
    });
    var showedCardsCount = 0;
    showMoreButton.addEventListener('click', function() {
        Array.prototype.forEach.call(productCards, function(product) {
            if (product.style.display === originalDisplayProperty) {
                showedCardsCount++
            }
        });
        cardsCount += showedCardsCount;
        for (var i = 0; i < cardsCount; i++) {
            if (productCards[i]) {
                productCards[i].style.display = originalDisplayProperty
            }
        }
        if (cardsCount >= cardsLenght) {
            showMoreButton.style.display = 'none'
        }
        t776__showSeparator(rec, cardsCount);
        if (rec.querySelector('[data-buttons-v-align]')) {
            t776__alignButtons(recid)
        }
        if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function() {
                t_lazyload_update()
            })
        }
    })
}
function t776__showSeparator(rec, cardsCount) {
    if (window.jQuery && rec instanceof jQuery) {
        rec = rec.get(0)
    }
    var allSeparators = rec.querySelectorAll('.t776__separator_number');
    Array.prototype.forEach.call(allSeparators, function(separator) {
        separator.classList.add('t776__separator_hide');
        if (separator.getAttribute('data-product-separator-number') <= cardsCount) {
            separator.classList.remove('t776__separator_hide')
        }
    })
}
function t776__dict() {
    var dictionary = {
        EN: 'Load more',
        RU: 'Загрузить еще',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga más',
        PT: 'Carregue mais',
        UK: 'Завантажити ще',
        JA: 'もっと読み込む',
        ZH: '裝載更多',
    };
    var language = window.browserLang;
    return dictionary[language] ? dictionary[language] : dictionary.EN
}
function t776__alignButtons_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    if (!rec.querySelector('[data-buttons-v-align]')) {
        return
    }
    try {
        t776__alignButtons(recid);
        if (document.querySelector('.t-records').getAttribute('data-tilda-mode') === 'edit') {
            setInterval(function() {
                t776__alignButtons(recid)
            }, 200)
        }
        window.addEventListener('resize', t_throttle(function() {
            if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && window.isMobile) {
                return
            }
            t776__alignButtons(recid)
        }));
        var wrapperBlock = rec.querySelector('.t776');
        if (wrapperBlock) {
            wrapperBlock.addEventListener('displayChanged', function() {
                t776__alignButtons(recid)
            })
        }
        if (window.isMobile) {
            window.addEventListener('orientationchange', function() {
                t776__alignButtons(recid)
            })
        }
    } catch (error) {
        console.log('buttons-v-align error: ' + error.message)
    }
}
function t776__alignButtons(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var maxHeight = 0;
    var wrappers = rec.querySelectorAll('.t776__textwrapper');
    var container = rec.querySelector('.t776__parent');
    if (container) {
        var productInRow = parseInt(container.getAttribute('data-blocks-per-row'), 10)
    }
    var mobileView = window.innerWidth <= 480;
    var tableView = window.innerWidth <= 960 && window.innerWidth > 480;
    var mobileOneRow = window.innerWidth <= 960 && rec.querySelector('.t776__container_mobile-flex');
    var mobileTwoItemsInRow = window.innerWidth <= 480 && rec.querySelector('.t776 .mobile-two-columns');
    if (mobileView) {
        productInRow = 1
    }
    if (tableView) {
        productInRow = 2
    }
    if (mobileTwoItemsInRow) {
        productInRow = 2
    }
    if (mobileOneRow) {
        productInRow = 999999
    }
    var count = 1;
    var wrappersInRow = [];
    Array.prototype.forEach.call(wrappers, function(wrapper) {
        wrapper.style.height = 'auto';
        if (productInRow === 1) {
            wrapper.style.height = 'auto'
        } else {
            wrappersInRow.push(wrapper);
            if (wrapper.offsetHeight > maxHeight) {
                maxHeight = wrapper.offsetHeight
            }
            Array.prototype.forEach.call(wrappersInRow, function(wrapperInRow) {
                wrapperInRow.style.height = maxHeight + 'px'
            });
            if (count === productInRow) {
                count = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            count++
        }
    })
}
function t776__hoverZoom_init(recid) {
    if (window.isMobile) {
        return
    }
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var parent = rec.querySelector('.t776__parent');
    try {
        if (parent && parent.getAttribute('data-hover-zoom') !== 'yes') {
            return
        }
        var hoverScript = 'js/tilda-hover-zoom-1.0.min.js';
        if (document.querySelector("script[src^='" + hoverScript + "']")) {
            t_onFuncLoad('t_hoverZoom_init', function() {
                t_hoverZoom_init(recid)
            })
        } else {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = hoverScript;
            script.onload = function() {
                setTimeout(function() {
                    t_hoverZoom_init(recid)
                }, 500)
            }
            ;
            script.onerror = function(error) {
                console.log('Upload script error: ', error)
            }
            ;
            document.head.appendChild(script)
        }
    } catch (error) {
        console.log('Zoom image init error: ' + error.message)
    }
}
function t776__updateLazyLoad(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var scrollContainer = rec.querySelector(' .t776__container_mobile-flex');
    var currentMode = document.querySelector('.t-records').getAttribute('data-tilda-mode');
    if (scrollContainer && currentMode !== 'edit' && currentMode !== 'preview') {
        scrollContainer.addEventListener('scroll', t_throttle(function() {
            if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function() {
                    t_lazyload_update()
                })
            }
        }))
    }
}
function t776_initPopup(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var openerLink = rec.querySelectorAll('[href^="#prodpopup"]');
    var popup = rec.querySelector('.t-popup');
    Array.prototype.forEach.call(openerLink, function(link) {
        var product = link.closest('.js-product');
        var productLid = product.getAttribute('data-product-lid');
        var productLinks = document.querySelectorAll('.r a[href$="#!/tproduct/' + recid + '-' + productLid + '"]');
        Array.prototype.forEach.call(productLinks, function(productLink) {
            productLink.addEventListener('click', function() {
                if (rec.querySelector('[data-product-lid="' + productLid + '"]')) {
                    var linkToPopup = product.querySelector('[href^="#prodpopup"]');
                    if (linkToPopup) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('click', !0, !1);
                        linkToPopup.dispatchEvent(event)
                    }
                }
            })
        });
        link.addEventListener('click', clickOnceHandler, !1);
        function clickOnceHandler(event) {
            event.preventDefault();
            var product = link.closest('.js-product');
            var productLid = product.getAttribute('data-product-lid');
            t_onFuncLoad('t_sldsInit', function() {
                t_sldsInit(recid + ' #t776__product-' + productLid + '')
            });
            link.removeEventListener('click', clickOnceHandler, !1)
        }
        link.addEventListener('click', showPopupHandler, !1);
        function showPopupHandler(event) {
            event.preventDefault();
            if (event.target.classList.contains('t1002__addBtn') || event.target.parentNode.classList.contains('t1002__addBtn')) {
                return
            }
            t776_showPopup(recid);
            var product = link.closest('.js-product');
            var productLid = product.getAttribute('data-product-lid');
            var allProducts = popup.querySelectorAll('.js-product');
            Array.prototype.forEach.call(allProducts, function(product) {
                product.style.display = 'none'
            });
            var productFull = popup.querySelector('.js-product[data-product-lid="' + productLid + '"]');
            if (productFull) {
                productFull.style.display = 'block'
            }
            var analitics = popup.getAttribute('data-track-popup');
            if (analitics && productFull && window.Tilda) {
                var productName = productFull.querySelector('.js-product-name');
                if (productName) {
                    var virtualTitle = productName.textContent;
                    if (!virtualTitle) {
                        virtualTitle = 'prod' + productLid
                    }
                    Tilda.sendEventToStatistics(analitics, virtualTitle)
                }
            }
            var currentUrl = window.location.href;
            if (currentUrl.indexOf('#!/tproduct/') === -1 && currentUrl.indexOf('%23!/tproduct/') === -1) {
                if (typeof history.replaceState !== 'undefined') {
                    window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + productLid)
                }
            }
            t776_updateSlider(recid + ' #t776__product-' + productLid);
            if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function() {
                    t_lazyload_update()
                })
            }
        }
    });
    if (document.querySelectorAll('#record' + recid).length === 0) {
        t776_checkUrl(recid)
    }
    if (popup && popup.hasAttribute('data-fixed-button')) {
        t776_fixedPopupButton(recid)
    }
}
function t776_checkUrl(recid) {
    var currentUrl = window.location.href;
    var tprodIndex = (currentUrl.indexOf('#!/tproduct/') + 1 || currentUrl.indexOf('%23!/tproduct/') + 1 || currentUrl.indexOf('#%21%2Ftproduct%2F') + 1 || currentUrl.indexOf('#!%2Ftproduct%2F') + 1 || currentUrl.indexOf('%23%21%2Ftproduct%2F') + 1) - 1;
    if (tprodIndex !== -1) {
        var currentUrl = currentUrl.substring(tprodIndex, currentUrl.length);
        var curProdLid = currentUrl.substring(currentUrl.indexOf('-') + 1, currentUrl.length);
        if (curProdLid) {
            var curProdLidMatch = curProdLid.match(/([0-9]+)/g);
            if (curProdLidMatch) {
                curProdLid = curProdLidMatch[0]
            }
        }
        if (currentUrl.indexOf(recid) === -1)
            return;
        var rec = document.getElementById('rec' + recid);
        if (!rec)
            return;
        if (currentUrl.indexOf(recid) !== 0 && rec.querySelector('[data-product-lid="' + curProdLid + '"]')) {
            var currentLink = rec.querySelector('[data-product-lid="' + curProdLid + '"] [href^="#prodpopup"]');
            var event = document.createEvent('HTMLEvents');
            event.initEvent('click', !0, !1);
            if (currentLink) {
                currentLink.dispatchEvent(event)
            }
        }
    }
}
function t776_updateSlider(recid) {
    var rec = document.querySelector('#rec' + recid);
    if (!rec)
        return;
    t_onFuncLoad('t_slds_SliderWidth', function() {
        t_slds_SliderWidth(recid)
    });
    var slider = rec.querySelector('.t-slds__container');
    var paddingLeft = parseInt(slider.style.paddingLeft) || 0;
    var paddingRight = parseInt(slider.style.paddingRight) || 0;
    var sliderWrapper = rec.querySelector('.t-slds__items-wrapper');
    var sliderWidth = slider.clientWidth - (paddingLeft + paddingRight);
    var position = parseFloat(sliderWrapper.getAttribute('data-slider-pos'));
    sliderWrapper.style.transform = 'translate3d(-' + sliderWidth * position + 'px, 0, 0)';
    t_onFuncLoad('t_slds_UpdateSliderHeight', function() {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function() {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}
function t776_showPopup(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var popup = rec.querySelector('.t-popup');
    popup.style.display = 'block';
    setTimeout(function() {
        popup.querySelector('.t-popup__container').classList.add('t-popup__container-animated');
        popup.classList.add('t-popup_show');
        t_triggerEvent(popup, t776_POPUP_SHOWED_EVENT_NAME)
    }, 50);
    setTimeout(function() {
        if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function() {
                t_lazyload_update()
            })
        }
    }, 300);
    var body = document.body;
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupShowed');
    body.classList.add('t-body_popupshowed');
    var event = document.createEvent('HTMLEvents');
    event.initEvent('twishlist_addbtn', !0, !1);
    body.dispatchEvent(event);
    popup.addEventListener('mousedown', function(event) {
        var windowWidth = window.innerWidth;
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (event.clientX > windowWithoutScrollBar) {
            return
        }
        if (event.target === this) {
            t776_closePopup(body, popup)
        }
    });
    var closeButtons = rec.querySelectorAll('.t-popup__close, .t776__close-text');
    Array.prototype.forEach.call(closeButtons, function(button) {
        button.addEventListener('click', function() {
            t776_closePopup(body, popup)
        })
    });
    document.addEventListener('keydown', function(event) {
        var isGalleryShowedOldLib = document.body.classList.contains('t-zoomer__show');
        if (isGalleryShowedOldLib)
            return;
        var isGalleryShowedNewLib = document.body.classList.contains('t-zoomer__active');
        if (isGalleryShowedNewLib)
            return;
        var isPopupShowed = document.body.classList.contains('t-body_popupshowed');
        if (!isPopupShowed)
            return;
        if (popup && popup.classList.contains('t-popup_show')) {
            if (event.keyCode === 27) {
                t776_closePopup(body, popup)
            }
        }
    });
    if (window.isSafari) {
        setTimeout(function() {
            popup.scrollTop = 1
        })
    }
}
function t776_closePopup(body, popup) {
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupHidden');
    body.classList.remove('t-body_popupshowed');
    popup.classList.remove('t-popup_show');
    var event = document.createEvent('HTMLEvents');
    event.initEvent('twishlist_addbtn', !0, !1);
    body.dispatchEvent(event);
    var currentUrl = window.location.href;
    var indexToRemove = currentUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = currentUrl.indexOf('%23!/tproduct/')
    }
    currentUrl = currentUrl.substring(0, indexToRemove);
    setTimeout(function() {
        popup.scrollTop = 0;
        popup.style.display = 'none';
        if (typeof history.replaceState !== 'undefined') {
            window.history.replaceState('', '', currentUrl)
        }
    }, 300);
    t_triggerEvent(popup, t776_POPUP_CLOSED_EVENT_NAME)
}
function t776_fixedPopupButton(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var MOBILE_MAX_WIDTH = 560;
    var popup = rec.querySelector('.t-popup');
    var popupContainer = popup.querySelector('.t-popup__container');
    var btnWrappers = rec.querySelectorAll('.t776__btn-wrapper');
    Array.prototype.forEach.call(btnWrappers, function(el) {
        el.classList.add('t776__btn-wrapper-fixed')
    });
    function addStyle() {
        popupContainer.style.paddingBottom = '90px';
        popupContainer.style.cssText += ';transform:none !important;'
    }
    function resetStyle() {
        popupContainer.style.paddingBottom = '';
        popupContainer.style.transform = ''
    }
    function handleResize() {
        if (window.innerWidth > MOBILE_MAX_WIDTH) {
            resetStyle();
            return
        }
        addStyle()
    }
    if (window.isMobile) {
        window.addEventListener('orientationchange', handleResize)
    }
    popup.addEventListener(t776_POPUP_SHOWED_EVENT_NAME, function() {
        setTimeout(function() {
            handleResize()
        })
    });
    popup.addEventListener(t776_POPUP_CLOSED_EVENT_NAME, function() {
        resetStyle()
    });
    window.addEventListener('resize', handleResize)
}
function t706_onSuccessCallback() {
    var products = document.querySelector('.t706__cartwin-products');
    var cartBottom = document.querySelector('.t706__cartwin-bottom');
    var cartForm = document.querySelector('.t706 .t-form__inputsbox');
    if (products)
        t706_slideUp(products, 10);
    if (cartBottom)
        t706_slideUp(cartBottom, 10);
    if (cartForm)
        t706_slideUp(cartForm, 700);
    try {
        tcart__unlockScroll()
    } catch (error) {}
}
function t706_slideUp(target, duration) {
    if (!target)
        return;
    if (!duration && duration !== 0)
        duration = 500;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    setTimeout(function() {
        target.style.display = 'none';
        target.style.height = '';
        target.style.paddingTop = '';
        target.style.paddingBottom = '';
        target.style.marginTop = '';
        target.style.marginBottom = '';
        target.style.overflow = '';
        target.style.transitionDuration = '';
        target.style.transitionProperty = ''
    }, duration)
}
function t595_init(recId) {
    t_onFuncLoad('t_card__moveClickOnCard', function() {
        t_card__moveClickOnCard(recId)
    });
    t_onFuncLoad('t_card__addFocusOnTab', function() {
        t_card__addFocusOnTab(recId)
    })
}
function t433_init(recid) {
    var rec = document.querySelector('#rec' + recid);
    if (!rec)
        return;
    var separateMap = document.querySelector('#separateMap' + recid);
    if (separateMap)
        separateMap.style.height = 'auto';
    t433_setMapHeight(recid);
    var mapWrapper = rec.querySelector('.t433');
    if (!mapWrapper)
        return;
    mapWrapper.addEventListener('displayChanged', function() {
        t433_setMapHeight(recid)
    });
    window.addEventListener('resize', t_throttle(function() {
        t433_setMapHeight(recid)
    }))
}
function t433_setMapHeight(recid) {
    var rec = document.querySelector('#rec' + recid);
    if (!rec)
        return;
    var mapElement = rec.querySelector('.t-map');
    var textElement = rec.querySelector('.t433__col_text');
    if (!mapElement || !textElement)
        return;
    var paddingTop = parseInt(textElement.style.paddingTop, 10) || 0;
    var paddingBottom = parseInt(textElement.style.paddingBottom, 10) || 0;
    var textHeight = textElement.clientHeight - (paddingTop + paddingBottom);
    mapElement.style.height = textHeight + 'px';
    var event = document.createEvent('HTMLEvents');
    event.initEvent('sizechange', !0, !1);
    mapElement.dispatchEvent(event)
}
function t718_onSuccess(form) {
    form = form[0] ? form[0] : form;
    if (!form)
        return;
    if (form.tagName && form.tagName.toLowerCase() === 'input') {
        form = form.closest('.t-form')
    }
    var inputsWrapper = form.querySelector('.t-form__inputsbox');
    if (!inputsWrapper)
        return;
    var paddingTopInputs = parseInt(inputsWrapper.style.paddingTop, 10) || 0;
    var paddingBottomInputs = parseInt(inputsWrapper.style.paddingBottom, 10) || 0;
    var inputsHeight = inputsWrapper.clientHeight - (paddingTopInputs + paddingBottomInputs);
    var inputsOffset = inputsWrapper.getBoundingClientRect().top + window.pageYOffset;
    var inputsBottom = inputsHeight + inputsOffset;
    var targetOffset = form.querySelector('.t-form__successbox').getBoundingClientRect().top + window.pageYOffset;
    var target = null;
    if (window.innerWidth > 960) {
        target = targetOffset - 200
    } else {
        target = targetOffset - 100
    }
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    if (targetOffset > window.pageYOffset || documentHeight - inputsBottom < window.innerHeight - 100) {
        inputsWrapper.classList.add('t718__inputsbox_hidden');
        var body = document.body;
        var paddingTopBody = parseInt(body.style.paddingTop, 10) || 0;
        var paddingBottomBody = parseInt(body.style.paddingBottom, 10) || 0;
        var bodyHeight = body.clientHeight - (paddingTopBody + paddingBottomBody);
        setTimeout(function() {
            if (window.innerHeight > bodyHeight) {
                setTimeout(function() {
                    var tildaLabel = document.querySelector('.t-tildalabel');
                    if (!tildaLabel)
                        return;
                    t718__fadeOut(tildaLabel)
                }, 50)
            }
        }, 300)
    } else {
        t718_scrollToTop(target);
        setTimeout(function() {
            inputsWrapper.classList.add('t718__inputsbox_hidden')
        }, 400)
    }
    var successUrl = form.getAttribute('data-success-url');
    if (successUrl) {
        setTimeout(function() {
            window.location.href = successUrl
        }, 500)
    }
}
function t718_scrollToTop(target) {
    if (target === window.pageYOffset) {
        return !1
    }
    var duration = 400;
    var difference = window.pageYOffset;
    var cashedDiff = window.pageYOffset;
    var step = (Math.abs(window.pageYOffset - target) * 10) / duration;
    var scrollInterval = setInterval(function() {
        if (cashedDiff > target) {
            difference -= step
        } else {
            difference += step
        }
        window.scrollTo(0, difference);
        document.body.setAttribute('data-scrollable', 'true');
        if (cashedDiff > target && window.pageYOffset <= target) {
            document.body.removeAttribute('data-scrollable');
            clearInterval(scrollInterval)
        } else if (cashedDiff <= target && window.pageYOffset >= target) {
            document.body.removeAttribute('data-scrollable');
            window.scrollTo(0, target);
            clearInterval(scrollInterval)
        }
    }, 10);
    var scrollTimeout = setTimeout(function() {
        clearInterval(scrollInterval);
        document.body.removeAttribute('data-scrollable');
        clearTimeout(scrollTimeout)
    }, duration * 2)
}
function t718__fadeOut(element) {
    if (element.style.display === 'none')
        return;
    var opacity = 1;
    var timer = setInterval(function() {
        element.style.opacity = opacity;
        opacity -= 0.1;
        if (opacity <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
            element.style.opacity = null
        }
    }, 50)
}
function t821_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec ? rec.querySelector('.t821') : null;
    if (!menu)
        return;
    var isFixed = menu.style.position === 'fixed' || window.getComputedStyle(menu).position === 'fixed';
    var isRedactorMode = menu.classList.contains('t821_redactor-mode');
    if (!isRedactorMode) {
        menu.classList.remove('t821__beforeready');
        if (isFixed && menu.getAttribute('data-bgopacity-two')) {
            t_onFuncLoad('t_menu__changeBgOpacity', function() {
                t_menu__changeBgOpacity(recid, '.t821');
                window.addEventListener('scroll', t_throttle(function() {
                    t_menu__changeBgOpacity(recid, '.t821')
                }, 200))
            })
        }
        if (isFixed && menu.getAttribute('data-appearoffset')) {
            menu.classList.remove('t821__beforeready');
            t_onFuncLoad('t_menu__showFixedMenu', function() {
                t_menu__showFixedMenu(recid, '.t821');
                window.addEventListener('scroll', t_throttle(function() {
                    t_menu__showFixedMenu(recid, '.t821')
                }, 200))
            })
        }
    }
    t_onFuncLoad('t_menu__setBGcolor', function() {
        t_menu__setBGcolor(recid, '.t821');
        window.addEventListener('resize', t_throttle(function() {
            t_menu__setBGcolor(recid, '.t821')
        }, 200))
    })
}
function t228__init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlock = rec.querySelector('.t228');
    var mobileMenu = rec.querySelector('.t228__mobile');
    var menuSubLinkItems = rec.querySelectorAll('.t-menusub__link-item');
    var rightBtn = rec.querySelector('.t228__right_buttons_but .t-btn');
    var mobileMenuPosition = mobileMenu ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position : '';
    var mobileMenuDisplay = mobileMenu ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display : '';
    var isFixedMobileMenu = mobileMenuPosition === 'fixed' && mobileMenuDisplay === 'block';
    var overflowEvent = document.createEvent('Event');
    var noOverflowEvent = document.createEvent('Event');
    overflowEvent.initEvent('t228_overflow', !0, !0);
    noOverflowEvent.initEvent('t228_nooverflow', !0, !0);
    if (menuBlock) {
        menuBlock.addEventListener('t228_overflow', function() {
            t228_checkOverflow(recid)
        });
        menuBlock.addEventListener('t228_nooverflow', function() {
            t228_checkNoOverflow(recid)
        })
    }
    rec.addEventListener('click', function(e) {
        var targetLink = e.target.closest('.t-menusub__target-link');
        if (targetLink && window.isMobile && window.innerWidth <= 980) {
            if (targetLink.classList.contains('t-menusub__target-link_active')) {
                if (menuBlock)
                    menuBlock.dispatchEvent(overflowEvent)
            } else {
                if (menuBlock)
                    menuBlock.dispatchEvent(noOverflowEvent)
            }
        }
        var currentLink = e.target.closest('.t-menu__link-item:not(.tooltipstered):not(.t-menusub__target-link):not(.t794__tm-link):not(.t966__tm-link):not(.t978__tm-link):not(.t978__menu-link)');
        if (currentLink && mobileMenu && isFixedMobileMenu)
            mobileMenu.click()
    });
    Array.prototype.forEach.call(menuSubLinkItems, function(linkItem) {
        linkItem.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    });
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    }
    if (menuBlock) {
        menuBlock.addEventListener('showME601a', function() {
            var menuLinks = rec.querySelectorAll('.t966__menu-link');
            Array.prototype.forEach.call(menuLinks, function(menuLink) {
                menuLink.addEventListener('click', function() {
                    if (mobileMenu && isFixedMobileMenu)
                        mobileMenu.click()
                })
            })
        })
    }
}
function t228_checkOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t228') : null;
    if (!menu)
        return;
    var mobileContainer = document.querySelector('.t228__mobile_container');
    var mobileContainerHeight = t228_getFullHeight(mobileContainer);
    var windowHeight = document.documentElement.clientHeight;
    var menuPosition = menu.style.position || window.getComputedStyle(menu).position;
    if (menuPosition === 'fixed') {
        menu.classList.add('t228__overflow');
        menu.style.setProperty('height', (windowHeight - mobileContainerHeight) + 'px', 'important')
    }
}
function t228_checkNoOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var menu = rec.querySelector('.t228');
    var menuPosition = menu ? menu.style.position || window.getComputedStyle(menu).position : '';
    if (menuPosition === 'fixed') {
        if (menu)
            menu.classList.remove('t228__overflow');
        if (menu)
            menu.style.height = 'auto'
    }
}
function t228_setWidth(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuCenterSideList = rec.querySelectorAll('.t228__centerside');
    Array.prototype.forEach.call(menuCenterSideList, function(menuCenterSide) {
        menuCenterSide.classList.remove('t228__centerside_hidden')
    });
    if (window.innerWidth <= 980)
        return;
    var menuBlocks = rec.querySelectorAll('.t228');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var maxWidth;
        var centerWidth = 0;
        var paddingWidth = 40;
        var leftSide = menu.querySelector('.t228__leftside');
        var rightSide = menu.querySelector('.t228__rightside');
        var menuList = menu.querySelector('.t228__list');
        var mainContainer = menu.querySelector('.t228__maincontainer');
        var leftContainer = menu.querySelector('.t228__leftcontainer');
        var rightContainer = menu.querySelector('.t228__rightcontainer');
        var centerContainer = menu.querySelector('.t228__centercontainer');
        var centerContainerLi = centerContainer ? centerContainer.querySelectorAll('li') : [];
        var leftContainerWidth = t228_getFullWidth(leftContainer);
        var rightContainerWidth = t228_getFullWidth(rightContainer);
        var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0;
        var dataAlign = menu.getAttribute('data-menu-items-align');
        var isDataAlignCenter = dataAlign === 'center' || dataAlign === null;
        maxWidth = leftContainerWidth >= rightContainerWidth ? leftContainerWidth : rightContainerWidth;
        maxWidth = Math.ceil(maxWidth);
        Array.prototype.forEach.call(centerContainerLi, function(li) {
            centerWidth += t228_getFullWidth(li)
        });
        if (mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) > centerWidth + 20) {
            if (isDataAlignCenter) {
                if (leftSide)
                    leftSide.style.minWidth = maxWidth + 'px';
                if (rightSide)
                    rightSide.style.minWidth = maxWidth + 'px'
            }
        } else {
            if (leftSide)
                leftSide.style.minWidth = maxWidth + '';
            if (rightSide)
                rightSide.style.minWidth = maxWidth + ''
        }
        if (menuList && menuList.classList.contains('t228__list_hidden'))
            menuList.classList.remove('t228__list_hidden')
    })
}
function t228_getFullWidth(el) {
    if (!el)
        return 0;
    var marginLeft = el.style.marginLeft || window.getComputedStyle(el).marginLeft;
    var marginRight = el.style.marginRight || window.getComputedStyle(el).marginRight;
    marginLeft = parseInt(marginLeft, 10) || 0;
    marginRight = parseInt(marginRight, 10) || 0;
    return el.offsetWidth + marginLeft + marginRight
}
function t228_getFullHeight(el) {
    if (!el)
        return 0;
    var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop;
    var marginBottom = el.style.marginBottom || window.getComputedStyle(el).marginBottom;
    marginTop = parseInt(marginTop, 10) || 0;
    marginBottom = parseInt(marginBottom, 10) || 0;
    return el.offsetHeight + marginTop + marginBottom
}
function t450_showMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t450');
    var overlay = rec.querySelector('.t450__overlay');
    var menuElements = rec.querySelectorAll('.t450__overlay, .t450__close, a[href*="#"]');
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupShowed');
    document.body.classList.add('t450__body_menushowed');
    if (menu)
        menu.classList.add('t450__menu_show');
    if (overlay)
        overlay.classList.add('t450__menu_show');
    if (menu) {
        menu.addEventListener('clickedAnchorInTooltipMenu', function() {
            t450_closeMenu(menu, overlay)
        })
    }
    Array.prototype.forEach.call(menuElements, function(element) {
        element.addEventListener('click', function() {
            if (element.closest('.tooltipstered, .t-menusub__target-link, .t794__tm-link, .t966__tm-link, .t978__tm-link'))
                return;
            if (element.href && (element.href.substring(0, 7) === '#price:' || element.href.substring(0, 9) === '#submenu:'))
                return;
            t450_closeMenu(menu, overlay)
        })
    });
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            document.body.classList.remove('t390__body_popupshowed');
            var popups = document.querySelectorAll('.t390');
            Array.prototype.forEach.call(popups, function(popup) {
                popup.classList.remove('t390__popup_show')
            })
        }
    });
    rec.addEventListener('click', function(e) {
        if (e.target.closest('.t966__tm-link, .t978__tm-link')) {
            t450_checkSize(recid);
            if (e.target.closest('.t978__tm-link')) {
                setTimeout(function() {
                    var hookLink = e.target.closest('.t978__tm-link');
                    var menuBlock = hookLink.nextElementSibling;
                    var submenuLinks = menuBlock ? menuBlock.querySelectorAll('.t978__menu-link') : [];
                    Array.prototype.forEach.call(submenuLinks, function(link) {
                        link.addEventListener('click', function() {
                            t450_checkSize(recid)
                        })
                    })
                }, 300)
            }
        }
    });
    menu.addEventListener('menuOverflow', function() {
        t450_checkSize(recid)
    });
    t450_highlight(recid)
}
function t450_closeMenu(menu, overlay) {
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupHidden');
    document.body.classList.remove('t450__body_menushowed');
    if (menu)
        menu.classList.remove('t450__menu_show');
    if (overlay)
        overlay.classList.remove('t450__menu_show')
}
function t450_checkSize(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    if (!menu)
        return;
    var container = menu.querySelector('.t450__container');
    var topContainer = menu.querySelector('.t450__top');
    var rightContainer = menu.querySelector('.t450__rightside');
    setTimeout(function() {
        var topContainerHeight = topContainer ? topContainer.offsetHeight : 0;
        var rightContainerHeight = rightContainer ? rightContainer.offsetHeight : 0;
        var containerPaddingTop = container ? window.getComputedStyle(container).paddingTop : '0';
        var containerPaddingBottom = container ? window.getComputedStyle(container).paddingBottom : '0';
        containerPaddingTop = parseInt(containerPaddingTop, 10);
        containerPaddingBottom = parseInt(containerPaddingBottom, 10);
        if (topContainerHeight + rightContainerHeight + containerPaddingTop + containerPaddingBottom > document.documentElement.clientHeight) {
            menu.classList.add('t450__overflowed')
        } else {
            menu.classList.remove('t450__overflowed')
        }
    })
}
function t450_appearMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var burger = rec ? rec.querySelector('.t450__menu__content') : null;
    if (!burger)
        return;
    var burgerAppearOffset = burger ? burger.getAttribute('data-appearoffset') : '';
    var burgerHideOffset = burger ? burger.getAttribute('data-hideoffset') : '';
    if (burgerAppearOffset) {
        burgerAppearOffset = t450_appearMenuParseNumber(burgerAppearOffset);
        if (window.pageYOffset >= burgerAppearOffset) {
            if (burger.classList.contains('t450__beforeready')) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.add('t450__beforeready')
        }
    }
    if (burgerHideOffset) {
        burgerHideOffset = t450_appearMenuParseNumber(burgerHideOffset);
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        if (window.pageYOffset + window.innerHeight >= scrollHeight - burgerHideOffset) {
            if (!burger.classList.contains('t450__beforeready')) {
                burger.classList.add('t450__beforeready')
            }
        } else if (burgerAppearOffset) {
            if (window.pageYOffset >= burgerAppearOffset) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.remove('t450__beforeready')
        }
    }
}
function t450_appearMenuParseNumber(string) {
    if (string.indexOf('vh') > -1) {
        string = Math.floor((window.innerHeight * (parseInt(string) / 100)))
    }
    return parseInt(string, 10)
}
function t450_initMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    var overlay = rec ? rec.querySelector('.t450__overlay') : null;
    var burger = rec ? rec.querySelector('.t450__burger_container') : null;
    var menuLinks = rec ? rec.querySelectorAll('.t-menu__link-item.t450__link-item_submenu') : [];
    var hook = menu ? menu.getAttribute('data-tooltip-hook') : '';
    if (hook) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href="' + hook + '"]')) {
                e.preventDefault();
                t450_closeMenu(menu, overlay);
                t450_showMenu(recid);
                t450_checkSize(recid)
            }
        })
    }
    if (burger) {
        burger.addEventListener('click', function() {
            t450_closeMenu(menu, overlay);
            t450_showMenu(recid);
            t450_checkSize(recid)
        })
    }
    window.addEventListener('resize', function() {
        t450_checkSize(recid)
    });
    if (!window.isMobile)
        return;
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            t450_checkSize(recid)
        })
    })
}
function t450_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    if (url.substr(url.length - 1) === '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1)
    }
    if (pathname === '') {
        pathname = '/'
    }
    var shouldBeActiveElements = document.querySelectorAll('.t450__menu a[href=\'' + url + '\'], ' + '.t450__menu a[href=\'' + url + '/\'], ' + '.t450__menu a[href=\'' + pathname + '\'], ' + '.t450__menu a[href=\'/' + pathname + '\'], ' + '.t450__menu a[href=\'' + pathname + '/\'], ' + '.t450__menu a[href=\'/' + pathname + '/\']' + (hash ? ', .t450__menu a[href=\'' + hash + '\']' : ''));
    var rec = document.getElementById('rec' + recid);
    var menuLinks = rec ? rec.querySelectorAll('.t450__menu a') : [];
    Array.prototype.forEach.call(menuLinks, function(link) {
        if (link.getAttribute('data-highlighted-by-user') !== 'y')
            link.classList.remove('t-active')
    });
    Array.prototype.forEach.call(shouldBeActiveElements, function(link) {
        link.classList.add('t-active')
    })
}
function t280_showMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isAndroid = /(android)/i.test(navigator.userAgent);
    var menu = rec.querySelector('.t280');
    var menuItems = rec.querySelectorAll('.t280__menu__item');
    var menuLinks = rec.querySelectorAll('.t978__menu-link');
    var menuContainer = rec.querySelector('.t280__menu');
    var menuBurger = menu ? menu.querySelector('.t-menuburger') : null;
    var clickElementsList = rec.querySelectorAll('.t280 .t-menuburger, .t280__menu__bg, .t280__menu__link:not(.tooltipstered):not(.t280__menu__link_submenu), .t978__tooltip-menu_mobile');
    Array.prototype.forEach.call(clickElementsList, function(clickElement) {
        clickElement.addEventListener('click', function() {
            if (clickElement.closest('.t280__menu__link.tooltipstered') || clickElement.closest('.t794__tm-link'))
                return;
            if (isChrome && isAndroid && menuItems.length > 10 && window.location.hash) {
                setTimeout(function() {
                    var hash = window.location.hash;
                    window.location.hash = '';
                    window.location.hash = hash
                }, 50)
            }
            if (!clickElement.closest('.t978__tm-link, .t966__tm-link')) {
                document.body.classList.toggle('t280_opened');
                if (menu)
                    menu.classList.toggle('t280__main_opened')
            }
            if (clickElement.classList.contains('t-menuburger')) {
                var expandedStatus = clickElement.classList.contains('t-menuburger-opened');
                clickElement.setAttribute('aria-expanded', expandedStatus)
            }
            t280_changeSize(recid);
            t280_highlight(recid)
        })
    });
    document.addEventListener('click', function(e) {
        if (e.target.closest('.t978__tm-link, .t966__tm-link, .t-menusub__target-link, .t978__menu-link_hook')) {
            t280_changeSize(recid);
            if (menuContainer)
                menuContainer.style.transition = 'none'
        }
    });
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            t280_changeSize(recid)
        })
    });
    if (menu) {
        menu.addEventListener('clickedAnchorInTooltipMenu', function() {
            document.body.classList.remove('t280_opened');
            menu.classList.remove('t280__main_opened')
        })
    }
    var submenuLinks = rec.querySelectorAll('.t-menusub__link-item');
    Array.prototype.forEach.call(submenuLinks, function(link) {
        link.addEventListener('click', function() {
            document.body.classList.remove('t280_opened');
            if (menu)
                menu.classList.remove('t280__main_opened');
            if (menuBurger) {
                menuBurger.classList.remove('t-menuburger-opened');
                menuBurger.setAttribute('aria-expanded', !1)
            }
        })
    })
}
function t280_changeSize(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t280__menu');
    var menuBottom = rec.querySelector('.t280__bottom');
    var menuContainer = rec.querySelector('.t280__container');
    var menuWrapper = rec.querySelector('.t280__menu__wrapper');
    setTimeout(function() {
        var menuHeight = menu ? menu.offsetHeight : 0;
        var menuBottomHeight = menuBottom ? menuBottom.offsetHeight : 0;
        var menuContainerHeight = menuContainer ? menuContainer.offsetHeight : 0;
        var padding = 140;
        if (menuHeight > document.documentElement.clientHeight - (menuBottomHeight + menuContainerHeight + padding)) {
            if (menuWrapper)
                menuWrapper.classList.add('t280__menu_static');
            if (menu)
                menu.style.paddingTop = (menuContainerHeight || 0) + 'px'
        } else {
            if (menuWrapper)
                menuWrapper.classList.remove('t280__menu_static');
            if (menu)
                menu.style.paddingTop = ''
        }
    }, 100)
}
function t280_changeBgOpacityMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlocks = rec.querySelectorAll('.t280__container__bg');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var bgColor = menu.getAttribute('data-bgcolor-rgba');
        var bgColorAfterScroll = menu.getAttribute('data-bgcolor-rgba-afterscroll');
        var bgOpacity = menu.getAttribute('data-bgopacity');
        var bgOpacityTwo = menu.getAttribute('data-bgopacity2');
        var menuShadowOpacity = parseInt(menu.getAttribute('data-menushadow'), 10) || 0;
        menuShadowOpacity /= 100;
        var menuShadowCSS = menu.getAttribute('data-menushadow-css');
        menu.style.backgroundColor = window.pageYOffset > 20 ? bgColorAfterScroll : bgColor;
        if ((window.pageYOffset > 20 && bgOpacityTwo === '0') || (window.pageYOffset <= 20 && (bgOpacity === '0.0' || bgOpacity === '0')) || (!menuShadowOpacity && !menuShadowCSS)) {
            menu.style.boxShadow = 'none'
        } else if (menuShadowCSS) {
            menu.style.boxShadow = menuShadowCSS
        } else if (menuShadowOpacity) {
            menu.style.boxShadow = '0px 1px 3px rgba(0,0,0,' + menuShadowOpacity + ')'
        }
    })
}
function t280_appearMenu() {
    var menuBlocks = document.querySelectorAll('.t280');
    Array.prototype.forEach.call(menuBlocks, function(menuBlock) {
        var menu = menuBlock.querySelector('.t280__positionfixed');
        if (menu) {
            var appearOffset = menuBlock.getAttribute('data-appearoffset');
            if (appearOffset && appearOffset.indexOf('vh') !== -1) {
                appearOffset = Math.floor((window.innerHeight * (parseInt(appearOffset) / 100)))
            }
            appearOffset = parseInt(appearOffset, 10);
            var menuHeight = menu.clientHeight;
            if (isNaN(appearOffset))
                return;
            if (window.pageYOffset >= appearOffset) {
                if (menu.style.transform === 'translateY(-' + menuHeight + 'px)') {
                    t280_slideUpElement(menu, menuHeight, 'toBottom')
                }
            } else if (menu.style.transform === 'translateY(0px)') {
                t280_slideUpElement(menu, menuHeight, 'toTop')
            } else {
                menu.style.transform = 'translateY(-' + menuHeight + 'px)';
                menu.style.opacity = '0'
            }
        }
    })
}
function t280_slideUpElement(menu, menuHeight, direction) {
    var diff = direction === 'toTop' ? 0 : menuHeight;
    var diffOpacity = direction === 'toTop' ? 1 : 0;
    var timerID = setInterval(function() {
        menu.style.transform = 'translateY(-' + diff + 'px)';
        menu.style.opacity = diffOpacity.toString();
        diffOpacity = direction === 'toTop' ? diffOpacity - 0.1 : diffOpacity + 0.1;
        diff = direction === 'toTop' ? diff + (menuHeight / 20) : diff - (menuHeight / 20);
        if (direction === 'toTop' && diff >= menuHeight) {
            menu.style.transform = 'translateY(-' + menuHeight + 'px)';
            menu.style.opacity = '0';
            clearInterval(timerID)
        }
        if (direction === 'toBottom' && diff <= 0) {
            menu.style.transform = 'translateY(0px)';
            menu.style.opacity = '1';
            clearInterval(timerID)
        }
    }, 10)
}
function t280_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    if (url.substr(url.length - 1) === '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1)
    }
    if (pathname === '') {
        pathname = '/'
    }
    var shouldBeActiveElements = document.querySelectorAll('.t280__menu a[href=\'' + url + '\'], ' + '.t280__menu a[href=\'' + url + '/\'], ' + '.t280__menu a[href=\'' + pathname + '\'], ' + '.t280__menu a[href=\'/' + pathname + '\'], ' + '.t280__menu a[href=\'' + pathname + '/\'], ' + '.t280__menu a[href=\'/' + pathname + '/\']' + (hash ? ', .t280__menu a[href=\'' + hash + '\']' : '') + (hash ? ', .t280__menu a[href=\'/' + hash + '\']' : '') + (hash ? ', .t280__menu a[href=\'' + hash + '/\']' : '') + (hash ? ', .t280__menu a[href=\'/' + hash + '/\']' : ''));
    var rec = document.getElementById('rec' + recid);
    var menuLinks = rec ? rec.querySelectorAll('.t280__menu a') : [];
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.classList.remove('t-active')
    });
    Array.prototype.forEach.call(shouldBeActiveElements, function(link) {
        link.classList.add('t-active')
    })
}
function t898_init(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t898');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.style.opacity = 1;
    var whatsApp = rec.querySelector('.t898__icon-whatsapp_wrapper');
    if (whatsApp) {
        var whatsAppHref = whatsApp.getAttribute('href');
        if (whatsAppHref && (whatsAppHref.indexOf('whatsapp://') > -1 || whatsAppHref.indexOf('wa.me') > -1)) {
            t898_removeExtraSymbolsFromWhatsApp(whatsApp, whatsAppHref)
        }
    }
    if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t898_removeExtraSymbolsFromWhatsApp(whatsApp, whatsAppHref) {
    if (whatsAppHref && whatsAppHref.indexOf('?text=') !== -1) {
        var whatsAppHrefArr = whatsAppHref.split('?text=');
        whatsAppHrefArr[0] = whatsAppHrefArr[0].replace(/[\(\)+-]/g, '');
        whatsAppHref = whatsAppHrefArr[0] + '?text=' + whatsAppHrefArr[1]
    } else {
        whatsAppHref = whatsAppHref.replace(/[\(\)+-]/, '')
    }
    whatsApp.setAttribute('href', whatsAppHref)
}
function t702_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.setAttribute('data-popup-subscribe-inited', 'y');
    rec.style.opacity = 1;
    var documentBody = document.body;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var submitHref = rec.querySelector('.t-submit[href*="#"]');
    if (popupTooltipHook) {
        t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
            t_popup__addAttributesForAccessibility(popupTooltipHook)
        });
        document.addEventListener('click', function(event) {
            var target = event.target;
            var href = target.closest('a[href$="' + popupTooltipHook + '"]') ? target : !1;
            if (!href)
                return;
            event.preventDefault();
            t702_showPopup(recId);
            t_onFuncLoad('t_popup__resizePopup', function() {
                t_popup__resizePopup(recId)
            });
            t702__lazyLoad();
            if (analitics && window.Tilda) {
                Tilda.sendEventToStatistics(analitics, popupTooltipHook)
            }
        });
        t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
            t_popup__addClassOnTriggerButton(document, popupTooltipHook)
        })
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t702__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        var windowWithoutScrollBar = window.innerWidth - 17;
        if (event.clientX > windowWithoutScrollBar)
            return;
        if (event.target === this)
            t702_closePopup(recId)
    });
    popupCloseBtn.addEventListener('click', function() {
        t702_closePopup(recId)
    });
    if (submitHref) {
        submitHref.addEventListener('click', function() {
            if (documentBody.classList.contains('t-body_scroll-locked')) {
                documentBody.classList.remove('t-body_scroll-locked')
            }
        })
    }
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t702_closePopup(recId);
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        if (typeof t_triggerEvent === 'function')
                            t_triggerEvent(document.body, 'popupShowed');
                        documentBody.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
    function t702_escClosePopup(event) {
        if (event.key === 'Escape')
            t702_closePopup(recId)
    }
    popup.addEventListener('tildamodal:show' + popupTooltipHook, function() {
        document.addEventListener('keydown', t702_escClosePopup)
    });
    popup.addEventListener('tildamodal:close' + popupTooltipHook, function() {
        document.removeEventListener('keydown', t702_escClosePopup)
    })
}
function t702_lockScroll() {
    var documentBody = document.body;
    if (!documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || documentBody.parentNode || documentBody).scrollTop;
        documentBody.classList.add('t-body_scroll-locked');
        documentBody.style.top = '-' + bodyScrollTop + 'px';
        documentBody.setAttribute('data-popup-scrolltop', bodyScrollTop)
    }
}
function t702_unlockScroll() {
    var documentBody = document.body;
    if (documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = documentBody.getAttribute('data-popup-scrolltop');
        documentBody.classList.remove('t-body_scroll-locked');
        documentBody.style.top = null;
        documentBody.removeAttribute('data-popup-scrolltop');
        document.documentElement.scrollTop = parseInt(bodyScrollTop)
    }
}
function t702_showPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    var windowWidth = window.innerWidth;
    var screenMin = rec.getAttribute('data-screen-min');
    var screenMax = rec.getAttribute('data-screen-max');
    if (screenMin && windowWidth < parseInt(screenMin, 10))
        return;
    if (screenMax && windowWidth > parseInt(screenMax, 10))
        return;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var ranges = rec.querySelectorAll('.t-range');
    var documentBody = document.body;
    if (ranges.length) {
        Array.prototype.forEach.call(ranges, function(range) {
            t702__triggerEvent(range, 'popupOpened')
        })
    }
    t_onFuncLoad('t_popup__showPopup', function() {
        t_popup__showPopup(popup)
    });
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupShowed');
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        setTimeout(function() {
            t702_lockScroll()
        }, 500)
    }
    t702__lazyLoad();
    t702__triggerEvent(popup, 'tildamodal:show' + popupTooltipHook);
    t_onFuncLoad('t_forms__calculateInputsWidth', function() {
        t_forms__calculateInputsWidth(recId)
    })
}
function t702_closePopup(recId) {
    var rec = document.getElementById('rec' + recId);
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var popupAll = document.querySelectorAll('.t-popup_show:not(.t-feed__post-popup):not(.t945__popup)');
    if (popupAll.length == 1) {
        if (typeof t_triggerEvent === 'function')
            t_triggerEvent(document.body, 'popupHidden');
        document.body.classList.remove('t-body_popupshowed')
    } else {
        var newPopup = [];
        for (var i = 0; i < popupAll.length; i++) {
            if (popupAll[i].getAttribute('data-tooltip-hook') === popupTooltipHook) {
                popupAll[i].classList.remove('t-popup_show');
                newPopup.push(popupAll[i])
            }
        }
        if (newPopup.length === popupAll.length) {
            if (typeof t_triggerEvent === 'function')
                t_triggerEvent(document.body, 'popupHidden');
            document.body.classList.remove('t-body_popupshowed')
        }
    }
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupHidden');
    popup.classList.remove('t-popup_show');
    document.body.classList.remove('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        t702_unlockScroll()
    }
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    t702__triggerEvent(popup, 'tildamodal:close' + popupTooltipHook)
}
function t702_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    hitType: 'pageview',
                    page: virtPage,
                    title: virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t702_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function() {
        t_forms__onSuccess(form)
    })
}
function t702__lazyLoad() {
    if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t702__triggerEvent(el, eventName) {
    var event;
    if (typeof window.CustomEvent === 'function') {
        event = new CustomEvent(eventName)
    } else if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, !0, !1)
    } else if (document.createEventObject) {
        event = document.createEventObject();
        event.eventType = eventName
    }
    event.eventName = eventName;
    if (el.dispatchEvent) {
        el.dispatchEvent(event)
    } else if (el.fireEvent) {
        el.fireEvent('on' + event.eventType, event)
    } else if (el[eventName]) {
        el[eventName]()
    } else if (el['on' + eventName]) {
        el['on' + eventName]()
    }
}
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60)
    }
}
)();
function t270_scroll(hash, offset) {
    if (!hash)
        return;
    t270_checkLoad(hash, offset);
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var wrapperBlock = document.querySelector('.t270');
    var dontChangeHistory = wrapperBlock ? Boolean(wrapperBlock.getAttribute('data-history-disabled')) : !1;
    t270_scrollToEl(hash, offset);
    if (!dontChangeHistory && isHistoryChangeAllowed) {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
        isHistoryChangeAllowed = !1
    }
    return !0
}
function t270_checkLoad(hash, offset) {
    if (window.t270_loadChecked)
        return;
    var sliderWrappers = document.body.querySelectorAll('.t-slds__items-wrapper');
    if (!sliderWrappers.length)
        return;
    var lastWrapper = sliderWrappers[sliderWrappers.length - 1];
    var sliderImgs = lastWrapper ? lastWrapper.querySelectorAll('.t-slds__bgimg') : [];
    var lastImg = sliderImgs[sliderImgs.length - 1];
    var imageUrl = lastImg ? window.getComputedStyle(lastImg).backgroundImage : '';
    imageUrl = imageUrl.substring(5, imageUrl.length - 2);
    var preloaderImg = document.createElement('img');
    preloaderImg.src = imageUrl ? imageUrl : '';
    preloaderImg.addEventListener('load', function() {
        t270_scroll(hash, offset);
        window.t270_loadChecked = !0
    })
}
function t270_scrollToEl(hash, offset) {
    if (document.body.getAttribute('data-scroll'))
        return;
    var scrollTargetY = t270_getTarget(hash, offset);
    if (isNaN(scrollTargetY))
        return;
    var body = document.body;
    var canSmoothScroll = window.CSS && window.CSS.supports('scroll-behavior', 'smooth');
    if (window.isMobile && canSmoothScroll && 'scrollBehavior'in document.documentElement.style) {
        body.setAttribute('data-scroll', 'true');
        window.scrollTo({
            left: 0,
            top: scrollTargetY,
            behavior: 'smooth'
        });
        setTimeout(function() {
            body.removeAttribute('data-scroll')
        }, 500)
    } else {
        var html = document.querySelector('html');
        var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        var speed = 2000;
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
        var currentTime = 0;
        function t270_easeInQuad(pos) {
            return Math.pow(pos, 2)
        }
        function t270_animationScroll() {
            currentTime += 1 / 60;
            var newDocumentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
            if (documentHeight < newDocumentHeight) {
                documentHeight = newDocumentHeight;
                scrollTargetY = t270_getTarget(hash, offset);
                scrollY = window.scrollY || document.documentElement.scrollTop;
                time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))
            }
            var difference = currentTime / time;
            var animation = t270_easeInQuad(difference);
            if (difference < 1) {
                requestAnimationFrame(t270_animationScroll);
                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * animation))
            } else {
                body.removeAttribute('data-scroll');
                body.removeAttribute('data-scrollable');
                window.scrollTo(0, scrollTargetY)
            }
        }
        body.setAttribute('data-scroll', 'true');
        body.setAttribute('data-scrollable', 'true');
        t270_animationScroll()
    }
}
function t270_getTarget(hash, offset) {
    var target;
    try {
        if (hash.substring(0, 1) === '#') {
            target = document.getElementById(hash.substring(1))
        } else {
            target = document.querySelector(hash)
        }
    } catch (event) {
        console.log('Exception t270: ' + event.message);
        return
    }
    if (!target) {
        target = document.querySelector('a[name="' + hash.substr(1) + '"]');
        if (!target)
            return
    }
    target = parseInt((target.getBoundingClientRect().top + window.pageYOffset) - offset, 10);
    target = Math.max(target, 0);
    return target
}
