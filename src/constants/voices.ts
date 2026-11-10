export interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female';
  language: string;
  description: string;
  previewSampleUrl?: string;
}

export const DUBBING_VOICES: VoiceProfile[] = [
  { id: 'uz-dilmurod', name: 'Dilmurod', gender: 'male', language: 'uz-UZ', description: "Erkak, jiddiy va rasmiy taqdimotlar uchun" },
  { id: 'uz-malika', name: 'Malika', gender: 'female', language: 'uz-UZ', description: "Ayol, sokin va ravon tushuntirishlar uchun" },
  { id: 'en-alex', name: 'Alex', gender: 'male', language: 'en-US', description: "English American natural narrator" },
  { id: 'en-emma', name: 'Emma', gender: 'female', language: 'en-US', description: "English American warm storyteller" },
  { id: 'ru-dmitry', name: 'Dmitry', gender: 'male', language: 'ru-RU', description: "Русский нейтральный диктор" }
];
