function uploadFile() {
    let fileInput = document.getElementById('csvFile');
    let file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    let allowedExtensions = ['csv', 'xlsx'];
    let fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        alert('Invalid file type! Please upload a CSV or Excel file.');
        return;
    }

    let formData = new FormData();
    formData.append('file', file);

    fetch('/forecast', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        let url = URL.createObjectURL(blob);
        let img = document.getElementById('forecastGraph');
        img.src = url;
        img.style.display = 'block';
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert("Something went wrong!");
    });
}


