import { useParams } from "react-router-dom";
import { useAddItemToCartMutation } from "../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../features/products/product.slice";
import { useState } from "react";
import { ProductType } from "../types/redux/product";
import { toast } from "react-toastify";
import { addItemToCart as addProductToCart } from "../features/cart/cart.reducer";
import { useAppDispatch } from "./redux/redux.hooks";

type Size = {
  name: string;
  inStock: boolean;
};

export const useProduct = () => {
  const { id } = useParams();
  const [addItemToCart] = useAddItemToCartMutation();
  const { data, isLoading, refetch } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });
  const [quantityInput, setQuantityInput] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [refreshTrigered, setRefreshTrigered] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<Size>(data?.data.product?.sizes[0] ?? {});

  const setRatingsValue = (rating: number) => setRatings(rating);
  const product: ProductType = typeof data?.data.product === "object" && data?.data.product;

  const [ratings, setRatings] = useState<number>(product?.rating?.rate);

  console.log(ratings);

  console.log(product?.rating?.rate);

  const handleAddItemToCart = async (productId: string) => {
    const response = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
    dispatch(addProductToCart(response));
    toast.success(response?.message);
    setRefreshTrigered(!refreshTrigered);
  };

  return {
    refetch,
    open,
    data,
    setOpen,
    refreshTrigered,
    isLoading,
    product,
    ratings,
    setQuantityInput,
    message: data?.message,
    handleAddItemToCart,
    quantityInput,
    setRatingsValue,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
  };
};
