"use client";

import { createContext, useContext, useMemo, useState } from "react";

const QuoteContext = createContext({
  open: false,
  openQuote: () => {},
  closeQuote: () => {},
});

export function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      open,
      openQuote: () => setOpen(true),
      closeQuote: () => setOpen(false),
    }),
    [open],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  return useContext(QuoteContext);
}
