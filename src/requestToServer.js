/* eslint-disable */

function uploadToServer(request, form) {
  const fileName = document.querySelector('.getFile').files[0].name;
  document.querySelector('.file-input').value = fileName;
  document.querySelector('.download-button').disabled = false;

  request.post('/upload', {
    data: form,
    onUploadProgress
  })
    .then(response => {
      console.log('---', `Well done - ${response}`);
    })
    .catch(e => {
      console.log(e);
    });
}

function downloadFromServer(request) {
  const dataOfFile = document.querySelector('.file-input').value;
  const img = document.querySelector('.img');
  const infoText = document.querySelector('.info-text');

  request.get(`/files/${dataOfFile}`, {
    responseType: 'blob',
    onDownloadProgress
  })
    .then(response => {
      infoText.innerHTML = `File ${dataOfFile} downloaded`;
      return response.type === 'image/jpeg' ? img.setAttribute('src', getImgUrl(response)) : downloadFile(response, dataOfFile);
    })
    .catch(e => {
      infoText.innerHTML = `No such ${dataOfFile} file in directory - ${e}`;
    });
}

function getListOfFile(request) {
  const showBlock = document.querySelector('.show-block');
  const showList = document.querySelector('.show-list');

  if (showList.innerHTML === 'Show List') {
    request.get('/list', {}).then(data => showFilesList(JSON.parse(data)));
  } else {
    showBlock.removeChild(document.querySelector('.list'));
    showBlock.style.display = 'none';

    showList.innerHTML = 'Show List';
    showList.style.color = '#fff';
    showList.style.borderColor = '#fff';
  }
}