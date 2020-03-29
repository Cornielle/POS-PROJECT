import React from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert,  ToastAndroid } from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Empleados from '../../Models/Empleados.js'
import Roles from  '../../Models/Roles'

const InitialState ={
    
    NOMBRE :"", 
    APELLIDO:"",
    NOMBREUSUARIO:"",
    TELEFONO:"",
    CONTRASENA:"",
    CONTRASENA2:"",
    TIPOIDENTIFICACION:"Cedula",
    IDENTIFICACION:"",
    CORREO:"",
    ROLL:"Camarero",
    Roles:[],
    ExistenDatos:false,
    QueDatosExisten:""

}

//import whatever from '../src'
export default class Register extends React.Component{
    constructor(props) {
         super(props);
 this.state = InitialState;
 
      }


      reset = () =>{

 this.setState(InitialState)



      }
    

    state = { 
        NOMBRE :"", 
        APELLIDO:"",
        NOMBREUSUARIO:"",
        TELEFONO:"",
        CONTRASENA:"",
        CONTRASENA2:"",
        TIPOIDENTIFICACION:"Cedula",
        IDENTIFICACION:"",
        CORREO:"",
        ROLL:"",
        Roles:[],
        ExistenDatos:false,
        QueDatosExisten:""
        };


 LoadData = async () =>{

    var options  ={

        columns:'Id,NombreRol,Comentario',
         where:{
        Id_gt:0
        },
        page:1,
        limit:100
        
        }
        
        const response  = await Roles.query(options);
        
        this.setState({Roles:response})
  
       
 }


    componentDidMount(){
        Empleados.createTable();
        this.LoadData();
    }


    render(){
        // const {name, subtitle, navigation} = this.props
        return (
      
         
            <ScrollView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Registro'} 
                        subtitle={'Crear perfil de Usuario'}
                        goBackEnabled={true}
                        goBackNavigationName={'Grid'}
                        navigationEnabled={true}
                        navigation={this.props.navigationValue}
                        toggleFormHeader={this.props.toggleForm}
                        gridHeader={false}
                    />
                <View style={styles.Form}>
                    <Card>
                        <Card.Title 
                            style={styles.Card}
                            title="POS PROJECT" 
                            subtitle="Todas las tiendas en un solo lugar" 
                            left={(props) => <Avatar.Icon {...props} 
                            icon="account" />} 
                        />


                        <Card.Content>
         
          
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombre'
                                value={this.state.NOMBRE}
                                onChangeText={(NOMBRE)=> this.setState({NOMBRE})}
                            />
                            <Text>{"\n"}</Text>                
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Apellidos'
                                value={this.state.APELLIDO}
                                onChangeText={(APELLIDO) => this.setState({ APELLIDO })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombre Usuario'
                                value={this.state.NOMBREUSUARIO}
                                onChangeText={(NOMBREUSUARIO) => this.setState({ NOMBREUSUARIO })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Telèfono'
                                keyboardType="numeric"
                                value={this.state.TELEFONO}
                                onChangeText={(TELEFONO) => this.setState({ TELEFONO })}
                            />
                            <Text>{"\n"}</Text>
                            <Block row style={{paddingLeft:normalize(10)}}>
                            <Text style={{fontWeight:'bold'}}>Tipo de Identificaciòn:      </Text>
                            <View>
                                <Text>Cedula</Text>
                                <RadioButton
                                    value="Cedula"
                                    status={this.state.TIPOIDENTIFICACION === 'Cedula' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({TIPOIDENTIFICACION: 'Cedula' }); }}
                                />
                            </View>
                            <Block row style={{paddingLeft:normalize(35)}} />
                            <View>
                                <Text>Pasaporte</Text>
                                <RadioButton
                                    value="Pasaporte"
                                    status={this.state.TIPOIDENTIFICACION === 'Pasaporte' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ TIPOIDENTIFICACION: 'Pasaporte' }); }}
                                />
                            </View>
                            </Block>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label=''
                                placeholder={'XXX-XXXXXXX-X'}
                                value={this.state.IDENTIFICACION}
                                onChangeText={IDENTIFICACION => this.setState({ IDENTIFICACION })}
                            />
                            <Block row style={{paddingBotton:normalize(15)}} />
                            <Text>{"\n"}</Text>

                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Correo'
                                value={this.state.CORREO}
                                onChangeText={(CORREO) => this.setState({ CORREO })}
                            />
                            <Text>{"\n"}</Text>

                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Contraseña'
                                value={this.state.CONTRASENA}
                                onChangeText={CONTRASENA => this.setState({ CONTRASENA })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Repetir contraseña'
                                value={this.state.CONTRASENA2}
                                onChangeText={CONTRASENA2 => this.setState({ CONTRASENA2 })}
                            />
                            <Text>{"\n"}</Text>
                            <Text>Seleccionar un rol:</Text>
                            <Picker
                                selectedValue={this.state.Roll}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({Roll: itemValue})
                                }>
                               {
                                 
                                       this.state.Roles.map(xo =>(
                                        <Picker.Item label={xo.NombreRol.toString()} value={xo.NombreRol.toString()} key={xo.Id.toString()} />
                                       
                                       )
                               
                                       )

                               }
                            </Picker>
                            <Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.GuardarEmpleado}
                            >
                                <Icon 
                                    name="save" 
                                    size={15} 
                                    color="#ffffff" 
                                    style={styles.Icon}
                                /> <Text>{"  "}</Text>   
                                Agregar
                            </Button>
                       
                        </Card.Content>
                     

                    </Card>
                </View>
           
            </View>
       
            </ScrollView>

        );
        }



 GuardarEmpleado = async ()=>{
try{

    const sql = 'SELECT * FROM Empleados where NombreUsuario =? or Identificacion =?'
    const params = [this.state.NOMBREUSUARIO, this.state.IDENTIFICACION]
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then(   ({ rows }) => {

    const cantidad = Object.keys(rows).length;
    const {} =  rows;

if(cantidad > 0){
this.setState ({ExistenDatos:true}) ;
console.log(this.state.ExistenDatos)
}
    } )

 
console.log(this.state.ExistenDatos)
if(this.state.ExistenDatos){

Alert.alert("ya existen datos");
return;
}

    
    if(this.state.NOMBRE ===""){
        Alert.alert("El campo nombre no puede estar vacio.");
        return;
        }
        
        if(this.state.APELLIDO ===""){
            Alert.alert("El campo apellido no puede estar vacio.");
            return;
        }

        if(this.state.TELEFONO ===""){
            Alert.alert("El campo Telefono no puede estar vacio.");
            return;
        }
        
        if(this.state.IDENTIFICACION===""){
       Alert.alert("El campo identificacion no puede estar vacio.");
       return;
           }

           if(this.state.CONTRASENA !== this.state.CONTRASENA2){
              
            Alert.alert("La contraseña de verificacion no coinciden");
            return;
           }

   // this.Validaciones();

const create  = Empleados.createTable();

 
 
const valInsert={

    NombrePersona:this.state.NOMBRE, 
    ApellidoPersona:this.state.APELLIDO,
    NombreUsuario: this.state.NOMBREUSUARIO,
    Telefono:this.state.TELEFONO,
    TipoIdentificacion:this.state.TIPOIDENTIFICACION,
    Identificacion:this.state.IDENTIFICACION,
    Roll:this.state.Roll,
    Correo: this.state.CORREO,
    Contrasena:this.state.CONTRASENA,
    Activo:1,
    FechaCreacion: "2020-02-02",
    FechaModificacion:null,
    UsuarioCreacion:"system",
    UsuarioModificacion:"null"
}
console.log(valInsert);

const response = await  Empleados.create(valInsert);

if (Object.keys(response).length <=0){

Alert.alert("Error al insertar en la base de datos");

}
else{

    ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
   this.reset();
}


}
catch(e){

Alert.alert("Ha ocurrido un error, favor contactar a FreddyBrian Corp: "+ e);
console.log(e)
}
}

Validaciones = ()=>{
 
    try{

             
    }

    catch(e){

        Alert.Alert("Ha ocurrido un error validanto datos: " + e)
 console.log(e);
    }

}

    }
    const styles = StyleSheet.create({
        ViewStyle:{
            backgroundColor:"#f6f6f6",
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
