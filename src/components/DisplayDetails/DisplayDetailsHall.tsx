import React from "react";
import { Button } from "react-bootstrap";
import { BookingHall } from "../../types/types";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./DisplayDetails.css";
import { Checkmark } from "react-checkmark";
import { deleteHallBooking } from "../../api";

interface Props {
  HallBookingDetails: BookingHall[];
  bookingsQuery: any;
}

const DisplayDetailsHall = ({ HallBookingDetails, bookingsQuery }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      const msg = await deleteHallBooking(id);
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
  const check_ongoin = (bookedDate: Date) => {
    const booked_date = new Date(bookedDate);
    const today = new Date();
    if (today >= booked_date) {
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
      <h5>Hall bookings Found for User: {HallBookingDetails[0].user.name}</h5>
      <Table striped bordered hover>
        <thead>
          <tr id="table-headings">
            <th>Booked Date</th>

            <th>Hall Type</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {HallBookingDetails.map((booking) => (
            <>
              {booking._id ? (
                <tr>
                  <td>{new Date(booking.bookedDate).toDateString()}</td>

                  <td>{booking.category}</td>

                  <td>{booking.total}</td>
                  <td>
                    {check(booking.bookedDate) ? (
                      <span>
                        {check_ongoin(booking.bookedDate) ? (
                          <span>On-going</span>
                        ) : (
                          <span>
                            <Checkmark size="40px" />
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Incomplete</span>
                    )}
                  </td>
                  <td>
                    {check(booking.bookedDate) ? (
                      <span>
                        {check_ongoin(booking.bookedDate) ? (
                          <span id="Ongoing">
                            --------------------------------
                          </span>
                        ) : (
                          <span>
                            <Button id="AddReview">
                              <Link
                                to="/addreview"
                                state={{
                                  name: booking.user.name,
                                  email: booking.user.email,
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

export default DisplayDetailsHall;
