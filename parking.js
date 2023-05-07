var parkingLocations = {
	location1: 15,
	location2: 25,
	location3: 10
};

function populateParkingSpots() {
	var location = document.getElementById("location").value;
	var numSpots = parkingLocations[location];
	var parkingSpotDropdown = document.getElementById("parkingSpot");
	
	// Clear current options
	parkingSpotDropdown.innerHTML = "";
	
	// Add available spots
	for (var i = 1; i <= numSpots; i++) {
		if (localStorage.getItem(location + "-" + i) === null) {
			var option = document.createElement("option");
			option.value = i;
			option.text = "Spot " + i;
			parkingSpotDropdown.add(option);
		}
	}
}

function reserveSpot() {
	var location = document.getElementById("location").value;
	var licensePlate = document.getElementById("licensePlate").value;
	var parkingSpot = document.getElementById("parkingSpot").value;
	var time = document.getElementById("time").value;
	
	// Check if all fields are filled
	if (licensePlate === "" || parkingSpot === "" || time === "") {
		document.getElementById("message").innerHTML = "Please fill in all fields";
		return;
	}
	
	// Check if parking spot is already reserved
	if (localStorage.getItem(location + "-" + parkingSpot) !== null) {
		document.getElementById("message").innerHTML = "This parking spot is already reserved";
		return;
	}
	
    let extra = 0;
    if (document.getElementById("extra").checked) {
        extra = 500;
    }
	// Prompt user for payment
	var paymentConfirmed = confirm("The cost for " + time + " hour(s) is ₹" + ((time * 50)+extra) + ".\n\nConfirm payment?");
	if (!paymentConfirmed) {
		document.getElementById("message").innerHTML = "Payment not confirmed";
		return;
	}
	
	// Reserve parking spot
	var now = new Date();
	var reservationTime = now.getTime();
	localStorage.setItem(location + "-" + parkingSpot, licensePlate + "," + reservationTime + "," + time);
	
	// Display success message
	document.getElementById("message").innerHTML = "Your parking spot has been reserved";
	
	// Update available spots
	populateParkingSpots();
}

function clearAll() {
	var confirmClear = confirm("Are you sure you want to clear all reservations?");
	if (confirmClear) {
		// Clear all reservations
		localStorage.clear();
		
		// Update available spots
		populateParkingSpots();
		
		// Display success message
		document.getElementById("message").innerHTML = "All reservations have been cleared";
	}
}
window.onload = populateParkingSpots;
function openModal() {
    var modal = document.getElementById("bookedSpotsModal");
    modal.showModal();
    viewBookedSpots();
}

function closeModal() {
    var modal = document.getElementById("bookedSpotsModal");
    modal.close();
    var bookedSpots = document.getElementById("bookedSpots");
    bookedSpots.innerHTML = "";
}
function viewBookedSpots() {
    var bookedSpots = document.getElementById("bookedSpots");
    bookedSpots.innerHTML = "";

    for (var location in parkingLocations) {
        if (parkingLocations.hasOwnProperty(location)) {
            var numSpots = parkingLocations[location];
            var list = document.createElement("ul");
            var locationHeader = document.createElement("h3");
            locationHeader.innerHTML = location==="location1"?"West Mambalam":location==="Location 2"?"Porur":"Kovilambakkam";
            list.appendChild(locationHeader);

            for (var i = 1; i <= numSpots; i++) {
                var reservation = localStorage.getItem(location + "-" + i);
                if (reservation !== null) {
                    var reservationParts = reservation.split(",");
                    var licensePlate = reservationParts[0];
                    var reservationTime = new Date(parseInt(reservationParts[1]));
                    var time = reservationParts[2];

                    var listItem = document.createElement("li");
                    listItem.innerHTML = "Spot " + i + " - " + licensePlate + " - Reserved on " + reservationTime.toLocaleString() + " for " + time + " hour(s)";
                    list.appendChild(listItem);
                }
            }

            if (list.childNodes.length > 1) {
                bookedSpots.appendChild(list);
            }
        }
    }
}
