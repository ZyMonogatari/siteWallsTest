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

  function config($urlProvider, $locationProvider) {
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

angular.module('application').controller('homeCtrl',
  ['$scope', '$window', 'NgMap', function($scope, $window, NgMap){
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAHEDIPSO32Z4XxR71iW71oP29-B7Zh4Y";
    /*NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });*/
    $scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
   
    if(screen.width <= 414){
      $scope.zoom = 13;
    }
    else{
      $scope.zoom = 15;
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
    
    if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 30){
      $scope.cabecera.position = 'fixed';
      $scope.cabecera.top = '30px';
      $scope.cabecera.background = '#E7E7E7';
      $scope.cabecera.fontColor = 'black';
      $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
      $scope.$apply();
    }
    if(window.scrollY <= 50){
      $scope.cabecera.position = 'absolute';
      $scope.cabecera.top = '6%';
      $scope.cabecera.background = '';
      $scope.cabecera.fontColor = 'white';
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

angular.module('application').controller('serviciosCtrl',
  ['$scope', '$window',  function($scope, $window){

	var cuerpoAbsoluteTop;
    var cuerpo1TopInicial = document.getElementById('cuerpo1-servicios').getBoundingClientRect().top;

  	$scope.cabecera = {};
    $scope.cabecera.source = '/assets/img/logo.png';
    $scope.cabecera.position = 'absolute';
    $scope.actualBody = 0;
    $scope.cuerpo1 = {};
    $scope.cuerpo1.position = 'absolute';
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
	    if(document.getElementById('cabeceraDiv').getBoundingClientRect().top <= 30){
	      $scope.cabecera.position = 'fixed';
	      $scope.cabecera.top = '30px';
	      $scope.cabecera.background = '#E7E7E7';
	      $scope.cabecera.fontColor = 'black';
	      $scope.cabecera.source = '/assets/img/wallslogo-negro-min.png';
	      $scope.$apply();

	    }
	    if(window.scrollY <= 50){
	      $scope.cabecera.position = 'absolute';
	      $scope.cabecera.top = '6%';
	      $scope.cabecera.background = '';
	      $scope.cabecera.fontColor = 'white';
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