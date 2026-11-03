/**
 * BARREL EXPORT: HERITAGE MODULE (Clean Boundary)
 * Chỉ công khai các thành phần cần thiết ra ngoài Feature
 */

// Layer 1: Types
export * from "./types/heritage.types";

// Layer 2: Schemas
export * from "./schemas/heritage.schema";

// Layer 4: Services
export * from "./services/heritage.service";

// Layer 5A: Server Actions
export * from "./actions/heritage.actions";

// Layer 6A: React Hooks
export * from "./hooks/use-heritage";

// Layer 6B: Components
export * from "./components/heritage-card";
export * from "./components/heritage-grid";
export * from "./components/heritage-detail";
export * from "./components/create-heritage-dialog";
export * from "./components/economic-stats";
