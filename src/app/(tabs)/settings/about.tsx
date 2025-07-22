import React from "react";

import { Image, ScrollView, StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Container, Typography } from "@/common/components";

const AboutScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView>
      <Container>
        <View style={styles.titleWrapper}>
          <Typography fontWeight="700" style={styles.title}>
            Money
          </Typography>
          <Typography
            fontWeight="700"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Tracking
          </Typography>
        </View>
        <Typography style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ultricies, est et dictum egestas, enim nisl consequat nibh, a bibendum
          mauris ex in ipsum. Sed dictum aliquam dui, nec malesuada eros
          scelerisque ultricies. Curabitur fermentum magna suscipit tempor
          pellentesque. Donec lacinia est sed lectus mattis finibus. Vestibulum
          lobortis vitae sem eu posuere. Vestibulum ac nulla in lacus rutrum
          condimentum. Nullam eu auctor est. Vivamus tincidunt facilisis eros ac
          consectetur. Pellentesque eleifend ligula dictum metus fermentum
          cursus.
        </Typography>
        <Typography style={styles.description}>
          Phasellus tempor tellus eget arcu egestas, a hendrerit dolor auctor.
          Nullam ac quam mattis, imperdiet tortor id, bibendum lectus. Curabitur
          eu enim purus. Proin volutpat cursus enim quis faucibus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Aliquam non turpis auctor, vestibulum dolor eu,
          ultrices nunc. Sed ut purus mattis, ullamcorper dolor non, posuere
          lacus.
        </Typography>
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Image
            style={styles.icon}
            source={require("../../../../assets/images/icon.png")}
          />
          <Typography>MoneyTracking v1.0</Typography>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: "justify",
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 14,
  },
  title: {
    fontSize: 38,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    objectFit: "cover",
    marginBottom: 8,
  },
});

export default AboutScreen;
