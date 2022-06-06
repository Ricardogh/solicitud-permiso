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
    public class EmpleadoController : ControllerBase
    {
        [HttpPost]
        [Route("guardar")]
        public ActionResult<RespuestaDB> guardar([FromBody]EmpleadoModel objEmpleado)
        {
            empleado _empleado = new empleado();
            RespuestaDB respuestaBD = new RespuestaDB();
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    respuestaBD = _empleado.guardar(objEmpleado);
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

        [HttpDelete]
        [Route("eliminar/{id}")]
        public ActionResult<RespuestaDB> eliminar(int id)
        {
            empleado _empleado = new empleado();
            RespuestaDB respuestaBD = new RespuestaDB();
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    respuestaBD = _empleado.eliminar(id);
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
        [Route("Buscar_Empleado")]
        public ActionResult<IEnumerable<EmpleadoModel>> Buscar_Empleado(string valor, string parametro, int numeroPagina, int cantidadMostrar)
        {
            IEnumerable<EmpleadoModel> _arrayLista = new EmpleadoModel[] { };
            empleado _empleado = new empleado();
            object respuesta = new object();
            int elementosTotales = 0;
            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    _arrayLista = _empleado.Buscar_Empleado(valor, parametro, numeroPagina, cantidadMostrar);
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
        [Route("traerEmpleado_X_id/{id}")]
        public ActionResult<RespuestaDB> traerEmpleado_X_id(int id)
        {
            EmpleadoModel datos = new EmpleadoModel { };
            empleado _empleado = new empleado();
            RespuestaDB respuestaBD = new RespuestaDB();

            try
            {
                using (TransactionScope transaction = new TransactionScope())
                {
                    datos = _empleado.traerEmpleado_X_id(id);
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