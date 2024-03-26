export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    style: 'currency',
  }).format(price);
};

export const truncate = (char: string, length: number): string => {
  if (char.length > length) {
    return char.slice(0, length) + '...';
  } else {
    return char;
  }
};
