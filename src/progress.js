/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const progress = Math.floor((loaded / total) * 100);
  progressBar.style.width = `${progress}%`;
}

document.querySelector('.getFile').onchange = function(e) {
  document.querySelector('.js-fileName').innerHTML = e.target.value.replace(/.*\\/, '');
};


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
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  downloadFromServer(request);
};


// function drawFilesList(files) {
//   const list = document.getElementById('files_list');
//   list.innerHTML = '';
//   files.forEach(element => {
//     const listItem = document.createElement('li');
//     const link = document.createElement('a');
//     link.href = `/files/${element}`;
//     link.textContent = element;
//     listItem.appendChild(link);
//     list.appendChild(listItem);
//   });
// }
// document.getElementById('upload_list').addEventListener('click', function(e) {
//   xhr.get('/list', {}).then(data =>
//     drawFilesList(JSON.parse(data)));
// });

// app.use('/files', express.static(`${__dirname}/uploads`));
// app.use(fileUpload());