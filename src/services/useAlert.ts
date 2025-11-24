import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const showAlert = (type: 'success' | 'danger', message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return {
    alert,
    showAlert,

  };
};