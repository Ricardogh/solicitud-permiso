USE [master]
GO
/****** Object:  Database [DB_permiso]    Script Date: 8/6/2022 13:37:29 ******/
CREATE DATABASE [DB_permiso]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DB_permiso', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\DB_permiso.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'DB_permiso_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\DB_permiso_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [DB_permiso] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DB_permiso].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DB_permiso] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DB_permiso] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DB_permiso] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DB_permiso] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DB_permiso] SET ARITHABORT OFF 
GO
ALTER DATABASE [DB_permiso] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DB_permiso] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [DB_permiso] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DB_permiso] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DB_permiso] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DB_permiso] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DB_permiso] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DB_permiso] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DB_permiso] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DB_permiso] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DB_permiso] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DB_permiso] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DB_permiso] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DB_permiso] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DB_permiso] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DB_permiso] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DB_permiso] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DB_permiso] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DB_permiso] SET RECOVERY FULL 
GO
ALTER DATABASE [DB_permiso] SET  MULTI_USER 
GO
ALTER DATABASE [DB_permiso] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DB_permiso] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DB_permiso] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DB_permiso] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [DB_permiso]
GO
/****** Object:  StoredProcedure [dbo].[sp_abmEmpleado]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_abmEmpleado]
	@accion int,
	@id int,
	@nombre varchar(50)=null,
	@apellidos varchar(100)=null,
	@fechaNacimiento date=null,
	@fechaIngreso date=null
AS
BEGIN
	IF (@accion = 1) /*REGISTRAR*/
	BEGIN
		INSERT INTO Empleado VALUES(
			@nombre,
			@apellidos,
			@fechaNacimiento,
			@fechaIngreso
		)
		if @@ROWCOUNT = 0
		begin
            select 'error'status, 'El Registro no se pudo Guardar'response, '0'numsec;
			return;
		end
        else
		begin
           	select 'success'status, 'OK'response, @id numsec;
			return;
        end;
	END

	IF (@accion = 2) /*ACTUALIZAR*/
	BEGIN
		UPDATE Empleado SET
			nombreEmpleado=@nombre,
			apellidosEmpleado=@apellidos,
			fechaNacimiento=@fechaNacimiento,
			fechaIngreso=@fechaIngreso
		WHERE id = @id
		
		if @@ROWCOUNT = 0
		begin
            select 'error'status, 'El Registro no se pudo Actualizar'response, '0'numsec;
			return;
		end
        else
		begin
           	select 'success'status, 'OK'response, @id numsec;
			return;
        end;
	END

	IF (@accion = 3) /*ELIMINAR*/
	BEGIN
		if (select count(idEmpleado) from Permisos where idEmpleado=@id)=0
		BEGIN
			DELETE FROM Empleado WHERE id=@id
			if @@ROWCOUNT = 0
			begin
				select 'error'status, 'El Registro no se pudo Eliminar'response, '0'numsec;
				return;
			end
			else
			begin
           		select 'success'status, 'OK'response, @id numsec;
				return;
			end;
		END
		ELSE
		BEGIN
			select 'error'status, 'No se puede eliminar el registro, existen permisos registrado para este Empleado'response, '0'numsec;
			return;
		END
	END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_abmPermisos]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_abmPermisos]
	@accion int,
	@id int,
	@idEmpleado int=null,
	@idTipoPermiso int=null,
	@fechaHoraInicioPermiso datetime=null,
	@fechaHoraFinPermiso datetime=null,
	@descripcion varchar(max)=null
AS
BEGIN
	IF (@accion = 1) /*REGISTRAR*/
	BEGIN
		if (select COUNT(*) from Permisos where (@fechaHoraInicioPermiso <= fechaHoraFinPermiso) and (@fechaHoraFinPermiso >=fechaHoraInicioPermiso) and idEmpleado=@idEmpleado)=0
		BEGIN
			INSERT INTO permisos VALUES(
				@idEmpleado,
				@idTipoPermiso,
				@fechaHoraInicioPermiso,
				@fechaHoraFinPermiso,
				@descripcion
			)
			if @@ROWCOUNT = 0
			begin
				select 'error'status, 'El Registro no se pudo Guardar'response, '0'numsec;
				return;
			end
			else
			begin
           		select 'success'status, 'OK'response, @id numsec;
				return;
			end;
		END
		ELSE
		BEGIN
			select 'error'status, 'No se puede registrar el permiso, ya existe un permiso dentro de esas fechas y horas para el empleado seleccionado'response, '0'numsec;
			return;
		END
	END

	IF (@accion = 2) /*ACTUALIZAR*/
	BEGIN
		if (select COUNT(*) from Permisos where (@fechaHoraInicioPermiso <= fechaHoraFinPermiso) and (@fechaHoraFinPermiso >=fechaHoraInicioPermiso) and id<>@id and idEmpleado=@idEmpleado)=0
		BEGIN
			UPDATE permisos SET
				idEmpleado=@idEmpleado,
				idTipoPermiso=@idTipoPermiso,
				fechaHoraInicioPermiso=@fechaHoraInicioPermiso,
				fechaHoraFinPermiso=@fechaHoraFinPermiso,
				descripcion=@descripcion
			WHERE id = @id
		
			if @@ROWCOUNT = 0
			begin
				select 'error'status, 'El Registro no se pudo Actualizar'response, '0'numsec;
				return;
			end
			else
			begin
           		select 'success'status, 'OK'response, @id numsec;
				return;
			end;
		END
		ELSE
		BEGIN
			select 'error'status, 'No se puede registrar el permiso, ya existe un permiso dentro de esas fechas y horas para el empleado seleccionado'response, '0'numsec;
			return;
		END
	END

	IF (@accion = 3) /*ELIMINAR*/
	BEGIN
		DELETE FROM Permisos WHERE id=@id
		if @@ROWCOUNT = 0
		begin
            select 'error'status, 'El Registro no se pudo Eliminar'response, '0'numsec;
			return;
		end
        else
		begin
           	select 'success'status, 'OK'response, @id numsec;
			return;
        end;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_abmTipoPermiso]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_abmTipoPermiso]
	@accion int,
	@id int,
	@descripcion varchar(50)=null
AS
BEGIN
	IF (@accion = 1) /*REGISTRAR*/
	BEGIN
		INSERT INTO TipoPermiso VALUES(
			@descripcion
		)
		if @@ROWCOUNT = 0
		begin
            select 'error'status, 'El Registro no se pudo Guardar'response, '0'numsec;
			return;
		end
        else
		begin
           	select 'success'status, 'OK'response, @id numsec;
			return;
        end;
	END

	IF (@accion = 2) /*ACTUALIZAR*/
	BEGIN
		UPDATE TipoPermiso SET
			descripcion=@descripcion
		WHERE id = @id
		
		if @@ROWCOUNT = 0
		begin
            select 'error'status, 'El Registro no se pudo Actualizar'response, '0'numsec;
			return;
		end
        else
		begin
           	select 'success'status, 'OK'response, @id numsec;
			return;
        end;
	END

	IF (@accion = 3) /*ELIMINAR*/
	BEGIN
		if (select count(idTipoPermiso) from Permisos where idTipoPermiso=@id)=0
		BEGIN
			DELETE FROM TipoPermiso WHERE id=@id
			if @@ROWCOUNT = 0
			begin
				select 'error'status, 'El Registro no se pudo Eliminar'response, '0'numsec;
				return;
			end
			else
			begin
           		select 'success'status, 'OK'response, @id numsec;
				return;
			end;
		END
		ELSE
		BEGIN
			select 'error'status, 'No se puede eliminar el registro, exiten permisos registrados con ese Tipo'response, '0'numsec;
			return;
		END
	END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_listado_empleado]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_listado_empleado]
	@valor_bus nvarchar(max),
	@parametro_bus nvarchar(max)= '',
	@numeropaginaactual integer=0,
	@cantidadmostrar integer=0
as
begin
	declare	@sql nvarchar(max);
	declare	@params nvarchar(max);
	set @params = '@valor_bus varchar(max),
					@numeropaginaactual integer,
					@cantidadmostrar integer'

	set @sql = 'SELECT 
					id,
					nombreEmpleado,
					apellidosEmpleado,
					fechaNacimiento,
					fechaIngreso,
					count(*) over() total
				FROM Empleado'
	set @sql+= ' WHERE upper('+@parametro_bus+') like ''%''+upper(@valor_bus)+''%''';
	set @sql+=' order by id ASC';
	set @sql+=' OFFSET @cantidadMostrar*@numeroPaginaActual ROWS';
	set @sql+=' FETCH NEXT @cantidadMostrar ROWS ONLY';
	
	exec sp_executesql @sql,@params,@valor_bus=@valor_bus,@numeroPaginaActual=@numeroPaginaActual,
						@cantidadMostrar=@cantidadMostrar
end
/*
sp_listado_empleado '','nombreEmpleado',0,5
*/
GO
/****** Object:  StoredProcedure [dbo].[sp_listado_permisos]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_listado_permisos]
	@valor_bus nvarchar(max),
	@parametro_bus nvarchar(max)= '',
	@numeropaginaactual integer=0,
	@cantidadmostrar integer=0
as
begin
	declare	@sql nvarchar(max);
	declare	@params nvarchar(max);
	set @params = '@valor_bus varchar(max),
					@numeropaginaactual integer,
					@cantidadmostrar integer'

	set @sql = 'SELECT 
					p.id id,
					e.nombreEmpleado,
					e.apellidosEmpleado,
					tp.descripcion tipoPermiso,
					p.fechaHoraInicioPermiso,
					p.fechaHoraFinPermiso,
					count(*) over() total
				FROM Permisos p
				inner join Empleado e on p.idEmpleado=e.id
				inner join TipoPermiso tp on p.idTipoPermiso=tp.id'
	set @sql+= ' WHERE upper('+@parametro_bus+') like ''%''+upper(@valor_bus)+''%''';
	set @sql+=' order by p.id DESC';
	set @sql+=' OFFSET @cantidadMostrar*@numeroPaginaActual ROWS';
	set @sql+=' FETCH NEXT @cantidadMostrar ROWS ONLY';
	
	exec sp_executesql @sql,@params,@valor_bus=@valor_bus,@numeroPaginaActual=@numeroPaginaActual,
						@cantidadMostrar=@cantidadMostrar
end
/*
sp_listado_permisos '','e.nombreEmpleado',0,5
*/
GO
/****** Object:  StoredProcedure [dbo].[sp_listado_tipoPermiso]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_listado_tipoPermiso]
	@valor_bus nvarchar(max),
	@parametro_bus nvarchar(max)= '',
	@numeropaginaactual integer=0,
	@cantidadmostrar integer=0
as
begin
	declare	@sql nvarchar(max);
	declare	@params nvarchar(max);
	set @params = '@valor_bus varchar(max),
					@numeropaginaactual integer,
					@cantidadmostrar integer'

	set @sql = 'SELECT 
					id,
					descripcion,
					count(*) over() total
				FROM tipoPermiso'
	set @sql+= ' WHERE upper('+@parametro_bus+') like ''%''+upper(@valor_bus)+''%''';
	set @sql+=' order by id ASC';
	set @sql+=' OFFSET @cantidadMostrar*@numeroPaginaActual ROWS';
	set @sql+=' FETCH NEXT @cantidadMostrar ROWS ONLY';
	
	exec sp_executesql @sql,@params,@valor_bus=@valor_bus,@numeroPaginaActual=@numeroPaginaActual,
						@cantidadMostrar=@cantidadMostrar
end
/*
sp_listado_tipoPermiso '','descripcion',0,5
*/
GO
/****** Object:  StoredProcedure [dbo].[sp_listadoEmpleadoCantidadPermiso]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_listadoEmpleadoCantidadPermiso]
	@idEmpleado int,
	@fechaInicio datetime,
	@fechaFin datetime
AS
BEGIN
	with
	tbl as(
		select emp.nombreEmpleado, emp.apellidosEmpleado,
		(
			select COUNT(idEmpleado) from Permisos
			where idEmpleado=emp.id and
			(@fechaInicio <= fechaHoraFinPermiso) and (@fechaFin >=fechaHoraInicioPermiso)
		)CantPermiso
		from Empleado emp where (@idEmpleado=0 or id=@idEmpleado)
	)
	select nombreEmpleado, apellidosEmpleado, cantPermiso, count(*)over() total
	from tbl order by CantPermiso DESC,apellidosEmpleado DESC, nombreEmpleado DESC
END
/*
sp_listadoEmpleadoCantidadPermiso 0,'01/06/2022 08:00:00','10/06/2022 12:00:00'
*/
GO
/****** Object:  StoredProcedure [dbo].[sp_traerEmpleado_X_id]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_traerEmpleado_X_id]
	@id int
AS
BEGIN
	select 
		id,
		nombreEmpleado,
		apellidosEmpleado,
		fechaNacimiento,
		fechaIngreso
	from Empleado where id=@id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_traerPermiso_X_id]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_traerPermiso_X_id]
	@id int
AS
BEGIN
	select 
		id,
		idEmpleado,
		idTipoPermiso,
		fechaHoraInicioPermiso,
		fechaHoraFinPermiso,
		descripcion
	from Permisos where id=@id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_traerTipoPermiso_X_id]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_traerTipoPermiso_X_id]
	@id int
AS
BEGIN
	select 
		id,
		descripcion
	from TipoPermiso where id=@id
END
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Empleado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombreEmpleado] [varchar](50) NOT NULL,
	[apellidosEmpleado] [varchar](100) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[fechaIngreso] [date] NOT NULL,
 CONSTRAINT [PK_Empleado] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Permisos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idEmpleado] [int] NOT NULL,
	[idTipoPermiso] [int] NOT NULL,
	[fechaHoraInicioPermiso] [datetime] NOT NULL,
	[fechaHoraFinPermiso] [datetime] NOT NULL,
	[descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_Permisos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TipoPermiso]    Script Date: 8/6/2022 13:37:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TipoPermiso](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
 CONSTRAINT [PK_TipoPermiso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_TipoPermiso] UNIQUE NONCLUSTERED 
(
	[descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD  CONSTRAINT [FK_Permisos_Empleado] FOREIGN KEY([idEmpleado])
REFERENCES [dbo].[Empleado] ([id])
GO
ALTER TABLE [dbo].[Permisos] CHECK CONSTRAINT [FK_Permisos_Empleado]
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD  CONSTRAINT [FK_Permisos_TipoPermisos] FOREIGN KEY([idTipoPermiso])
REFERENCES [dbo].[TipoPermiso] ([id])
GO
ALTER TABLE [dbo].[Permisos] CHECK CONSTRAINT [FK_Permisos_TipoPermisos]
GO
USE [master]
GO
ALTER DATABASE [DB_permiso] SET  READ_WRITE 
GO
