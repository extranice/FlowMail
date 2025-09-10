import React from 'react';
import { SettingsState, Page } from './types';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
export const NAV_ITEMS: { id: Page; label: string; icon: React.ReactElement }[] = [
  {
    id: 'layout',
    label: 'UI & Layout',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
    ),
  },
  {
    id: 'workflow',
    label: 'Inbox & Workflow',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"></path><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
    ),
  },
  {
    id: 'reading',
    label: 'Navigation & Reading',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    ),
  },
  {
    id: 'enhancements',
    label: 'Extra Enhancements',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    ),
  },
];

export const DEFAULT_SETTINGS: SettingsState = {
  visualClutter: {
    ads: true,
    extraButtons: true,
    unusedToolbars: false,
  },
  sizing: {
    messageWidth: 80,
    inboxListWidth: 30,
  },
  font: {
    family: 'Default',
    size: 14,
    weight: 400,
  },
  theme: 'light',
  collapsible: {
    leftNav: true,
    rightChat: true,
    labels: false,
  },
  inboxPaused: false,
  bundledThreads: {
    enabled: true,
    categories: {
      updates: true,
      social: true,
      finance: false,
    },
  },
  savedSearches: [
    { id: '1', query: 'from:boss is:important' },
    { id: '2', query: 'has:attachment larger:5M' },
  ],
  labels: {
    compactView: false,
    customColors: [
      { id: 'proj-a', name: 'Project Alpha', color: '#3b82f6' },
      { id: 'urgent', name: 'Urgent', color: '#ef4444' },
      { id: 'later', name: 'Read Later', color: '#8b5cf6' },
    ],
  },
  conversationOrder: 'newest-first',
  minimalistView: {
    conversation: true,
    compose: false,
    reply: true,
  },
  floatingActions: {
    compose: true,
    search: false,
    tasks: true,
  },
  multiAccount: true,
  notifications: {
    enabled: true,
    withActions: true,
  },
  contextualToolbars: true,
};

export const FONT_FACES = ['Default', 'Roboto', 'Open Sans', 'Lato', 'Merriweather'];
export const FONT_WEIGHTS = [
    { label: 'Light', value: 300 },
    { label: 'Normal', value: 400 },
    { label: 'Medium', value: 500 },
    { label: 'Bold', value: 700 }
];