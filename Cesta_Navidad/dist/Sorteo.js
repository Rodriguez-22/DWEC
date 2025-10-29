export default class SorteoClass {
    constructor() {
        this.tickets = [];
        this.participants = [];
        this.inicializarTablero();
    }
    inicializarTablero() {
        this.tickets = Array.from({ length: 100 }, (_, i) => ({
            number: i,
            participant: null,
        }));
    }
    registrarParticipante(name, email, phone) {
        if (this.participants.some(p => p.email === email)) {
            throw new Error("Ya existe un participante con el mismo email.");
        }
        this.participants.push({ name, email, phone });
    }
    listarParticipantes() {
        return this.participants;
    }
    reservarNumero(numero, email) {
        const participante = this.participants.find(p => p.email === email);
        if (!participante) {
            throw new Error("Participante no encontrado.");
        }
        const ticket = this.tickets.find(t => t.number === numero);
        if (!ticket) {
            throw new Error("Número de ticket inválido.");
        }
        if (ticket.participant) {
            throw new Error("El número ya está reservado.");
        }
        ticket.participant = participante;
    }
    liberarNumero(numero) {
        const ticket = this.tickets.find(t => t.number === numero);
        if (!ticket) {
            throw new Error("Número de ticket inválido.");
        }
        if (!ticket.participant) {
            throw new Error("El número no está reservado.");
        }
        ticket.participant = null;
    }
    obtenerEstadoNumero(numero) {
        const ticket = this.tickets.find(t => t.number === numero);
        return { reservadoPor: ticket ? ticket.participant : null };
    }
    obtenerEstadisticas() {
        const numerosOcupados = this.tickets.filter(t => t.participant).length;
        const numerosLibres = 100 - numerosOcupados;
        const totalParticipantes = this.participants.length;
        const porcentajeOcupacion = `${numerosOcupados}%`;
        return { numerosOcupados, numerosLibres, totalParticipantes, porcentajeOcupacion };
    }
    realizarSorteo(numeroGanador) {
        const ticket = this.tickets.find(t => t.number === numeroGanador);
        if (ticket && ticket.participant) {
            return { numero: ticket.number, participante: ticket.participant };
        }
        return null;
    }
    obtenerGanador() {
        // This method is not implemented in the original code, so I will leave it empty
        return null;
    }
}
