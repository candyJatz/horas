interface Registro {
    fecha: string;
    entrada: string;
    salida: string;
    horasRealizadas: number;
}

let registros: Registro[] = [];
const HORAS_INICIALES: number = 480;

function calcularHorasTrabajadas(entrada: string, salida: string): number {
    const [horasEntrada, minutosEntrada] = entrada.split(':').map(Number);
    const [horasSalida, minutosSalida] = salida.split(':').map(Number);

    const totalMinutosEntrada: number = horasEntrada * 60 + minutosEntrada;
    const totalMinutosSalida: number = horasSalida * 60 + minutosSalida;

    return Number(((totalMinutosSalida - totalMinutosEntrada) / 60).toFixed(2));
}

function agregarRegistroATabla(registro: Registro): void {
    const tbody = document.getElementById('registrosBody') as HTMLTableSectionElement;
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

function calcularHorasRestantes(): number {
    const totalHorasTrabajadas = registros.reduce((total, registro) => total + registro.horasRealizadas, 0);
    return HORAS_INICIALES - totalHorasTrabajadas;
}

function actualizarResumen(): void {
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
    const horasForm = document.getElementById('horasForm') as HTMLFormElement;
    if (horasForm) {
        horasForm.addEventListener('submit', function(e: Event) {
            e.preventDefault();
            const fechaElement = document.getElementById('fecha') as HTMLInputElement;
            const entradaElement = document.getElementById('entrada') as HTMLInputElement;
            const salidaElement = document.getElementById('salida') as HTMLInputElement;
            const fecha = fechaElement.value;
            const entrada = entradaElement.value;
            const salida = salidaElement.value;
            if (fecha && entrada && salida) {
                const horasRealizadas = calcularHorasTrabajadas(entrada, salida);
                const nuevoRegistro: Registro = { fecha, entrada, salida, horasRealizadas };
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


