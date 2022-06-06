using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using Npgsql;
using backend_SolicitudPermiso.Models;
using System.Security.Cryptography;

namespace backend_SolicitudPermiso.Conexion
{
    public class c_conexion
    {
        private IConfiguration appSettingsInstance;

        private static c_conexion _instance = null;

        public c_conexion()
        {
            appSettingsInstance = new ConfigurationBuilder()
                                    .SetBasePath(Directory.GetCurrentDirectory())
                                    .AddJsonFile("appsettings.json").Build();
        }

        public static c_conexion Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new c_conexion();
                }

                return _instance;
            }
        }


        public IDbConnection conexionSQL
        {
            get
            {
                return new SqlConnection(appSettingsInstance.GetConnectionString("CadenaConexionSQL"));

            }
        }
    }
}
