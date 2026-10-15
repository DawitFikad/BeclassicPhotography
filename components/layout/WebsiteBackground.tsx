"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import DotGrid from "@/components/ui/DotGrid";

export function WebsiteBackground() {
  const { theme, mounted } = useTheme();

  // Dynamic theme-aware palette matching the studio luxury brand
  const isDark = !mounted || theme === "dark";
  const baseColor = isDark ? "#282a31" : "#d8dade";
  const activeColor = "#dba835"; // Beclassic Photography Gold

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden select-none"
      style={{ zIndex: -50 }}
      aria-hidden="true"
    >
      <DotGrid
        baseColor={baseColor}
        activeColor={activeColor}
        shape="circle"
        dotSize={3}
        gap={22}
        proximity={130}
        strength={1}
        bounce={0.55}
        tension={0.35}
        returnDuration={0.85}
        shockRadius={320}
        shockStrength={4.5}
        swell={0.8}
        stretch={0.4}
        glow={0.5}
        fade={0}
        opacity={isDark ? 0.85 : 0.7}
        intro={true}
        mouseInteraction={true}
        clickShock={true}
        className="w-full h-full"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

