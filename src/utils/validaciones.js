// Archivo creado para su reutilización en campos de cualquier formulario, 
// en el se encuentra la expresión regular a cumplir y el mensaje de error en caso de incumplimiento.

const validarEmail = (email) => {
  if (!email || email.trim() === "") return "El correo electrónico es obligatorio.";
  
  // Expresión regular estándar para emails
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) return "El formato de correo debe tener un símbolo '@' y un dominio válido (ejemplo: usuario@correo.com).";
  
  return null; // Si devuelve null, es que todo está OK
};

const validarPassword = (password) => {
  if (!password || password.trim() === "") return "La contraseña es obligatoria.";
  
  // Ejemplo: Mínimo 8 caracteres (puedes añadir que requiera mayúsculas, números, etc.)
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  
  return null;
};

const validarConfirmacion = (password, confirmacion) => {
  if (!confirmacion || confirmacion.trim() === "") return "Debes confirmar tu contraseña.";
  if (password !== confirmacion) return "Las contraseñas no coinciden.";
  return null;
};

// Validaciones futuras para el registro
const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") return "El nombre es obligatorio.";
  if (nombre.length < 3) return "El nombre es demasiado corto.";
  return null;
};

export {validarEmail, validarPassword, validarConfirmacion, validarNombre};