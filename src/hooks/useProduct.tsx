import { useParams } from "react-router-dom";
import { useAddItemToCartMutation } from "../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../features/products/product.slice";
import { useState } from "react";
import { LocalStorage } from "../util";
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
  const [message, setMessage] = useState<string>("");

  const setRatingsValue = (rating: number) => setRatings(rating);

  const product: ProductType = data?.data.product ?? (LocalStorage.get("product") as ProductType);

  const handleAddItemToCart = async (productId: string) => {
    try {
      const response = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
      setRefreshTrigered(!refreshTrigered);

      setOpen(true);
      console.log(response);

      if (response?.message) {
        toast.success(response?.message);
        setMessage(message);
      }
    } catch (error: any) {
      if (error?.data) {
        toast.warn(error?.data?.message);
      }
    }
  };

  return {
    message,
    refetch,
    open,
    setOpen,
    refreshTrigered,
    isLoading,
    product,
    ratings,
    setQuantityInput,
    handleAddItemToCart,
    quantityInput,
    setRatingsValue,
  };
};
