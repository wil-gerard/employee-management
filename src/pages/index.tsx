import Head from "next/head";
import { Box, Container, Typography, Link, Button } from "@mui/material";
import { AcUnit } from "@mui/icons-material";
import { UserData } from "@/data/UserDataJson";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import useLocalStorageState from "use-local-storage-state";
import EditToolbar from "@/components/EditToolbar";

export default function Home() {
  const [rows, setRows] = useLocalStorageState("rows", {
    defaultValue: UserData.people,
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [pageSize, setPageSize] = useState<number>(5);

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = newRow;
    // @ts-ignore
    //setRows updates the local storage persisted state row if it exists
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const getDepartmentName = (id: string) => {
    const department = UserData.departments.find((department) => department.id === id);
    return department?.name;
  }

  const getManagerName = (id: string) => {
    const manager = UserData.people.find((manager) => manager.id === id);
    return manager ? `${manager?.firstName} ${manager?.lastName}` : null;
  }

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Job title",
      width: 160,
      editable: true,
    },
    {
      field: "managerId",
      headerName: "Manager",
      editable: true,
      width: 160,
      valueFormatter: (params) => getManagerName(params.value)
    },
    {
      field: "departmentId",
      headerName: "Department",
      editable: true,
      width: 160,
      valueFormatter: (params) => getDepartmentName(params.value)
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="1"
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="2"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="3"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="4"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Head>
        <title>Employee Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          pt={4}
          pb={3}
        >
          <Typography variant="h4" component="h1" fontWeight={600} pb={2}>
            Employee Management
          </Typography>
          <Typography variant="body1">
            Made with <AcUnit /> in Minneapolis by{" "}
            <Link
              href={"https://github.com/wil-gerard"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wil Gerard
            </Link>
          </Typography>
        </Box>
        <Box style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.id}
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
