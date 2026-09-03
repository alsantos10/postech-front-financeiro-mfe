import Link from 'next/link';
import { NavigationLink } from '@/core/entities/NavigationLink';

interface NavbarMobileProps {
  links: NavigationLink[];
  isOpen: boolean;
  onClose: () => void;
}

export function NavbarMobile({ links, isOpen, onClose }: NavbarMobileProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-16 left-4 w-[172] rounded shadow-lg border border-gray-200 md:hidden z-50 overflow-hidden"
      style={{ backgroundColor: '#E4EDE3' }}
    >
      <nav className="flex flex-col">
        {links.map((link, index) => (
          <Link 
            key={link.href} 
            href={link.href}
            onClick={onClose}
            className={`p-3 text-sm text-center font-medium hover:bg-black/5 transition-colors ${
              index !== links.length - 1 ? 'border-b border-black/10' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
