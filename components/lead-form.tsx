"use client";

import { useEffect } from "react";
import { useActionState } from "next/dist/client/components/action-hook";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, LeadFormState } from "@/app/request/actions";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = { status: "idle" };

type LeadFormProps = {
  listingSlug?: string;
  onSuccess?: () => void;
  className?: string;
};

export function LeadForm({ listingSlug, onSuccess, className }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );

  useEffect(() => {
    if (state.status === "success" && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  const getError = (field: string) => state.errors?.[field]?.[0];

  if (state.status === "success") {
    return (
      <div className="space-y-3 rounded-xl border border-border/70 bg-surface p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary" />
          <p className="font-semibold text-text">
            Thanks for your request.
          </p>
        </div>
        <p className="text-text-muted text-sm">
          We logged your details. A coordinator will reach out with next steps.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-4", className)}>
      {state.message && state.status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.message}
        </p>
      )}

      {listingSlug && (
        <input type="hidden" name="listingSlug" value={listingSlug} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Full name"
          name="fullName"
          placeholder="Your full name"
          error={getError("fullName")}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          error={getError("email")}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          placeholder="+371 ..."
          error={getError("phone")}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-text">City of interest</label>
          <select
            name="cityOfInterest"
            defaultValue="Riga"
            className={cn(
              "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary",
              getError("cityOfInterest") && "border-red-400"
            )}
            aria-invalid={Boolean(getError("cityOfInterest"))}
          >
            <option value="Riga">Riga</option>
            <option value="Palanga">Palanga</option>
            <option value="Both">Both</option>
          </select>
          {getError("cityOfInterest") && (
            <p className="text-xs text-red-600">{getError("cityOfInterest")}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text">Preferred contact channel</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {[
            { value: "email", label: "Email" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "telegram", label: "Telegram" },
          ].map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer hover:border-primary/60",
                getError("contactChannel") && "border-red-400"
              )}
            >
              <input
                type="radio"
                name="contactChannel"
                value={option.value}
                defaultChecked={option.value === "email"}
                className="text-primary"
              />
              <span className="text-text">{option.label}</span>
            </label>
          ))}
        </div>
        {getError("contactChannel") && (
          <p className="text-xs text-red-600">{getError("contactChannel")}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-text">Message (optional)</label>
        <textarea
          name="message"
          placeholder="Share timing, budget, or move-in notes"
          className={cn(
            "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm min-h-[110px] focus:ring-2 focus:ring-primary focus:border-primary",
            getError("message") && "border-red-400"
          )}
          aria-invalid={Boolean(getError("message"))}
        />
        {getError("message") && (
          <p className="text-xs text-red-600">{getError("message")}</p>
        )}
      </div>

      <label className="flex items-start gap-2 rounded-lg bg-surface border border-border px-3 py-3 text-sm">
        <input
          type="checkbox"
          name="agree"
          className="mt-1 text-primary"
          required
          aria-invalid={Boolean(getError("agree"))}
        />
        <span className="text-text-muted">
          I agree to be contacted about housing offers.
        </span>
      </label>
      {getError("agree") && (
        <p className="text-xs text-red-600">{getError("agree")}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center rounded-lg bg-primary text-white px-4 py-3 font-medium hover:bg-primary-600 transition-colors disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Send request"
        )}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary",
          error && "border-red-400"
        )}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
