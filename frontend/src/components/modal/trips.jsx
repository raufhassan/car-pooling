import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Cookies from 'js-cookie';

const TripCard = ({ driver, riders, tripId , handleAccept }) => (
  <Card>
    <Card.Body>
      <Card.Text>
        Driver: {driver?.name} - ({driver?.gender})
        <br />
        Riders:
        {riders?.map((el) => (
          <>
            {" "}
            <span>
              {el?.name} - ({el?.gender})
            </span>
            <br />
          </>
        ))}
      </Card.Text>
      <Button onClick={ () => handleAccept(tripId)} variant="success">Accept</Button>
    </Card.Body>
  </Card>
);

const TripModal = ({ show, setShow, trips, setActiveTrip, src, dst}) => {
  const handleClose = () => setShow(false);

  
  const handleAccept = (tripId) => {
    // e.preventDefault();


    return fetch(process.env.REACT_APP_END_POINT + "/trip/acceptRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Coookie: Cookies.get("tokken"),
      },
      body: JSON.stringify({ id: tripId, src, dst }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else if (response.status === 401)
          // setToken(null);
          throw new Error(response.statusText);
      })
      .then((responseJson) => {
        setActiveTrip(responseJson._id);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        // window.location.reload();
      });
}


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Matched Trips</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trips.map((el) => (
            <TripCard driver={el.driver} riders={el.riders} tripId={el._id} handleAccept={handleAccept}/>
          ))}
        </Modal.Body>
         <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TripModal;
