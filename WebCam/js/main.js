// 'use strict';
//
// var constraints = {
//   video: true
// };
//
// var video = document.querySelector('video');
//
// function handleSuccess(stream) {
//   window.stream = stream; // stream available to console
//   video.src = window.URL.createObjectURL(stream);
// }
//
// function handleError(error) {
//   console.log('navigator.getUserMedia error: ', error);
// }
//
// navigator.mediaDevices.getUserMedia(constraints).
//     then(handleSuccess).catch(handleError);


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
    audio: false,
    video: { facingMode: { exact: "environment" } }
};
var video = document.querySelector("video");

function successCallback(stream) {
    window.stream = stream; // stream available to console
    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream;
    }
}

function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);