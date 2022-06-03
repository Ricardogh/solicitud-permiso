import { Injectable } from "@angular/core";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { RespuestaDB } from '../respuestadb.model';
import { TipoNotificacion } from '../enum';

export const colores = {
  botonOK: '#032110',
  botonCONFIRMA_ELIMINAR: 'Red',
  imagen_confirmar: '../assets/img/pregunta.png'
};

@Injectable()
export class MetodosGlobales {
  // tslint:disable-next-line: max-line-length
  validaError(resultado: RespuestaDB, banderaMensajeOK: boolean = true, banderaMensajeERROR: boolean = true, texto: string = ''): boolean {
    if (resultado.status === 'error' || resultado.status === 'empty') {
      if (banderaMensajeERROR) {
        swal.fire({
          // type: 'error',
          // title: '<div style="color:white">' + resultado.response + '</div>',
          // toast: true,
          // position: 'bottom-end',
          // showConfirmButton: false,
          // timer: 4000,
          // background: '#bf1725'
          title: 'Error',
          text: resultado.response,
          icon: 'error',
          confirmButtonColor: colores.botonOK,
          showClass: {
            popup: 'animated fadeInDown'
          },
          hideClass: {
            popup: 'animated fadeOutUp'
          }
        });
      }

      return false;

    } else {
      if (banderaMensajeOK) {
        swal.fire({
          // type: 'success',
          // title: '<div style="color:white">Operación Completada Exitosamente</div>',
          // toast: true,
          // position: 'bottom-end',
          // showConfirmButton: false,
          // timer: 4000,
          // background: '#032110'
          title: 'Operación Completada Exitosamente',
          text: texto,
          icon: 'success',
          confirmButtonColor: colores.botonOK,
          showClass: {
            popup: 'animated fadeInDown'
          },
          hideClass: {
            popup: 'animated fadeOutUp'
          }
        });
      }

      return true;
    }
  }

  public transaccionOK(callback: Function) {
    swal.fire({
      title: 'Operación Completada Exitosamente',
      text!: '',
      icon: 'success',
      confirmButtonColor: colores.botonOK,
      showClass: {
        popup: 'animated fadeInUp'
      },
      hideClass: {
        popup: 'animated fadeOutDown'
      }
    }).then((_confirm: any) => {
      callback();
    });
  }


  MensajePersonalizado(title: string) {
    swal.fire({
      icon: 'error',
      title: '<div style="color:white">' + title + '</div>',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      background: '#bf1725',
      showClass: {
        popup: 'animated fadeInUp'
      },
      hideClass: {
        popup: 'animated fadeOutDown'
      }
    });
  }

  Notificacion(tipoNotificacion: TipoNotificacion, mensaje: string) {
    swal.fire({
      imageUrl: tipoNotificacion ==  TipoNotificacion.ASIGNACION_TRAMITE ? 'assets/img/tramites.png' :
                tipoNotificacion ==  TipoNotificacion.ASIGNACION_INCIDENCIA  ? 'assets/img/incidencia.png' : '',
      title: `<div class="d-flex align-items-center" style="color:white;height:70px;">
                <strong>${mensaje}</strong>
              </div>`,

      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 5000,
      background: '#ffaf00',
      imageWidth: 50,
      imageHeight: 50,
      showClass: {
        popup: 'animated fadeInUp'
      },
      hideClass: {
        popup: 'animated fadeOutDown'
      }
    });
  }

  MensajeError(mensaje: string) {
    swal.fire({
      title: mensaje,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: colores.botonOK,
      showClass: {
        popup: 'animated fadeInDown'
      },
      hideClass: {
        popup: 'animated fadeOutDown'
      }
    });
  }

  MensajeErrorToaster(title: string) {
    swal.fire({
      icon: 'error',
      title: '<div style="color:white">' + title + '</div>',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      background: '#bf1725'
    });
  }

  MostrarVentanaEmergente(url: string) {
    const Left = (window.screen.width / 2) - (800 / 2);
    const Top = (window.screen.height / 2) - (800 / 2);
    // window.open(`${environment.api_url}#/${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
    window.open(`${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
    // window.open(`http://${window.location.host}#/${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
  }

  toFormData<T>( model: any, form: FormData, namespace = '' ) {
    const formData = form || new FormData();
    let formKey: string | undefined;

    for (const propertyName in model) {
        if (!model.hasOwnProperty(propertyName) || !model[propertyName]) {
          continue;
        }
        formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date) {
          formData.append(formKey, model[propertyName].toISOString());
        } else if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element: any, index: any) => {
                const tempFormKey = `${formKey}[${index}]`;
                this.toFormData(element, formData, tempFormKey);
            });
        } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
          this.toFormData(model[propertyName], formData, formKey);
        } else if (model[propertyName] instanceof File) {
          formData.append(formKey, model[propertyName]);
        } else {
          formData.append(formKey, model[propertyName].toString());
        }
    }
    return formData;
  }
}
