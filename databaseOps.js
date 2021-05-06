'use strict'

// using a Promises-wrapped version of sqlite3
const db = require('./sqlWrap');

// SQL commands for ActivityTable
const insertDB = "insert into ActivityTable (activity, date, amount) values (?,?,?)"
const getOneDB = "select * from ActivityTable where activity = ? and date = ? and amount = ?";
const allDB = "select * from ActivityTable where activity = ?";
const getPlanned = "select * from ActivityTable where amount = ?";
//const all='select * from ActivityTable';
const top1="select * from ActivityTable where amount = ? ORDER BY date DESC";

/*async function testDB () {

  // for testing, always use today's date
  const today = new Date().getTime();

  // all DB commands are called using await

  // empty out database - probably you don't want to do this in your program
  await db.deleteEverything();

  await db.run(insertDB,["running",today,2.4]);
  await db.run(insertDB,["walking",today,1.1]);
  await db.run(insertDB,["walking",today,2.7]);
  
  console.log("inserted two items");

  // look at the item we just inserted
  let result = await db.get(getOneDB,["running",today,2.4]);
  console.log(result);

  // get multiple items as a list
  result = await db.all(allDB,["walking"]);
  console.log(result);
}*/

async function addAct(data){
  await db.run(insertDB,[data['activity'],data['date'],data['scalar']]);
  await db.get(getOneDB,[data['activity'],data['date'],data['scalar']]);
 
 
}

async function getItems(){
  const today = new Date().toISOString().slice(0, 10);
  let weekAgo=new Date();
  //console.log(weekAgo.getDate()-7);
  weekAgo.setDate(weekAgo.getDate()-7);let weekday=new Date(weekAgo).toISOString().slice(0,10);
  let result= await db.all("select * from ActivityTable where amount = ? and date<? and date>? ORDER BY date DESC limit 1 ",-1,today,weekday);
 
   await db.deletePlanned();
 
 // console.log('result',result);
  return(result);
}
//getItems();
async function getWeekAct(dateValue,act){
  let dateValue1=new Date(parseInt(dateValue));
  
  const today = new Date().toISOString().slice(0, 10);
  
  dateValue1.setHours(dateValue1.getHours()-7);
  //console.log('dateValue1',new Date(dateValue1));
  let selectedDate=dateValue1.toISOString().slice(0,10);
  
  let dateWeekAgo=new Date(dateValue1);let how=dateWeekAgo.toISOString().slice(0,10);
  console.log(how);
  dateWeekAgo.setDate(dateWeekAgo.getDate()-7);
  
  let agobigger=new Date(dateWeekAgo).toISOString().slice(0,10);
  
  console.log("checking: Act=",act,'endDate=',selectedDate,'startDate=',agobigger);
  let resultNow=await db.all("select * from ActivityTable where activity=?and date<=? and date>? ",act,selectedDate,agobigger);
  
  if(selectedDate>=today){
    console.log('refuse');
    return ("refuse");
    
    }
  else if(!act){
    let final=await db.get("SELECT * from ActivityTable where date<=? ORDER BY date DESC limit 1",selectedDate);
    console.log('Activity is empty so return: ',final);
    final['state']='0';
    return(final);
  }
  else{
  console.log('return a week:',resultNow);
  if(Object.keys(resultNow).length==0){
  resultNow['state']='1';}
  return(resultNow);}
  
}
//getWeekAct('1619656210561','Run');

module.exports.addAct = addAct;
module.exports.getItems=getItems;
module.exports.getWeekAct=getWeekAct;

