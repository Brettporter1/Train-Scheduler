var config = {
    apiKey: "AIzaSyCZfMqfaQKCltGdZWduip7vZN7wyfty6Lc",
    authDomain: "train-scheduler-8b233.firebaseapp.com",
    databaseURL: "https://train-scheduler-8b233.firebaseio.com",
    projectId: "train-scheduler-8b233",
    storageBucket: "train-scheduler-8b233.appspot.com",
    messagingSenderId: "719930280874",
    appId: "1:719930280874:web:6207b1eea95a57662f39d3"
  };
  
firebase.initializeApp(config);
var database = firebase.database();

database.ref().on('child_added', function(schedule){
    trainSchedule = schedule.val()
    newTrain = $('<tr>');
    newTrain.append(`<td class="pr-5">${trainSchedule.name}</td><td class="pr-5">${trainSchedule.destination}</td><td class="pr-5">${trainSchedule.frequency}</td>`);
    $('#train-schedule tbody').append(newTrain);
})

$('#submit-button').on('click',function(event){
    event.preventDefault();
    var trainName = $('#train-name').val().trim();
    var destination = $('#train-destination').val().trim();
    var time = $('#train-time').val().trim();
    var frequency = $('#train-frequency').val().trim();
    var nextArrival = 

    database.ref().push({
        name:trainName,
        destination:destination,
        time:time,
        frequency:frequency
    });
    console.log(trainName);
})
