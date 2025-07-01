# Typing Galah 🦜

Australia's own touch typing platform - Learn to type with authentic Australian English!

## 🌟 Features

- **Australian English**: Practice with proper Australian spelling (colour, centre, grey)
- **Local Slang**: Type with familiar Aussie terms (arvo, barbie, takeaway, ute)
- **Cultural References**: Content that speaks to Australian learners
- **Gamification**: "Galah Feathers" rewards and Australian-themed achievements
- **Real-time Stats**: Live WPM and accuracy tracking
- **Virtual Keyboard**: Visual finger placement guidance
- **User Profiles**: Track progress and achievements
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd typing-galah
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and update with your Supabase credentials:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The project uses Supabase as the backend. You'll need to create the following tables:

### Tables Required

- `profiles` - User profile information
- `courses` - Typing courses
- `lessons` - Individual lessons within courses
- `attempts` - User typing attempt records
- `achievements` - Available achievements
- `user_achievements` - User's earned achievements

See `lib/supabase.ts` for the complete database schema.

## 🎨 Australian Theming

The project uses a custom "Galah" color palette inspired by the Australian Galah bird:

- **Galah Pink Vibrant**: `#e6749a`
- **Galah Pink Soft**: `#e4a8c4`
- **Galah Grey Mid**: `#8d9aac`
- **Galah Grey Dark**: `#4e566a`
- **Galah Off White**: `#f8f7fa`

## 📱 Project Structure

```
typing-galah/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── demo/              # Demo typing interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── AuthProvider.tsx   # Authentication context
│   ├── HeroSection.tsx    # Landing page hero
│   ├── Navbar.tsx         # Navigation component
│   ├── TypingInterface.tsx # Core typing component
│   └── VirtualKeyboard.tsx # Virtual keyboard
├── lib/                   # Utilities
│   └── supabase.ts        # Supabase client & types
└── public/               # Static assets
```

## 🔑 Key Components

### TypingInterface

The core typing practice component featuring:

- Real-time WPM/accuracy calculation
- Keystroke tracking and analytics
- Visual feedback for correct/incorrect typing
- Lesson completion handling

### VirtualKeyboard  

Visual keyboard component with:

- Key highlighting for current character
- Finger placement guidance
- Error indication

### DashboardStats

User progress dashboard showing:

- Current WPM and accuracy stats
- Lessons completed
- Recent achievements
- Progress charts

## 🏆 Achievements System

Australian-themed achievements include:

- "Fair Dinkum Beginner" - Complete your first lesson
- "You Little Ripper!" - Achieve 40+ WPM
- "True Blue Typist" - 95%+ accuracy milestone
- And many more!

## 🌏 Australian English Content

Content specifically designed for Australian learners:

- **Spelling**: colour, centre, realise, analyse
- **Vocabulary**: ute, takeaway, arvo, barbie, bikkies, lollies
- **Expressions**: "fair dinkum", "she'll be right mate", "no worries"

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: React Icons

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built with ❤️ for Australia 🇦🇺*
