// Lista de estados posibles para una transferencia.
const statuses = [
  {
    id: 1,
    name: "CREADA",
  },
  {
    id: 2,
    name: "PAGADA",
  },
  {
    id: 3,
    name: "ABORTADA",
  },
  {
    id: 4,
    name: "FINALIZADA",
  },
];

// Lista de transferencias inicial
const transfers = [
  {
    id: 1,
    licensePlate: "LFTS34",
    email: "usuario1@autored.cl",
    status: "CREADA",
  },
  {
    id: 2,
    licensePlate: "LFTS35",
    email: "usuario1@autored.cl",
    status: "ABORTADA",
  },
  {
    id: 3,
    licensePlate: "BDLS99",
    email: "usuario3@autored.cl",
    status: "CREADA",
  },
  {
    id: 4,
    licensePlate: "LFTS34",
    email: "usuario4@autored.cl",
    status: "CREADA",
  },
  {
    id: 5,
    licensePlate: "BDLS99",
    email: "usuario5@autored.cl",
    status: "FINALIZADA",
  },
  {
    id: 6,
    licensePlate: "PFCB00",
    email: "test@example.com",
    status: "PAGADA",
  },
];

// Escribe tu codigo acá

// Ejercicio 1
export function getTransfersByEmail(email) {
  return transfers.filter((transfer) => transfer.email === email);
}

// Ejercicio 2
function validateLicencePlate(licensePlate) {
  const validLicensePlate = /^[A-Za-z]{4}\d{2}|\^[A-Za-z]{2}\d{4}$/;
  return validLicensePlate.test(licensePlate);
}

function validatePaidTransfer(licensePlate) {
  const paidTransfer = transfers.find(
    (transfer) =>
      transfer.licensePlate === licensePlate && transfer.status === "PAGADA"
  );

  return !!paidTransfer;
}

function checkForInProgressTransfer(licensePlate, email) {
  const inProgressTransfer = transfers.find(
    (transfer) =>
      transfer.licensePlate === licensePlate &&
      transfer.email === email &&
      transfer.status !== "ABORTADA" &&
      transfer.status !== "FINALIZADA"
  );
  return !!inProgressTransfer;
}

export function createTransfer(licensePlate, email) {
  const isValidPlate = validateLicencePlate(licensePlate);

  if (!isValidPlate) {
    return "La patente ingresada no es válida";
  }

  const isPaidTransfer = validatePaidTransfer(licensePlate);

  if (isPaidTransfer) {
    return "Ya existe una transferencia pagada para esta patente";
  }

  const transferIsInProgress = checkForInProgressTransfer(licensePlate, email);

  if (transferIsInProgress) {
    return "Ya existe una transferencia en progreso para esta patente y correo";
  }

  const newTransfer = {
    id: transfers.length + 1,
    licensePlate,
    email,
    status: "CREADA",
  };
  transfers.push(newTransfer);

  return { message: "La transferencia ha sido creada exitosamente", transfers };
}
