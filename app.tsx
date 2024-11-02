import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { v4 as uuidv4 } from 'uuid';

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const saveProductsToStorage = async (products: Product[]) => {
    try {
      const jsonValue = JSON.stringify(products);
      await AsyncStorage.setItem('products', jsonValue);
    } catch (e) {
      console.error("Erro ao salvar os produtos", e);
    }
  };

  const loadProductsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('products');
      if (jsonValue != null) {
        setProducts(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Erro ao carregar os produtos", e);
    }
  };

  useEffect(() => {
    loadProductsFromStorage();
  }, []);

  useEffect(() => {
    saveProductsToStorage(products);
  }, [products]);

  const addProduct = (name: string, quantity: number, price: number) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, name, quantity, price } : p));
      setEditingProduct(null);
    } else {
      setProducts([...products, { id: uuidv4(), name, quantity, price }]);
    }
    setFormVisible(false);
  };

  const editProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setEditingProduct(product);
      setFormVisible(true);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const showProductList = () => {
    setListVisible(true);
  };

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <ProductForm
          onSubmit={addProduct}
          initialValues={editingProduct ? { ...editingProduct } : undefined}
        />
      ) : (
        <>
          <ProductList
            products={products}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />
          <Button title="Adicionar Produto" onPress={() => setFormVisible(true)} />
          <Button title="Ver Lista de Produtos" onPress={showProductList} />
        </>
      )}
      <Modal visible={isListVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Lista de Produtos</Text>
          <ProductList
            products={products}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />
          <TouchableOpacity onPress={() => setListVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
