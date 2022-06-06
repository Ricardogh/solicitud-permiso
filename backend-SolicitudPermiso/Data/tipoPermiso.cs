using backend_SolicitudPermiso.Models;
using backend_SolicitudPermiso.Conexion;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace backend_SolicitudPermiso.Data
{
    public class tipoPermiso
    {
        c_conexion _c_conexion = new c_conexion();

        public RespuestaDB guardar(TipoPermisoModel datos)
        {
            try
            {
                RespuestaDB respuesta = new RespuestaDB();
                string nombreFuncion = "sp_abmTipoPermiso";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    respuesta = cnx.QuerySingleOrDefault<RespuestaDB>(
                        sql: nombreFuncion,
                        commandType: CommandType.StoredProcedure,
                        param: new {
                            accion = datos.id == 0 ? 1 : 2,
                            id = datos.id,
                            descripcion = datos.descripcion.ToUpper().Trim()
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
                string nombreFuncion = "sp_abmTipoPermiso";

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

        public TipoPermisoModel traerTipoPermiso_X_id(int id)
        {
            try
            {
                TipoPermisoModel datos = new TipoPermisoModel();
                string nombreFuncion = "sp_traerTipoPermiso_X_id";

                using (IDbConnection cnx = _c_conexion.conexionSQL)
                {
                    datos = cnx.QuerySingleOrDefault<TipoPermisoModel>(
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

        public IEnumerable<TipoPermisoModel> Buscar_TipoPermiso(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            try
            {
                IEnumerable<TipoPermisoModel> arrayDatos = new TipoPermisoModel[] { };
                string nombreFuncion = "sp_listado_tipoPermiso";

                using (IDbConnection cnx =  _c_conexion.conexionSQL)
                {
                    arrayDatos = cnx.Query<TipoPermisoModel>(
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

