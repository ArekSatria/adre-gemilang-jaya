"use client";

import React, { useState } from "react";
import { Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  validateContactSubmission,
  type ContactFormInput,
} from "@/lib/utils/corporate-helpers";

export function ContactView({
  contactEmail = "partnership@adregemilang.co.id",
}: {
  contactEmail?: string;
}) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<ContactFormInput>({
    fullName: "",
    companyName: "",
    email: "",
    inquiryType: "SPONSORSHIP",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = validateContactSubmission(formData);

    if (!parsed.success) {
      const errors: Partial<Record<keyof ContactFormInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormInput;
        if (key && !errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 300);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      inquiryType: "SPONSORSHIP",
      message: "",
    });
    setFieldErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Kontak */}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.contactPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.contactPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Kolom Kiri (5 Kolom): Informasi Kontak Langsung Manajemen */}
        <div className="space-y-6 rounded-2xl bg-surface p-6 sm:p-8 lg:col-span-5">
          <h2 className="font-display text-xl font-bold text-foreground">
            {t.contactPage.directInfoHeading}
          </h2>

          <div className="space-y-5 border-t border-white/5 pt-5">
            <div className="flex items-start gap-3.5">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-xs font-semibold text-slate-300 uppercase">
                  {t.contactPage.emailLabel}
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-1 inline-block font-mono text-sm font-semibold text-brand hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-xs font-semibold text-slate-300 uppercase">
                  {t.contactPage.hqLabel}
                </p>
                <p className="mt-1 text-sm text-foreground">
                  Palembang (HQ &amp; Bootcamp) &amp; Jakarta (Commercial
                  Office)
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-background/60 p-4 text-xs leading-relaxed text-slate-300">
            {t.contactPage.responseSla}
          </div>
        </div>

        {/* Kolom Kanan (7 Kolom): Formulir Kontak & Kemitraan Tervalidasi Zod (PBI-14) */}
        <div className="rounded-2xl bg-surface p-6 sm:p-8 lg:col-span-7">
          {isSubmitted ? (
            <div className="flex flex-col items-start justify-center space-y-4 py-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {t.contactPage.successTitle}
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                {t.contactPage.successDesc}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 cursor-pointer rounded-lg border border-brand/40 bg-brand/10 px-5 py-2.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
              >
                {t.contactPage.sendAnotherBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="font-display text-xl font-bold text-foreground">
                {t.contactPage.formHeading}
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Input Nama Lengkap */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    {t.contactPage.fullNameLabel}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder={t.contactPage.fullNamePlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  />
                  {fieldErrors.fullName && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Input Nama Perusahaan */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    {t.contactPage.companyLabel}
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder={t.contactPage.companyPlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  />
                  {fieldErrors.companyName && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{fieldErrors.companyName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Input Email Bisnis */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    {t.contactPage.emailInputLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t.contactPage.emailPlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  />
                  {fieldErrors.email && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Pilihan Kategori Keperluan */}
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    {t.contactPage.inquiryTypeLabel}
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inquiryType: e.target
                          .value as ContactFormInput["inquiryType"],
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none"
                  >
                    <option value="SPONSORSHIP">
                      {t.contactPage.inquiryOptions.SPONSORSHIP}
                    </option>
                    <option value="MEDIA">
                      {t.contactPage.inquiryOptions.MEDIA}
                    </option>
                    <option value="TOURNAMENT">
                      {t.contactPage.inquiryOptions.TOURNAMENT}
                    </option>
                    <option value="GENERAL">
                      {t.contactPage.inquiryOptions.GENERAL}
                    </option>
                  </select>
                </div>
              </div>

              {/* Input Rincian Pesan / Proposal */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-slate-200"
                >
                  {t.contactPage.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t.contactPage.messagePlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                />
                {fieldErrors.message && (
                  <p
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{fieldErrors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting
                  ? t.contactPage.submittingButton
                  : t.contactPage.submitButton}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
