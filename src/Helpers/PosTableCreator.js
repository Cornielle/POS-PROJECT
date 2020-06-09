import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
//var db = openDatabase({ nam


export default function PosTableCreator(){
console.log("me llamaron");
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,       
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
/*
              db.executeSql('DROP TABLE Categorias',[]).then(() => {
                  console.log("LA TABLA ROLES HA SIDO CREADA SATISFACTORIAMENTE");
              }).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABAL ROLES");    });
              */

db.executeSql('CREATE TABLE IF NOT EXISTS Roles(rowid integer primary key, NombreRol '+
'VARCHAR(500) NOT NULL, Descripcion VARCHAR(5000), Activo INTEGER NOT NULL ,  IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER,  FechaCreacion VARCHAR(150) NOT NULL'
+',FechaModificacion VARCHAR(150), UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))',[]).then(() => {
    console.log("LA TABLA ROLES HA SIDO CREADA SATISFACTORIAMENTE");
}).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABLA ROLES");    });
/*************************************************************************************************/  


db.executeSql('CREATE TABLE IF NOT EXISTS Empleados(rowid integer primary key,NombrePersona VARCHAR(500) NOT NULL, ApellidoPersona VARCHAR(500) NOT NULL'+
', NombreUsuario VARCHAR(500), Telefono VARCHAR(100), TipoIdentificacion VARCHAR(30), Identificacion VARCHAR(50),'+
'Rol VARCHAR(500), Pin VARCHAR(30) NOT NULL '
+', Activo INTEGER NOT NULL , IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER, FechaCreacion VARCHAR(150) NOT NULL ,FechaModificacion VARCHAR(150)'+
', UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))',[]).then(() => {
    console.log("LA TABLA Empleados HA SIDO CREADA SATISFACTORIAMENTE");
}).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABLA Empleados");    });
/*************************************************************************************************/  

db.executeSql('CREATE TABLE IF NOT EXISTS Proveedores(rowid integer primary key,EsPersonaFisica VARCHAR(500) NOT NULL, NombreProveedor VARCHAR(500) NOT NULL'+
', RNC VARCHAR(500), Direccion VARCHAR(5000), Telefono VARCHAR(30), Correo VARCHAR(50)'
+', Activo INTEGER NOT NULL , IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER, FechaCreacion VARCHAR(150) NOT NULL ,FechaModificacion VARCHAR(150)'+
', UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))',[]).then(() => {
    console.log("LA TABLA Proveedores HA SIDO CREADA SATISFACTORIAMENTE");
}).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABLA Proveedores");    });
/*************************************************************************************************/  

db.executeSql('CREATE TABLE IF NOT EXISTS Categorias(rowid integer primary key,NombreCategoria VARCHAR(1000) NOT NULL, Descripcion VARCHAR(3000) NOT NULL'+
', Activo INTEGER NOT NULL , IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER, FechaCreacion VARCHAR(150) NOT NULL ,FechaModificacion VARCHAR(150)'+
', UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))',[]).then(() => {
    console.log("LA TABLA Categorias HA SIDO CREADA SATISFACTORIAMENTE");
}).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABLA Categorias");    });
/*************************************************************************************************/  


db.executeSql('CREATE TABLE IF NOT EXISTS Articulos(rowid integer primary key,Codigo VARCHAR(300), CategoriaId INTEGER NOT NULL,'+
'DescripcionPantalla VARCHAR(1000) , NombreArticulo VARCHAR(1000) NOT NULL, CodigoDeBarra VARCHAR(100),'+
'PrecioCosto REAL NOT NULL, PrecioVenta REAL NOT NULL, ProveedoresId INTEGER, MedidaDeVenta VARCHAR(1000) NOT NULL'+
', Activo INTEGER NOT NULL , IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER, FechaCreacion VARCHAR(150) NOT NULL ,FechaModificacion VARCHAR(150)'+
', UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))',[]).then(() => {
    console.log("LA TABLA Articulos HA SIDO CREADA SATISFACTORIAMENTE");
}).catch((error) =>{      console.log("ERROR A LA HORA DE CREAR LA TABLA Articulos");    });
/*************************************************************************************************/  
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });




}

