export type HeaderProps = {
  className?: string
}

export type LogoProps = {
  className?: string
}

export type NavigationProps = {
  className?: string
  isMobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}
