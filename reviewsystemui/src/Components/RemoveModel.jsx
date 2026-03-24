import { useState } from "react";
import { createPortal } from "react-dom";
import { DeleteReview } from "../services/Formservices"
export default function RemoveModel({ reviewId,reviewtext, onClose }) {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("idle");

const handleSend = async () => {
  if (!reason.trim()) return;
  setStatus("loading");
  try {
    await DeleteReview(reviewId, reviewtext, reason.trim());
    setStatus("sent");
  } catch {
    setStatus("error");
  }
};

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-600 hover:text-zinc-300 transition-colors leading-none"
        >✕</button>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="text-4xl">📨</span>
            <p className="text-white font-medium">report sent bestie</p>
            <p className="text-zinc-500 text-sm">admin's on it — if it's valid it's getting deleted  🫡</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-xl border border-white/10 px-5 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >close</button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-white font-medium text-base">bruh what's wrong with this? 👀</p>
              <p className="text-zinc-600 text-xs mt-1">anonymous · goes straight to admin</p>
            </div>

            <label className="text-xs text-zinc-500 block mb-1.5 tracking-wide">what's the vibe</label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="spill the tea... why should this be removed? did you messed up🫠"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-300 placeholder-zinc-600 outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all resize-none leading-relaxed"
            />

            {status === "error" && (
              <p className="text-xs text-rose-400 mt-1.5">something broke 😭 try again?</p>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSend}
                disabled={status === "loading" || !reason.trim()}
                className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-sm font-medium text-rose-300 hover:bg-rose-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "sending... 📡" : "send to admin 🚀"}
              </button>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >nvm</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body  
  );
}