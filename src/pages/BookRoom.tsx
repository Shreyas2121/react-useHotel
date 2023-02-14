import React, { useState, useEffect } from "react";
import RoomDetailsCard from "../components/Cards/RoomDetailsCard";
import "../components/search.css";
import "./rooms.css";
import { Room, Status } from "../types/types";

import "../components/parallaxImage.css";

import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Loader from "../Loader";

import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAvailability, getRooms } from "../api";

const Rooms = () => {
  const res = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const checkAvailQuery = useMutation({
    mutationFn: (data: { checkIn: string; checkOut: string }) =>
      checkAvailability(data),
  });

  let allRooms = res.data;

  const bookingRoomImage =
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

  const [check, setCheck] = useState<any>();
  const [checkIn, setCheckIn] = useState<any>("");

  const [checkOut, setCheckOut] = useState<any>();

  const [status, setStatus] = useState<Status>();

  let checkin = new Date(checkIn);
  let checkout = new Date(checkOut);

  const convertDateToSpecificFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSearch = async (e) => {
    if (checkIn === "" || checkOut === "") {
      toast.error("Please select checkin and checkout dates");
      return;
    }

    if (checkin > checkout) {
      toast.error("Checkin date cannot be greater than checkout date");
      return;
    }

    if (checkin.toDateString() === checkout.toDateString()) {
      toast.error("Checkin date cannot be equal to checkout date");
      return;
    }

    e.preventDefault();

    let statusData = await checkAvailQuery.mutateAsync({
      checkIn: checkin.toISOString(),
      checkOut: checkout.toISOString(),
    });

    setStatus(statusData);

    window.scrollTo({
      top: 800,
    });
  };

  useEffect(() => {
    setCheck(convertDateToSpecificFormat(checkout));
  }, [checkIn]);

  const maxAllowedCheckout = () => {
    let date = new Date(checkIn);
    date.setDate(date.getDate() + 30);
    return convertDateToSpecificFormat(date);
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${bookingRoomImage})`, height: "50rem" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">ROOMS</h1>
              <h4 className="mb-3">AWAY FROM MONOTONOUS LIFE</h4>
              <br />
              <br />
              <br />
              <div
                className="search"
                style={{
                  display: "flex",
                  width: "60rem",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "60%",
                  }}
                >
                  Check-in:{" "}
                  <input
                    id="check-in"
                    className="input-date"
                    min={new Date().toISOString().split("T")[0]}
                    max={
                      checkOut
                        ? checkOut
                        : convertDateToSpecificFormat(
                            new Date(
                              new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                            )
                          )
                    }
                    type="date"
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  Check-out:{" "}
                  <input
                    id="check-out"
                    className="input-date"
                    min={convertDateToSpecificFormat(checkin)}
                    max={maxAllowedCheckout()}
                    type="date"
                    disabled={!checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <Button
                  id="check-availability"
                  variant="primary"
                  size="sm"
                  onClick={handleSearch}
                >
                  Check Availability
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {status && (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Room Type</h6>
          <hr />
          {res.isLoading ? (
            <Loader />
          ) : (
            allRooms?.map((room) => (
              <RoomDetailsCard
                key={room._id}
                roomData={room}
                checkin={checkin}
                checkout={checkout}
                status={status}
              />
            ))
          )}
        </div>
      )}
    </header>
  );
};

export default Rooms;
