import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// 錯誤提示
export const alertError = (message) => {
  Swal.fire({
    icon: "error",
    text: message,
  });
}

// 確認視窗
export const alertDeleteConfirm = (title) => {
  return Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#D1104D",
    confirmButtonText: "刪除",
    cancelButtonText: "取消",
    reverseButtons: true
  });
}

// toast 提示
export const toastAlert = (text, toTop) => {
  if (toTop) {
    Toast.fire({
      icon: "success",
      title: text,
      didOpen: (toast) => {
        toast.style.top = '90px';
      }
    });
  } else {
    Toast.fire({
      icon: "success",
      title: text
    });
  }
}