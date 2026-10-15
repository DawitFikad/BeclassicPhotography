import { ReactNode } from 'react';

export interface StaggeredMenuItem {
  label: string;
  link: string;
  ariaLabel?: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logo?: ReactNode;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  panelBottom?: ReactNode;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

declare const StaggeredMenu: React.FC<StaggeredMenuProps>;
export default StaggeredMenu;

