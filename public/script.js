document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("cameraFeed");

  // Verifica se o navegador suporta a API WebRTC
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          .then(function (stream) {
              // Define o fluxo da câmera frontal no elemento de vídeo
              videoElement.srcObject = stream;
          })
          .catch(function (error) {
              console.error("Erro ao acessar a câmera: " + error);
          });
  } else {
      console.error("Seu navegador não suporta a API WebRTC.");
  }
});
