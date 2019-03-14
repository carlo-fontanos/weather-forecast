/**
 * App Class 
 *
 * @author		Carl Victor Fontanos
 * @author_url	www.carlofontanos.com
 * @date		Match 14, 2019
 *
 */

/**
 * Setup a App namespace to prevent JS conflicts.
 */
var app = {
	
	/**
     * Weather
     */
    Weather: function () {
		this.default_unit = 'metric';
		this.default_location = 'Vancouver,CA';
		this.api_url = 'http://api.openweathermap.org/data/2.5/';
		this.api_appid = '01db9c5d34d4ff213da8c6f69701fa8c';
		
		/**
		 * This method contains the list of functions that needs to be loaded
		 * when the "Weather" object is instantiated.
		 *
		 */
		this.init = function() {
			this.get_weather_data();
			this.handle_filter();
		}
		
		
		/**
		 * Handle Filter Form
		 */
		this.handle_filter = function() {
			var self = this;
			
			$('body').on('click', '.submit-filter', function(){
				if($('.input-city').val() && ! $('.input-country').val() || $('.input-country').val() && ! $('.input-city').val()){
					Lobibox.notify('error', {
						size: 'mini',
						sound: false,
						icon: false,
						position: 'bottom right',
						msg: 'City Name and Country Code is required'
					});
				} else {
					self.get_weather_data(
						$('.input-city').val(),
						$('.input-country').val(),
						$('.input-display').val(),
						$('.input-unit').val()
					);
				}
			});
		}
		
		/**
		 * Get 5 days, 3 hours Weather Data
		 */
		this.get_weather_data = function(city, country, display = 'tpl-grid', unit) {
			$.ajax({
				type: 'get',
				url: this.api_url + '/forecast',
				data: {
					q: city && country ? city + ',' + country: this.default_location,
					units: unit ? unit: this.default_unit,
					appid: this.api_appid
				},
				success: function(response){
					var text = Mustache.render($('#' + display).html(), response);
					$('.forecast-container').html(text);
					
					var unit_type = unit == 'imperial' ? 'F': 'C';
					$('.unit-type').text(unit_type);
				},
				error:function (xhr, ajaxOptions, thrownError) {
					Lobibox.notify('error', {
						size: 'mini',
						sound: false,
						icon: false,
						position: 'bottom right',
						msg: xhr.responseJSON.message
					});
				}
			});
		}
	}
}

/**
 * When the document has been loaded...
 *
 */
jQuery(document).ready( function () {
		
	weather = new app.Weather(); /* Instantiate the Weather Class */
	weather.init(); /* Load Weather class methods */

});