
import { IParticipant, Ticket } from "./interfaces";

export default class SorteoClass {
    private tickets: Ticket[] = [];
    private participants: IParticipant[] = [];

    constructor() {
        this.inicializarTablero();
    }

    private inicializarTablero() {
        this.tickets = Array.from({ length: 100 }, (_, i) => ({
            number: i,
            participant: null,
        }));
    }

    registrarParticipante(name: string, email: string, phone: string) {
        if (this.participants.some(p => p.email === email)) {
            throw new Error("Ya existe un participante con el mismo email.");
        }
        this.participants.push({ name, email, phone });
    }

    listarParticipantes(): IParticipant[] {
        return this.participants;
    }

    reservarNumero(numero: number, email: string) {
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

    liberarNumero(numero: number) {
        const ticket = this.tickets.find(t => t.number === numero);
        if (!ticket) {
            throw new Error("Número de ticket inválido.");
        }

        if (!ticket.participant) {
            throw new Error("El número no está reservado.");
        }

        ticket.participant = null;
    }

    obtenerEstadoNumero(numero: number): { reservadoPor: IParticipant | null } {
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

    realizarSorteo(numeroGanador: number): { numero: number, participante: IParticipant } | null {
        const ticket = this.tickets.find(t => t.number === numeroGanador);
        if (ticket && ticket.participant) {
            return { numero: ticket.number, participante: ticket.participant };
        }
        return null;
    }

    obtenerGanador(): { numero: number, participante: IParticipant } | null {
        // This method is not implemented in the original code, so I will leave it empty
        return null;
    }
}
