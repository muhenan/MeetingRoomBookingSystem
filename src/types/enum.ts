export const OrderStatus = {
  PROGRESS: 0, // 订单正在审批中
  APPROVAL: 1, // 订单审批通过，预定成功
  REFUSE: 2 // 订单审核不通过，预定失败
}

export const BookingSlotStatus = {
  BOOKABLE: 0, // 可以预定
  PROGRESS: 1, // 已预订，审核中
  APPROVAL: 2, // 已预订，审核通过
  N0NBOOKABLE: 3 // 不可预定，因为某些原因
}