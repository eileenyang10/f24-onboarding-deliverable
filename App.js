import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable, Modal } from 'react-native';
import { useState } from 'react';

const DATA = [
  { id: '1', title: 'Meditation', completed: false },
  { id: '2', title: 'Coding', completed: false },
  { id: '3', title: 'Journaling', completed: false }
];

const TodoItem = ({ item, onToggle }) => (
  <Pressable onPress={() => onToggle(item)}>
    <View style={[styles.item, item.completed && { opacity: 0.4 }]}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  </Pressable>
);

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const addNewToDo = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: (items.length + 1).toString(),
      title: text,
      completed: false,
    };
    setItems([...items, newTodo]);
    setText("");
    setModalVisible(false);
  };

  const toggleItemCompleted = (item) => {
    const updatedItems = items.map(curr =>
      curr.id === item.id ? { ...curr, completed: !curr.completed } : curr
    );
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleItemCompleted} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      {/* Modal for adding new todo */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter a task"
            />
            <Pressable style={styles.addButton} onPress={addNewToDo}>
              <Text style={styles.addButtonText}>Add todo item</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#6DB6DD',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // shadow Android
    shadowColor: "#000", // shadow iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "75%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    marginBottom: 15,
    borderRadius: 6,
  },
  addButton: {
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
