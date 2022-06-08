using System;
namespace backend_SolicitudPermiso.Models
{
    public class EmpleadoModel
    {
        public int id {get;set;}
        public string nombreEmpleado {get;set;}
        public string apellidosEmpleado {get;set;}
        public DateTime fechaNacimiento {get;set;}
        public DateTime fechaIngreso {get;set;}
        public int total {get;set;}
    }

}