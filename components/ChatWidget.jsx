"use client";

import { useEffect, useRef, useState } from "react";
import Cta from "./Cta";
import { toPlainChat } from "@/lib/plainChat";

const WELCOME =
  "Hi. I can answer short questions about Martinez Painting services, free estimates, hours, and the areas we serve.";

const STORAGE_KEY = "martinez-chat-messages-v2";

function loadMessages() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [{ role: "assistant", content: WELCOME }];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return [{ role: "assistant", content: WELCOME }];
    return parsed.filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string");
  } catch {
    return [{ role: "assistant", content: WELCOME }];
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
  const [ready, setReady] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    setMessages(loadMessages());
    setReady(true);
  }, []);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setOnHero(false);
        return;
      }
      setOnHero(hero.getBoundingClientRect().bottom > window.innerHeight * 0.42);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  }, [messages, ready]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((item) => item.role === "user" || item.content !== WELCOME),
        }),
      });
      const data = await response.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content: toPlainChat(data.reply || data.error) || "Unable to complete that request at this time.",
        },
      ]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Unable to complete that request at this time." }]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={`chat-widget${onHero && !open ? " is-hidden" : ""}`}>
      {open ? (
      <section
        className="flex h-[min(560px,calc(100vh-120px))] w-[min(400px,calc(100vw-32px))] flex-col border border-[color:var(--rule)] bg-[color:var(--bg-raised)] shadow-2xl"
        aria-label="Martinez Painting assistant"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[color:var(--rule)] px-4 py-4">
          <div>
            <p className="kicker">Studio desk</p>
            <h2 className="mt-1 text-[28px]">Website assistant</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </header>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" ref={listRef}>
          {messages.map((item, index) => (
            <p
              key={`${item.role}-${index}-${item.content.slice(0, 12)}`}
              className={`max-w-[92%] px-3.5 py-3 text-sm leading-relaxed ${
                item.role === "user" ? "self-end bg-clay text-[#fff7ef]" : "self-start bg-[color:var(--bg)]"
              }`}
            >
              {item.role === "assistant" ? toPlainChat(item.content) : item.content}
            </p>
          ))}
          {pending && <p className="self-start bg-[color:var(--bg)] px-3.5 py-3 text-sm text-[color:var(--muted)]">Reviewing our published information…</p>}
        </div>
        <form className="grid grid-cols-[1fr_auto] gap-2 border-t border-[color:var(--rule)] p-3" onSubmit={send}>
          <label className="sr-only" htmlFor="chat-input">Ask about Martinez Painting</label>
          <input
            id="chat-input"
            className="border border-[color:var(--rule)] bg-[color:var(--bg)] px-3 py-3 text-[color:var(--fg)]"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about our published services"
            autoComplete="off"
            disabled={pending}
          />
          <Cta variant="primary" type="submit" disabled={pending || !input.trim()}>Send</Cta>
        </form>
      </section>
      ) : null}
      <button
        type="button"
        className="chat-launch"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close website assistant" : "Open website assistant"}
      >
        {open ? "Close" : "Ask us"}
      </button>
    </div>
  );
}
