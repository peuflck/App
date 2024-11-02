import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type ProductFormProps = {
  onSubmit: (name: string, quantity: number, price: number) => void;
  initialValues?: {
    name: string;
    quantity: number;
    price: number;
  };
};

export default function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name || '');
  const [quantity, setQuantity] = useState(String(initialValues?.quantity || ''));
  const [price, setPrice] = useState(String(initialValues?.price || ''));

  const handleSubmit = () => {
    const formattedPrice = parseFloat(price);
    const formattedQuantity = parseInt(quantity, 10);
    
    if (!isNaN(formattedPrice) && !isNaN(formattedQuantity)) {
      onSubmit(name, formattedQuantity, formattedPrice);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={price}
        keyboardType="decimal-pad"
        onChangeText={setPrice}
        style={styles.input}
      />
      <Button title="Salvar Produto" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
