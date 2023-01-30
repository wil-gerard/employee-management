import { GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";

export interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export interface Row {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  departmentId: string;
  managerId?: string;
}
