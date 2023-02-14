import React from "react";
import { Button } from "react-bootstrap";
import { BookingRoom } from "../../types/types";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./DisplayDetails.css";
import { Checkmark } from "react-checkmark";
import { useQuery } from "@tanstack/react-query";
import { deleteRoomBooking } from "../../api";

interface Props {
  RoomBookingDetails: BookingRoom[];
  bookingsQuery: any;
}

const DisplayDetails = ({ RoomBookingDetails, bookingsQuery }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      const msg = await deleteRoomBooking(id);
      if (msg === "Deleted") {
        toast.success("Booking deleted successfully");
        bookingsQuery.refetch();
      } else {
        toast.error("Error deleting booking");
        return;
      }
    } catch (error) {
      toast.error("Error deleting booking");
    }
  };

  const check_ongoin = (checkin: Date, checkout: Date) => {
    const checkin_date = new Date(checkin);
    const checkout_date = new Date(checkout);
    const today = new Date();
    if (today >= checkin_date && today <= checkout_date) {
      return true;
    } else {
      return false;
    }
  };

  const check = (date: Date) => {
    const newDate = new Date(date);
    const currentDate = new Date();

    if (newDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="table-div">
      <h5>Room bookings Found for User : {RoomBookingDetails[0].user.name}</h5>
      <Table striped bordered hover>
        <thead>
          <tr id="table-headings">
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Room Type</th>
            <th>No. of rooms</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {RoomBookingDetails.map((booking) => (
            <>
              {booking._id ? (
                <tr>
                  <td>{new Date(booking.checkIn).toDateString()}</td>
                  <td>{new Date(booking.checkOut).toDateString()}</td>
                  <td>{booking.category}</td>
                  <td>{booking.numOfRooms}</td>
                  <td>{booking.total}</td>
                  <td>
                    {check(booking.checkIn) ? (
                      <span>
                        {check_ongoin(booking.checkIn, booking.checkOut) ? (
                          <span>On-going</span>
                        ) : (
                          <span>
                            <Checkmark size="40px" />
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Upcoming </span>
                    )}
                  </td>
                  <td>
                    {check(booking.checkIn) ? (
                      <span>
                        {check_ongoin(booking.checkIn, booking.checkOut) ? (
                          <></>
                        ) : (
                          <span>
                            <Button id="AddReview">
                              <Link
                                to="/addreview"
                                state={{
                                  userId: booking.user._id,
                                  bookingId: booking._id,
                                }}
                              >
                                Add Review
                              </Link>
                            </Button>
                          </span>
                        )}
                      </span>
                    ) : (
                      <Button
                        onClick={(e) => handleDelete(booking._id)}
                        id="Cancel_Booking"
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>No Booking</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayDetails;
