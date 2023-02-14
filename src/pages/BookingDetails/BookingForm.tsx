import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BookingHall, BookingRoom } from "../../types/types";
import "./bookingform.css";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api, bookHall, bookRoom, getAddons } from "../../api";

export const BookingForm = () => {
  const { user } = useAuth();

  const addonsQuery = useQuery({
    queryKey: ["addons"],
    queryFn: getAddons,
    retry: 0,
  });

  const addonsData = addonsQuery.data;

  const navigate = useNavigate();

  const location = useLocation();

  const key = location.state.key;

  if (key == "Room") {
    var { no, checkin, checkout, numOfDays, type, basePrice, totalPrice } =
      location.state;
  } else {
    var { no, bookingDate, type, basePrice, totalPrice } = location.state;
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const specialReqRef = useRef<HTMLTextAreaElement>(null);
  const couponRef = useRef<HTMLInputElement>(null);

  const [coupon, setCoupon] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonCouponRemoveRef = useRef<HTMLButtonElement>(null);

  const [apply, setApply] = useState(false);

  let total_price = totalPrice;

  let addOns = {};
  if (!addonsQuery.isLoading) {
    addonsData.forEach((item) => {
      addOns[item.name] = Number(item.price);
    });
  }

  const [selectedAddons, setSelectedAddons] = useState({
    addon: [],
  });

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    Object.values(filterAddons()).forEach((each: any) => {
      total_price += each;
    });
    setTotal(
      total_price +
        addOnPrice() -
        (total_price + addOnPrice()) * (discount / 100)
    );
  }, [selectedAddons]);

  const handleAddon = (e) => {
    if (e.target.checked) {
      setSelectedAddons({
        addon: [...selectedAddons.addon, e.target.value],
      });
    }
    if (!e.target.checked) {
      setSelectedAddons({
        addon: selectedAddons.addon.filter((item) => item !== e.target.value),
      });
    }
  };

  const filterAddons = () => {
    let a = {};
    selectedAddons.addon.forEach((each) => {
      if (Object.keys(addOns).includes(each)) {
        a[each] = addOns[each];
      }
    });
    return a;
  };

  const applyCoupon = async (e) => {
    e.preventDefault();
    const res = await api.post("coupon/validate", {
      coupon,
    });
    console.log(res);

    if (res.data === "Invalid Coupon") {
      toast.error(res.data);
    } else {
      setDiscount(res.data);
      toast.success("Coupon Applied Successfully");
      setApply(true);
      couponRef.current.disabled = true;
      buttonRef.current.disabled = true;
      let price = total * (res.data / 100);
      setTotal(total - price);
      buttonCouponRemoveRef.current.disabled = false;
    }
  };

  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    setApply(false);
    setTotal(totalPrice);
    setDiscount(0);
    toast.success("Coupon Removed Successfully");
    couponRef.current.value = "";
    couponRef.current.disabled = false;
    buttonRef.current.disabled = false;
    buttonCouponRemoveRef.current.disabled = true;
  };

  const addOnPrice = (): number => {
    let price = 0;
    Object.values(filterAddons()).forEach((each: any) => {
      price += each;
    });
    return price;
  };

  const calculateTotalPrice = (): number => {
    return (
      total_price +
      addOnPrice() -
      (total_price + addOnPrice()) * (discount / 100)
    );
  };

  const submitBooking = async (e: any) => {
    e.preventDefault();

    const specialReq = specialReqRef.current?.value;

    const selectedAddons = filterAddons();

    let bookingData: {
      message: string;
      booking: BookingRoom | BookingHall;
    };

    const commonData = {
      user: user._id,
      bookingDate: new Date(),
      specialRequest: specialReq,
      selectedAddons,
      category: type,
      basePrice,
      coupon: {
        coupon,
        discount: discount.toString(),
      },
      total: calculateTotalPrice(),
    };

    if (key == "Hall") {
      const data = {
        ...commonData,
        bookedDate: bookingDate,
      };

      bookingData = await bookHall(data);
    } else {
      const data = {
        ...commonData,
        numOfRooms: no,
        checkIn: checkin,
        checkOut: checkout,
      };

      bookingData = await bookRoom(data);
    }

    if (bookingData.message == "Booking created") {
      toast.success("Booking Successful");

      navigate("/booking/success", {
        state: {
          data: bookingData.booking,
          key,
        },
      });
    } else {
      toast.error("Booking Failed");
    }
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <Form id="c" onSubmit={submitBooking}>
          <div>
            <Container className="booking-details">
              <div id="container">
                {key == "Hall" ? (
                  <h2 id="title-of-form">BOOK A HALL WITH US</h2>
                ) : (
                  <h2 id="title-of-form">BOOK A ROOM WITH US</h2>
                )}
                <br />
                <div id="personal-details">
                  <Form.Group id="name-group" className="mb-3">
                    <Form.Label id="name-label">Name</Form.Label>
                    <Form.Control
                      id="name-id"
                      type="text"
                      value={user.name}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    id="email-group"
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label id="email-label" htmlFor="email" required>
                      E-mail
                    </Form.Label>
                    <Form.Control
                      ref={emailRef}
                      value={user.email}
                      type="email"
                      id="email"
                      name="visitor_email"
                      required={true}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                  </Form.Group>
                </div>
                <hr />

                <div id="details">
                  <div>
                    <Form.Group>
                      <FormLabel>
                        {key == "Hall" ? (
                          <p className="bold">
                            Date : {bookingDate.toDateString()}
                          </p>
                        ) : (
                          <div>
                            <p className="bold">
                              Check In : {checkin.toDateString()}
                            </p>
                            <p className="bold">
                              Check Out : {checkout.toDateString()}
                            </p>
                          </div>
                        )}
                      </FormLabel>
                    </Form.Group>
                  </div>

                  <div>
                    {key == "Hall" ? (
                      <div></div>
                    ) : (
                      <Form.Group>
                        <Form.Label htmlFor="adult" id="room-qnty">
                          <p className="bold">Number of rooms :</p> {no}
                        </Form.Label>
                      </Form.Group>
                    )}

                    <Form.Group>
                      <Form.Label htmlFor="adult" id="room-type">
                        <p className="bold">Type : </p>
                        {type}
                      </Form.Label>
                    </Form.Group>
                  </div>
                </div>

                <hr />
                <Form.Group>
                  <br />
                  <Form.Label id="addons"> Select Addons: </Form.Label>
                  {addonsQuery.isLoading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <div id="addon-list">
                      {Object.entries(addOns).map(([key, value]) => (
                        <Form.Group style={{ display: "flex" }}>
                          <Form.Check
                            className="checkbox-Form.Control"
                            id={key}
                            name={key}
                            value={key}
                            type="checkbox"
                            onChange={handleAddon}
                          />
                          <div>
                            <Form.Label className="checkbox" id="check-box">
                              {key} <br />{" "}
                            </Form.Label>
                            <p className="addon-price">₹{String(value)}</p>
                          </div>
                        </Form.Group>
                      ))}
                    </div>
                  )}
                </Form.Group>
                <hr />

                <Form.Group>
                  <Form.Label htmlFor="message" id="special-req">
                    Special Request?
                  </Form.Label>
                  <textarea
                    ref={specialReqRef}
                    id="message"
                    name="visitor_message"
                    placeholder="Tell us anything else that might be important."
                    defaultValue={""}
                  />
                  <hr />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="coupon" id="coupon">
                    Coupon Code:{" "}
                  </Form.Label>
                  <div id="coupon-section">
                    {" "}
                    <Form.Control
                      id="coupon-box"
                      type="text"
                      ref={couponRef}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button
                      id="coupon-btn"
                      ref={buttonRef}
                      disabled={coupon === ""}
                      onClick={applyCoupon}
                    >
                      Apply
                    </Button>
                    <Button
                      id="coupon-btn"
                      ref={buttonCouponRemoveRef}
                      disabled={!apply}
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </Container>
          </div>

          <div>
            <Container className="booking-details">
              <div className="price-details">
                <table id="booking-details-tables">
                  <tr>
                    <th>Details</th>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td> Base Price: </td>
                    <td> ₹ {basePrice}</td>
                  </tr>
                  {key == "Hall" ? (
                    <tr>
                      <td>Hall:</td>
                      <td>{no}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>Room(s):</td>
                      <td>{no}</td>
                    </tr>
                  )}

                  {key == "Hall" ? (
                    <tr>
                      <td>No. of Day(s):</td>
                      <td>{numOfDays}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>No. of Night(s):</td>
                      <td>{numOfDays}</td>
                    </tr>
                  )}

                  <td>
                    <hr />
                  </td>
                  <td>
                    <hr />
                  </td>

                  {key == "Hall" ? (
                    <tr>
                      <td className="base-prices">
                        {no} Hall x {numOfDays} Day(s):
                      </td>

                      <td>₹{totalPrice}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="base-prices">
                        {no} Room(s) x{" "}
                        {Math.abs(checkout.getTime() - checkin.getTime()) /
                          (1000 * 3600 * 24)}{" "}
                        Night(s):
                      </td>

                      <td>₹{totalPrice}</td>
                    </tr>
                  )}

                  <td>
                    <hr />
                  </td>
                  <td>
                    <hr />
                  </td>

                  <tr>
                    <td>Addons:</td>
                    <td>₹{addOnPrice()}</td>
                  </tr>

                  <tr>
                    <td>Sub Total:</td>
                    <td>₹{totalPrice + addOnPrice()}</td>
                  </tr>

                  <tr>
                    <td>
                      <hr />
                    </td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>Coupon Discount:</td>
                    <td>{discount}%</td>
                  </tr>
                  <tr>
                    <td>Discount Amount:</td>
                    <td>₹{(total_price + addOnPrice()) * (discount / 100)}</td>
                  </tr>
                  <tr>
                    <td>
                      <hr />
                    </td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                  <tr style={{ fontSize: "1.3rem" }}>
                    <td>Total : </td>
                    <td>₹{calculateTotalPrice()}</td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                </table>
                <Button variant="primary" type="submit" id="submit-booking-btn">
                  Book Now
                </Button>
              </div>
            </Container>
          </div>
        </Form>
      )}
    </>
  );
};

export default BookingForm;
