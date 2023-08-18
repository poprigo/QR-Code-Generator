function generateRandomColor() {
    var colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateBackground() {
    var randomColor1 = generateRandomColor();
    var randomColor2 = generateRandomColor();
    document.body.style.background = `linear-gradient(to bottom right, ${randomColor1}, ${randomColor2})`;
}

setInterval(updateBackground, 30000);


var qrcodeContainer = document.getElementById('qrcodeContainer');
var downloadBtn = document.createElement('button');
downloadBtn.classList.add('download-btn');
downloadBtn.innerHTML = 'Download QR Code';
downloadBtn.style.display = 'none';

document.getElementById('generateBtn').addEventListener('click', function () {
    // ... Your existing QR code generation code ...

    var text = document.getElementById('text').value;
    var errorMessage = document.getElementById('errorMessage');
    var qrcodeElement = document.getElementById('qrcode');

    if (text.trim() === '') {
        errorMessage.textContent = 'Please enter text';
        qrcodeContainer.classList.remove('show');
        return;
    }

    document.getElementById('dQR').style.display = 'block';

    errorMessage.textContent = '';

    qrcodeElement.innerHTML = ''; // Clear existing QR code

    var qrcode = new QRCode(qrcodeElement, {
        text: text,
        width: 200, // Adjust QR code width here
        height: 200,
    });

    qrcodeContainer.classList.add('show');

    // Show the QR code container
    qrcodeContainer.style.display = 'block';

    // Show the download button
    qrcodeContainer.appendChild(downloadBtn);
});

qrcodeContainer.addEventListener('click', function () {
    var qrcodeElement = document.getElementById('qrcode');
    var qrcodeDataUrl = qrcodeElement.querySelector('img').src;

    // Create a temporary link element to trigger the download
    var link = document.createElement('a');
    link.href = qrcodeDataUrl;
    link.download = 'qrcode.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});