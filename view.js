window.onload = function () {
  var loader = document.getElementById("loader-wrapper");
  loader.style.display = "none"; // Hide the loader once everything is loaded
};

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with the class 'toggle-email'
  var toggleButtons = document.querySelectorAll(".toggle-email");

  // Loop through each button
  toggleButtons.forEach(function (button) {
    // Add a click event listener to each button
    button.addEventListener("click", function () {
      // Get the sibling email element
      var emailElement = this.nextElementSibling;

      // Toggle the 'visible' class on the email element
      emailElement.classList.toggle("visible");
    });
  });
});

function toggleMenu() {
  var navbar = document.getElementById("navbar");
  if (navbar.style.left === "0px") {
    navbar.style.left = "-250px"; // Hide
  } else {
    navbar.style.left = "0px"; // Show
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

function rejected() {
  const imageUrl = this.dataset.imageUrl; // Get image URL from data attribute
  alert(`Rejecting document with image URL: ${imageUrl}`); // Use template literal for string interpolation
  const json = {
    url: imageUrl,
    approved: -1,
    date: "2021-02-21",
  };

  console.log(json);

  fetch("https://flask-heroku-server-3.onrender.com/rej", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).finally(() => {
    setTimeout(function () {
      location.reload();
      // window.location.href = "view.html"
    }, 100); // Reload the page after 100 milliseconds
  });
}

function fn(x) {
  return x;
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("heelo");

  fetch("https://flask-heroku-server-3.onrender.com/view-doc")
    .then((response) => {
      console.log("Response:", response);
      return response.json();
    })
    .then((data) => {
      // Get the main container
      var mainContainer = document.getElementById("Parent");

      // Loop through the data and create sections
      // console.log(data.length());
      for (var i = 0; i < data.length; i++) {
        // Create a new section element
        var section = document.createElement("section");
        section.id = "contentPreview" + i; // You can set a unique ID for each section if needed
        section.className = "CARDS";

        // Create and append the image container
        var imageContainer = document.createElement("div");
        imageContainer.id = "imageContainer";
        var previewImage = document.createElement("img");
        previewImage.id = "previewImage";
        previewImage.src = data[i].image_url;
        previewImage.alt = "Preview Image";
        imageContainer.appendChild(previewImage);
        section.appendChild(imageContainer);

        // Create and append the text container
        var textContainer = document.createElement("div");
        textContainer.id = "textContainer" + i;
        var textHeading = document.createElement("h3");
        textHeading.textContent = data[i].description;
        textContainer.appendChild(textHeading);
        section.appendChild(textContainer);

        var dateContainer = document.createElement("h3");
        dateContainer.textContent = data[i].date;
        section.appendChild(dateContainer);

        // Create and append the buttons container
        var buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        var editButton = document.createElement("button");
        // Edit Button Creation with New Styling
        editButton.className = "edit-button"; // Apply the custom button class
        editButton.innerHTML = `<svg class="edit-svgIcon" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>`;

        editButton.id = "editB";
        // editButton.textContent = "Edit";

        (function (index) {
          editButton.addEventListener("click", function () {
            var dt = index;
            console.log(dt);
            var encodedData = encodeURIComponent(dt);
            window.location.href = "edit2.html?data=" + encodedData;
          });
        })(i);

        var rejectButton = document.createElement("button");
        rejectButton.className = "delete-button"; // Apply the custom button class

        rejectButton.innerHTML = `<svg viewBox="0 0 448 512" class="delete-svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>`;

        rejectButton.id = "rejectB";
        rejectButton.addEventListener("click", rejected); // Pass the function reference
        rejectButton.dataset.imageUrl = data[i].url; // Store image URL in a data attribute
        // rejectButton.textContent = "Reject";
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(rejectButton);
        section.appendChild(buttonsContainer);

        // Append the section to the main container
        mainContainer.appendChild(section);
      }
    })
    .catch((error) => console.error("Error:", error));
});

const buttons = document.querySelectorAll(".btn");
const body = document.body;
