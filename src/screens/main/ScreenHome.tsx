// ScreenHome.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, ScrollView, FlatList, Alert, StyleSheet } from 'react-native';
import Container from '@/components/Container';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps,RootNavigation } from '@/navigators/RootNavigation';

const ScreenHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<any[]>([
    { id: 1, name: 'Item 1', barcode: '' },
    { id: 2, name: 'Item 2', barcode: '' },
    { id: 3, name: 'Item 3', barcode: '' },
    { id: 4, name: 'Item 4', barcode: '' },
    { id: 5, name: 'Item 5', barcode: '' },
    { id: 6, name: 'Item 6', barcode: '' },
    { id: 7, name: 'Item 7', barcode: '' },
    { id: 8, name: 'Item 8', barcode: '' },
    { id: 9, name: 'Item 9', barcode: '' },
    { id: 10, name: 'Item 10', barcode: '' },
    // Add more data as needed
  ]);

  const navigation = useNavigation<RootStackNavigationProps<'Home'>>();

  const renderListItem = ({ item }: { item: { id: number; name: string; barcode: string } }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{`ID: ${item.id}, Name: ${item.name}, Barcode: ${item.barcode || 'N/A'}`}</Text>

      {/* Thêm nút "Add Barcode" cho mỗi item */}
      <TouchableOpacity
        onPress={() => {
          // Hiển thị thông báo xác nhận
          Alert.alert(
            'Confirmation',
            'Do you want to add a barcode?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  // Điều hướng đến màn hình Scanner khi nhấn nút "OK"
                  navigation.navigate('Scanner');
                },
              },
            ],
            { cancelable: false }
          );
        }}
        style={styles.addButton}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Barcode</Text>
      </TouchableOpacity>
    </View>
  );
// Hàm này sẽ được gọi khi quét thành công từ màn hình Scanner
const handleBarcodeScanned = (itemId: number, scannedBarcode: string) => {
  const updatedData = data.map((item) =>
    item.id === itemId ? { ...item, barcode: scannedBarcode } : item
  );

  setData(updatedData);
};
  return (
    <View style={styles.container}>
      <TouchableOpacity
              onPress={() => RootNavigation.navigate('Scanner', {})}
            >
              <Text className="text-xl underline text-primary text-center my-6">
                Back to Scanner 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => RootNavigation.navigate('BarcodeDetail', {})}
            >
              <Text className="text-xl underline text-primary text-center my-6">
                Back to List
              </Text>
            </TouchableOpacity>
      <TextInput
        placeholder="Search by Name"
        style={styles.searchInput}
        onChangeText={(text) => setSearchTerm(text)}
      />

      <FlatList
        data={data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemText: {
    flex: 1,
    color: 'black', // Màu chữ đen
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default ScreenHome;
