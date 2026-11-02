"use client";

import React, { useState, useEffect } from "react";
import {
  Swords,
  Plus,
  Pencil,
  Trash2,
  Trophy,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink,
  Radio,
  Calendar,
} from "lucide-react";

interface MatchItem {
  id: string;
  tournamentName: string;
  stage: string;
  scheduledAt: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  formatType: "BATTLE_ROYALE" | "TACTICAL_5V5";
  division: {
    name: string;
    slug: string;
    shortCode: string;
  };
  streamUrl: string | null;
  resultBattleRoyale: {
    placement: number;
    placementLabel: string;
    totalPoints: number;
    wwcdCount?: number;
  } | null;
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<MatchItem | null>(null);

  const [formData, setFormData] = useState({
    tournamentName: "",
    stage: "",
    divisionSlug: "pubg-mobile",
    status: "UPCOMING" as "UPCOMING" | "LIVE" | "COMPLETED",
    formatType: "BATTLE_ROYALE" as "BATTLE_ROYALE" | "TACTICAL_5V5",
    scheduledAt: new Date().toISOString().slice(0, 16),
    streamUrl: "",
    placement: "1",
    placementLabel: "#1 WWCD",
    totalPoints: "148",
    wwcdCount: "3",
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/matches");
      const data = await res.json();
      if (data.success && data.data?.items) {
        setMatches(data.data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const openAddModal = () => {
    setEditingMatch(null);
    setFormData({
      tournamentName: "",
      stage: "",
      divisionSlug: "pubg-mobile",
      status: "UPCOMING",
      formatType: "BATTLE_ROYALE",
      scheduledAt: new Date().toISOString().slice(0, 16),
      streamUrl: "",
      placement: "1",
      placementLabel: "#1 WWCD",
      totalPoints: "100",
      wwcdCount: "1",
    });
    setModalOpen(true);
    setFeedback(null);
  };

  const openEditModal = (m: MatchItem) => {
    setEditingMatch(m);
    setFormData({
      tournamentName: m.tournamentName,
      stage: m.stage,
      divisionSlug: m.division.slug,
      status: m.status,
      formatType: m.formatType,
      scheduledAt: new Date(m.scheduledAt).toISOString().slice(0, 16),
      streamUrl: m.streamUrl || "",
      placement: m.resultBattleRoyale?.placement?.toString() || "1",
      placementLabel: m.resultBattleRoyale?.placementLabel || "#1",
      totalPoints: m.resultBattleRoyale?.totalPoints?.toString() || "0",
      wwcdCount: m.resultBattleRoyale?.wwcdCount?.toString() || "0",
    });
    setModalOpen(true);
    setFeedback(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const payload: any = {
        tournamentName: formData.tournamentName,
        stage: formData.stage,
        scheduledAt: new Date(formData.scheduledAt).toISOString(),
        status: formData.status,
        formatType: formData.formatType,
        streamUrl: formData.streamUrl || null,
        divisionSlug: formData.divisionSlug,
      };

      if (formData.status === "COMPLETED") {
        payload.resultBattleRoyale = {
          placement: parseInt(formData.placement) || 1,
          placementLabel: formData.placementLabel || `#${formData.placement}`,
          totalPoints: parseInt(formData.totalPoints) || 0,
          wwcdCount: parseInt(formData.wwcdCount) || 0,
        };
      } else {
        payload.resultBattleRoyale = null;
      }

      const url = editingMatch
        ? `/api/v1/matches/${editingMatch.id}`
        : "/api/v1/matches";
      const method = editingMatch ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Gagal menyimpan jadwal pertandingan.");
      }

      setFeedback({ type: "success", message: "Jadwal pertandingan berhasil disimpan!" });
      setTimeout(() => {
        setModalOpen(false);
        fetchMatches();
      }, 1000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data pertandingan ini?")) return;
    try {
      const res = await fetch(`/api/v1/matches/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        fetchMatches();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Swords className="text-amber-500" /> Kelola Jadwal & Hasil Pertandingan
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Atur jadwal turnamen mendatang, status LIVE pertandingan, skor poin, WWCD, dan link siaran langsung.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-amber-950/40 cursor-pointer"
        >
          <Plus size={18} /> Tambah Pertandingan
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Turnamen & Babak</th>
                <th className="px-5 py-4">Divisi</th>
                <th className="px-5 py-4">Waktu Jadwal</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Hasil / Poin</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    Memuat data jadwal...
                  </td>
                </tr>
              ) : matches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    Belum ada data pertandingan.
                  </td>
                </tr>
              ) : (
                matches.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{item.tournamentName}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.stage}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-950/50 border border-red-800/60 text-red-300">
                        {item.division.shortCode || item.division.name}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono text-slate-300">
                      {new Date(item.scheduledAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      {item.status === "LIVE" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                          <Radio size={12} /> LIVE
                        </span>
                      ) : item.status === "COMPLETED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/50 text-emerald-400 border border-emerald-800/50">
                          Selesai
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950/50 text-blue-400 border border-blue-800/50">
                          Mendatang
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs">
                      {item.status === "COMPLETED" && item.resultBattleRoyale ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-amber-400">
                            {item.resultBattleRoyale.placementLabel} ({item.resultBattleRoyale.totalPoints} Pts)
                          </span>
                          {item.resultBattleRoyale.wwcdCount ? (
                            <span className="text-[11px] text-slate-400">
                              {item.resultBattleRoyale.wwcdCount}x WWCD
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {item.streamUrl && (
                        <a
                          href={item.streamUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 inline-block"
                          title="Tonton Live Stream"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 cursor-pointer"
                        title="Edit Pertandingan"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer"
                        title="Hapus Pertandingan"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-bold text-lg text-white">
                {editingMatch ? "Edit Pertandingan" : "Tambah Jadwal Pertandingan"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {feedback && (
                <div
                  className={`p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
                    feedback.type === "success"
                      ? "bg-emerald-950/50 border border-emerald-800 text-emerald-300"
                      : "bg-rose-950/50 border border-rose-800 text-rose-300"
                  }`}
                >
                  {feedback.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span>{feedback.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Turnamen</label>
                <input
                  type="text"
                  required
                  value={formData.tournamentName}
                  onChange={(e) => setFormData({ ...formData, tournamentName: e.target.value })}
                  placeholder="Contoh: PMNC Indonesia 2026 atau PMSL SEA Fall"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Babak / Stage</label>
                <input
                  type="text"
                  required
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  placeholder="Contoh: Grand Finals - Match 1 s/d 6"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Divisi Tim</label>
                  <select
                    value={formData.divisionSlug}
                    onChange={(e) => setFormData({ ...formData, divisionSlug: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="pubg-mobile">PUBG Mobile</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status Pertandingan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="UPCOMING">Mendatang (Upcoming)</option>
                    <option value="LIVE">Sedang Berlangsung (LIVE)</option>
                    <option value="COMPLETED">Selesai (Completed)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Format Permainan</label>
                  <select
                    value={formData.formatType}
                    onChange={(e) => setFormData({ ...formData, formatType: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="BATTLE_ROYALE">Battle Royale (16 Tim)</option>
                    <option value="TACTICAL_5V5">Tactical 5v5 (Versus)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Waktu & Tanggal Pertandingan</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Siaran Langsung (Stream Link)</label>
                <input
                  type="text"
                  value={formData.streamUrl}
                  onChange={(e) => setFormData({ ...formData, streamUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=... atau https://vidio.com/..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Battle Royale Result Section (Hanya tampil saat status SELESAI / COMPLETED) */}
              {formData.status === "COMPLETED" && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <Trophy size={14} /> Hasil Skor & Placement Battle Royale
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Rank / Juara</label>
                      <input
                        type="number"
                        min="1"
                        max="32"
                        value={formData.placement}
                        onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Label Badge</label>
                      <input
                        type="text"
                        value={formData.placementLabel}
                        onChange={(e) => setFormData({ ...formData, placementLabel: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                        placeholder="#1 WWCD"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Total Poin</label>
                      <input
                        type="number"
                        value={formData.totalPoints}
                        onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                        placeholder="148"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Jumlah WWCD</label>
                      <input
                        type="number"
                        value={formData.wwcdCount}
                        onChange={(e) => setFormData({ ...formData, wwcdCount: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                        placeholder="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-500 text-white transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-950/50"
                >
                  {saving ? "Menyimpan..." : editingMatch ? "Perbarui Pertandingan" : "Simpan Pertandingan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
