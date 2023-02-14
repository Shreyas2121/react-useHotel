import "./grid.css";

import { MDBContainer, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";

const PhotoGrid = () => {
  return (
    <MDBContainer className="grid-container">
      <div className="container-div">
        <MDBTypography tag="h1" className="mb-0">
          ACCOMADATION
        </MDBTypography>
        <MDBTypography tag="small" className="text-muted">
          We provide the best accomadation facilities. Enjoy your stay with us.
        </MDBTypography>
      </div>

      <MDBRow className="mb-3">

        <MDBCol size="3">
          <Link to="/rooms">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://media-cdn.tripadvisor.com/media/photo-s/0b/f2/bc/a2/single-room-has-a-single.jpg"
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Basic</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

        <MDBCol size="3">
          <Link to="/rooms">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYJu5rTwm2LBvvdtkKuc10T-qFXTta4HLvJAGf55mG7Qx1cTjB"
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Suite</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

        <MDBCol size="3">
          <Link to="/rooms">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSmDDeqwsXamzfNfzDiwaYDvtjCmeO2UTGJKXsaC_Q0LvjC2alr"
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Delux</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

      </MDBRow>

      <br />

      <div className="container-div">
        <MDBTypography tag="h1" className="mb-0">
          GET TOGETHER
        </MDBTypography>
        <MDBTypography tag="small" className="text-muted">
          We provide the best Halls for all the best moments for you and your loved onces. Enjoy your events with us.
        </MDBTypography>
      </div>

      <MDBRow className="mb-3">

        <MDBCol size="3">
          <Link to="/halls">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://cdn0.weddingwire.in/vendor/0450/3_2/960/jpeg/setup2_15_80450-162745330529859.jpeg"
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Wedding Hall</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

        <MDBCol size="3">
          <Link to="/halls">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://media.istockphoto.com/photos/conference-room-with-a-long-table-and-lots-of-chairs-picture-id98395721?k=20&m=98395721&s=612x612&w=0&h=aLPhhimrM4OYCsoFiK2EbMQqgKvNVSkPBl1M9Od0BYc="
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Conference Hall</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

        <MDBCol size="3">
          <Link to="/halls">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://www.chennaiconventioncentre.com/wp-content/uploads/2019/03/ccc-blog-825x412.jpg"
                  // fluid
                  className="photogridimages"
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle><h4>Birthday Party</h4></MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

      </MDBRow>
      <br/>
    </MDBContainer>
  );
};

export default PhotoGrid;
