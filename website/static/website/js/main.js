
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
        //console.log(constraints.video);

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

    $nextBtn.on('click tap', function () {
        count+=1;
        //console.log('click' + count);

        switch (count) {
            case 1:
                $firstOverlay.addClass('move-out');
                $body.addClass('show-second');
                $body.removeClass('show-third');
                document.getElementById("action").innerHTML = "Постави кюфтето в маркера.";
                break;
            case 2:
                $secondOverlay.addClass('move-out');
                $body.removeClass('show-second');
                $body.addClass('show-third');
                document.getElementById("action").innerHTML = "Чуй какво ще ти каже кюфтето.";
                break;
            case 3:
                $body.addClass('no-overlay');
                $body.removeClass('show-third');
                $thirdOverlay.addClass('move-out');
                startLoadingCircle();
                document.getElementById("btn-next").innerHTML = "маркирай кюфтето.";
                break;
        }
    });

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
        document.getElementById("action").innerHTML = "Поръчай си кюфте!";
    });


    $scan.on('click tap', function () {
        console.log('Scan');
        count = 1;
        $firstOverlay.addClass('move-out');
        $secondOverlay.removeClass('move-out');
        $body.addClass('show-second');
        $body.removeClass('show-third');
        document.getElementById("action").innerHTML = "Постави кюфтето в маркера.";
    });


    $joke.on('click tap', function () {
        console.log('Joke');
        count = 2;
        $firstOverlay.addClass('move-out');
        $secondOverlay.addClass('move-out');
        $body.removeClass('show-second');
        $body.addClass('show-third');
        document.getElementById("action").innerHTML = "Чуй какво ще ти каже кюфтето.";
    });

    function startLoadingCircle() {
      setTimeout( function() {
        console.log("Start Audio now!");
        startButton_Clicked(audioFirst);
      }, 5000);
    }

    //Audio Starts here

    var AudioContext;
    var audioFirst,
        audioSecond,
        audio;

    var sliderFirstMax;

    var totalTimeFirst;

    var audioFirstPlaying = false;

    var audioContext;
    var source;
    var analyser;

    var streamUrlFirst;

    var refreshIntervalId;

    function initAudio(streamUrlFirst, streamUrlSecond ) {
      AudioContext = window.AudioContext || window.webkitAudioContext;

      audioFirst = new Audio();

      audioFirst.crossOrigin = "anonymous";

      audioFirst.preload = "auto";

      audioContext = new AudioContext();
      source = audioContext.createMediaElementSource(audioFirst);
      source.connect(audioContext.destination);
      analyser = audioContext.createAnalyser();
      source.connect(analyser);
    }

    function get(url, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          callback(request.responseText);
        }
      };

      request.open("GET", url, true);
      request.send(null);
    }

    var clientParameter = "client_id=3b2585ef4a5eff04935abe84aad5f3f3";

    // Basing everything on the track's permalink URL. That is what the user knows.
    // Makes it possible to use the text box for pasting any track URL.
    // The Outsider is a friend of mine.
    // The majority of his tracks are on Mixcloud:
    // https://www.mixcloud.com/outsider_music/
    var trackPermalinkUrlFirst = "275604209";

    var firstTrackUrl;

    function findTrack() {
       get(firstTrackUrl,
           function (response) {
         var trackInfo = JSON.parse(response);
         sliderFirstMax = trackInfo.duration / 1000;
         streamUrlFirst = trackInfo.stream_url + "?" + clientParameter;
         audioFirst.src = streamUrlFirst;
         audioFirst.play();
         audioFirst.pause();
       }
      );
     };

    function startButton_Clicked(audio) {
      audio.play();
    }

    var activate = true;
    $body.on('click tap', function () {
        if(activate) {
            firstTrackUrl = "https://ap" + "i.soundcloud.com/resolve.json?url=https://soundcloud.com/user-50631610/paddy-telefon-kampaniya-1&client_id=3b2585ef4a5eff04935abe84aad5f3f3"
            findTrack();
            initAudio();
        }
        activate = false;
    });
}
