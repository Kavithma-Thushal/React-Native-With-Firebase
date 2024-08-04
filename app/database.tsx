import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ref, onValue, set, update, remove } from "firebase/database";
import { database } from "../FirebaseConfig";

export default function Database() {
  const [data, setData] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const dataRef = ref(database, "customers");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
      filterData(searchQuery, data || {});
    });

    return () => unsubscribe();
  }, [searchQuery]);

  const saveCustomer = () => {
    if (!customerId) {
      Alert.alert("Error", "Customer ID is required");
      return;
    }

    const customerRef = ref(database, `customers/${customerId}`);
    set(customerRef, {
      name: name,
      address: address,
      salary: salary,
    })
      .then(() => {
        setCustomerId("");
        setName("");
        setAddress("");
        setSalary("");
        Alert.alert("Success", "Customer Saved Successfully!");
      })
      .catch((error) => {
        Alert.alert("Failed", "Failed to save the customer");
      });
  };

  const updateCustomer = () => {
    if (!customerId) {
      Alert.alert("Error", "Customer ID is required");
      return;
    }

    const customerRef = ref(database, `customers/${customerId}`);
    update(customerRef, {
      name: name,
      address: address,
      salary: salary,
    })
      .then(() => {
        Alert.alert("Success", "Customer Updated Successfully!");
      })
      .catch((error) => {
        Alert.alert("Failed", "Failed to update the customer");
      });
  };

  const deleteCustomer = () => {
    if (!customerId) {
      Alert.alert("Error", "Customer ID is required");
      return;
    }

    const customerRef = ref(database, `customers/${customerId}`);
    remove(customerRef)
      .then(() => {
        setCustomerId("");
        setName("");
        setAddress("");
        setSalary("");
        Alert.alert("Success", "Customer Deleted Successfully!");
      })
      .catch((error) => {
        Alert.alert("Failed", "Failed to delete the customer");
      });
  };

  const searchCustomers = (query) => {
    setSearchQuery(query);
  };

  const filterData = (query, data) => {
    const filtered = Object.keys(data)
      .filter((key) => {
        const customer = data[key];
        return (
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.address.toLowerCase().includes(query.toLowerCase()) ||
          key.toLowerCase().includes(query.toLowerCase())
        );
      })
      .reduce((res, key) => {
        res[key] = data[key];
        return res;
      }, {});

    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Customer ID"
        placeholderTextColor="#aaa"
        value={customerId}
        onChangeText={setCustomerId}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#aaa"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        placeholderTextColor="#aaa"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveCustomer}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updateCustomer}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteCustomer}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={searchCustomers}
      />
      <FlatList
        data={Object.keys(filteredData).map((key) => ({
          id: key,
          ...filteredData[key],
        }))}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Salary: {item.salary}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
