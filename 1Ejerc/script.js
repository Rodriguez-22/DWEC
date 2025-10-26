const form = document.getElementById('registroForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const tipoEntrada = document.querySelectorAll('input[name="entrada"]');
const comprobante = document.getElementById('comprobante');
const experiencia = document.getElementById('experiencia');
const valorExperiencia = document.getElementById('valorExperiencia');

experiencia.addEventListener('input', () => {
  valorExperiencia.textContent = experiencia.value;
});

form.addEventListener('submit', (e) => {
  let errores = [];

  if (password.value !== confirmPassword.value) {
    errores.push('Las contraseñas no coinciden.');
    confirmPassword.style.border = '2px solid red';
  }

  const esEstudiante = [...tipoEntrada].find(r => r.checked).value === 'estudiante';
  if (esEstudiante && comprobante.files.length === 0) {
    errores.push('El comprobante es obligatorio para estudiantes.');
  }

  const terminos = document.getElementById('terminos');
  if (!terminos.checked) {
    errores.push('Debes aceptar los términos y condiciones.');
  }

  if (errores.length > 0) {
    e.preventDefault();
    alert('Errores:\n' + errores.join('\n'));
  }
});
