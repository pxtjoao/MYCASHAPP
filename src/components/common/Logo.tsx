import { twMerge } from 'tailwind-merge';
// Standard React implementation for inline SVGs or standard img tags would be preferred if configured.
// But to ensure it works without complex vite config changes right now, I'll use standard img tags matching the new files.
// HOWEVER, simple img tags won't inherit 'currentColor'.
// Ideally we want inline components.
// Let's create a simple wrapper that imports them as images first to see if that solves the layout scrambling.
// Actually, standard Vite supports importing .svg as a URL.
// To support text color inheritance, standard Practice is using SVGR or inline SVG code.
// Given the user wants to "use just one file", I will trust the SVG file content layout.
// I will keep it simple: Use <img> tags. If color doesn't match, I will revisit. The SVG has fill="currentColor" (modified by me previously), but <img> tags don't support that.
// REVISION: The user gave me the files. I will use them as `img` sources for absolute simplicity and perfect layout fidelity (as it's a single baked image).
// NOTE: I cannot use `currentColor` with `<img>` tags easily. I will revert the currentColor change in the files or just accept they might be black.
// The provided SVGs have hardcoded fills in the original provided by user usually? The user provided files seem to have hex codes.
// I will import them as URLs.

import LogoDefaultInfo from '../../assets/logo-default.svg';
import LogoCollapsedInfo from '../../assets/logo-collapsed.svg';

interface LogoProps {
    variant?: 'default' | 'small';
    className?: string;
}

export function Logo({ variant = 'default', className }: LogoProps) {
    if (variant === 'small') {
        return (
            <img
                src={LogoCollapsedInfo}
                alt="MyCash Logo"
                className={twMerge("w-[45px] h-[43px]", className)}
            />
        );
    }

    return (
        <img
            src={LogoDefaultInfo}
            alt="MyCash Logo"
            className={twMerge("w-[140px] h-[30px]", className)}
        />
    );
}
