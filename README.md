# solicitud-permiso
antes de realizar las configuraciones debe de tener las siguientes instalaciones:
1. Node.js en su version 14.16.1 o posterior.
2. CLI de angular 13.0.4 o posterior
3. Tener instalado el núcleo de .Net Core 3.1 o Visual Studio 2019 o posterior con .Net core 3.1
4. Git
5. SQL Server 2014 o posterior

# Configuración de la Base de Datos
1. Descargar del repositorio Git el proyecto: https://github.com/Ricardogh/solicitud-permiso.git 
2. En el directorio raiz se encuantra el archivo DB_permiso.bak
3. Restaurar la Base de Datos
4. Otra forma sería ejecutar el script "Script Create DataBase Table.sql" que se encuentra en el mismo directorio raiz, para crear la Base de Datos, Tablas, Vistas, Funciones y Procedimientos almacenados

# Configuracion Proyecto Angular
1. Descargar del repositorio Git el proyecto: https://github.com/Ricardogh/solicitud-permiso.git 
2. Ingresar al directorio frontend-SolicitudPermiso.
3. Ejecutar el comando npm install o npm i para instalar los paquetes necesarios.
4. Una vez instalados los paquetes ejecutar el siguiente comando para levantar el proyecto "ng s -o".
5. Se abrirá su explorador web automaticamente con la siguiente direccion web http://localhost:4200 mostrando la interface del proyecto.

# Configuracion Proyecto .Net Core 3.1
1. Descargar del repositorio Git el proyecto: https://github.com/Ricardogh/solicitud-permiso.git 
2. Ingresar al directorio backend-SolicitudPermiso.
3. Ejecutar el siguiente comando "dotnet run" para hostear el servicio o abrir la solucion con Visual Studio 2019 o posterior.
4. Los servicio quedan expuestos para ser consumido desde la aplicacion angular en la siguiente direccion web http://localhost:5000

# Configuración del archivo appsettings.json del proyecto .Net Core 3.1
1. Ingresar al directorio backend-SolicitudPermiso.
2. Abrir con un editor de texto el archivo "appsettings.json"
3. Cambiar la cadena de conexión que se encuentra en "ConnectionStrings -> CadenaConexionSQL"
4. Guardar el archivo.