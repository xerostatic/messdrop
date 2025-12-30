import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Drift - Anonymous Messages in the Void";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0a0f1a 0%, #020617 100%)",
          position: "relative",
        }}
      >
        {/* Floating orbs */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 200,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 400,
            right: 300,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 150,
            left: 400,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            right: 150,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 300,
              color: "white",
              margin: 0,
              textShadow: "0 0 40px rgba(34, 211, 238, 0.5)",
              fontFamily: "serif",
              letterSpacing: "-0.02em",
            }}
          >
            Drift
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.5)",
              margin: 0,
              marginTop: 16,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Messages in the Void
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            color: "rgba(34, 211, 238, 0.7)",
            margin: 0,
          }}
        >
          Drop an anonymous thought into the abyss
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}

