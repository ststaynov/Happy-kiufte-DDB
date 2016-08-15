
window.onload = init;



function init() {
    var video = document.querySelector("#videoElement"),
        sourceID = [];

    if (typeof MediaStreamTrack === 'undefined' ||
        typeof MediaStreamTrack.getSources === 'undefined') {
      alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    } else {
      MediaStreamTrack.getSources(gotSources);
    }

    function gotSources(sourceInfos) {
      for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        if (sourceInfo.kind === 'audio') {
        } else if (sourceInfo.kind === 'video') {
            sourceID.push("" + sourceInfo.id);
            //alert('Pushed: ' +  sourceInfo.id);
            //$('.text').append(sourceInfo.id);
        } else {
          console.log('Some other kind of source: ', sourceInfo.id);
        }
      }
    }

    setTimeout(explode, 2000);

    function explode() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        var constraints = {
            audio: false,
            video: {
                optional: [{
                    sourceId: sourceID[1]
                }]
            }
        };
        console.log(constraints.video);

        if (navigator.getUserMedia) {
            navigator.getUserMedia(constraints, handleVideo, videoError);
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            alert(e.name);
        }
    }

//    Overlay code

    var $nextBtn = $('.e-btn-next'),
        count = 0,
        $firstOverlay = $('.e-first-overlay'),
        $secondOverlay = $('.e-second-overlay'),
        $thirdOverlay = $('.e-third-overlay'),
        $body = $('body');
    $nextBtn.on('click', function () {
        count+=1;
        console.log('click' + count);

        switch (count) {
            case 1:
                $firstOverlay.addClass('move-out');
                $body.addClass('show-second');
                $body.removeClass('show-third');
                break;
            case 2:
                $secondOverlay.addClass('move-out');
                $body.removeClass('show-second');
                $body.addClass('show-third');
                break;
            case 3:
                $body.addClass('no-overlay');
                $body.removeClass('show-third');
                $thirdOverlay.addClass('move-out');
                startLoadingCircle();
                break;
        }
    })

    var $order = $('.e-order'),
        $scan = $('.e-scan'),
        $joke = $('.e-joke');

    $order.on('click tap', function () {
        console.log('Order');
        $firstOverlay.removeClass('move-out');
        $secondOverlay.removeClass('move-out');
        $thirdOverlay.removeClass('move-out');
        $body.removeClass('show-second');
        $body.removeClass('show-third');
        count = 0;
    })


    $scan.on('click tap', function () {
        console.log('Scan');
        count = 1;
        $firstOverlay.addClass('move-out');
        $secondOverlay.removeClass('move-out');
        $body.addClass('show-second');
        $body.removeClass('show-third');
    })


    $joke.on('click tap', function () {
        console.log('Joke');
        count = 3;
        $secondOverlay.addClass('move-out');
        $body.removeClass('show-second');
        $body.addClass('show-third');
    })

    function startLoadingCircle() {
      setTimeout( function() {

      }, (Math.random() * 5000));
    }
}
