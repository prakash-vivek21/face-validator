import * as faceOptions from "face-api.js";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Webcam() {
  let navigate = useNavigate();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();
  const isFaceDetected = useRef(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceOptions.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceOptions.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceOptions.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceOptions.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceOptions.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceOptions.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceOptions
          .detectAllFaces(
            videoRef.current,
            new faceOptions.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        //detect and navigate to home page
        if (detections.length > 0 && !isFaceDetected.current) {
          const properVisibility = checkProperVisibility(detections[0]);
          console.log(properVisibility);
          if (properVisibility) {
            console.log("i have passed the test");
            isFaceDetected.current = true;
            navigate("/home");
          }
        }

        const resizedDetections = faceOptions.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceOptions.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceOptions.draw.drawFaceLandmarks(
            canvasRef.current,
            resizedDetections
          );
        canvasRef &&
          canvasRef.current &&
          faceOptions.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
    isFaceDetected.current = false;
  };

  const checkProperVisibility = (detection) => {
    const minFaceWidth = 50;
    const minConfidence = 0.6;
    const maxSideTurn = 50; // in pixels
    const maxRollAngle = 15; // in degrees

    const rollAngle = detection.detection.box._angle?.roll || 0; // Access the roll angle safely

    return (
      detection.detection.box.width > minFaceWidth &&
      detection.detection.score > minConfidence &&
      Math.abs(
        detection.landmarks.getLeftEye()[0].x -
          detection.landmarks.getRightEye()[3].x
      ) < maxSideTurn &&
      Math.abs(rollAngle) < maxRollAngle
    );
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", fontSize: "35px", fontFamily: "cursive" }}
      >
        Welcome to the React Face Position Validator
        <br />
      </div>
      <div
        style={{
          fontSize: "20px",
          fontFamily: "serif",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <b>Maintain an upright posture and gaze </b> directly at the camera to
        be directed to the <b>React Face Position Validator website.</b>
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <button
            onClick={closeWebcam}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Close Webcam
          </button>
        ) : (
          <button
            onClick={startVideo}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Open Webcam
          </button>
        )}
      </div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Webcam;
