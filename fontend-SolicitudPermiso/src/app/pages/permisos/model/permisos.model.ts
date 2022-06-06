export interface PermisosModel{
    id: number;
    idEmpleado: number;
    idTipoPermiso: number;
    fechaHoraInicioPermiso: string;
    fechaHoraFinPermiso: string;
}

export interface ListadoPermisosModel{
    id: number;
    nombreEmpleado: string;
    apellidosEmpleado: string;
    tipoPermiso: number;
    fechaHoraInicioPermiso: string;
    fechaHoraFinPermiso: string;
    total: number;
}