import React, { useState } from "react";
import { ILineItem, IOrder } from "../../../types";
import "./index.css";
import { formatTextLength } from "../../../utils/format";

interface Props {
  item: ILineItem;
  setInvoiceData: any;
}

const LineItem = ({ item, setInvoiceData }: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editableItem, setEditableItem] = useState(item);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    setInvoiceData((prevData: IOrder) => ({
      ...prevData,
      lineItems: prevData.lineItems.map((data: any) => {
        if (item.id === data.id) {
          return editableItem;
        }
        return data;
      }),
    }));
    setEditMode(false);
  };

  const handleInputChange = (e: any) => {
    setEditableItem((prevData: ILineItem) => ({
      ...prevData,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    }));
  };

  return (
    <tr className="item last">
      {isEditMode && (
        <>
          <td
            style={{
              display: "flex",
            }}
          >
            <button
              className="action-button"
              title="Cancel"
              onClick={handleEditMode}
            >
              <i className="fas fa-times"></i>
            </button>
            <button className="action-button" title="Save" onClick={handleSave}>
              <i className="fas fa-check"></i>
            </button>
          </td>
          <td>
            <input
              className="line-item-input"
              name="description"
              defaultValue={item.description}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              name="price"
              className="line-item-input"
              defaultValue={item.price}
              onChange={handleInputChange}
              type="number"
            />
          </td>
        </>
      )}
      {!isEditMode && (
        <>
          <td>
            <button
              className="action-button"
              title="Edit"
              onClick={handleEditMode}
            >
              <i className="fas fa-edit"></i>
            </button>
          </td>
          <td>{formatTextLength(item.description, 40)}</td>
          <td>{item.price} EUR</td>
        </>
      )}
    </tr>
  );
};

export default LineItem;
