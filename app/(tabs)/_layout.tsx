import { Tabs } from "expo-router";

export default function _Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false, tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: "Saved", headerShown: false, tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
