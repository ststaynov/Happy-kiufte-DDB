
window.onload = init;



function init() {
    var video = document.querySelector("#videoElement"),
        sourceId = [],
        constraints = {
        audio: false,
        video: {facingMode: { exact: "environment" } }
  };

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
            sourceId.push(sourceInfo.id);
            console.log('source: ', sourceInfo.id);
        } else {
          console.log('Some other kind of source: ', sourceInfo.id);
        }
      }
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    function getTheMedia(sourceId) {
        if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, handleVideo, videoError);
        }
    }

    function handleVideo(stream) {
      video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
      alert(e.name);
    }

    $('body').on('click', function () {
        console.log('clicked');
        getTheMedia(sourceId[0]);
    })
}
