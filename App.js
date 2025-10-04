import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, SafeAreaContext, View, FlatList, TextInput, Button} from 'react-native';
import { useState } from 'react';

const DATA = [
  {
    id: '1',
    title: 'Study',
    completed: false,
  },
  {
    id: '2',
    title: 'Coding',
    completed: false,
  },
  {
    id: '3',
    title: 'Journaling',
    completed: false,
  }
]

const TodoItem = (props) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{props.title}</Text>
  </View>
)

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");

  const addNewToDo = () => {
    let newTodo = {
      id: items.length,
      title: text, 
      completed: false,
    }

    setItems([...items, newTodo]);
    setText("");
  }

  const markItemCompleted = (item) => {
    const itemIndex = items.findIndex(currItem => currItem.id === item.id);

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {...items[findIndex], completed: true};
      setItems(updatedItems);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.input} onChangeText={setText} value={text}/>
      <Button title='Add ToDo' onPress={addNewToDo}/>
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({item}) => <TodoItem title={item.title}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10%"
  },
  input: {
    height: 48, 
    width: 200,
    borderWidth: 1,
    padding: 10, 
    borderColor: 'gray'
  },
  item: {
    backgroundColor: '#6DB6DD',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    width: '100%'
  },
  list: {
    alignSelf: 'stretch',
  },
  itemText: {
    color:"#ffff"
  }
});
