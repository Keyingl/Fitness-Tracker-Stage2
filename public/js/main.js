

import dataFinal from './data.js'
import barchart from './barchart.js'
 barchart.init('graphForm', 500, 300);
let array = [
  {
    'date': 1617624000000,
    'value': 0,
  },
  {
    'date': 1617710400000,
    'value': 0,
  },
  {
    'date': 1617796800000,
    'value': 0,
  },
  {
    'date': 1617883200000,
    'value': 0,
  },
  {
    'date': 1617969600000,
    'value': 0,
  },
  {
    'date': 1618056000000,
    'value': 0,
  },
  {
    'date': 1618142400000,
    'value': 0,
  },
];
let recentDay = new Date();
recentDay.setDate(recentDay.getDate() - 1);
let recentDay1 = new Date(recentDay).getTime();
let passDay = new Date(recentDay1);
let newDay = convertDate(passDay);
console.log(newDay);
document.getElementById('weekEnd').value = newDay;
let activityNow = document.getElementById('viewActivity');
activityNow.value = "";
document.getElementById('chart-anchor').style.display = 'none';


document.getElementById('chart').addEventListener('click', function() {
  document.getElementById('chart-anchor').style.display = 'block';
  //let displa=document.getElementById('chart-anchor');

  //console.log('data',dataFinal);


  fetch(`/week?date=${recentDay1}&activity=${activityNow.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },//body: JSON.stringify(data), 
  })
    .then(response => response.json())
    .then(data => {
      console.log('data is ', data);
      console.log('now', JSON.stringify(data));

      //console.log(new Date(data['0']['date']),data['0']['amount']);
      let acti = '';
      let when = document.getElementById('weekEnd').value;
      let lastDay = new Date(when).getTime();

      for (var i = 0; i < 7; i++) {
        array[6 - i].date = lastDay - i * 86400000;
      }
      if (data.state == '0') {
        console.log('only one json');
        acti = data['activity'];
        array[6]['date'] = new Date(data.date).getTime();
        array[6]['value'] = data.amount;
      } else {
        console.log('more than one json');
        let acti = data['0']['activity'];
        for (var i in data) {
          array[6 - i].date = new Date(data[i].date).getTime();
          array[6 - i]['value'] = data[i].amount;
        }

        var unit;
        switch (acti) {
          case 'Walk': case 'Run': case 'Bike':
            unit = 'kms';
            break;
          case 'Swim':
            unit = 'laps';
            break;
          case 'Yoga': case 'Soccer': case 'Basketball':
            unit = 'minutes';
            break;
          default:
            unit = 'units';
        }


      }
      console.log(array);
      //let answer=append(data);
      let string1 = `${unit} ${acti}`;
     
      barchart.render(array, string1, 'Day of the Week');
    })
    .catch((error) => {
      console.error('Error:', error);
    })
})

document.getElementById('Close').addEventListener('click', function() {
  document.getElementById('chart-anchor').style.display = 'none';
})

//barchart.init('graphForm', 500, 300);
//let data=[7,3,1,6,2,0,0];
//barchart.render(data, 'Kilometers Run', 'Day of the Week');

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}


document.getElementById('go').addEventListener('click', function() {
  let activityN = document.getElementById('viewActivity').value;
  let when = document.getElementById('weekEnd').value;

  var newList=[
    {
        'date': 3,
        'value': 0,
    },
    {
        'date': 4,
        'value': 0,
    },
    {
        'date': 4,
        'value': 0,
    },
    {
        'date': 4,
        'value': 0,
    },
    {
        'date': 3,
        'value': 0,
    },
    {
        'date': 2,
        'value': 0,
    },
    {
        'date': 11618142400000,
        'value': 0,
    },
];
console.log('rightNow',newList[0]);
  fetch(`/week?date=${new Date(when).getTime()}&activity=${activityN}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },//body: JSON.stringify(data), 
  })
    .then(response => response.json())
    .then(data => {
      console.log('data is ', data);
      console.log('now', newList);

      //console.log(new Date(data['0']['date']),data['0']['amount']);
      //let acti='';
      let lastDay = new Date(when).getTime();
      for (var i = 0; i < 7; i++) {
        newList[6 - i]['date'] = lastDay - i * 86400000;
        console.log('go through');
      }
      console.log('soFar', newList);
      if (data.state == '0') {
        console.log('only one json');
        //acti=data['activity'];
        newList[6]['date'] = new Date(data.date).getTime();
        newList[6]['value'] = data.amount;
      } else if (Object.keys(data).length == 0) {
        for (var i = 0; i < 7; i++) {
          newList[i].value = '0';
        }
      }
      else {
        console.log('more than one json');
        //acti=data['0']['activity'];
        for (var i in data) {
          newList[6 - i].date = new Date(data[i].date).getTime();
          newList[6 - i]['value'] = data[i].amount;
        }
      }

      var unit;
      switch (activityN) {
        case 'Walk': case 'Run': case 'Bike':
          unit = 'kms';
          break;
        case 'Swim':
          unit = 'laps';
          break;
        case 'Yoga': case 'Soccer': case 'Basketball':
          unit = 'minutes';
          break;
        default:
          unit = 'units';
      }



      console.log(newList);
      //let answer=append(data);
      let string1 = `${unit} ${activityN}`;

      barchart.render(newList, string1, 'Day of the Week');
    })
    .catch((error) => {
      console.error('Error:', error);
    })
})