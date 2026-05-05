import { create } from "zustand";
import agentRoutes from "../router/agentRoutes";
import residentRoutes from "../router/residentRoutes";
import facilitymgrRoutes from "../router/facilityManagerRoutes";
import corporateRoutes from "../router/corporateRoutes";

const useRouteStore = create((set) => ({
  userType: localStorage.getItem("userType") || null,
  routes: [],

  setRoutes: () => {
    if (localStorage.getItem("userType") === "agent") {
      set({ routes: agentRoutes });
    }
    if (localStorage.getItem("userType") === "resident") {
      set({ routes: residentRoutes });
    }
    if (localStorage.getItem("userType") === "facilitymgr") {
      set({ routes: facilitymgrRoutes });
    }
    if (localStorage.getItem("userType") === "corporate") {
      set({ routes: corporateRoutes });
    }
  },
}));

export default useRouteStore;
