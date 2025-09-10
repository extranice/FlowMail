import React from 'react';
import { SettingsState, Page } from './types';

export const NAV_ITEMS: { id: Page; label: string; icon: React.ReactElement }[] = [
  {
    id: 'layout',
    label: 'UI & Layout',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>
    ),
  },
  {
    id: 'workflow',
    label: 'Inbox & Workflow',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="m4 8 8 5 8-5"/><path d="m12 12 4 2.5"/><path d="M12 12v8"/><path d="m8 12-4 2.5"/></svg>
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
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2.5a2.5 2.5 0 0 1 3.5 3.5L8.5 17.5l-4.5 1 1-4.5Z"/><path d="m13.5 6.5 4 4"/><path d="m2 16 6 6"/><path d="m18 12 2-2"/><path d="m12 6 2-2"/></svg>
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

export const FONT_FACES = ['Default', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Merriweather'];
export const FONT_WEIGHTS = [
    { label: 'Light', value: 300 },
    { label: 'Normal', value: 400 },
    { label: 'Medium', value: 500 },
    { label: 'Bold', value: 700 }
];