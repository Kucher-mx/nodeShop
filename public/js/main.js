document.addEventListener("DOMContentLoaded", e => {
    // PHONE NUMBERS
    const phoneNum = document.querySelector('.footer_phone a')
    const secondPhoneNum = document.querySelector('.header_menu_phone a')

    const modPhoneNum = (numNode) => {
        let phone = numNode.innerHTML
        phone = phone.replace(/[^\d]/g, "");

        if (phone.length >= 10) {
            return `+${phone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")}`;
        }

        return null
    }
    secondPhoneNum.innerHTML = modPhoneNum(secondPhoneNum)
    phoneNum.innerHTML = modPhoneNum(phoneNum);

    // BURGER MENU
    const burger = document.querySelector('.header_burger'),
    burger_menu = document.querySelector('.header_menu')
    burger_close = document.querySelector('.header_menu_close')

    document.addEventListener('click', e => {
        if(e.target === burger_menu || e.target === burger_close){
            burger_menu.classList.remove('header_menu_active')
            document.body.style.overflow = ''
        } else if (e.target === burger){
            burger_menu.classList.add('header_menu_active')
            document.body.style.overflow = 'hidden'
            burger_menu.style.top = window.scrollY + 'px'
        }
    })

    // SHOW INPUT
    const searchIcon = document.querySelector('#search')
    const searchInput = document.querySelector('.search-container')
    searchIcon.addEventListener('click', e => {
        searchInput.classList.toggle('search-container_active')
    })

    //SLIDER
    try{
        if(document.querySelector('.splide')){
            const popularSLider = new Splide( '.splide', {
                autoplay: true,
                interval: 3000,
                type: 'loop',
                perPage: 3,
                perMove: 1,
                fixedWidth: '360px'
            } )
    
            popularSLider.mount();
        }
        
    } catch(e){
        console.log("no slider");
    }

    try{
        const sameSlider = new Splide( '.splide_same', {
            autoplay: true,
            interval: 3000,
            type: 'loop',
            perPage: 3,
            perMove: 1,
            fixedWidth: '360px'
        } )

        sameSlider.mount();
    } catch(e){
        console.log("no slider");
    }

    try{
        const secondarySlider = new Splide( '.item_slider_secondary', {
            fixedWidth  : 85,
            gap         : 10,
            cover       : true,
            arrows     : false,
            isNavigation: true,
        } ).mount()

        const primarySlider = new Splide( '.item_slider_primary', {
            type       : 'loop',
            autoplay: true,
            interval: 3500,
            fixedWidth  : 420,
            pagination : false,
            arrows     : true,
            cover      : true,
        })

        primarySlider.sync( secondarySlider ).mount();
    } catch(e){
        console.log("no slider");
    }
    
    // FORMAT PRICES
    try {
        const cardPrices = document.querySelectorAll('.item_price')
        const itemPrices = document.querySelectorAll('.item_info_price div')
        const formatPrice = (price) => {
            return new Intl.NumberFormat('uk-UA',
            { style: 'currency', currency: 'UAH' }
            ).format(price);
        }
        cardPrices.forEach(price => {
            price.innerHTML = formatPrice(price.innerHTML)
        })
        itemPrices.forEach(price => {
            price.innerHTML = formatPrice(price.innerHTML)
        })
    }catch(e){
        console.log("cant format price");
    }

    // QUANTITY
    try{
        const plus = document.querySelector('.quantity_plus'),
        dec = document.querySelector('.quantity_dec'),
        quantityInput = document.querySelector('#quantity')

        plus.addEventListener('click', e => {
            e.preventDefault()
            quantityInput.value = +quantityInput.value + 1
        })

        dec.addEventListener('click', e => {
            e.preventDefault()
            if(+quantityInput.value !== 1){
                quantityInput.value = +quantityInput.value - 1
            }
        })
    }catch(e){
        console.log(e);
    }

    // FORMS
    try{
        const logLabel = document.querySelector('.labels .login'),
        regLabel = document.querySelector('.labels .register'),
        logForm = document.querySelector('.forms .log'),
        regForm = document.querySelector('.forms .reg')

        logLabel.addEventListener('click', e => {
            logForm.classList.remove('hide')
            logForm.classList.add('show')
            regForm.classList.add('hide')
        })

        regLabel.addEventListener('click', e => {
            regForm.classList.remove('hide')
            regForm.classList.add('show')
            logForm.classList.add('hide')
        })
    } catch(e){
        console.log(e);
    }

    //cart
    const cartTrigger = document.querySelector('.header_icons_list_item .fi-rr-shopping-cart'),
    cart = document.querySelector('.cart_info')

    cartTrigger.addEventListener('click', (e) => {
        cart.classList.toggle('hide')
    })

})