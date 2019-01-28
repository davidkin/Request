function downloadFile(blob, fileName) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
