"use client";

export default function Cta({ as = "button", variant = "primary", className = "", children, disabled, type, onClick, ...props }) {
  const Comp = as === "a" ? "a" : "button";
  const kind = variant === "secondary" ? "cta-btn cta-secondary" : variant === "tertiary" ? "cta-btn cta-tertiary" : "cta-btn cta-primary";
  const buttonType = as === "a" ? undefined : type || "button";

  return (
    <Comp
      className={`${kind} ${className} ${disabled ? "is-disabled" : ""}`}
      type={buttonType}
      disabled={as === "a" ? undefined : disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    >
      <span>{children}</span>
      {variant === "primary" ? (
        <span className="cta-arrow" aria-hidden="true">
          <i className="cta-arrow-shaft" />
          <span className="cta-arrow-head">→</span>
        </span>
      ) : null}
    </Comp>
  );
}
