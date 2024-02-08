function submitForm() {
    var name = document.getElementById("input_name").value;
    var phone = document.getElementById("input_phone_number").value;
    var email = document.getElementById("input_email").value;

    // Create a JavaScript object with the form data
    var formData = {
        name: name,
        phone_number: phone,
        email: email
    };

    // Convert the JavaScript object to a JSON string
    var jsonData = JSON.stringify(formData);

    // AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/reserve", true);
    
    // Set the Content-Type header to application/json
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Success");
            } else {
                console.error("Error");
            }
        }
    };

    // Send the JSON data in the request body
    xhr.send(jsonData);
}
