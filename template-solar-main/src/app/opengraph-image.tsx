import { ImageResponse } from "next/og"
export const alt = "Questra — Intelligence behind every Question"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#F5F8FC",
          color: "#102442",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#084DB5",
              color: "white",
              borderRadius: 13,
              width: 60,
              height: 60,
              fontSize: 44,
            }}
          >
            Q
          </div>
          <span style={{ fontSize: 40 }}>Questra</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 70, letterSpacing: -3 }}>
            Better questions.
          </span>
          <span style={{ fontSize: 70, letterSpacing: -3, color: "#084DB5" }}>
            Smarter examinations.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            color: "#64748B",
          }}
        >
          <span>Intelligence behind every Question.</span>
          <span style={{ color: "#19A889" }}>questra.si</span>
        </div>
      </div>
    ),
    size,
  )
}
