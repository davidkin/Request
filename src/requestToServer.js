/* eslint-disable */

function events(xmlRequest, progressEvent) {
  if (progressEvent === 'upload') {
    xmlRequest.upload.onprogress = event => {
      loadBarProgress('upload-progress-bar', event.loaded, event.total);
      console.log('---', `Upload to the server ${event.loaded} bytes from ${event.total}`);
    };

    xmlRequest.upload.onload = () => {
      console.log('---', 'Data is fully uploaded to the server');
    };

    xmlRequest.upload.onerror = () => {
      console.log('---', 'An error occurred while loading data to the server!');
    };
  } else if (progressEvent === 'download') {
    xmlRequest.onprogress = event => {
      loadBarProgress('download-progress-bar', event.loaded, event.total);
      console.log(`Received from ${event.loaded} server bytes from ${event.total} `);
    };
  }
}

function getImgUrl(binaryImg) {
  const blob = new Blob([binaryImg], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

function uploadToServer(request, form) {
  const fileName = document.querySelector('.getFile').files[0].name;
  document.querySelector('.file-input').value = fileName;
  document.querySelector('.download-button').disabled = false;

  request.post('/upload', {
    data: form,
    onUploadProgress: events
  })
    .then(response => {
      console.log('---', `Well done - ${response}`);
    })
    .catch(e => {
      console.log(e);
    });
}

function downloadFile(blob, fileName) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}


function downloadFromServer(request) {
  const dataOfFile = document.querySelector('.file-input').value;
  const img = document.querySelector('.img');

  request.get(`/files/${dataOfFile}`, {
    responseType: 'blob',
    onDownloadProgress: events
  })
    .then(response => {
      console.log(response);
      document.querySelector('.info-text').innerHTML = `File ${dataOfFile} downloaded`;
      return response.type === "image/jpeg" ? img.setAttribute('src', getImgUrl(response)) : downloadFile(response, dataOfFile);
    })
    .catch(e => {
      document.querySelector('.info-text').innerHTML = e;
      console.log(e);
    });
}