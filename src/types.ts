
export type Page = 'layout' | 'workflow' | 'reading' | 'enhancements';

export type Theme = 'light' | 'dark' | 'high-contrast';

export interface SavedSearch {
  id: string;
  query: string;
}

export interface CustomLabel {
  id: string;
  name: string;
  color: string;
}

export interface SettingsState {
  // Layout
  visualClutter: {
    ads: boolean;
    extraButtons: boolean;
    unusedToolbars: boolean;
  };
  sizing: {
    messageWidth: number;
    inboxListWidth: number;
  };
  font: {
    family: string;
    size: number;
    weight: number;
  };
  theme: Theme;
  collapsible: {
    leftNav: boolean;
    rightChat: boolean;
    labels: boolean;
  };

  // Workflow
  inboxPaused: boolean;
  bundledThreads: {
    enabled: boolean;
    categories: {
      updates: boolean;
      social: boolean;
      finance: boolean;
    };
  };
  savedSearches: SavedSearch[];
  labels: {
    compactView: boolean;
    customColors: CustomLabel[];
  };

  // Reading
  conversationOrder: 'newest-first' | 'oldest-first';
  minimalistView: {
    conversation: boolean;
    compose: boolean;
    reply: boolean;
  };

  // Enhancements
  floatingActions: {
    compose: boolean;
    search: boolean;
    tasks: boolean;
  };
  multiAccount: boolean;
  notifications: {
    enabled: boolean;
    withActions: boolean;
  };
  contextualToolbars: boolean;
}