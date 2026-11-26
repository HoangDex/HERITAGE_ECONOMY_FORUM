"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Database,
  Layers,
  Link2,
  BarChart3,
  LayoutGrid,
  Check,
  FileText,
  Info,
} from "lucide-react";
import type {
  ActionItem,
  StatItem,
  CardItem,
  GroupItem,
} from "../../../types/page.types";
import type { MasterDataOverview } from "../../../types/master-data.types";

interface GenericSectionFormProps {
  sectionKey?: string;
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

interface CatalogOption {
  id: string;
  label: string;
  subLabel: string;
  schemaName: string;
}

export function GenericSectionForm({
  sectionKey = "",
  propsData,
  onChange,
}: GenericSectionFormProps) {
  const [catalog, setCatalog] = useState<MasterDataOverview | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/catalog")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (mounted && json?.data) {
          setCatalog(json.data as MasterDataOverview);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Xác định danh sách bản ghi Catalog phù hợp để chọn `ids: string[]` cho section
  const getCatalogOptionsForKey = (hintKey: string): CatalogOption[] => {
    if (!catalog) return [];
    const k = hintKey.toLowerCase();

    if (k.includes("news")) {
      return catalog.news.map((n) => ({
        id: n.id,
        label: n.title,
        subLabel: `${n.categoryName} • ID: ${n.id}`,
        schemaName: "News",
      }));
    }
    if (k.includes("showcase") || k.includes("project") || k.includes("мо-hình")) {
      return catalog.projects.map((p) => ({
        id: p.id,
        label: p.name,
        subLabel: `${p.location} • ${p.category} • ID: ${p.id}`,
        schemaName: "HeritageProject",
      }));
    }
    if (k.includes("partner") || k.includes("org") || k.includes("tổ chức") || k.includes("tài trợ")) {
      return catalog.organizations.map((o) => ({
        id: o.id,
        label: o.name,
        subLabel: `${o.shortName || ""} • ${o.categoryLabel} • ID: ${o.id}`,
        schemaName: "Organization",
      }));
    }
    if (k.includes("speaker") || k.includes("council") || k.includes("executive")) {
      return catalog.speakers.map((s) => ({
        id: s.id,
        label: s.name,
        subLabel: `${s.title} • ${s.organization} • ID: ${s.id}`,
        schemaName: "Speaker",
      }));
    }
    if (k.includes("categor")) {
      const awardCats = catalog.awardCategories || catalog.awards.flatMap((a) => a.categories);
      return awardCats.map((c) => ({
        id: c.id,
        label: c.name,
        subLabel: `ID: ${c.id}`,
        schemaName: "AwardCategory",
      }));
    }
    if (k.includes("award") || k.includes("giải thưởng")) {
      return catalog.awards.map((a) => ({
        id: a.id,
        label: a.name,
        subLabel: `Năm ${a.year} • ID: ${a.id}`,
        schemaName: "Award",
      }));
    }

    // Tổng hợp tất cả nếu không khớp cụ thể
    return [
      ...catalog.projects.map((p) => ({
        id: p.id,
        label: `[Project] ${p.name}`,
        subLabel: `${p.location} • ID: ${p.id}`,
        schemaName: "HeritageProject",
      })),
      ...catalog.news.map((n) => ({
        id: n.id,
        label: `[News] ${n.title}`,
        subLabel: `${n.categoryName} • ID: ${n.id}`,
        schemaName: "News",
      })),
      ...catalog.organizations.map((o) => ({
        id: o.id,
        label: `[Partner] ${o.name}`,
        subLabel: `${o.categoryLabel} • ID: ${o.id}`,
        schemaName: "Organization",
      })),
      ...catalog.speakers.map((s) => ({
        id: s.id,
        label: `[Speaker] ${s.name}`,
        subLabel: `${s.title} • ID: ${s.id}`,
        schemaName: "Speaker",
      })),
    ];
  };

  const ids = (Array.isArray(propsData.ids) ? propsData.ids : []) as string[];
  const actions = (Array.isArray(propsData.actions) ? propsData.actions : []) as ActionItem[];
  const stats = (Array.isArray(propsData.stats) ? propsData.stats : []) as StatItem[];
  const cards = (Array.isArray(propsData.cards) ? propsData.cards : []) as CardItem[];
  const groups = (Array.isArray(propsData.groups) ? propsData.groups : []) as GroupItem[];

  const isPaginatedFullFeed =
    sectionKey === "feed" || sectionKey === "directory";

  const toggleIdInList = (currentIds: string[], targetId: string): string[] => {
    if (currentIds.includes(targetId)) {
      return currentIds.filter((id) => id !== targetId);
    }
    return [...currentIds, targetId];
  };

  const catalogOptions = getCatalogOptionsForKey(sectionKey);

  return (
    <div className="space-y-4">
      {/* 1. NHÓM TRƯỜNG VĂN BẢN CHUNG (UNIVERSAL SCALAR PROPS) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#DFD8C8] text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#C29B57]" />
          <span>1. Thuộc Tính Chung Của Section (Universal Props)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Nhãn chính (<code className="text-[#0D4838]">badge</code>)
            </label>
            <Input
              value={String(propsData.badge || "")}
              onChange={(e) => onChange("badge", e.target.value)}
              placeholder="Nhãn định danh khối..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Nhãn phụ (<code className="text-[#0D4838]">subBadge</code>)
            </label>
            <Input
              value={String(propsData.subBadge || "")}
              onChange={(e) => onChange("subBadge", e.target.value)}
              placeholder="Nhãn phụ / trạng thái..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Tiêu đề chính (<code className="text-[#0D4838]">title</code>)
            </label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Tiêu đề hiển thị..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Tiêu đề phụ (<code className="text-[#0D4838]">subtitle</code>)
            </label>
            <Input
              value={String(propsData.subtitle || "")}
              onChange={(e) => onChange("subtitle", e.target.value)}
              placeholder="Tiêu đề phụ..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-[#132A24] block mb-1">
            Thông điệp / Trích dẫn (<code className="text-[#0D4838]">quote</code>)
          </label>
          <Input
            value={String(propsData.quote || "")}
            onChange={(e) => onChange("quote", e.target.value)}
            placeholder="Di sản kiến tạo giá trị – Phát triển hướng tương lai"
            className="h-8 text-xs bg-white rounded-xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-[#132A24] block mb-1">
            Mô tả (<code className="text-[#0D4838]">description</code>)
          </label>
          <textarea
            rows={2}
            value={String(propsData.description || "")}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Nội dung mô tả khối..."
            className="w-full text-xs p-2 rounded-xs border border-[#DFD8C8] bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Ghi chú (<code className="text-[#0D4838]">note</code>)
            </label>
            <Input
              value={String(propsData.note || "")}
              onChange={(e) => onChange("note", e.target.value)}
              placeholder="Ghi chú chân trang / số lượng..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Ảnh (<code className="text-[#0D4838]">imageUrl</code>)
            </label>
            <Input
              value={String(propsData.imageUrl || "")}
              onChange={(e) => onChange("imageUrl", e.target.value)}
              placeholder="https://..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Video (<code className="text-[#0D4838]">videoUrl</code>)
            </label>
            <Input
              value={String(propsData.videoUrl || "")}
              onChange={(e) => onChange("videoUrl", e.target.value)}
              placeholder="https://..."
              className="h-8 text-xs bg-white rounded-xs"
            />
          </div>
        </div>
      </div>

      {/* 2. LIÊN KẾT MẢNG ID TỪ SCHEMA DANH MỤC (`ids: string[]`) HOẶC API PHÂN TRANG */}
      {isPaginatedFullFeed ? (
        <div className="bg-emerald-50/70 p-4 rounded-xs border border-emerald-300 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
            <Info className="w-4 h-4 text-[#0D4838]" />
            <span>Chế Độ Tự Động Gọi API Phân Trang Toàn Danh Mục</span>
          </div>
          <p className="text-xs text-[#132A24] leading-relaxed">
            Khối <strong>{sectionKey}</strong> hiển thị toàn bộ danh sách có phân trang nên{" "}
            <strong>không lưu mảng <code>ids</code></strong> trong <code>Page.props</code>. Giao diện
            tự động gọi API phân trang (<code>/api/news?page=1&amp;limit=9</code> hoặc{" "}
            <code>/api/projects?page=1&amp;limit=12</code>).
          </p>
        </div>
      ) : (
        <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
              <Database className="w-4 h-4 text-[#C29B57]" />
              <span>
                2. Mảng ID Tham Chiếu Schema Danh Mục (<code className="lowercase">ids</code>:{" "}
                {ids.length} mục đã chọn)
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#5A6B63]">
            Chỉ lưu mảng <code>ids: string[]</code> của các bản ghi chọn lọc từ Schema tương ứng
            (News, HeritageProject, Organization, Speaker, Award). Khi hiển thị giao diện sẽ lấy đúng
            các ID này theo thứ tự.
          </p>

          {/* Input chỉnh nhanh chuỗi ID cách nhau bằng dấu phẩy */}
          <div>
            <label className="text-[11px] font-bold text-[#132A24] block mb-1">
              Danh sách ID đang lưu (ngăn cách bởi dấu phẩy):
            </label>
            <Input
              value={ids.join(", ")}
              onChange={(e) => {
                const parsed = e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                onChange("ids", parsed);
              }}
              placeholder="Ví dụ: her_1, her_3, her_4 hoặc news_feat_1, news_lat_1..."
              className="h-8 text-xs font-mono bg-white rounded-xs"
            />
          </div>

          {/* Danh sách click chọn trực tiếp từ Catalog */}
          {catalogOptions.length > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <span className="text-[11px] font-bold text-[#5A6B63] block">
                Bấm để chọn / bỏ chọn bản ghi từ CSDL:
              </span>
              {catalogOptions.map((opt) => {
                const isSelected = ids.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange("ids", toggleIdInList(ids, opt.id))}
                    className={`w-full flex items-center justify-between p-2 text-left rounded-xs border text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#0D4838]/10 border-[#0D4838] text-[#132A24]"
                        : "bg-white border-[#DFD8C8] text-[#5A6B63] hover:border-[#0D4838]"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-xs truncate">{opt.label}</div>
                      <div className="text-[10px] opacity-80 truncate">{opt.subLabel}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#EFECE1] border border-[#DFD8C8] rounded-xs">
                        {opt.schemaName}
                      </span>
                      <span
                        className={`w-4 h-4 flex items-center justify-center rounded-xs border ${
                          isSelected
                            ? "bg-[#0D4838] border-[#0D4838] text-white"
                            : "border-[#DFD8C8] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. MẢNG NÚT BẤM ĐIỀU HƯỚNG (`actions: ActionItem[]`) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
            <Link2 className="w-4 h-4 text-[#C29B57]" />
            <span>3. Mảng Nút Hành Động (actions: {actions.length})</span>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onChange("actions", [...actions, { label: "Tìm hiểu thêm", href: "/" }])
            }
            className="h-7 text-[11px] rounded-xs border-[#0D4838] text-[#0D4838] cursor-pointer"
          >
            <Plus className="w-3 h-3 mr-1" />
            Thêm nút
          </Button>
        </div>

        {actions.map((act, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <Input
              value={act.label || ""}
              onChange={(e) => {
                const next = [...actions];
                next[idx] = { ...next[idx], label: e.target.value };
                onChange("actions", next);
              }}
              placeholder="Nhãn nút (label)"
              className="col-span-5 h-8 text-xs bg-white rounded-xs"
            />
            <Input
              value={act.href || ""}
              onChange={(e) => {
                const next = [...actions];
                next[idx] = { ...next[idx], href: e.target.value };
                onChange("actions", next);
              }}
              placeholder="Đường dẫn (href)"
              className="col-span-6 h-8 text-xs bg-white rounded-xs"
            />
            <button
              type="button"
              onClick={() =>
                onChange(
                  "actions",
                  actions.filter((_, i) => i !== idx)
                )
              }
              className="col-span-1 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-xs cursor-pointer"
              title="Xóa nút"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 4. MẢNG CHỈ SỐ THỐNG KÊ (`stats: StatItem[]`) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-[#C29B57]" />
            <span>4. Mảng Chỉ Số / Thông Tin (stats: {stats.length})</span>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onChange("stats", [...stats, { value: "100+", label: "Chỉ số mới" }])
            }
            className="h-7 text-[11px] rounded-xs border-[#0D4838] text-[#0D4838] cursor-pointer"
          >
            <Plus className="w-3 h-3 mr-1" />
            Thêm chỉ số
          </Button>
        </div>

        {stats.map((st, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <Input
              value={st.value || ""}
              onChange={(e) => {
                const next = [...stats];
                next[idx] = { ...next[idx], value: e.target.value };
                onChange("stats", next);
              }}
              placeholder="Giá trị (value)"
              className="col-span-5 h-8 text-xs bg-white rounded-xs"
            />
            <Input
              value={st.label || ""}
              onChange={(e) => {
                const next = [...stats];
                next[idx] = { ...next[idx], label: e.target.value };
                onChange("stats", next);
              }}
              placeholder="Nhãn (label)"
              className="col-span-6 h-8 text-xs bg-white rounded-xs"
            />
            <button
              type="button"
              onClick={() =>
                onChange(
                  "stats",
                  stats.filter((_, i) => i !== idx)
                )
              }
              className="col-span-1 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-xs cursor-pointer"
              title="Xóa chỉ số"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 5. MẢNG THẺ NỘI DUNG TÙY BIẾN (`cards: CardItem[]`) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4 text-[#C29B57]" />
            <span>5. Mảng Thẻ Nội Dung (cards: {cards.length} thẻ)</span>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onChange("cards", [
                ...cards,
                {
                  badge: `THẺ 0${cards.length + 1}`,
                  title: "Tiêu đề thẻ mới",
                  subtitle: "",
                  description: "Mô tả nội dung chi tiết của thẻ...",
                },
              ])
            }
            className="h-7 text-[11px] rounded-xs border-[#0D4838] text-[#0D4838] cursor-pointer"
          >
            <Plus className="w-3 h-3 mr-1" />
            Thêm thẻ (Card)
          </Button>
        </div>

        <div className="space-y-2.5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-3 bg-white rounded-xs border border-[#DFD8C8] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#0D4838]">
                  Card #{idx + 1}: {card.title || card.badge || "Thẻ nội dung"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      "cards",
                      cards.filter((_, i) => i !== idx)
                    )
                  }
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Xóa thẻ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  value={card.badge || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], badge: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Nhãn (badge)"
                  className="h-8 text-xs rounded-xs"
                />
                <Input
                  value={card.title || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], title: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Tiêu đề (title)"
                  className="h-8 text-xs rounded-xs"
                />
                <Input
                  value={card.subtitle || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], subtitle: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Tiêu đề phụ (subtitle)"
                  className="h-8 text-xs rounded-xs"
                />
              </div>

              <textarea
                rows={2}
                value={card.description || ""}
                onChange={(e) => {
                  const next = [...cards];
                  next[idx] = { ...next[idx], description: e.target.value };
                  onChange("cards", next);
                }}
                placeholder="Mô tả thẻ (description)..."
                className="w-full text-xs p-2 rounded-xs border border-[#DFD8C8]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  value={card.note || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], note: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Ghi chú (note)"
                  className="h-8 text-xs rounded-xs"
                />
                <Input
                  value={card.actionLabel || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], actionLabel: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Nhãn nút (actionLabel)"
                  className="h-8 text-xs rounded-xs"
                />
                <Input
                  value={card.href || ""}
                  onChange={(e) => {
                    const next = [...cards];
                    next[idx] = { ...next[idx], href: e.target.value };
                    onChange("cards", next);
                  }}
                  placeholder="Liên kết (href)"
                  className="h-8 text-xs rounded-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. MẢNG NHÓM CON (`groups: GroupItem[]`) - HỖ TRỢ CẢ `ids` VÀ `cards` BÊN TRONG GROUP */}
      {groups.length > 0 && (
        <div className="bg-[#FDFBF7] p-4 rounded-xs border border-[#DFD8C8] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#C29B57]" />
              <span>6. Các Nhóm Con Trong Section (groups: {groups.length})</span>
            </div>
          </div>

          <div className="space-y-3">
            {groups.map((grp, gIdx) => {
              const grpIds = Array.isArray(grp.ids) ? grp.ids : [];
              const grpOptions = getCatalogOptionsForKey(
                `${sectionKey} ${grp.title || ""} ${grp.badge || ""}`
              );

              return (
                <div
                  key={gIdx}
                  className="p-3 bg-white rounded-xs border border-[#DFD8C8] space-y-2.5"
                >
                  <div className="text-xs font-bold text-[#0D4838]">
                    Nhóm #{gIdx + 1}: {grp.title || grp.badge || `Group ${gIdx + 1}`}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      value={grp.badge || ""}
                      onChange={(e) => {
                        const next = [...groups];
                        next[gIdx] = { ...next[gIdx], badge: e.target.value };
                        onChange("groups", next);
                      }}
                      placeholder="Nhãn nhóm (badge)"
                      className="h-8 text-xs rounded-xs"
                    />
                    <Input
                      value={grp.title || ""}
                      onChange={(e) => {
                        const next = [...groups];
                        next[gIdx] = { ...next[gIdx], title: e.target.value };
                        onChange("groups", next);
                      }}
                      placeholder="Tiêu đề nhóm (title)"
                      className="h-8 text-xs rounded-xs"
                    />
                  </div>

                  {grp.description !== undefined && (
                    <textarea
                      rows={2}
                      value={grp.description || ""}
                      onChange={(e) => {
                        const next = [...groups];
                        next[gIdx] = { ...next[gIdx], description: e.target.value };
                        onChange("groups", next);
                      }}
                      placeholder="Mô tả nhóm..."
                      className="w-full text-xs p-2 rounded-xs border border-[#DFD8C8]"
                    />
                  )}

                  {/* Mảng `ids` bên trong từng Group (ví dụ showcase.groups[1].ids hoặc partners.groups[].ids) */}
                  {(grp.ids !== undefined || sectionKey === "showcase" || sectionKey === "partners") && (
                    <div className="p-2.5 bg-[#FAF7F2] rounded-xs border border-[#DFD8C8] space-y-2">
                      <label className="text-[11px] font-bold text-[#0D4838] block">
                        Mảng ID tham chiếu của nhóm này (<code>groups[{gIdx}].ids</code> -{" "}
                        {grpIds.length} mục):
                      </label>
                      <Input
                        value={grpIds.join(", ")}
                        onChange={(e) => {
                          const parsed = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          const next = [...groups];
                          next[gIdx] = { ...next[gIdx], ids: parsed };
                          onChange("groups", next);
                        }}
                        placeholder="Nhập các ID cách nhau bằng dấu phẩy..."
                        className="h-8 text-xs font-mono bg-white rounded-xs"
                      />
                      {grpOptions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {grpOptions.map((opt) => {
                            const active = grpIds.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  const next = [...groups];
                                  next[gIdx] = {
                                    ...next[gIdx],
                                    ids: toggleIdInList(grpIds.map(String), opt.id),
                                  };
                                  onChange("groups", next);
                                }}
                                className={`px-2 py-1 text-[10px] font-bold rounded-xs border cursor-pointer transition-colors ${
                                  active
                                    ? "bg-[#0D4838] text-white border-[#0D4838]"
                                    : "bg-white text-[#5A6B63] border-[#DFD8C8] hover:border-[#0D4838]"
                                }`}
                              >
                                {opt.label} ({opt.id})
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
