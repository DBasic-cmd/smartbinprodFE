// stores/useAgentStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAgentStore = create(
  persist(
    (set) => ({
      agentInfo: {
        payerID: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNo: '',
        address: null,
        passport: '',
        accountNo: '',
        userType: '',
        buildingType: '',
        landMark: '',
        lga: '',
        nextPickupDate: ''
      },

      setAgentInfo: (info) => set({ agentInfo: info }),

      updateAgentInfo: (key, value) =>
        set((state) => ({
          agentInfo: {
            ...state.agentInfo,
            [key]: value,
          },
        })),

      clearAgentInfo: () =>
        set({
          agentInfo: {
            payerID: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNo: '',
            address: null,
            passport: '',
            accountNo: '',
            userType: '',
            buildingType: '',
            landMark: '',
            lga: '',
            nextPickupDate: ''
          },
        }),
    }),
    {
      name: 'agent-storage', // unique key in localStorage
    }
  )
);

export default useAgentStore;
