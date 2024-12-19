const HORAS_INICIALES = 480;
let registros = [];

function calcularHorasTrabajadas(entrada, salida) {
    const [horasEntrada, minutosEntrada] = entrada.split(':').map(Number);
    const [horasSalida, minutosSalida] = salida.split(':').map(Number);

    const totalMinutosEntrada = horasEntrada * 60 + minutosEntrada;
    const totalMinutosSalida = horasSalida * 60 + minutosSalida;

    return Number(((totalMinutosSalida - totalMinutosEntrada) / 60).toFixed(2));
}

function agregarRegistroATabla(registro) {
    const tbody = document.getElementById('registrosBody');
    const tr = document.createElement('tr');

    const horasRestantes = calcularHorasRestantes();

    tr.innerHTML = `
        <td>${registro.fecha}</td>
        <td>${registro.entrada}</td>
        <td>${registro.salida}</td>
        <td>${registro.horasRealizadas.toFixed(2)}</td>
        <td>${horasRestantes.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
}

function calcularHorasRestantes() {
    const totalHorasTrabajadas = registros.reduce((total, registro) => total + registro.horasRealizadas, 0);
    return HORAS_INICIALES - totalHorasTrabajadas;
}

function actualizarResumen() {
    const totalHoras = registros.reduce((total, registro) => total + registro.horasRealizadas, 0);
    const horasRestantes = HORAS_INICIALES - totalHoras;

    const totalHorasElement = document.getElementById('totalHoras');
    const horasRestantesElement = document.getElementById('horasRestantes');

    if (totalHorasElement && horasRestantesElement) {
        totalHorasElement.textContent = totalHoras.toFixed(2);
        horasRestantesElement.textContent = horasRestantes.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const horasForm = document.getElementById('horasForm');
    if (horasForm) {
        horasForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fechaElement = document.getElementById('fecha');
            const entradaElement = document.getElementById('entrada');
            const salidaElement = document.getElementById('salida');
            const fecha = fechaElement.value;
            const entrada = entradaElement.value;
            const salida = salidaElement.value;
            if (fecha && entrada && salida) {
                const horasRealizadas = calcularHorasTrabajadas(entrada, salida);
                const nuevoRegistro = { fecha, entrada, salida, horasRealizadas };
                registros.push(nuevoRegistro);
                agregarRegistroATabla(nuevoRegistro);
                actualizarResumen();
                fechaElement.value = '';
                entradaElement.value = '';
                salidaElement.value = '';
            }
        });
    }
});
