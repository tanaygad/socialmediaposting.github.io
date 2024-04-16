var recieved_data;
var url_item;

function getDataFromURL() {
    // Get the data parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var data = urlParams.get('data');

    // Display the data on the page
    recieved_data = decodeURIComponent(data);
    // document.getElementById("form_caption_id").value = decodeURIComponent(data);
    
}
getDataFromURL()

function updateData() {
    var capt=document.getElementById('form_caption_id');
    var date1=document.getElementById('start');
    const json = {
        caption:capt.value,
        url:url_item,
        date: date1.value,
    };

    console.log(json);

    return fetch("https://flask-heroku-server-3.onrender.com/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    })
    .finally(() => {
        setTimeout(function () {
            // location.reload();
            window.location.href = "view.html";
        }, 100); // Reload the page after 100 milliseconds
    });
}

window.onload = function () {
    var loader = document.getElementById('loader-wrapper');
    loader.style.display = 'none'; // Hide the loader once everything is loaded
};

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class 'toggle-email'
    var toggleButtons = document.querySelectorAll('.toggle-email');

    // Loop through each button
    toggleButtons.forEach(function (button) {
        // Add a click event listener to each button
        button.addEventListener('click', function () {
            // Get the sibling email element
            var emailElement = this.nextElementSibling;

            // Toggle the 'visible' class on the email element
            emailElement.classList.toggle('visible');
        });
    });
});


function toggleMenu() {
    var navbar = document.getElementById("navbar");
    if (navbar.style.left === '0px') {
        navbar.style.left = '-250px'; // Hide
    } else {
        navbar.style.left = '0px'; // Show
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("heelo");

    fetch('https://flask-heroku-server-3.onrender.com/view-doc')
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        // Get the main container

        // Loop through the data and create sections
        // console.log(data.length());
        console.log(recieved_data);
        for (var i = 0; i < data.length; i++) 
        {
            // Create a new section element
            if(i==recieved_data)
            {
                var ImgContainer = document.getElementById('previewImage');
                ImgContainer.src=data[i].image_url;
                document.getElementById("form_caption_id").value =data[i].description;
                document.getElementById("start").value=data[i].date;
                url_item=data[i].url; 
                break;
            }
        }
    })
    .catch(error => console.error('Error:', error));
});







// document.getElementById('rejectB').addEventListener('click', function() {
//     console.log('working');
//     alert('Content rejected!'); // Placeholder for rejection logic
    
//     // Additional logic can be added for handling rejection actions or feedback

// });
 
const buttons = document.querySelectorAll('.btn');
const body = document.body;


// Initially call the buttonClickHandler for the default active button

