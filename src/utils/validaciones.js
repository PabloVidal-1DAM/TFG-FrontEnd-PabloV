// Archivo creado para su reutilización en campos de cualquier formulario, 
// en el se encuentra la expresión regular a cumplir y el mensaje de error en caso de incumplimiento.

export const validarEmail = (email) => {
  if (!email || email.trim() === "") return "El correo electrónico es obligatorio.";
  
  // Expresión regular estándar para emails
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) return "El formato de correo debe tener un símbolo '@' y un dominio válido (ejemplo: usuario@correo.com).";
  
  return null; // Si devuelve null, es que todo está OK
};

export const validarPassword = (password) => {
  if (!password || password.trim() === "") return "La contraseña es obligatoria.";
  
  // Ejemplo: Mínimo 8 caracteres (puedes añadir que requiera mayúsculas, números, etc.)
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  
  return null;
};

// Validaciones futuras para el registro
export const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") return "El nombre es obligatorio.";
  if (nombre.length < 3) return "El nombre es demasiado corto.";
  return null;
};