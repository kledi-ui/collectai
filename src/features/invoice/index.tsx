import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/cai_logo.svg";
import "./index.css";
import { IOrder, ILineItem } from "../../types";
import LineItem from "./line-item";
import UploadFile from "../../components/upload-file";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState<IOrder | null>(null);
  const vatValue = 19;

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = () => {
    fetch("./invoice.json")
      .then((res) => res.json())
      .then((data) => setInvoiceData(data))
      .catch((error) => console.error("Error fetching invoice data:", error));
  };

  const calculateTotalPrice = (): number => {
    if (invoiceData) {
      return invoiceData.lineItems.reduce((sum, item) => sum + item.price, 0);
    }
    return 0;
  };

  const calculateVatAmount = (): number => {
    return (calculateTotalPrice() * vatValue) / 100;
  };

  return (
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr className="top">
          <td colSpan={3}>
            <table>
              <tbody>
                <tr>
                  <td className="title">
                    <img src={Logo} className="invoice-logo" alt="logo" />
                  </td>
                  <td>
                    Invoice #: 39291 <br />
                    Created: {invoiceData?.createdAt} <br />
                    Due: {invoiceData?.dueAt}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr className="information">
          <td colSpan={3}>
            <table>
              <tbody>
                <tr>
                  <td>
                    collectAI GmbH.
                    <br />
                    20457 Hamburg
                    <br />
                    Hamburg, Germany
                  </td>

                  <td>
                    {invoiceData?.company}
                    <br />
                    {invoiceData?.fullName} <br />
                    {invoiceData?.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr className="heading">
          <td>Actions</td>
          <td>Item</td>
          <td>Price</td>
        </tr>

        {invoiceData?.lineItems.map((item: ILineItem) => (
          <LineItem item={item} setInvoiceData={setInvoiceData} />
        ))}

        <tr className="total">
          <td></td>
          <td></td>
          <td>Total: {calculateTotalPrice().toFixed(3)} EUR</td>
        </tr>
        <tr className="vat">
          <td></td>
          <td></td>
          <td>
            VAT ({vatValue}%): {calculateVatAmount().toFixed(3)} EUR
          </td>
        </tr>
        <tr>
        <td colSpan={3}>
            <table>
              <tbody>
                <tr>
                  <td>
                  <UploadFile setInvoiceData={setInvoiceData}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Invoice;
