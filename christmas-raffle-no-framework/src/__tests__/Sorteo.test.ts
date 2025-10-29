
import SorteoClass from "../Sorteo";

describe("SorteoClass", () => {
  let sorteo: SorteoClass;

  beforeEach(() => {
    sorteo = new SorteoClass();
  });

  it("should register a participant", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    const participants = sorteo.listarParticipantes();
    expect(participants.length).toBe(1);
    expect(participants[0].name).toBe("John Doe");
  });

  it("should not register a participant with the same email", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    expect(() => sorteo.registrarParticipante("Jane Doe", "john.doe@example.com", "987654321")).toThrow(
      "Ya existe un participante con el mismo email."
    );
  });

  it("should reserve a number", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    sorteo.reservarNumero(10, "john.doe@example.com");
    const state = sorteo.obtenerEstadoNumero(10);
    expect(state.reservadoPor).not.toBeNull();
    expect(state.reservadoPor?.name).toBe("John Doe");
  });

  it("should not reserve a taken number", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    sorteo.reservarNumero(10, "john.doe@example.com");
    sorteo.registrarParticipante("Jane Doe", "jane.doe@example.com", "987654321");
    expect(() => sorteo.reservarNumero(10, "jane.doe@example.com")).toThrow(
      "El número ya está reservado."
    );
  });

  it("should release a number", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    sorteo.reservarNumero(10, "john.doe@example.com");
    sorteo.liberarNumero(10);
    const state = sorteo.obtenerEstadoNumero(10);
    expect(state.reservadoPor).toBeNull();
  });

  it("should get statistics", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    sorteo.reservarNumero(10, "john.doe@example.com");
    const stats = sorteo.obtenerEstadisticas();
    expect(stats.numerosOcupados).toBe(1);
    expect(stats.numerosLibres).toBe(99);
    expect(stats.totalParticipantes).toBe(1);
    expect(stats.porcentajeOcupacion).toBe("1%");
  });

  it("should draw a winner", () => {
    sorteo.registrarParticipante("John Doe", "john.doe@example.com", "123456789");
    sorteo.reservarNumero(10, "john.doe@example.com");
    const winner = sorteo.realizarSorteo(10);
    expect(winner).not.toBeNull();
    expect(winner?.participante.name).toBe("John Doe");
  });

  it("should return null if winning number is not taken", () => {
    const winner = sorteo.realizarSorteo(10);
    expect(winner).toBeNull();
  });
});
