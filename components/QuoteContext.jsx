"use client";

import { createContext, useContext, useState } from "react";

const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <QuoteContext.Provider value={{ open, openQuote: () => setOpen(true), closeQuote: () => setOpen(false) }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
