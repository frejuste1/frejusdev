import { fontFamily } from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    // Ajout pour les composants dans node_modules si nécessaire
    "./node_modules/@your-org/**/*.{js,jsx,ts,tsx}",
  ],
  
  darkMode: 'class', // Support du mode sombre
  
  theme: {
    extend: {
      // Palette de couleurs étendue et cohérente
      colors: {
        // Couleurs primaires avec variations
        primary: {
          50: '#F0F3FF',
          100: '#E0E8FF',
          200: '#C7D4FF',
          300: '#A5B8FF',
          400: '#8196FF',
          500: '#1E2A78', // couleur principale
          600: '#1A2468',
          700: '#161F58',
          800: '#121A48',
          900: '#0E1538',
          950: '#0A0F28',
        },
        
        secondary: {
          50: '#F4F8FC',
          100: '#E9F1F8',
          200: '#D8E6F1',
          300: '#C0D4E6',
          400: '#4F7CAC', // couleur secondaire
          500: '#4570A0',
          600: '#3B6394',
          700: '#325688',
          800: '#28497C',
          900: '#1F3C70',
        },
        
        neutral: {
          50: '#FAFBFC',
          100: '#F5F6F8',
          200: '#E5E8EB', // couleur neutre
          300: '#D6D9DD',
          400: '#C7CACF',
          500: '#B8BBC1',
          600: '#A9ACB3',
          700: '#9A9DA5',
          800: '#8B8E97',
          900: '#7C7F89',
        },
        
        accent: {
          50: '#FFFCF0',
          100: '#FEF9E1',
          200: '#FDF2C3',
          300: '#FBEBA5',
          400: '#F4D35E', // couleur d'accent
          500: '#F2C94C',
          600: '#F0BF3A',
          700: '#EEB528',
          800: '#ECAB16',
          900: '#EA9F04',
        },
        
        // Couleurs utilitaires supplémentaires
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        
        // Couleurs pour le mode sombre améliorées
        dark: {
          50: '#18181B',
          100: '#27272A',
          200: '#3F3F46',
          300: '#52525B',
          400: '#71717A',
          500: '#A1A1AA',
          600: '#D4D4D8',
          700: '#E4E4E7',
          800: '#F4F4F5',
          900: '#FAFAFA',
        },
        
        // Couleurs système pour une meilleure accessibilité
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        }
      },
      
      // Typographie étendue
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        body: ['Roboto', ...fontFamily.sans],
        heading: ['Inter', 'Poppins', ...fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...fontFamily.mono],
      },
      
      // Tailles de polices personnalisées avec meilleur responsive
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem' }],
        '8xl': ['6rem', { lineHeight: '6.25rem' }],
        '9xl': ['8rem', { lineHeight: '8.25rem' }],
      },
      
      // Espacements personnalisés étendus
      spacing: {
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px
        '88': '22rem',     // 352px
        '128': '32rem',    // 512px
        '144': '36rem',    // 576px
        '160': '40rem',    // 640px
        '176': '44rem',    // 704px
        '192': '48rem',    // 768px
      },
      
      // Breakpoints personnalisés optimisés
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      
      // Animations personnalisées étendues
      animation: {
        // Animations d'entrée
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        
        // Animations de mouvement
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        
        // Animations continues
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        
        // Animations d'attention
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
      },
      
      // Ombres personnalisées étendues
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-primary': '0 0 20px rgba(30, 42, 120, 0.3)',
        'glow-accent': '0 0 20px rgba(244, 211, 94, 0.3)',
      },
      
      // Bordures personnalisées
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // Largeurs et hauteurs personnalisées
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
        'screen-25': '25vh',
      },
      
      // Z-index personnalisés
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Durées de transition personnalisées
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      
      // Curves de transition personnalisées
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Backdrop blur personnalisés
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      
      // Gradients personnalisés étendus
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #1E2A78, #4F7CAC)',
        'gradient-accent': 'linear-gradient(135deg, #F4D35E, #F2C94C)',
        'gradient-sunset': 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FF6B35)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea, #764ba2)',
        'gradient-forest': 'linear-gradient(135deg, #134e5e, #71b280)',
        'mesh-gradient': 'linear-gradient(45deg, #1E2A78 0%, #4F7CAC 25%, #F4D35E 50%, #1E2A78 75%, #4F7CAC 100%)',
      },
      
      // Filters personnalisés
      blur: {
        xs: '2px',
        '4xl': '72px',
      },
    },
  },
  
  plugins: [
    // Plugin pour les formulaires
    forms({ 
      strategy: 'class' 
    }),
    
    // Plugin pour la typographie
    typography({
      DEFAULT: {
        css: {
          maxWidth: 'none',
          color: 'inherit',
          a: {
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: '500',
          },
        },
      },
    }),
    
    // Plugin pour les ratios d'aspect
    aspectRatio,
    
    // Plugin pour les conteneurs
    containerQueries,
    
    // Plugin personnalisé pour les utilitaires supplémentaires
    function({ addUtilities, addComponents, theme }) {
      // Utilitaires personnalisés
      const newUtilities = {
        // Text shadows
        '.text-shadow': {
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        
        // Glass morphism
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Scrollbar styling
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Safe area pour mobile
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
      };
      
      // Composants personnalisés
      const newComponents = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          },
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.secondary.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.secondary.600'),
          },
        },
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.soft'),
          '.dark &': {
            backgroundColor: theme('colors.dark.100'),
          },
        },
      };
      
      addUtilities(newUtilities);
      addComponents(newComponents);
    }
  ],

  // Configuration pour la purge CSS étendue
  safelist: [
    // Couleurs principales
    'bg-primary-500', 'bg-primary-600', 'bg-primary-700',
    'bg-secondary-500', 'bg-secondary-600', 'bg-secondary-700',
    'bg-accent-500', 'bg-accent-600', 'bg-accent-700',
    'bg-success-500', 'bg-warning-500', 'bg-danger-500',  
    'bg-info-500',
    
    // Textes
    'text-primary-500', 'text-primary-600', 'text-primary-700',
    'text-secondary-500', 'text-secondary-600', 'text-secondary-700',
    'text-accent-500', 'text-accent-600', 'text-accent-700',
    'text-danger-500','text-success-500', 'text-warning-500', 'text-info-500',
    
    // Bordures
    'border-primary-500', 'border-secondary-500', 'border-accent-500', 'border-danger-500', 
    
    // Animations (si générées dynamiquement)
    'animate-fade-in', 'animate-slide-up', 'animate-bounce-slow',
    
    // Classes utilitaires
    'glass', 'glass-dark', 'text-shadow', 'text-shadow-md',
  ],
}