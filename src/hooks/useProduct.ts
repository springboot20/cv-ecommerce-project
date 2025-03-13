import { useParams } from "react-router-dom";
import { useAddItemToCartMutation } from "../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../features/products/product.slice";
import { useState } from "react";
import { ProductType } from "../types/redux/product";
import { toast } from "react-toastify";

export const useProduct = () => {
  const { id } = useParams();
  const [addItemToCart] = useAddItemToCartMutation();
  const { data, isLoading, refetch } = useGetProductByIdQuery(id as string);
  const [ratings, setRatings] = useState<number>(1);
  const [quantityInput, setQuantityInput] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [refreshTrigered, setRefreshTrigered] = useState(false);

  const setRatingsValue = (rating: number) => setRatings(rating);

  const product: ProductType = typeof data?.data.product === "object" && data?.data.product;

  const handleAddItemToCart = async (productId: string) => {
    const response = await addItemToCart({ productId, quantity: quantityInput }).unwrap();

    toast.success(response?.message);
    setRefreshTrigered(!refreshTrigered);
  };

  return {
    refetch,
    open,
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
  };
};
