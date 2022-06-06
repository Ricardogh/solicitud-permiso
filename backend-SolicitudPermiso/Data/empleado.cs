using backend_SolicitudPermiso.Models;
using backend_SolicitudPermiso.Conexion;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace backend_SolicitudPermiso.Data
{
    public class empleado
    {
        c_conexion _c_conexion = new c_conexion();

        public RespuestaDB guardar(EmpleadoModel datos)
        {
            try
            {
                RespuestaDB respuesta = new RespuestaDB();
                string nombreFuncion = "sp_abmEmpleado";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    respuesta = cnx.QuerySingleOrDefault<RespuestaDB>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            accion = datos.id == 0 ? 1 : 2,
                            id = datos.id,
                            nombre = datos.nombreEmpleado.ToUpper().Trim(),
                            apellidos = datos.apellidosEmpleado.ToUpper().Trim(),
                            fechaNacimiento = datos.fechaNacimiento,
                            fechaIngreso = datos.fechaIngreso
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
                string nombreFuncion = "sp_abmEmpleado";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    respuesta = cnx.QuerySingleOrDefault<RespuestaDB>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            accion = 3,
                            id = id
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

        public EmpleadoModel traerEmpleado_X_id(int id)
        {
            try
            {
                EmpleadoModel datos = new EmpleadoModel();
                string nombreFuncion = "sp_traerEmpleado_X_id";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    datos = cnx.QuerySingleOrDefault<EmpleadoModel>(
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

        public IEnumerable<EmpleadoModel> Buscar_Empleado(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            try
            {
                IEnumerable<EmpleadoModel> arrayDatos = new EmpleadoModel[] { };
                string nombreFuncion = "sp_listado_empleado";

                using (IDbConnection cnx =  _c_conexion.conexionSQL)
                {
                    arrayDatos = cnx.Query<EmpleadoModel>(
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

