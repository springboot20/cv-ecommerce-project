import { useParams } from "react-router-dom";
import { useAddItemToCartMutation } from "../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../features/products/product.slice";
import { useState } from "react";
import { ProductType } from "../types/redux/product";
import { toast } from "react-toastify";
import { addItemToCart as addProductToCart } from "../features/cart/cart.reducer";
import { useAppDispatch } from "./redux/redux.hooks";
import { useGetProductRatingsQuery } from "../features/ratings/rate.slice";

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
  const [page, setPage] = useState(1);
  const product = data?.data.product as ProductType;
  const { data: ratingsData } = useGetProductRatingsQuery(
    {
      productId: id,
      page,
      limit: 5,
    },
    { skip: !id }
  );
  const { ratings = [], summary = {} } = ratingsData?.data || {};

  console.log(ratingsData);

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
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
    page,
    setPage,
    summary,
  };
};
