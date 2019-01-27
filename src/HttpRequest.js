function setHeader(download, headers) {
  for (const key in headers) {
    download.setRequestHeader(key, headers[key]);
  }
}

function createURL(baseUrl, url, params) {
  const finalUrl = new URL(baseUrl + url);

  for (const key in params) {
    finalUrl.searchParams.set(key, params[key]);
  }

  return finalUrl;
}

const elementsAreFunction = arrayOfFunction => arrayOfFunction.every(value => typeof value === 'function');


class HttpRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url, config) {
    const xhr = new XMLHttpRequest();

    const { transformResponse, headers, params, responseType, onDownloadProgress } = config;
    const finalUrl = createURL(this.baseUrl, url, params);

    setHeader(xhr, this.headers);

    return new Promise((resolve, reject) => {
      xhr.open('GET', finalUrl, true);
      xhr.responseType = responseType;

      setHeader(xhr, headers);

      if (onDownloadProgress) {
        onDownloadProgress(xhr, 'download');
      }

      xhr.onload = () => {
        if (xhr.status !== 200) {
          return reject(xhr.status);
        }

        return transformResponse === undefined || !elementsAreFunction(transformResponse)
          ? resolve(xhr.response)
          : resolve(transformResponse.reduce((acc, func) => func(acc), xhr.response), null);
      };

      xhr.send();
    });
  }

  post(url, config) {

  }
}

// const config = {

// `transformResponse` allows changes to the response data to be made before
// it is passed to then/catch
// transformResponse: [function(data) {
// Do whatever you want to transform the data

//   return data;
// }],

// `headers` are custom headers to be sent
// headers: { 'X-Requested-With': 'XMLHttpRequest' },

// `params` are the URL parameters to be sent with the request
// Must be a plain object or a URLSearchParams object
// params: {
//   ID: 12345
// },
// `data` is the data to be sent as the request body
// Only applicable for request methods 'PUT', 'POST', and 'PATCH'
// When no `transformRequest` is set, must be of one of the following types:
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - Browser only: FormData, File, Blob
// - Node only: Stream, Buffer

// data: {
//   firstName: 'Fred'
// },

// `responseType` indicates the type of data that the server will respond with
// options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
// responseType: 'text' // default

// `onUploadProgress` allows handling of progress events for uploads
// onUploadProgress: progressEvent => {}

// `onDownloadProgress` allows handling of progress events for downloads
// onDownloadProgress(progressEvent) {
//   // Do whatever you want with the native progress event
// }

// };

// const request = new HttpRequest({
//   baseUrl: 'http://localhost:8000'
// });

// request.get('/form', config)
// .then(response => {
//   console.log(`Well done - ${response}`);
// })
// .catch(e => {
//   console.log(e);
// });


// reuest.get('/form', { headers: {contentType: undefined} })
// .then(response => {
//   console.log(response);
// })
// .catch(e => {
//   console.log(e)
// });

// reuest.post('/upload', {
//   data: form,
// })
// .then(response => {
// console.log('---', `Well done - ${response}`);
// })
// .catch(e => {
//   console.log(e)
// });

