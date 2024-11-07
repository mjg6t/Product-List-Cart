const cartSize = document.getElementById("cart-size")
let cartSizeValue = cartSize.innerHTML.trim()
cartSizeValue = cartSizeValue.replace(/[\(\)]/g, '')
const cart = document.getElementById("inside-cart")
const dessertList = document.getElementById("list-items")

let shoppingCart = []
let totalItems = sumShoppingCart(shoppingCart)
let cartEmpty = true
let hasEmptyCartRunBefore = false

emptyCart()

function emptyCart(){

    if (cartEmpty==true && hasEmptyCartRunBefore == false){

        let newDiv = document.createElement('div');
        newDiv.id = 'newDiv'

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
        hasEmptyCartRunBefore = true

    }
    
}

function addCart(){

    const emptyCart = document.querySelector('#newDiv');
    if (emptyCart){
        cart.removeChild(emptyCart)
    }
    
    /* code to add initial view of cart */
    
}



function listCart(cartItem){
    if (cartItem.listed == true){
        updateItem(cartItem)
    }else{
        listItem(cartItem)
    }
}

function listItem(cartItem){
    const outerDiv = document.createElement('div')
    outerDiv.id = `${cartItem.title}`
    const title = document.createElement('p')
    const detail = document.createElement('p')
    const detailQuantity = document.createElement('span')
    const detailUnitPrice = document.createElement('span')
    const detailPrice = document.createElement('span')

    detail.appendChild(detailQuantity)
    detail.appendChild(detailUnitPrice)
    detail.appendChild(detailPrice)

    outerDiv.appendChild(title)
    outerDiv.appendChild(detail)

    outerDiv.classList.add('cart-entry')



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

    const addDiv = document.createElement('div')

    const addicon = document.createElement('img')
    addicon.src = 'assets/images/icon-increment-quantity.svg'
    addicon.width = 10
    addicon.height = 10

    addDiv.appendChild(addicon)
    addDiv.classList.add('rounded')

    const subDiv = document.createElement('div')

    const subicon = document.createElement('img')
    subicon.src = 'assets/images/icon-decrement-quantity.svg'
    subicon.width = 10
    subicon.height = 10

    subDiv.appendChild(subicon)
    subDiv.classList.add('rounded')


    button.addEventListener("click",()=>{
        img.classList.add('on-selected-or-hover')
        button.classList.add('button-hover')
        button.textContent = ''
        button.appendChild(subDiv)
        button.appendChild(document.createTextNode(`${returnQuantity(dessert.name)}`))
        button.appendChild(addDiv)

    })

    addDiv.addEventListener("click",()=>{
        addQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`
        updatePrice(dessert.name)
        cartEmpty = false
        hasEmptyCartRunBefore = false
        addCart()
    })

    subDiv.addEventListener("click",()=>{
        subQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`
        updatePrice(dessert.name)
        if (totalItems == 0){
            cartEmpty = true
            emptyCart()
        }else{
            addCart(dessert.name)
        }
    })

    img.addEventListener("click",()=>{
        img.classList.toggle('on-selected-or-hover')
        button.classList.toggle('button-hover')
        button.textContent=''
        
        if(img.classList.contains('on-selected-or-hover') && button.classList.contains('button-hover')){

            button.appendChild(subDiv)
            button.appendChild(document.createTextNode(`${returnQuantity(dessert.name)}`))
            button.appendChild(addDiv)

        } else{

            button.appendChild(icon)
            button.appendChild(document.createTextNode('add to cart'))

        }
        
        resetQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`

        if(totalItems == 0){
            cartEmpty = true
            emptyCart()
        }

        // if (totalItems == 0 && cartEmpty == false){
        //     emptyCart()
        // }
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
        quantity: 0,
        unitPrice: dessert.price,
        price: null,
        listed:false
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

function resetQuantity(name){
    let item = shoppingCart.find((item)=>{
        return item.item == name
    })
    
    item.quantity = 0
    return item.quantity
}

function sumShoppingCart(shoppingCart){
    let total = 0;
    shoppingCart.forEach((item) => {
        total += item.quantity;
    });
    return total;
}

function updatePrice(name){
    let item = shoppingCart.find((item)=>{
        return item.item == name
    })
    
    item.price = item.unitPrice * item.quantity
    return item.price
}

console.log(shoppingCart)
