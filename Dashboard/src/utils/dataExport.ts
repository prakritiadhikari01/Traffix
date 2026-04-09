// utils/dataExport.ts

export const exportTrafficData = async () => {
  try {
    const response = await fetch("http://localhost:5000/export-traffic-state");
    const data = await response.json();

    const fileName = `traffic_export_${new Date().toISOString()}.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    console.log("✅ Export successful");
  } catch (err) {
    console.error("❌ Export failed:", err);
  }
};
