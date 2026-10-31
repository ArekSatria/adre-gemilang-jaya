"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockGlobalSettings } from "@/lib/api/mock-data";

type GlobalSettingsData = typeof mockGlobalSettings;
type InquiryCategory = "SPONSORSHIP" | "TOURNAMENT" | "GENERAL";

interface ContactViewProps {
  contactEmail?: string;
  settings?: GlobalSettingsData;
  data?: GlobalSettingsData;
}

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  inquiryType: InquiryCategory;
  message: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  message?: string;
}

export function ContactView({
  contactEmail,
  settings,
  data,
}: ContactViewProps) {
  const { t } = useLanguage();
  const activeSettings = settings ?? data ?? mockGlobalSettings;
  const resolvedEmail =
    contactEmail ??
    activeSettings.contactQuick.partnershipEmail ??
    activeSettings.contactQuick.businessEmail;

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    companyName: "",
    email: "",
    inquiryType: "SPONSORSHIP",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.fullName.trim().length < 3) {
      nextErrors.fullName = t.contactPage.validationErrors.fullName;
    }
    if (formData.companyName.trim().length < 2) {
      nextErrors.companyName = t.contactPage.validationErrors.companyName;
    }
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = t.contactPage.validationErrors.email;
    }
    if (formData.message.trim().length < 20) {
      nextErrors.message = t.contactPage.validationErrors.message;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      inquiryType: "SPONSORSHIP",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman (Tanpa Subjudul) */}
      <div className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
          {t.contactPage.title}
        </h1>
      </div>

      {/* Konten Utama: Kontak Langsung & Formulir */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Informasi Kontak Langsung */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground uppercase sm:text-2xl">
              {t.contactPage.directInfoHeading}
            </h2>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="font-mono text-xs font-bold text-brand uppercase">
                  {t.contactPage.emailLabel}
                </p>
                <a
                  href={`mailto:${resolvedEmail}`}
                  className="mt-1 inline-block text-base font-semibold text-foreground hover:text-brand"
                >
                  {resolvedEmail}
                </a>
              </div>

              <div>
                <p className="font-mono text-xs font-bold text-brand uppercase">
                  {t.contactPage.hqLabel}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {t.contactPage.hqValue}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs leading-relaxed text-slate-400">
                {t.contactPage.responseSla}
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Kirim Pesan */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground uppercase sm:text-2xl">
              {t.contactPage.formHeading}
            </h2>

            {isSuccess ? (
              <div className="mt-6 space-y-6 rounded-xl border border-brand/40 bg-brand/10 p-6">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-brand uppercase">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {t.contactPage.successDesc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
                >
                  {t.contactPage.sendAnotherBtn}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-slate-200 uppercase"
                    >
                      {t.contactPage.fullNameLabel}
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder={t.contactPage.fullNamePlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="text-xs font-medium text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Perusahaan / Instansi */}
                  <div className="space-y-2">
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-bold text-slate-200 uppercase"
                    >
                      {t.contactPage.companyLabel}
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder={t.contactPage.companyPlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                    />
                    {errors.companyName && (
                      <p className="text-xs font-medium text-red-400">
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-200 uppercase"
                    >
                      {t.contactPage.emailInputLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t.contactPage.emailPlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Kategori Keperluan */}
                  <div className="space-y-2">
                    <label
                      htmlFor="inquiryType"
                      className="block text-xs font-bold text-slate-200 uppercase"
                    >
                      {t.contactPage.inquiryTypeLabel}
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inquiryType: e.target.value as InquiryCategory,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground focus:border-brand focus:outline-none"
                    >
                      <option value="SPONSORSHIP">
                        {t.contactPage.inquiryOptions.SPONSORSHIP}
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

                {/* Pesan */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-200 uppercase"
                  >
                    {t.contactPage.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t.contactPage.messagePlaceholder}
                    className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  />
                  {errors.message && (
                    <p className="text-xs font-medium text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-8 py-4 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
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
    </div>
  );
}
