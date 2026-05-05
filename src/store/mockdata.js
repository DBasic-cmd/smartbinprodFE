// Mocked data with 12 elements per array

const bills = [
    { billId: "#OD12589048", dueDate: "21-01-25", service: "Waste Bin Disposal", amount: 20000, status: "Pending" },
    { billId: "#OD12589049", dueDate: "22-01-25", service: "Waste Bin Disposal", amount: 11250, status: "Pending" },
    { billId: "#OD12589050", dueDate: "23-01-25", service: "Waste Bin Disposal", amount: 15000, status: "Pending" },
    { billId: "#OD12589051", dueDate: "24-01-25", service: "Waste Bin Disposal", amount: 20000, status: "Pending" },
    { billId: "#OD12589052", dueDate: "25-01-25", service: "Waste Bin Disposal", amount: 9500, status: "Pending" },
    { billId: "#OD12589053", dueDate: "26-01-25", service: "Waste Bin Disposal", amount: 17000, status: "Pending" },
    { billId: "#OD12589054", dueDate: "27-01-25", service: "Waste Bin Disposal", amount: 12500, status: "Pending" },
    { billId: "#OD12589055", dueDate: "28-01-25", service: "Waste Bin Disposal", amount: 6000, status: "Pending" },
    { billId: "#OD12589056", dueDate: "29-01-25", service: "Waste Bin Disposal", amount: 12600, status: "Pending" },
    { billId: "#OD12589057", dueDate: "30-01-25", service: "Waste Bin Disposal", amount: 3500, status: "Pending" },
    { billId: "#OD12589058", dueDate: "31-01-25", service: "Waste Bin Disposal", amount: 22000, status: "Pending" },
    { billId: "#OD12589059", dueDate: "01-02-25", service: "Waste Bin Disposal", amount: 14500, status: "Pending" },
  ];
  
  const wastes = [
    { wasteId: "#OD12589048", date: "21-01-25", address: "12, Awolowo Road, Ikoyi, Lagos", representative: "Adeniyi John", status: "Cancelled" },
    { wasteId: "#OD12589049", date: "21-01-25", address: "45, Ogunlana Drive, Surulere, Lagos", representative: "Falomo Jide", status: "Delivered" },
    { wasteId: "#OD12589050", date: "21-01-25", address: "4, Bode Thomas Street, Surulere, Lagos", representative: "Adebimpe Chinaza", status: "Cancelled" },
    { wasteId: "#OD12589051", date: "22-01-25", address: "8, Akin Adesola Street, Victoria Island, Lagos", representative: "Fatimo Adetola", status: "Delivered" },
    { wasteId: "#OD12589052", date: "22-01-25", address: "3, Herbert Macaulay Road, Yaba, Lagos", representative: "Chika Okafor", status: "Cancelled" },
    { wasteId: "#OD12589053", date: "23-01-25", address: "18, Admiralty Way, Lekki, Lagos", representative: "Ifeanyi Nnaji", status: "Delivered" },
    { wasteId: "#OD12589054", date: "24-01-25", address: "22, Allen Avenue, Ikeja, Lagos", representative: "Amina Bello", status: "Delivered" },
    { wasteId: "#OD12589055", date: "25-01-25", address: "5, Opebi Road, Ikeja, Lagos", representative: "Tolu Adebayo", status: "Cancelled" },
    { wasteId: "#OD12589056", date: "26-01-25", address: "19, Broad Street, Lagos Island", representative: "John Smith", status: "Delivered" },
    { wasteId: "#OD12589057", date: "27-01-25", address: "10, Adeniran Ogunsanya, Surulere, Lagos", representative: "Kate Johnson", status: "Delivered" },
    { wasteId: "#OD12589058", date: "28-01-25", address: "6, Kofo Abayomi, Victoria Island, Lagos", representative: "Samson Eze", status: "Cancelled" },
    { wasteId: "#OD12589059", date: "29-01-25", address: "15, Mobolaji Bank Anthony Way, Ikeja, Lagos", representative: "Yusuf Garba", status: "Delivered" },
  ];
  
  const payments = [
    { transactionId: "#OD12589048", service: "Smart Bin Purchase", amount: 20000, date: "21-01-25", paymentMethod: "Wallet", status: "Failed" },
    { transactionId: "#OD12589049", service: "Waste Bin Disposal", amount: 11250, date: "22-01-25", paymentMethod: "Alat By Wema", status: "Successful" },
    { transactionId: "#OD12589050", service: "Waste Bin Disposal", amount: 15000, date: "23-01-25", paymentMethod: "Credit Card", status: "Successful" },
    { transactionId: "#OD12589051", service: "Waste Bin Disposal", amount: 20000, date: "24-01-25", paymentMethod: "Alat By Wema", status: "Failed" },
    { transactionId: "#OD12589052", service: "Waste Bin Disposal", amount: 9500, date: "25-01-25", paymentMethod: "Wallet", status: "Successful" },
    { transactionId: "#OD12589053", service: "Waste Bin Disposal", amount: 17000, date: "26-01-25", paymentMethod: "Wallet", status: "Successful" },
    { transactionId: "#OD12589054", service: "Waste Bin Disposal", amount: 12500, date: "27-01-25", paymentMethod: "Credit Card", status: "Successful" },
    { transactionId: "#OD12589055", service: "Waste Bin Disposal", amount: 6000, date: "28-01-25", paymentMethod: "Wallet", status: "Successful" },
    { transactionId: "#OD12589056", service: "Subscription", amount: 12600, date: "29-01-25", paymentMethod: "Credit Card", status: "Successful" },
    { transactionId: "#OD12589057", service: "Waste Bin Disposal", amount: 3500, date: "30-01-25", paymentMethod: "Alat By Wema", status: "Successful" },
    { transactionId: "#OD12589058", service: "Waste Bin Disposal", amount: 22000, date: "31-01-25", paymentMethod: "Alat By Wema", status: "Failed" },
    { transactionId: "#OD12589059", service: "Waste Bin Disposal", amount: 14500, date: "01-02-25", paymentMethod: "Wallet", status: "Successful" },
  ];

  const receipts = [
    {
      sn: 1,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Smart Bin Purchase",
      amount: "₦20,000",
      date: "21–01–25",
      action: "Download"
    },
    {
      sn: 2,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Subscription",
      amount: "₦11,250",
      date: "22–01–25",
      action: "Download"
    },
    {
      sn: 3,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Waste Bin Disposal",
      amount: "₦20,000",
      date: "24–01–25",
      action: "Download"
    },
    {
      sn: 4,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Waste Bin Disposal",
      amount: "₦6,000",
      date: "28–01–25",
      action: "Download"
    },
    {
      sn: 5,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Smart Bin Purchase",
      amount: "₦12,600",
      date: "28–01–25",
      action: "Download"
    },
    {
      sn: 6,
      transactionId: "#OD12589048",
      receiptId: "#OD12589048",
      service: "Waste Bin Disposal",
      amount: "₦3,500",
      date: "28–01–25",
      action: "Download"
    },
    {
      sn: 7,
      transactionId: "#OD12589049",
      receiptId: "#OD12589049",
      service: "Subscription",
      amount: "₦10,000",
      date: "30–01–25",
      action: "Download"
    },
    {
      sn: 8,
      transactionId: "#OD12589050",
      receiptId: "#OD12589050",
      service: "Smart Bin Purchase",
      amount: "₦18,000",
      date: "01–02–25",
      action: "Download"
    },
    {
      sn: 9,
      transactionId: "#OD12589051",
      receiptId: "#OD12589051",
      service: "Waste Bin Disposal",
      amount: "₦4,000",
      date: "02–02–25",
      action: "Download"
    },
    {
      sn: 10,
      transactionId: "#OD12589052",
      receiptId: "#OD12589052",
      service: "Subscription",
      amount: "₦11,250",
      date: "03–02–25",
      action: "Download"
    },
    {
      sn: 11,
      transactionId: "#OD12589053",
      receiptId: "#OD12589053",
      service: "Smart Bin Purchase",
      amount: "₦22,000",
      date: "05–02–25",
      action: "Download"
    },
    {
      sn: 12,
      transactionId: "#OD12589054",
      receiptId: "#OD12589054",
      service: "Waste Bin Disposal",
      amount: "₦5,500",
      date: "06–02–25",
      action: "Download"
    }
  ];
  
  export { bills, wastes, payments, receipts }
  