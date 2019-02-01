/* eslint-disable */

function uploadToServer(request, form) {
  downloadBtnIsEnable();

  request.post('/upload', { data: form, onUploadProgress })
    .then(response =>console.log('---', `Well done - ${response}`))
    .catch(e => console.log(e));
}

function downloadFromServer(request) {
  const fileName = getFileName();

  request.get(`/files/${fileName}`, { responseType: 'blob', onDownloadProgress})
    .then(response => showResponse(fileName, response))
    .catch(error => showError(error.statusText, fileName));
}

function getListOfFile(request) {
  if (isShow()) {
    return request.get('/list', {}).then(data => showFilesList(JSON.parse(data)));
  }
  
  closeList();
}