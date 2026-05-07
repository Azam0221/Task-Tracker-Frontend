import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, TextInput, ActivityIndicator,
  Alert, RefreshControl, Modal
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';

export default function TasksScreen() {
  const { logout } = useAuth();
  const { tasks, isLoading, isError, refetch, createTask, toggleTask, deleteTask, isCreating } = useTasks();

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    createTask({ title, description });
    setTitle('');
    setDescription('');
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Something went wrong!</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={styles.link}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks </Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#6C63FF" />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubText}>Tap + to add your first task</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {/* Checkbox */}
            <TouchableOpacity
              style={[styles.checkbox, item.completed && styles.checkboxDone]}
              onPress={() => toggleTask({ id: item._id, completed: !item.completed })}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>


            {/* Task Info */}
            <View style={styles.taskInfo}>
              <Text style={[styles.taskTitle, item.completed && styles.taskDone]}>
                {item.title}
              </Text>
              {item.description ? (
                <Text style={styles.taskDesc}>{item.description}</Text>
              ) : null}
            </View>

            {/* Delete */}
            <TouchableOpacity onPress={() => deleteTask(item._id)}>
              <Text style={styles.deleteBtn}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />


      {/* Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Title *"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={isCreating}>
              {isCreating
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Add Task</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', paddingTop: 60, paddingHorizontal: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  logout: { color: '#6C63FF', fontWeight: 'bold' },
  taskCard: {
    backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: '#2E2E2E'
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 2,
    borderColor: '#6C63FF', marginRight: 12, justifyContent: 'center', alignItems: 'center'
  },
  checkboxDone: { backgroundColor: '#6C63FF' },
  checkmark: { color: '#fff', fontWeight: 'bold' },
  taskInfo: { flex: 1 },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: '500' },
  taskDone: { textDecorationLine: 'line-through', color: '#666' },
  taskDesc: { color: '#999', fontSize: 13, marginTop: 4 },
  deleteBtn: { fontSize: 20, marginLeft: 8 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptySubText: { color: '#999', marginTop: 8 },
  errorText: { color: '#ff6b6b', fontSize: 16 },
  link: { color: '#6C63FF', marginTop: 8 },
  fab: {
    position: 'absolute', bottom: 32, right: 24,
    backgroundColor: '#6C63FF', width: 58, height: 58,
    borderRadius: 29, justifyContent: 'center', alignItems: 'center',
    elevation: 5
  },
  fabText: { color: '#fff', fontSize: 30, lineHeight: 34 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#1E1E1E', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    backgroundColor: '#2E2E2E', color: '#fff', padding: 14,
    borderRadius: 10, marginBottom: 12, fontSize: 15
  },
  button: { backgroundColor: '#6C63FF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: '#999', textAlign: 'center', padding: 8 }
});