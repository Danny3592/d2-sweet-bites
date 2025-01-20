import Swal from 'sweetalert2';

// Example SweetAlert2 usage
Swal.fire({
  title: 'SweetAlert2 is working!',
  text: 'This is a test alert.',
  icon: 'success',
  confirmButtonText: 'Cool'
}).then(() => {
  console.log("SweetAlert2 test alert displayed successfully.");
});