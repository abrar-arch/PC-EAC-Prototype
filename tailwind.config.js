/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sf: {
          page: "#f3f3f3",
          surface: "#ffffff",
          ink: "#000000",
          muted: "#706e6b",
          brand: "#0176d3",
          "brand-hover": "#014486",
          "brand-tint": "#f3f9ff",
          line: "#c9c9c9",
          "line-soft": "#f3f3f3",
          header: "#e1e4ea",
          "icon-well": "#d4dbe6",
          border: "#dddbda",
          text: "#181818"
        }
      },
      borderRadius: {
        fig: "8px",
        "fig-btn": "4px"
      },
      boxShadow: {
        modal: "0 4px 24px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08)"
      },
      fontSize: {
        "fig-title": ["18px", { lineHeight: "27px", fontWeight: "700" }],
        "fig-h2": ["16px", { lineHeight: "24px", fontWeight: "700" }],
        "fig-body": ["13px", { lineHeight: "20px" }],
        "fig-ui": ["13px", { lineHeight: "20px" }]
      }
    }
  },
  plugins: []
};
