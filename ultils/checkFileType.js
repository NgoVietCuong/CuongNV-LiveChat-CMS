export default function checkFileType(url) {
  const fileExtension = url.split('.').pop();

  const imageExtension = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'ico', 'webp', 'heic', 'heif'];
  const musicExtension = ['mp3', 'wav', 'flac', 'aac', 'ogg'];
  const videoExtension = ['mp4', 'avi', 'mkv', 'mov', 'webm', 'wmv', 'flv', 'mpeg', 'asf'];
  const wordExtension = ['docx', 'doc'];
  const excelExtension = ['xlsx', 'csv', 'xls'];

  if (imageExtension.includes(fileExtension)) {
    return 'image';
  } else if (musicExtension.includes(fileExtension)) {
    return 'music';
  } else if (videoExtension.includes(fileExtension)) {
    return 'video';
  } else if (wordExtension.includes(fileExtension)) {
    return 'word';
  } else if (excelExtension.includes(fileExtension)) {
    return 'excel';
  } else {
    return 'other';
  }
}