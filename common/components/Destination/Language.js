import { ScrollView, Text, View } from "react-native";
import { styles } from "../_styles";

export const Language = () => {
  return (
    <ScrollView style={styles.tabWrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.dictionaryWrapper}>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Greetings</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Hello -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Bonjour (bohn-zhoor)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Goodbye -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Au revoir (oh ruh-vwahr)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Good evening -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Bonsoir (bohn-swahr)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Good night -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Bonne nuit (bun nwee)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Polite Expressions</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Please -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              S'il vous plaît (seel voo pleh)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Thank you -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Merci (mehr-see)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              You're welcome -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              De rien (duh ryen)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Excuse me -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Excusez-moi (ehk-skew-zay mwah)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Common Courtesies</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Yes -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Oui (wee)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>No -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Non (noh)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              Excuse me / Pardon -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Pardon (pahr-dohn)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Asking for Help</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              Can you help me? -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Pouvez-vous m'aider ? (poo-veh voo mey-dey)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Where is...? -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Où est... ? (oo eh)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Directions</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Left -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              À gauche (ah gohsh)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Right -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              À droite (ah drwaht)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              Straight ahead: -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Tout droit (too drwah)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Numbers</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>One -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Un (uh)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Two -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Deux (duh)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Three -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Trois (twah)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Four -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Quatre (katr)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Five -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Cinq (sank)</Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Basic Phrases</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>How are you? -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Comment ça va ? (koh-mah sah vah)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              I don't understand -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Je ne comprends pas (zhuh nuh kohm-prahnd pah)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              I don't speak French very well -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              Je ne parle pas très bien français (zhuh nuh parl pah tray byan
              frahn-say)
            </Text>
          </View>
        </View>
        <View style={styles.dictionaryCategory}>
          <Text style={styles.dictionaryCategoryTitle}>Dining</Text>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Menu -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              La carte (lah kart)
            </Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>Water -</Text>
            <Text style={styles.dictionaryCategoryRowValue}>Eau (oh)</Text>
          </View>
          <View style={styles.dictionaryCategoryRow}>
            <Text style={styles.dictionaryCategoryRowKey}>
              The check, please -
            </Text>
            <Text style={styles.dictionaryCategoryRowValue}>
              L'addition, s'il vous plaît (lay-dee-syon seel voo pleh)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
