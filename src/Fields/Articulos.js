import React from 'react'
import{TextInput, Avatar, Button, Card} from 'react-native-paper'
import { ButtonGroup } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker,
  Alert,
  ToastAndroid,
  Dimensions,
  KeyboardAvoidingView, 
  Image
} from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import  SQLite  from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
const InitialState ={
    Proveedores:[],

    Codigo: "",
    Descripcion:"",
    Abreviatura: "",
    NombreArticulo: "",
    CodigoDeBarra:"",
    PrecioCosto:"",
    PrecioVenta:"",
    CatidadExistencia:"",
    MedidaDeVenta:"1",
    Categorias:[],
    selectedIndex:1

}
export default class Articulo extends React.Component{

constructor(props){

    super(props)
    this.state={
      Proveedores:[],
      Codigo: "",
      CategoriaId: 0,
      Abreviatura: "",
      NombreArticulo: "",
      CodigoDeBarra:"",
      PrecioCosto:"",
      PrecioVenta:"",
      ProveedoresId:"",
      CatidadExistencia:"",
      MedidaDeVenta:"",
      Categorias:[],
      error:false,
      avatarSource:'',
      value:'',
      selectedIndex:1,
      showAvatar:''
      }
      this.updateIndex = this.updateIndex.bind(this)
}

//state={
//Proveedores:[],

//Codigo: "",
//CategoriaId: 0,
//Abreviatura: "",
//NombreArticulo: "",
//CodigoDeBarra:"",
//PrecioCosto:"",
//PrecioVenta:"",
//ProveedoresId:"",
//CatidadExistencia:"",
//MedidaDeVenta:"",
//Categorias:[],
//}



LoadData = async () =>{
    let ProveedoresCollection=[];
    let CategoriasCollection=[];
    let  ArticulosCollection=[];
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => { SQLite.openDatabase(database_name,database_version,database_displayname,database_size).then(DB => {
            db = DB;console.log("Database OPEN");
                  db.executeSql("SELECT rowid,NombreProveedor FROM Proveedores WHERE Activo =? ORDER BY rowid ASC"
                  ,[1]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        ProveedoresCollection.push(row);
      }
    this.setState({Proveedores:ProveedoresCollection})
    ProveedoresCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });
                  db.executeSql("SELECT * FROM Articulos"
                  ,[]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
                      console.log("Query completed");
                      var len = Results[0].rows.length;
                      for (let i = 0; i < len; i++) {
                        let row = Results[0].rows.item(i);
                        ArticulosCollection.push(row);
                      }
                    console.log(ArticulosCollection)
                    this.setState({Roles:ArticulosCollection})
                    ArticulosCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });
                  db.executeSql("SELECT * FROM Categorias WHERE Activo =? ORDER BY rowid ASC"
                  ,[1]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        CategoriasCollection.push(row);
      }
    console.log(CategoriasCollection)
    this.setState({Categorias:CategoriasCollection})
    CategoriasCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });
                  resolve(db);
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
  updateIndex(selectedIndex) {
    this.setState({
      selectedIndex
    })
}
CallAlerts =(DataToDetalle) =>{
  console.log("")
  console.log("")
  console.log("/****************************************************************************/");
  console.log("")
  console.log("")
  let dba;
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
            dba = DB;
            console.log("Database OPEN"); 
            console.log("dont know"); 
            dba.executeSql('INSERT INTO AlmacenDetalle(AlmacenId,CantidadIngreso,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,'+
            'UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?)',[DataToDetalle.AlmacId,DataToDetalle.CatidadExistencia,DataToDetalle,DataToDetalle.Activo,DataToDetalle.IdEmpresa,DataToDetalle.IdSucursal,
              DataToDetalle.FechaCreacion,DataToDetalle.FechaModificacion,DataToDetalle.UsuarioCreacion,DataToDetalle.UsuarioModificacion]).then((result) => {
              console.log("Database is ready ... executing query ...");
              ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
            }).catch((error) =>{
            console.log(error)
            });
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
loadTable = async () => {
    this.LoadData();
}
SaveArticulos(Model) {
    console.log("")
    console.log("")
    console.log("/****************************************************************************/");
    console.log("")
    console.log("")
    var fecha = new Date();
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
db.executeSql("INSERT INTO Articulos(Codigo,CategoriaId,Descripcion,Abreviatura,NombreArticulo,CodigoDeBarra,PrecioCosto,PrecioVenta,ProveedoresId,MedidaDeVenta,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,UsuarioModificacion, Img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              ,[Model.Codigo,Model.CategoriaId,Model.Descripcion,Model.Abreviatura,Model.NombreArticulo,
                Model.CodigoDeBarra,Model.PrecioCosto,Model.PrecioVenta,Model.ProveedoresId,Model.MedidaDeVenta,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion,JSON.stringify(Model.Img)]).then((result) => {
                  console.log("Database is ready ... executing query ...");
              const ArtId=  result[0].insertId;
              console.log("Id articulo",ArtId )
console.log("Articulo Inserto Correctamente")
const fecha = new Date();
db.executeSql('INSERT INTO Almacen(ArticuloId,Activo,'+
'CantidadActual,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,'+
 'UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?)',[ArtId,1,Model.CatidadExistencia,
  Model.IdEmpresa, Model.IdSucursal,fecha.toString(),Model.FechaModificacion,Model.UsuarioCreacion,
  Model.UsuarioModificacion])
  .then((AlmacenResult)=>{
  const AlmacId=  AlmacenResult[0].insertId;
  console.log("Id almacen",AlmacId ) 
  console.log("Almacen Inserto Correctamente");
  this.props.toggleForm(false)

db.executeSql('INSERT INTO AlmacenDetalle(AlmacenId,'+
'CantidadIngreso ,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,'+
 'UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?)',[ArtId,Model.CatidadExistencia,Model.IdEmpresa, Model.IdSucursal,
  fecha.toString(),Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then((AlmacenResult)=>{
    console.log("AlmacenDetalle Inserto Correctamente")
    ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
    this.props.toggleForm(false)
  }).catch((errorStock)=>{
    console.log(errorStock)
  });
 }).catch((error) =>{
    console.log(error)
 });


/*
db.executeSql("SELECT * FROM Articulos").then((resulst) =>{

console.log(resulst);


  console.log("Query completed");
  var len = resulst[0].rows.length;
  console.log(len)
  for (let i = 0; i < len; i++) {
    let row = resulst[0].rows.item(i);
    console.log(row)
  }


})
*/

}).catch((error) =>{
console.log(error)
});
          
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });
  };


  componentDidMount(){   

this.loadTable()

    /*

const sql1 =  'SELECT name FROM sqlite_master WHERE type = "table"'
const params1 = []
const databaseLayer1 = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer1.executeSql(sql1,params1).then(  ({ rows }) => {

console.log(rows); 
} )

*/
}

render(){
    const buttons = ['Galería', 'Cámara']
    const {name, subtitle, navigation} = this.props
    const { selectedIndex } =  this.state
    {
  
return(
<ScrollView>
<View style={styles.ViewStyle}>
{/*Header generico que debe ser reutilizado en casi todas las vistas */}
<Header 
    name={'Control de Artículos'} 
    goBackEnabled={true}
    goBackNavigationName={'Grid'}
    navigationEnabled={false}
    navigation={this.props.navigationValue}
    toggleFormHeader={this.props.toggleForm}
    gridHeader={false}
/>
<View style={styles.Form}>
<KeyboardAvoidingView>
<Card>


<Card.Title 
style={styles.Card}
title="Artículos" 
subtitle="Registro de un Artículo" 
left={(props) => <Avatar.Icon {...props} 
icon="basket" />} 
/>

<Card.Content>


 <TextInput 
style={styles.Input}
model='flat'
label='Abreviatura'
value={this.state.Abreviatura}
onChangeText={(Abreviatura) => this.setState({Abreviatura:Abreviatura})}


 />

 <TextInput 
style={styles.Input}
model='flat'
label='Nombre del Artículo'
value={this.state.NombreArticulo}
onChangeText ={(NombreArticulo)=>this.setState({NombreArticulo:NombreArticulo})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Codigo de barra'
keyboardType="numeric"
value={this.state.CodigoDeBarra}
onChangeText={(CodigoDeBarra)=>this.setState({CodigoDeBarra:CodigoDeBarra})}

 />
 
 <TextInput 
style={styles.Input}
model='flat'
label='Precio de Costo'
keyboardType="numeric"
value={this.state.PrecioCosto}
onChangeText={(PrecioCosto) => this.setState({PrecioCosto:PrecioCosto})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Precio De Venta'
keyboardType="numeric"
value={this.state.PrecioVenta}
onChangeText={(PrecioVenta) => this.setState({PrecioVenta:PrecioVenta})}
/>
<TextInput 
style={styles.Input}
model='flat'
label='Cantidad inicial en Existencia'
keyboardType="numeric"CatidadExistencia
value={this.state.CatidadExistencia}
onChangeText={(CatidadExistencia) => this.setState({CatidadExistencia:CatidadExistencia})}
/>
<Text>{"\n"}</Text>
<Text style={{fontSize:16, fontWeight:'bold'}}>Agregar imagen del artículo</Text>
{/* <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40}}
    /> */}
    <View>
      <Button
        icon="camera" 
        mode="outlined" 
        onPress={this.launchCamera}
        style={{width:windowWidth * 0.28 ,padding:5, marginTop:15}}
      >
        Cámara
      </Button>
      <Button
        icon="image" 
        mode="outlined" 
        onPress={this.selectImage}
        style={{width:windowWidth * 0.28 ,padding:5, marginTop:15}}
      >
        Cargar
      </Button>
    </View>
    <Image
        style={this.state.showAvatar!== '' ? styles.logo : ''}
        source={this.state.showAvatar}
      />
<Text>Seleccionar una Categoria:</Text>
<Picker
    selectedValue={this.state.CategoriaId}
    style={{height: 50, width: 200}}
    onValueChange={(itemValue, itemIndex) =>
        this.setState({CategoriaId: itemValue})
    }>
  {

this.state.Categorias.map(cat =>
    (<Picker.Item label={cat.NombreCategoria.toString()} 
                  value={cat.rowid.toString()}  
                  key={cat.rowid.toString()} />
    )
  )
}
</Picker>

<Text>Seleccionar una Proveedor:</Text>
                            <Picker
                                selectedValue={this.state.ProveedoresId}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ProveedoresId: itemValue})
                                }>
                                   {

this.state.Proveedores.map(prob =>(
    <Picker.Item label={prob.NombreProveedor.toString()} value={prob.rowid}  key={prob.rowid} />
    ))
                                   }
                            </Picker>
 

                            <Text>Seleccionar medida :</Text>
                            <Picker
                                selectedValue={this.state.MedidaDeVenta}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({MedidaDeVenta: itemValue})
                                }>
                    <Picker.Item label="Unidad" value="1" />
                    <Picker.Item label="Libra" value="2" />
                    <Picker.Item label="Docena" value="3" />
                    <Picker.Item label="Libra" value="4" />
                </Picker>
                <Button
                    labelStyle={styles.Button} 
                    icon="folder" 
                    mode="contained" 
                    onPress={this.GuardarArticulo}
                >
                    Guardar
                </Button>
            </Card.Content>
        </Card>
        </KeyboardAvoidingView>
    </View>
</View>
</ScrollView>
)
    }
}


selectImage = async (id) => {
  const options = {
    title: 'Agregar Imagen',
    chooseFromLibraryButtonTitle:'Selecciona una foto de la Libreria',
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: 'file://'+response.path };
      const sourceShow = { uri: response.uri };
      this.setState({ 
        avatarSource: source,
        showAvatar:sourceShow
      });
      console.log(this.state.avatarSource,'here')
    }
  });
}

launchCamera = async (id) => {
  const options = {
    title: 'Agregar Imagen',
    chooseFromLibraryButtonTitle:'Selecciona una foto de la Libreria',
  };
  ImagePicker.launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: 'file://'+response.path };
      const sourceShow = { uri: response.uri };
      this.setState({ 
        avatarSource: source,
        showAvatar:sourceShow
      });
      console.log(this.state.avatarSource,'here')
    }
  });
}

catchErrors = (field) =>{
  Alert.alert('Campos faltantes',`${field}`);
  this.setState({error: true});
  return
}
Validaciones = ()=>{
  this.setState({error: true});
  console.log(this.state.error,'TRUE')
    try{
            if(this.state.CategoriaId === ""){  
              this.catchErrors('Categoria')
              return
            }
            if(this.state.NombreArticulo === ""){
              this.catchErrors('Nombre')
              return
            }
            if(this.state.Abreviatura === ""){
              this.catchErrors('Abreviatura')
              return
            }
            if(this.state.PrecioCosto === ""){
              this.catchErrors('Precio de Costo')
              return
            }
            if(this.state.PrecioVenta === ""){
              this.catchErrors('Precio de Venta')
              return
            }
    }catch(e){
      Alert.alert("Ha ocurrido un error:"+ e);
    }    
    return;
}
GuardarArticulo = () =>{
  if(this.state.CategoriaId === ""){  
    this.catchErrors('Categoria')
    return
  }
  if(this.state.NombreArticulo === ""){
    this.catchErrors('Nombre')
    return
  }
  if(this.state.Abreviatura === ""){
    this.catchErrors('Abreviatura')
    return
  }
  if(this.state.PrecioCosto === ""){
    this.catchErrors('Precio de Costo')
    return
  }
  if(this.state.PrecioVenta === ""){
    this.catchErrors('Precio de Venta')
    return
  } else {
  try  {
  const fecha = new Date();
      const Model ={
          Codigo: null,
          CategoriaId: this.state.CategoriaId,
          Abreviatura: this.state.Abreviatura,
          NombreArticulo: this.state.NombreArticulo,
          CodigoDeBarra: this.state.CodigoDeBarra,
          PrecioCosto: this.state.PrecioCosto,
          CatidadExistencia: this.state.CatidadExistencia,
          PrecioVenta:this.state.PrecioVenta,
          ProveedoresId:this.state.ProveedoresId,
          MedidaDeVenta:this.state.MedidaDeVenta,
          Activo:1,
          Descripcion:'',
          Img:this.state.avatarSource,
          IdEmpresa:1,
          IdSucursal:1,
          FechaCreacion: fecha.toString(),
          FechaModificacion:null,
          UsuarioCreacion:"system",
          UsuarioModificacion:null
      };
  this.SaveArticulos(Model);
  this.setState(InitialState)
  }catch(ex){
        console.log(ex)
      }
    }
  }
}
const styles = StyleSheet.create({
    ViewStyle:{
        backgroundColor:"#f6f6f6",
    },
    logo:{
      width:100,
      height:100,
    },
    Form: {
        padding:normalize(15),
        marginBottom:10,
    },
    Input: {
        color: '#161924',
        fontSize: 14,
        fontWeight:"200",
        backgroundColor:'#FFFFFF',
    },
    Button:{
        color:'#ffffff',
    }
})