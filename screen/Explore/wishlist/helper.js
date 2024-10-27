export const groupByCategory = (data) => {
  return data?.reduce((acc, item) => {
    const category = item.sight?.category;
    if (category) {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
    }
    return acc;
  }, {});
};
