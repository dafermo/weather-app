$(document).on("mobileinit", function(){


	$(function(){
	


// 1er code




	// var mapa = document.getElementById('mapa');

	// con esto pillas la ubicacion en la que estas al entrar fn_ok significa que pilla bien la ubicacion

	navigator.geolocation.getCurrentPosition(fn_ok, fn_error);  

	var latitud;
	var longitud;
	
	function fn_ok(respuesta) {
		latitud = respuesta.coords.latitude;
		longitud = respuesta.coords.longitude;
		var coordenada = latitud + ',' + longitud;
		// mapa.innerHTML += '<img src="http://maps.googleapis.com/maps/api/staticmap?size=800x600&markers='+coordenada+'" alt="mapa ubicación">'
		
		$.ajax({
    		url: 'http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48',
    		data: { lat:latitud, lon:longitud },
			success: function (response) {
     // 			console.log(tiempo);
     // 			var t = tiempo.main.temp-272.15;
     // 			t = t.toFixed(2); 
     // 			var h = tiempo.main.humidity;
     // 			var t_min = tiempo.main.temp_min-272.15;
     // 			t_min = t_min.toFixed(2);
     // 			var t_max = tiempo.main.temp_max-272.15;
     //			t_max = t_max.toFixed(2);
	//			var v = tiempo.wind.speed;
	//			var c = tiempo.name;
	//			var d = tiempo.weather[0].description; //????????
	//			var p = response.sys.country

			
	var fecha = new Date();
	var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
	$("#dia").html(dias[fecha.getDay()]);
	$("#theo").html(parseInt(response.main.temp-272.15) + "º");
	$("#ciudad").html(response.name + "," + response.sys.country);
	
	$("#descripcion").html(response.weather[0].description.toUpperCase());
	$("#icono").attr("src","/iconos/"+response.weather[0].icon+".png");
	$("#humedad").html("HUMEDAD " + response.main.humidity + "%");
	$("#viento").html("VIENTO " + response.wind.speed + "m/s");
	$("#temMinMax").html("MIN/MAX " + parseInt(response.main.temp_min-272.15) + "º " + " / " + parseInt(response.main.temp_max-272.15) + "º");
	

			//	$("#fototiempo").attr('src', icono +'.svg');
			//	$("#ciudad").html(c);
			//	$("#descripcion").html(d);
			//	$("#theo").html(t+'º');
			//	$("#hum").html(h+'%');
			//	$("#temMinMax").html('Min/Max' +t_min + 'º' + ' ' +t_max + 'º');
			//	$("#viento").html(v+'Km/h');

				
    		},
    		error: function(textStatus, errorThrown ){
				alert("¡Ups! Ha habido un error: " + errorThrown);
    		}
		});
	}

	function fn_error(fallo) {
		alert('Hubo un problema al consultar los datos: ' + fallo.message)
	}


	$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
		        var $ul = $( this ),
		            $input = $( data.input ),
		            value = $input.val(),
		            html = "";
		        $ul.html( "" );
		        if ( value && value.length > 2 ) {
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: "http://gd.geobytes.com/AutoCompleteCity",
		                dataType: "jsonp",
		                crossDomain: true,
		                data: {
		                    q: $input.val()
		                }
		            })
		            .then( function ( response ) {
		                $.each( response, function ( i, val ) {
		                    html += "<li data-icon='plus'><a href='#'>" + val + "</a></li>";
		                });
		                $ul.html( html );
		                $ul.listview( "refresh" );
		                $ul.trigger( "updatelayout");
		            });
		        }
		    });

		// HAY QUE TENER UN ARRAY CON TODAS LAS CIUDADES


		var localData = JSON.parse(localStorage.getItem('datos'));
	

		if (localData != null) {

			$.each(localData, function( index, value ) {
			
			let ciudad = "<li><a href='#'>" + localData[index] + "</a></li>";
			$("#listaciudades").append(ciudad);
			
			  });
		}

		
		

		// traer datos de localStorage 

		// recoger datos de la ciudad cuando la clickas

	  $("#autocomplete").on('click', 'li', function() {
				
		
		// pintar la ciudad en el html
		
				let ciudad = "<li><a href='#'>" + $(this).text() + "</a></li>";
				$("#listaciudades").append(ciudad);
				$("#listaciudades").listview( "refresh" );

			//	localStorage ///////////////////////////////////////////////////////////////////////////////////// 

				// traer datos de localStorage, y guardar el nuevo dato.

				// traemos datos

				var localData = JSON.parse(localStorage.getItem('datos'));

				if (localData == null) {

				localData = [];

				}

				localData.push($(this).text());
				localStorage.setItem('datos', JSON.stringify(localData));


		//				var cityToStore = JSON.stringify(this);

		//				

		//				var bramido = JSON.parse(localStorage.getItem('someCity1'));

		//				localData.push(cityToStore);

										
						$.ajax({
							url: "http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
							data: {
								q: $(this).text()},
								success: function (response) {

								}
						})
						
						.then( function ( response ) {
						
							console.log(response);
							
						});
								
		});


		///////////////////////// ir a vista ciudad con los datos nuevos

		$("#listaciudades").on('click', 'li', function() {

			$.mobile.changePage("#main", {transition: "slideup"});
			

					$.ajax({
					url: "http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
					data: { q: $(this).text(), units: "metric" },
					success: function (response) {

						console.log(response); 
						
						var fecha = new Date();
						var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
						$("#dia").html(dias[fecha.getDay()]);
						$("#theo").html(parseInt(response.main.temp) + "º");
						$("#ciudad").html(response.name + "," + response.sys.country);
						
						$("#descripcion").html(response.weather[0].description.toUpperCase());
						
						$("#hum").html("HUMEDAD " + response.main.humidity + "%");
						$("#viento").html("VIENTO " + response.wind.speed + "m/s");
						$("#temMinMax").html("MIN/MAX " + parseInt(response.main.temp_min) + "º " + " / " + parseInt(response.main.temp_max) + "º");
						
					},
					error: function(textStatus, errorThrown ){
						alert("¡Ups! Ha habido un error: " + errorThrown);
					}
				});
			});




		});
	});
