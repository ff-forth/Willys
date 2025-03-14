document.addEventListener('DOMContentLoaded', function() {
    // Sidhantering
    const pages = document.querySelectorAll('.page');
    
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        // Visa topbar endast på skanningssidan
        if (pageId === 'scanning-page') {
            document.getElementById('topbar').style.display = 'flex';
        } else {
            document.getElementById('topbar').style.display = 'none';
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
    
    // Uppdatera kundvagnen direkt när sidan laddas
    updateCart();
    
    function updateCart() {
        const productList = document.getElementById('product-items');
        const totalElement = document.getElementById('total-amount');
        
        // Rensa produktlistan
        productList.innerHTML = '';
        
        // Ta bort rubrikrad om den finns
        const productListContainer = productList.parentElement;
        const headerRow = productListContainer.querySelector('.product-header');
        if (headerRow) {
            productListContainer.removeChild(headerRow);
        }
        
        total = 0;
        
        // Gruppera produkter efter namn
        const groupedProducts = {};
        
        cart.forEach(item => {
            if (!groupedProducts[item.name]) {
                groupedProducts[item.name] = {
                    name: item.name,
                    price: item.price,
                    quantity: 1
                };
            } else {
                groupedProducts[item.name].quantity += 1;
            }
            total += item.price;
        });
        
        // Hitta h3-rubriken i produktlistan
        const productListTitle = document.querySelector('.product-list h3');
        
        // Hitta alla förekomster av "Scanna första varan" i hela dokumentet
        const scanningInstructions = document.querySelectorAll('.scanning-instructions');
        
        // Om kundvagnen är tom
        if (cart.length === 0) {
            // Visa bara rubriken "Scanna första varan"
            if (productListTitle) {
                productListTitle.style.display = 'block';
                productListTitle.style.margin = '3rem 0';
            }
            
            // Visa alla instruktioner
            scanningInstructions.forEach(instruction => {
                instruction.style.display = 'block';
            });
            
            // Dölj produktlistan
            productList.style.display = 'none';
        } else {
            // Dölj rubriken när det finns varor
            if (productListTitle) {
                productListTitle.style.display = 'none';
            }
            
            // Dölj alla instruktioner
            scanningInstructions.forEach(instruction => {
                instruction.style.display = 'none';
            });
            
            // Visa produktlistan
            productList.style.display = 'block';
            
            // Visa grupperade produkter
            Object.values(groupedProducts).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.quantity} st</span>
                    <span>${item.price.toFixed(2)} kr</span>
                    <span>${(item.price * item.quantity).toFixed(2)} kr</span>
                `;
                productList.appendChild(li);
            });
        }
        
        totalElement.textContent = total.toFixed(2);
    }
    
    function addRandomProduct() {
        const randomIndex = Math.floor(Math.random() * products.length);
        const product = products[randomIndex];
        cart.push(product);
        // Uppdatera kundvagnen utan att visa popup här
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
    
    // Skanningssida - lägg till händelsehanterare för produktlistan
    document.querySelector('.product-list').addEventListener('click', function(e) {
        // Kontrollera om vi klickade på produktlistan och inte på en produkt
        if (e.target.classList.contains('product-list') || 
            e.target.tagName === 'H3' || 
            e.target === document.getElementById('product-items')) {
            
            // Spara längden på kundvagnen före vi lägger till en produkt
            const oldCartLength = cart.length;
            
            // Lägg till en slumpmässig produkt
            addRandomProduct();
            
            // Visa popup med den nya produkten
            const newProduct = cart[cart.length - 1];
            showPlaceOnScalePopup(newProduct.name);
        }
    });
    
    // Uppdatera händelsehanteraren för betalningsknappen
    document.getElementById('proceed-to-payment').addEventListener('click', function() {
        if (cart.length > 0) {
            // Gå direkt till kortbetalning istället för betalningsmetodssidan
            showPage('card-payment-page');
            simulateCardPayment();
        } else {
            // Visa popup med meddelande om att kundvagnen är tom
            showEmptyCartPopup();
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
    
    // Uppdatera händelsehanteraren för hjälpknappen
    document.getElementById('help-button').addEventListener('click', function() {
        // Visa popup istället för alert
        showCallStaffPopup();
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

    // Lägg till funktion för att visa popup när personal tillkallas
    function showCallStaffPopup() {
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
        message.textContent = 'Personal kommer att hjälpa dig inom kort.';
        
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

    // Uppdatera klockan i topbar
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}`;
    }

    // Uppdatera klockan varje minut
    setInterval(updateClock, 60000);
    updateClock(); // Kör direkt vid sidladdning

    // Händelsehanterare för snabbval av varor
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('.item-name').textContent;
            const itemDesc = this.querySelector('.item-desc').textContent;
            const fullName = itemName + (itemDesc ? ' ' + itemDesc : '');
            
            // Lägg till varan i kundvagnen
            const price = getQuickItemPrice(itemName);
            cart.push({ name: fullName, price: price });
            updateCart();
            
            // Visa popup för den tillagda varan
            showPlaceOnScalePopup(fullName);
        });
    });
    
    // Funktion för att hämta pris för snabbval
    function getQuickItemPrice(itemName) {
        const prices = {
            'plastkasse': 7.00,
            'papperskasse': 5.00,
            'telefonkort': 100.00
        };
        return prices[itemName] || 0;
    }
    
    // Uppdatera händelsehanteraren för "Välj varor manuellt"
    document.querySelector('.manual-select-button').addEventListener('click', function() {
        // Visa kategoriväljare först istället för sökpopupen direkt
        showCategorySelectionPopup();
    });
    
    // Funktion för att visa kategoriväljare
    function showCategorySelectionPopup() {
        // Skapa popup-element
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content search-popup-large';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            document.body.removeChild(popup);
        };
        
        // Skapa sökfält
        const searchForm = document.createElement('div');
        searchForm.className = 'search-form';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Skriv varunamn:';
        
        const searchButton = document.createElement('button');
        searchButton.className = 'primary-button';
        searchButton.textContent = 'SÖK';
        searchButton.onclick = function() {
            // Stäng denna popup
            document.body.removeChild(popup);
            // Visa sökresultat baserat på söktermen
            showManualSearchPopup(searchInput.value);
        };
        
        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
        
        // Skapa kategorigrid
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'category-grid';
        categoryGrid.style.display = 'grid';
        categoryGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        categoryGrid.style.gap = '10px';
        categoryGrid.style.margin = '1rem 0';
        categoryGrid.style.flex = '1';
        categoryGrid.style.overflowY = 'auto';
        
        // Lista över kategorier
        const categories = [
            'Bröd', 'Frukt', 'Grönsaker', 
            'Drycker', 'Färdigmat', 'Godis', 'Djupfrys', 'Övrig'
        ];
        
        // Skapa kategorirutor
        categories.forEach(category => {
            const categoryBox = document.createElement('div');
            categoryBox.className = 'suggestion-item';
            categoryBox.style.height = 'auto';
            categoryBox.style.padding = '20px 10px';
            categoryBox.style.textAlign = 'center';
            categoryBox.style.display = 'flex';
            categoryBox.style.justifyContent = 'center';
            categoryBox.style.alignItems = 'center';
            categoryBox.style.fontWeight = 'bold';
            
            categoryBox.textContent = category;
            
            // Klickhändelse
            categoryBox.onclick = function() {
                // Stäng denna popup
                document.body.removeChild(popup);
                // Visa produkter för den valda kategorin
                showManualSearchPopup(null, category);
            };
            
            categoryGrid.appendChild(categoryBox);
        });
        
        // Lägg till allt i popupen
        popupContent.appendChild(closeBtn);
        popupContent.appendChild(searchForm);
        popupContent.appendChild(categoryGrid);
        popup.appendChild(popupContent);
        
        document.body.appendChild(popup);
        
        // Fokusera på sökfältet
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    // Uppdatera showManualSearchPopup-funktionen för att hantera underkategorier för Bröd
    function showManualSearchPopup(searchTerm = null, initialCategory = 'Bröd') {
        // Skapa popup-element
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content search-popup-large';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            document.body.removeChild(popup);
        };
        
        const searchForm = document.createElement('form');
        searchForm.className = 'search-form';
        searchForm.onsubmit = function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Simulera sökning och lägg till en produkt
                addSearchedProduct(searchTerm);
                document.body.removeChild(popup);
            }
        };
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Skriv varunamn...';
        searchInput.autocomplete = 'off';
        
        // Om en sökterm angavs, fyll i sökfältet
        if (searchTerm) {
            searchInput.value = searchTerm;
        }
        
        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.className = 'primary-button';
        searchButton.textContent = 'Sök';
        
        // Skapa kategorinavigering
        const categoryNav = document.createElement('div');
        categoryNav.className = 'category-nav';
        categoryNav.style.gap = '5px';
        categoryNav.style.marginBottom = '10px';
        
        const categories = [
            'Bröd', 'Frukt', 'Grönsaker', 'Drycker', 
            'Färdigmat', 'Godis', 'Djupfrys', 'Övrig'
        ];
        
        // Skapa underkategorinavigering (dold från början)
        const subcategoryNav = document.createElement('div');
        subcategoryNav.className = 'category-nav subcategory-nav';
        subcategoryNav.style.marginTop = '2px';
        subcategoryNav.style.marginBottom = '5px';
        subcategoryNav.style.gap = '5px';
        subcategoryNav.style.display = 'none';
        
        // Definiera underkategorier för Bröd
        const breadSubcategories = ['Alla', 'Matbröd', 'Baguetter', 'Småbröd', 'kaffebröd'];
        
        // Skapa knappar för underkategorier
        breadSubcategories.forEach(subcat => {
            const subcatBtn = document.createElement('button');
            subcatBtn.className = 'category-btn subcategory-btn';
            subcatBtn.textContent = subcat;
            subcatBtn.style.padding = '4px 10px'; // Mindre padding
            subcatBtn.style.fontSize = '0.85rem'; // Mindre textstorlek
            subcatBtn.style.margin = '0 2px 2px 0'; // Mindre marginaler
            subcatBtn.onclick = function() {
                // Markera den aktiva underkategorin
                document.querySelectorAll('.subcategory-nav .category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                subcatBtn.classList.add('active');
                
                // Visa produkter baserat på underkategori
                if (subcat === 'Alla') {
                    // Visa alla brödprodukter
                    showAllBreadProducts(suggestedItems);
                } else if (subcat === 'kaffebröd') {
                    // Visa fikabröd (kaffebröd)
                    showCategoryProducts('Fikabröd', suggestedItems);
                } else if (subcat === 'Matbröd') {
                    // Visa matbröd
                    showCategoryProducts('Bröd', suggestedItems);
                } else {
                    // För andra underkategorier, visa bara bröd för nu
                    showCategoryProducts('Bröd', suggestedItems);
                }
            };
            subcategoryNav.appendChild(subcatBtn);
        });
        
        // Skapa knappar för huvudkategorier
        categories.forEach(category => {
            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'category-btn';
            categoryBtn.textContent = category;
            categoryBtn.style.padding = '6px 12px'; // Mindre padding
            categoryBtn.style.fontSize = '0.9rem'; // Mindre textstorlek
            categoryBtn.style.margin = '0 2px 2px 0'; // Mindre marginaler
            categoryBtn.onclick = function() {
                // Markera den aktiva kategorin
                document.querySelectorAll('.category-nav > .category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                categoryBtn.classList.add('active');
                
                // Visa/dölj underkategorier baserat på vald kategori
                if (category === 'Bröd') {
                    subcategoryNav.style.display = 'flex';
                    // Markera "Alla" som aktiv från början
                    document.querySelectorAll('.category-nav + .category-nav .category-btn').forEach((btn, i) => {
                        if (i === 0) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                    // Visa alla brödprodukter
                    showAllBreadProducts(suggestedItems);
                } else {
                    subcategoryNav.style.display = 'none';
                    // Visa produkter för den valda kategorin
                    showCategoryProducts(category, suggestedItems);
                }
            };
            categoryNav.appendChild(categoryBtn);
        });
        
        const suggestedItems = document.createElement('div');
        suggestedItems.className = 'suggested-items';
        suggestedItems.style.gap = '10px';
        suggestedItems.style.marginTop = '0.5rem';
        
        // Lägg till en container för färdig-knappen
        const finishButtonContainer = document.createElement('div');
        finishButtonContainer.className = 'finish-button-container';
        
        // Skapa färdig-knappen
        const finishButton = document.createElement('button');
        finishButton.className = 'finish-button';
        finishButton.textContent = 'Färdig';
        finishButton.onclick = function() {
            // Samla in alla produkter med antal > 0
            const selectedProducts = [];
            const quantityInputs = document.querySelectorAll('.quantity-value');
            
            quantityInputs.forEach(input => {
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    const productItem = input.closest('.suggestion-item');
                    const productName = productItem.querySelector('.product-name').textContent;
                    const productData = findProductByName(productName);
                    
                    if (productData) {
                        // Lägg till produkten i kundvagnen med rätt antal
                        for (let i = 0; i < quantity; i++) {
                            cart.push(productData);
                            selectedProducts.push(productData.name);
                        }
                    }
                }
            });
            
            // Uppdatera kundvagnen
            updateCart();
            
            // Stäng popupen
            document.body.removeChild(popup);
            
            // Visa popup för alla valda varor om det finns några
            if (selectedProducts.length > 0) {
                showPlaceOnScalePopup(selectedProducts);
            }
        };
        
        finishButtonContainer.appendChild(finishButton);
        
        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
        
        popupContent.appendChild(closeBtn);
        popupContent.appendChild(searchForm);
        popupContent.appendChild(categoryNav);
        popupContent.appendChild(subcategoryNav);
        popupContent.appendChild(suggestedItems);
        popupContent.appendChild(finishButtonContainer);
        popup.appendChild(popupContent);
        
        document.body.appendChild(popup);
        
        // Markera rätt kategoriknapp som aktiv och visa rätt produkter
        document.querySelectorAll('.category-nav > .category-btn').forEach(btn => {
            if (btn.textContent === initialCategory) {
                btn.classList.add('active');
                // Om Bröd är vald, visa underkategorier
                if (initialCategory === 'Bröd') {
                    subcategoryNav.style.display = 'flex';
                    document.querySelectorAll('.category-nav + .category-nav .category-btn')[0].classList.add('active');
                    showAllBreadProducts(suggestedItems);
                } else {
                    showCategoryProducts(initialCategory, suggestedItems);
                }
            }
        });
        
        // Fokusera på sökfältet
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    // Hjälpfunktion för att visa alla brödprodukter
    function showAllBreadProducts(container) {
        // Rensa befintliga produkter
        container.innerHTML = '';
        
        // Kombinera produkter från Fikabröd och Bröd
        const allBreadProducts = [
            ...(categoryProducts['Fikabröd'] || []),
            ...(categoryProducts['Bröd'] || [])
        ];
        
        // Visa produkterna
        allBreadProducts.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            
            // Skapa produktbild
            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            const img = document.createElement('img');
            img.src = item.image || 'placeholder.jpg';
            img.alt = item.name;
            productImage.appendChild(img);
            
            // Skapa produktnamn
            const productName = document.createElement('div');
            productName.className = 'product-name';
            productName.textContent = item.name;
            
            // Skapa antalskontroll
            const productQuantity = document.createElement('div');
            productQuantity.className = 'product-quantity';
            
            const quantityControl = document.createElement('div');
            quantityControl.className = 'quantity-control';
            
            const minusBtn = document.createElement('button');
            minusBtn.className = 'quantity-btn';
            minusBtn.textContent = '-';
            minusBtn.onclick = function(e) {
                e.stopPropagation();
                const input = this.parentNode.querySelector('.quantity-value');
                let value = parseInt(input.value);
                if (value > 0) {
                    input.value = value - 1;
                }
            };
            
            const quantityInput = document.createElement('input');
            quantityInput.type = 'text';
            quantityInput.className = 'quantity-value';
            quantityInput.value = '0';
            quantityInput.readOnly = true;
            
            const plusBtn = document.createElement('button');
            plusBtn.className = 'quantity-btn';
            plusBtn.textContent = '+';
            plusBtn.onclick = function(e) {
                e.stopPropagation();
                const input = this.parentNode.querySelector('.quantity-value');
                let value = parseInt(input.value);
                input.value = value + 1;
            };
            
            quantityControl.appendChild(minusBtn);
            quantityControl.appendChild(quantityInput);
            quantityControl.appendChild(plusBtn);
            
            productQuantity.appendChild(quantityControl);
            
            // Lägg till alla delar i produktkortet
            suggestionItem.appendChild(productImage);
            suggestionItem.appendChild(productName);
            suggestionItem.appendChild(productQuantity);
            
            // Uppdatera klickhändelsen för att lägga till varan direkt i kundvagnen och visa popup
            suggestionItem.onclick = function(e) {
                // Om klicket kommer från själva kortet (inte från antalskontrollen)
                if (!e.target.closest('.quantity-control')) {
                    // Lägg till en vara direkt
                    cart.push(item);
                    
                    // Uppdatera antalet i input-fältet
                    const input = this.querySelector('.quantity-value');
                    let value = parseInt(input.value);
                    input.value = value + 1;
                    
                    // Stäng popupen med sökfältet
                    document.body.removeChild(document.querySelector('.popup'));
                    
                    // Uppdatera kundvagnen
                    updateCart();
                    
                    // Visa popup om att lägga varan på vågen
                    showPlaceOnScalePopup(item.name);
                }
            };
            
            container.appendChild(suggestionItem);
        });
    }

    // Produktdata per kategori med bildlänkar - flytta till global scope
    const categoryProducts = {
        'Fikabröd': [
            { 
                name: 'Chokladmunk Lyx', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960773023_S01'
            },
            { 
                name: 'Cinelle Vanilj', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960019497_C1C1_s01'
            },
            { 
                name: 'Croissant', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960788058_C1N0_s01'
            },
            { 
                name: 'Croissant Choklad', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960788416_C1C0_s01'
            },
            { 
                name: 'Donut Choklad', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07350031139204_C1C1_s01'
            },
            { 
                name: 'Hallonmunk Lyx', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960773016_C1C1_s01'
            },
            { 
                name: 'Kanelsnäcka Kanelbulle', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07311141390602_C1C0_s01'
            },
            { 
                name: 'Lyxmunk Salted Caramel', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960781059_C1C1_s01'
            },
            { 
                name: 'Pain Au Chocolat', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960788096_C1C0_s01'
            },
            { 
                name: 'Solbulle', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960785057_C1C1_s01'
            },
            { 
                name: 'Vaniljhjärta', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960855101_C1C0_s01'
            },
            { 
                name: 'Vaniljmunk', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960722953_C1C0_s01'
            },
            { 
                name: 'Wienerbröd Vanilj', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07311141390640_C1C0_s01'
            },
            { 
                name: 'Wienerbröd Vanilj Hallon', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07311141390657_C1C0_s01'
            },
            { 
                name: 'Äppelmunk', 
                price: 9.90, 
                image: 'https://assets.axfood.se/image/upload/f_auto,t_200/07310960722960_C1C0_s01'
            }
        ],
        'Bröd': [
            { name: 'Rågbröd', price: 29.90 },
            { name: 'Vitt bröd', price: 24.90 },
            { name: 'Korvbröd 8-pack', price: 19.90 },
            { name: 'Hamburgerbröd 4-pack', price: 22.90 }
        ],
        'Frukt': [
            { name: 'Äpple Royal Gala', price: 5.90 },
            { name: 'Banan Eko', price: 24.90 },
            { name: 'Apelsin', price: 6.90 },
            { name: 'Päron', price: 7.90 }
        ],
        'Grönsaker': [
            { name: 'Gurka', price: 12.90 },
            { name: 'Tomat Kvist', price: 29.90 },
            { name: 'Lök Gul', price: 14.90 },
            { name: 'Paprika Röd', price: 19.90 }
        ],
        'Drycker': [
            { name: 'Mjölk 1L', price: 15.90 },
            { name: 'Juice Apelsin 1L', price: 22.90 },
            { name: 'Läsk Cola 1.5L', price: 19.90 },
            { name: 'Vatten Kolsyrad 1.5L', price: 12.90 }
        ],
        'Färdigmat': [
            { name: 'Lasagne 400g', price: 49.90 },
            { name: 'Pizza Margherita', price: 39.90 },
            { name: 'Sallad Kyckling', price: 59.90 },
            { name: 'Paj Ost & Skinka', price: 45.90 }
        ],
        'Godis': [
            { name: 'Choklad Mjölk 100g', price: 19.90 },
            { name: 'Godispåse 200g', price: 29.90 },
            { name: 'Lakrits 150g', price: 24.90 },
            { name: 'Geléhallon 150g', price: 22.90 }
        ],
        'Djupfrys': [
            { name: 'Glass Vanilj 1L', price: 39.90 },
            { name: 'Fiskpinnar 30-pack', price: 49.90 },
            { name: 'Pommes Frites 1kg', price: 29.90 },
            { name: 'Ärtor 500g', price: 15.90 }
        ],
        'Övrig': [
            { name: 'Tvål Flytande 500ml', price: 29.90 },
            { name: 'Tandkräm 75ml', price: 24.90 },
            { name: 'Hushållspapper 6-pack', price: 39.90 },
            { name: 'Batterier AA 4-pack', price: 49.90 }
        ]
    };
    
    // Uppdatera showCategoryProducts-funktionen för att visa popup när man klickar på produktkort
    function showCategoryProducts(category, container) {
        // Rensa befintliga produkter
        container.innerHTML = '';
        
        // Visa produkter för den valda kategorin
        const products = categoryProducts[category] || [];
        
        products.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            
            // Skapa produktbild
            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            const img = document.createElement('img');
            img.src = item.image || 'placeholder.jpg';
            img.alt = item.name;
            productImage.appendChild(img);
            
            // Skapa produktnamn
            const productName = document.createElement('div');
            productName.className = 'product-name';
            productName.textContent = item.name;
            
            // Skapa antalskontroll
            const productQuantity = document.createElement('div');
            productQuantity.className = 'product-quantity';
            
            const quantityControl = document.createElement('div');
            quantityControl.className = 'quantity-control';
            
            const minusBtn = document.createElement('button');
            minusBtn.className = 'quantity-btn';
            minusBtn.textContent = '-';
            minusBtn.onclick = function(e) {
                e.stopPropagation();
                const input = this.parentNode.querySelector('.quantity-value');
                let value = parseInt(input.value);
                if (value > 0) {
                    input.value = value - 1;
                }
            };
            
            const quantityInput = document.createElement('input');
            quantityInput.type = 'text';
            quantityInput.className = 'quantity-value';
            quantityInput.value = '0';
            quantityInput.readOnly = true;
            
            const plusBtn = document.createElement('button');
            plusBtn.className = 'quantity-btn';
            plusBtn.textContent = '+';
            plusBtn.onclick = function(e) {
                e.stopPropagation();
                const input = this.parentNode.querySelector('.quantity-value');
                let value = parseInt(input.value);
                input.value = value + 1;
            };
            
            quantityControl.appendChild(minusBtn);
            quantityControl.appendChild(quantityInput);
            quantityControl.appendChild(plusBtn);
            
            productQuantity.appendChild(quantityControl);
            
            // Lägg till alla delar i produktkortet
            suggestionItem.appendChild(productImage);
            suggestionItem.appendChild(productName);
            suggestionItem.appendChild(productQuantity);
            
            // Uppdatera klickhändelsen för att lägga till varan direkt i kundvagnen och visa popup
            suggestionItem.onclick = function(e) {
                // Om klicket kommer från själva kortet (inte från antalskontrollen)
                if (!e.target.closest('.quantity-control')) {
                    // Lägg till en vara direkt
                    cart.push(item);
                    
                    // Uppdatera antalet i input-fältet
                    const input = this.querySelector('.quantity-value');
                    let value = parseInt(input.value);
                    input.value = value + 1;
                    
                    // Stäng popupen med sökfältet
                    document.body.removeChild(document.querySelector('.popup'));
                    
                    // Uppdatera kundvagnen
                    updateCart();
                    
                    // Visa popup om att lägga varan på vågen
                    showPlaceOnScalePopup(item.name);
                }
            };
            
            container.appendChild(suggestionItem);
        });
    }

    // Funktion för att lägga till en sökt produkt
    function addSearchedProduct(searchTerm) {
        // Simulera att vi hittar en produkt baserat på söktermen
        const price = (Math.random() * 50 + 10).toFixed(2);
        cart.push({ name: searchTerm, price: parseFloat(price) });
        updateCart();
    }
    
    // Funktion för att visa popup om att lägga varor på vågen
    function showPlaceOnScalePopup(productNames) {
        // Skapa popup-element
        const popup = document.createElement('div');
        popup.className = 'popup popup-large';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            document.body.removeChild(popup);
        };
        
        // Skapa ett klickbart område i mitten
        const clickableArea = document.createElement('div');
        clickableArea.className = 'popup-clickable-area';
        
        let messageText;
        if (Array.isArray(productNames) && productNames.length > 1) {
            messageText = `Vänligen lägg dina ${productNames.length} varor på vågen.`;
        } else {
            const productName = Array.isArray(productNames) ? productNames[0] : productNames;
            messageText = `Vänligen lägg "${productName}" på vågen.`;
        }
        
        const message = document.createElement('p');
        message.textContent = messageText;
        
        // Lägg till en bild på en våg
        const scaleImage = document.createElement('div');
        scaleImage.className = 'card-icon-container';
        
        const img = document.createElement('img');
        img.className = 'card-icon';
        img.src = 'https://cdn-icons-png.flaticon.com/128/2929/2929016.png';
        img.alt = 'Våg';
        
        scaleImage.appendChild(img);
        
        // Ändra ordningen - lägg till texten först, sedan våg-ikonen
        clickableArea.appendChild(message);
        clickableArea.appendChild(scaleImage);
        
        // Lägg till klickhändelse på hela det klickbara området
        clickableArea.onclick = function() {
            document.body.removeChild(popup);
        };
        
        popupContent.appendChild(closeBtn);
        popupContent.appendChild(clickableArea);
        popup.appendChild(popupContent);
        
        document.body.appendChild(popup);
    }
    
    // Uppdatera händelsehanteraren för "Egen kasse"
    document.querySelector('.own-bag-button').addEventListener('click', function() {
        // Lägg till egen kasse i kundvagnen (pris 0)
        cart.push({ name: 'Egen kasse', price: 0 });
        updateCart();
        
        // Ta bort popup för egen kasse - vi visar inte popup för egen kasse
        // showPlaceOnScalePopup('Egen kasse');
    });

    // Lägg till funktion för att visa popup när kundvagnen är tom
    function showEmptyCartPopup() {
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
        message.textContent = 'Vänligen skanna minst en vara innan du går till betalning.';
        
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

    // Hjälpfunktion för att hitta en produkt baserat på namn
    function findProductByName(name) {
        // Gå igenom alla kategorier och produkter
        for (const category in categoryProducts) {
            const products = categoryProducts[category];
            for (const product of products) {
                if (product.name === name) {
                    return product;
                }
            }
        }
        return null;
    }

    // Alternativ metod för att hitta instruktionselementet
    const scanningPage = document.getElementById('scanning-page');
    if (scanningPage) {
        const instructionElement = scanningPage.querySelector('p:contains("Scanna")');
        if (instructionElement && cart.length > 0) {
            instructionElement.style.display = 'none';
        }
    }
}); 