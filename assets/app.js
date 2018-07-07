let selectedToppings = []

const totalCostBox = document.getElementById('total-cost')
const toppingsCostBox  = document.getElementById('toppings-cost')
const cheeseCostBox = document.getElementById('cheese-cost')
const gstCostBox = document.getElementById('gst-cost')
const grandCostBox = document.getElementById('grand-cost')
const quantity = document.getElementById('quantity')

let totalCost, toppingsCost, cheeseCost, gstCost, grandCost;

const RN = num => {return Math.round(num * 100) / 100}

// TOPPING SELECTION (AS MANY AS YOU WANT)
$('.topping').click(e => {
    let target = e.target
    
    if( !(target.classList.contains('topping')) ) {
        target = target.parentNode
    }

    $(target).toggleClass('on-the-pizza')
    let toppingName = target.querySelector('span').innerText;

    if (target.classList.contains('on-the-pizza')) {
        selectedToppings.push(toppingName)
    }
    else {
        selectedToppings.splice(selectedToppings.indexOf(toppingName), 1)
    }
    updateBill()
    updateImage(selectedToppings)
})

// CRUST SELECTION (ONE AT ONCE)
$('.crust').click(e => {
    $('.selected-crust').removeClass('selected-crust')
    $(e.target).addClass('selected-crust')
})

// SWITCH B/W VEG &B NON-VEG
const openGenre = (e, genre) => {
    $('.toppings-genre.active').removeClass('active')
    $(e.target).addClass('active')

    $('.toppings-body-child.active-genre').removeClass('active-genre');

    (genre === 'veg') ? $('.toppings-body-veg').addClass('active-genre') : $('.toppings-body-non').addClass('active-genre')
}

// UPDATING BILL
const updateBill = () => {
    let n = Number(quantity.options[quantity.selectedIndex].value)

    // ASSUMING ALL TOPPINGS TO COST THE SAME
    let toppingsCount = selectedToppings.length

    totalCost = 70*n
    totalCostBox.innerText = '₹'+totalCost

    toppingsCost = toppingsCount * 15 * n
    toppingsCostBox.innerText = '₹'+toppingsCost

    cheeseCost = document.getElementById('extra-cheese').checked ? 15*n : 0
    cheeseCostBox.innerText =  '₹'+cheeseCost

    gstCost = RN(0.05 * (cheeseCost+toppingsCost+totalCost))
    gstCostBox.innerText = '₹'+gstCost

    grandCost = gstCost + cheeseCost + toppingsCost + totalCost
    grandCostBox.innerText = '₹'+grandCost
}

const updateImage = (toppings) => {
    $('.yes').removeClass('yes');
    toppings.forEach(topping => {
        toppingID = (topping.toLowerCase()).split(' ').join('-');
        $('#'+toppingID).addClass('yes')
    })
}