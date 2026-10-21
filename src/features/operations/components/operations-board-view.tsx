"use client";

import { useState, useMemo } from "react";
import { initialOperationsTasks } from "../data/mock-operations";
import {
  OperationCategoryFilter,
  OperationSubFilter,
  OperationTask,
  OperationFilterState,
  initialOperationFilterState,
} from "../types";
import { OperationsHeader } from "./operations-header";
import { OperationsStatusSummary } from "./operations-status-summary";
import { OperationsFilters } from "./operations-filters";
import { OperationsTable } from "./operations-table";
import { OperationsGovernanceCard } from "./operations-governance-card";
import { OperationsAdvancedFilterDrawer } from "./operations-advanced-filter-drawer";

export function OperationsBoardView() {
  const [tasks] = useState<OperationTask[]>(initialOperationsTasks);
  const [categoryFilter, setCategoryFilter] =
    useState<OperationCategoryFilter>("all");
  const [subFilter, setSubFilter] = useState<OperationSubFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<OperationFilterState>(
    initialOperationFilterState
  );

  // Active advanced filters count badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.type !== "all") count++;
    if (advancedFilters.status !== "all") count++;
    if (advancedFilters.priority !== "all") count++;
    if (advancedFilters.city !== "all") count++;
    if (advancedFilters.property !== "all") count++;
    if (advancedFilters.assigneeStatus !== "all") count++;
    if (advancedFilters.sortBy !== "default") count++;
    return count;
  }, [advancedFilters]);

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

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      // 1. Top Category filter
      if (categoryFilter === "cleaning" && task.type !== "cleaning") return false;
      if (categoryFilter === "maintenance" && task.type !== "maintenance")
        return false;

      // 2. Sub filter
      if (subFilter === "pending" && task.status !== "needs_cleaning")
        return false;
      if (subFilter === "in_progress" && task.status !== "in_progress")
        return false;
      if (subFilter === "current" && task.status === "completed") return false;

      // 3. Advanced Drawer Filters
      if (advancedFilters.type !== "all" && task.type !== advancedFilters.type) {
        return false;
      }
      if (
        advancedFilters.status !== "all" &&
        task.status !== advancedFilters.status
      ) {
        return false;
      }
      if (
        advancedFilters.priority !== "all" &&
        task.priority !== advancedFilters.priority
      ) {
        return false;
      }
      if (
        advancedFilters.city !== "all" &&
        !task.city?.includes(advancedFilters.city)
      ) {
        return false;
      }
      if (
        advancedFilters.property !== "all" &&
        !task.propertyName?.includes(advancedFilters.property)
      ) {
        return false;
      }
      if (advancedFilters.assigneeStatus === "assigned") {
        if (!task.assigneeName || task.assigneeName.includes("غير مسند"))
          return false;
      }
      if (advancedFilters.assigneeStatus === "unassigned") {
        if (task.assigneeName && !task.assigneeName.includes("غير مسند"))
          return false;
      }

      // 4. Search query
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

    // 5. Sorting
    if (advancedFilters.sortBy === "task_asc") {
      result.sort((a, b) => a.taskNumber.localeCompare(b.taskNumber));
    } else if (advancedFilters.sortBy === "priority_desc") {
      const priorityWeights: Record<string, number> = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1,
      };
      result.sort(
        (a, b) =>
          (priorityWeights[b.priority || "low"] || 0) -
          (priorityWeights[a.priority || "low"] || 0)
      );
    } else if (advancedFilters.sortBy === "date_desc") {
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (advancedFilters.sortBy === "date_asc") {
      result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    return result;
  }, [tasks, categoryFilter, subFilter, searchQuery, advancedFilters]);

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

      {/* 3. Search, Filter Button, and Sub Status Pills */}
      <OperationsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentSubFilter={subFilter}
        onSubFilterChange={setSubFilter}
        subCounts={subCounts}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* 4. Table */}
      <OperationsTable tasks={filteredTasks} />

      {/* 5. Central Governance Banner */}
      <OperationsGovernanceCard />

      {/* 6. Advanced Filter Drawer */}
      <OperationsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={setAdvancedFilters}
        onResetFilters={() => setAdvancedFilters(initialOperationFilterState)}
        totalResultsCount={filteredTasks.length}
      />
    </div>
  );
}
