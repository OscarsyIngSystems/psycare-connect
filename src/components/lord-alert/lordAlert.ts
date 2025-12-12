import Swal from 'sweetalert2';

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
type AlertType = 'lordToast' | 'lordModal';

export const useSweetalert = (
  titulo: string,
  text: string = '',
  icon: AlertIcon,
  type: AlertType,
  onConfirm?: () => void, // Solo agregamos este parámetro opcional
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const getModal = () => {
    if (type === 'lordToast') {
      switch (icon) {
        case 'success':
        case 'error':
        case 'warning':
        case 'info':
          Toast.fire({
            icon,
            title: titulo,
          });
          break;
        default:
          console.warn(`Icon type '${icon}' not supported for toasts`);
          break;
      }
    }

    if (type === 'lordModal') {
      const buttonClassMap: Record<AlertIcon, string> = {
        success: 'btn btn-outline-success',
        error: 'btn btn-outline-danger',
        warning: 'btn btn-outline-warning',
        info: 'btn btn-outline-info',
        question: 'btn btn-outline-primary',
      };

      if (buttonClassMap[icon]) {
        const modal = Swal.fire({
          customClass: {
            confirmButton: buttonClassMap[icon],
          },
          title: titulo,
          text: text,
          icon: icon,
          confirmButtonText: 'Aceptar',
        });
        if (onConfirm) {
          modal.then(result => {
            if (result.isConfirmed) {
              onConfirm();
            }
          });
        }
      }
    }
  };

  return { LordAlert: getModal };
};
