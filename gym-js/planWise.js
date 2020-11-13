var mode = localStorage.mode;
alert(mode);
mode = mode.split(',');
console.log(mode);
var offlineDiv = document.getElementById('offlineDiv');
offlineDiv.style.display = 'hidden';
offlineDiv.style.visibility = 'hidden';
var valoff = document.getElementById('valoff');
var onlineDiv = document.getElementById('onlineDiv');
onlineDiv.style.display = 'hidden';
onlineDiv.style.visibility = 'hidden';
var valon = document.getElementById('valon');
var trainerDiv = document.getElementById('trainerDiv');
trainerDiv.style.display = 'hidden';
trainerDiv.style.visibility = 'hidden';
var valtra = document.getElementById('valtra');
if(Array.isArray(mode) == true){
  alert('inside array');
  var num = 0;
  for(var i=0;i<mode.length;i++){
    if(mode[i] == 'online'){
      alert('inside online');
      onlineDiv.style.display = 'block';
      onlineDiv.style.visibility = 'visible';
      valoff.innerHTML = '0' + num;
      num++;
    }
    else if(mode[i] == 'offline'){
      offlineDiv.style.display = 'block';
      offlineDiv.style.visibility = 'visible';
      valon.innerHTML = '0' + num;
      num++;
    }
    else if(mode[i] == 'trainer'){
      trainerDiv.style.display = 'block';
      trainerDiv.style.visibility = 'visible';
      valtra.innerHTML = '0' + num;
      num++;
    }
  }
}
else{
  alert('inside not array');
  if(mode == 'online'){
    onlineDiv.style.display = 'block';
    onlineDiv.style.visibility = 'visible';
  }
  else if(mode == 'offline'){
    offlineDiv.style.display = 'block';
    offlineDiv.style.visibility = 'visible';
  }
  else if(mode == 'trainer'){
    trainerDiv.style.display = 'block';
    trainerDiv.style.visibility = 'visible';
  }
}
