(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    //maps
    'ngMap',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider ) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();

angular.module('application').controller('franquiciasCtrl',
  ['$scope', '$window', 'NgMap', '$state', '$messageApi', function($scope, $window, NgMap, $state, $messageApi){
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
        console.log($scope.message);
        $messageApi.sendMessage($scope.message);
    }

    $scope.scroll = function(){
        var elementTop = document.getElementById('info-bounce').getBoundingClientRect().top;
        elementTop = elementTop + 100;
        window.scrollTo(0, elementTop);
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
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.cabecera.fontColor = 'white';
        $scope.iconColor = 'white';
        $scope.cabecera.source = '/assets/img/logo.png';
        $scope.$apply();
      }
    if((document.getElementById('fadeInLeft-logo').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#fadeInLeft-logo')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('fadeIn-text').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#fadeIn-text')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('single1').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#single1')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single2').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#single2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single3').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#single3')).addClass('fadeInUp1s');
    }
    if((document.getElementById('fadeInLeftBig-title').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#fadeInLeftBig-title')).addClass('fadeInLeftBig2s');
    }
    if((document.getElementById('fadeInLeft-text').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#fadeInLeft-text')).addClass('fadeInLeft1s');
    }
    if((document.getElementById('single2').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#single2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('single-area2').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#single-area2')).addClass('fadeInUp1s');
    }
    if((document.getElementById('info-bounce').getBoundingClientRect().top + 300) <= screen.height){
        angular.element(document.querySelector('#info-bounce')).addClass('bounceIn1s');
    }    
   }
}]);

angular.module('application').controller('galeriaCtrl',
  ['$scope', '$window', 'FoundationApi', '$sce', '$state', function($scope, $window, FoundationApi, $sce, $state){
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
    $scope.cabecera.position = 'absolute';
    $scope.cabecera.fontColor = 'black';
    $scope.actualBody = 1;
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.iconColor = '#333';
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
    $scope.gallery = {
      col1: [
        '/assets/img/galeria/1.jpg',
        '/assets/img/galeria/3.jpg',
        '/assets/img/galeria/2.jpg',
        '/assets/img/galeria/9.jpg',
        '/assets/img/galeria/4.jpg',
      ],
      col2: [
        '/assets/img/galeria/7.jpg',
        '/assets/img/galeria/6.jpg',
        '/assets/img/galeria/13.jpg',
        '/assets/img/galeria/5.jpg',
        '/assets/img/galeria/8.jpg',
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
    
    if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 0 & window.scrollY >= 50){
          $scope.cabecera.position = 'fixed';
          $scope.logoTransform = 'scale(0.8, 0.8)';
          $scope.cabecera.top = '0px';
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
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.$apply();
      }
    if((document.getElementById('cuerpo1').getBoundingClientRect().top -50)  <= 0 & (document.getElementById('cuerpo1').getBoundingClientRect().top) >= -1000){
      $scope.actualBody = 2;
      console.log("pequeño" + " - " + document.getElementById('cuerpo1').getBoundingClientRect().top);
      $scope.$apply();
    } else if((document.getElementById('cuerpo1').getBoundingClientRect().top -50)  >= 0){
      $scope.actualBody = 1;
      console.log("head")
      $scope.$apply();
    }
    if((document.getElementById('cuerpo2').getBoundingClientRect().top -50)  <= 0){
      console.log("video")
      $scope.actualBody = 3;
      $scope.$apply();
    }
    for(var i = 0; i < document.getElementsByClassName('galleryBox').length; i++){
      if((document.getElementsByClassName('galleryBox')[i].getBoundingClientRect().top + 50) <= screen.height){
          angular.element(document.getElementsByClassName('galleryBox')[i]).addClass('appear');
      }
    }
  }
}]);

angular.module('application').controller('homeCtrl',
  ['$scope', '$window', 'NgMap', '$state', function($scope, $window, NgMap, $state){
    $scope.mostrarMenu = function (){

        if($scope.displayMenu == 'initial'){
            $scope.displayMenu = 'none';
        }
        else{
            $scope.displayMenu = 'initial';
        }
    }
    $scope.goMap = function(e, state){
      $state.go(state).then(function(){
           window.location.reload(true); 
        });
    }
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';

   
    if(screen.width <= 768){
      $scope.zoom = 5;
    }
    else{
      $scope.zoom = 6;
    }
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
        $scope.cabecera.top = '3%';
        $scope.logoTransform = 'scale(1, 1)';
        $scope.cabecera.fontColor = 'white';
        $scope.iconColor = 'white';
        $scope.cabecera.source = '/assets/img/logo.png';
        $scope.$apply();
      }
    if(window.scrollY >= (body1Height/2)){
      $scope.actualBody = 1;
      $scope.$apply();
    } else if(window.scrollY <= (body1Height/2)){
      $scope.actualBody = 0;
      $scope.$apply();
    }
    if(window.scrollY >= cuerpo2top){
      $scope.actualBody = 2;
      console.log('cuerpo2');
      $scope.$apply();
    }
    else if(window.scrollY <= (cuerpo2top) & window.scrollY >= (body1Height/2) ){
      $scope.actualBody = 1;
      $scope.$apply();
    }
   }
}]);

angular.module('application')
.factory('$messageApi', function($http){
    var baseUrl = 'https://www.mr-barbas.com/php/';

    var post = function(url, body){
      body = body || {};
      return $http.post(baseUrl+url, body);
    }
    var get = function(url){
      return $http.get(baseUrl+url);
    }

    return {
      sendMessage : function(message){
       return get('sendMessage.php?name=' + message.name + '&email=' + message.email + '&empresa=' + message.empresa +
        '&address=' + message.address + '&phone=' + message.phone + '&state=' + message.state +'&why=' + message.why);
      }
    }
  });
angular.module('application').controller('serviciosCtrl',
  ['$scope', '$window', '$state', function($scope, $window, $state){
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
    	console.log(document.getElementById('cuerpo-absolute').getBoundingClientRect().bottom + " - " + document.getElementById('cuerpo-absolute').getBoundingClientRect().top);
    	//console.log(document.getElementById('cuerpo1-servicios').getBoundingClientRect());
    	if((document.getElementById('foto-fila-1').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-1')).addClass('slide-left-to-right');
    	}
    	if((document.getElementById('texto-fila-1').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-1')).addClass('slide-right-to-left');
    	}
    	if((document.getElementById('foto-fila-2').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-2')).addClass('slide-right-to-left');
    	}
    	if((document.getElementById('texto-fila-2').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-2')).addClass('slide-left-to-right');
    	}
    	if((document.getElementById('foto-fila-3').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-3')).addClass('slide-left-to-right');
    	}
    	if((document.getElementById('texto-fila-3').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-3')).addClass('slide-right-to-left');
    	}
    	if((document.getElementById('foto-fila-4').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-4')).addClass('slide-right-to-left');
    	}
    	if((document.getElementById('texto-fila-4').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-4')).addClass('slide-left-to-right');
    	}
    	if((document.getElementById('foto-fila-5').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#foto-fila-5')).addClass('slide-left-to-right');
    	}
    	if((document.getElementById('texto-fila-5').getBoundingClientRect().bottom - 700) <= screen.height){
    		angular.element(document.querySelector('#texto-fila-5')).addClass('slide-right-to-left');
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
	    if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 0 & window.scrollY >= 50){
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
        if(window.scrollY <= 50){
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
angular.module('application').controller('sucursalesCtrl',
  ['$scope', '$window', 'NgMap', '$interval', '$timeout', '$state', function($scope, $window, NgMap, $interval, $timeout, $state){
    $scope.cabecera = {};
    var displayMenu = 'none';
    $scope.displayMenu = displayMenu ;
    $scope.cabecera.source = './assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.displaySesion = 'none';
    $scope.displayNumber = 'none';
    $scope.cabecera.fontColor = 'white';
    $scope.iconColor = 'white';
    $scope.actualMap = 'Cancún, Quintana Roo';
    $scope.go = function(state){
        window.scrollTo(0, 0)
        $state.go(state);
    }
    angular.element(document.querySelector('#texto1')).addClass('slide-right-to-left-enter');
    angular.element(document.querySelector('#texto1-movil')).addClass('appear');
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    var sucursales = {};
    sucursales.cancun = {
        bonampak : {
            nombre: 'WALL´S BARBERSHOP BONAMPAK',
            direccion: 'SM 4 MZA 3 Plaza Atlantis, Av. Bonampak con Av. Kukulcán, Frente a Km 0, Entrada Zona Hotelera, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 255 5569 y WhatsApp. (998) 293 4177',
            position: '25.000000, -85.0000000'
        },
        torres: {
            nombre: 'WALL´S LAS TORRES',
            direccion: 'SM 510 MZA 9 LT 10 Y 12 Planta Alta, Plaza Bamboo, Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 251 0726 y WhatsApp. (998) 293 4599',
            position: '16.800000, -85.0000000'
        },
        kabah: {
            nombre: 'WALL´S BARBERSHOP KABAH',
            direccion: 'SMZ 38 MZ 9 LT 1 al 15 Local #5 Av. Sabah, Plaza Real 10 (frente a UNID) Cancún, Quintana Roo, México.',
            contacto: 'Tel. (998) 206 8098 y WhatsApp. (998) 293 4931',
            position: '8.000000, -85.0000000'
        }
    };
    sucursales.chetumal = {
        chetumal : {
            nombre: 'WALLS CHETUMAL',
            direccion: 'Bulevar Bahía #301, entre Av. Rafael E. Melgar y Emiliano Zapata, Chetumal.',
            contacto:  'Tel. (983) 129 2705 y WhatsApp. (998) 293 4162',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.isla = {
        isla: {
            nombre: 'WALL´S BARBERSHOP ISLA MUJERES',
            direccion: 'Nicolás Bravo S/N Centro, Isla Mujeres.',
            contacto: 'Tel. 877 0496 y WhatsApp. (998) 117 1259',
            position: '16.800000, -85.0000000'
        }  
    };
    sucursales.cozumel = {
        cozumel: {
            nombre: 'WALL´S BARBERSHOP COZUMEL',
            direccion: 'Plaza Leones, 30 Avenida esquina con 1 sur cozumel, Quintana Roo, México.',
            contacto: 'WhatsApp. (987) 101 0138',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.playa = {
        playaCentro: {
            nombre : 'WALL´S BARBERSHOP PLAYA DEL CARMEN CENTRO',
            direccion: 'SM. 56 MZA. 1 Lote 55, Av. Prolongación, Luis Donaldo Colosio, Fracc. Santa Fé, Playa del Carmen, México.',
            contacto: 'WhatsApp. (984) 187 6258',
            position: '25.000000, -85.0000000'
        }, 
        playa: {
            nombre: 'WALL´S BARBERSHOP PLAYA DEL CARMEN',
            direccion: '15 Avenida norte, entre calle 8 y calle 10, Colonia centro, plaza pelícanos, Playa del Carmen, Quintana Roo, México.',
            contacto: 'Tel. (984) 803 3742 y WhatsApp. (984) 142 3333',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.merida = {
        meridaPlazaArena: {
            nombre: 'WALL´S MERIDA PLAZA ARENA',
            direccion: 'Av. Cámara de comercio #3276 por 50 y 52 Local 2 Benito Juarez Norte',
            contacto: 'WhatsApp. 998 293 4349',
            position: '25.000000, -85.0000000'
        },
        meridaGalerias: {
            nombre: 'WALL´S GALERIAS MERIDA',
            direccion: 'Calle 3 #300 entre 24 y 60 Av. Revolución, Plaza Galerías Mérida, Yucatán, México.',
            contacto: 'WhatsApp. 998 293 4627',
            position: '16.800000, -85.0000000'
        },
        meridaUptown: {
            nombre: 'WALL´S BARBERSHOP MERIDA UPTOWN',
            direccion: 'Centro comercial Uptown Mérida, Calle 17 # 104 -A por calle 10 y calle 32-A Col. Vista alegre',
            contacto: 'WhatsApp. 999 304 7933',
            position: '8.000000, -85.0000000'
        }
    };
    sucursales.campeche = {
        campeche: {
            nombre: 'WALLS CAMPECHE',
            direccion: 'Av. López Portillo #28, Plaza Kaniste Local 1, San Francisco, Campeche.',
            contacto: 'Tel. (981) 812 7975 y WhatsApp. (981) 107 2609',
            position: '16.800000, -85.0000000'
        }
    }
    sucursales.veracruz = {
        veracruz: {
            nombre : 'WALL´S BARBERSHOP BOCA DEL RIO',
            direccion: 'Paseo costa verde #583 interior 107 Plaza Marlyn, fraccionamiento costa verde esquina jacarandás.',
            contacto: 'Tel. 688 4491  y WhatsApp. 229 110 47 41',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.aguasCalientes = {
        aguasCalientes: {
            nombre: 'WALL´S BARBERSHOP AGUASCALIENTES',
            direccion: 'Plaza Santa Fe, local 38, Av. Universidad #811, Bosques del prado sur, Aguascalientes, México.',
            contacto: 'Tel. 449 288 1015 y WhatsApp. 449 196 1237',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.tuxtla = {
        tuxtla: {
            nombre: 'WALL´S BARBERSHOP TUXTLA GTZ',
            direccion: 'Boulevard Doctor Belisario Domínguez, Plaza Santa Elena Tuxtla, Gtz, Chiapas, México.',
            contacto: 'Tel. (961) 121 4081 y WhatsApp. (961) 243 1583 ',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.queretaro = {
        queretaro: {
            nombre: 'WALL´S BARBERSHOP QUERETARO',
            direccion: 'Calle Camino Real de Carretas #139, Lomas de Carreta, Querétaro, México.',
            contacto: 'Tel. (442) 403 2574 y WhatsApp. (442) 466 2384',
            position: '16.800000, -85.0000000'      
        }
    };
    sucursales.cdMx = {
        edoMx: {
            nombre: 'WALL´S BARBERSHOP SATÉLITE',
            direccion: 'Calle Manuel E Izaguirre #4 Local C. Ciudad Satélite Naucalpan de Juárez, Estado de México.',
            contacto: 'Tel. 2155 4934',
            position: '25.000000, -85.0000000'
        },
        cdMx: {
            nombre: 'WALL´S BARBERSHOP LA ROMA',
            direccion: 'Calle Cozumel esquina con Puebla, Colonia La Roma, Ciudad de México.',
            contacto: 'Tel. 7045 7224 y WhatsApp. (045) 998 293 4626',
            position: '16.800000, -85.0000000'
        }
    };
    sucursales.guadalajara = {
        guadalajara: {
                nombre: 'WALL´S BARBERSHOP GUADALAJARA',
                direccion: 'Av. Aviación 3000, San Juan de Ocotán, 45019 Zapopan, Jal.Guadalajara (México)',
                contacto: 'Tel. (044) 332 066 34 88',
                position: '16.800000, -85.0000000'
            }
    };

    var sucursalesSeccion1  = {};
    sucursalesSeccion1.columna1 = sucursales.cancun;
    sucursalesSeccion1.columna2 = {};
    sucursalesSeccion1.columna2.chetumal = sucursales.chetumal.chetumal;
    sucursalesSeccion1.columna2.isla = sucursales.isla.isla;
    sucursalesSeccion1.columna2.cozumel = sucursales.cozumel.cozumel;
    var sucursalesSeccion2 = {};
    sucursalesSeccion2.columna1 = {};    
    sucursalesSeccion2.columna1.playaCentro = sucursales.playa.playaCentro;
    sucursalesSeccion2.columna1.playa = sucursales.playa.playa;
    sucursalesSeccion2.columna1.campeche = sucursales.campeche.campeche;
    sucursalesSeccion2.columna2 = sucursales.merida;
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
    $scope.sucursalesSeccion1 = sucursalesSeccion1;
    $scope.sucursalesSeccion2 = sucursalesSeccion2;
    $scope.sucursalesSeccion3 = sucursalesSeccion3;
    $scope.seccion1Show = 'none';
    $scope.seccion2Show = 'none';
    $scope.seccion3Show = 'inithial';

    $scope.sucursales = sucursales.cancun;
    
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
          $scope.cabecera.top = '3%';
          $scope.logoTransform = 'scale(1, 1)';
          $scope.cabecera.fontColor = 'white';
          $scope.iconColor = 'white';
          $scope.cabecera.source = '/assets/img/logo.png';
          $scope.$apply();
        }
    }
}]);