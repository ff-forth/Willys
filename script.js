document.addEventListener('DOMContentLoaded', function() {
    // Sidhantering
    const pages = document.querySelectorAll('.page');
    
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }
    
    // Produktdata (simulerad)
    const products = [
        { id: 1, name: 'Mjölk 1L', price: 15.90 },
        { id: 2, name: 'Bröd', price: 29.90 },
        { id: 3, name: 'Ägg 12-pack', price: 39.90 },
        { id: 4, name: 'Ost 500g', price: 69.90 },
        { id: 5, name: 'Pasta 500g', price: 12.90 },
        { id: 6, name: 'Tomater 500g', price: 24.90 }
    ];
    
    // Kundvagn
    let cart = [];
    let total = 0;
    
    function updateCart() {
        const productList = document.getElementById('product-items');
        const totalElement = document.getElementById('total-amount');
        
        productList.innerHTML = '';
        total = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price.toFixed(2)} kr</span>
            `;
            productList.appendChild(li);
            total += item.price;
        });
        
        totalElement.textContent = total.toFixed(2);
    }
    
    function addRandomProduct() {
        const randomIndex = Math.floor(Math.random() * products.length);
        const product = products[randomIndex];
        cart.push(product);
        updateCart();
    }
    
    // Händelsehanterare för knappar
    
    // Startsida
    document.getElementById('start-button').addEventListener('click', function() {
        showPage('scan-method-page');
    });
    
    // Skanningsmetod-sida (nu första sidan)
    document.getElementById('pre-scanned-option').addEventListener('click', function() {
        // Om användaren redan har självskannat, gå direkt till betalningssidan
        showPage('payment-page');
    });
    
    document.getElementById('scan-now-option').addEventListener('click', function() {
        // Om användaren vill skanna nu, gå till välkomstsidan först
        showPage('welcome-screen');
    });
    
    // Skanningssida
    document.getElementById('scan-button').addEventListener('click', function() {
        addRandomProduct();
    });
    
    document.getElementById('proceed-to-payment').addEventListener('click', function() {
        if (cart.length > 0) {
            showPage('payment-page');
        } else {
            alert('Vänligen skanna minst en vara innan du går till betalning.');
        }
    });
    
    // Betalningssida
    document.getElementById('card-payment').addEventListener('click', function() {
        showPage('card-payment-page');
        simulateCardPayment();
    });
    
    document.getElementById('swish-payment').addEventListener('click', function() {
        // Här kan du lägga till Swish-betalningslogik
        alert('Swish-betalning är inte implementerad i denna demo.');
    });
    
    document.getElementById('back-to-scanning').addEventListener('click', function() {
        showPage('scanning-page');
    });
    
    // Kortbetalningssida
    document.getElementById('cancel-payment').addEventListener('click', function() {
        showPage('payment-page');
    });
    
    function simulateCardPayment() {
        const paymentMessage = document.getElementById('payment-message');
        
        setTimeout(() => {
            paymentMessage.textContent = 'Bearbetar betalning...';
        }, 2000);
        
        setTimeout(() => {
            paymentMessage.textContent = 'Betalning godkänd!';
        }, 4000);
        
        setTimeout(() => {
            showPage('receipt-page');
        }, 6000);
    }
    
    // Kvittosida
    document.getElementById('print-receipt').addEventListener('click', function() {
        alert('Kvitto skrivs ut...');
        showPage('completion-page');
    });
    
    document.getElementById('email-receipt').addEventListener('click', function() {
        showPage('email-form-page');
    });
    
    document.getElementById('no-receipt').addEventListener('click', function() {
        showPage('completion-page');
    });
    
    // E-postformulär
    document.getElementById('email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        alert(`Kvitto skickat till: ${email}`);
        showPage('completion-page');
    });
    
    document.getElementById('cancel-email').addEventListener('click', function() {
        showPage('receipt-page');
    });
    
    // Avslutningssida
    document.getElementById('new-customer').addEventListener('click', function() {
        // Återställ kundvagn och visa startsidan
        cart = [];
        updateCart();
        showPage('welcome-screen');
    });
    
    // Hjälpknapp
    document.getElementById('help-button').addEventListener('click', function() {
        alert('Personal kommer att hjälpa dig inom kort.');
    });
}); 