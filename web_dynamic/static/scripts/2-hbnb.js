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
});
