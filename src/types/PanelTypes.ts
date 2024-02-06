export type PanelLink = {
  label: string;
  link: string;
};

export type PanelItem = {
  label: string;
  icon: React.ElementType;
  link: string;
  initiallyOpened?: boolean;
  links?: PanelLink[];
};
