import React, { lazy, Suspense } from "react";
import LoadingComponent from "../components/LoadingComponent";



const HomePage = lazy(() => import("../pages/HomePage"));
const Confirmation = lazy(() => import("../pages/Confirmation"));
const AppManager = lazy(() => import("../pages/ApplicationManager"));
const BillConfirm = lazy(() => import("../pages/Billconfirm"));
const NewKycApplication = lazy(() => import("../pages/NewKYCApplication"));
const ApplyForSmartBinForm = lazy(() => import("../pages/ApplyForSmartBinForm"));
const KYCApplication = lazy(() => import("../pages/KYCApplicationForm"));
const Headless = lazy(() => import("../pages/ApplyForSmartBinFormHeadless"));
const Bills = lazy(() => import("../pages/Bills"));
const Wastes = lazy(() => import("../pages/Wastes"));
const Wallet = lazy(() => import("../pages/Wallet"));
const PaymentReceipts = lazy(() => import("../pages/PaymentsReceipts"));
const PaymentHistory = lazy(() => import("../pages/Payments"));
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'));
const Reports = lazy(() => import("../pages/Reports"));
const ServiceConfiguration = lazy(() => import('../pages/ServiceConfiguration'))
const NotificationsPage = lazy(() => import('../pages/Notifications'))
const HelpAndSupportPage = lazy(() => import('../pages/HelpAndSupport'))
const SubscriptionPage = lazy(() => import('../pages/SubscriptionPage'))
const PaymentsReport = lazy(() => import('../pages/PaymentsReport'))
const SmartBinReport = lazy(() => import('../pages/SmartBinReport'))
const Receipt = lazy(() => import('../pages/Receipt'))
const WasteReport = lazy(() => import('../pages/WasteReports'))

//////propagate file changes to the topbar component
const residentRoutes = [
    {
        path: "/dashboard",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/appmanager",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <AppManager />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/applyforsmartbin",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <ApplyForSmartBinForm />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/bills",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Bills />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/billconfirm",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <BillConfirm />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/headless",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Headless />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/kycapplication",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <KYCApplication />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/newkycapplication",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <NewKycApplication />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/notifications-settings",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <NotificationsPage />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/payment-report",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <PaymentsReport />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/helpandSupport",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <HelpAndSupportPage />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/receipt",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Receipt />
                </ProtectedRoute>
            </Suspense>
        ),
    },

    {
        path: "/reports",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Reports />
                </ProtectedRoute>
            </Suspense>
        ),
    },

    {
        path: "/service",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <ServiceConfiguration />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/smartbinreport",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <SmartBinReport />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/subscription-settings",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <SubscriptionPage />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/wastes",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Wastes />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/payments",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <PaymentHistory />
                </ProtectedRoute>
            </Suspense>
        ),

    },
    {
        path: "/receipts",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <PaymentReceipts />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/wallet",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <Wallet />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/wastereport",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <ProtectedRoute>
                    <WasteReport />
                </ProtectedRoute>
            </Suspense>
        ),
    },
]

export default residentRoutes