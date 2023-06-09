export {};

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import deepMerge from "deepmerge";
// import { Module } from "../components/modules";

// interface IPreferences {
//   largeFont: boolean;
//   theme: string;
//   visibleModules: Record<Module, boolean>;
//   currentCampaignId: string | null;

//   selectedPath: string | null;
//   selectedNote: string | null;
//   selectedSearch: string | null;
//   absentPlayers: string[];
// }

// interface IPreferencesStore {
//   preferences: IPreferences;
//   setPreferences: (preferences: Partial<IPreferences>) => void;
// }

// //default preferences state
// export const defaultPreferences = {
//   largeFont: false,
//   theme: "parchment",
//   visibleModules: {
//     TipModule: true,
//     DCModule: false,
//     DiceModule: true,
//     NotesModule: false,
//     BinderModule: true,
//   },
//   currentCampaignId: null,
//   selectedPath: null,
//   selectedNote: null,
//   selectedSearch: null,
//   absentPlayers: [],
// };

// export const usePreferencesStore = create(
//   persist<IPreferencesStore>(
//     (set, get) => ({
//       preferences: {
//         largeFont: false,
//         theme: "parchment",
//         visibleModules: {
//           TipModule: true,
//           DCModule: false,
//           DiceModule: false,
//           NotesModule: false,
//           BinderModule: true,
//         },
//         currentCampaignId: null,
//         selectedPath: null,
//         selectedNote: null,
//         selectedSearch: null,
//         absentPlayers: [],
//       },

//       setPreferences: (newPreferences: Partial<IPreferences>): void => {
//         const { preferences } = get();
//         set({
//           preferences: {
//             ...preferences,
//             ...newPreferences,
//           },
//         });
//       },

//       setCampaignId: (campaignId: string): void => {
//         const { setPreferences } = get();
//         // clearInitiative(currentCampaignId);
//         setPreferences({ currentCampaignId: campaignId });
//       },
//     }),
//     {
//       name: "PathKit-preferences", // unique name
//       merge: (persistedState, currentState) =>
//         deepMerge(currentState, persistedState as Partial<IPreferencesStore>),
//     }
//   )
// );
