import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Beacon of Blessings — Illuminating Futures Through Education";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #134E4A 0%, #0F766E 40%, #14B8A6 100%)",
        position: "relative",
      }}
    >
      {/* Marigold accent bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "linear-gradient(90deg, #EAB308, #FDE047, #EAB308)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginBottom: 32,
            fontSize: 40,
          }}
        >
          &#x2764;
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Beacon of Blessings
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#EAB308",
            marginBottom: 24,
          }}
        >
          Illuminating Futures Through Education
        </div>

        <div
          style={{
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: 600,
          }}
        >
          Transforming lives through educational support for vulnerable
          communities in Nigeria
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
