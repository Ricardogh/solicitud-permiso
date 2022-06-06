using backend_SolicitudPermiso.Models;
using backend_SolicitudPermiso.Conexion;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace backend_SolicitudPermiso.Data
{
    public class permisos
    {
        c_conexion _c_conexion = new c_conexion();

        public RespuestaDB guardar(PermisosModel datos)
        {
            try
            {
                RespuestaDB respuesta = new RespuestaDB();
                string nombreFuncion = "sp_abmPermisos";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    respuesta = cnx.QuerySingleOrDefault<RespuestaDB>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            accion = datos.id == 0 ? 1 : 2,
                            id = datos.id,
                            idEmpleado = datos.idEmpleado,
                            idTipoPermiso = datos.idTipoPermiso,
                            fechaHoraInicioPermiso = datos.fechaHoraInicioPermiso.AddHours(-4),
                            fechaHoraFinPermiso = datos.fechaHoraFinPermiso.AddHours(-4),
                            descripcion = datos.descripcion.ToUpper().Trim(),
                        }
                    );
                    cnx.Close();
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public RespuestaDB eliminar(int id)
        {
            try
            {
                RespuestaDB respuesta = new RespuestaDB();
                string nombreFuncion = "sp_abmPermisos";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    respuesta = cnx.QuerySingleOrDefault<RespuestaDB>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            accion = 3,
                            id = id,
                        }
                    );
                    cnx.Close();
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public PermisosModel traerPermisos_X_id(int id)
        {
            try
            {
                PermisosModel datos = new PermisosModel();
                string nombreFuncion = "sp_traerPermiso_X_id";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    datos = cnx.QuerySingleOrDefault<PermisosModel>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new
                        {
                            id = id
                        }
                    );
                    cnx.Close();
                }

                return datos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ListadoPermisosModel> Buscar_Permisos(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            try
            {
                IEnumerable<ListadoPermisosModel> arrayDatos = new ListadoPermisosModel[] { };
                string nombreFuncion = "sp_listado_Permisos";

                using (IDbConnection cnx =  _c_conexion.conexionSQL)
                {
                    arrayDatos = cnx.Query<ListadoPermisosModel>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            valor_bus = valor == null ? "" : valor,
                            parametro_bus = parametro,
                            numeropaginaactual = numeroPagina,
                            cantidadmostrar = cantidadMostrar
                        }                  
                    ).AsList();
                    cnx.Close();
                }

                return arrayDatos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

