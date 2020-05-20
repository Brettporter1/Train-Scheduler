var config = {
  apiKey: 'AIzaSyCZfMqfaQKCltGdZWduip7vZN7wyfty6Lc',
  authDomain: 'train-scheduler-8b233.firebaseapp.com',
  databaseURL: 'https://train-scheduler-8b233.firebaseio.com',
  projectId: 'train-scheduler-8b233',
  storageBucket: 'train-scheduler-8b233.appspot.com',
  messagingSenderId: '719930280874',
  appId: '1:719930280874:web:6207b1eea95a57662f39d3',
};

firebase.initializeApp(config);
var database = firebase.database();

function reloadTable() {
  $('#train-schedule  tbody').empty();

  database.ref().on('child_added', function (schedule) {
    var key = schedule.key;
    var trainSchedule = schedule.val();
    var timeConverted = moment(trainSchedule.time, 'hh:mm').subtract(
      1,
      'years'
    );
    var timeDiff = moment().diff(moment(timeConverted), 'minutes');
    var timeRemaining = timeDiff % trainSchedule.frequency;
    var minutesAway = trainSchedule.frequency - timeRemaining;
    var nextArrival = moment().add(minutesAway, 'minutes').format('hh:mm');
    newTrain = $('<tr>');
    newTrain.append(
      `<td class="pr-5 the-train">${trainSchedule.name}</td><td class="pr-5">${trainSchedule.destination}</td><td class="pr-5">${trainSchedule.frequency} minutes</td><td class="pr-5">${nextArrival}</td><td class="pr-5">${minutesAway} Minutes away</td><td><button  class="delete-button shadow border-2 border-red-500 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded" data-key="${key}" type="button">delete</button></td>`
    );
    $('#train-schedule tbody').append(newTrain);
  });
}
reloadTable();
$('#submit-button').on('click', function (event) {
  event.preventDefault();
  var trainName = $('#train-name').val().trim();
  var destination = $('#train-destination').val().trim();
  var time = $('#train-time').val().trim();
  var frequency = $('#train-frequency').val().trim();

  if (!trainName || !destination || !time || !frequency) {
    console.error("Form isn't complete");
  } else {
    database.ref().push({
      name: trainName,
      destination: destination,
      time: time,
      frequency: frequency,
      timeAdded: firebase.database.ServerValue.TIMESTAMP,
    });

    $('#train-name').val('');
    $('#train-destination').val('');
    $('#train-time').val('');
    $('#train-frequency').val('');
  }
});

$(document).on('click', '.delete-button', function () {
  keyref = $(this).attr('data-key');
  database.ref().child(keyref).remove();
  reloadTable();
});
