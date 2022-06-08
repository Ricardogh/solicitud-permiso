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
    tipoPermiso: string;
    fechaHoraInicioPermiso: string;
    fechaHoraFinPermiso: string;
    total: number;
}

export interface ListadoPermisoEmpleadoModel{
    nombreEmpleado: string;
    apellidosEmpleado: string;
    cantPermiso: string;
    total: number;
}

export interface ListadoPermisoTipoPermisoModel{
    nombreEmpleado: string;
    apellidosEmpleado: string;
    tipoPermiso: string;
    total: number;
}