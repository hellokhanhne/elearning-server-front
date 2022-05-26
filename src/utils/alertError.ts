import Swal from 'sweetalert2';

export const alertError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error?.message || 'Unkown error !'
  });
};
