import { ImageResponse } from "next/og";

type DashboardOgImageInput = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  tags: string[];
};

export function createDashboardOgImage({
  eyebrow,
  title,
  description,
  accent,
  tags,
}: DashboardOgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at top right, rgba(255,46,46,0.22), transparent 36%), linear-gradient(180deg, #0f1216 0%, #171b20 55%, #0d1014 100%)",
          color: "#f3f4f6",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(252, 227, 0, 0.22)",
            borderRadius: "28px",
            padding: "44px",
            background:
              "linear-gradient(180deg, rgba(24,28,34,0.92) 0%, rgba(16,19,23,0.94) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: "720px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#fce300",
                }}
              >
                {eyebrow}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "22px",
                  fontSize: "68px",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "24px",
                  fontSize: "28px",
                  lineHeight: 1.4,
                  color: "#d1d5db",
                }}
              >
                {description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "240px",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "86px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#9ca3af",
                }}
              >
                Panel seguro
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "18px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div style={{ display: "flex", fontSize: "16px", color: "#9ca3af" }}>
                  Resumen visual
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "78%",
                      background: accent,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "62%",
                      background: "#fce300",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "84%",
                      background: "#f3f4f6",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "12px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#e5e7eb",
                    fontSize: "20px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                color: "#9ca3af",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: accent,
                }}
              />
              clancy protocol
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
