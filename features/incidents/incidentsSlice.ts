// src/features/example/exampleSlice.ts
import { Incident, IncidentPOC, PointOfContact } from '@/models/models';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface IncidentsState {
  data: Array<Incident>;
  selected: Array<Incident>;
  detail: Incident | null;
  pointsOfContact: Array<PointOfContact>;
  loading: boolean;
  error: string | null;
}

const initialState: IncidentsState = {
  data: [],
  selected: [],
  detail: null,
  pointsOfContact: [],
  loading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  'incidents/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://apitst.greenmountainpower.com/api/v2/outages/incidents?active=true');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating data
export const updateData = createAsyncThunk(
  'incidents/updateData',
  async (item:Incident, { rejectWithValue }) => {
    try {
      return item;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const incidentsSlice = createSlice({
  name: 'Incidents',
  initialState,
  reducers: {
    viewDetail(state, action: PayloadAction<Incident>) {
      state.detail = action.payload;
    },
    dismissDetail(state) {
      state.detail = null;
    },
    addPOCRecord(state, action: PayloadAction<PointOfContact>) {
      state.pointsOfContact.push(action.payload);
    },
    cloneAndSelectItem(state, action: PayloadAction<number>) {
      const itemToClone = state.data.find((item) => item.id === action.payload);
      if (itemToClone) {
        const clonedItem = { ...itemToClone };
        state.selected.push(clonedItem);
      }
    },
    removeSelectedItem(state, action: PayloadAction<number>) {
      const itemToRemove = state.selected.findIndex((item) => item.id === action.payload);
      if (itemToRemove > -1) {
        state.selected.splice(itemToRemove, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Array<Incident>>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<Incident>) => {
        state.loading = false;
        // get the index of selected and data
        const selectedIdx = state.selected.findIndex((item) => item.id === action.payload.id);
        const dataIdx = state.data.findIndex((item) => item.id === action.payload.id);
        state.selected.splice(selectedIdx, 1, action.payload);
        state.data.splice(dataIdx, 1, action.payload);
        state.pointsOfContact.push({ createdAt: Date().toString(), incidentId: action.payload.id, action: 'update', notes: 'Updated Record', employeeId: 1 });
      })
      .addCase(updateData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { cloneAndSelectItem, removeSelectedItem, addPOCRecord, viewDetail, dismissDetail } = incidentsSlice.actions;

export default incidentsSlice.reducer;
