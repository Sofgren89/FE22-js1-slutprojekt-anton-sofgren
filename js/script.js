
$("#btn").click(function (event) {
    event.preventDefault();
    $('.lds-ring').css('visibility','initial')
    $('#img-container').html('');
   
    let text = $('#textInput').val();
    text.toLowerCase();
   
    if (text == '') {
        $('.lds-ring').css('visibility','hidden')
        alert('Please write some text');
        throw 'Please write some text';

    };

    let sortSelector = $('#sort').val();
    let pictureNumber = $('#numberInput').val();

    if (pictureNumber < 1) {
        $('.lds-ring').css('visibility','hidden')
        alert('Please choose a quantity');
        throw 'Please choose a quantity';

    };

    let apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=da9df3b628fe4099156c8892593f1d3c&text=${text}&sort=${sortSelector}&per_page=${pictureNumber}&format=json&nojsoncallback=1`

    $.getJSON(apiUrl, {

    }).done(function (data) {
        let getImage = data.photos.photo;
     
        for (let i = 0; i < getImage.length; i++) {
            let id = getImage[i].id;
            let secret = getImage[i].secret;
            let server = getImage[i].server;
            let sizeInput = $('#size').val();

            const url = `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeInput}.jpg`

            const img = $('<img>');
            img.attr('src', url);
            $('#img-container').append(img);
            $('img').css('margin','10px');
            $('img').css('box-shadow', '10px 10px 5px #888');
            $('.lds-ring').css('visibility','hidden');
        }
    }).fail(function (jqXHR, textStatus, erorrThrown) {
        console.log(jqXHR, textStatus, erorrThrown);
        $('.lds-ring').css('visibility','hidden');
    });
   
});










