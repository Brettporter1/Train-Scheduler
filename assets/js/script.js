const config = {
  apiKey: 'AIzaSyCZfMqfaQKCltGdZWduip7vZN7wyfty6Lc',
  authDomain: 'train-scheduler-8b233.firebaseapp.com',
  databaseURL: 'https://train-scheduler-8b233.firebaseio.com',
  projectId: 'train-scheduler-8b233',
  storageBucket: 'train-scheduler-8b233.appspot.com',
  messagingSenderId: '719930280874',
  appId: '1:719930280874:web:6207b1eea95a57662f39d3',
};

firebase.initializeApp(config);
const database = firebase.database();

const reloadTable = () => {
  $('#train-schedule  tbody').empty();

  database.ref().on('child_added', (schedule) => {
    const key = schedule.key;
    const trainSchedule = schedule.val();
    const timeConverted = moment(trainSchedule.time, 'hh:mm').subtract(
      1,
      'years'
    );
    const timeDiff = moment().diff(moment(timeConverted), 'minutes');
    const timeRemaining = timeDiff % trainSchedule.frequency;
    const minutesAway = trainSchedule.frequency - timeRemaining;
    const nextArrival = moment().add(minutesAway, 'minutes').format('hh:mm');
    newTrain = $('<tr>');
    newTrain.append(
      `<td class="pr-5 the-train">${trainSchedule.name}</td><td class="pr-5">${trainSchedule.destination}</td><td class="pr-5">${trainSchedule.frequency} minutes</td><td class="pr-5">${nextArrival}</td><td class="pr-5">${minutesAway} Minutes away</td><td><button  class="delete-button shadow border-2 border-red-500 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded" data-key="${key}" type="button">delete</button></td>`
    );
    $('#train-schedule tbody').append(newTrain);
  });
};

$('#submit-button').on('click', function (event) {
  event.preventDefault();
  const name = $('#train-name').val().trim();
  const destination = $('#train-destination').val().trim();
  const time = $('#train-time').val().trim();
  const frequency = $('#train-frequency').val().trim();

  if (!name || !destination || !time || !frequency) {
    console.error("Form isn't complete");
  } else {
    database.ref().push({
      name,
      destination,
      time,
      frequency,
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
  this.closest('tr').remove();
});

reloadTable();
