let selectedToppings = []

const totalCostBox = document.getElementById('total-cost')
const toppingsCostBox = document.getElementById('toppings-cost')
const cheeseCostBox = document.getElementById('cheese-cost')
const gstCostBox = document.getElementById('gst-cost')
const grandCostBox = document.getElementById('grand-cost')
const quantity = document.getElementById('quantity')
const toppingDivs = document.querySelectorAll('.topping')
const crustDivs = document.querySelectorAll('.crust')

const toppingPrices = {
    mushroom: 13,
    onion: 30,
    paneer: 45,
    paparika:23,
    jalapeno:23,
    greenOlives: 67,
    goldenCorn: 34,
    capsicum: 45,
    periPeriChicken:34,
    barbeque:56,
    sausage:23,
    chickenTikka:76,
    grilledChickenRasher:23
}

const crustPrices = {
    classicHandTossed: 34,
    cheeseBurst:23,
    wheatThinCrust:43,
    freshPan:34,
    newHandTossed:43
}

let totalCost, toppingsCost, cheeseCost, gstCost, grandCost;

const RN = num => { return Math.round(num * 100) / 100 }
const toggleClass = (item, c) => {
    item.classList.contains(c) ? item.classList.remove(c) : item.classList.add(c)
}
const camelize = str => {
    return str.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
    }).replace(/\s+/g, '')
  }

// TOPPING SELECTION (AS MANY AS YOU WANT)
toppingDivs.forEach(div =>
    div.addEventListener('click', e => {
        let target = e.target

        if (!(target.classList.contains('topping'))) {
            target = target.parentNode
        }

        toggleClass(target, 'on-the-pizza')
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
)

// CRUST SELECTION (ONE AT ONCE)
let selectedCrust = 'CLASSIC HAND TOSSED' // default
crustDivs.forEach(div => {
    div.addEventListener('click', e => {
        document.querySelector('.selected-crust').classList.remove('selected-crust')
        e.target.classList.add('selected-crust')
        selectedCrust = e.target.innerText
        updateBill()
    })
})

// SWITCH B/W VEG & NON-VEG
const openGenre = (e, genre) => {
    document.querySelector('.toppings-genre.active').classList.remove('active')
    e.target.classList.add('active')

    document.querySelector('.toppings-body-child.active-genre').classList.remove('active-genre');

    (genre === 'veg') ? document.querySelector('.toppings-body-veg').classList.add('active-genre') : document.querySelector('.toppings-body-non').classList.add('active-genre')
}

// UPDATING BILL
const updateBill = () => {
    let n = Number(quantity.options[quantity.selectedIndex].value)
    
    // CRUST BILL
    totalCost = crustPrices[camelize(selectedCrust)] * n
    totalCostBox.innerText = '₹' + totalCost
    // TOPPINGS BILL
    let toppingsCost = 0
    selectedToppings.forEach(item => {
        toppingsCost += toppingPrices[camelize(item)]
    })
    toppingsCost *= n
    toppingsCostBox.innerText = '₹' + toppingsCost
    // CHEESE
    cheeseCost = document.getElementById('extra-cheese').checked ? 15 * n : 0
    cheeseCostBox.innerText = '₹' + cheeseCost
    // GST
    gstCost = RN(0.05 * (cheeseCost + toppingsCost + totalCost))
    gstCostBox.innerText = '₹' + gstCost
    // GRAND COST
    grandCost = gstCost + cheeseCost + toppingsCost + totalCost
    grandCostBox.innerText = '₹' + grandCost
}
const updateImage = (toppings) => {
    document.querySelectorAll('.yes').forEach(img => img.classList.remove('yes'))
    toppings.forEach(topping => {
        toppingID = (topping.toLowerCase()).split(' ').join('-')
        document.querySelector('#' + toppingID).classList.add('yes')
    })
}

buyNow = document.getElementById('buy-now')
closeBtn = document.getElementById('close')
popup = document.getElementById('popup')
buyNow.addEventListener('click', _ => {
    popup.classList.add('open')
})
closeBtn.addEventListener('click', _ => {
    popup.classList.remove('open')
})