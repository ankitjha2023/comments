const form = document.getElementById('form')
const username = document.getElementById('name')
const message = document.getElementById('message')
const commentBox = document.getElementById('comment-box')

const firebaseConfig = {
    apiKey: "AIzaSyCqrgPswgnKxurUDG5uddVFTU6WNlbBwmo",
    authDomain: "contactform-7923f.firebaseapp.com",
    databaseURL: "https://contactform-7923f-default-rtdb.firebaseio.com",
    projectId: "contactform-7923f",
    storageBucket: "contactform-7923f.appspot.com",
    messagingSenderId: "289789965569",
    appId: "1:289789965569:web:1604542d0314517eadd700",
    measurementId: "G-ZW0DG5QBFJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("comments");

// Function to add a comment to the comment box
function addComment(comment) {
  let div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `
    
   
    <h5 class="card-title">${comment.name}</h5>
    <p class="card-text">${comment.message}</p>
   
  `;
  commentBox.appendChild(div);
 
}

// Function to retrieve and display all comments
function retrieveComments() {
  
    ref.on("value", function(snapshot) {
       // Clear existing comments before displaying
       commentBox.innerHTML=""
      snapshot.forEach(function(childSnapshot) {
        var comment = childSnapshot.val();
        addComment(comment);
        
      });
    });
   
   
  }
  

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let comment = {
    name: username.value,
    message: message.value
  }
  pushComment(comment)
  
  form.reset()
})

// Function to push a comment to the Firebase database
function pushComment(comment) {
  ref.push(comment);
}

// Call the retrieveComments function when the page loads
retrieveComments()
