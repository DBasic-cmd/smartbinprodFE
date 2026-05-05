// stores/useResidentStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axiosConfig";

const useResidentStore = create(
  persist(
    (set) => ({
      residentInfo: {
        payerID: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNo: "",
        address: null,
        passport: "",
        accountNo: "",
        userType: "",
        buildingType: "",
        landMark: "",
        lga: "",
        nextPickupDate: "",
      },

      setResidentInfo: (info) => set({ residentInfo: info }),

      updateResidentInfo: (key, value) =>
        set((state) => ({
          residentInfo: {
            ...state.residentInfo,
            [key]: value,
          },
        })),

      clearResidentInfo: () =>
        set({
          residentInfo: {
            payerID: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNo: "",
            address: null,
            passport: "",
            accountNo: "",
            userType: "",
            buildingType: "",
            landMark: "",
            lga: "",
            nextPickupDate: "",
          },
        }),

      // ✅ Updated function with complete field mapping including phoneNumber
      fetchResidentInfo: async () => {
        try {
          const response = await api.get("/residents/profile");

          if (response.data.success) {
            const data = response.data.data;

            // Map ALL API response fields to match residentInfo structure
            const mappedInfo = {
              payerID: data.payerId || "",
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              emailAddress: data.email || "",
              phoneNo: data.phoneNumber || "", // Now included in response
              address: data.address || null,
              passport: data.profilePicture?.trim() || "", // trim whitespace
              accountNo: data.accountNumber || "",
              userType: "resident",
              lawmaCustomerType: data.lawmaCustomerType || "",
              buildingType: data.buildingType || "",
              landMark: data.landmark || "",
              lga: data.localGovermentArea || "", // Note: API has typo "localGovermentArea"
              nextPickupDate: data.nextPickupDate || "",
            };

            set({ residentInfo: mappedInfo });
          }
        } catch (error) {
          console.error("Error fetching resident info:", error);
        }
      },
    }),
    {
      name: "resident-storage",
    }
  )
);

export default useResidentStore;
