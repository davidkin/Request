/* global  dragAndDrop, HttpRequest, ListOfFiles, downloadFromServer,
onUploadProgress, onDownloadProgress, helper */

const {
  getImgUrl,
  areElementsFunction,
  downloadFile,
  checkForUpload,
  downloadBtnIsEnable,
  isShow,
  showResponse,
  showError
} = helper;

const showBlock = document.querySelector('.show-block');

const request = new HttpRequest({ baseUrl: 'http://localhost:8000' });
const fileList = new ListOfFiles(showBlock);

const inputGetFile = document.querySelector('.getFile');
const inputFile = document.querySelector('.file-input');
const spanFileName = document.querySelector('.js-fileName');

const uploadButton = document.querySelector('.upload-button');
const dowloadButton = document.querySelector('.download-button');
const showListButton = document.querySelector('.show-list');

function closeFileList() {
  fileList.remove();

  showListButton.innerHTML = 'Show List';

  showListButton.classList.remove('active-list');

  showBlock.classList.toggle('block');
}

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const form = new FormData();

  form.append('sampleFile', e.target.sampleFile.files[0]);

  downloadBtnIsEnable();

  request.post('/upload', { data: form, onUploadProgress })
    .then(response => console.log('---', `Well done - ${response}`)) // eslint-disable-line no-console
    .catch(e => console.log(e)); // eslint-disable-line no-console

  inputGetFile.value = '';
  spanFileName.innerHTML = 'Choose a file';
  uploadButton.disabled = true;
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  const fileName = document.querySelector('.file-input').value;

  request.get(`/files/${fileName}`, { responseType: 'blob', onDownloadProgress })
    .then(response => showResponse(fileName, response))
    .catch(error => showError(error.statusText, fileName));

  inputFile.value = '';
  dowloadButton.disabled = true;
};

document.querySelector('.show-list').onclick = function(e) {
  if (isShow()) {
    showListButton.innerHTML = 'Close list';
    showListButton.classList.add('active-list');

    showBlock.classList.toggle('block');

    return fileList.create();
  }

  return closeFileList();
};

document.querySelector('.file-input').oninput = function(e) {
  if (!e.target.value) {
    dowloadButton.disabled = true;
  } else {
    dowloadButton.disabled = false;
  }
};

document.querySelector('.getFile').onchange = function(e) {
  spanFileName.innerHTML = e.target.value.replace(/.*\\/, '');

  checkForUpload();
};