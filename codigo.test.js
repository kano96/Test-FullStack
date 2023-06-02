import { getTransfersByEmail, createTransfer, payTransfer } from "./codigo";

describe("Transfers functions", () => {
  describe("getTransfersByEmail()", () => {
    it("should return an array of transfers for a given email", () => {
      const result = getTransfersByEmail("usuario1@autored.cl");
      expect(result).toHaveLength(2);
      expect(result[0].email).toEqual("usuario1@autored.cl");
      expect(result[1].email).toEqual("usuario1@autored.cl");
    });

    it("should return an empty array if no transfers were found for the given email", () => {
      const result = getTransfersByEmail("noexistent@autored.cl");
      expect(result).toEqual([]);
    });
  });

  describe("createTransfer function", () => {
    it("should return an error message when the license plate is invalid", () => {
      const result = createTransfer("invalid_plate", "test@example.com");
      expect(result).toEqual("La patente ingresada no es válida");
    });

    it("should return an error message when there is already a paid transfer for the license plate", () => {
      const result = createTransfer("PFCB00", "test@example.com");
      expect(result).toEqual(
        "Ya existe una transferencia pagada para esta patente"
      );
    });

    it("should return an error message when there is already an in progress transfer for the license plate and email", () => {
      const result = createTransfer("LFTS34", "usuario1@autored.cl");
      expect(result).toEqual(
        "Ya existe una transferencia en progreso para esta patente y correo"
      );
    });

    it("should create a new transfer when the license plate is valid and there is no in progress or paid transfer", () => {
      const result = createTransfer("NEWP00", "test@example.com");
      expect(result.message).toEqual(
        "La transferencia ha sido creada exitosamente"
      );
      expect(result.transfers.length).toEqual(7);
      expect(result.transfers[6].licensePlate).toEqual("NEWP00");
      expect(result.transfers[6].email).toEqual("test@example.com");
      expect(result.transfers[6].status).toEqual("CREADA");
    });
  });

  describe("payTransfer function", () => {
    it("should return an error message when there is no in progress transfer for the license plate and email", () => {
      const result = payTransfer("LFTS34", "invalid@example.com");
      expect(result).toEqual(
        "No existe una transferencia en progreso para esta patente y correo"
      );
    });

    it("should return an error message when there is already a paid transfer for the license plate", () => {
      const result = payTransfer("PFCB00", "test@example.com");
      expect(result).toEqual(
        "Ya existe una transferencia pagada para esta patente"
      );
    });

    it("should mark the in progress transfer as paid and abort other in progress transfers for the same license plate", () => {
      const result = payTransfer("LFTS34", "usuario1@autored.cl");
      expect(result[0].status).toEqual("PAGADA");
      expect(result[1].status).toEqual("ABORTADA");
      expect(result[3].status).toEqual("ABORTADA");
    });
  });
});
