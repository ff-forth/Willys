# Willys Self-Checkout
https://ff-forth.github.io/Willys/


An interactive web application that simulates the self-checkout experience in a Willys grocery store. The project is built with HTML, CSS, and JavaScript.

## Features

- Choose between scanning items directly or using pre-scanned items
- Scan items by clicking on products in categories
- Search for items manually
- Display shopping cart with products, quantities, and prices
- Simulate card payment
- Receipt handling (print or email)

## Screens

The application contains several screens:

1. **Start Screen** - Choose between scanning items directly or using pre-scanned items
2. **Scanning Screen** - Scan items or select them manually
3. **Payment Screen** - Choose payment method
4. **Card Payment Screen** - Simulates card payment
5. **Receipt Screen** - Choose how you want your receipt
6. **Completion Screen** - Confirms the purchase

## Product Categories

The application includes several product categories:

- Fruits & Vegetables
- Dairy
- Bread
- Beverages
- Pastries
- Snacks

## Usage

1. Open `index.html` in a web browser
2. Select "Press here to scan your items now"
3. Add items by clicking on "Select items manually" or use the quick selection buttons
4. When you're done, click on "Proceed to payment"
5. Follow the instructions to complete the purchase

## Development

### File Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styles for the application
- `script.js` - JavaScript functionality

### Customization

To add new products, update the `categoryProducts` object in `script.js`:
