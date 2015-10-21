angular.module('main.controllers', ['starter'])
.controller('MainCtrl', function($scope,$state,UtilsService,MainService,$ionicLoading,$ionicViewService,$localStorage) {

    if(UtilsService.isMob()){
        
        $ionicLoading.show({
          template: 'Carregando servidor de mensagem ...'
        });
                 
       document.addEventListener("deviceready", function () {
            
            $scope.isLoadedMain = true;
            if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
              window.plugins.pushNotification.register(successHandler,errorHandler,
                    {"senderID":"244606470402", "ecb":"onNotificationGCM"});
            }else{
               //alert("IOS");
               
              var model = $cordovaDevice.getModel();

              var platform = $cordovaDevice.getPlatform();

              var uuid = $cordovaDevice.getUUID();

              

                if(model != "x86_64"){
                     window.plugins.pushNotification.register(
                            tokenHandler,
                            errorHandler,
                            {
                                "badge":"true",
                                "sound":"true",
                                "alert":"true",
                                "ecb":"onNotificationAPN"
                            });
               }else{
                  $ionicViewService.nextViewOptions({
                    disableBack: true
                  });

                  $state.go('app.registration');
               
               }
            }
       });
       
       //alert("$scope.isLoadedMain: "+$scope.isLoadedMain);
       
       setTimeout(function(){
         if($scope.isLoadedMain == undefined){
            $ionicViewService.nextViewOptions({
              disableBack: true
            });

            $state.go('app.registration');
         }
      },1000);
      
    }else{
        //alert("@@@");
        $ionicLoading.show({
          template: 'Carregando servidor de mensagem (web) ...'
        });

        $ionicViewService.nextViewOptions({
            disableBack: true
          });



        setTimeout(function(){
          
          $localStorage.devicetoken = 'web';
          $state.go('app.registration');

        },1000);
    }
    
    $scope.sess = $localStorage.token;

});
