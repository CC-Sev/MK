function submitForm() {
    var name = document.getElementById("input_name").value;
    var phone = document.getElementById("input_phone_number").value;
    var email = document.getElementById("input_email").value;

    var guests = document.getElementsById("num_guests").value;
    var day = document.getElementsById("day").value;
    var time = document.getElementsById("time").value;
    var datetime = day + " " + time;

    // Create a JavaScript object with the form data
    var formData = {
        name: name,
        phone_number: phone,
        email: email,

        num_guests: guests,
        reservation_datetime: datetime
    };

    // Convert the JavaScript object to a JSON string
    var jsonData = JSON.stringify(formData);

    // AJAX POST request
    var xhr = new XMLHttpRequest();
    //xhr.open('POST', "http://127.0.0.1:5000/reserve_post", true);
    
    // Set the Content-Type header to application/json
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Success");
                console.error("Succes, but Error");
            } else {
                console.log("Error");
                console.error("Error");
            }
        }
    };
    // Send the JSON data in the request body
    print("Form jsonData: " + jsonData)
    xhr.send(jsonData);
}