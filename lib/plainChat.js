export function toPlainChat(text) {
  if (!text) return "";

  let value = String(text).replace(/\r\n/g, "\n");
  value = value.replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, "").trim());
  value = value.replace(/`([^`]+)`/g, "$1");
  value = value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  value = value.replace(/\*\*([^*]+)\*\*/g, "$1");
  value = value.replace(/__([^_]+)__/g, "$1");
  value = value.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1$2");
  value = value.replace(/^#{1,6}\s+/gm, "");

  const lines = value
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "").trim())
    .filter(Boolean);
  value = lines.join(" ");

  value = value.replace(/\s+[-*]\s+/g, ", ");
  value = value.replace(/:\s*[.,]/g, ": ");
  value = value.replace(/\s+,/g, ",");
  value = value.replace(/,\s*,+/g, ", ");
  value = value.replace(/[*#_>`]/g, "");
  value = value.replace(/[ \t]{2,}/g, " ");
  value = value.replace(/\s+\./g, ".");
  value = value.replace(/\.{2,}/g, ".");
  return value.trim();
}
