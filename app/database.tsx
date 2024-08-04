import React, { useEffect, useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { ref, onValue, set } from "firebase/database";
import { database } from "../FirebaseConfig";

export default function Database() {
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const dataRef = ref(database, "customers");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  const saveCustomer = () => {
    const newCustomerRef = ref(database, "customers/" + Date.now());
    set(newCustomerRef, {
      id: id,
      name: name,
      address: address,
      salary: salary,
    })
      .then(() => {
        setId("");
        setName("");
        setAddress("");
        setSalary("");
        alert("Customer Saved Successfully...!");
      })
      .catch((error) => {
        alert("Failed to save the customer");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Customer Id"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer Salary"
          value={salary}
          onChangeText={setSalary}
        />

        <Button title="Save Customer" onPress={saveCustomer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  form: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
