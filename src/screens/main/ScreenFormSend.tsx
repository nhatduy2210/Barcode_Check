import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  barcode: string;
  quantity: number;
  note: string;
  showNote?: boolean; // Optional property to manage whether the note input is visible
}

interface ScreenFormSendProps {
  route: { params: { selectedItems: Product[] } };
}

const ScreenFormSend: React.FC<ScreenFormSendProps> = ({ route }) => {
  const { selectedItems } = route.params;

  const [productList, setProductList] = useState<Product[]>([
    { id: 1, name: 'Product 1', barcode: '12345', quantity: 0, note: '' },
    { id: 2, name: 'Product 2', barcode: '67890', quantity: 0, note: '' },
    { id: 3, name: 'Product 3', barcode: '54321', quantity: 0, note: '' },
    { id: 4, name: 'Product 4', barcode: '09876', quantity: 0, note: '' },
    { id: 5, name: 'Product 5', barcode: '13579', quantity: 0, note: '' },
  ]);

  useEffect(() => {
    // Update productList when selectedItems change
    setProductList(selectedItems);
  }, [selectedItems]);

  const getTotalQuantity = () => {
    return productList.reduce((total, product) => total + product.quantity, 0);
  };

  const renderProductItem = ({ item, index }: { item: Product; index: number }) => (
    <View style={[styles.productItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }]}>
      <Text style={styles.productInfo}>{`ID: ${item.id}`}</Text>
      <Text style={styles.productInfo}>{`Name: ${item.name}`}</Text>
      <Text style={styles.productInfo}>{`Barcode: ${item.barcode}`}</Text>
      <Text style={styles.productInfo}>{`Quantity: ${item.quantity}`}</Text>
      <TouchableOpacity onPress={() => handleNoteButtonPress(item)}>
        <Text style={styles.noteButton}>Note</Text>
      </TouchableOpacity>
      {item.showNote && (
        <View style={styles.noteContainer}>
          <TextInput
            placeholder="Enter your note"
            value={item.note}
            onChangeText={(text) => handleNoteChange(item, text)}
            style={styles.noteInput}
          />
          <TouchableOpacity onPress={() => handleSaveNoteButtonPress(item)}>
            <Text style={styles.saveNoteButton}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.note !== '' && (
        <Text style={styles.savedNote}>{`Saved Note: ${item.note}`}</Text>
      )}
      <TouchableOpacity onPress={() => handleDeleteButtonPress(index)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleNoteButtonPress = (item: Product) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === item.id ? { ...product, showNote: !product.showNote } : product
      )
    );
  };

  const handleNoteChange = (item: Product, text: string) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === item.id ? { ...product, note: text } : product
      )
    );
  };

  const handleSaveNoteButtonPress = (item: Product) => {
    // Handle saving the note (e.g., send to server, update local storage, etc.)
    console.log(`Saving note for product ${item.id}: ${item.note}`);

    // Hide the note input after saving
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === item.id ? { ...product, showNote: false } : product
      )
    );
  };

  const handleDeleteButtonPress = (index: number) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setProductList((prevList) => {
              const newList = [...prevList];
              newList.splice(index, 1);
              return newList;
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleSaveButtonPress = () => {
    // Handle saving the entire form (e.g., send to server, update local storage, etc.)
    console.log('Saving form');
  };

  const handleSubmitButtonPress = () => {
    Alert.alert(
      'Submit Form',
      'Are you sure you want to submit the form?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            // Handle form submission (e.g., send to server)
            console.log('Form submitted');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black' }}>{`Nhận được ${selectedItems.length} sản phẩm đã chọn.`}</Text>
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />

      <View style={styles.footer}>
        <Text style={styles.totalQuantity}>{`Total Items: ${productList.length}`}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmitButtonPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 8,
  },
  productInfo: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  noteButton: {
    color: '#3498db',
    marginTop: 8,
    fontSize: 16,
  },
  noteContainer: {
    marginTop: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  saveNoteButton: {
    color: '#2ecc71',
    fontSize: 16,
    marginTop: 8,
  },
  savedNote: {
    fontSize: 16,
    color: '#2ecc71',
    marginTop: 8,
  },
  deleteButton: {
    color: '#e74c3c',
    marginTop: 8,
    fontSize: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalQuantity: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScreenFormSend;
