using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend_SolicitudPermiso.Data;
using backend_SolicitudPermiso.Models;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;

namespace backend_SolicitudPermiso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermisosController : ControllerBase
    {
        [HttpPost]
        [Route("guardar")]
        public ActionResult<RespuestaDB> guardar([FromBody]PermisosModel objPermiso)
        {
            permisos _permisos = new permisos();
            RespuestaDB respuestaBD = new RespuestaDB();
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    respuestaBD = _permisos.guardar(objPermiso);
                    transaction.Complete();
                }
                return new OkObjectResult(respuestaBD);
            }
            catch (Exception ex)
            {
                respuestaBD.status = "error";
                respuestaBD.response = ex.Message;
                return new OkObjectResult(respuestaBD);
            }
        }

        [HttpGet]
        [Route("Buscar_Permisos")]
        public ActionResult<IEnumerable<ListadoPermisosModel>> Buscar_Permisos(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            IEnumerable<ListadoPermisosModel> _arrayLista = new ListadoPermisosModel[] { };
            permisos _permisos = new permisos();
            object respuesta = new object();
            int elementosTotales = 0;
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    _arrayLista = _permisos.Buscar_Permisos(valor, parametro, numeroPagina, cantidadMostrar);
                    transaction.Complete();
                }
                if (_arrayLista.Count() > 0)
                {
                    elementosTotales = _arrayLista.ElementAt(0).total;
                }
                respuesta = new
                {
                    status = "success",
                    response = _arrayLista,
                    total = elementosTotales
                };
                return new OkObjectResult(respuesta);
            }
            catch (Exception ex)
            {
                respuesta = new
                {
                    status = "error",
                    response = ex.Message
                };

                return new OkObjectResult(respuesta);
            }
        }

        [HttpGet]
        [Route("traerPermisos_X_id/{id}")]
        public ActionResult<RespuestaDB> traerPermisos_X_id(int id)
        {
            PermisosModel datos = new PermisosModel { };
            permisos _permisos = new permisos();
            RespuestaDB respuestaBD = new RespuestaDB();

            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    datos = _permisos.traerPermisos_X_id(id);
                    transaction.Complete();
                }

                respuestaBD.status = datos == null ? "empty" : "success";
                respuestaBD.response = datos;
        
                return new OkObjectResult(respuestaBD);
            }
            catch (Exception ex)
            {
                respuestaBD.status = "error";
                respuestaBD.response = ex.Message;
                return new OkObjectResult(respuestaBD);
            }
        }

    }
}