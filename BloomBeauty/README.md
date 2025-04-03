### estilologin.css

```css
/* General Modal Styles */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
}

.modal-content {
    background-color: #fff; /* White background */
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888; /* Gray border */
    width: 90%; /* Could be more or less, depending on screen size */
    max-width: 400px; /* Max width for larger screens */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}

/* Close Button */
.cerrar {
    color: #aaa; /* Gray color */
    float: right; /* Right align */
    font-size: 28px; /* Larger font */
    font-weight: bold; /* Bold text */
}

.cerrar:hover,
.cerrar:focus {
    color: black; /* Change color on hover */
    text-decoration: none; /* No underline */
    cursor: pointer; /* Pointer cursor */
}

/* Form Styles */
form {
    display: flex;
    flex-direction: column; /* Stack inputs vertically */
}

input[type="email"],
input[type="password"] {
    padding: 10px; /* Padding inside inputs */
    margin: 10px 0; /* Margin between inputs */
    border: 1px solid #ccc; /* Light gray border */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
}

input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #ff4081; /* Pink border on focus */
    outline: none; /* Remove outline */
}

/* Button Styles */
.btn {
    padding: 10px; /* Padding inside buttons */
    margin: 10px 0; /* Margin between buttons */
    border: none; /* No border */
    border-radius: 4px; /* Rounded corners */
    color: white; /* White text */
    font-size: 16px; /* Font size */
    cursor: pointer; /* Pointer cursor */
}

.btn.pink {
    background-color: #ff4081; /* Pink background */
}

.btn.brown {
    background-color: #795548; /* Brown background */
}

.btn.google {
    background-color: #db4437; /* Google red */
    display: flex; /* Flexbox for icon and text */
    align-items: center; /* Center vertically */
}

.btn.google img {
    margin-right: 8px; /* Space between icon and text */
}

/* Divider Styles */
.divider {
    text-align: center; /* Center text */
    margin: 10px 0; /* Margin above and below */
    font-weight: bold; /* Bold text */
    color: #888; /* Gray color */
}
```

### Instructions to Use the CSS File

1. **Create the CSS File**: Create a new file named `estilologin.css` in the same directory as your `Login.html`.

2. **Link the CSS File**: Update your `Login.html` to link the new CSS file. Replace the existing link to `inicio.css` with the new one, or add it alongside if you want to keep both styles.

   ```html
   <link rel="stylesheet" href="estilologin.css">
   ```

3. **Test the Modal**: Open your `Login.html` in a web browser to see the new styles applied to the login modal.

This CSS will enhance the visual appeal of your login modal, making it more user-friendly and visually consistent with modern web design practices. Adjust colors and styles as needed to better fit your overall design theme.