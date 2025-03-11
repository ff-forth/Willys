# Willys Självutcheckning

En interaktiv webbapplikation som simulerar självutcheckning i en Willys-butik. Projektet är byggt med HTML, CSS och JavaScript.

## Funktioner

- Välj mellan att skanna varor direkt eller använda förskannade varor
- Skanna varor genom att klicka på produkter i kategorier
- Sök efter varor manuellt
- Visa kundvagn med produkter, antal och priser
- Simulera betalning med kort
- Kvittohantering (utskrift eller e-post)

## Skärmar

Applikationen innehåller flera skärmar:

1. **Startskärm** - Välj mellan att skanna varor direkt eller använda förskannade varor
2. **Skanningsskärm** - Skanna varor eller välj dem manuellt
3. **Betalningsskärm** - Välj betalningsmetod
4. **Kortbetalningsskärm** - Simulerar kortbetalning
5. **Kvittoskärm** - Välj hur du vill ha ditt kvitto
6. **Avslutningsskärm** - Bekräftar köpet

## Produktkategorier

Applikationen innehåller flera produktkategorier:

- Frukt & Grönt
- Mejeri
- Bröd
- Dryck
- Fikabröd
- Snacks

## Användning

1. Öppna `index.html` i en webbläsare
2. Välj "Tryck här för att skanna dina varor nu"
3. Lägg till varor genom att klicka på "Välj varor manuellt" eller använd snabbvalen
4. När du är klar, klicka på "Till betalning"
5. Följ instruktionerna för att slutföra köpet

## Utveckling

### Filstruktur

- `index.html` - Huvudsaklig HTML-struktur
- `styles.css` - CSS-stilar för applikationen
- `script.js` - JavaScript-funktionalitet

### Anpassning

För att lägga till nya produkter, uppdatera `categoryProducts`-objektet i `script.js`:
