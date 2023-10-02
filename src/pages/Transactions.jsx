import React, { Fragment, useEffect, useState } from "react";
import { Accordion, Button, Table, Modal, Form } from "react-bootstrap";

const Transactions = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selected, setSelected] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const [debt, setDebt] = useState({
    id: "",
    price: null,
    select: null,
    note: "",
    date: "",
  });

  const [debts, setDebts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showForm = () => {
    handleShow();
    setSelected(null);
    setValidated(false);
    setDebt({
      id: "",
      price: null,
      select: null,
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
            return debt;
          } else {
            return el;
          }
        });
        setDebts(newDebts);
        setIdCounter(idCounter + 1);
      } else {
        setDebts([...debts, { ...debt, id: idCounter }]);
        setIdCounter(idCounter + 1);
      }
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDebt((prevDebt) => ({
      ...prevDebt,
      [name]: value,
    }));
  };

  const edit = (id) => {
    let debt = debts.find((debt) => debt.id === id);
    setDebt({ ...debt });
    setSelected(id);
    handleShow();
  };

  const deleteDebt = (id) => {
    const updatedDebts = debts.filter((debt) => debt.id !== id);
    setDebts(updatedDebts);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = debts.reduce((total, curr) => total + (+curr.price), 0);
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [debts]);

  const renderCategoryItems = () => {
    const categories = Array.from(new Set(debts.map((debt) => debt.select)));

    return categories.map((category) => {
      const filteredDebts = debts.filter((debt) => debt.select === category);

      return (
        <div className="tabil-1">
          <div key={category}>
          <div className="category">
          <h3>{category}  </h3> 
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Price</th>
                <th>Category</th>
                <th>Note</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDebts.map((debt, index) => (
                <tr key={debt.id}>
                  <td>{index + 1}</td>
                  <td>{debt.price}</td>
                  <td>{debt.select}</td>
                  <td>{debt.note}</td>
                  <td>{debt.date}</td>
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
        </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
       <h5 className="total">Total Debt Price: <button className="btn btn-success"> {totalPrice}</button> </h5>
      <Accordion className="Accardion-debts-1" activeKey="0" defaultActiveKey="0">
     
        {renderCategoryItems()}
      </Accordion>

      <div className="showAdd">
        <Button onClick={showForm}>+</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selected ? "Edit Debt" : "Add Debt"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={debt.price}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid price.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="select"
                value={debt.select}
                onChange={handleChange}
                required
              >
                <option value="">Category</option>
                <option value="Tranposrtlar">Tranposrtlar</option>
                <option value="Food">Food</option>
                <option value="Phone"> Phone</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                name="note"
                value={debt.note}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={debt.date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {selected ? "Save Changes" : "Add"}
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Transactions;
