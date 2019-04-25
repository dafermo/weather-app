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
			success: function (tiempo) {
      			console.log(tiempo);
      			var icono = tiempo.weather[0].icon;
      			var t = tiempo.main.temp-272.15;
      			t = t.toFixed(2); 
      			var h = tiempo.main.humidity;
      			var t_min = tiempo.main.temp_min-272.15;
      			t_min = t_min.toFixed(2);
      			var t_max = tiempo.main.temp_max-272.15;
     			t_max = t_max.toFixed(2);
				var v = tiempo.wind.speed;
				var c = tiempo.name;
				var d = tiempo.weather[0].description; //????????




				$("#fototiempo").attr('src', icono +'.svg');
				$("#ciudad").html(c);
				$("#descripcion").html(d);
				$("#theo").html(t+'º');
				$("#hum").html(h+'%');
				$("#tmax").html(t_max+'º');
				$("#tmin").html(t_min+'º');
				$("#viento").html(v+'Km/h');

				
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


		// recoger datos de la ciudad cuando la clickas

		$('ul').on('click', 'li', function() {
			
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?appid=8d95980ea77ed071e770126d777bde48",
				data: {
					q: $(this).text()
				}

		// pintar la ciudad en el html


			})
			
			.then( function ( response ) {
		
				// aqui en vez de console log va un append con .html que pinte el div

				console.log(response);
				
				// me dice que c is not defined; ??????????????????

				$("#ciudad").html(c);
				$("#descripcion").html(d);
				$("#theo").html(t+'º');
				
				
			});
			
			
			
			
			
		});


});

});
