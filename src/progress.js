/* eslint-disable */

const uploadBar = document.querySelector(`#upload-progress-bar`);
const downloadBar = document.querySelector(`#download-progress-bar`);

function loadBarProgress(event, bar) {
  const { loaded,  total} = event;

  if (bar === downloadBar) {
    const title = document.querySelector('title');
    title.innerHTML = `Request  ${Math.floor((loaded / total) * 100)}%`;
    
    setTimeout(() => {
      title.innerHTML = 'Request';
    }, 1000);
  }

  if (loaded === total) {
    bar.classList.remove('hide')
    bar.classList.add('show');

    setTimeout(() => {
      bar.classList.add('hide');
      bar.classList.remove('show')
    }, 1000);
  }
}

function onUploadProgress (event) {
  loadBarProgress(event, uploadBar);
}

function onDownloadProgress (event) {
  loadBarProgress(event, downloadBar);
}