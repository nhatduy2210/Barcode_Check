import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import BarcodeSVG from 'react-native-barcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '@/components/Container';
import { RootNavigation } from '@/navigators/RootNavigation';
import { useNavigation } from '@react-navigation/native';

interface ScreenBarcodeDetailPropsType {
  route: { params: { barcode: string } };
}

interface BarcodeDetail {
  barcode: string;
  imageUri?: string;
  index?: string | number | never;
}

const ScreenBarcodeDetail = (props: ScreenBarcodeDetailPropsType) => {
  const { barcode } = props.route.params;
  const [selectedBarcode, setSelectedBarcode] = useState<BarcodeDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);


  const [data, setData] = useState<any[]>([
    { id: 1, name: 'Product 1', barcode: 'trống', quantity: 0, note: '' },
    { id: 2, name: 'Product 2', barcode: 'trống', quantity: 0, note: '' },
    { id: 3, name: 'Product 3', barcode: 'trống', quantity: 0, note: '' },
    { id: 4, name: 'Product 4', barcode: 'trống', quantity: 0, note: '' },
    { id: 5, name: 'Product 5', barcode: 'trống', quantity: 0, note: '' },
  ]);

  const navigation = useNavigation();

  const renderListItem = ({ item, index }: { item: { id: number; name: string; barcode: string, isChecked: boolean }; index: number }) => (
    <View style={[styles.listItem, item.isChecked && styles.checkedItem]}>
      <Text style={styles.listItemText}>{`ID: ${item.id}, Tên: ${item.name}, Mã vạch: ${item.barcode || 'N/A'}`}</Text>
      <TouchableOpacity
        onPress={() => {
          const updatedData = [...data];
          updatedData[index].barcode = barcode; // Cập nhật barcode vào mục được chọn
          
          setData(updatedData);
          handleSaveToAsyncStorage(updatedData); // Lưu trữ vào AsyncStorage
          setSelectedBarcode({ ...item, index });
          navigation.navigate('Scanner');
        }}
        style={[styles.addButton, item.isChecked && styles.checkedButton]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Thêm Mã</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleCheckItem(index)}
        style={[styles.checkButton, item.isChecked && styles.checkedButton]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.isChecked ? 'Uncheck' : 'Check'}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckItem = (index: number) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));

    setCheckedItemsCount((prevCheckedItems) => (data[index].isChecked ? prevCheckedItems + 1 : prevCheckedItems - 1));
    const updatedData = [...data];
    updatedData[index].isChecked = !updatedData[index].isChecked;
    if (selectedItemIndex !== null) {
      // Giữ nguyên mã vạch đã được cập nhật trước đó khi chọn item để quét
      updatedData[index].barcode = updatedData[selectedItemIndex].barcode;
    }
    setData(updatedData);
   
  };

  const handleSaveToAsyncStorage = async (updatedData: any[]) => {
    try {
      const barcodeList = updatedData.map((item) => item.barcode);
      await AsyncStorage.setItem('barcodeList', JSON.stringify(barcodeList));
    } catch (e) {
      console.error('Lỗi lưu trữ vào AsyncStorage:', e);
    }
  };

  useEffect(() => {
    // Cập nhật checkedItems mỗi khi data thay đổi
    const checkedItemsCount = data.filter((item) => item.isChecked).length;
    setSelectedBarcode(null);
  }, [data]);

  const handleGoToHome = () => {
    RootNavigation.reset('Main', {});
  };

  // Hàm xử lý khi nhấn nút "Send"
  const handleSendItems = () => {
    // Lọc ra các sản phẩm đã được chọn
    const selectedItems = data.filter((item) => item.isChecked);
    RootNavigation.navigate('ScreenFormSend', { selectedItems });
  };

  useEffect(() => {
    const updateBarcodeList = async () => {
      try {
        if (barcode !== null && selectedItemIndex !== null) {
          const updatedData = [...data];
          updatedData[selectedItemIndex].barcode = barcode;
          setData(updatedData);
          handleSaveToAsyncStorage(updatedData);
          setSelectedItemIndex(null);
        }
      } catch (e) {
        console.error('Lỗi cập nhật mã vạch trong mục data:', e);
      }
    };

    updateBarcodeList();
  }, [barcode, selectedItemIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <View style={styles.barcodeContainer}>
          <BarcodeSVG value={barcode} maxWidth={360} format="CODE128" />
          <Text style={styles.barcodeText} numberOfLines={1}>
            {barcode}
          </Text>
        </View>
        <TouchableOpacity onPress={handleGoToHome}>
          <Text style={styles.linkText}>Đi đến Màn hình Chính</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => RootNavigation.navigate('ScreenFormSend', {})}>
          <Text style={styles.linkText}>Check form</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Tìm kiếm theo Tên"
          placeholderTextColor="black"
          style={styles.searchInput}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <FlatList
          data={data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderListItem}
        />

        <View style={styles.summaryContainer}>
          <Text>{`Tổng số sản phẩm: ${data.length}`}</Text>
          <Text>{`Số sản phẩm đã được check: ${checkedItemsCount}`}</Text>
        </View>
        <TouchableOpacity onPress={handleSendItems}>
          <Text style={styles.sendButton}>Send Items</Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  barcodeContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  barcodeText: {
    marginTop: 10,
    fontSize: 16,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: '#333',
  },
  linkText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#3498db',
    textAlign: 'center',
    marginTop: 5,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  listItemText: {
    flex: 1,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  checkButton: {
    backgroundColor: '#e67e22',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkedButton: {
    backgroundColor: '#27ae60',
  },
  checkedItem: {
    backgroundColor: '#27ae60',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  summaryContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ScreenBarcodeDetail;
