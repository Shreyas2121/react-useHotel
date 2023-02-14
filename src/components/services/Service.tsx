import "./service.css";
import "../parallaxImage.css"

import {MDBContainer, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';

import {CgGym} from 'react-icons/cg'
import {FaSwimmingPool} from 'react-icons/fa'
import {IoIosRestaurant} from 'react-icons/io'
import {MdOutlineSportsTennis} from 'react-icons/md'
import {MdLocalBar} from 'react-icons/md'
import {TbMassage} from 'react-icons/tb'

import servicesBackground from "../../assets/images/facilites_bg.jpg";

const Service = () => {
  return (
    <MDBContainer fluid style={{
      height: "50rem",
      backgroundImage: `url(${servicesBackground})`,
    }}
    className="parallax"
    >
      <br/>
      <div className="container-top-div">
        <MDBTypography tag='h1' className='mb-0' style={{color:"black", fontWeight:"bold"}}>
          Royal Facilities
        </MDBTypography>
        <MDBTypography tag='small'>
          The true defination of luxury and comfort.
        </MDBTypography>
      </div>


      <MDBRow className='mb-3'>
        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><FaSwimmingPool/></h2>
            <MDBCardTitle>Swimming Pool</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent swimming pool facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>

        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><CgGym/></h2>
            <MDBCardTitle>Gymnesium</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent gymnesium facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>        
        </MDBCol>

        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><MdLocalBar/></h2>
            <MDBCardTitle>Bar</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent bar facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
      </MDBRow>
      <br/>

      <MDBRow
      className='mb-3'>
        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><IoIosRestaurant/></h2>
            <MDBCardTitle>Restaurant</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent restaurant facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><MdOutlineSportsTennis/></h2>
            <MDBCardTitle>Sports CLub</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent sports club facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>        </MDBCol>
        <MDBCol md='3'>
        <MDBCard className="boxes">
          <MDBCardBody>
            <h2><TbMassage/></h2>
            <MDBCardTitle>Spa</MDBCardTitle>
            <MDBCardText>
              Enjoy your stay with excellent spa facilities.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
    
  );
};

export default Service;