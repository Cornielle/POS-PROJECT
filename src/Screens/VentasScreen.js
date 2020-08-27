import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton,DataTable  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView, Modal ,ToastAndroid, Platform} from 'react-native';
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class VentasScreen extends React.Component{

constructor(props){
super(props)
this.state = { 
    ModalProductVisibility:false,
    ModalpayVisiblity:false,
    VetasEfectivo:0,
    VentasTarjetas:0,
    TotalAPagar:0
};

}
pagar =() =>{
this.setState({ModalpayVisiblity:true})
}
     
 OpenVentasModal = () =>{
this.setState({ModalProductVisibility:true})
 }
CallRow= () =>{

Alert.alert("clicked");

}
render(){
    return (
        <ScrollView>
    {

    }
<Modal visible={this.state.ModalProductVisibility}>
    <View style={styles.ModalContainer}>
    </View>
</Modal>

<Modal visible={this.state.ModalpayVisiblity}>
    <View style={styles.ModalContainer}>
    <TextInput
        style={styles.Input,{width:230}}
        mode='flat'
        label='Monto Efectivo'
        value={this.state.VetasEfectivo}
        onChangeText={(VetasEfectivo)=> this.setState({VetasEfectivo})}
    />
    <TextInput
        style={styles.Input,{width:230}}
        mode='flat'
        label='Monto Tarjeta'
        value={this.state.VentasTarjetas}
        onChangeText={(VentasTarjetas)=> this.setState({VentasTarjetas})}
    />
    <Text>Monto Pagado:{this.state.TotalAPagar}</Text>
    <Text>Ttbis:{this.state.TotalAPagar}</Text>
    <Text>Monto Neto</Text>
    <Text>Total A pagar</Text>

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
    /> 
    <Text>{"  "}</Text>   
        Imprimir Prefactura
    </Button>

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
        /> 
        <Text>{"  "}</Text>   
        Pagar Cuenta
    </Button>
    </View>
</Modal>

        <View style={styles.ViewStyle}>
            {/*Header generico que debe ser reutilizado en casi todas las vistas */}
            <Header name={'Ventas'} 
                    subtitle={'Modulo de ventas'}
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

<TextInput
    style={styles.Input}
    mode='flat'
    label='Codigo / Articulo'
    // value={this.state.CORREO}
    //onChangeText={(CORREO) => this.setState({ CORREO })}
/>
<Text>{"\n"}</Text>

<DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title numeric>Cant.</DataTable.Title>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell>Action</DataTable.Cell>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>23700000</DataTable.Cell>
          <DataTable.Cell numeric>8.000000</DataTable.Cell>
          <DataTable.Cell numeric>8.000000</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-2 of 6"
        />
      </DataTable>
      <Text>{"\n"}</Text>
                    <Card.Content>
                        <Text>{"\n"}</Text>
                      
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
                        <Text>{"\n"}</Text>
                      
                      <Button
                          labelStyle={styles.Button} 
                          mode="contained" 
                          onPress={this.pagar}
                      >
                          <Icon 
                              name="save" 
                              size={15} 
                              color="#ffffff" 
                              style={styles.Icon}
                          /> <Text>{"  "}</Text>   
                          Pagar
                      </Button>
                    </Card.Content>
                 

                </Card>
            </View>
       
        </View>
   
        </ScrollView>

    );
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
    },
    ModalContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#E8B8A7",
   
                        
                        
                        
                        },
})
