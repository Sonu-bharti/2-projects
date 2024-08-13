// sidebar open when click on menu icon.
const mobile = document.querySelector('.menu-toggle');
const mobilelink = document.querySelector('.sidebar');

mobile.addEventListener("click", function(){
    mobile.classList.toggle('is-active');
    mobilelink.classList.toggle('active');
})

// sidebar close when click on menubar.
mobilelink.addEventListener("click", function(){
    const bars = document.querySelector('.is-active');
    if(window.innerWidth<=768 && bars){
        mobile.classList.toggle("is-active");
        mobilelink.classList.toggle("active");
    }
})

// move the menu to left or right,when the click on next or back icons.

var step = 100;
var stepfilter = 60;
var scrolling = true;

$(".back").bind("click",function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "-=" + step + "px"
    })
})

$(".next").bind("click",function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "+=" + step + "px"
    })
});


// move the menus filter to left or right.

$(".back-menus").bind("click",function(e){
    e.preventDefault();
    $(".filter-wrapped").animate({
        scrollLeft: "-=" + stepfilter + "px"
    })
})

$(".next-menus").bind("click",function(e){
    e.preventDefault();
    $(".filter-wrapped").animate({
        scrollLeft: "+=" + stepfilter + "px"
    })
});


// Cart..

const cartIcon = document.querySelector(".cart");
const cart = document.querySelector(".cart-main");
const closeCart = document.querySelector(".close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};
// close cart.
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// cart working js.
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}


function ready(){
    // remove item from cart.
    /* var removeCartButtons = document.getElementsByClassName('remove-cart');
    console.log(removeCartButtons);
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // quantity changes.
    var quantityInput = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    } */
    // add to cart.
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addCart.length; i++){
         addCart[i].addEventListener('click', addCartClicked);
    }
// buy Button Work.
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}
// Buy button.
function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// quantity changes.
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
// add to cart.
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('detail-food')[0].innerText;
    var price = shopProducts.getElementsByClassName('detail-price')[0].innerText;
    var image = shopProducts.getElementsByClassName('detail-img')[0].src;
    addProductToCart(title,price,image);
    updateTotal();
}
function addProductToCart(title,price,image){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${image}" alte+="" class="img-detail">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="product-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove from cart -->
                        <ion-icon class="remove-cart" name="trash-outline"></ion-icon>
                        `;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}





// update total.
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('product-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace("₹", ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
            // if price contain some points value.
            total = Math.round(total * 100) / 100;

            document.getElementsByClassName('total-price')[0].innerText = "₹" + total;
    
}

