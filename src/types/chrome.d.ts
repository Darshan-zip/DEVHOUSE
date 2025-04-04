
// Type definitions for Chrome extension API
interface Chrome {
  tabs: {
    query: (
      queryInfo: { active: boolean; currentWindow: boolean },
      callback: (tabs: { url?: string }[]) => void
    ) => void;
  };
}

declare const chrome: Chrome;
