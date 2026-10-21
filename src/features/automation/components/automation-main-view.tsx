"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { AutomationRulesView } from "./rules/automation-rules-view";
import { WhatsAppTemplatesView } from "./templates/whatsapp-templates-view";
import { ExecutionLogsView } from "./logs/execution-logs-view";

function AutomationMainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab") as "rules" | "templates" | "logs" | null;

  const [activeTab, setActiveTab] = useState<"rules" | "templates" | "logs">(
    tabParam === "templates" || tabParam === "logs" ? tabParam : "rules"
  );

  useEffect(() => {
    if (tabParam && (tabParam === "rules" || tabParam === "templates" || tabParam === "logs")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: "rules" | "templates" | "logs") => {
    setActiveTab(tab);
    router.push(`/dashboard/automation?tab=${tab}`, { scroll: false });
  };

  return (
    <div>
      {activeTab === "rules" && <AutomationRulesView onTabChange={handleTabChange} />}
      {activeTab === "templates" && <WhatsAppTemplatesView onTabChange={handleTabChange} />}
      {activeTab === "logs" && <ExecutionLogsView onTabChange={handleTabChange} />}
    </div>
  );
}

export function AutomationMainView() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-gray-500">
          جارٍ تحميل موديول الأتمتة ورسائل واتساب...
        </div>
      }
    >
      <AutomationMainContent />
    </Suspense>
  );
}
