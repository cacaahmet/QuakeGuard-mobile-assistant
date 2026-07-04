import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface FamilyState {
  meetingPoint: string;
  contacts: Contact[];
}

const initialState: FamilyState = {
  meetingPoint: "Merkez Parkı",
  contacts: [
    { id: "1", name: "Anne", phone: "05000000000" },
    { id: "2", name: "Baba", phone: "05000000001" },
  ],
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    updateMeetingPoint: (state, action: PayloadAction<string>) => {
      state.meetingPoint = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    },
  },
});

export const { updateMeetingPoint, addContact, deleteContact } = familySlice.actions;
export default familySlice.reducer;