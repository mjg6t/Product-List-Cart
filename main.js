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

        const cartChildren = cart.children
        Array.from(cartChildren).forEach((child)=>{
            if (child.id == 'not-empty-cart'){
                cart.removeChild(child)
            }
        })

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
    const newDiv = document.createElement('div')
    newDiv.id = 'not-empty-cart'

    let finalPrice = 0 
    shoppingCart.map((item)=>{
        finalPrice+=item.price
        console.log('finalPrice',finalPrice)
    })

    const totalDiv = document.createElement('div')
    totalDiv.id = 'totalDiv'
    const totalTitle = document.createElement('p')
    totalTitle.id = 'totalTitle'
    const totalPrice = document.createElement('p')
    totalPrice.id = 'totalPrice'
    totalTitle.innerText = 'Order Total'
    totalPrice.innerText = `$${parseFloat(finalPrice).toFixed(2)}`

    newDiv.appendChild(totalDiv)
    totalDiv.appendChild(totalTitle)
    totalDiv.appendChild(totalPrice)


    const cartMessage = document.createElement('div')
    cartMessage.id = 'cartMessage'

    const cMImage = document.createElement('img')
    cMImage.src = 'assets/images/icon-carbon-neutral.svg'
    cMImage.width = 25
    cMImage.height = 25

    cartMessage.appendChild(cMImage)

    const boldSpan = document.createElement('span')
    boldSpan.id = 'bold-text'
    boldSpan.innerText = 'carbon-neutral'

    const frag = document.createElement('span')
    frag.appendChild(document.createTextNode('This is a '))
    frag.appendChild(boldSpan)
    frag.appendChild(document.createTextNode(' delivery'))

    cartMessage.appendChild(frag)

    newDiv.appendChild(cartMessage)


    const notEmptyCart = document.getElementById('not-empty-cart')
    if (!notEmptyCart){
        cart.appendChild(newDiv)
    }else{
        const updateTotalPrice = document.getElementById('totalPrice')
        updateTotalPrice.innerText = `$${parseFloat(finalPrice).toFixed(2)}`
    }

    

    


}

function addCartItem(name){

    const emptyCart = document.querySelector('#newDiv');
    if (emptyCart){
        cart.removeChild(emptyCart)
        
    }

    addCart()

    const selected = shoppingCart.find((item)=>{
        if (item.item == name){
            //console.log('returned item from sC',item)
            return item;
        }
    })

    const notEmptyCart = document.getElementById('not-empty-cart')

    if (selected.listed == false){
        const outerDiv = document.createElement('div')
        outerDiv.id = `${selected.item} outer`
        outerDiv.classList.add('cart-outer-div')
        const innerDiv = document.createElement('div')
        innerDiv.id = `${selected.item}`
        //console.log('id', innerDiv.id)
        outerDiv.appendChild(innerDiv)
        innerDiv.innerText = `${selected.item}\n${selected.quantity}x @$${selected.unitPrice}  $${selected.price}`
        selected.listed = true
        notEmptyCart.insertBefore(outerDiv,document.getElementById('totalDiv'))
    } else{
        const iDiv = document.getElementById(`${selected.item}`)
        if(selected.quantity != 0 && iDiv != null){
            //console.log('retrieved id',iDiv.id)
            if(iDiv){
                iDiv.innerText = `${selected.item}\n${selected.quantity}x @$${selected.unitPrice}  $${selected.price}`
            }
        }else{
            const parent = iDiv.parentElement;
            //console.log('parent el', parent)
            if(parent){
                parent.removeChild(iDiv);
            }

        }
        
    }
    

}

function removeCartItem(name){
    const selected = shoppingCart.find((item)=>{
        if (item.item == name){
            return item
        }
    })

    if (selected.quantity > 0){
        addCartItem(selected.item)
        addCart()
    }

    if (selected.quantity == 0){
        selected.listed = false
        selected.price = 0
        try{
            const child = document.getElementById(`${selected.item}`)
            const parent = child.parentNode
            parent.removeChild(child)
            const outerDiv = document.getElementById(`${selected.item} outer`)
            if(outerDiv){
            outerDiv.remove()
            addCart()
            }
        } catch{
            console.log('selected/unselected')
        }
        
        
    }
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
    addicon.classList.add('plus-svg')

    addDiv.appendChild(addicon)
    addDiv.classList.add('rounded')

    const subDiv = document.createElement('div')

    const subicon = document.createElement('img')
    subicon.src = 'assets/images/icon-decrement-quantity.svg'
    subicon.width = 10
    subicon.height = 10
    subicon.classList.add('minus-svg')

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
        addCartItem(dessert.name)
    })

    subDiv.addEventListener("click",()=>{
        subQuantity(dessert.name)
        totalItems = sumShoppingCart(shoppingCart)
        cartSize.innerText=`(${totalItems})`
        updatePrice(dessert.name)
        removeCartItem(dessert.name)
        if (totalItems == 0){
            cartEmpty = true
            emptyCart()
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
        removeCartItem(dessert.name)
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

// function updateTotalPrice(name){
//     let item = shoppingCart.find((item)=>{
//         return item.item == name
//     })
    
//     item.price = item.unitPrice * item.quantity
//     return item.price
// }