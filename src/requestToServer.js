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

  request.get(`/files/${dataOfFile}`, {
    responseType: 'blob',
    onDownloadProgress
  })
    .then(response => {
      document.querySelector('.info-text').innerHTML = `File ${dataOfFile} downloaded`;
      return response.type === 'image/jpeg' ? img.setAttribute('src', getImgUrl(response)) : downloadFile(response, dataOfFile);
    })
    .catch(e => {
      document.querySelector('.info-text').innerHTML = `No such ${dataOfFile} file in directory - ${e}`;
    });
}

function getListOfFile(request) {
  if (document.querySelector('.show-list').innerHTML === 'Show List') {
    request.get('/list', {}).then(data => showFilesList(JSON.parse(data)));
  } else {
    document.querySelector('.show-block').removeChild(document.querySelector('.list'));
    document.querySelector('.show-block').style.display = 'none';
    document.querySelector('.show-list').innerHTML = 'Show List';
    document.querySelector('.show-list').style.color = '#fff';
    document.querySelector('.show-list').style.borderColor = '#fff';
  }
}