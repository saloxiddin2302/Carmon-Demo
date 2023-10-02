import { Accordion, Button, Form, Modal, Table } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";

const DebtsP = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selected, setSelected] = useState(null);



  const [debt, setDebt] = useState({
    id: "",
    price: null,
    name: "",
    phone: "",
    note: "",
    date: "",
  });
  const [debts, setDebts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showForm = () => {
    setSelected(null);
    handleShow();
    setValidated(false);
    setDebt({
      price: null,
      name: "",
      phone: "",
      note: "",
      date: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity()) {
      if (selected) {
        let newDebts = debts.map((el) => {
          if (el.id === selected) {
            return { ...debt, id: selected };
          } else {
            return el;
          }
        });
        setDebts(newDebts);
      } else {
        setDebts([...debts, { ...debt, id: debts.length + 1 }]);
      }
      handleClose();
    }
  };

  const handleChange = (e) => {
    setDebt({ ...debt, [e.target.name]: e.target.value });
  };

  // Edit debt
  const edit = (id) => {
    let selectedDebt = debts.find((debt) => debt.id === id);
    setDebt({ ...selectedDebt });
    setSelected(id);
    handleShow();
  };

  // Delete debt
  const deleteDebt = (id) => {
    const updatedDebts = debts.filter((debt) => debt.id !== id);
    setDebts(updatedDebts);
  };

  // Calculate total debt price
  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = debts.reduce((total, curr) => total + (+curr.price), 0);
      setTotalPrice(totalPrice);
    };

    const getCurrentTime = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;
      setCurrentTime(currentTime);
    };

    calculateTotalPrice();
    getCurrentTime();

    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000 * 60); // Vaqt har bir daqiqa bilan yangilanadi

    return () => clearInterval(interval);
  }, [debts]);


  


  return (
    <Fragment>
      <Accordion className="Accardion-debts" defaultActiveKey="2" alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="accardion-header">
            Debtn item 
            <button className="btn btn-danger mr-10 ">{debts.length}</button>
            <h5 className="total">Total Debt Price: <button className="btn btn-success"> {totalPrice}</button>  </h5>
          </Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Price</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {debts.map((debt, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{debt.price}</td>
                    <td>{debt.name}</td>
                    <td>{debt.phone}</td>
                    <td>{debt.note}</td>
                    <td>{debt.date}</td>
                      <td>{currentTime}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => edit(debt.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDebt(debt.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>DebtsP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      value={debt.price}
                      name="price"
                      onChange={handleChange}
                      type="number"
                      placeholder="Price"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>step</Form.Label>
                    <Form.Control
                      required
                      value={debt.id}
                      name="id"
                      onChange={handleChange}
                      type="number"
                      placeholder="step"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      value={debt.name}
                      name="name"
                      onChange={handleChange}
                      type="text"
                      placeholder="Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      required
                      value={debt.phone}
                      name="phone"
                      onChange={handleChange}
                      type="text"
                      placeholder="Phone"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      required
                      value={debt.note}
                      name="note"
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Note"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      required
                      value={debt.date}
                      name="date"
                      onChange={handleChange}
                      type="date"
                      placeholder="Date"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please fill !
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    {selected ? "Save" : "Add"} debt
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="showAdd">
        <Button onClick={showForm}>+</Button>
      </div>
    </Fragment>
  );
};

export default DebtsP;
