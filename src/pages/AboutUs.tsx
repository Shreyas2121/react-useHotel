import Reviewcards from "../components/Cards/Reviewcards";

import roomsBackground from "../assets/images/about_banner.jpg";
import hotelPicture from "../assets/images/abouts_us.png";
import map from "../assets/images/map.jpg";

const Aboutus = () => {
  return (
    <div>
      <header>
        <div
          className="p-5 text-center bg-image parallax"
          style={{
            backgroundImage: `url(${roomsBackground})`,
            height: "20rem",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">ABOUT US</h1>
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{
            height: "40rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div className="row">
            <div className="col">
              <div>
                <h1>Our History</h1>
                <br />
                <p>
                  Our properties and services have set industry level benchmark
                  for us as well as our competitors. Making us Asias top hotel
                  chains to serve world class Luxury that is truly unompromised.
                  A brand that works on principles and values. Drawing
                  inspiration from time-honored Athenian wisdom, Academias
                  Hotel, Autograph Collection offers a one-of-a-kind backdrop
                  for your visit to Jaipur's capital city. Perfectly situated in
                  the heart of Athens' most renowned shopping district, we're
                  within walking distance of the Acropolis and other legendary
                  destinations. You'll find yourself entranced by our elegant
                  decor, which echoes ancient Greek architecture, in addition to
                  the stunning contemporary design elements that exist
                  throughout our luxury hotel. Experience a distinctive blend of
                  historic charm, intellectual creativity and contemporary
                  comfort at useHotel. We are proud to be the best in the
                  industry and we are working consistently to be the best in the
                  industry for as long as the legacy stays.
                </p>
              </div>
            </div>

            <div className="col">
              <img src={hotelPicture} alt="useMango Photo" />
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{
            height: "40rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div className="row">
            <div className="col">
              <img src={map} alt="map" height={400} width={1000} />
            </div>

            <div className="col">
              <div style={{ fontSize: "1.5rem" }}>
                <h1>Visit Us</h1>
                <p>
                  <br />
                  415, UseHotel, Jaipur
                  <br />
                  Rajasthan, India.
                  <br />
                  <br />
                  +91-9275693451
                  {/* <br/><h6>(Mon to Fri 9am to 6 pm)</h6> */}
                  {/* <br/>(Mon to Fri 9am to 6 pm) */}
                </p>
                <p>
                  <br />
                  support@usehotel.com
                  {/* <br/>(Send us your query anytime!) */}
                  {/* <br/><h6>(Send us your query anytime!)</h6> */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Reviewcards path="reviews" />

        <br />
        <br />
      </header>
    </div>
  );
};

export default Aboutus;
