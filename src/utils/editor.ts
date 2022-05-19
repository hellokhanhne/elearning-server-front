import { axiosClient, BASE_URL } from 'src/api';

const imageURL = BASE_URL.split('/api')[0];

export const modules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean'],
    [{ color: [] }, { background: [] }],
    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' }
    ]
    // [],
  ],
  imageUploader: {
    upload: (file: any) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        axiosClient
          .post('upload', formData)
          .then((res) => {
            resolve(`${imageURL}/images/${res.data.data.filename}`);
          })
          .catch((e) => {
            reject('Upload failed');
            console.error('Error:', e);
          });
      });
    }
  },
  clipboard: {
    matchVisual: false
  }
};
export const formats = [
  'header',
  'font',
  'size',
  'color',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align'
];
