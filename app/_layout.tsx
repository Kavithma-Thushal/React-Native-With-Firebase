import React from "react";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Login" }} />
      <Tabs.Screen name="gallery" options={{ title: "Gallery" }} />
    </Tabs>
  );
}
