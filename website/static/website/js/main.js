
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
        $thirdOverlay = $('.e-third-overlay');
    $('body').on('click', $nextBtn, function () {
        count+=1;
        console.log('click' + count);

        switch (count) {
            case 1:
                $firstOverlay.addClass('move-out');
                break;
            case 2:
                $secondOverlay.addClass('move-out');
                break;
            case 3:
                $thirdOverlay.addClass('move-out');
                $nextBtn.addClass('faded');
                startLoadingCircle();
                break;
        }
    })


    function startLoadingCircle() {
        var paths = document.getElementsByClassName('styled');
        var path = paths[paths.length-1];
        var counter = 0;
        var total = 147;

        var length = path.r.baseVal.value * 2 * Math.PI;

        $(path).css({
          'stroke-dasharray': length,
          'stroke-dashoffset': 0,
          'opacity': 1,
        })

        //simulate multiple requests completing at random times. setTimeout acts as success handler for ajax calls.
        for (var i = 0; i < total; ++i) {
          setTimeout( function() {
            counter++;
            var percentage = Math.ceil(100*counter/total);
            $('.percentage').text(percentage)
            $(path).css({
              'stroke-dashoffset': -((counter/total)*length),
            });

            if (percentage >= 100) {
              setTimeout(function() {
              document.getElementById('progress').classList.add('complete'); document.body.classList.add('complete');
                $('.c-joke').addClass('show');
              }, 500);
            }
          }, (Math.random() * 5000));
        }

    }
}
