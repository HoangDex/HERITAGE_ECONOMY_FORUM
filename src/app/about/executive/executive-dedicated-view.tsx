"use client";

import React, { useState } from "react";
import {
  ExecutiveSection,
  PersonDetailDialog,
  type Person,
  type ExecutiveDepartment,
} from "@/features/about";

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
