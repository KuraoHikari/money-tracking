import React from "react";

import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Tabs } from "expo-router";

import { tabItems } from "@/common/constants/tabs";

const TabsLayout = () => {
  return (
    <Tabs>
      {tabItems.map((tab, index) => {
        return (
          <Tabs.Screen
            key={index}
            name={tab.name}
            options={{
              headerShown: false,
              title: tab.title,
              tabBarButton: (props) => (
                <Pressable
                  {...props}
                  android_ripple={{ color: "transparent" }}
                />
              ),
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name={`${tab.iconName}${focused ? "" : "-outline"}`}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default TabsLayout;
