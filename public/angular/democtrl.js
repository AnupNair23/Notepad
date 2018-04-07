// Demo controller
var app = angular.module('trixDemo', ['angularTrix', 'config', 'ngCookies', 'ui-notification','ngSanitize']);

app.run(function ($window) {
    if (!(localStorage.token)) {

    } else {
        var token = localStorage.token;
        console.log("token", token);
        var encodedProfile = token.split('.')[1];

        var profile = JSON.parse(url_base64_decode(encodedProfile));
        console.log("admin profile", profile);
        //   console.log("profile._doc.civilId" , profile._doc.civilId);
        var profile1 = Object.keys(profile);
        var count = profile1.length;
        console.log("count", count);

        console.log("profile1", profile1);
        if (profile.userCategory != 'admin') {
            window.location.href = '/Login';
        } else {

        }
    }
});


function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output);
}


var address = config_module._invokeQueue[0][2][1].LOGIN_URL;
var baseAddress = config_module._invokeQueue[0][2][1].BASE_URL;


var url = "";

app.factory('textFactory', function ($http, $window) {

    return {

        addText: function (currenttext) {

            url = address + "AddText/";
            return $http.post(url, currenttext);
        },
        getText: function () {
            url = address + "GetText";
            return $http.get(url);
        },


        updateText: function (currentTxts) {
            console.log("currentTxts==== ",currentTxts);
            console.log("currentTxts.id==",currentTxts.id);
         //   console.log("gottext===",gottext);
            url = address + "UpdateBlogPost/";
            return $http.put(url, currentTxts);
            
        },
        
        edittext: function (id) {
            console.log("id===",id);
            url = address + "GetTextDetails/" + id;
            return $http.get(url);
        }

    }


})

app.controller('trixDemoCtrl', function ($scope, textFactory, $http, $window, $location) {

    //   $scope.trix = '<div>Lorem ipsum dolor sit amet,<strong>consectetur</strong>adipiscing elit<del>Praesent lacus diam</del>, fermentum et venenatis quis, suscipit sed nisi. In pharetra sem eget orci posuere pretium.<em>Integer</em>non eros<strong><em>scelerisque</em></strong>, consequat lacus id, rutrum felis. Nulla elementum felis urna, at placerat arcu ultricies in.</div><ul><li>Proin elementum sollicitudin sodales.</li><li>Nam id erat nec nibh dictum cursus.</li></ul><blockquote>In et urna eros. Fusce molestie, orci vel laoreet tempus, sem justo blandit magna, at volutpat velit lacus id turpis.<br>Quisque malesuada sem at interdum congue. Aenean dapibus fermentum orci eu euismod.</blockquote><div></div>';


    var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];

    for (var i = 0; i < events.length; i++) {
        $scope[events[i]] = function (e) {
            console.info('Event type:', e.type);
        }
    };

    var createStorageKey, host, uploadAttachment;

    $scope.trixAttachmentAdd = function (e) {
        var attachment;
        attachment = e.attachment;
        if (attachment.file) {
            return uploadAttachment(attachment);
        }
    }



    $scope.postForm = function () {

        var currenttext = this.texts;
        console.log("currenttext=== ", currenttext);
        console.log("currenttext.text ====", currenttext.text);
        //    console.log("currenttext.trix === ",currenttext.trix);


        textFactory.addText(currenttext).success(function (data) {
            //     $scope.addMode = false;
            currenttext = data;


            console.log("Success");

            //reset form
         //   $scope.text = null;

            //    $window.location.reload();



        }).error(function (data) {

            console.log("Could not add text")

        });

    };


    // DISPLAY THE TEXT
    
    textFactory.getText().success(function (data) {
        console.log("text data == ", data);
        $scope.Text = data;

        $scope.realtext = null;
          

        $scope.realtext  = $scope.Text[0].Textbox;
        $scope.realtextid = $scope.Text[0]._id;
        
  console.log("$scope.Text === ", $scope.Text);
  console.log("$scope.realtextid=== ", $scope.realtextid);
       console.log("$scope.realtext === ", $scope.realtext);

    })


      // update text
  
  $scope.updateform = function (id,text) {
    var idofpost = id;
    var gottext = text;
    console.log("idofpost==== ", idofpost);
    console.log("gottext==== ", gottext);

var form = [];
   
    textFactory.edittext(idofpost).success(function (data) {
        $scope.foredit = data;
        form = data;
        console.log("$scope.foredit===", $scope.foredit);
        console.log("form === ", form);
        
        //$rootScope.myPost=currentPostid;
               
                   
                })
                var currentText = [];
                var currentText = this.foredit;
                console.log("foredit==== ", $scope.foredit);
                console.log("currentText==== ", currentText);

                textFactory.updateText($scope.foredit).success(function (data) {

                    if (data) {
                        console.log("Updated" );
                      //  $window.location.reload();
                    } 
                })


    
 }

 

});