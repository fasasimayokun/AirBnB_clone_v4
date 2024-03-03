// a script listen for changes on each input checkbox tag
$(document).ready(function () {
  const amenities = []
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amenities.push($(this).attr('data-name'));
    } else {
      const nameIndex = amenities.indexof($(this).attr('data-name'));
      amenities.splice(nameIndex, 1);
    }
    $('.amenities h4').text(amenities.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
       return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests${
						place.max_guest !== 1 ? "s" : ""
					}</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
      }));
    }
  });
});
