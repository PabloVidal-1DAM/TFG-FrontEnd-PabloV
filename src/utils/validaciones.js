// Archivo creado para su reutilización en campos de cualquier formulario,
// en el se encuentra la expresión regular a cumplir y el mensaje de error en caso de incumplimiento.

const validarEmail = (email) => {
  if (!email || email.trim() === "")
    return "El correo electrónico es obligatorio.";

  // Expresión regular estándar para emails
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email))
    return "El formato de correo debe tener un símbolo '@' y un dominio válido (ejemplo: usuario@correo.com).";

  return null;
};

const validarPassword = (password) => {
  if (!password || password.trim() === "") {
    return "La contraseña es obligatoria.";
  }
  // La contraseña deberá de pasar los siguientes requisitos:
  // Longitud mínima 
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  // Al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }

  // Al menos un número
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe contener al menos un número.";
  }

  // Al menos un carácter especial (puedes añadir o quitar símbolos en los corchetes)
  if (!/[!@#$%^&*.,_\-]/.test(password)) {
    return "La contraseña debe incluir al menos un carácter especial (ej: ! @ # $ % & * - _).";
  }

  return null;
};

const validarConfirmacion = (password, confirmacion) => {
  if (!confirmacion || confirmacion.trim() === "")
    return "Debes confirmar tu contraseña.";
  if (password !== confirmacion) return "Las contraseñas no coinciden.";
  return null;
};

const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") return "El nombre es obligatorio.";
  if (nombre.length < 3) return "El nombre es demasiado corto.";
  return null;
};

export { validarEmail, validarPassword, validarConfirmacion, validarNombre };
