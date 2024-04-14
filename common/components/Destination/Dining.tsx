import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../styles/theme";
import { StarIcon } from "../../../utilities/SvgIcons.utility";
import { styles } from "../_styles";
import { CountryType } from "../../../api/api.types";
import { FlashList } from "@shopify/flash-list";

type DiningProps = {
  country: CountryType;
};

export const Dining: React.FC<DiningProps> = ({ country }) => {
  const dishes = [
    {
      src: "https://cdn.tasteatlas.com//images/dishes/b075a8fbe7224ef787272cf4d979e388.jpg?mw=660",
      title: "Croissant",
      score: "4.5",
      restaurant: "Blé Sucré",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/ec9dfc952dd148a8bbcf43cdbac6569a.jpg?mw=660",
      title: "Quiche",
      score: "4.0",
      restaurant: "Le Voltigeur",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/6ef8ca510bb44884af294128bab03191.jpg?mw=660",
      title: "Baguette",
      score: "4.4",
      restaurant: "Du Pain et Des Idées",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/d28dcc17a420413f8d2d2fae451c1813.jpg?mw=660",
      title: "Crêpes",
      score: "4.6",
      restaurant: "Breizh Café",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/bff77c0b5fe34398a03b9a436815fad2.jpg?mw=660",
      title: "Macarons",
      score: "4.0",
      restaurant: "Pierre Hermé",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/5af8a479dedb4d53a7718ca752a536eb.jpg?mw=660",
      title: "Éclair",
      score: "4.3",
      restaurant: "Stohrer",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/0809873b805340dcbdb18110564779ef.jpg?mw=660",
      title: "Bisque",
      score: "4.2",
      restaurant: "Ciel de Paris",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/064bd8d6006c46529ec729cf45cd335e.jpg?mw=660",
      title: "Soufflé",
      score: "4.3",
      restaurant: "Le Récamier",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/d2bb9ce304604df2b8f8789fde694ee0.jpg?mw=660",
      title: "Foie gras",
      score: "3.9",
      restaurant: "Le Comptoir de la Gastronomie",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/fde6f39483494f81b0846591fcc50553.jpg?mw=660",
      title: "Crème brûlée",
      score: "4.5",
      restaurant: "Le Potager du Père Thierry",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/5a9748c2067c4e00bfbad4334e858518.jpg?mw=660",
      title: "Ratatouille",
      score: "3.9",
      restaurant: "Miznon Paris",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/19ee4ceab82b478eba60e2e0e5a6358d.jpg?mw=660",
      title: "Brioche",
      score: "4.3",
      restaurant: "Ladurée",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/5dd8d8db50b5430482e4da8722c10aea.jpg?mw=660",
      title: "Châteaubriand",
      score: "4.6",
      restaurant: "Chez Julien",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/71aba52873554307b73d405a4255058b.jpg?mw=660",
      title: "Mousse",
      score: "4.3",
      restaurant: "Chez Janou",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/0d5c54eb9cd64db6a2832aeb115bb57d.jpg?mw=660",
      title: "Steak au poivre",
      score: "4.5",
      restaurant: "Bistrot Paul Bert",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/c64f6a44705e4b6a99974623375afa76.jpg?mw=660",
      title: "Croque-monsieur",
      score: "4.2",
      restaurant: "Le Petit Cler",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/89e20319447e4d58933a0764b5a9a345.jpg?mw=660",
      title: "Mousse au chocolat",
      score: "4.3",
      restaurant: "Chez Janou",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/26716764bc414a4699efef6434025831.jpg?mw=660",
      title: "Pain perdu",
      score: "4.2",
      restaurant: "Hardware Société",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/de1fb2902c0443fe87d56ee67792b2ab.jpg?mw=660",
      title: "Profiteroles",
      score: "4.2",
      restaurant: "Le Relais de l'Entrecote",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/3fdf6a746bd748bf940dcb6fca66c56c.jpg?mw=660",
      title: "Confit de canard",
      score: "4.3",
      restaurant: "Josephine Chez Dumonet",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/54d1956debfa40f2b1cdc22a89ad6124.jpg?mw=660",
      title: "Steak-frites",
      score: "4.2",
      restaurant: "Le Relais de l'Entrecote",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/bded9f61bc424359931994950bc59662.jpg?mw=660",
      title: "Riz au lait",
      score: "3.5",
      restaurant: "Les Petits Parisiens",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/4b5a45d8e11749f9999dd352ea906636.jpg?mw=660",
      title: "Soufflé au chocolat",
      score: "4.5",
      restaurant: "Le Soufflé",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/a2ef7a3408c849b68088a44569ab13d0.jpg?mw=660",
      title: "Quiche Lorraine",
      score: "4.1",
      restaurant: "Angelina",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/baab0ab2a0b041f883f01e68ac9f1ba5.jpg?mw=660",
      title: "Steak tartare",
      score: "4.2",
      restaurant: "Les Fines Gueules",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/2bf05544af8149acacce732bd4bb6a2e.jpg?mw=660",
      title: "Consommé",
      score: "3.6",
      restaurant: "Toyo",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/a4d5cfd1b46646239b59d5b8f57a2bb6.jpg?mw=660",
      title: "Beignets",
      score: "4.2",
      restaurant: "Boulangerie Paul",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/3727a3570d5a475baf5a1a0886481e17.jpg?mw=660",
      title: "Madeleines",
      score: "3.9",
      restaurant: "Blé Sucré",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/5c99e800b3554b53ae6ca91f7005aae4.jpg?mw=660",
      title: "Clafoutis",
      score: "4.0",
      restaurant: "Gérard Mulot",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/4a4ec4f92d4c4fe588f256863dcdb0b5.jpg?mw=660",
      title: "Bouillabaisse",
      score: "4.0",
      restaurant: "Chez Michel",
    },
    {
      src: "https://cdn.tasteatlas.com//images/dishes/e877acd673a2441bb0bcd40aab9eea39.jpg?mw=660",
      title: "Parfait",
      score: "3.8",
      restaurant: "Le Bristol Paris",
    },
    {
      src: "https://cdn.tasteatlas.com//Images/Dishes/3f4cb32e87ea49779b9b9290705f3edd.jpg?mw=660",
      title: "Île flottante",
      score: "4.1",
      restaurant: "Aux Lyonnais",
    },
  ];
  return (
    <>
      <View style={styles.tabContentHeader}>
        <Text style={styles.tabContentHeaderText}>Popular national dishes</Text>
      </View>

      <View style={{ minHeight: 200 }}>
        <FlashList
          data={dishes}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.thingsTodoItem} key={item.score}>
              <ImageBackground
                style={styles.thingsTodoItemImage}
                source={{
                  uri: item?.src,
                }}
              ></ImageBackground>

              <View style={styles.thingsTodoItemDetails}>
                <Text style={styles.thingsTodoItemTitle} selectable={true}>
                  {item?.title}
                </Text>
                <View style={styles.thingsTodoItemiIn}>
                  <View
                    style={[
                      styles.ratingLabel,
                      { paddingLeft: 0, paddingBottom: 0 },
                    ]}
                  >
                    <View
                      style={{ position: "relative", top: -1, opacity: 0.8 }}
                    >
                      <StarIcon color="#FFBC3E" />
                    </View>
                    <Text
                      style={[
                        styles.ratingText,
                        { color: "#000", marginLeft: 0 },
                      ]}
                    >
                      {item?.score}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection:
                        item?.restaurant?.length < 12 ? "row" : "column",
                      alignItems: "flex-start",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                      selectable={true}
                    >
                      {item?.restaurant}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
        />
      </View>
    </>
  );
};
