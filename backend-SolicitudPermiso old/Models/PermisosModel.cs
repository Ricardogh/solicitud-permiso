namespace backend_SolicitudPermiso.Models
{
    public class PermisosModel
    {
        public int id {get;set;}
        public int idEmpleado {get;set;}
        public int idTipoPermiso {get;set;}
        public DateTime fechaHoraInicioPermiso {get;set;}
        public DateTime fechaHoraFinPermiso {get;set;}
    }

    public class ListadoPermisosModel
    {
        public int id {get;set;}
        public int nombreEmpleado {get;set;}
        public int apellidosEmpleado {get;set;}
        public int tipoPermiso {get;set;}
        public DateTime fechaHoraInicioPermiso {get;set;}
        public DateTime fechaHoraFinPermiso {get;set;}
        public int total {get;set;}
    }
}