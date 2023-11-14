document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("cameraFeed");
    const toggleButton = document.getElementById("toggleRecord");
    const textButton = document.getElementById("textButton");
    const downloadLink = document.getElementById("downloadLink");
    let mediaRecorder;
    let chunks = [];
    let isRecording = false;

    // Verifica se o navegador suporta a API WebRTC
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
            .then(function (stream) {
                // Define o fluxo da câmera frontal no elemento de vídeo
                videoElement.srcObject = stream;
                mediaRecorder = new MediaRecorder(stream);

                // Evento disparado quando um novo pedaço de vídeo é disponibilizado
                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                // Evento disparado quando a gravação é parada
                mediaRecorder.onstop = function () {
                    const videoBlob = new Blob(chunks, { type: "video/webm" });
                    chunks = [];

                    // Cria um URL para o vídeo gravado e define-o como a fonte do elemento de vídeo
                    const videoURL = URL.createObjectURL(videoBlob);
                    videoElement.src = videoURL;

                    // Configura o link de download para o vídeo gravado
                    downloadLink.href = videoURL;
                    downloadLink.download = "video.webm";
                    downloadLink.style.display = "block";

                    // Simula um clique no link para iniciar o download automático
                    downloadLink.click();
                    downloadLink.style.display = "none";
                };

                toggleButton.addEventListener("click", function () {
                    if (isRecording) {
                        // Pare a gravação
                        mediaRecorder.stop();
                        isRecording = false;
                        textButton.textContent = "Começar";
                    } else {
                        // Inicie a gravação
                        mediaRecorder.start();
                        isRecording = true;
                        textButton.textContent = "Parar";
                    }
                });
            })
            .catch(function (error) {
                console.error("Erro ao acessar a câmera: " + error);
            });
    } else {
        console.error("Seu navegador não suporta a API WebRTC.");
    }
});
