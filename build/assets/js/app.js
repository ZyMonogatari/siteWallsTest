(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    //Facebook
    'facebook',
    //maps
    'ngMap',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
  .config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('1791808034167547');
    })
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

  function config($urlProvider, $locationProvider, $stateProvider) {
    $urlProvider.otherwise('/');
    $stateProvider.state('wblog', {
            url: "/wblog",
            //templateUrl: 'wblog/index.php'
            controller: 'blogCtrl'
        })
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('/!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();

angular.module('application').controller('blogCtrl',
  ['$scope', '$window', '$state', function($scope, $window,$state){
    window.location = 'http://wallsbarbershop.com.mx/wblog/'; 
}]);

angular.module('application').controller('contactoCtrl',
  ['$scope', '$window', '$state', function($scope, $window,$state){
    document.title = "Contacto - Wall´s Barbershop";
    $scope.cabecera = {};
   $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
     $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.background = 'rgba(255, 255, 255, .9)';
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $window.onscroll = function(event){
    	if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.iconColor = '#333';
          $scope.cabecera.fontColor = 'black';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
        if(window.scrollY <= 5){
          $scope.cabecera.position = 'absolute';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
            
          $scope.cabecera.top = '3%';
          $scope.logoTransform = 'scale(1, 1)';
          $scope.$apply();
        }
        if((document.getElementById('contact-container-BounceIn').getBoundingClientRect().top + 00) <= screen.height){
        	angular.element(document.querySelector('#contact-container-BounceIn')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('contacto-form-bounceIn1s').getBoundingClientRect().top + 100) <= screen.height){
        	angular.element(document.querySelector('#contacto-form-bounceIn1s')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('contact-container2-bounceIn').getBoundingClientRect().top + 100) <= screen.height){
        	angular.element(document.querySelector('#contact-container2-bounceIn')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('titulo-fadeInLeftBig-2s').getBoundingClientRect().top + 00) <= screen.height){
        	angular.element(document.querySelector('#titulo-fadeInLeftBig-2s')).addClass('fadeInLeftBig2s');
    	}
    }
}]);

angular.module('application')
.factory('$dbApi', function($http){
    var baseUrl = 'http://www.wallsbarbershop.com.mx/php/';

    var post = function(url, body){
      body = body || {};
      return $http.post(baseUrl+url, body);
    }
    var get = function(url){
      return $http.get(baseUrl+url);
    }

    return {
      registUser : function(regist){
       return get('insertForm.php?name=' + regist.name + '&lastname=' + regist.lastname + '&email=' + regist.email + '&birthday=' + regist.birthday +
        '&sucursal=' + regist.sucursal + '&phone=' + regist.phone + '&state=' + regist.state +'&card=' + regist.card + '&password=' + regist.password);
      },
      getClientData : function(clientData){
        return get('getClientInfo.php?cardMail=' + clientData.cardMail + '&password=' + clientData.password);
      },
      insertConcursantesMexicano : function(concursante){
        return get('InsertConcursantesMexicanoQueSeRespeta.php?name=' + concursante.name + 
          '&age=' + concursante.age + '&phone=' + concursante.phone + '&email=' 
          + concursante.email + '&ciudad=' + concursante.ciudad + '&medio=' 
          +concursante.medio + '&sucursal=' + concursante.sucursal);
      },
      checkEmail : function(email){
        return get('emailCheckerMexicano.php?email=' + email);
      },
      updatePass : function(params){
        return get('updatePass.php?email=' + params.email + '&newPass=' + params.pass + '&card=' + params.card);
      }
    }
  });
angular.module('application').controller('franquiciasCtrl',
  ['$scope', '$window', 'NgMap', '$state', '$messageApi', 'FoundationApi', function($scope, $window, NgMap, $state, $messageApi, FoundationApi){
    document.title = "Franquicias - Wall´s Barbershop";    
    $scope.displaySesionN = 'none';
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.message = {};
    $scope.send = function(){
        FoundationApi.publish('main-notifications', { title: 'Mensaje enviado', content: 'Se ha enviado su mensaje, muchas gracias'});
       //$messageApi.sendMessage($scope.message);
    }

    $scope.scroll = function(){
        var elementTop = document.getElementById('info-bounce').getBoundingClientRect().top;
        elementTop = elementTop + 100;
        window.scrollTo(0, elementTop);
    }

    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.logoTransform = '';
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';
    angular.element(document.querySelector('#bounceIn')).addClass('bounceIn2s');
    angular.element(document.querySelector('#bounceIn-button')).addClass('bounceIn3s');
    
   $window.onscroll = function(event){
        var delayTime = 100;
    if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
    if(window.scrollY <= 5){
        $scope.cabecera.position = 'absolute';
        angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
        angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.cabecera.fontColor = 'white';
        $scope.iconColor = 'white';
        $scope.cabecera.source = '/assets/img/logo.png';
        $scope.$apply();
      }
    if((document.getElementById('fadeInLeft-logo').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#fadeInLeft-logo')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('fadeIn-text').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#fadeIn-text')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('single1').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#single1')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single2').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#single2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single3').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#single3')).addClass('fadeInUp1s');
    }
    if((document.getElementById('fadeInLeftBig-title').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#fadeInLeftBig-title')).addClass('fadeInLeftBig2s');
    }
    if((document.getElementById('fadeInLeft-text').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#fadeInLeft-text')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('single2').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#single2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single-area2').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#single-area2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('info-bounce').getBoundingClientRect().top + delayTime) <= screen.height){
        angular.element(document.querySelector('#info-bounce')).addClass('bounceIn1s');
    }    
   }
}]);

angular.module('application').controller('galeriaCtrl',
  ['$scope', '$window', 'FoundationApi', '$sce', '$state', function($scope, $window, FoundationApi, $sce, $state){
    document.title = "Galería - Wall´s Barbershop";
    var galleryIndex;
    $scope.cabecera = {};
    $scope.displaySesionN = 'none';
    $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
    $scope.cabecera.position = 'absolute';
    $scope.cabecera.fontColor = 'black';
    $scope.actualBody = 1;
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.iconColor = '#333';
    $scope.leftArrow = true;
    $scope.rightArrow = true;
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.actualVideo = $sce.trustAsResourceUrl(
     'https://www.youtube.com/embed/yGQljG8kJvo?modestbranding=1&autohide=1&showinfo=0');
    $scope.changeVideo =  function(videoId){
      console.log(videoId);
      $scope.actualVideo = $sce.trustAsResourceUrl(
     'https://www.youtube.com/embed/' + videoId + '?modestbranding=1&autohide=1&showinfo=0');
    
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    $scope.fullGallery = [
      '/assets/img/galeria/1.jpg',
      '/assets/img/galeria/3.jpg',
      '/assets/img/galeria/2.jpg',
      '/assets/img/galeria/9.jpg',
      '/assets/img/galeria/4.jpg',
      '/assets/img/galeria/7.jpg',
      '/assets/img/galeria/6.jpg',
      '/assets/img/galeria/13.jpg',
      '/assets/img/galeria/5.jpg',
      '/assets/img/galeria/8.jpg',
      '/assets/img/galeria/20.jpg',
      '/assets/img/galeria/21.jpg', 
      '/assets/img/galeria/12.jpg',
      '/assets/img/galeria/24.jpg',
      '/assets/img/galeria/10.jpg'
    ];
    $scope.gallery = {
      col1: [
        '/assets/img/galeria/1.jpg',
        '/assets/img/galeria/3.jpg',
        '/assets/img/galeria/2.jpg',
        '/assets/img/galeria/9.jpg',
        '/assets/img/galeria/4.jpg'
      ],
      col2: [
        '/assets/img/galeria/7.jpg',
        '/assets/img/galeria/6.jpg',
        '/assets/img/galeria/13.jpg',
        '/assets/img/galeria/5.jpg',
        '/assets/img/galeria/8.jpg'
      ],
      col3: [
        '/assets/img/galeria/20.jpg',
        '/assets/img/galeria/21.jpg', 
        '/assets/img/galeria/12.jpg',
        '/assets/img/galeria/24.jpg',
        '/assets/img/galeria/10.jpg'        
      ]
    };
    $scope.openModal = function(image){
      $scope.actualImage = image;
      $scope.rightArrow = true;
      $scope.leftArrow = true;
      galleryIndex = $scope.fullGallery.indexOf(image);
      if(galleryIndex == 0){
        $scope.leftArrow = false;
      }
      if(($scope.fullGallery.length - 1) == galleryIndex){
        $scope.rightArrow = false;
      }
    }
      
    $scope.prevImg = function(){
      $scope.rightArrow = true;
      if(galleryIndex > 0){
        galleryIndex--;
        $scope.actualImage = $scope.fullGallery[galleryIndex];
      }
      if(galleryIndex == 0){
        $scope.leftArrow = 0;
      }
    }

    $scope.nextImg = function(){
      $scope.leftArrow = true;
      if(galleryIndex < ($scope.fullGallery.length - 1)){
        galleryIndex++;
        $scope.actualImage = $scope.fullGallery[galleryIndex];
      }
      if(galleryIndex == ($scope.fullGallery.length - 1)){
        $scope.rightArrow = false;
      }
    }
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $window.onscroll = function(event){
    
    if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.top = '0px';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
    if(window.scrollY <= 5){
        $scope.cabecera.position = 'absolute';
        angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
        angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.$apply();
      }
    /*if((document.getElementById('cuerpo2').getBoundingClientRect().top -50)  <= 0){
      $scope.actualBody = 3;
      $scope.$apply();
    }*/
    for(var i = 0; i < document.getElementsByClassName('galleryBox').length; i++){
      if((document.getElementsByClassName('galleryBox')[i].getBoundingClientRect().top + 50) <= screen.height & screen.width > 768){
          angular.element(document.getElementsByClassName('galleryBox')[i]).addClass('appear');
      }
    }
  }
}]);

angular.module('application').controller('homeCtrl',
  ['$scope', '$window', 'NgMap', '$state',  '$timeout', '$sharedData',  function($scope, $window, NgMap, $state, $timeout, $sharedData){
    
    window.mobileAndTabletcheck = function() {
     var check = false;
     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
     return check;
   };
   $scope.sucursalInfoDiv;
    $scope.selectSucursal;
    $scope.mapCenter = "21.848025, -98.605808";
    $scope.telefonoMarginTop = null;
    $scope.mapSucursalDiv = '110px';
    $scope.whatsappMarginTop = null;
    $scope.hideInfoDiv = function(marker, param, key){
        $scope.sucursalInfoDiv = false;
        if(param){
            $scope.showInfoDiv(key);
        }
    }
    $scope.showInfoDiv =function(key){
        if(key){
            //console.log('centrando')
            $scope.selectSucursal = $scope.sucursales[key];
            if(!$scope.selectSucursal.whatsapp){
                $scope.telefonoMarginTop = '7px'
            }
            else{
                $scope.telefonoMarginTop = null;
            }
            if(!$scope.selectSucursal.telefono){
                $scope.whatsappMarginTop = '7px'
            }
            else{
                $scope.whatsappMarginTop = null;
            }
            var x = parseFloat($scope.selectSucursal.x) ;
            console.log($scope.selectSucursal.x, x);
            //$scope.mapCenter = "0,0";

            $scope.mapCenter = $scope.selectSucursal.y + "," + x;
        }
        $timeout(function(){
            $scope.sucursalInfoDiv = true;
        }, 500);
        
    }

   $scope.mobile = window.mobileAndTabletcheck();
   console.log($scope.mobile);
    $scope.mostrarMenu = function (){
        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }

    $scope.displaySesionN = 'none';

    $scope.goMap = function(){
      console.log("click de sucursal")
      window.scrollTo(0,0);      
      $state.go('sucursales').then(function(){
        $window.location.reload();
        var top =  document.getElementById('map').getBoundingClientRect().top
        console.log(top);
          window.scrollTo(0, top);
         
        });
    }
    $scope.go = function(state){
        window.scrollTo(0, 0);
        $state.go(state);
    }
    $scope.gotoRegist = function(){
        window.scrollTo(0,0);        
        $state.go('wallsCard').then(function(){
          var elementTop= document.getElementById('bounceInForm1s').getBoundingClientRect().top -300;
          window.scrollTo(0, elementTop);
        });
    }
     $scope.gotoLogin = function(){
        window.scrollTo(0,0);        
        $state.go('wallsCard').then(function(){
          var elementTop= document.getElementById('bounceInPointsForm1s').getBoundingClientRect().top +50;
          window.scrollTo(0, elementTop);
        });
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    
    $scope.sucursales = $sharedData.getSucursales();
    
   

    $scope.navBarBackground = 'red';
    var cuerpo2top = document.getElementById('cuerpo2').getBoundingClientRect().top;
    $scope.actualBody = 0;

    //static scenes values
    var cabeceraStaticWidth = 1440; 
    var body1StaticWidth = 1440;
    var fixedStaticWidth = 2000;

    //cabecera resize
    var cabeceraImageWidth = screen.width / cabeceraStaticWidth;
    var cabeceraHeight = 833 * cabeceraImageWidth;
    $scope.cabeceraHeight =  cabeceraHeight + 'px';
    //fondo-fixed resize

    var fixedImageWidth = screen.width / fixedStaticWidth;
    var fixedHeight = 1333 * fixedImageWidth;
    $scope.fixedHeight = fixedHeight + 'px';


    //body1 position & resize
    var body1ImageWidth = screen.width/ body1StaticWidth;
    var body1Height;
    if(screen.width <= 414){
      body1Height = 2300 * body1ImageWidth;
    }
    else{
      body1Height = 2000 * body1ImageWidth;
    }
    var body1Top = (cabeceraHeight/4) * 3;
    $scope.body1Top = body1Top + 'px';
    $scope.body1Height = body1Height + 'px';    
    
    //body 2 position & resize
    var body2Top = body1Height + cabeceraHeight + (cabeceraHeight/9) * 8;

    $scope.body2Top = body2Top + 'px';
    console.log($scope.body2Top);
    //body 3 position & resize
    var body3Top = body1Height + body2Top;
    $scope.body3Top = body3Top + 'px';

    /*
    //browser events
    $window.onresize = function(event) {
      $window.location.reload();
    }*/

   $window.onscroll = function(event){
    if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
          angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
          angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
          angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
          angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
    if(window.scrollY <= 5){
        $scope.cabecera.position = 'absolute';
        angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
        angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.cabecera.fontColor = 'white';
        $scope.iconColor = 'white';
        $scope.cabecera.source = '/assets/img/logo.png';
        $scope.$apply();
      }
    if((document.getElementById('cuerpo1').getBoundingClientRect().top) <= -100){
      $scope.actualBody = 1;
      $scope.$apply();
    } else if((document.getElementById('cuerpo1').getBoundingClientRect().top) >=0){
      $scope.actualBody = 0;
      $scope.$apply();
    }
    if((document.getElementById('cuerpo2').getBoundingClientRect().top) <= -100){
      $scope.actualBody =2;
      $scope.$apply();
    } else if((document.getElementById('cuerpo2').getBoundingClientRect().top) <= -50 ){
      $scope.actualBody = 1;
      $scope.$apply();
    }
    /*if(window.scrollY >= cuerpo2top){
      $scope.actualBody = 2;
      console.log('cuerpo2');
      $scope.$apply();
    }
    else if(window.scrollY <= (cuerpo2top) & window.scrollY >= (body1Height/2) ){
      $scope.actualBody = 1;
      $scope.$apply();
    }*/
   }
}]);

angular.module('application')
.factory('$messageApi', function($http){
    var baseUrl = 'http://www.wallsbarbershop.com.mx/php/';

    var post = function(url, body){
      body = body || {};
      return $http.post(baseUrl+url, body);
    }
    var get = function(url){
      return $http.get(baseUrl+url);
    }

    return {
      sendMessage : function(message){
        console.log(message);

       return get('sendMessage.php?name=' + message.name + '&phone=' + message.phone + '&state=' + message.state +'&why=' + message.why + '&email=' + message.email + '&empresa=' + message.empresa + '&address=' + message.address);
      },
      sendEmailMexicano : function(email){
        return get('mexicano_que_se_respeta_mailer.php?email=' + email);
      },
      sendPasswordCode : function(cardMail){
        return get('passwordRecovery.php?cardMail=' + cardMail);
      }
    }
  });
angular.module('application').controller('mexicanoCtrl',
  ['$scope', '$window', '$state', 'Facebook', '$dbApi', '$messageApi', function($scope, $window,$state, Facebook, $dbApi, $messageApi){
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
    $scope.cabecera.position = 'absolute';
    $scope.cabecera.fontColor = 'black';
    $scope.iconColor = 'white';
    $scope.concursante;
    $scope.dataReceived;
    $scope.registed;
    $scope.terms;
    $scope.concursante = {};
    $scope.mostrarMenu = function (){
        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.closeModal = function(){
      $scope.concursante = {};
      FB.logout(function(response) {
      });
      $scope.dataReceived = false;

    }
    $scope.go = function(state){
        window.scrollTo(0, 0);
        $state.go(state);
    }
    $scope.login = function() {
      FB.login(function(response) {
        me();
      });
    };
    var me = function() {
      Facebook.api('/me?fields=id,name,email,age_range' , function(response) {
        $scope.concursante.name = response.name;
        $scope.concursante.email = response.email.trim();
        $scope.concursante.age = response.age_range.min;
        $dbApi.checkEmail($scope.concursante.email).then(function(emailResponse){
         console.log(emailResponse);
          if(emailResponse.data =='error'){
              $scope.dataReceived = true;
              $scope.registed = false;
          }
        });
      });
    };
    $scope.displayTerms = function(){

      if(!$scope.terms){
        angular.element(document.querySelector('#terms-div')).removeClass('slide-down');
        angular.element(document.querySelector('#terms-div')).addClass('slide-up');
        $scope.terms = true;
      }else{
        angular.element(document.querySelector('#terms-div')).removeClass('slide-up');
        angular.element(document.querySelector('#terms-div')).addClass('slide-down');
        $scope.terms = false;
      }
    }

    $scope.sendData = function(){
      $dbApi.insertConcursantesMexicano($scope.concursante).then(function(response){
        $scope.dataReceived = true;
        if(response.data == 'exito'){
          $scope.registed = true;
        }
        else{
          $scope.registed = false;
        }
      });

    }

    $scope.sendToMail = function(){
      $messageApi.sendEmailMexicano($scope.concursante.email);
    }

    $window.onscroll = function(event){
    if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
    if(window.scrollY <= 5){
        $scope.cabecera.position = 'absolute';
        angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
        angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.$apply();
      }
    }
}]);

angular.module('application').controller('serviciosCtrl',
  ['$scope', '$window', '$state', function($scope, $window, $state){
    document.title = "Servicios - Wall´s Barbershop";
    $scope.displaySesionN = 'none';
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
	var cuerpoAbsoluteTop;
    var cuerpo1TopInicial = document.getElementById('cuerpo1-servicios').getBoundingClientRect().top;

  	$scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.actualBody = 0;
    $scope.cuerpo1 = {};
    $scope.cuerpo1.position = 'absolute';
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';
    $window.onscroll = function(event){
    	//console.log(document.getElementById('foto-fila-1').getBoundingClientRect().bottom + " - " + screen.height);
    	//console.log(document.getElementById('cuerpo1-servicios').getBoundingClientRect());
    	if((document.getElementById('foto-fila-1').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-1')).addClass('slide-left-to-right2s');
    	}
    	if((document.getElementById('texto-fila-1').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-1')).addClass('slide-right-to-left2s');
    	}
    	if((document.getElementById('foto-fila-2').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-2')).addClass('slide-right-to-left2s');
    	}
    	if((document.getElementById('texto-fila-2').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-2')).addClass('slide-left-to-right2s');
    	}
    	if((document.getElementById('foto-fila-3').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-3')).addClass('slide-left-to-right2s');
    	}
    	if((document.getElementById('texto-fila-3').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-3')).addClass('slide-right-to-left2s');
    	}
    	if((document.getElementById('foto-fila-4').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-4')).addClass('slide-right-to-left2s');
    	}
    	if((document.getElementById('texto-fila-4').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-4')).addClass('slide-left-to-right2s');
    	}
    	if((document.getElementById('foto-fila-5').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-5')).addClass('slide-left-to-right2s');
    	}
    	if((document.getElementById('texto-fila-5').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-5')).addClass('slide-right-to-left2s');
    	}
    	if((document.getElementById('borde').getBoundingClientRect().top) <= 0){
    		if(!cuerpoAbsoluteTop){
    			cuerpoAbsoluteTop = document.getElementById('cuerpo-absolute').getBoundingClientRect().top;
    		}
    		console.log("Top: " + cuerpoAbsoluteTop);
    		$scope.cuerpo1.position = 'fixed';
    		if(screen.width >= 800){
    			$scope.cuerpo1.top = '100px';
    		}
    		else{
    			$scope.cuerpo1.top = '0px';
    		}
	      	$scope.$apply();

    	}
    	if((cuerpoAbsoluteTop - 10) <= document.getElementById('cuerpo-absolute').getBoundingClientRect().top){
    		$scope.cuerpo1.position = 'absolute';
    		$scope.cuerpo1.top = cuerpo1TopInicial;
	      	$scope.$apply();
    	}
	    if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.iconColor = '#333';
          $scope.cabecera.fontColor = 'black';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
        if(window.scrollY <= 5){
          $scope.cabecera.position = 'absolute';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
            
          $scope.cabecera.top = '3%';
          $scope.logoTransform = 'scale(1, 1)';
          $scope.cabecera.fontColor = 'white';
          $scope.iconColor = 'white';
          $scope.cabecera.source = '/assets/img/logo.png';
          $scope.$apply();
        }
	    if(window.scrollY >= 1600)
	    {
	    	$scope.actualBody = 1;
	    	$scope.cuerpo1.display = 'none'
	    	$scope.$apply();
	    } else if(window.scrollY <= 1600){
	    	$scope.actualBody = 0;
	    	$scope.cuerpo1.display = 'initial'
	    	$scope.$apply();
	    }
   }
}]);
angular.module('application')
.factory('$sharedData', function(){
    var sucursales = {
        bonampak : {
            nombre: 'WALL\'S BONAMPAK',
            shortName: 'BONAMPAK - CANCUN',
            direccion: 'SM 4 MZA 3 Plaza Atlantis, Av. Bonampak con Av. Kukulcán, Frente a Km 0, Entrada Zona Hotelera, Cancún, Quintana Roo, México.',
            telefono: '(998) 255 5569',
            whatsapp: '(998) 293 4177',
            y:'21.155173',
            x:'-86.821732',
            img: '/assets/img/sucursales/Bonampak.jpg',
            imgMobile: '/assets/img/sucursales/BonampackMobile.png', 
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallsbarbershop/',
            twitter: 'https://twitter.com/WallsBarbershop', 
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop/@21.1551969,-86.823983,17z/data=!4m8!1m2!2m1!1swalls+barbershop!3m4!1s0x8f4c29558c0027d9:0x84ea5f1878ed84fd!8m2!3d21.1551969!4d-86.8217943?hl=es"

        },
        studio : {
            nombre: 'WALL\'S Studio',
            shortName: 'STUDIO - CANCUN',
            direccion: 'Km 1.5 Zona hotelera, Av Bonampak, Plaza Maria Town Center, Cancún, México',
            telefono: null,
            whatsapp: null,
            y:'21.160825',
            x:'-86.807894',
            img: '/assets/img/logo-walls-negro-completo.jpg',
            imgMobile: '/assets/img/sucursales/BonampackMobile.png', 
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallsbarbershop/',
            twitter: 'https://twitter.com/WallsBarbershop', 
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Walls+Studio/@21.1608309,-86.8084412,19z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0x0!2zMjHCsDA5JzM3LjciTiA4NsKwNDgnMzAuOCJX!3b1!8m2!3d21.160463!4d-86.808552!3m4!1s0x8f4c2eb3697f486b:0x4784fb7511378598!8m2!3d21.1608297!4d-86.807894?hl=es"
        },
        /*torres: {
            nombre: 'WALL\'S LAS TORRES',
            shortName: 'TORRES - CANCUN',
            direccion: 'SM 510 MZA 9 LT 10 Y 12 Planta Alta, Plaza Bamboo, Cancún, Quintana Roo, México.',
            telefono: '(998) 251 0726',
            whatsapp: '(998) 293 4599',
            y: '21.137950',
            x: '-86.750601',
            img: '/assets/img/sucursales/LasTorres.jpg',
            imgMobile: '/assets/img/sucursales/TorresMobile.png',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false
        },
        kabah: {
            nombre: 'WALL\'S KABAH',
            shortName: 'KABAH - CANCUN',
            direccion: 'SMZ 38 MZ 9 LT 1 al 15 Local #5 Av. Sabah, Plaza Real 10 (frente a UNID) Cancún, Quintana Roo, México.',
            telefono: '(998) 206 8098',
            whatsapp: '(998) 293 4931',
            y:'21.156974',
            x:'-86.847092',
            img: '/assets/img/sucursales/Kabah.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/',
            twitter: null,
            select: false
        },*/
        chetumal : {
            nombre: 'WALL\'S CHETUMAL',
            shortName: 'CHETUMAL',
            direccion: 'Bulevar Bahía #301, entre Av. Rafael E. Melgar y Emiliano Zapata, Chetumal.',
            telefono: '(983) 129 2705',
            whatsapp: '(998) 293 4162',
            y:'18.505009',
            x:'-88.281526',
            img: '/assets/img/sucursales/Chetumal.jpg',
            imgMobile: '/assets/img/sucursales/ChetumalMobil.png',
            fb: 'https://www.facebook.com/wallschetumal/', 
            instagram : 'https://www.instagram.com/wallschetumal/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "#"
        },
        isla: {
            nombre: 'WALL\'S ISLA MUJERES',
            shortName: 'ISLA MUJERES',
            direccion: 'Nicolás Bravo S/N Centro, Isla Mujeres.',
            contacto: 'Tel.  y WhatsApp. ',
            telefono: '877 0496',
            whatsapp: '(998) 117 1259',
            y: '21.258206',
            x: '-86.749551',
            img: '/assets/img/sucursales/Isla.jpg',
            imgMobile: '/assets/img/sucursales/IslaMobile.png',
            fb: 'https://www.facebook.com/wallsbarbershopisla/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_isla/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop+Isla+Mujeres/@21.258107,-86.7517697,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x686539e8861cfae8!8m2!3d21.258107!4d-86.749581?hl=es-419"
        },
        cozumel: {
            nombre: 'WALL\'S COZUMEL',
            shortName: 'COZUMEL',
            direccion: 'Plaza Leones, 30 Avenida esquina con 1 sur cozumel, Quintana Roo, México.',
            telefono: null,
            whatsapp: '(987) 101 0138',
            y:'20.505757',
            x:'-86.945043',
            img: '/assets/img/sucursales/Cozumel.jpg',
            imgMobile: '/assets/img/sucursales/CozumelMobil.png',
            fb: 'https://www.facebook.com/wallsbarbershopczm/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_cozumel/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "#"
        },
        /*playaCentro: {
            nombre : 'WALL\'S PLAYA DEL CARMEN CENTRO',
            shortName: 'PLAYA DEL CARMEN CENTRO',
            direccion: 'SM. 56 MZA. 1 Lote 55, Av. Prolongación, Luis Donaldo Colosio, Fracc. Santa Fé, Playa del Carmen, México.',
            telefono: null,
            whatsapp: '(984) 187 6258',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/playacentro.jpg',
            imgMobile: '/assets/img/sucursales/PlayaCentroMobile.png',
            fb: 'https://www.facebook.com/wallsplayacolosio/?ref=br_rs', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false
        },*/ 
        playa: {
            nombre: 'WALL\'S PLAYA DEL CARMEN',
            shortName: 'PLAYA DEL CARMEN',
            direccion: '15 Avenida norte, entre calle 8 y calle 10, Colonia centro, plaza pelícanos, Playa del Carmen, Quintana Roo, México.',
            telefono: '(984) 803 3742',
            whatsapp: '(984) 142 3333',
            y: '20.627448',
            x: '-87.074087',
            img: '/assets/img/sucursales/playa.png',
            imgMobile: '/assets/img/sucursales/PlayaMobil.png',
            fb: 'https://www.facebook.com/wallsbarbershopplayadelcarmen/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Walls+Barbershop+Playa+del+Carmen/@20.6274284,-87.0762812,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9bec3d28d2a2f2ad!8m2!3d20.6274284!4d-87.0740925?hl=es-419"
        },
        meridaPlazaArena: {
            nombre: 'WALL\'S MERIDA PLAZA ARENA',
            shortName: 'PLAZA ARENA - MERIDA',
            direccion: 'Av. Cámara de comercio #3276 por 50 y 52 Local 2 Benito Juarez Norte',
            telefono: null, 
            whatsapp: '998 293 4349',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Arena.jpg',
            imgMobile: '/assets/img/sucursales/ArenaMobile.png',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "#"
        },
        meridaGalerias: {
            nombre: 'WALL\'S GALERIAS MERIDA',
            shortName: 'GALERIAS -MERIDA',
            direccion: 'Calle 3 #300 entre 24 y 60 Av. Revolución, Plaza Galerías Mérida, Yucatán, México.',
            telefono: null,
            whatsapp: '998 293 4627',
            y: '21.039816',
            x: '-89.631272',
            img: '/assets/img/sucursales/Galerias.jpg',
            imgMobile: '/assets/img/sucursales/GaleriasMobile.png',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop+%7C+Plaza+Galer%C3%ADas/@21.0396247,-89.6314835,20z/data=!4m5!3m4!1s0x0:0x9a2f4c9f5b5269f5!8m2!3d21.0398182!4d-89.6312767?hl=es"
        },
        meridaUptown: {
            nombre: 'WALL\'S MERIDA UPTOWN',
            shortName: 'UPTOWN - MERIDA',
            direccion: 'Centro comercial Uptown Mérida, Calle 17 # 104 -A por calle 10 y calle 32-A Col. Vista alegre',
            whatsapp: '999 304 7933',
            y: '21.012251',
            x: '-89.583146',
            img: '/assets/img/sucursales/Uptown.jpg',
            imgMobile: '/assets/img/sucursales/UptownMobil.png',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps?cid=2905519779488992636&hl=es-419&_ga=2.27414971.661748082.1505413378-60004342.1505244176"
        },
        campeche: {
            nombre: 'WALL\'S CAMPECHE',
            shortName: 'CAMPECHE',
            direccion: 'Av. López Portillo #28, Plaza Kaniste Local 1, San Francisco, Campeche.',
            telefono: '(981) 812 7975',
            whatsapp: '(981) 107 2609',
            y:'19.826351',
            x:'-90.551480',
            img: '/assets/img/sucursales/Campeche.jpg',
            imgMobile: '/assets/img/sucursales/CampecheMobile.png',
            fb: 'https://www.facebook.com/wallsbarbershopcamp/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_campeche/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop+Campeche/@19.8263683,-90.553577,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf1158001b362b441!8m2!3d19.8263683!4d-90.5513883?hl=es-419"
        },
        veracruz: {
            nombre : 'WALL\'S BOCA DEL RIO',
            shortName: 'VERACRUZ BOCA DEL RIO',
            direccion: 'Paseo costa verde #583 interior 107 Plaza Marlyn, fraccionamiento costa verde esquina jacarandás.',
            telefono: '688 4491',
            whatsapp: '229 110 47 41',
            y: '19.166767',
            x: '-96.117888',
            img: '/assets/img/sucursales/Boca.jpg',
            imgMobile: '/assets/img/sucursales/BocaMobile.png',
            fb: 'https://www.facebook.com/wallsbarbershopbocadelrio/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_boca/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false, 
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop/@19.1667629,-96.1184343,19z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0x0!2zMTnCsDEwJzAwLjQiTiA5NsKwMDcnMDQuNCJX!3b1!8m2!3d19.166767!4d-96.117888!3m4!1s0x85c34125ac7deeab:0x39bafc08d7ef2bc9!8m2!3d19.1667616!4d-96.1178871?hl=es"
        },
        aguasCalientes: {
            nombre: 'WALL\'S AGUASCALIENTES',
            shortName: 'AGUASCALIENTES',
            direccion: 'Plaza Santa Fe, local 38, Av. Universidad #811, Bosques del prado sur, Aguascalientes, México.',
            telefono: '449 288 1015',
            whatsapp: '449 196 1237',
            y: '21.910993',
            x: '-102.311137',
            img: '/assets/img/sucursales/Aguascalienstes.jpg',
            imgMobile: '/assets/img/sucursales/AguascalientesMobil.png',
            fb: 'https://www.facebook.com/wallsbarbershopags/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_ags/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Walls+Barbershop+Aguascalientes/@21.9109955,-102.3122313,18z/data=!4m13!1m7!3m6!1s0x0:0x0!2zMjHCsDU0JzM5LjYiTiAxMDLCsDE4JzQwLjEiVw!3b1!8m2!3d21.910993!4d-102.311137!3m4!1s0x8429eefcbae022f1:0x2993e4055fae25b1!8m2!3d21.910991!4d-102.311138?hl=es"
        },
        tuxtla: {
            nombre: 'WALL\'S TUXTLA GTZ',
            shortName: 'TUXTLA GTZ',
            direccion: 'Boulevard Doctor Belisario Domínguez, Plaza Santa Elena Tuxtla, Gtz, Chiapas, México.',
            telefono: '(961) 121 4081',
            whatsapp: '(961) 243 1583',
            y: '16.754618',
            x: '-93.141328',
            img: '/assets/img/sucursales/Tuxtla.png',
            imgMobile: '/assets/img/sucursales/TuxtlaMobile.png',
            fb: 'https://www.facebook.com/wallstuxtlagtz/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_tuxtlagtz/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Walls+Barbershop+Chiapas/@16.7546197,-93.1418861,19z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0x0!2zMTbCsDQ1JzE2LjUiTiA5M8KwMDgnMjguOCJX!3b1!8m2!3d16.754586!4d-93.141342!3m4!1s0x85ecd903bc18c1bf:0x8f99d664b7a33fcb!8m2!3d16.7546184!4d-93.1413389?hl=es"
        },
        queretaro: {
            nombre: 'WALL\'S QUERETARO',
            shortName: 'QUERETARO',
            direccion: 'Calle Camino Real de Carretas #139, Lomas de Carreta, Querétaro, México.',
            telefono: '(442) 403 2574',
            whatsapp: '(442) 466 2384',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Queretaro.jpg',
            imgMobile: '/assets/img/sucursales/QueretaroMobil.png',
            fb: 'https://www.facebook.com/wallsbarbershopmilenio3/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_qro/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "#" 
        },
        edoMx: {
            nombre: 'WALL\'S SATÉLITE',
            shortName: 'SATÉLITE',
            direccion: 'Calle Manuel E Izaguirre #4 Local C. Ciudad Satélite Naucalpan de Juárez, Estado de México.',
            telefono: '2155 4934',
            y: '19.513473',
            x: '-99.232874',
            img: '/assets/img/sucursales/Satelite.jpg',
            imgMobile: '/assets/img/sucursales/SateliteMobil.png',
            fb: 'https://www.facebook.com/wallsbarbershopsatelite/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_satelite/?hl=es',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop+Sat%C3%A9lite/@19.5135999,-99.2325953,17z/data=!4m5!3m4!1s0x85d202d7ca0fff9d:0xc850cf778127cad8!8m2!3d19.513484!4d-99.232877?hl=es"
        },
        cdMx: {
            nombre: 'WALL\'S LA ROMA',
            shortName: 'LA ROMA',
            direccion: 'Calle Cozumel esquina con Puebla, Colonia La Roma, Ciudad de México.',
            telefono: '7045 7224',
            whatsapp: '998 293 4626',
            y: '19.420320',
            x: '-99.171246',
            img: '/assets/img/sucursales/LaRoma.jpg',
            imgMobile: '/assets/img/sucursales/RomaMobile.png',
            fb: 'https://www.facebook.com/wallsbarbershoplaroma/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_laroma/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Wall's+Barbershop+-+La+Roma/@19.4204178,-99.1712646,17z/data=!4m5!3m4!1s0x85d1ff489acefedb:0xf0b09206c511c898!8m2!3d19.4203243!4d-99.1712487?hl=es"
        },
        guadalajara: {
            nombre: 'WALL\'S GUADALAJARA',
            shortName: 'GUADALAJARA',
            direccion: 'Av. Aviación 3000, San Juan de Ocotán, 45019 Zapopan, Jal.Guadalajara (México)',
            telefono: '(044) 332 066 34 88',
            y: '20.729825',
            x: ' -103.452480',
            img: '/assets/img/sucursales/Guadalajara.jpg',
            imgMobile: '/assets/img/sucursales/GuadalajaraMobile.png',
            fb: 'https://www.facebook.com/wallsbarbershopgdl/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_gdl/',
            twitter: 'https://twitter.com/WallsBarbershop',
            select: false,
            mapsUrl: "https://www.google.com/maps/place/Walls+Barbershop+Guadalajara/@20.7298452,-103.4546634,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xd97fb23bf0226750!8m2!3d20.7298452!4d-103.4524747?hl=es-419"
        }
    };
    return {
      getSucursales : function(){
       return sucursales;
      }
    }
  });
angular.module('application').controller('sucursalesCtrl',
  ['$scope', '$window', 'NgMap', '$interval', '$timeout', '$state', function($scope, $window, NgMap, $interval, $timeout, $state){
    document.title = "Sucursales- Wall´s Barbershop";
    $scope.cabecera = {};
    $scope.displaySesionN = 'none';
    $scope.sucursalInfoDiv = true;
    $scope.hideInfoDiv = function(param){
        $scope.sucursalInfoDiv = false;
        if(param){
            $scope.showInfoDiv();
        }
    }
    $scope.showInfoDiv =function(){
        $timeout(function(){
            $scope.sucursalInfoDiv = true;
        }, 500);
        
    }
    var displayMenu = 'none';
    var mapObject;
    var select;
    $scope.mobil;
    var noSucursals = false;
    $scope.barPosition = "10.000000, -73.0000000";
    if(screen.width <= 768){
        $scope.menuPosition = "10.000000, -98.7000000";
        $scope.mobil = true;

    }
    if(screen.width <= 414){
        $scope.menuPosition = "10.000000, -98.7000000";
        $scope.mobil = true;

    }
    if(screen.width > 768){
        $scope.menuPosition = "32.400000, -96.6000000";
        $scope.mobil = false;
    }
    $scope.showMapMenu = false;
    $scope.sucursal = false;
    $scope.estadoSelect;
    $scope.mapPosition = "23.848025, -98.605808";
    $scope.layout = {};
    $scope.layout.height = '600px';
    $scope.layout.width = '1100px';
    $scope.mapZoom = 5;
    $scope.displayMenu = displayMenu ;
    $scope.cabecera.source = './assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';
    $scope.actualMap = 'Cancún, Quintana Roo';
    $scope.estado3 = {};
    $scope.estado3.width = '80px';
    $scope.estado3.height = "110px";
    $scope.estado3.position = "15.100000, -78.500000";
    $scope.estado4 = {};
    $scope.estado4.width = '100px';
    $scope.estado4.height = "65px";
    $scope.estado5 = {};
    $scope.estado5.width = '114px';
    $scope.estado5.height = "90px";
    $scope.estado5.position = "14.500000, -82.360000";
    $scope.estado6 = {};
    $scope.estado6.width = '118px';
    $scope.estado6.height = "43px";
    $scope.estado6.position = "13.600000, -85.050000";
    $scope.estado7 = {};
    $scope.estado7.width = '135px';
    $scope.estado7.height = "104px";
    $scope.estado7.position = "10.100000, -84.500000";
    $scope.estado8 = {};
    $scope.estado8.width = '182px';
    $scope.estado8.height = "155px";
    $scope.estado8.position = "13.50000, -90.800000";
    $scope.estado9 = {};
    $scope.estado9.width = '161px';
    $scope.estado9.height = "87px";
    $scope.estado9.position = "11.50000, -90.700000";
    $scope.estado10 = {};
    $scope.estado10.width = '75px';
    $scope.estado10.height = "93px";
    $scope.estado10.position = "14.10000, -93.440000";
    $scope.estado11 = {};
    $scope.estado11.width = '150px';
    $scope.estado11.height = "80px";
    $scope.estado11.position = "12.10000, -96.830000";
    $scope.estado12 = {};
    $scope.estado12.width = '15px';
    $scope.estado12.height = "16px";
    $scope.estado12.position = "15.70000, -95.400000";
    $scope.estado13 = {};
    $scope.estado13.width = '70px';
    $scope.estado13.height = "60px";
    $scope.estado13.position = "14.80000, -96.100000";
    $scope.estado14 = {};
    $scope.estado14.width = '27px';
    $scope.estado14.height = "22px";
    $scope.estado14.position = "14.80000, -95.200000";
    $scope.estado15 = {};
    $scope.estado15.width = '30px';
    $scope.estado15.height = "20px";
    $scope.estado15.position = "15.80000, -94.000000";
    $scope.estado16 = {};
    $scope.estado16.width = '69px';
    $scope.estado16.height = "53px";
    $scope.estado16.position = "16.30000, -95.150000";
    $scope.estado17 = {};
    $scope.estado17.width = '55px';
    $scope.estado17.height = "50px";
    $scope.estado17.position = "16.80000, -96.400000";
    $scope.estado18 = {};
    $scope.estado18.width = '83px';
    $scope.estado18.height = "60px";
    $scope.estado18.position = "16.70000, -98.200000";
    $scope.estado19 = {};
    $scope.estado19.width = '137px';
    $scope.estado19.height = "105px";
    $scope.estado19.position = "18.40000, -97.200000";
    $scope.estado20 = {};
    $scope.estado20.width = '128px';
    $scope.estado20.height = "74px";
    $scope.estado20.position = "14.20000, -99.800000";
    $scope.estado21 = {};
    $scope.estado21.width = '37px';
    $scope.estado21.height = "32px";
    $scope.estado21.position = "15.00000, -103.100000";
    $scope.estado22 = {};
    $scope.estado22.width = '140px';
    $scope.estado22.height = "90px";
    $scope.estado22.position = "15.50000, -102.3300000";
    $scope.estado23 = {};
    $scope.estado23.width = '128px';
    $scope.estado23.height = "127px";
    $scope.estado23.position = "18.20000, -100.7000000";
    $scope.estado24 = {};
    $scope.estado24.width = '35px';
    $scope.estado24.height = "27px";
    $scope.estado24.position = "18.90000, -100.4000000";
    $scope.estado25 = {};
    $scope.estado25.width = '40px';
    $scope.estado25.height = "42px";
    $scope.estado25.position = "18.50000, -102.5000000";
    $scope.estado25 = {};
    $scope.estado25.width = '40px';
    $scope.estado25.height = "42px";
    $scope.estado25.position = "18.50000, -102.5000000";
    $scope.estado26 = {};
    $scope.estado26.width = '63px';
    $scope.estado26.height = "73px";
    $scope.estado26.position = "17.70000, -104.0000000";
    $scope.estado27 = {};
    $scope.estado27.width = '153px';
    $scope.estado27.height = "137px";
    $scope.estado27.position = "20.00000, -104.0000000";
    $scope.estado28 = {};
    $scope.estado28.width = '123px';
    $scope.estado28.height = "137px";
    $scope.estado28.position = "20.30000, -107.9000000";
    $scope.estado29 = {};
    $scope.estado29.width = '126px';
    $scope.estado29.height = "173px";
    $scope.estado29.position = "22.60000, -99.7000000";
    $scope.estado30 = {};
    $scope.estado30.width = '190px';
    $scope.estado30.height = "205px";
    $scope.estado30.position = "24.10000, -105.9000000";
    $scope.estado31 = {};
    $scope.estado31.width = '199px';
    $scope.estado31.height = "218px";
    $scope.estado31.position = "25.20000, -113.7000000";
    $scope.estado32 = {};
    $scope.estado32.width = '174px';
    $scope.estado32.height = "169px";
    $scope.estado32.position = "20.80000, -114.8000000";
    $scope.estado33 = {};
    $scope.estado33.width = '115px';
    $scope.estado33.height = "163px";
    $scope.estado33.position = "27.60000, -118.2000000";
    $scope.estado34 = {};
    $scope.estado34.width = '94px';
    $scope.estado34.height = "146px";
    $scope.estado34.position = "21.00000, -96.7000000";
    $scope.estado35 = {};
    $scope.estado35.width = '92px';
    $scope.estado35.height = "164px";
    $scope.estado35.position = "19.90000, -94.9000000";

    
    NgMap.getMap().then(function(map){
        mapObject = map;
        console.log(map);
    });
    
    $scope.return = function(){
        $scope.sucursal = false;
        $scope.actualSucursal = null;
    }
    $scope.selectCity = function(city){
        $scope.sucursalesColumna1 = {};
        $scope.sucursalesColumna2 = {};
        switch (city){
            case 'cancun':
                $scope.sucursalesColumna1['bonampak'] = columna1aux.bonampak;
                $scope.sucursalesColumna1['torres'] = columna1aux.torres;
                $scope.sucursalesColumna2['kabah'] = columna1aux.kabah;
            break;
            case 'isla':
                $scope.sucursalesColumna1['isla'] = columna1aux.isla;
            break;
            case 'playa':
                $scope.sucursalesColumna1['playa'] = columna1aux.playa;
                $scope.sucursalesColumna2['playaCentro'] = columna1aux.playaCentro;
            break;
            case 'cozumel':
                $scope.sucursalesColumna1['cozumel'] = columna1aux.cozumel;
            break;
            case 'chetumal':
                $scope.sucursalesColumna1['chetumal'] = columna1aux.chetumal;
            break;
        }
    }
    $scope.restoreZoom = function(){
        $scope.sucursalesColumna1 = columna1aux;
        $scope.sucursalesColumna2 = columna2aux;
        selectAux = select;
        $scope.estadoSelect = null;
        select = null;
        $scope.disappearMap(selectAux);
        $scope.barPosition = "10.000000, -73.0000000";
        if(screen.width <= 768){
            $scope.menuPosition = "10.000000, -98.7000000";
      
        }
        else{
            $scope.menuPosition = "32.400000, -96.6000000";
        }
        $scope.showMapMenu = false;
        $scope.sucursal = false;
        $scope.estadoSelect;
        $scope.mapPosition = "23.848025, -98.605808";
        $scope.layout = {};
        $scope.layout.height = '600px';
        $scope.layout.width = '1100px';
        $scope.mapZoom = 5;
        $scope.displayMenu = displayMenu ;
        $scope.cabecera.source = './assets/img/logo.png';
        $scope.cabecera.position = 'absolute';
        $scope.displaySesion = 'none';
        $scope.displayNumber = 'none';
        $scope.cabecera.fontColor = 'white';
        $scope.iconColor = 'white';
        $scope.actualMap = 'Cancún, Quintana Roo';
        $scope.estado3 = {};
        $scope.estado3.width = '80px';
        $scope.estado3.height = "110px";
        $scope.estado3.position = "15.100000, -78.500000";
        $scope.estado4 = {};
        $scope.estado4.width = '100px';
        $scope.estado4.height = "65px";
        $scope.estado5 = {};
        $scope.estado5.width = '114px';
        $scope.estado5.height = "90px";
        $scope.estado5.position = "14.500000, -82.360000";
        $scope.estado6 = {};
        $scope.estado6.width = '118px';
        $scope.estado6.height = "43px";
        $scope.estado6.position = "13.600000, -85.050000";
        $scope.estado7 = {};
        $scope.estado7.width = '135px';
        $scope.estado7.height = "104px";
        $scope.estado7.position = "10.100000, -84.500000";
        $scope.estado8 = {};
        $scope.estado8.width = '182px';
        $scope.estado8.height = "155px";
        $scope.estado8.position = "13.50000, -90.800000";
        $scope.estado9 = {};
        $scope.estado9.width = '161px';
        $scope.estado9.height = "87px";
        $scope.estado9.position = "11.50000, -90.700000";
        $scope.estado10 = {};
        $scope.estado10.width = '75px';
        $scope.estado10.height = "93px";
        $scope.estado10.position = "14.10000, -93.440000";
        $scope.estado11 = {};
        $scope.estado11.width = '150px';
        $scope.estado11.height = "80px";
        $scope.estado11.position = "12.10000, -96.830000";
        $scope.estado12 = {};
        $scope.estado12.width = '15px';
        $scope.estado12.height = "16px";
        $scope.estado12.position = "15.70000, -95.400000";
        $scope.estado13 = {};
        $scope.estado13.width = '70px';
        $scope.estado13.height = "60px";
        $scope.estado13.position = "14.80000, -96.100000";
        $scope.estado14 = {};
        $scope.estado14.width = '27px';
        $scope.estado14.height = "22px";
        $scope.estado14.position = "14.80000, -95.200000";
        $scope.estado15 = {};
        $scope.estado15.width = '30px';
        $scope.estado15.height = "20px";
        $scope.estado15.position = "15.80000, -94.000000";
        $scope.estado16 = {};
        $scope.estado16.width = '69px';
        $scope.estado16.height = "53px";
        $scope.estado16.position = "16.30000, -95.150000";
        $scope.estado17 = {};
        $scope.estado17.width = '55px';
        $scope.estado17.height = "50px";
        $scope.estado17.position = "16.80000, -96.400000";
        $scope.estado18 = {};
        $scope.estado18.width = '83px';
        $scope.estado18.height = "60px";
        $scope.estado18.position = "16.70000, -98.200000";
        $scope.estado19 = {};
        $scope.estado19.width = '137px';
        $scope.estado19.height = "105px";
        $scope.estado19.position = "18.40000, -97.200000";
        $scope.estado20 = {};
        $scope.estado20.width = '128px';
        $scope.estado20.height = "74px";
        $scope.estado20.position = "14.20000, -99.800000";
        $scope.estado21 = {};
        $scope.estado21.width = '37px';
        $scope.estado21.height = "32px";
        $scope.estado21.position = "15.00000, -103.100000";
        $scope.estado22 = {};
        $scope.estado22.width = '140px';
        $scope.estado22.height = "90px";
        $scope.estado22.position = "15.50000, -102.3300000";
        $scope.estado23 = {};
        $scope.estado23.width = '128px';
        $scope.estado23.height = "127px";
        $scope.estado23.position = "18.20000, -100.7000000";
        $scope.estado24 = {};
        $scope.estado24.width = '35px';
        $scope.estado24.height = "27px";
        $scope.estado24.position = "18.90000, -100.4000000";
        $scope.estado25 = {};
        $scope.estado25.width = '40px';
        $scope.estado25.height = "42px";
        $scope.estado25.position = "18.50000, -102.5000000";
        $scope.estado25 = {};
        $scope.estado25.width = '40px';
        $scope.estado25.height = "42px";
        $scope.estado25.position = "18.50000, -102.5000000";
        $scope.estado26 = {};
        $scope.estado26.width = '63px';
        $scope.estado26.height = "73px";
        $scope.estado26.position = "17.70000, -104.0000000";
        $scope.estado27 = {};
        $scope.estado27.width = '153px';
        $scope.estado27.height = "137px";
        $scope.estado27.position = "20.00000, -104.0000000";
        $scope.estado28 = {};
        $scope.estado28.width = '123px';
        $scope.estado28.height = "137px";
        $scope.estado28.position = "20.30000, -107.9000000";
        $scope.estado29 = {};
        $scope.estado29.width = '126px';
        $scope.estado29.height = "173px";
        $scope.estado29.position = "22.60000, -99.7000000";
        $scope.estado30 = {};
        $scope.estado30.width = '190px';
        $scope.estado30.height = "205px";
        $scope.estado30.position = "24.10000, -105.9000000";
        $scope.estado31 = {};
        $scope.estado31.width = '199px';
        $scope.estado31.height = "218px";
        $scope.estado31.position = "25.20000, -113.7000000";
        $scope.estado32 = {};
        $scope.estado32.width = '174px';
        $scope.estado32.height = "169px";
        $scope.estado32.position = "20.80000, -114.8000000";
        $scope.estado33 = {};
        $scope.estado33.width = '115px';
        $scope.estado33.height = "163px";
        $scope.estado33.position = "27.60000, -118.2000000";
        $scope.estado34 = {};
        $scope.estado34.width = '94px';
        $scope.estado34.height = "146px";
        $scope.estado34.position = "21.00000, -96.7000000";
        $scope.estado35 = {};
        $scope.estado35.width = '92px';
        $scope.estado35.height = "164px";
        $scope.estado35.position = "19.90000, -94.9000000";
    }
    $scope.selectSucursal = function(sucursal){
        console.log(sucursal);
        $scope.sucursal= true;
        $scope.actualSucursal = sucursales[sucursal];
        console.log($scope.actualSucursal);
    }
    $scope.selectState = function(state){
        $scope.noSucursals = false;
       $scope.sucursalesColumna1 = {};
       $scope.sucursalesColumna2 = {};
       switch (state){
        case 3:
            $scope.sucursalesColumna1['bonampak'] = columna1aux.bonampak;
            $scope.sucursalesColumna1['torres'] = columna1aux.torres;
            $scope.sucursalesColumna1['isla'] = columna1aux.isla;
            $scope.sucursalesColumna1['playa'] = columna1aux.playa;
            $scope.sucursalesColumna2['playaCentro'] = columna1aux.playaCentro;
            $scope.sucursalesColumna2['kabah'] = columna1aux.kabah;
            $scope.sucursalesColumna2['cozumel'] = columna1aux.cozumel;
            $scope.sucursalesColumna2['chetumal'] = columna1aux.chetumal;
           break;
        case 4:
            $scope.sucursalesColumna1['meridaUptown'] = columna2aux.meridaUptown;
            $scope.sucursalesColumna1['meridaGalerias'] = columna2aux.meridaGalerias;
            $scope.sucursalesColumna2['meridaPlazaArena'] = columna2aux.meridaPlazaArena;
           break;
        case 5:
            $scope.sucursalesColumna1['campeche'] = columna1aux.campeche;
           break;
        case 7:
            $scope.sucursalesColumna1['tuxtla'] = columna2aux.tuxtla;
           break;
        case 8:
            $scope.sucursalesColumna1['veracruz'] = columna2aux.veracruz;
           break;
        case 12:
            $scope.sucursalesColumna1['cdMx'] = columna2aux.cdMx;
           break;
        case 13:
            $scope.sucursalesColumna1['edoMx'] = columna2aux.edoMx;
           break;
        case 17:
            $scope.sucursalesColumna1['queretaro'] = columna2aux.queretaro;
           break;
        case 22:
            $scope.sucursalesColumna1['guadalajara'] = columna2aux.guadalajara;
           break;
        case 24:
            $scope.sucursalesColumna1['aguasCalientes'] = columna2aux.aguasCalientes;
           break;
           default:
                $scope.noSucursals = true;
            break;
       }
       


    }
    $scope.changePosition = function(position, state){
        $scope.disappearMap(state);
        $scope.mapZoom = 6;
        $scope.mapPosition = position;
        var actualState = select;
        $scope.selectState(state);
        $scope.disappearMap(actualState);
        if(position === "15.100000, -79.000000"){
            $scope.barPosition = "10.000000, -65.0000000";
            $scope.menuPosition = "21.60000, -76.7000000";
        }
        if(position === '15.100000, -84.000000'){
            $scope.barPosition = "10.000000, -72.0000000";
            $scope.menuPosition = "21.60000, -83.7000000";
        }
        if(position === '15.100000, -88.000000'){
            $scope.barPosition = "10.000000, -75.0000000";
            $scope.menuPosition = "21.60000, -86.7000000";

        }
        if(position === '20.100000, -90.000000'){
            $scope.barPosition = "15.000000, -76.0000000";
            $scope.menuPosition = "26.30000, -87.7000000";

        }
        if(position === '18.100000, -90.000000'){
            $scope.barPosition = "12.000000, -76.0000000";
            $scope.menuPosition = "23.60000, -87.7000000";

        }
         if(position === '18.100000, -93.000000'){
            $scope.barPosition = "14.000000, -79.0000000";
            $scope.menuPosition = "25.40000, -90.8000000";

        }
         if(position === '20.100000, -93.000000'){
            $scope.barPosition = "16.000000, -79.0000000";
            $scope.menuPosition = "27.20000, -90.8000000";

        }
         if(position === '23.100000, -98.000000'){
            $scope.barPosition = "16.800000, -84.0000000";
            $scope.menuPosition = "28.00000, -95.8000000";
        }
        if(position === '26.100000, -98.000000'){
            $scope.barPosition = "20.000000, -84.0000000";
            $scope.menuPosition = "30.90000, -95.8000000";

        }
        if(position === '30.100000, -105.000000'){
            $scope.barPosition = "24.000000, -91.0000000";
            $scope.menuPosition = "34.50000, -102.8000000";

        }
        if(position === '25.100000, -105.000000'){
            $scope.barPosition = "19.000000, -91.0000000";
            $scope.menuPosition = "30.00000, -102.7000000";

        }
        if(position === '32.100000, -109.000000'){
            $scope.barPosition = "26.000000, -95.0000000";
            $scope.menuPosition = "36.30000, -106.8000000";
        }
         if(position === '25.100000, -90.000000'){
            $scope.barPosition = "19.000000, -76.0000000";
            $scope.menuPosition = "30.00000, -87.8000000";
        }
        if(position === '22.100000, -87.000000'){
            $scope.barPosition = "16.000000, -73.0000000";
            $scope.menuPosition = "27.20000, -84.8000000";
        }
        
        $scope.layout.height = '1250px';
        $scope.layout.width = '2200px';
        $scope.estado3.width = '153px';
        $scope.estado3.height = "225px";
        $scope.estado3.position = "15.200000, -78.500000";
        $scope.estado4.width = '192px';
        $scope.estado4.height = "139px";
        $scope.estado5.width = '232px';
        $scope.estado5.height = "172px";
        $scope.estado5.position = "14.800000, -82.40000";
        $scope.estado6.width = '220px';
        $scope.estado6.height = "73px";
        $scope.estado6.position = "14.000000, -85.050000";
        $scope.estado7.width = '265px';
        $scope.estado7.height = "200px";
        $scope.estado7.position = "10.500000, -84.500000";
        $scope.estado8.width = '361px';
        $scope.estado8.height = "310px";
        $scope.estado8.position = "13.70000, -90.800000";
        $scope.estado9.width = '325px';
        $scope.estado9.height = "175px";
        $scope.estado9.position = "11.60000, -90.800000";
        $scope.estado10.width = '156px';
        $scope.estado10.height = "175px";
        $scope.estado10.position = "14.40000, -93.480000";
        $scope.estado11.width = '292px';
        $scope.estado11.height = "146px";
        $scope.estado11.position = "12.40000, -96.870000";
        $scope.estado12.width = '23px';
        $scope.estado12.height = "23px";
        $scope.estado12.position = "15.90000, -95.450000";
        $scope.estado13.width = '132px';
        $scope.estado13.height = "112px";
        $scope.estado13.position = "15.00000, -96.150000";
        $scope.estado14.width = '51px';
        $scope.estado14.height = "41px";
        $scope.estado14.position = "15.00000, -95.400000";
        $scope.estado15.width = '68px';
        $scope.estado15.height = "33px";
        $scope.estado15.position = "16.00000, -93.950000";
        $scope.estado16.width = '126px';
        $scope.estado16.height = "99px";
        $scope.estado16.position = "16.66000, -95.150000";
        $scope.estado17.width = '108px';
        $scope.estado17.height = "89px";
        $scope.estado17.position = "17.20000, -96.600000";
        $scope.estado18.width = '162px';
        $scope.estado18.height = "118px";
        $scope.estado18.position = "16.90000, -98.200000";
        $scope.estado19.width = '270px';
        $scope.estado19.height = "195px";
        $scope.estado19.position = "18.69000, -97.300000";
        $scope.estado20.width = '252px';
        $scope.estado20.height = "145px";
        $scope.estado20.position = "14.40000, -99.700000";
        $scope.estado21 = {};
        $scope.estado21.width = '74px';
        $scope.estado21.height = "48px";
        $scope.estado21.position = "15.40000, -103.100000";
        $scope.estado22.width = '277px';
        $scope.estado22.height = "190px";
        $scope.estado22.position = "15.60000, -102.330000";
        $scope.estado23.width = '235px';
        $scope.estado23.height = "250px";
        $scope.estado23.position = "18.40000, -100.7000000";
        $scope.estado24.width = '71px';
        $scope.estado24.height = "45px";
        $scope.estado24.position = "19.18000, -100.4000000";
        $scope.estado25.width = '83px';
        $scope.estado25.height = "90px";
        $scope.estado25.position = "18.68000, -102.5000000";
        $scope.estado26.width = '128px';
        $scope.estado26.height = "139px";
        $scope.estado26.position = "18.10000, -104.0000000";
        $scope.estado27.width = '315px';
        $scope.estado27.height = "280px";
        $scope.estado27.position = "20.18000, -104.0500000";
        $scope.estado28.width = '255px';
        $scope.estado28.height = "290px";
        $scope.estado28.position = "20.30000, -107.9000000";
        $scope.estado29.width = '265px';
        $scope.estado29.height = "340px";
        $scope.estado29.position = "22.90000, -99.7000000";
        $scope.estado30.width = '373px';
        $scope.estado30.height = "410px";
        $scope.estado30.position = "24.30000, -105.9800000";
        $scope.estado31 = {};
        $scope.estado31.width = '398px';
        $scope.estado31.height = "435px";
        $scope.estado31.position = "25.40000, -113.7000000";
        $scope.estado32.width = '332px';
        $scope.estado32.height = "342px";
        $scope.estado32.position = "21.00000, -114.8000000";
        $scope.estado33.width = '230px';
        $scope.estado33.height = "330px";
        $scope.estado33.position = "27.80000, -118.2500000";
        $scope.estado34.width = '179px';
        $scope.estado34.height = "300px";
        $scope.estado34.position = "21.00000, -96.6000000";
        $scope.estado35.width = '192px';
        $scope.estado35.height = "340px";
        $scope.estado35.position = "19.90000, -94.9000000";
         $timeout(function(){
            $scope.estadoSelect = state;
            $scope.appearMap(state);
            $scope.openMapMenu();
            select = state;
            $scope.disappearMap(actualState);
        },650);
        

    }

    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.appearMap = function(id){
        console.log('mouse enter');
        mapObject.customMarkers[id].el.style.opacity ='1';
        console.log(id);
        /*console.log(map.customMarkers);
        mapObject.customMarkers[id].el.className = mapObject.customMarkers[id].el.className + ' appear1S';
        mapObject.customMarkers[id].el.childNodes[1].className = mapObject.customMarkers[id].el.childNodes[1].className + ' appear1S';
        mapObject.customMarkers[id].el.childNodes[1].childNodes[1].className = '';
        //console.log(map.customMarkers[id].el.childNodes[1].childNodes[1]);*/
    }
    $scope.disappearMap = function(id){
        //console.log('mouse leave');
        //console.log(mapObject.customMarkers);
        //console.log(map.customMarkers);
        if(select != id){
            console.log('desaparecer estado', id);
            mapObject.customMarkers[id].el.className =  '';
            mapObject.customMarkers[id].el.childNodes[1].className ='';
            mapObject.customMarkers[id].el.childNodes[1].childNodes[1].className = '';
            mapObject.customMarkers[id].el.style.opacity ='0';
        }
        /*mapObject.customMarkers[id].el.className = mapObject.customMarkers[id].el.className + ' disapepar';
        mapObject.customMarkers[id].el.childNodes[1].className = mapObject.customMarkers[id].el.childNodes[1].className + ' disapepar';
        mapObject.customMarkers[id].el.childNodes[1].childNodes[1].className = mapObject.customMarkers[id].el.childNodes[1].childNodes[1].className + 'disapepar';*/
        //console.log(mapObject.customMarkers[id].el.childNodes[1].childNodes[1]);
    }
    var unselectMap = function(){
        mapObject.customMarkers[select].el.className =  '';
        mapObject.customMarkers[select].el.childNodes[1].className ='';
        mapObject.customMarkers[select].el.childNodes[1].childNodes[1].className = '';
        mapObject.customMarkers[select].el.style.opacity ='0';
    }
    $scope.openMapMenu = function(e, key, state){
        $scope.showMapMenu = true;
        console.log('menu')
        $scope.actualMap = state;
        NgMap.getMap().then(function(map){
            console.log(map.customMarkers[38]);

             map.customMarkers[38].el.className = map.customMarkers[38].el.className + ' appear';
             map.customMarkers[38].el.childNodes[2].className = map.customMarkers[38].el.childNodes[2].className + ' prueba';

           
        });
        console.log('open');;
    }
    if(screen.width <= 768){ 
      $scope.openMapMenu();
    }
    $scope.closeMapMenu = function(e, key, state){
        console.log('crrar')
        $scope.actualMap = state;
        $scope.showMapMenu = false;
        $scope.sucursal = false;
       // angular.element(document.querySelector('#sucursal-map-menu')).addClass('appepar');
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    angular.element(document.querySelector('#texto1')).addClass('slide-right-to-left-enter');
    angular.element(document.querySelector('#texto1-movil')).addClass('appear');
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    var sucursales = {};
    sucursales = {
        bonampak : {
            nombre: 'WALL´S BARBERSHOP BONAMPAK',
            shortName: 'BONAMPAK',
            direccion: 'SM 4 MZA 3 Plaza Atlantis, Av. Bonampak con Av. Kukulcán, Frente a Km 0, Entrada Zona Hotelera, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 255 5569 y WhatsApp. (998) 293 4177',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Bonampak.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        torres: {
            nombre: 'WALL´S LAS TORRES',
            shortName: 'TORRES',
            direccion: 'SM 510 MZA 9 LT 10 Y 12 Planta Alta, Plaza Bamboo, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 251 0726 y WhatsApp. (998) 293 4599',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/LasTorres.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        kabah: {
            nombre: 'WALL´S BARBERSHOP KABAH',
            shortName: 'KABAH',
            direccion: 'SMZ 38 MZ 9 LT 1 al 15 Local #5 Av. Sabah, Plaza Real 10 (frente a UNID) Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 206 8098 y WhatsApp. (998) 293 4931',
            position: '8.000000, -85.0000000',
            img: '/assets/img/sucursales/Kabah.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        chetumal : {
            nombre: 'WALLS CHETUMAL',
            shortName: 'CHETUMAL',
            direccion: 'Bulevar Bahía #301, entre Av. Rafael E. Melgar y Emiliano Zapata, Chetumal.',
            contacto:  'Tel. (983) 129 2705 y WhatsApp. (998) 293 4162',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Chetumal.jpg',
            fb: 'https://www.facebook.com/wallschetumal/', 
            instagram : 'https://www.instagram.com/wallschetumal/'
        },
        isla: {
            nombre: 'WALL´S BARBERSHOP ISLA MUJERES',
            shortName: 'ISLA MUJERES',
            direccion: 'Nicolás Bravo S/N Centro, Isla Mujeres.',
            contacto: 'Tel. 877 0496 y WhatsApp. (998) 117 1259',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Isla.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopisla/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_isla/'
        },
        cozumel: {
            nombre: 'WALL´S BARBERSHOP COZUMEL',
            shortName: 'COZUMEL',
            direccion: 'Plaza Leones, 30 Avenida esquina con 1 sur cozumel, Quintana Roo, México.',
            contacto: 'WhatsApp. (987) 101 0138',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Cozumel.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopczm/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_cozumel/'
        },
        playaCentro: {
            nombre : 'WALL´S BARBERSHOP PLAYA DEL CARMEN CENTRO',
            shortName: 'PLAYA DEL CARMEN CENTRO',
            direccion: 'SM. 56 MZA. 1 Lote 55, Av. Prolongación, Luis Donaldo Colosio, Fracc. Santa Fé, Playa del Carmen, México.',
            contacto: 'WhatsApp. (984) 187 6258',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/playacentro.jpg',
            fb: 'https://www.facebook.com/wallsplayacolosio/?ref=br_rs', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/'
        }, 
        playa: {
            nombre: 'WALL´S BARBERSHOP PLAYA DEL CARMEN',
            shortName: 'PLAYA DEL CARMEN',
            direccion: '15 Avenida norte, entre calle 8 y calle 10, Colonia centro, plaza pelícanos, Playa del Carmen, Quintana Roo, México.',
            contacto: 'Tel. (984) 803 3742 y WhatsApp. (984) 142 3333',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/playa.png',
            fb: 'https://www.facebook.com/wallsbarbershopplayadelcarmen/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/'
        },
        meridaPlazaArena: {
            nombre: 'WALL´S MERIDA PLAZA ARENA',
            shortName: 'PLAZA ARENA',
            direccion: 'Av. Cámara de comercio #3276 por 50 y 52 Local 2 Benito Juarez Norte',
            contacto: 'WhatsApp. 998 293 4349',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Arena.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        },
        meridaGalerias: {
            nombre: 'WALL´S GALERIAS MERIDA',
            shortName: 'GALERIAS',
            direccion: 'Calle 3 #300 entre 24 y 60 Av. Revolución, Plaza Galerías Mérida, Yucatán, México.',
            contacto: 'WhatsApp. 998 293 4627',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Galerias.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        },
        meridaUptown: {
            nombre: 'WALL´S BARBERSHOP MERIDA UPTOWN',
            shortName: 'UPTOWN',
            direccion: 'Centro comercial Uptown Mérida, Calle 17 # 104 -A por calle 10 y calle 32-A Col. Vista alegre',
            contacto: 'WhatsApp. 999 304 7933',
            position: '8.000000, -85.0000000',
            img: '/assets/img/sucursales/Uptown.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        },
        campeche: {
            nombre: 'WALLS CAMPECHE',
            shortName: 'CAMPECHE',
            direccion: 'Av. López Portillo #28, Plaza Kaniste Local 1, San Francisco, Campeche.',
            contacto: 'Tel. (981) 812 7975 y WhatsApp. (981) 107 2609',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Campeche.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopcamp/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_campeche/'
        },
        veracruz: {
            nombre : 'WALL´S BARBERSHOP BOCA DEL RIO',
            shortName: 'VERACRUZ BOCA DEL RIO',
            direccion: 'Paseo costa verde #583 interior 107 Plaza Marlyn, fraccionamiento costa verde esquina jacarandás.',
            contacto: 'Tel. 688 4491  y WhatsApp. 229 110 47 41',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Boca.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopbocadelrio/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_boca/'
        },
        aguasCalientes: {
            nombre: 'WALL´S BARBERSHOP AGUASCALIENTES',
            shortName: 'AGUASCALIENTES',
            direccion: 'Plaza Santa Fe, local 38, Av. Universidad #811, Bosques del prado sur, Aguascalientes, México.',
            contacto: 'Tel. 449 288 1015 y WhatsApp. 449 196 1237',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Aguascalienstes.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopags/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_ags/'
        },
        tuxtla: {
            nombre: 'WALL´S BARBERSHOP TUXTLA GTZ',
            shortName: 'TUXTLA GTZ',
            direccion: 'Boulevard Doctor Belisario Domínguez, Plaza Santa Elena Tuxtla, Gtz, Chiapas, México.',
            contacto: 'Tel. (961) 121 4081 y WhatsApp. (961) 243 1583 ',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/walls-tuxtla.png',
            fb: 'https://www.facebook.com/wallstuxtlagtz/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_tuxtlagtz/'
        },
        queretaro: {
            nombre: 'WALL´S BARBERSHOP QUERETARO',
            shortName: 'QUERETARO',
            direccion: 'Calle Camino Real de Carretas #139, Lomas de Carreta, Querétaro, México.',
            contacto: 'Tel. (442) 403 2574 y WhatsApp. (442) 466 2384',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Queretaro.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopmilenio3/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_qro/'     
        },
        edoMx: {
            nombre: 'WALL´S BARBERSHOP SATÉLITE',
            shortName: 'SATÉLITE',
            direccion: 'Calle Manuel E Izaguirre #4 Local C. Ciudad Satélite Naucalpan de Juárez, Estado de México.',
            contacto: 'Tel. 2155 4934',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Satelite.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopsatelite/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_satelite/?hl=es'
        },
        cdMx: {
            nombre: 'WALL´S BARBERSHOP LA ROMA',
            shortName: 'LA ROMA',
            direccion: 'Calle Cozumel esquina con Puebla, Colonia La Roma, Ciudad de México.',
            contacto: 'Tel. 7045 7224 y WhatsApp. (045) 998 293 4626',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/LaRoma.jpg',
            fb: 'https://www.facebook.com/wallsbarbershoplaroma/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_laroma/'
        },
        guadalajara: {
                nombre: 'WALL´S BARBERSHOP GUADALAJARA',
                shortName: 'GUADALAJARA',
                direccion: 'Av. Aviación 3000, San Juan de Ocotán, 45019 Zapopan, Jal.Guadalajara (México)',
                contacto: 'Tel. (044) 332 066 34 88',
                position: '16.800000, -85.0000000',
                img: '/assets/img/sucursales/Guadalajara.jpg',
                fb: 'https://www.facebook.com/wallsbarbershopgdl/', 
                instagram : 'https://www.instagram.com/wallsbarbershop_gdl/'
            }
    };


/////////////////////////////////////////////////////////////////
    $scope.sucursalesColumna1 = {
        bonampak : {
            nombre: 'WALL´S BARBERSHOP BONAMPAK',
            shortName: 'BONAMPAK',
            direccion: 'SM 4 MZA 3 Plaza Atlantis, Av. Bonampak con Av. Kukulcán, Frente a Km 0, Entrada Zona Hotelera, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 255 5569 y WhatsApp. (998) 293 4177',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Bonampak.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        torres: {
            nombre: 'WALL´S LAS TORRES',
            shortName: 'TORRES',
            direccion: 'SM 510 MZA 9 LT 10 Y 12 Planta Alta, Plaza Bamboo, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 251 0726 y WhatsApp. (998) 293 4599',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/LasTorres.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        kabah: {
            nombre: 'WALL´S BARBERSHOP KABAH',
            shortName: 'KABAH',
            direccion: 'SMZ 38 MZ 9 LT 1 al 15 Local #5 Av. Sabah, Plaza Real 10 (frente a UNID) Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 206 8098 y WhatsApp. (998) 293 4931',
            position: '8.000000, -85.0000000',
            img: '/assets/img/sucursales/Kabah.jpg',
            fb: 'https://www.facebook.com/Walls-Barbershop-Cancun-334978173601237/', 
            instagram : 'https://www.instagram.com/wallscancun/'
        },
        chetumal : {
            nombre: 'WALLS CHETUMAL',
            shortName: 'CHETUMAL',
            direccion: 'Bulevar Bahía #301, entre Av. Rafael E. Melgar y Emiliano Zapata, Chetumal.',
            contacto:  'Tel. (983) 129 2705 y WhatsApp. (998) 293 4162',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Chetumal.jpg',
            fb: 'https://www.facebook.com/wallschetumal/', 
            instagram : 'https://www.instagram.com/wallschetumal/'

        },
         isla: {
            nombre: 'WALL´S BARBERSHOP ISLA MUJERES',
            shortName: 'ISLA MUJERES',
            direccion: 'Nicolás Bravo S/N Centro, Isla Mujeres.',
            contacto: 'Tel. 877 0496 y WhatsApp. (998) 117 1259',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Isla.jpg',
            fb: 'https://www.instagram.com/wallschetumal/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_isla/'

        },
         cozumel: {
            nombre: 'WALL´S BARBERSHOP COZUMEL',
            shortName: 'COZUMEL',
            direccion: 'Plaza Leones, 30 Avenida esquina con 1 sur cozumel, Quintana Roo, México.',
            contacto: 'WhatsApp. (987) 101 0138',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Cozumel.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopczm/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_cozumel/'
        },
        playaCentro: {
            nombre : 'WALL´S BARBERSHOP PLAYA DEL CARMEN CENTRO',
            shortName: 'PLAYA DEL CARMEN CENTRO',
            direccion: 'SM. 56 MZA. 1 Lote 55, Av. Prolongación, Luis Donaldo Colosio, Fracc. Santa Fé, Playa del Carmen, México.',
            contacto: 'WhatsApp. (984) 187 6258',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/playacentro.jpg',
            fb: 'https://www.facebook.com/wallsplayacolosio/?ref=br_rs', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/'

        }, 
        playa: {
            nombre: 'WALL´S BARBERSHOP PLAYA DEL CARMEN',
            shortName: 'PLAYA DEL CARMEN',
            direccion: '15 Avenida norte, entre calle 8 y calle 10, Colonia centro, plaza pelícanos, Playa del Carmen, Quintana Roo, México.',
            contacto: 'Tel. (984) 803 3742 y WhatsApp. (984) 142 3333',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/playa.png',
            fb: 'https://www.facebook.com/wallsbarbershopplayadelcarmen/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_playa/'
        },
        campeche: {
            nombre: 'WALLS CAMPECHE',
            shortName: 'CAMPECHE',
            direccion: 'Av. López Portillo #28, Plaza Kaniste Local 1, San Francisco, Campeche.',
            contacto: 'Tel. (981) 812 7975 y WhatsApp. (981) 107 2609',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Campeche.jpg',
            fb: 'https://www.instagram.com/wallsbarbershop_playa/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_campeche/'
        }
    };
    $scope.sucursalesColumna2 = {
        veracruz: {
            nombre : 'WALL´S BARBERSHOP BOCA DEL RIO',
            shortName: 'BOCA DEL RIO',
            direccion: 'Paseo costa verde #583 interior 107 Plaza Marlyn, fraccionamiento costa verde esquina jacarandás.',
            contacto: 'Tel. 688 4491  y WhatsApp. 229 110 47 41',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Boca.jpg',
            fb: '', 
            instagram : ''
        },
        aguasCalientes: {
            nombre: 'WALL´S BARBERSHOP AGUASCALIENTES',
            shortName: 'AGUASCALIENTES',
            direccion: 'Plaza Santa Fe, local 38, Av. Universidad #811, Bosques del prado sur, Aguascalientes, México.',
            contacto: 'Tel. 449 288 1015 y WhatsApp. 449 196 1237',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Aguascalienstes.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopbocadelrio/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_boca/'
        },
        tuxtla: {
            nombre: 'WALL´S BARBERSHOP TUXTLA GTZ',
            shortName: 'TUXTLA',
            direccion: 'Boulevard Doctor Belisario Domínguez, Plaza Santa Elena Tuxtla, Gtz, Chiapas, México.',
            contacto: 'Tel. (961) 121 4081 y WhatsApp. (961) 243 1583 ',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/walls-tuxtla.png',
            fb: 'https://www.facebook.com/wallstuxtlagtz/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_tuxtlagtz/'
        },
        queretaro: {
            nombre: 'WALL´S BARBERSHOP QUERETARO',
            shortName: 'QUERETARO',
            direccion: 'Calle Camino Real de Carretas #139, Lomas de Carreta, Querétaro, México.',
            contacto: 'Tel. (442) 403 2574 y WhatsApp. (442) 466 2384',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Queretaro.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopmilenio3/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_qro/'
        },
        edoMx: {
            nombre: 'WALL´S BARBERSHOP SATÉLITE',
            shortName: 'SATÉLITE',
            direccion: 'Calle Manuel E Izaguirre #4 Local C. Ciudad Satélite Naucalpan de Juárez, Estado de México.',
            contacto: 'Tel. 2155 4934',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Satelite.jpg',
            fb: 'https://www.facebook.com/wallsbarbershopsatelite/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_satelite/?hl=es'
        },
        cdMx: {
            nombre: 'WALL´S BARBERSHOP LA ROMA',
            shortName: 'LA ROMA',
            direccion: 'Calle Cozumel esquina con Puebla, Colonia La Roma, Ciudad de México.',
            contacto: 'Tel. 7045 7224 y WhatsApp. (045) 998 293 4626',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/LaRoma.jpg',
            fb: 'https://www.facebook.com/wallsbarbershoplaroma/', 
            instagram : 'https://www.instagram.com/wallsbarbershop_laroma/'
        },
        guadalajara: {
                nombre: 'WALL´S BARBERSHOP GUADALAJARA',
                shortName: 'GUADALAJARA',
                direccion: 'Av. Aviación 3000, San Juan de Ocotán, 45019 Zapopan, Jal.Guadalajara (México)',
                contacto: 'Tel. (044) 332 066 34 88',
                position: '16.800000, -85.0000000',
                img: '/assets/img/sucursales/Guadalajara.jpg',
                fb: 'https://www.facebook.com/wallsbarbershoplaroma/', 
                instagram : 'https://www.instagram.com/wallsbarbershop_laroma/'
            },
        meridaPlazaArena: {
            nombre: 'WALL´S MERIDA PLAZA ARENA',
            shortName: 'PLAZA ARENA',
            direccion: 'Av. Cámara de comercio #3276 por 50 y 52 Local 2 Benito Juarez Norte',
            contacto: 'WhatsApp. 998 293 4349',
            position: '25.000000, -85.0000000',
            img: '/assets/img/sucursales/Arena.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        },
        meridaGalerias: {
            nombre: 'WALL´S GALERIAS MERIDA',
            shortName: 'GALERIAS',
            direccion: 'Calle 3 #300 entre 24 y 60 Av. Revolución, Plaza Galerías Mérida, Yucatán, México.',
            contacto: 'WhatsApp. 998 293 4627',
            position: '16.800000, -85.0000000',
            img: '/assets/img/sucursales/Galerias.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        },
        meridaUptown: {
            nombre: 'WALL´S BARBERSHOP MERIDA UPTOWN',
            shortName: 'UPTOWN',
            direccion: 'Centro comercial Uptown Mérida, Calle 17 # 104 -A por calle 10 y calle 32-A Col. Vista alegre',
            contacto: 'WhatsApp. 999 304 7933',
            position: '8.000000, -85.0000000',
            img: '/assets/img/sucursales/Uptown.jpg',
            fb: 'https://www.facebook.com/wallsmerida/', 
            instagram : 'https://www.instagram.com/wallsmerida/'
        }
    };
    var columna1aux = $scope.sucursalesColumna1
    var columna2aux = $scope.sucursalesColumna2

    /*
    $scope.sucursalesColumna1.cancun = sucursales.cancun;
    $scope.sucursalesColumna1.chetumal = sucursales.chetumal.chetumal;
    $scope.sucursalesColumna1.isla = sucursales.isla.isla;
    $scope.sucursalesColumna1.cozumel = sucursales.cozumel.cozumel;
    $scope.sucursalesColumna1.playaCentro = sucursales.playa.playaCentro;
    $scope.sucursalesColumna1.playa = sucursales.playa.playa;
    $scope.sucursalesColumna1.campeche = sucursales.campeche.campeche;
    $scope.sucursalesColumna1.merida = sucursales.merida;
    var sucursalesSeccion3  = {};
    sucursalesSeccion3.columna1 = {};
    sucursalesSeccion3.columna2 = {};
    sucursalesSeccion3.columna1.veracruz = sucursales.veracruz.veracruz;
    sucursalesSeccion3.columna1.aguasCalientes = sucursales.aguasCalientes.aguasCalientes;
    sucursalesSeccion3.columna1.tuxtla = sucursales.tuxtla.tuxtla;
    sucursalesSeccion3.columna1.queretaro = sucursales.queretaro.queretaro;
    sucursalesSeccion3.columna2.cdMx = sucursales.cdMx.cdMx;
    sucursalesSeccion3.columna2.edoMx = sucursales.cdMx.edoMx;
    sucursalesSeccion3.columna2.guadalajara = sucursales.guadalajara.guadalajara
    /*$scope.sucursalesSeccion1 = sucursalesSeccion1;
    $scope.sucursalesSeccion2 = sucursalesSeccion2;
    $scope.sucursalesSeccion3 = sucursalesSeccion3;
    $scope.seccion1Show = 'none';
    $scope.seccion2Show = 'none';
    $scope.seccion3Show = 'inithial';

    $scope.sucursales = sucursales.cancun;*/
    
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.cambiarSucursalDesktop = function(e, key, state){
        $scope.actualMap = state;
        NgMap.getMap().then(function(map) {
            for (var i in map.customMarkers[2]) {
                map.customMarkers[i].el.className = 'disappear'
            }
        });
        $timeout(function(){
            $scope.sucursales = sucursales[key];
        },1200);
    }
    $scope.mostrarSucursalMovil = function(table){
        //angular.element(document.querySelector('#sucursal-movil')).addClass('disappear');
        //$timeout(function(){ 
            if(table == 1){
                $scope.seccion1Show = 'inithial';
                $scope.cerrarSucursalMovil(2);
                $scope.cerrarSucursalMovil(3);
            }
            if(table == 2){
                $scope.seccion2Show = 'inithial';
                $scope.cerrarSucursalMovil(3);
                $scope.cerrarSucursalMovil(1);
            }
            if(table == 3){
                $scope.seccion3Show = 'inithial';
                $scope.cerrarSucursalMovil(2);
                $scope.cerrarSucursalMovil(1);

            }
            //angular.element(document.querySelector('#sucursal-movil')).removeClass('disappear');
            //angular.element(document.querySelector('#sucursal-movil')).addClass('appear');
            //angular.element(document.querySelector('#sucursal-movil')).removeClass('appear');
        //},1200);
    }
    $scope.cerrarSucursalMovil = function(table){
        //angular.element(document.querySelector('#sucursal-movil')).addClass('disappear');
        //$timeout(function(){ 
            if(table == 1){
                $scope.seccion1Show = 'none';
            }
            if(table == 2){
                $scope.seccion2Show = 'none';
            }
            if(table == 3){
                $scope.seccion3Show = 'none';
            }
            //angular.element(document.querySelector('#sucursal-movil')).removeClass('disappear');
            //angular.element(document.querySelector('#sucursal-movil')).addClass('appear');
            //angular.element(document.querySelector('#sucursal-movil')).removeClass('appear');
        //},1200);
    }
    var i = 0;
    var cambiarTexto = function(){
        if(i == 0){
            angular.element(document.querySelector('#texto1')).addClass('slide-right-to-left-exit');
            angular.element(document.querySelector('#texto2')).removeClass('slide-right-to-left-exit');
            angular.element(document.querySelector('#texto2')).removeClass('slide-right-to-left-enter');
            angular.element(document.querySelector('#texto2')).addClass('slide-right-to-left-enter'); 
            
            angular.element(document.querySelector('#texto1-movil')).removeClass('appepar');
            angular.element(document.querySelector('#texto1-movil')).addClass('disappear');
            angular.element(document.querySelector('#texto2-movil')).removeClass('disapepar');
            angular.element(document.querySelector('#texto2-movil')).addClass('appear');
            i++;
        }
        else
        {
            i = 0;
            angular.element(document.querySelector('#texto2')).addClass('slide-right-to-left-exit');
            angular.element(document.querySelector('#texto1')).removeClass('slide-right-to-left-exit');
            angular.element(document.querySelector('#texto1')).removeClass('slide-right-to-left-enter');
            angular.element(document.querySelector('#texto1')).addClass('slide-right-to-left-enter');

            angular.element(document.querySelector('#texto2-movil')).removeClass('appear');
            angular.element(document.querySelector('#texto2-movil')).addClass('disapepar');
            angular.element(document.querySelector('#texto1-movil')).removeClass('appear');
            angular.element(document.querySelector('#texto1-movil')).removeClass('disappear');
            angular.element(document.querySelector('#texto1-movil')).addClass('appear'); 
        }
    }
    
    $interval(cambiarTexto, 9600);
    
    $window.onscroll = function(event){
        if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 0 & window.scrollY >= 50){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');

          $scope.$apply();
        }
        if(window.scrollY <= 50){
          $scope.cabecera.position = 'absolute';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
          $scope.cabecera.top = '5%';
          $scope.logoTransform = 'scale(1, 1)';
          $scope.cabecera.fontColor = 'white';
          $scope.iconColor = 'white';
          $scope.cabecera.source = '/assets/img/logo.png';
          $scope.$apply();
        }
    }
}]);
angular.module('application').controller('sucursalesCtrlV2',
  ['$scope', '$window', 'NgMap', '$interval', '$timeout', '$state', '$sharedData', function($scope, $window, NgMap, $interval, $timeout, $state, $sharedData){
    document.title = "Sucursales- Wall´s Barbershop";
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.logoTransform = '';
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';
    
    $scope.displaySesionN = 'none';
    $scope.sucursalInfoDiv;
    $scope.selectSucursal;
    $scope.mapSucursalDiv = '180px';
    $scope.mapCenter = "23.848025, -98.605808";
    $scope.telefonoMarginTop = null;
    $scope.whatsappMarginTop = null;

    $scope.selectSucursal = function(key){
        for (var k in $scope.sucursales) {
            $scope.sucursales[k].select = false;
        }
        if(!$scope.sucursales[key].select){
            $scope.sucursales[key].select = true;
        }
        else{
            $scope.sucursales[key].select = false;
        }
    }
    $scope.hideInfoDiv = function(marker, param, key){
        $scope.sucursalInfoDiv = false;
        if(param){
            $scope.showInfoDiv(key);
        }
    }
    $scope.showInfoDiv =function(key){
        if(key){
            //console.log('centrando')
            $scope.selectSucursal = $scope.sucursales[key];
            if(!$scope.selectSucursal.whatsapp){
                $scope.telefonoMarginTop = '7px'
            }
            else{
                $scope.telefonoMarginTop = null;
            }
            if(!$scope.selectSucursal.telefono){
                $scope.whatsappMarginTop = '7px'
            }
            else{
                $scope.whatsappMarginTop = null;
            }
            var x = parseFloat($scope.selectSucursal.x) ;
            console.log($scope.selectSucursal.x, x);
            //$scope.mapCenter = "0,0";

            $scope.mapCenter = $scope.selectSucursal.y + "," + x;
        }
        $timeout(function(){
            $scope.sucursalInfoDiv = true;
        }, 500);
        
    }
    var displayMenu = 'none';
    
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.appearItem = function(item){
      angular.element(document.querySelector('#' + item)).removeClass('disappear1S');
      angular.element(document.querySelector('#' + item)).addClass('appear1S');
    }
    $scope.disappearItem = function(item){
      angular.element(document.querySelector('#' + item)).addClass('disappear1S');
    }
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    $scope.sucursales = $sharedData.getSucursales();

    $scope.mostrarMenu = function (){
        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    
    
    $window.onscroll = function(event){
        if(document.getElementById('cabecera-walls-logo').getBoundingClientRect().top <= 0){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');

          $scope.$apply();
        }
        if(window.scrollY <= 5){
          $scope.cabecera.position = 'absolute';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
          $scope.cabecera.top = '3%';
          $scope.logoTransform = 'scale(1, 1)';
          $scope.cabecera.fontColor = 'white';
          $scope.iconColor = 'white';
          $scope.cabecera.source = '/assets/img/logo.png';
          $scope.$apply();
        }
    }
}]);
angular.module('application').controller('wallsCardCtrl',
  ['$scope', '$window', '$state', '$dbApi', 'FoundationApi', '$messageApi', function($scope, $window,  $state, $dbApi, FoundationApi, $messageApi){
  	$scope.screenHeight = '720px';
  	console.log($scope.screenHeight);
  	$scope.displaySesionN = 'none';
    angular.element(document.querySelector('#selloBounce2s')).addClass('bounceIn2s');
    angular.element(document.querySelector('#fadeInLeftIcon2s')).addClass('fadeInLeft2s');
    angular.element(document.querySelector('#fadeInRight2sIcon')).addClass('fadeInRight2s');
	$scope.step1 = true;
	$scope.cabecera = {};
    $scope.passMissMatch;
    $scope.codeMissMatch;
    $scope.passwordRecovery = {};
    /*
    $scope.cabecera.position = 'absolute';
    $scope.cabecera.fontColor = 'black';
    $scope.actualBody = 1;
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.iconColor = '#333';*/
    $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
     $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
          $scope.cabecera.background = 'rgba(255, 255, 255, .9)';
          

    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.mostrarMenu = function (){
            console.log($scope.displayMenu);

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.sendPasswordCode = function(){
    	$scope.passwordSpinner = true;
    	$scope.step1 = false;
    	$messageApi.sendPasswordCode($scope.clientData.cardMail).then(function(response){
    		$scope.passwordSpinner = false;
    		console.log(response);
    		if(response.data != 'error'){
    			$scope.passwordRecovery.code = response.data.code;
                $scope.passwordRecovery.card = response.data.num;
                $scope.passwordRecovery.email = response.data.email;
    			$scope.step2 = true;
    		}
    		else{
    			$scope.step3 = true;
    		}
    	});
    }
    $scope.passwordCompare = function(){

    	if($scope.passwordRecovery.pass != $scope.passwordRecovery.pass2){
            $scope.passwordRepit = 'red 2px solid';    
            $scope.passMissMatch = true;    
        }
        else{
            $scope.passwordRepit = '';
            $scope.passMissMatch = false;    
        }
    }

    $scope.changePassword = function(){
        if($scope.passwordRecovery.code != $scope.passwordRecovery.userCode){
            $scope.recoveryCode = 'red 2px solid';
            $scope.codeMissMatch = true;
        }
        else{
            $scope.recoveryCode = '';
            $scope.codeMissMatch = true;
        }
        if($scope.passwordRecovery.pass == $scope.passwordRecovery.pass2 & $scope.passwordRecovery.code == $scope.passwordRecovery.userCode){
            $dbApi.updatePass($scope.passwordRecovery);
            $scope.closeRecoveryPass();
            FoundationApi.publish('main-notifications', { title: 'Cambiado', content: 'contraseña cambiada correctamente', color: '#7A7A7A', image: './assets/img/icono-navajas-walls-min.png', autoclose : '3000'});
        }
    }
    $scope.closeRecoveryPass = function(){
        $scope.passwordRecovery = {};
        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;
        FoundationApi.publish('password-recovery-modal', 'close');
    }
    $scope.scrollToRegist = function(){
        var elementTop = document.getElementById('bounceInForm1s').getBoundingClientRect().top - 200;
        window.scrollTo(0, elementTop);
    }
     $scope.scrollToPoints = function(){
        var elementTop = document.getElementById('bounceInPointsForm1s').getBoundingClientRect().top;
        window.scrollTo(0, elementTop);
    }


	$scope.clientInfoError = false;
	$scope.clientData = {};
	$scope.regist = {};
	$scope.sucursales = [];
	$scope.clientInfo;
	$scope.loadSucursal = function(){
		switch($scope.regist.state){
			case '1':
				$scope.sucursales = [{nombre : 'WALL´S BARBERSHOP AGUASCALIENTES',
										id: '24'}];
				break;
			case '14':
				$scope.sucursales = [{nombre : 'WALL´S BARBERSHOP GUADALAJARA',
										id: '23'}];
				break;
			case '15':
				$scope.sucursales = [{nombre : 'WALL´S BARBERSHOP SATELITE',
										id: '25'}];
				break;
			case '22':
				$scope.sucursales = [{nombre : 'WALL´S BARBERSHOP QUERETARO' , id : '20'}];
				break;
			case '9':
				$scope.sucursales = [{nombre : 'WALL´S BARBERSHOP LA ROMA', id: '21'}];
				break;
			case '30':
				$scope.sucursales = [{nombre: 'WALL´S BARBERSHOP BOCA DEL RIO', id: '9'}];
				break;
			case '5':
				$scope.sucursales = [{nombre: 'WALL´S BARBERSHOP TUXTLA GTZ', id: '18'}];
				break;
			case '4':
				$scope.sucursales = [{nombre: 'WALLS CAMPECHE', id: '11'}];
				break;
			case '31':
				$scope.sucursales = [{nombre: 'WALL´S MERIDA PLAZA ARENA', id: '15'}, {nombre:'WALL´S GALERIAS MERIDA', id: '16'}, {nombre: 'WALL´S BARBERSHOP MERIDA UPTOWN', id: '17'}];
				break;
			case '23':
				$scope.sucursales = [{nombre: 'WALLS CHETUMAL', id: '14'}, {nombre: 'WALL´S BARBERSHOP PLAYA DEL CARMEN CENTRO', id: '13'}, 
				{nombre: 'WALL´S BARBERSHOP PLAYA DEL CARMEN', id: '7'}, {nombre: 'WALL´S BARBERSHOP COZUMEL', id: '5'},
				{nombre: 'WALL´S BARBERSHOP ISLA MUJERES', id: '10'}, {nombre: 'WALL´S BARBERSHOP BONAMPAK', id: '1'}, {nombre: 'WALL´S LAS TORRES', id: '2'},
				{nombre: 'WALL´S BARBERSHOP KABAH', id: '12'}];
				break;
		};
	}
	$scope.sendRegist = function(){
		$dbApi.registUser($scope.regist).then(function(response){
			if(response.data == 'exito'){
				FoundationApi.publish('main-notifications', { title: '¡Registrado!', content: 'Registrado correctamente', color: '#7A7A7A', image: './assets/img/icono-navajas-walls-min.png', autoclose : '3000'});
				$scope.regist = {};
				$scope.scrollToPoints();
			}else{
				FoundationApi.publish('main-notifications', { title: 'Error', content: 'cuenta ya registrada', color: '#7A7A7A', image: './assets/img/icono-navajas-walls-min.png', autoclose : '3000'});
			}
		});
	}
	$scope.getClientData = function(){
		$scope.clientInfo = null;
		$scope.clientInfoError = null;
		FoundationApi.publish('pointsModal', 'open');
		$dbApi.getClientData($scope.clientData).then(function(clientData){
			if(clientData.data){
				$scope.clientInfo = clientData.data;
			}
			else{
				$scope.clientInfoError = true;
			}
			
		});
	}

	$window.onscroll = function(event){
		/*if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 0 & window.scrollY >= 50){
          $scope.cabecera.position = 'fixed';
          $scope.cabecera.top = '0px';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.fontColor = 'black';
          $scope.iconColor = '#333';
            angular.element(document.querySelector('#cabeceraDiv')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDiv')).removeClass('from-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).addClass('to-white');
            angular.element(document.querySelector('#cabeceraDivMovil')).removeClass('from-white');
          $scope.$apply();
        }
	    if(window.scrollY <= 50){
	        $scope.cabecera.position = 'absolute';
	        angular.element(document.querySelector('#cabeceraDiv')).addClass('from-white');
	        angular.element(document.querySelector('#cabeceraDivMovil')).addClass('from-white');
	        $scope.cabecera.top = '5%';
	        $scope.logoTransform = 'scale(1, 1)';
	        $scope.cabecera.fontColor = 'black';
	        $scope.iconColor = 'white';
	        $scope.$apply();
	      }*/
		if((document.getElementById('bounceIn1sMembrecia').getBoundingClientRect().top + 00) <= screen.height){
        	angular.element(document.querySelector('#bounceIn1sMembrecia')).addClass('bounceIn1s');
    	}
		if((document.getElementById('fadeInLeftIcons1s').getBoundingClientRect().top + 100) <= screen.height){
        	angular.element(document.querySelector('#fadeInLeftIcons1s')).addClass('fadeInLeft1s');
        	angular.element(document.querySelector('#fadeInRightIcons1s')).addClass('fadeInRight1s');
    	}
    	if((document.getElementById('bounceInCard1s').getBoundingClientRect().top + 100) <= screen.height){
        	angular.element(document.querySelector('#bounceInCard1s')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('bounceInRegistraText1s').getBoundingClientRect().top +100) <= screen.height){
        	angular.element(document.querySelector('#bounceInRegistraText1s')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('bounceInRegistraText1s').getBoundingClientRect().top +200) <= screen.height){
        	angular.element(document.querySelector('#bounceInForm1s')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('bounceInPointsForm1s').getBoundingClientRect().top +100) <= screen.height){
        	angular.element(document.querySelector('#bounceInPointsForm1s')).addClass('bounceIn1s');
    	}
    	if((document.getElementById('fadeInLeftBigText2s').getBoundingClientRect().top +00) <= screen.height){
        	angular.element(document.querySelector('#fadeInLeftBigText2s')).addClass('fadeInLeftBig2s');
    	}
	}
 }]);