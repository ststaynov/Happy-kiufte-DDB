
window.onload = init;



function init() {
    var video = document.querySelector("#videoElement");
    var constraints = {
        audio: true,
        video: {facingMode: { exact: "environment" } }
  };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

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
