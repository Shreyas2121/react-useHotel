import React, { useEffect, useState } from "react";

import { Hall } from "../types/types";
import HallDetailsCard from "../components/Cards/HallDetailsCard";

import Button from "react-bootstrap/Button";

import "../components/search.css";
import "../components/parallaxImage.css";

// import roomsBackground from "../assets/images/about_banner.jpg";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { checkHallAvailability, getHallByCat } from "../api";

const Halls = () => {
  const [hall, setHall] = useState<Hall[]>([]);

  const hallsQuery = useMutation({
    mutationFn: (data: { category: string; bookedDate: string }) =>
      checkHallAvailability(data),
  });

  const bookingHall =
    "https://content3.jdmagicbox.com/comp/jaipur/i6/0141px141.x141.211124181714.w3i6/catalogue/greet-banquet-hall-m-i-road-jaipur-banquet-halls-n91h0ooj1t.jpg?clr=664400";

  const [bookingDate, setBookingDate] = useState<any>();
  const [availability, setAvailability] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [hallType, setHallType] = useState("");

  const handleSearch = async (e) => {
    if (!bookingDate || !hallType) {
      toast.error("Please select hall type,booking dates");
      return;
    }

    e.preventDefault();

    const data = await hallsQuery.mutateAsync({
      category: hallType,
      bookedDate: new Date(bookingDate).toISOString(),
    });

    setAvailability(data);
    setClicked(true);
    window.scrollTo({
      top: 800,
    });
  };

  useEffect(() => {
    const fetchHall = async () => {
      const hall = await getHallByCat(hallType);
      setHall(hall);
    };

    fetchHall();
  }, [hallType]);

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${bookingHall})`, height: "50rem" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">HALLS</h1>
              <h4 className="mb-3">MAKE MERMORIES WITH YOUR LOVED ONES</h4>
              <br />
              <br />
              <br />
              <div id="search" className="search">
                <div className="search-inner-box">
                  Hall Type:
                  <select
                    id="select-hall-type"
                    className="input-select"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setHallType(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                  </select>
                  From :{" "}
                  <input
                    id="check-in"
                    className="input-date"
                    min={new Date().toISOString().split("T")[0]}
                    max={
                      new Date().getFullYear() +
                      1 +
                      "-" +
                      new Date().getMonth() +
                      "-" +
                      new Date().getDate
                    }
                    type="date"
                    onChange={(e) => setBookingDate(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    required
                  />
                </div>
                <div>
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
      </div>

      {!clicked ? (
        <div></div>
      ) : (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Hall</h6>
          <hr />
          {hallsQuery.isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <HallDetailsCard
                hallData={hall[0]}
                bookingDate={new Date(bookingDate)}
                availability={availability}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Halls;
