import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProductDetails: { id: string; name: string; price: string; image: string; description: string; stock: number };
};

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const dispatch = useDispatch();
  const { id, name, price, image, description, stock } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.stock}>Stock: {stock} items</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => dispatch(addToCart({ id, name, price, image, description, stock, quantity: 1 }))}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
