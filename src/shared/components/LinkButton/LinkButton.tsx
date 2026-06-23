import { type LucideIcon } from 'lucide-react';
import './LinkButton.css';

interface LinkButtonProps {
  href: string;
  label: string;
  icon?: LucideIcon;
}

const LinkButton = ({ href, label, icon: Icon }: LinkButtonProps) => {
  return (
    <a href={href} className="link-btn">
      {Icon && <Icon size={16} aria-hidden="true" />}
      {label}
    </a>
  );
};

export default LinkButton;