// Confirm that JS script is connected.
console.log('script is connected.');

// function that runs API "GETS" all friend data
function getFriends() {
	// Step 1: Ajax API call to "GET" friend data
	$.ajax({
		url: 'https://randomuser.me/api/?results=10',
		dataType: 'json',
		success: function(data) {
			// Check to see data is returned from API in console log
			console.log(data);
			// Pass data from API into a new variable
			let friends = data.results;
			// Checkt to confirm data is now associated with vairable
			console.log(friends);
			// Map friend data to cards that will be displayed on the home page
			friends.forEach(newCard);
		}
	});

	// Step 2: Declare another function that will create a new card from the data returned
	// This function is nested inside of our main getFriends() function
	// Our function has 2 arguements that we will use as placeholder for that data we'll be using
	function newCard(friend, index) {
		// To make our card we'll need to create a new div dynamically
		let potentialFriendCard = document.createElement('div');
		// set the unique idenifer of the card to the index of the data
		potentialFriendCard.id = index;
		// Give the card a class name to identify it for our stylesheet
		potentialFriendCard.className = 'friendCard';

		// create an image element for our card
		let cardImg = document.createElement('img');
		// apply the src attribute to our card so that we can display the profile image
		cardImg.src = friend.picture.large;
		cardImg.className = 'image';

		// Create a new element that will go inside our card that will contain our content
		let pfContent = document.createElement('div');

		// Create a class that we'll use for our content
		pfContent.className = 'content';

		// Attach our image to our new content div
		potentialFriendCard.appendChild(cardImg);

		// the text we'll use for our card
		let cardBody = document.createTextNode(friend.name.first);

		// Attach the content to the body
		pfContent.appendChild(cardBody);

		// Attach the content to the card
		potentialFriendCard.appendChild(pfContent);

		// Creating a dynamic button
		let button = document.createElement('button');
		button.className = 'button';
		button.innerText = 'add friend';
		button.id = index;

		// Apending/ attaching our card to our HTML document dynamically
		document.getElementById('pf').appendChild(potentialFriendCard);

		// Appending/ attaching our dynamic button to our dynamic card
		potentialFriendCard.appendChild(button);

		// Logic for the click event on our button
		document.getElementById(index).addEventListener('click', addFriend);

		// functoin that adds a friend to our friend list
		function addFriend() {
			// Console log confirming that our button and selected friend has been clicked
			console.log('button has been clicked on index ' + index + ' name of friend: ' + friend.name.first);

			// First we remove the selected friend from our potential friend list
			document.getElementById(index).remove();

			// then we create a new card similar to the card above
			let myFriendCard = document.createElement('div');
			myFriendCard.id = index;
			myFriendCard.className = 'friendCard';

			let mfContent = document.createElement('div');
			mfContent.className = 'content';

			mfContent.appendChild(cardBody);

			myFriendCard.appendChild(cardImg);
			myFriendCard.appendChild(mfContent);

			// Agian, we create a dynamic button similar to the one above for removing a friend from our friend list
			let removeFriendBtn = document.createElement('button');
			removeFriendBtn.innerText = 'Remove friend';
			removeFriendBtn.id = index;

			// We attach the card to our html
			document.getElementById('mf').appendChild(myFriendCard);
			myFriendCard.appendChild(removeFriendBtn);

			// And create a new click event listener to remove the friend from out list
			document.getElementById(index).addEventListener('click', removeFriend);

			// Lastly, we have a function that will remove the friend entirely

			function removeFriend() {
				document.getElementById(index).remove();
			}
		}
	}
}

// our function is declared here with this line of code
getFriends();
