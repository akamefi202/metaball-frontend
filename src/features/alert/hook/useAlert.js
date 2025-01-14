import { useCallback } from "react";
import Swal from "sweetalert2";

const useAlert = () => {
  // Function to show a basic alert
  const showAlert = useCallback(
    (title, text, icon = "info", buttonText = "OK") => {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: buttonText,
      });
    },
    []
  );

  // Function to show a success alert
  const showSuccessAlert = useCallback(
    (title, text, buttonText = "OK") => {
      showAlert(title, text, "success", buttonText);
    },
    [showAlert]
  );

  // Function to show an error alert
  const showErrorAlert = useCallback(
    (title, text, buttonText = "OK") => {
      showAlert(title, text, "error", buttonText);
    },
    [showAlert]
  );

  // Function to show a warning alert
  const showWarningAlert = useCallback(
    (title, text, buttonText = "OK") => {
      showAlert(title, text, "warning", buttonText);
    },
    [showAlert]
  );

  // Function to show a confirmation dialog
  const showConfirmationAlert = useCallback(
    (title, text, confirmText = "OK", cancelText = "Cancel", onDelete) => {
      return Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
      }).then((result) => {
        console.info(result);
        if (result.isConfirmed) {
          if (onDelete) {
            onDelete();
          }
        }
      });
    },
    []
  );

  return {
    showAlert,
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showConfirmationAlert,
  };
};

export default useAlert;

// Usage
// const {
//     showSuccessAlert,
//     showErrorAlert,
//     showWarningAlert,
//     showConfirmationAlert,
//   } = useAlert();
