export enum SportType {
  Soccer = "Soccer",
  Basketball = "Basketball",
  Hockey = "Hockey",
  Tennis = "Tennis",
  Volleyball = "Volleyball",
  Padel = "Padel",
  Other = "Other",
}

export const SPORT_ICONS: Record<SportType, string> = {
  [SportType.Soccer]: "⚽",
  [SportType.Basketball]: "🏀",
  [SportType.Hockey]: "🏒",
  [SportType.Tennis]: "🎾",
  [SportType.Volleyball]: "🏐",
  [SportType.Padel]: "🏸",
  [SportType.Other]: "🏅",
};
