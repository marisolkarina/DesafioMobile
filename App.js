import React, { useState} from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer:{
    marginVertical: 40,
    marginHorizontal: 10, 
  },
  input: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    borderColor: '#2A0800',
    marginBottom: 10,
  },
  itemList: {
    fontSize: 16,
    marginHorizontal: 10,

  },
  itemContainer: {
    backgroundColor: '#F4DBD8',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  }
});

export default function App() {

  const [fruit, setFruit] = useState('');
  const [fruits, setFruits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState(null);

  const onHandleChangeText = (fruta) => {
    setFruit(fruta)
  }

  const addItem = () => {
    setFruits((prevFruits) => [
      ...prevFruits,
      { 
        id: Date.now(), 
        value: fruit
      },
    ]);
    setFruit('')
  }

  
  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedFruit(fruits.find((item) => item.id === id))
    console.warn(id);
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text>{item.value}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onHandleModal(item.id)}>
        <Text style={styles.delete}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )

  const onHandleDeleteItem = (id) => {
    setFruits(fruits.filter((item) => item.id !== id));
    setSelectedFruit(null);
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Nueva fruta'
          style={styles.input}
          placeholderTextColor='#775144'
          onChangeText={onHandleChangeText}
          value={fruit}
        />
        <Button
          title="Agregar fruta"
          color='#C09891'
          onPress={addItem}
        />
      </View>
      
      <FlatList 
        style={styles.itemList}
        data={fruits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <Modal animationType='slide' visible={modalVisible}>

        <View style={styles.modalMessageContainer}> 
          <Text>Se eliminará la siguiente fruta: </Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text>{selectedFruit?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Aceptar'
            onPress={() => onHandleDeleteItem(selectedFruit?.id)}
            color='#C09891'
          />
          <Button 
            title='Cancelar'
            onPress={() => setModalVisible(!modalVisible)}
            color='#BEA8A7'
          />
        </View>
      </Modal>

      
    </View>
  );
}
