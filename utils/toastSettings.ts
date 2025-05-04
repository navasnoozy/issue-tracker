// app/utils/toastSettings
// app/utils/toastSettings.ts

export const toastSetting = {
  style: {
    padding: "16px",
    minWidth: "300px",
    fontWeight: "500",
  },
  success: {
    style: {
      border: "1px solid #20c507", // Green border
      background: "#f0fff4",
      color: "#065f46",
    },
    iconTheme: {
      primary: "#20c507",
      secondary: "#ffffff",
    },
  },
  error: {
    style: {
      border: "1px solid #e11d48", // Red border
      background: "#fff1f2",
      color: "#991b1b",
    },
    iconTheme: {
      primary: "#e11d48",
      secondary: "#ffffff",
    },
  },
};
