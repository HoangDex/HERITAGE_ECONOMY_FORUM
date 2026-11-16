"use client";

import React, { useState } from "react";
import { CouncilSection, PersonDetailDialog, type Person } from "@/features/about";

interface CouncilDedicatedViewProps {
  president: Person;
  vicePresidents: Person[];
  councilMembers: Person[];
  scientificAdvisors: Person[];
}

export function CouncilDedicatedView({
  president,
  vicePresidents,
  councilMembers,
  scientificAdvisors,
}: CouncilDedicatedViewProps) {
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
      <CouncilSection
        president={president}
        vicePresidents={vicePresidents}
        councilMembers={councilMembers}
        scientificAdvisors={scientificAdvisors}
        onOpenPersonModal={handleOpen}
        showFullViewLink={false}
      />
      <PersonDetailDialog person={selectedPerson} isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
