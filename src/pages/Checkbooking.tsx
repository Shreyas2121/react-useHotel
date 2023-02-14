import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import DisplayDetails from "../components/DisplayDetails/DisplayDetailsRoom";
import { BookingRoom, BookingHall } from "../types/types";
import Stack from "react-bootstrap/Stack";
import axios from "axios";

import roomsBackground from "../assets/images/about_banner.jpg";

import "../components/parallaxImage.css";
import DisplayDetailsHall from "../components/DisplayDetails/DisplayDetailsHall";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getBookingByUser, getHallBookingByUser } from "../api";
import { Navigate } from "react-router-dom";

export const Checkbooking = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const [HallBookingDetails, setBookingDetailsHall] =
    React.useState<BookingHall[]>(null);

  const bookingsQuery = useQuery({
    queryKey: ["booking", user._id],
    queryFn: () => getBookingByUser(user._id),
  });

  const bookingHallQuery = useQuery({
    queryKey: ["bookingHall", user._id],
    queryFn: () => getHallBookingByUser(user._id),
  });

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${roomsBackground})`, height: "100vh" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">YOUR BOOKINGS</h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Container>
          <br />
          <br />
          {bookingsQuery.isLoading ? (
            <h1>Loading</h1>
          ) : (
            <div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {bookingsQuery.data?.length ? (
                  <DisplayDetails
                    RoomBookingDetails={bookingsQuery.data}
                    bookingsQuery={bookingsQuery}
                  />
                ) : (
                  <div
                    style={{
                      marginTop: "2rem",
                      color: "red",
                      height: "5rem",
                    }}
                  >
                    <h5>No Room Bookings Found: </h5>
                  </div>
                )}
              </div>

              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {bookingHallQuery.data.length ? (
                  <DisplayDetailsHall
                    HallBookingDetails={bookingHallQuery.data}
                    bookingsQuery={bookingHallQuery}
                  />
                ) : (
                  <div
                    style={{
                      marginTop: "2rem",
                      color: "red",
                      height: "5rem",
                    }}
                  >
                    <h5>No Hall Bookings Found </h5>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
};

export default Checkbooking;
