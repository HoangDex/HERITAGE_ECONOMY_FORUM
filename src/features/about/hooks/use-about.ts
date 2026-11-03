/**
 * LAYER 6A: REACT CLIENT HOOK CHO MODULE ABOUT
 * Quản lý trạng thái tab điều hướng, bộ lọc nhóm đối tác và modal chi tiết hồ sơ
 */

"use client";

import { useState, useTransition } from "react";
import type { Person, PartnerCategory } from "../types/about.types";
import { getPersonDetailAction } from "../actions/about.actions";

export type AboutTab = "about" | "council" | "executive" | "partners";

export function useAbout() {
  const [activeTab, setActiveTab] = useState<AboutTab>("about");
  const [partnerFilter, setPartnerFilter] = useState<PartnerCategory | "ALL">("ALL");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openPersonModal = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const openPersonById = (id: string, initialPerson?: Person) => {
    if (initialPerson) {
      setSelectedPerson(initialPerson);
      setIsModalOpen(true);
      return;
    }
    startTransition(async () => {
      const res = await getPersonDetailAction(id);
      if (res.success && res.data) {
        setSelectedPerson(res.data);
        setIsModalOpen(true);
      }
    });
  };

  const closePersonModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  const scrollToSection = (tabId: AboutTab) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -90; // Trừ chiều cao header sticky
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return {
    activeTab,
    setActiveTab,
    scrollToSection,
    partnerFilter,
    setPartnerFilter,
    selectedPerson,
    isModalOpen,
    isPending,
    openPersonModal,
    openPersonById,
    closePersonModal,
  };
}
