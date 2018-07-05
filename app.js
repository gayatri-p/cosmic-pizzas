let selectedToppings = []

$('.topping').click(e => {
    let target = e.target
    
    if( !(target.classList.contains('topping')) ) {
        target = target.parentNode
    }

    $(target).toggleClass('on-the-pizza')
})

$('.toppings-genre').click(e => {
    $('.toppings-genre.active').removeClass('active')
    $(e.target).addClass('active')
})

$('.crust').click(e => {
    console.log(e)
    $('.selected-crust').removeClass('selected-crust')
    $(e.target).addClass('selected-crust')
})