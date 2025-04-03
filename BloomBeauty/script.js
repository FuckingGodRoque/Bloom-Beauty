/* General body styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4; /* Light background for contrast */
    margin: 0;
    padding: 0;
}

/* Modal styles */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
}

/* Modal content */
.modal-content {
    background-color: #fff; /* White background for modal */
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888; /* Border for the modal */
    width: 300px; /* Width of the modal */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
}

/* Close button */
.cerrar {
    color: #aaa; /* Gray color */
    float: right; /* Right align */
    font-size: 28px; /* Font size */
    font-weight: bold; /* Bold text */
}

.cerrar:hover,
.cerrar:focus {
    color: black; /* Change color on hover */
    text-decoration: none; /* No underline */
    cursor: pointer; /* Pointer cursor */
}

/* Form styles */
form {
    display: flex;
    flex-direction: column; /* Stack inputs vertically */
}

/* Input styles */
input[type="email"],
input[type="password"] {
    padding: 10px;
    margin: 10px 0; /* Space between inputs */
    border: 1px solid #ccc; /* Light border */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
}

/* Button styles */
.btn {
    padding: 10px;
    margin: 10px 0; /* Space between buttons */
    border: none; /* No border */
    border-radius: 4px; /* Rounded corners */
    color: white; /* White text */
    cursor: pointer; /* Pointer cursor */
    font-size: 16px; /* Font size */
}

.btn.pink {
    background-color: #e91e63; /* Pink background */
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

/* Divider styles */
.divider {
    text-align: center;
    margin: 10px 0; /* Space around divider */
    color: #888; /* Gray color */
}