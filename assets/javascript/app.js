$(document).ready(function(){

  // Initialize Firebase
  // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCTJNQM6jGJJEJpTWrwoXEVkm8S0i8WCa4",
      authDomain: "train-scheduler-ac5c8.firebaseapp.com",
      databaseURL: "https://train-scheduler-ac5c8.firebaseio.com",
      projectId: "train-scheduler-ac5c8",
      storageBucket: "train-scheduler-ac5c8.appspot.com",
      messagingSenderId: "606506514161",
      appId: "1:606506514161:web:a331d7f67b10bf43"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  

  

  //Declaring a variable to store the database info.................
  var database = firebase.database();

  //Initializing the variables .....................
  var trainName = "";
  var trainDestination = "";
  var trainFrequency = 0;
  var trainTime = "";
  var clickCounter = 1;

  //Capturing the add train button click.................
  $("#add-train").on("click", function(event){
      event.preventDefault();
      if ($("#train-input").val(),$("#destination-input").val(),$("#time-input").val(), $("#frequency-input").val() === "") {
          alert("Please input data in all fields.");

      // } else if ($("#time-input").val() > 24) {
      //     //An alert is displayed when the user enters a time more than 24.........................
      //     alert("Pls enter the 24 hr time format and time cannot be greater than 24.");
      } else {
               
          //Declaring the variables that will hold the user input values..............................
          trainName = $("#train-input").val().trim();
          trainDestination = $("#destination-input").val().trim();
          trainTime = $("#time-input").val().trim();
          trainFrequency = $("#frequency-input").val().trim(); 


          //Console log to see if the variables are holding the user input values........................
          console.log("Input Values");
          console.log(trainName);
          console.log(trainDestination);
          console.log(trainTime);
          console.log(trainFrequency);

          //Creating a temporary object for holding train details
          var trainDetail = {
              name : trainName,
              destination : trainDestination,
              frequency : trainFrequency,
              time : trainTime
          };

          //Push the train data to the database
          database.ref().push(trainDetail);
      
          //Console log testing script
          console.log("Temporary object train values");
          console.log(trainDetail.name);
          console.log(trainDetail.destination);
          console.log(trainDetail.frequency);
          console.log(trainDetail.time);      
      
          //Alert
          alert("A new train details has been added..");        

          //Clear all the values from the input area when the submit button is clicked
          $("#train-input").val("");
          $("#destination-input").val("");
          $("#time-input").val("");
          $("#frequency-input").val("");
      }
  });
      
  //Create a firebase event for adding train to the database and a row to the html
  database.ref().on("child_added", function(childSnapshot, prevChildKey){
      console.log("Hello2");
      console.log(childSnapshot.val());
      
      //Store to a variable
      var trainNumber = clickCounter++;
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var trainFrequency = childSnapshot.val().frequency;

      //console log script
      console.log("database train value");
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(trainFrequency);

      //Use moment.js to convert the first train arrival time to
      // var trainTimeConvert = moment(trainTime, "HH:mm").subtract(1, "years");
      // console.log("trainTimeConvert", + trainTimeConvert);

      // //Use moment.js to show current time
      // var currentTime = moment();

      // //Use moment.js to show the difference in time between the first train arrival and the current time
      // var diffTime  = moment().diff(trainTimeConvert, "minutes");
      // console.log(diffTime);

      // var remainder = diffTime % trainFrequency;
      // console.log("Remainder: " + remainder);

      // //Use moment.js to calculate the time remaining for the train to arrive
      // var timeRemain = trainFrequency - remainder;
      // console.log("Time Remain: " + timeRemain);

      // //Use moment.js to calculate the next train arrival time
      // var newTrainTime = moment().add(timeRemain, "minutes");
      // var newTrainTimeFormat = moment(newTrainTime).format("HH:mm");

      //Declaring a variable that will hold the dynamically created rows and table data elements with its values.......
      var row = $(("<tr class = 'tableRow'><td>" + trainNumber + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency  + "</td><td>"/* + newTrainTimeFormat  + "</td><td>" + timeRemain + "</td></tr>"*/));

      //Appending the row to the table body
      $(".tableBody").append(row);
  });  

});

