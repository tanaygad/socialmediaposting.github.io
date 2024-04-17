// window.onload = function () {

// };

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

var imageUrl1;
var imageUrl2;
var imageUrl3;
var url1;
var url2;
var url3;
var description1;
var description2;
var description3;

document.addEventListener('DOMContentLoaded', function () {
    console.log("heelo");

    fetch('https://flask-heroku-server-3.onrender.com/get-image-url')
        .then(response => {
            console.log('Response:', response);
            var loader = document.getElementById('loader-wrapper');
            loader.style.display = 'none'; // Hide the loader once everything is loaded
            return response.json();
        })
        .then(data => {
            console.log(data)
            //imageUrl = "https://clubartizen.com/wp-content/uploads/2023/07/Toran-upcycled-300x300.jpg"
            imageUrl1 = data.image_url1
            description1 = data.description1;   // product 
            imageUrl2 = data.image_url2
            description2 = data.description2;   // craft
            imageUrl3 = data.image_url3
            description3 = data.description3;   // blog
            const button1 = document.getElementById('products');
            const button2 = document.getElementById('craft-stories');
            const button3 = document.getElementById('blogs');
            const isButton1Active = button1.classList.contains('active');
            // const isButton2Active = button2.classList.contains('active');
            // const isButton3Active = button3.classList.contains('active');

            // if (isButton2Active) {
            //     document.getElementById('previewImage').src = imageUrl2;
            //     const textContainer = document.getElementById('textContainer');
            //     textContainer.textContent = description2;
            // }


            if (isButton1Active) {
                document.getElementById('previewImage').src = imageUrl1;
                const textContainer = document.getElementById('textContainer');
                textContainer.textContent = description1;
            }



            // if (isButton3Active) {
            //     document.getElementById('previewImage').src = imageUrl3;
            //     const textContainer = document.getElementById('textContainer');
            //     textContainer.textContent = description3;
            // }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('editButton').addEventListener('click', function () {
    // window.location.href = 'edit.html'; // Redirects to the edit page
    var data = document.getElementById('textContainer').textContent;

    // Encode the data to be included in the URL
    var encodedData = encodeURIComponent(data);

    // Redirect to the second page with data as a parameter
    window.location.href = "edit.html?data=" + encodedData;
});

document.getElementById('scheduleButton').addEventListener('click', function () {
    const dateControl = document.querySelector('input[type="date"]');
    console.log(dateControl.value)
    if (dateControl.value == "2018-07-22") {
        alert('Enter a schedule date first before approving')
        document.getElementById("platformChoice").style.display = "none";
        document.getElementById('contentPreview').style.display = 'block';
    }
    else {
        document.getElementById('contentPreview').style.display = 'none';
        document.getElementById('platformChoice').style.display = 'block'; // Show platform choices
    }
});

document.getElementById('approveButton').addEventListener('click', function () {
    const dateControl = document.querySelector('input[type="date"]');
    console.log(dateControl.value)
    var checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
    var checkedCheckboxes = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.id);
        }
    });
    if (checkedCheckboxes.length == 0) {
        alert('Error: Select atleast 1 platform.')
    }
    else {
        var val = 0;
        if (checkedCheckboxes.length == 2) {
            if (checkedCheckboxes[0] === "Insta" && checkedCheckboxes[1] == "Fb")
                val = 4;
            else if (checkedCheckboxes[0] === "Insta" && checkedCheckboxes[1] == "Story")
                val = 5;
        }
        else if (checkedCheckboxes.length == 1) {
            if (checkedCheckboxes[0] === "Insta")
                val = 1;
            else if (checkedCheckboxes[0] === "Fb")
                val = 2;
            else
                val = 3
        }
        else val = 6;
        console.log(checkedCheckboxes)
        // Insta == 1 ; Facebook == 2 ; Both Fb and Insta == 4; Story only = 3; Story and Insta Post = 5;
        const button1 = document.getElementById('products');
        const button2 = document.getElementById('craft-stories');
        const button3 = document.getElementById('blogs');
        const isButton1Active = button1.classList.contains('active');
        const isButton2Active = button2.classList.contains('active');
        const isButton3Active = button3.classList.contains('active');
        // document.getElementById('contentPreview').style.display = 'block';
        // document.getElementById('platformChoice').style.display = 'none'; // Show platform choices

        fetch('https://flask-heroku-server-3.onrender.com/get-image-url')
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                url1 = data.url1;
                url2 = data.url2;
                url3 = data.url3;
                var url_1;
                if (isButton2Active) {
                    url_1 = url2;
                }
                if (isButton1Active) {
                    url_1 = url1;
                }
                if (isButton3Active) {
                    url_1 = url3;
                }

                const json = {
                    url: url_1,
                    approved: val,
                    date: dateControl.value,
                };

                console.log(json);

                return fetch("https://flask-heroku-server-3.onrender.com/send-approval", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(json),
                });
            })
            .then(response => {
                if (response.ok) {
                    console.log('Data successfully sent to /send-approval');
                    // Handle success as needed
                } else {
                    console.error('Failed to send data to /send-approval');
                    // Handle failure as needed
                }
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                setTimeout(function () {
                    location.reload();
                }, 100); // Reload the page after 100 milliseconds
            });
    }
    // setTimeout(function() {
    //     location.reload();
    //   }, 100);
});

function schedulePost() {
    // Prompt the user to enter the scheduled date
    const scheduledDate = document.getElementById("scheduledDate").value;

    // Store the selected date in a variable or perform further actions
    console.log("Scheduled Date:", scheduledDate);
}

function postToPlatform(platform) {
    alert(`Post approved and will be uploaded to ${platform}.`);
    document.getElementById("platformChoice").style.display = "none";
    document.getElementById('contentPreview').style.display = 'block';
}

document.getElementById('rejectButton').addEventListener('click', function () {
    console.log('working');
    alert('Content rejected!'); // Placeholder for rejection logic

    // Additional logic can be added for handling rejection actions or feedback
    const button1 = document.getElementById('products');
    const button2 = document.getElementById('craft-stories');
    const button3 = document.getElementById('blogs');
    const isButton1Active = button1.classList.contains('active');
    const isButton2Active = button2.classList.contains('active');
    const isButton3Active = button3.classList.contains('active');
    fetch('https://flask-heroku-server-3.onrender.com/get-image-url')
        .then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(data => {
            url1 = data.url1;
            url2 = data.url2;
            url3 = data.url3;
            var url_1;
            if (isButton2Active) {
                url_1 = url2;
            }
            if (isButton1Active) {
                url_1 = url1;
            }
            if (isButton3Active) {
                url_1 = url3;
            }

            const json = {
                url: url_1,
                approved: -1,
                date: "2021-02-21",
            };

            console.log(json);

            return fetch("https://flask-heroku-server-3.onrender.com/send-approval", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            });
        })
        .then(response => {
            if (response.ok) {
                console.log('Data successfully sent to /send-approval');
                // Handle success as needed
            } else {
                console.error('Failed to send data to /send-approval');
                // Handle failure as needed
            }
        })
        .catch(error => console.error('Error:', error));
});

const buttons = document.querySelectorAll('.btn');
const body = document.body;

function buttonClickHandler() {
    // Call your specific function here
    console.log('Button clicked:', this.id);

    // Make all buttons inactive
    buttons.forEach(btn => btn.classList.remove('active'));

    // Make the clicked button active
    this.classList.add('active');

    // Reset background color for the body
    body.classList.remove('blue-bg', 'red-bg', 'yellow-bg');

    // Set background color based on the clicked button
    switch (this.id) {
        case 'blogs':
            body.classList.add('blue-bg');
            break;
        case 'craft-stories':
            body.classList.add('red-bg');
            break;
        case 'products':
            body.classList.add('yellow-bg');
            break;
        default:
            break;
    }

    const button1 = document.getElementById('products');
    const button2 = document.getElementById('craft-stories');
    const button3 = document.getElementById('blogs');
    const isButton1Active = button1.classList.contains('active');
    const isButton2Active = button2.classList.contains('active');
    const isButton3Active = button3.classList.contains('active');

    if (isButton2Active) {
        document.getElementById('previewImage').src = imageUrl2;
        const textContainer = document.getElementById('textContainer');
        textContainer.textContent = description2;
    }


    if (isButton1Active) {
        document.getElementById('previewImage').src = imageUrl1;
        const textContainer = document.getElementById('textContainer');
        textContainer.textContent = description1;
    }
    if (isButton3Active) {
        document.getElementById('previewImage').src = imageUrl3;
        const textContainer = document.getElementById('textContainer');
        textContainer.textContent = description3;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', buttonClickHandler);
});

// Initially call the buttonClickHandler for the default active button
buttonClickHandler.call(document.querySelector('.active'));

