import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axiosConfig";

const useCorporateStore = create(
  persist(
    (set) => ({
      corporateInfo: {
        payerID: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNo: "",
        address: null,
        passport: "",
        accountNo: "",
        businessName: "",
        lawmaCustomerType: "",  
        userType: "",
        buildingType: "",
        landMark: "",
        lga: "",
        nextPickupDate: "",
      },

      setCorporateInfo: (info) => set({ corporateInfo: info }),

      updateCorporateInfo: (key, value) =>
        set((state) => ({
          corporateInfo: {
            ...state.corporateInfo,
            [key]: value,
          },
        })),

      clearCorporateInfo: () =>
        set({
          corporateInfo: {
            payerID: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            businessName: "",
            lawmaCustomerType: "",
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
      fetchCorporateInfo: async () => {
        try {
          const response = await api.get("/corporate/profile");

          if (response.data.success) {
            const data = response.data.data;

            // Map ALL API response fields to match corporateInfo structure
            const mappedInfo = {
              payerID: data.payerId || "",
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              emailAddress: data.email || "",
              phoneNo: data.phoneNumber || "", // Now included in response
              address: data.address || null,
              passport: data.profilePicture?.trim() || "", // trim whitespace
              accountNo: data.accountNumber || "",
              userType: "Corporate",
              businessName : data.businessName || "", 
              lawmaCustomerType: data.lawmaCustomerType || "",
              buildingType: data.buildingType || "",
              landMark: data.landmark || "",
              lga: data.localGovermentArea || "", // Note: API has typo "localGovermentArea"
              nextPickupDate: data.nextPickupDate || "",
            };

            set({ corporateInfo: mappedInfo });
          }
        } catch (error) {
          console.error("Error fetching corporate info:", error);
        }
      },
    }),
    {
      name: "corporate-storage",
    }
  )
);

export default useCorporateStore;
