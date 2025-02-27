import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Định nghĩa kiểu cho điều hướng
type RootStackParamList = {
    ProductDetails: { id: string; name: string; price: string; image: string; description: string; stock: number };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

export default function HomeScreen() {
    const products = useSelector((state: RootState) => state.products.products);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<HomeScreenNavigationProp>(); // Sử dụng navigation
    const [search, setSearch] = useState('');

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Biểu tượng giỏ hàng */}
            <TouchableOpacity style={styles.cartIconContainer}>
                <Ionicons name="cart" size={30} color="black" />
                {cartItems.length > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartCount}>{cartItems.length}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Danh sách sản phẩm */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('ProductDetails', {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                description: item.description,
                                stock: item.stock,
                            })
                        }
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                        >
                            <Text style={styles.addButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    cartIconContainer: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    cartBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
    },
    cartCount: {
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
    addButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
