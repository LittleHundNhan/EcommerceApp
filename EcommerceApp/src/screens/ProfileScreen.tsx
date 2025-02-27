import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Avatar & Tên người dùng */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
      </View>

      {/* Nút Đăng xuất */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => dispatch(logout())}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Log Out</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
