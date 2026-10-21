"use client";

import { useState, useMemo } from "react";
import { initialOperationsTasks } from "../data/mock-operations";
import { OperationCategoryFilter, OperationSubFilter, OperationTask } from "../types";
import { OperationsHeader } from "./operations-header";
import { OperationsStatusSummary } from "./operations-status-summary";
import { OperationsFilters } from "./operations-filters";
import { OperationsTable } from "./operations-table";
import { OperationsGovernanceCard } from "./operations-governance-card";

export function OperationsBoardView() {
  const [tasks] = useState<OperationTask[]>(initialOperationsTasks);
  const [categoryFilter, setCategoryFilter] = useState<OperationCategoryFilter>("all");
  const [subFilter, setSubFilter] = useState<OperationSubFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Category counts
  const counts = useMemo(() => {
    return {
      all: 48,
      cleaning: 28,
      maintenance: 20,
    };
  }, []);

  // Sub counts
  const subCounts = useMemo(() => {
    return {
      all: 2,
      pending: 1,
      current: 2,
      in_progress: 2,
    };
  }, []);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Category filter
      if (categoryFilter === "cleaning" && task.type !== "cleaning") return false;
      if (categoryFilter === "maintenance" && task.type !== "maintenance") return false;

      // Sub filter
      if (subFilter === "pending" && task.status !== "needs_cleaning") return false;
      if (subFilter === "in_progress" && task.status !== "in_progress") return false;
      if (subFilter === "current" && task.status === "completed") return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          task.taskNumber.toLowerCase().includes(q) ||
          task.unitName.toLowerCase().includes(q) ||
          task.propertyName.toLowerCase().includes(q) ||
          task.ownerName.toLowerCase().includes(q) ||
          (task.assigneeName && task.assigneeName.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [tasks, categoryFilter, subFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Header with Actions */}
      <OperationsHeader />

      {/* 2. Top Segmented Pills (All, Cleaning, Maintenance) */}
      <OperationsStatusSummary
        currentCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        counts={counts}
      />

      {/* 3. Search and Sub Status Pills */}
      <OperationsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentSubFilter={subFilter}
        onSubFilterChange={setSubFilter}
        subCounts={subCounts}
      />

      {/* 4. Table */}
      <OperationsTable tasks={filteredTasks} />

      {/* 5. Central Governance Banner */}
      <OperationsGovernanceCard />
    </div>
  );
}
