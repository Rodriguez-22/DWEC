import SorteoClass from './Sorteo.js';
const sorteo = new SorteoClass();
((sorteo) => {
    // Referencias a elementos del DOM
    const formRegistrarParticipante = document.getElementById('form-registrar-participante');
    const nombreParticipanteInput = document.getElementById('nombre-participante');
    const emailParticipanteInput = document.getElementById('email-participante');
    const telefonoParticipanteInput = document.getElementById('telefono-participante');
    const btnListarParticipantes = document.getElementById('btn-listar-participantes');
    const listaParticipantesDiv = document.getElementById('lista-participantes');
    const formReservarNumero = document.getElementById('form-reservar-numero');
    const numeroReservaInput = document.getElementById('numero-reserva');
    const emailReservaInput = document.getElementById('email-reserva');
    const formLiberarNumero = document.getElementById('form-liberar-numero');
    const numeroLiberarInput = document.getElementById('numero-liberar');
    const tableroNumerosDiv = document.getElementById('tablero-numeros');
    const statsOcupadosSpan = document.getElementById('stats-ocupados');
    const statsLibresSpan = document.getElementById('stats-libres');
    const statsParticipantesSpan = document.getElementById('stats-participantes');
    const statsPorcentajeSpan = document.getElementById('stats-porcentaje');
    const formRealizarSorteo = document.getElementById('form-realizar-sorteo');
    const numeroGanadorInput = document.getElementById('numero-ganador-input');
    const resultadoSorteoDiv = document.getElementById('resultado-sorteo');
    const mensajesDiv = document.getElementById('mensajes');
    // Funciones de renderizado
    const mostrarMensaje = (mensaje, tipo) => {
        mensajesDiv.textContent = mensaje;
        mensajesDiv.className = `output-area ${tipo}`;
        setTimeout(() => {
            mensajesDiv.textContent = '';
            mensajesDiv.className = 'output-area';
        }, 5000);
    };
    const renderTablero = () => {
        tableroNumerosDiv.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const celda = document.createElement('div');
            celda.classList.add('numero-celda');
            celda.textContent = i.toString().padStart(2, '0');
            const estadoNumero = sorteo.obtenerEstadoNumero(i);
            if (estadoNumero.reservadoPor) {
                celda.classList.add('ocupado');
                celda.title = `Reservado por: ${estadoNumero.reservadoPor.name} (${estadoNumero.reservadoPor.email})`;
            }
            if (sorteo.obtenerGanador() && sorteo.obtenerGanador().numero === i) {
                celda.classList.add('ganador');
            }
            tableroNumerosDiv.appendChild(celda);
        }
    };
    const renderEstadisticas = () => {
        const stats = sorteo.obtenerEstadisticas();
        statsOcupadosSpan.textContent = stats.numerosOcupados.toString();
        statsLibresSpan.textContent = stats.numerosLibres.toString();
        statsParticipantesSpan.textContent = stats.totalParticipantes.toString();
        statsPorcentajeSpan.textContent = stats.porcentajeOcupacion;
    };
    const renderParticipantes = () => {
        listaParticipantesDiv.innerHTML = '';
        const participantes = sorteo.listarParticipantes();
        if (participantes.length === 0) {
            listaParticipantesDiv.textContent = 'No hay participantes registrados.';
            return;
        }
        const ul = document.createElement('ul');
        participantes.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} (${p.email}) - ${p.phone}`;
            ul.appendChild(li);
        });
        listaParticipantesDiv.appendChild(ul);
    };
    // Manejadores de eventos
    formRegistrarParticipante.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            sorteo.registrarParticipante(nombreParticipanteInput.value, emailParticipanteInput.value, telefonoParticipanteInput.value);
            mostrarMensaje('Participante registrado con éxito.', 'exito');
            nombreParticipanteInput.value = '';
            emailParticipanteInput.value = '';
            telefonoParticipanteInput.value = '';
            renderEstadisticas();
            renderParticipantes();
        }
        catch (error) {
            mostrarMensaje(error.message, 'error');
        }
    });
    btnListarParticipantes.addEventListener('click', () => {
        renderParticipantes();
    });
    formReservarNumero.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const numero = parseInt(numeroReservaInput.value);
            sorteo.reservarNumero(numero, emailReservaInput.value);
            mostrarMensaje(`Número ${numero} reservado con éxito para ${emailReservaInput.value}.`, 'exito');
            numeroReservaInput.value = '';
            emailReservaInput.value = '';
            renderTablero();
            renderEstadisticas();
        }
        catch (error) {
            mostrarMensaje(error.message, 'error');
        }
    });
    formLiberarNumero.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const numero = parseInt(numeroLiberarInput.value);
            sorteo.liberarNumero(numero);
            mostrarMensaje(`Número ${numero} liberado con éxito.`, 'exito');
            numeroLiberarInput.value = '';
            renderTablero();
            renderEstadisticas();
        }
        catch (error) {
            mostrarMensaje(error.message, 'error');
        }
    });
    formRealizarSorteo.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const numeroGanador = parseInt(numeroGanadorInput.value);
            const ganador = sorteo.realizarSorteo(numeroGanador);
            if (ganador) {
                resultadoSorteoDiv.innerHTML = `<p class="ganador-info">¡Felicidades! El número ganador es el <strong>${ganador.numero.toString().padStart(2, '0')}</strong>.</p><p class="ganador-info">Reservado por: <strong>${ganador.participante.name}</strong> (${ganador.participante.email})</p>`;
                mostrarMensaje('Sorteo realizado con éxito. ¡Tenemos un ganador!', 'exito');
            }
            else {
                resultadoSorteoDiv.innerHTML = `<p>El número <strong>${numeroGanador.toString().padStart(2, '0')}</strong> no estaba reservado. El sorteo ha quedado desierto.</p>`;
                mostrarMensaje('Sorteo realizado. Número desierto.', 'exito');
            }
            renderTablero(); // Para marcar el número ganador en el tablero
        }
        catch (error) {
            mostrarMensaje(error.message, 'error');
        }
    });
    // Inicialización
    renderTablero();
    renderEstadisticas();
})(sorteo);
