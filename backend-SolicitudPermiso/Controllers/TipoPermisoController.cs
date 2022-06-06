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
    public class TipoPermisoController : ControllerBase
    {
        [HttpPost]
        [Route("guardar")]
        public ActionResult<RespuestaDB> guardar([FromBody]TipoPermisoModel objTipoPermiso)
        {
            tipoPermiso _tipoPermiso = new tipoPermiso();
            RespuestaDB respuestaBD = new RespuestaDB();
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    respuestaBD = _tipoPermiso.guardar(objTipoPermiso);
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
        [Route("Buscar_TipoPermiso")]
        public ActionResult<IEnumerable<TipoPermisoModel>> Buscar_TipoPermiso(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            IEnumerable<TipoPermisoModel> _arrayLista = new TipoPermisoModel[] { };
            tipoPermiso _tipoPermiso = new tipoPermiso();
            object respuesta = new object();
            int elementosTotales = 0;
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    _arrayLista = _tipoPermiso.Buscar_TipoPermiso(valor, parametro, numeroPagina, cantidadMostrar);
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
        [Route("traerTipoPermiso_X_id/{id}")]
        public ActionResult<RespuestaDB> traerTipoPermiso_X_id(int id)
        {
            TipoPermisoModel datos = new TipoPermisoModel { };
            tipoPermiso _tipoPermiso = new tipoPermiso();
            RespuestaDB respuestaBD = new RespuestaDB();

            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    datos = _tipoPermiso.traerTipoPermiso_X_id(id);
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