"use client";

import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchTableData } from "@/redux/features/tableSlice";
import { redirect } from "next/navigation";

const TablePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) redirect("/login");

  dispatch(fetchTableData());

  const rows: GridRowsProp = useAppSelector((state) => state.table.posts);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    { field: "birthday_date", headerName: "B-Day", width: 200, editable: true },
    { field: "phone_number", headerName: "Phone", width: 200, editable: true },
    { field: "address", headerName: "Address", width: 200, editable: true },
  ];

  return (
    <div>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default TablePage;
