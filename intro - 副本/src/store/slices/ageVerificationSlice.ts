import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgeVerification } from '../../types';

interface AgeVerificationState {
  verifications: AgeVerification[];
  loading: boolean;
  error: string | null;
}

const initialState: AgeVerificationState = {
  verifications: [],
  loading: false,
  error: null,
};

const ageVerificationSlice = createSlice({
  name: 'ageVerification',
  initialState,
  reducers: {
    submitVerification: (state, action: PayloadAction<AgeVerification>) => {
      state.verifications.push(action.payload);
    },
    updateVerificationStatus: (
      state,
      action: PayloadAction<{ userId: string; status: 'verified' | 'rejected' }>
    ) => {
      const verification = state.verifications.find(v => v.userId === action.payload.userId);
      if (verification) {
        verification.verificationStatus = action.payload.status;
      }
    },
  },
});

export const { submitVerification, updateVerificationStatus } = ageVerificationSlice.actions;
export default ageVerificationSlice.reducer; 