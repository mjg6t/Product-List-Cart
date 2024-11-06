const cartSize = document.getElementById("cart-size")
let cartSizeValue = cartSize.innerHTML.trim()
cartSizeValue = cartSizeValue.replace(/[\(\)]/g, '')
const cart = document.getElementById("inside-cart")
const dessertList = document.getElementById("list-items")
console.log(dessertList)

 let shoppingCart = []
 let totalItems = sumShoppingCart(shoppingCart)

if (totalItems == 0) {
    let newDiv = document.createElement('div');

    let newImg = document.createElement('img');
    newImg.src = 'assets/images/illustration-empty-cart.svg';
    // newImg.width = 250;
    // newImg.height = 150;
    newDiv.appendChild(newImg);

     let newText = document.createElement('div');
     newText.innerText = 'your added items will appear here'
     newDiv.appendChild(newText);

    newDiv.classList.add('empty-cart')
    cart.appendChild(newDiv)
    console.log('it works');
}

function listDesserts(dessert){
    const item = document.createElement('div')

    const img = document.createElement('img')
    if (window.innerWidth > 1200){
        img.src = dessert.image.desktop
    } else if (window.innerWidth > 600){
        img.src = dessert.image.tablet
    } else if (window.innerWidth > 200){
        img.src = dessert.image.mobile
    }

    img.width = 250;
    img.height = 150;
    img.alt = `${dessert.name} image`
    img.id = 'image'

    const icon = document.createElement('img')
    icon.src = 'assets/images/icon-add-to-cart.svg'
    icon.width = 25
    icon.height = 25

    const category = document.createElement('p')
    category.id = 'category'
    category.innerText = dessert.category

    const name = document.createElement('p')
    name.id = 'name'
    name.innerText = dessert.name

    const price = document.createElement('p')
    price.id = 'price'
    price.innerText = `$ ${parseFloat(dessert.price).toFixed(2)}`

    const button = document.createElement('button')
    button.id = 'button'
    button.appendChild(icon)
    button.appendChild(document.createTextNode('add to cart'))

    

    item.appendChild(img)
    item.appendChild(button)
    item.appendChild(category)
    item.appendChild(name)
    item.appendChild(price)

    item.classList.add('item')

    const addicon = document.createElement('img')
    addicon.src = 'assets/images/icon-increment-quantity.svg'
    addicon.width = 10
    addicon.height = 10

    const subicon = document.createElement('img')
    subicon.src = 'assets/images/icon-decrement-quantity.svg'
    subicon.width = 10
    subicon.height = 10


    button.addEventListener("click",()=>{
        img.classList.add('on-selected-or-hover')
        button.classList.add('button-hover')
        button.textContent = ''
        button.appendChild(subicon)
        button.appendChild(document.createTextNode(`${returnQuantity(dessert.name)}`))
        button.appendChild(addicon)

    })

    addicon.addEventListener("click",()=>{
        addQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`
    })

    subicon.addEventListener("click",()=>{
        subQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`
    })

    dessertList.appendChild(item)
    

}

getDesserts()

async function getDesserts(){
    let desserts = []
    const res = await fetch('data.json')
    desserts= await res.json()
    desserts.forEach((dessert)=>populateCart(dessert))
    desserts.forEach((dessert)=>listDesserts(dessert))

}

function populateCart(dessert){
    const des ={
        item: dessert.name,
        quantity: 0
    }
    shoppingCart.push(des)
}

function returnQuantity(name){
    let item = shoppingCart.find((item)=>{
        return item.item == name
    })
    return item.quantity
}

function addQuantity(name){
    let item = shoppingCart.find((item)=>{
        return item.item == name
    })
    
    item.quantity = item.quantity+1
    return item.quantity
}

function subQuantity(name){
    let item = shoppingCart.find((item)=>{
        return item.item == name
    })

    if (item.quantity == 0){
        return item.quantity
    }
    
    item.quantity = item.quantity-1
    return item.quantity
}

function sumShoppingCart(shoppingCart){
    let total = 0;
    shoppingCart.forEach((item) => {
        total += item.quantity;
    });
    return total;
}


