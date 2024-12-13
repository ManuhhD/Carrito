// elementos del DOM
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');

// Array para almacenar los productos en el carrito
let cart = [];

// Funcion para agregar un producto al carrito
function addToCart(productName, productPrice) {
    // Verificar si el producto ya esta en el carrito
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        // Si el producto ya esta en el carrito, aumentar la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si el producto no esta en el carrito, agregarlo
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }
    
    updateCart();
}

// Funcion para actualizar el carrito en la interfaz
function updateCart() {
    // Limpiar la lista de productos
    cartItemsList.innerHTML = '';
    
    let total = 0;
    
    // Iterar sobre los productos del carrito y agregarlos a la lista
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        
        // Agregar un boton para eliminar el producto
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(item.name);
        li.appendChild(removeButton);
        
        cartItemsList.appendChild(li);
        
        // Sumar al total
        total += item.price * item.quantity;
    });
    
    // Actualizar el total
    totalPriceElement.textContent = total.toFixed(2);
}

// Funcion para eliminar un producto del carrito
function removeFromCart(productName) {
    // Filtrar el producto para eliminarlo del carrito
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Funcion para vaciar el carrito
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Añadir eventos a los botones "Agregar al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});
