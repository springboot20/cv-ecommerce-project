import { useState } from 'react';
import {
  useAddItemToCartMutation,
  useGetUserCartQuery,
  useRemoveItemFromCartMutation,
} from '../features/cart/cart.slice';
import { toast } from 'react-toastify';
import { CartInterface } from '../types/redux/cart';

export const useCart = () => {
  const { data, refetch } = useGetUserCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [removeItemToCart] = useRemoveItemFromCartMutation();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [refreshTrigered, setRefreshTrigered] = useState(false);
  const [message, setMessage] = useState<string>('');
  const cart: CartInterface = data?.data?.cart;

  const handleEditClick = (id: string) => {
    const selectedItem = cart.items.find((item: any) => {
      return item.product._id === id;
    });

    if (selectedItem) {
      if (selectedItem) {
        setQuantityInput(selectedItem.quantity); // Set initial quantity input to current quantity

        setSelectedItemId(id);
        setIsEditing(true);
      }
    }
  };

  const handleUpdateQuantity = async (productId: string) => {
    if (selectedItemId !== null && quantityInput > 0) {
      try {
        const { message } = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
        if (message) {
          toast.success(message);
          setMessage(message);
        }
      } catch (error: any) {
        toast.error(error.data?.message);
        toast.error(error?.error);
      }

      setRefreshTrigered(!refreshTrigered);
      setSelectedItemId(null);
      setIsEditing(false);
    } else {
      console.error('Invalid quantity input.');
    }
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setIsEditing(false);
  };

  const handleDelete = async (productId: string) => {
    try {
      const { message } = await removeItemToCart(productId).unwrap();
      setRefreshTrigered(!refreshTrigered);

      if (message) {
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error.error);
      toast.error(error.data?.message);
    }
  };

  return {
    handleCancelEdit,
    handleDelete,
    handleEditClick,
    isEditing,
    cart,
    refreshTrigered,
    message,
    handleUpdateQuantity,
    refetch,
    selectedItemId,
    setQuantityInput,
    quantityInput,
  };
};
