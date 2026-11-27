"use client";

import React, { useState } from "react";
import { ExecutiveSection } from "@/features/about/components/executive-section";
import { PersonDetailDialog } from "@/features/about/components/person-detail-dialog";
import type { Person, ExecutiveDepartment } from "@/features/about/types/about.types";

interface ExecutiveDedicatedViewProps {
  head: Person;
  advisor?: Person;
  deputies: Person[];
  departments: ExecutiveDepartment[];
}

export function ExecutiveDedicatedView({
  head,
  advisor,
  deputies,
  departments,
}: ExecutiveDedicatedViewProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedPerson(null);
    setIsModalOpen(false);
  };

  return (
    <div className="py-8">
      <ExecutiveSection
        head={head}
        advisor={advisor}
        deputies={deputies}
        departments={departments}
        onOpenPersonModal={handleOpen}
        showFullViewLink={false}
      />
      <PersonDetailDialog person={selectedPerson} isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
