interface AprobadaMarcaOptional {
    estado: string;
    fechaEntregaTitulo: string;
    fechaResolucion: string;
    fechaVencimiento: string;
    notas: string;
    numeroGaceta: string;
    numeroresolucion: string;
    tituloEntregado: string;
}

type AprobadaMarcaProperties = Partial<AprobadaMarcaOptional>;

export type { AprobadaMarcaProperties }