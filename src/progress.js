/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const progress = Math.floor((loaded / total) * 100);
  progressBar.style.width = `${progress}%`;
}

function events(xmlRequest, progressEvent) {
  if (progressEvent === 'upload') {
    xmlRequest.upload.onprogress = event => {
      loadBarProgress('upload-progress-bar', event.loaded, event.total);
      console.log('---', `Загружено на сервер ${event.loaded} байт из ${event.total}`);
    };

    xmlRequest.upload.onload = () => {
      console.log('---', 'Данные полностью загружены на сервер');
    };

    xmlRequest.upload.onerror = () => {
      console.log('---', 'Произошла ошибка при загрузке данных на сервер!');
    };
  } else if (progressEvent === 'download') {
    xmlRequest.onprogress = event => {
      loadBarProgress('download-progress-bar', event.loaded, event.total);
      console.log(`Получено с сервера ${event.loaded} байт из ${event.total}`);
    };
  }
}

function parseImg(binaryImg) {
  const blob = new Blob([binaryImg], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

const request = new HttpRequest({
  baseUrl: 'http://localhost:8000'
});

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  // /files/__filename
  // fetch('http://localhost:8000/upload',{
  //   method: "POST",
  //   body: form
  // })

  const fileName = document.querySelector('.getFile').files[0].name;
  console.log('---',  fileName);
  document.querySelector('.file-input').value = fileName;

  request.post('/upload', {
    data: form,
    onUploadProgress: (xmlRequest, progressEvent) => events(xmlRequest, progressEvent)
  })
    .then(response => {
      console.log('---', `Well done - ${response}`);
    })
    .catch(e => {
      console.log(e);
    });
};


document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  const dataOfFile = document.querySelector('.file-input').value;
  const img = document.querySelector('.img');

  request.get(`/files/${dataOfFile}`, {
    responseType: 'blob',
    onDownloadProgress: (xmlRequest, progressEvent) => events(xmlRequest, progressEvent)
  })
    .then(response => {
      console.log(response);

      return dataOfFile.split('.')[1] === 'png' || dataOfFile.split('.')[1] === 'JPG' || dataOfFile.split('.')[1] === 'jpeg' 
        ? img.setAttribute('src', parseImg(response))
        : alert('File downloaded');
    })
    .catch(e => {
      console.log(e);
    });
};