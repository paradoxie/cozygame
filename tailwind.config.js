/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 颜色配置
        'primary-blue': '#3B82F6',
        'primary-blue-dark': '#2563EB',
        'primary-blue-light': '#93C5FD',
        'accent-yellow': '#F59E0B',
        'accent-yellow-dark': '#D97706',
        'neutral-darkest': '#111827',
        'neutral-dark': '#1F2937',
        'neutral-medium': '#4B5563',
        'neutral-light': '#9CA3AF',
        'neutral-lightest': '#F3F4F6',
        'success-green': '#10B981',
        'error-red': '#EF4444',
        'warning-orange': '#F97316',
      },
    },
  },
  plugins: [],
} 