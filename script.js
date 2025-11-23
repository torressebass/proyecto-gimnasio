document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('registerForm');
  const pwd = document.getElementById('password');
  const confirmPwd = document.getElementById('confirmPassword');
  const toggle = document.getElementById('togglePwd');
  const message = document.getElementById('formMessage');

  // nuevos campos
  const weightEl = document.getElementById('weight');
  const heightEl = document.getElementById('height');
  const ageEl = document.getElementById('age');
  const levelEl = document.getElementById('level');
  const goalEl = document.getElementById('goal');

  toggle.addEventListener('click', ()=>{
    const type = pwd.type === 'password' ? 'text' : 'password';
    pwd.type = type;
    confirmPwd.type = type;
    toggle.textContent = type === 'password' ? '👁️' : '🙈';
  });

  function showMessage(text, ok=true){
    message.textContent = text;
    message.style.color = ok ? '#bff7d0' : '#ffb4b4';
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    message.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = pwd.value;
    const confirm = confirmPwd.value;
    const terms = form.terms.checked;
    const age = Number(ageEl.value);
    const weight = Number(weightEl.value);
    const height = Number(heightEl.value);
    const level = levelEl.value;
    const goal = goalEl.value;
  const activitySelected = form.querySelector('input[name="activity"]:checked');
  const activities = activitySelected ? [activitySelected.value] : [];

    if(!name || !email || !password || !confirm){
      showMessage('Por favor completa todos los campos.', false);
      return;
    }
    if(!age || age < 10 || age > 120){
      showMessage('Introduce una edad válida.', false);
      return;
    }
    if(!weight || weight <= 20 || weight > 500){
      showMessage('Introduce un peso válido en kg.', false);
      return;
    }
    if(!height || height <= 80 || height > 300){
      showMessage('Introduce una altura válida en cm.', false);
      return;
    }
    if(!level){
      showMessage('Selecciona tu nivel de entrenamiento.', false);
      return;
    }
    if(!goal){
      showMessage('Selecciona tu objetivo.', false);
      return;
    }
    if(activities.length === 0){
      showMessage('Selecciona tu actividad principal.', false);
      return;
    }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      showMessage('Email inválido.', false);
      return;
    }
    if(password.length < 8){
      showMessage('La contraseña debe tener al menos 8 caracteres.', false);
      return;
    }
    if(password !== confirm){
      showMessage('Las contraseñas no coinciden.', false);
      return;
    }
    if(!terms){
      showMessage('Debes aceptar los términos.', false);
      return;
    }

    // Simula envío
    showMessage('Creando tu cuenta...');
    setTimeout(()=>{
      // calcular BMI
      const heightM = height / 100;
      const bmi = (weight / (heightM * heightM));
      const bmiRounded = Math.round(bmi * 10) / 10;

  const profile = {name,email,age,weight,height,level,goal,activities,bmi:bmiRounded};
  localStorage.setItem('fitnessProfile', JSON.stringify(profile));
  // redirigir a la página principal incluyendo la actividad elegida en el hash
  const primary = activities && activities.length ? activities[0] : '';
  location.href = `main.html#${primary}`;
    }, 700);
  });
});