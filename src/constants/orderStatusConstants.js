export const ORDER_TYPES = {
  PREPARING: 0,
  ON_DELIVERY: 1,
  DELIVERED: 2,
  CANCELLED: 3,
};

export const ORDER_TYPES_LABELS = {
  [ORDER_TYPES.PREPARING]: "Preparing",
  [ORDER_TYPES.ON_DELIVERY]: "On Delivery",
  [ORDER_TYPES.DELIVERED]: "Delivered",
  [ORDER_TYPES.CANCELLED]: "Cancelled",
};

export const ORDER_TYPES_OPTIONS = [
  { value: ORDER_TYPES.PREPARING, label: "Preparing" },
  { value: ORDER_TYPES.ON_DELIVERY, label: "On Delivery" },
  { value: ORDER_TYPES.DELIVERED, label: "Delivered" },
  { value: ORDER_TYPES.CANCELLED, label: "Cancelled" },
];
