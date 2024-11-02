import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type ProductListProps = {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <Text style={styles.productText}>Nome: {item.name}</Text>
          <Text style={styles.productText}>Quantidade: {item.quantity}</Text>
          <Text style={styles.productText}>Preço: R$ {item.price.toFixed(2)}</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Editar" onPress={() => onEdit(item.id)} />
            <Button title="Excluir" onPress={() => onDelete(item.id)} color="red" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  productContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  productText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
