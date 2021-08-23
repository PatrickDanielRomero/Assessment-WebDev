let carts = document.querySelectorAll('.shop-item-button');

let products = [ 
	{
		name: 'iPhone 12', 
		tag: 'shop1',
		price: 829,
		inCart: 0
	},
	{
		name: 'iPhone 12 mini', 
		tag: 'shop2',
		price: 729.99,
		inCart: 0
	},
	{
		name: 'iPhone 12 Pro', 
		tag: 'shop3',
		price: 999,
		inCart: 0
	},
	{
		name: 'iPhone 12 Pro Max', 
		tag: 'shop4',
		price: 1099,
		inCart: 0
	},
	{
		name: 'iPhone 11', 
		tag: 'shop5',
		price: 447.99,
		inCart: 0
	},
	{
		name: 'iPhone SE (2020)', 
		tag: 'shop6',
		price: 268.98,
		inCart: 0
	},
	{
		name: 'iPhone 11 Pro', 
		tag: 'shop7',
		price: 624.95,
		inCart: 0
	},
	{
		name: 'iPhone 11 Pro Max', 
		tag: 'shop8',
		price: 685.50,
		inCart: 0
	},
	{
		name: 'iPhone XS', 
		tag: 'shop9',
		price: 278.59,
		inCart: 0
	}
]

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.push span').textContent = productNumbers;
	}
}

function cartNumbers(product) {

	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers = parseInt(productNumbers);

	if( productNumbers ) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.push span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.push span').textContent = 1;
	}

	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null) {

		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
	product.inCart = 1;
	cartItems = {
		[product.tag]: product	
		}
	}

	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);	
	}

	
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');

	if( cartItems && productContainer ) {
		productContainer.innerHTML = '';  
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<i class="far fa-times-circle"></i>
				<img src="${item.tag}.png">
				<span>${item.name}</span>
			</div>
			<div class="price">$${item.price}.00</div> 
			<div class="quantity">
				<i class="fas fa-minus"></i><span>${item.inCart}</span>
				<i class="fas fa-plus"></i>
			</div>
			<div class="total">
				$${item.inCart * item.price}.00
			</div>
			`
		});

		productContainer.innerHTML += `
			<div class="cartTotalContainer">
				<h4 class="cartTotalContainer">
				Cart Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}.00
				</h4>
		`

	}
}

onLoadCartNumbers();
displayCart();