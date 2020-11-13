var queryString = new Array();
if(queryString.length == 0){
  if(window.location.search.split('?').length > 1){
    var params = window.location.search.split('?')[1].split('&');
    for(var i = 0;i < params.length; i++){
      var key = params[i].split('=')[0];
      var value = params[i].split('=')[1];
      value = decodeURIComponent(value);
      value += '==';
      var decrypted = CryptoJS.AES.decrypt(value, "secret pswd");
      console.log('value: ',value);
      console.log('decrypted: ',decrypted);
      var tmp = {
        key: key,
        value: value,
        decrypted: decrypted.toString(CryptoJS.enc.Utf8)
      };
      queryString[i] = tmp;
    }
  }
  var mode = [];
  for(var i=0;i<queryString.length;i++){
    if(queryString[i].key == 'useremail'){
      localStorage.email = queryString[i].value;
    }
    else if(queryString[i].key == 'username'){
      localStorage.username = queryString[i].value;
    }
    else if(queryString[i].value == 'online==' || queryString[i].value == 'online'){
      mode.push('online');
    }
    else if(queryString[i].value == 'offline=='){
      mode.push('offline');
    }
    else if(queryString[i].value == 'trainer=='){
      mode.push('trainer');
    }
  }
  localStorage.mode = mode;
  console.log('mode : ',localStorage.mode);
  localStorage.loggedIN = true;
}
