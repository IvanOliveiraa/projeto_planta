var firebaseConfig = {
    apiKey: "AIzaSyCri56p0MMtJx-IPCLGLpTmrbHwe8fc7G4",
    authDomain: "smart-plant-31c10.firebaseapp.com",
    databaseURL: "https://smart-plant-31c10-default-rtdb.firebaseio.com",
    projectId: "smart-plant-31c10",
    storageBucket: "smart-plant-31c10.appspot.com",
    messagingSenderId: "47058542532",
    appId: "1:47058542532:web:f2493730f47a09788e4e91",
    measurementId: "G-GRLJMEDX0J"
  };
 
  firebase.initializeApp(firebaseConfig);



$(document).ready(function(){
    var database = firebase.database();
	var BOMBA_STATUS;
	
	var dataRef1 = database.ref('UMIDADE');

	  
	  dataRef1.on('value', function(getdata1){
	  	var umi = getdata1.val();
		var status = "";
		var imgplanta = "img/planta.png";
		if (umi>=90){
			var status = "Cheia";
			var imgplanta = "img/planta90.png";
		} else if(umi<90 && umi>=40){
			var status = "Saudável";
			var imgplanta = "img/planta40-80.png";
		} 
		else if(umi<40 && umi>=10){
			var status = "Com Sede";
			var imgplanta = "img/planta40-10.png";
		}
		else if(umi<10){
			var status = "Morrendo";
			var imgplanta = "img/planta10.png";
		}
		
		document.getElementById('status').innerHTML =  status ;
	  	document.getElementById('UMIDADE').innerHTML =  umi + "%";
	  	document.getElementById("barra").value = umi;
		document.getElementById('planta-img').src =  imgplanta ;

	  })

	database.ref().on("value", function(snap){
		BOMBA_STATUS = snap.val().BOMBA_STATUS;
		if(BOMBA_STATUS == "1"){  
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
		} else {
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
		}
	});

    $(".toggle-btn").click(function(){
		var firebaseRef = firebase.database().ref().child("BOMBA_STATUS");

		if(BOMBA_STATUS == "1"){    
			firebaseRef.set("0");
			BOMBA_STATUS = "0";
			
		} else {
			firebaseRef.set("1");
			BOMBA_STATUS = "1";
		}
	})
});
