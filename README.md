# Beacon of Blessings Charity Initiative Website

A modern, responsive website for the Beacon of Blessings Charity Initiative - a Christian nonprofit organization focused on sharing the love of Jesus Christ through educational support for vulnerable communities in Nigeria.

## 🌟 Features

### ✅ Complete Website Pages
- **Homepage** - Hero section with mission, impact stats, and call-to-action
- **About Page** - Founders profiles, vision, mission, core values, and organizational timeline
- **Projects Page** - Detailed project showcase including completed and upcoming initiatives
- **Gallery Page** - Photo gallery structure ready for community photos
- **Donate Page** - Complete donation system with PDF receipt generation
- **Contact Page** - Contact forms and information

### ✅ Core Functionality
- **🎨 Modern 2025 Design** - Green and white brand colors, gradients, smooth animations
- **📱 Fully Responsive** - Mobile-first design optimized for all devices
- **💰 Donation System** - Secure payment processing with PDF receipts
- **🤖 Smart Chatbot** - AI assistant for answering questions about the organization
- **📜 Bible Integration** - Scripture verses throughout the site reflecting Christian values
- **⚡ Performance Optimized** - Fast loading, SEO-friendly, accessibility compliant

### ✅ Technical Excellence
- **Next.js 16** with TypeScript and Tailwind CSS
- **Contentful Ready** - Complete CMS integration structure
- **PDF Generation** - Automatic donation receipts
- **Form Handling** - Contact forms with validation
- **Modern Animations** - Framer Motion for smooth user experience
- **Clean Code** - ESLint/TypeScript compliant, well-documented

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd beacon-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONTENTFUL_SPACE_ID` | Your Contentful space ID | Optional* |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful delivery API token | Optional* |
| `CONTENTFUL_PREVIEW_TOKEN` | Contentful preview API token | Optional* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for donations | Optional* |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional* |
| `SMTP_HOST` | Email server for contact forms | Optional* |
| `SMTP_USER` | Email username | Optional* |
| `SMTP_PASSWORD` | Email password | Optional* |

*Currently optional as the site works with static content

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📁 Project Structure

```
beacon-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── donate/            # Donation page
│   │   ├── gallery/           # Gallery page
│   │   ├── projects/          # Projects page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── sections/         # Page sections
│   │   └── ui/               # UI components (Button, Chatbot)
│   ├── lib/                   # Utility functions
│   │   ├── contentful.ts     # Contentful API functions
│   │   └── pdfGenerator.ts   # PDF receipt generation
│   ├── types/                # TypeScript type definitions
│   │   └── contentful.ts     # Contentful content types
│   └── styles/               # Global styles
├── public/                    # Static assets
├── CONTENTFUL_MIGRATION.md    # Contentful setup guide
└── README.md                  # This file
```

## 🎨 Brand Guidelines

### Colors
- **Primary Green**: #22c55e (Tailwind green-500)
- **Secondary Green**: #16a34a (Tailwind green-600)  
- **White**: #ffffff
- **Text**: #1f2937 (Tailwind gray-800)

### Typography
- **Primary Font**: Geist Sans
- **Display Font**: System UI Serif for headings
- **Monospace**: Geist Mono

### Design Principles
- Clean, modern design following 2025 trends
- Mobile-first responsive approach
- Accessibility compliance (WCAG 2.1)
- Green and white color scheme representing growth and purity
- Biblical foundation with integrated scriptures

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Connect GitHub repo, add build command `npm run build`
- **AWS/DigitalOcean**: Build locally and upload `out/` folder

## 📚 Content Management

### Static Content (Current)
All content is currently built into the components and can be edited directly in the code.

### Contentful CMS (Future)
Complete Contentful integration is ready for when you want to enable content management:

1. Set up Contentful space
2. Create content models using `CONTENTFUL_MIGRATION.md`
3. Add environment variables
4. Migrate static content to Contentful
5. Update components to fetch from Contentful

See `CONTENTFUL_MIGRATION.md` for detailed setup instructions.

## 🔧 Customization

### Adding New Pages
1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`

### Modifying Styles
- Global styles: `src/app/globals.css`
- Component styles: Tailwind classes
- Brand colors: CSS custom properties in globals.css

### Adding Features
- New components: `src/components/`
- API functions: `src/lib/`
- Type definitions: `src/types/`

## 🤖 Chatbot

The integrated chatbot can answer questions about:
- Organization founders and leadership
- Mission and vision statements
- Projects and impact
- Donation information
- Volunteer opportunities
- Contact details
- Biblical foundation and values

To customize chatbot responses, edit the knowledge base in `src/components/ui/Chatbot.tsx`.

## 💳 Donation System

Features:
- One-time and recurring donations
- Multiple payment amounts + custom amounts
- Donor information collection
- Tax deductibility notice for international donors
- PDF receipt generation
- Secure payment processing ready for Stripe integration

## 📞 Support

For technical questions about this website:
1. Check this README
2. Review code comments
3. Consult `CONTENTFUL_MIGRATION.md` for CMS setup

For Beacon of Blessings organizational questions:
- Email: info@beaconofblessings.org
- Phone: +234 (0) 123 456 7890

## 📄 License

This project is built specifically for Beacon of Blessings Charity Initiative. All rights reserved.

---

Built with ❤️ for the Kingdom of God and the education of Nigerian children.
