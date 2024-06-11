import Layout from '../Layout/Layout.js';
import Customer_mgmt from '../Components/Customer/Customer_mgmt.js';
import Inventory_mgmt from '../Components/Inventory/Inventory_mgmt.js';
import Sales_mgmt from '../Components/Sales/Sales_mgmt.js';
import Financial_mgmt from '../Components/Financial/Financial_mgmt.js';
import Reservation_mgmt from '../Components/Reservation/Reservation_mgmt.js';
import Board from '../Components/Board/Board.js';

export const RouterInfo = [
  {
    path: "/",
    element: <Layout />,
    children: [
     
      {
        path: "Customer_mgmt",
        element: <Customer_mgmt />,
        label: 'customer'
      },
      {
        path: "Inventory_mgmt",
        element: <Inventory_mgmt />,
        label: 'inventory'
      },
      {
        path: "Sales_mgmt",
        element: <Sales_mgmt />,
        label: 'sales'
      },
      {
        path: "Financial_mgmt",
        element: <Financial_mgmt />,
        label: 'financial'
      },
      {
        path: "Reservation_mgmt",
        element: <Reservation_mgmt />,
        label: 'reservation'
      },
      {
        path: "Board",
        element: <Board />,
        label: 'board'
      },
    ]
  },
];