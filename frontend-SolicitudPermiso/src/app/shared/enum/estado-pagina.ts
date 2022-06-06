export enum EstadoPagina {
    Cargando = 0,
    Ok = 1,
    Error = 3,
}

export enum RegistroValidacion {
    DIM = 1,
    DAM = 2,
    fechaParteRecepcion = 3,
    FechaPago = 4,
    FechaLevante = 5,
    FechaRetiro = 6,
}

export enum TipoNotificacion {
    ASIGNACION_TRAMITE = 1,
    ASIGNACION_INCIDENCIA = 2
}

export enum roles {
    ADMINISTRADOR = 1,
    LIQUIDADORES = 2,
    RECEPCION = 3,
    JEFE_OPERATIVO = 4,
    ENCARGADO_CONTABILIDAD = 5,
    AUXILIAR_CONTABLE = 6,
    GERENTE_GENERAL = 7,
    GESTOR = 8,
    MENSAJERO = 9
}
