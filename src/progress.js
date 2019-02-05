const uploadBar = document.querySelector('.upload-progress-bar');
const downloadBar = document.querySelector('.download-progress-bar');

function loadBarProgress(event, bar) {
  const { loaded, total } = event;
  const title = document.querySelector('title');

  if (bar === downloadBar) {
    title.innerHTML = `Request  ${Math.floor((loaded / total) * 100)}%`;
  }

  if (loaded === total) {
    bar.classList.remove('hide');
    bar.classList.add('show');

    setTimeout(() => {
      title.innerHTML = 'Request';

      bar.classList.add('hide');
      bar.classList.remove('show');
    }, 1000);
  }
}

function onUploadProgress(event) {
  loadBarProgress(event, uploadBar);
}

function onDownloadProgress(event) {
  loadBarProgress(event, downloadBar);
}