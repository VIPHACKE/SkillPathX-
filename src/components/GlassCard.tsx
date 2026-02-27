"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "green" | "cyan" | "purple";
  hover?: boolean;
  glow?: boolean;
  float?: boolean;
  delay?: number;
}

const variantStyles = {
  default: "glass-card",
  green: "glass-card glass-card-green",
  cyan: "glass-card glass-card-cyan",
  purple: "glass-card glass-card-purple",
};

const glowStyles = {
  default: "",
  green: "glow-green",
  cyan: "glow-cyan",
  purple: "glow-purple",
};

const hoverStyles = {
  default: "hover-glow-green",
  green: "hover-glow-green",
  cyan: "hover-glow-cyan",
  purple: "hover-glow-purple",
};

export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = true,
  glow = false,
  float = false,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        ${variantStyles[variant]}
        ${glow ? glowStyles[variant] : ""}
        ${hover ? hoverStyles[variant] : ""}
        ${float ? "float-animation" : ""}
        card-shine
        p-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// Simple glass container without animation
export function GlassContainer({
  children,
  className = "",
  variant = "default",
}: Omit<GlassCardProps, "delay" | "hover" | "glow" | "float">) {
  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Stats Card for hero section
export function StatsCard({
  label,
  value,
  trend,
  icon: Icon,
  variant = "green",
  delay = 0,
}: {
  label: string;
  value: string;
  trend?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "green" | "cyan" | "purple";
  delay?: number;
}) {
  const IconComponent = Icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`
        glass-card-${variant}
        hover-glow-${variant}
        float-animation
        p-4
        min-w-[180px]
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <div className={`p-2 rounded-lg bg-${variant === "green" ? "[#00ff88]" : variant === "cyan" ? "[#00d4ff]" : "[#8b5cf6]"}/10`}>
            <IconComponent className={`w-5 h-5 text-${variant === "green" ? "[#00ff88]" : variant === "cyan" ? "[#00d4ff]" : "[#8b5cf6]"}`} />
          </div>
        )}
        <div>
          <p className="text-xs text-gray-400">{label}</p>
          <p className={`text-lg font-bold text-gradient-${variant}`}>{value}</p>
          {trend && (
            <p className="text-xs text-[#00ff88]">{trend}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
