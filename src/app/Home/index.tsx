import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { itemsStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE
];

type Item = {
  id: string;
  description: string;
  status: FilterStatus
}

export function Home() {
  const [description, setDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState(FilterStatus.PENDING);
  const [items, setItems]  = useState<Item[]>([]);

  const handleChangeStatusFilter = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const handleAddNewItem = async () => {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: description,
      status: FilterStatus.PENDING
    };

    await itemsStorage.add(newItem);
    loadItems();
    setFilterStatus(FilterStatus.PENDING);
    setDescription("");
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await itemsStorage.remove(id);
      await loadItems();
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover o item.")
    }
  }

  const handleChangeStatusItem = async (id: string) => {
     try {
      await itemsStorage.toggleStatus(id);
      await loadItems();
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  const handleClear = () => {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()}
    ]);
  }

  const onClear = async () => {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error)
      Alert.alert("Limpar", "Não foi possível remover todos os itens.")
    }
  }

  const loadItems = async () => {
    try  {
      const output = await itemsStorage.getByStatus(filterStatus);
      setItems(output);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  useEffect(() => {
    loadItems();
  }, [filterStatus])

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require("@/assets/logo.png")}
      />

      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />

        <Button title="Adicionar" onPress={handleAddNewItem}/>
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} 
              status={status} 
              isActive={status === filterStatus}
              onPress={() => handleChangeStatusFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item} 
              onChangeStatus={() => handleChangeStatusItem(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  ) 
}