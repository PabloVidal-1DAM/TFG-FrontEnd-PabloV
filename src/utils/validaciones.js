// Archivo creado para su reutilización en campos de cualquier formulario,
// en el se encuentra la expresión regular a cumplir y el mensaje de error en caso de incumplimiento.

const validarEmail = (email) => {
  if (!email || email.trim() === "")
    return "El correo electrónico es obligatorio.";

  // Expresión regular estándar para emails
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email))
    return "El formato de correo debe tener un símbolo '@' y un dominio válido (ejemplo: usuario@correo.com).";

  return null; // Si devuelve null, es que todo está OK
};

const validarPassword = (password) => {
  if (!password || password.trim() === "") {
    return "La contraseña es obligatoria.";
  }

  // 1. Longitud mínima (te la subo a 8, que es el estándar actual de seguridad)
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  // 2. Al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }

  // 3. Al menos una letra minúscula
  if (!/[a-z]/.test(password)) {
    return "La contraseña debe contener al menos una letra minúscula.";
  }

  // 4. Al menos un número
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe contener al menos un número.";
  }

  // 5. Al menos un carácter especial (puedes añadir o quitar símbolos en los corchetes)
  if (!/[!@#$%^&*.,_\-]/.test(password)) {
    return "La contraseña debe incluir al menos un carácter especial (ej: ! @ # $ % & * - _).";
  }

  // Si pasa todas las pruebas, luz verde
  return null;
};

const validarConfirmacion = (password, confirmacion) => {
  if (!confirmacion || confirmacion.trim() === "")
    return "Debes confirmar tu contraseña.";
  if (password !== confirmacion) return "Las contraseñas no coinciden.";
  return null;
};

// Validaciones futuras para el registro
const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") return "El nombre es obligatorio.";
  if (nombre.length < 3) return "El nombre es demasiado corto.";
  return null;
};

export { validarEmail, validarPassword, validarConfirmacion, validarNombre };
