let hourS=document.getElementById("hour");
let minuteS=document.getElementById("minute");
let secS=document.getElementById("sec");
let amPm=document.getElementById("amPm");
let audio=new Audio('music.mp3');

let alarmlsList=document.getElementById("list");
let setHour=document.getElementById('setHour');
let setMinute=document.getElementById('setMinute');
let setSec=document.getElementById('setSec');
let daynight=document.getElementById("daynight");
let set=document.getElementById('set');
let delete_var=document.getElementsByClassName('delete');

let addAlarmarray=[];




//realtime cloak//

function liveClock(){
 
    setInterval(()=>{
        let time=new Date();
        let hour=time.getHours();
        let min=time.getMinutes();
        let sec=time.getSeconds();
        let am_pm="AM";
// adjusting time according to 12 hour format
        if(hour>12){
            hour-=12;
            am_pm="PM";
        }
        if(hour==0){
            hour=12;
            am_pm="AM"
        }

hour=hour<10 ? "0"+hour : hour;
min=min<10  ?  "0"+min: min;
sec=sec<10 ? "0"+sec:sec;

//playing the alarm
let currentTime=hour+":"+min+":"+sec+" "+am_pm;
for(let i=0; i<addAlarmarray.length; i++){
    if(currentTime===addAlarmarray[i].time){
        audio.play();
        setTimeout(()=>{
            audio.pause();
        },60000)
    }
}

hourS.innerText=hour+": ";
minuteS.innerText=min+": "
secS.innerText=sec+"  ";
amPm.innerText=am_pm;
    },1000);
   

};

//rederring function//

function addAlarmToDom(alarms){
const li=document.createElement("li");

li.innerHTML=`

${alarms.time}
<button type="button" data-id="${alarms.id}" class="delete">Delete</button>

`;
alarmlsList.append(li);

}

function renderlist(){
    alarmlsList.innerHTML="";
    for(let i=0; i<addAlarmarray.length;i++){
        addAlarmToDom(addAlarmarray[i]);
    }
};


// seting alarm function//

function setAlarm(){

if(setHour.value>12||setHour.value<1||setMinute.value>60||setMinute.value<0||setSec.value>60||setSec.value<0||setMinute.value==="00"||setSec.value==="00"){
    console.log(alert("wrong input entered"));
    document.forms[0].reset();
}

else if(setHour.value===""||setMinute.value===""||setSec.value===""||daynight.value===""){
    console.log(alert("All inputs are not entered"));
    document.forms[0].reset();
}else{
let timeString=returnTimestring( setHour.value,setMinute.value,setSec.value,daynight.value);
const alarm={
    time:timeString,
    done:false,
    id:Date.now().toString()
}


addAlarm(alarm);
//this is for the reseting the value of the alarm input
document.forms[0].reset();
}

};


//adding alarm in the list 

function addAlarm(alarm){
    if(alarm){
    addAlarmarray.push(alarm);
    renderlist();
    alert("Alarm is  added");

    }else{
        console.log(alert("Alarm is not added"));
    }
}


//deleteing alarms from the list

function deleteAlarm(alarmId){
    audio.pause();
const newAddAlarmArray=addAlarmarray.filter((alarm)=>
{ return alarm.id!==alarmId});

addAlarmarray=newAddAlarmArray;
renderlist();
console.log(alert("Delete Alarm succssesful"))

};



//alarm stoping button
function stopAlarm(){
audio.pause();

};


//geting time in a defined form

function returnTimestring(hour,min,sec,zone){
if(hour[0]==="0"&&hour<10){
    //nochange
hour=hour;
if(hour==="0"){
    hour="0"+hour;
}
} 
   if(hour[0]!=="0" && hour<10){
        hour="0"+hour;
    }
    if(min[0]==="0"&&  min<10){
      min=min;
      if(min==="0"){
        min="0"+min;
    }
    }
    if(min[0]!=="0"&& min<10){
        min="0"+min;
    }if(sec[0]==="0"&& sec<10){
        sec=sec;
        if(sec==="0"){
            sec="0"+sec;
        }
    }
    if(sec[0]!=="0" && sec<10){
        sec="0"+sec;
    }
    return `${hour}:${min}:${sec} ${zone}`;
}
liveClock();

//event deligation
function handleEventlistner(e){
    const target=e.target;
  
    if(target.className==="delete"){
    const alarmId=target.dataset.id;
    deleteAlarm(alarmId);
    }
    else if(target.id==="set"){
        setAlarm();
    }else if(target.id==="stop"){
        stopAlarm();
    }
}
document.addEventListener("click",handleEventlistner);
