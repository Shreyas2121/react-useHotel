export interface Room {
  _id: number;
  amenities: string[];
  category: string;
  price: number;
  desc: string;
  images: {
    bathroom: string;
    bedroom: string;
    living_room: string;
  };
  total_rooms: number;
  occupancy: number;
  area_sq_ft: string;
}

export interface Hall {
  _id: number;
  category: string;
  price: number;
  max_guests: number;
  desc: string;
  images: string[];
  total_halls: number;
  amenities: string[];
}

export interface Addon {
  _id: string;
  name: string;
  price: number;
}

export interface Review {
  _id: string;
  reviewBy: User;
  comment: string;
  rating: number;
}

export interface BookingRoom {
  _id: string;
  user: User;
  bookingDate: string;
  checkIn: Date;
  checkOut: Date;
  selectedAddons?: {};
  coupon?: {};
  numOfRooms: number;
  basePrice: string;
  category: string;
  special_request?: string;
  total: string;
  reviewGiven?: boolean;
}

export interface BookingHall {
  _id: string;
  user: User;
  bookingDate: Date;
  bookedDate: Date;
  category: string;
  selectedAddons?: {};
  coupon?: any;
  price: string;
  specialRequest?: string;
  total: string;
}

export interface User {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  phone?: Number;
  isAdmin?: boolean;
}

export interface Status {
  Basic: number;
  Suite: number;
  Deluxe: number;
}
