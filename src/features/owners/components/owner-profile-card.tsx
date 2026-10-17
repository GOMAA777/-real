import { CheckCircle2, IdCard, Calendar, CreditCard } from "lucide-react";

interface OwnerProfileCardProps {
  owner?: {
    name?: string;
    initials?: string;
    code?: string;
    joinDate?: string;
    relativeJoin?: string;
    status?: string;
    email?: string;
    phone?: string;
    paymentMethod?: string;
  };
}

export function OwnerProfileCard({ owner }: OwnerProfileCardProps) {
  const name = owner?.name || "محمد بن سالم العتيبي";
  const initials = owner?.initials || "ع م";
  const code = owner?.code || "#PO-8821";
  const joinDate = owner?.joinDate || "16 سبتمبر 2026";
  const relativeJoin = owner?.relativeJoin || "منذ 4 أيام";
  const email = owner?.email || "m.otaibi@domain.sa";
  const phone = owner?.phone || "+966 50 482 9102";
  const paymentMethod = owner?.paymentMethod || "مدى / فيزا (4912••)";

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-6">
      {/* Top Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar Squircle with Initials & Verified Badge */}
          <div className="relative shrink-0">
            <div className="w-[72px] h-[72px] rounded-2xl bg-[#34432E] text-white font-bold text-2xl flex items-center justify-center shadow-xs select-none">
              {initials}
            </div>
            {/* Small green verified badge on bottom edge */}
            <div className="absolute -bottom-1 -start-1 w-5 h-5 rounded-full bg-white ring-2 ring-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            </div>
          </div>

          {/* Name, Status & Metadata */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#172115]">
                {name}
              </h1>
              {/* Status Badge */}
              <span className="bg-[#E2F0D9] text-[#2E7D32] text-xs font-bold px-3 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                <span>حساب نشط ومفعل</span>
              </span>
            </div>

            {/* Subtitle info: ID and Join Date */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7D8A78]">
              <div className="flex items-center gap-1.5">
                <IdCard className="w-3.5 h-3.5 text-[#7D8A78]" />
                <span>معرف المالك:</span>
                <span className="font-mono font-bold text-[#172115]">{code}</span>
              </div>
              <span className="text-[#CCD5C5]">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7D8A78]" />
                <span>انضم في {joinDate} ({relativeJoin})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Payment Info Bar */}
      <div className="bg-[#F6F8F4] rounded-2xl p-4 sm:px-6 border border-[#EEF2E6] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Email */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#7D8A78] font-medium">البريد الإلكتروني</div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172115]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8A78]" />
            <span className="font-mono text-[12px]">{email}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#7D8A78] font-medium">رقم الجوال</div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172115]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span className="font-mono text-[12px]" dir="ltr">{phone}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#7D8A78] font-medium">طريقة الدفع الرئيسية</div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#172115]">
            <CreditCard className="w-4 h-4 text-[#7D8A78]" />
            <span>{paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
