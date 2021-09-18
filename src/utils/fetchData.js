import commerce from "./commerce";

export const getProducts = async (category_id) => {
  let data = {};
  if (category_id) {
    data = await commerce.products.list({
      limit: 8,
      category_id: category_id,
    });
  } else {
    data = await commerce.products.list();
  }
  return data;
};
