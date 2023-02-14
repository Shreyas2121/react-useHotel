import axios from "axios";
import {
  Addon,
  BookingHall,
  BookingRoom,
  Hall,
  Review,
  Room,
  Status,
} from "./types/types";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_USEHOTEL_BACKEND}`,
});

export const getReviews = async (path: string) => {
  const response = await api.get(path);
  return response.data as Review[];
};

export const postReview = async (data) => {
  const response = await api.post("review", data);
  return response.data as {
    message: string;
    review: Review;
  };
};

export const getRooms = async () => {
  const response = await api.get("rooms");
  console.log(response);
  return response.data as Room[];
};

export const getHallByCat = async (category: string) => {
  const response = await api.get(`halls/${category}`);
  return response.data as Hall[];
};

export const bookRoom = async (data) => {
  const response = await api.post("book/room", data);
  return response.data as {
    message: string;
    booking: BookingRoom;
  };
};

export const bookHall = async (data) => {
  const response = await api.post("book/hall", data);
  return response.data as {
    message: string;
    booking: BookingHall;
  };
};

export const getBookingByUser = async (id: string) => {
  const response = await api.get(`bookings/${id}`);
  return response.data as BookingRoom[];
};

export const getHallBookingByUser = async (id: string) => {
  const response = await api.get(`bookings/hall/${id}`);
  return response.data as BookingHall[];
};

export const checkAvailability = async (data) => {
  const response = await api.post("room/availability", data);
  return response.data as {
    Basic: number;
    Suite: number;
    Deluxe: number;
  };
};

export const checkHallAvailability = async (data) => {
  console.log(data);
  const response = await api.post("hall/availability", data);
  return response.data;
};

export const getAddons = async () => {
  const response = await api.get("addons");
  return response.data as Addon[];
};

export const validateCoupon = async (data) => {
  const response = await api.post("coupon/validate", data);
  return response.data as Status;
};

export const deleteRoomBooking = async (id: string) => {
  const response = await api.delete(`booking/room/${id}`);
  return response.data as string;
};

export const deleteHallBooking = async (id: string) => {
  const response = await api.delete(`booking/hall/${id}`);
  return response.data as string;
};
