import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { FloatingActionButton } from "../../../../components/common/FloatingButtons";
import { useAppDispatch, useAppSelector } from "../../../../package/store";
import { BackIcon, PlusIcon, TrashIcon, WishlistAddIcon } from "../../../../utilities/SvgIcons.utility";
import { styles } from "./styles";

interface HeaderContentProps {
  handleClose: () => void;
  showAddToTrip: boolean;
}

const AddToTripButton = () => {
    return (
      <View style={styles.addTripButton} hitSlop={20}>
        <PlusIcon size="14" />
        <Text style={styles.addTripText}>Add to trip</Text>
      </View>
    );
  };
  
  const RemoveFromTripButton = () => {
    return (
      <View style={styles.addTripButton} hitSlop={20}>
        <TrashIcon width="16" color="red" />
        <Text style={[styles.addTripText, { color: "red" }]}>Remove</Text>
      </View>
    );
  };

export const HeaderContent = ({ handleClose, showAddToTrip}: HeaderContentProps) => {
    const dispatch = useAppDispatch();
    const wishlistState = useAppSelector((state) => state.wishlist);
    // const [fetchToggleWishlist, { isLoading: isWishlistToggleLoading }] =
    //   useToggleWishlistMutation();
  
    // const handleAddToWishlist = useCallback(
      // async (exists: boolean = false) => {
      //   try {
      //     if (exists) {
      //       dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
      //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      //     } else {
      //       dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
      //     }
  
      //     await fetchToggleWishlist({ city: city.id }).unwrap();
  
      //     if (!exists) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      //   } catch (error) {
      //     // Reverse the action in case of an error
      //     if (exists) {
      //       dispatch(addItemIntoWishlist({ id: city.id!, city, sight: null }));
      //     } else {
      //       dispatch(removeItemFromWishlist({ id: city.id!, city, sight: null }));
      //     }
  
      //     toast.error("Something went wrong, please try later", {
      //       duration: 2000,
      //     });
      //   }
      // },
      // [dispatch, city]
    // );

  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      id: 1,
      date: "2025-01-01",
    },
    {
      id: 2,
      date: "2025-01-02",
    },
  ];

  
    return (
    <>
      <Pressable
        onPress={() => handleClose()}
        hitSlop={20}
        style={({ pressed }) => [
          styles.backButton,
          {
            opacity: pressed ? 0.5 : 1, 
          },
        ]}
      >
        <BackIcon size="18" />
      </Pressable>
      <View style={styles.headerRight}>
        {showAddToTrip &&
          (true ? (
            <RemoveFromTripButton />
          ) : (
            <FloatingActionButton
              withHeader={true}
              title="Select dates"
              //@ts-expect-error ///
              buttons={days.map((day, i) => ({
                label: day.date,
                onPress: () => setActiveDay(i),
                icon: null,
                isDanger: false,
                isActive: day.id === days[activeDay]?.id,
              }))}
              //@ts-expect-error ///
              renderTrigger={() => <AddToTripButton />}
            />
          ))}
        <Pressable
          hitSlop={20}
          style={({ pressed }) => [
            styles.addToBucketButton,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          // disabled={isWishlistToggleLoading}
          // onPress={() =>
          //   !isWishlistToggleLoading &&
          //   handleAddToWishlist(
          //     wishlistState &&
          //       wishlistState.wishlists.some(
          //         (i) => i.city && i.city.id === city.id
          //       )
          //   )
          // }
        >
          {/* {isWishlistToggleLoading ? (
                  <ActivityIndicator color="#000" />
                ) : wishlistState &&
                  wishlistState &&
                  wishlistState.wishlists.some(
                    (i) => i.city && i.city.id === city.id
                  ) ? (
                    <WishlistedIcon size={20} color="#000" />
                ) : (
                  <WishlistAddIcon size={18} />
                )} */}
          <WishlistAddIcon size={18} />
        </Pressable>
      </View>
    </>
  );
};
