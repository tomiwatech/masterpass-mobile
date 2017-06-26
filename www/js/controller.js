angular.module('starter')

.controller('SignatureCtrl', function($scope,$ionicPopup,$state,$stateParams,$ionicHistory) {

    $scope.transHistory = JSON.parse(localStorage.getItem("transHistory")) || [];
    $scope.transInfo = {};

	$scope.$on('$ionicView.beforeEnter', function(e, data) {

        if(data.stateName === "register") {

        	$ionicHistory.clearCache();
        	var canvas = document.getElementById('signatureCanvas');
		    var signaturePad = new SignaturePad(canvas);
		 
		    $scope.clearCanvas = function() {
		        signaturePad.clear();
		    }
		 
		    $scope.saveCanvas = function() {
		        var sigImg = signaturePad.toDataURL();
		        $scope.signature = sigImg;
		    }
        }

        if (data.stateName === "qrcode") {
           
           $scope.merchantName = $stateParams.merchant;
           $scope.randi = $stateParams.randomNumber;

        }
    });

    
   $scope.settings = {
     comp :'',
     address:'',
     design:'',
     email:'',
     cc:'',
     bcc:''
   }


   $scope.clear = function(){
     $ionicHistory.clearCache();
	  $state.go('register');
   }

    $scope.generateQR = function(settings){
    	

     	if( settings.comp === "" || settings.address === "" || settings.design === ""){

	      	$ionicPopup.alert({
	        	title: 'Important',
		        template: 'The company name, company address and designation fields are important'
		    });
        	return;
   		}


   	function getRandom(length) {

       return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

     }

     $scope.random = getRandom(8);         



        // var merchantInfo = JSON.parse(localStorage.getItem("merchantInfo")) || {};
        // angular.extend($scope.transInfo, merchantInfo);

        // $scope.transInfo = {

        // 	"transAmt":"",
        // 	"merchantID":"398784933499",
        // 	"mIDType":"00"

        // }
        
        // var now = new Date();
        // var transDate = (now.getDay() + 1) + "/" + (now.getMonth() + 1) + "/" 
        //         + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();
        // var historyEntry = {"amt": $scope.transInfo.transAmt, "desc": $scope.transInfo.oData, "date": transDate};
        // $scope.transHistory.push(historyEntry);
        // localStorage.setItem('transHistory', JSON.stringify($scope.transHistory))
        // console.log($scope.transInfo);
        $state.go("qrcode", {
            "transInfo": $scope.transInfo,
            "merchant": $scope.settings.comp,
            "randomNumber": $scope.random
        }); 


    }

 

$scope.sendmail = function(settings){

	$scope.path = "file://img/live_qr.PNG";

	if (settings.email === "") {
		   	$ionicPopup.alert({
	        	title: 'Important',
		        template: 'The email field is mandatory'
		    });
        	return;
	}

	// if (window.plugins && window.plugins.emailComposer) {
 //       window.plugins.emailComposer.showEmailComposerWithCallback(function(result){
 //          alert(JSON.stringify(result));
 //          alert("Message Sent Successfully");

 //       },
 //           "Feedback for your App", // Subject
 //            "Hello Sanni,This mail is from Ionic. Pleae Find Attachments",                      // Body
 //            [$scope.settings.email],    // To
 //            null,                    // CC
 //            null,                    // BCC
 //            false,                   // isHTML
 //            [$scope.path],                    // Attachments
 //            null                     //attachment data
 //       )
	// }

	  	$ionicPopup.alert({
	        	title: 'Important',
		        template: 'Email sent'
		    });
        




}












});