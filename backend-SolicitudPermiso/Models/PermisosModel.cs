using System;
using System.Collections.Generic;
namespace backend_SolicitudPermiso.Models
{
    public class PermisosModel
    {
        public int id {get;set;}
        public int idEmpleado {get;set;}
        public int idTipoPermiso {get;set;}
        public DateTime fechaHoraInicioPermiso {get;set;}
        public DateTime fechaHoraFinPermiso {get;set;}
        public string descripcion {get;set;}
    }

    public class ListadoPermisosModel
    {
        public int id {get;set;}
        public string nombreEmpleado {get;set;}
        public string apellidosEmpleado {get;set;}
        public string tipoPermiso {get;set;}
        public DateTime fechaHoraInicioPermiso {get;set;}
        public DateTime fechaHoraFinPermiso {get;set;}
        public int total {get;set;}
    }

    public class ListadoPermisoEmpleadoModel
    {
        public string nombreEmpleado {get;set;}
        public string apellidosEmpleado {get;set;}
        public int cantPermiso {get;set;}
        public int total {get;set;}
    }

    public class ListadoPermisoTipoPermisoModel
    {
        public string nombreEmpleado {get;set;}
        public string apellidosEmpleado {get;set;}
        public string tipoPermiso {get;set;}
        public int total {get;set;}
    }
}