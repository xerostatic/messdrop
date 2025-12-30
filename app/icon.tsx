import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle, #22d3ee 0%, #0a0f1a 100%)",
            boxShadow: "0 0 10px #22d3ee",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

