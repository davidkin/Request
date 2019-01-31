/* eslint-disable */

const request = new HttpRequest({
  baseUrl: 'http://localhost:8000'
});

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const form = new FormData();
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);

  uploadToServer(request, form);

  document.querySelector('.getFile').value = '';
  document.querySelector('.js-fileName').innerHTML = 'Choose a file';
  document.querySelector('.upload-button').disabled = true;
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  downloadFromServer(request);

  document.querySelector('.file-input').value = '';
  document.querySelector('.download-button').disabled = true;
};

document.querySelector('.show-list').onclick= function (e) {
  getListOfFile(request);
};

document.querySelector('.file-input').oninput = function(e) {
  const downloadBtn = document.querySelector('.download-button');

  if (!e.target.value) {
    downloadBtn.disabled = true;
  } else {
    downloadBtn.disabled = false;
  }
};

document.querySelector('.getFile').onchange = function(e) {
  document.querySelector('.js-fileName').innerHTML = e.target.value.replace(/.*\\/, '');

  checkForUpload();
};