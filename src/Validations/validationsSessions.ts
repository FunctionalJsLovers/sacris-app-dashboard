export function validateSessionFields(sessionData: any): {
  [key: string]: string;
} {
  const errors: { [key: string]: string } = {};

  {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    if (!sessionData.date) {
      errors.date = 'El campo fecha es obligatorio.';
    } else if (!dateRegex.test(sessionData.date)) {
      errors.date =
        'El formato de la fecha no es válido. Debe ser:  "AAAA-MM-DDTHH:MM:SS"';
    } else {
      const date = new Date(sessionData.date);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      if (hours < 8 || hours > 22 || (hours === 22 && minutes > 0)) {
        errors.date =
          'La cita debe estar dentro del horario laboral de 8 am a 10 pm.';
      }
    }
  }

  if (!sessionData.estimatedTime) {
    errors.estimatedTime = 'El campo de tiempo estimado es obligatorio.';
  } else if (isNaN(Number(sessionData.estimatedTime))) {
    errors.estimatedTime = 'El campo de tiempo estimado debe ser un número.';
  } else if (sessionData.estimatedTime > 6) {
    errors.estimatedTime = 'Las horas son demasiadas, cree una nueva sesión';
  }

  if (sessionData.status === 'none' || sessionData.status === 'Seleccionar..') {
    errors.status = 'Debe seleccionar un estado válido.';
  }

  if (!sessionData.price) {
    errors.price = 'El campo precio es obligatorio.';
  } else if (isNaN(Number(sessionData.price))) {
    errors.price = 'El campo precio debe ser un número.';
  }

  /*if (!sessionData.id) {
    errors.id = 'El campo identificador de cita es obligatorio.';
  }*/

  return errors;
}

export function validateAppointmentFields(formData: any): {
  [key: string]: string;
} {
  const requiredFields = ['artist_id', 'client_id', 'category_id'];
  const errors: { [key: string]: string } = {};

  for (const field of requiredFields) {
    if (!formData[field] || formData[field] === 'Seleccionar') {
      errors[
        field
      ] = `El campo ${field} es obligatorio y debe seleccionar una opción válida.`;
    }
  }

  return errors;
}
