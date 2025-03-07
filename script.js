document.addEventListener('DOMContentLoaded', function() {
    // Sidhantering
    const pages = document.querySelectorAll('.page');
    
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        // Hantera footer-visning
        if (pageId === 'scan-method-page') {
            document.getElementById('main-footer').style.display = 'none';
        } else {
            document.getElementById('main-footer').style.display = 'flex';
        }
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
    
    // Skanningsmetod-sida (nu första sidan)
    document.getElementById('pre-scanned-option').addEventListener('click', function() {
        // Visa popup om att funktionen inte är tillgänglig
        showUnavailableFeaturePopup();
    });
    
    document.getElementById('scan-now-option').addEventListener('click', function() {
        // Visa popup om att blippa kortet först
        showBlipCardPopup();
    });
    
    // Skanningssida
    document.getElementById('scan-button').addEventListener('click', function() {
        addRandomProduct();
    });
    
    document.getElementById('proceed-to-payment').addEventListener('click', function() {
        if (cart.length > 0) {
            // Gå direkt till kortbetalning istället för betalningsmetodssidan
            showPage('card-payment-page');
            simulateCardPayment();
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
        showPage('scan-method-page');
    });
    
    // Hjälpknapp
    document.getElementById('help-button').addEventListener('click', function() {
        alert('Personal kommer att hjälpa dig inom kort.');
    });

    // Funktion för att visa popup
    function showUnavailableFeaturePopup() {
        // Skapa popup-element
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            document.body.removeChild(popup);
        };
        
        const message = document.createElement('p');
        message.textContent = 'Tyvärr är denna funktion inte tillgänglig för tillfället.';
        
        const okButton = document.createElement('button');
        okButton.className = 'primary-button';
        okButton.textContent = 'OK';
        okButton.onclick = function() {
            document.body.removeChild(popup);
        };
        
        popupContent.appendChild(closeBtn);
        popupContent.appendChild(message);
        popupContent.appendChild(okButton);
        popup.appendChild(popupContent);
        
        document.body.appendChild(popup);
    }

    // Funktion för att visa popup om att blippa kortet
    function showBlipCardPopup() {
        // Skapa popup-element
        const popup = document.createElement('div');
        popup.className = 'popup popup-large';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        // Lägg till stängknapp
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function(e) {
            e.stopPropagation(); // Förhindra att klicket når popupContent
            document.body.removeChild(popup);
        };
        
        // Skapa ett klickbart område i mitten
        const clickableArea = document.createElement('div');
        clickableArea.className = 'popup-clickable-area';
        
        const message = document.createElement('p');
        message.textContent = 'Vänligen blippa ditt kort i kortterminalen innan du börjar skanna dina varor.';
        
        // Lägg till kortikon
        const cardIconContainer = document.createElement('div');
        cardIconContainer.className = 'card-icon-container';
        
        const cardIcon = document.createElement('img');
        cardIcon.className = 'card-icon';
        cardIcon.src = 'https://cdn-icons-png.flaticon.com/128/3037/3037255.png';
        cardIcon.alt = 'Kortikon';
        cardIcon.onclick = function() {
            document.body.removeChild(popup);
            showPage('scanning-page');
        };
        
        cardIconContainer.appendChild(cardIcon);
        
        // Ändra ordningen - lägg till texten först, sedan kortikonen
        clickableArea.appendChild(message);
        clickableArea.appendChild(cardIconContainer);
        
        popupContent.appendChild(closeBtn);
        popupContent.appendChild(clickableArea);
        popup.appendChild(popupContent);
        
        document.body.appendChild(popup);
    }
}); 