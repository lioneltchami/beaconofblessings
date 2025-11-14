# Beacon of Blessings Charity Initiative Website

A modern, responsive website for the Beacon of Blessings Charity Initiative - a Christian nonprofit organization focused on sharing the love of Jesus Christ through educational support for vulnerable communities in Nigeria.

## 🌟 Features

### ✅ Complete Website Pages
- **Homepage** - Hero section with mission, impact stats, and call-to-action
- **About Page** - Founders profiles, vision, mission, core values, and organizational timeline
- **Projects Page** - Detailed project showcase including completed and upcoming initiatives
- **Gallery Page** - Photo gallery structure ready for community photos
- **Donate Page** - Complete donation system with Stripe integration and PDF receipt generation
- **Contact Page** - Contact forms and information
- **Privacy Policy** - Comprehensive privacy policy covering data collection, cookies, and donor information
- **Terms of Service** - Complete terms covering donations, refunds, and website usage

### ✅ Core Functionality
- **🎨 Modern 2025 Design** - Blue and gold brand colors, gradients, smooth animations
- **📱 Fully Responsive** - Mobile-first design optimized for all devices
- **💰 Stripe Payment Integration** - Full Stripe integration with one-time and recurring donations
- **💳 Secure Payment Processing** - PCI-compliant payment handling via Stripe
- **🔔 Webhook Support** - Automated payment notifications and receipt generation
- **🤖 Smart Chatbot** - AI assistant for answering questions about the organization
- **📜 Bible Integration** - Scripture verses throughout the site reflecting Christian values
- **⚡ Performance Optimized** - Fast loading, SEO-friendly, accessibility compliant
- **📄 Legal Compliance** - Complete Privacy Policy and Terms of Service pages

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
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for client-side payment forms | **Yes*** |
| `STRIPE_SECRET_KEY` | Stripe secret key for server-side API calls | **Yes*** |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret for event verification | **Yes*** |
| `CONTENTFUL_SPACE_ID` | Your Contentful space ID | Optional |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful delivery API token | Optional |
| `CONTENTFUL_PREVIEW_TOKEN` | Contentful preview API token | Optional |
| `NEXT_PUBLIC_EMAIL_SERVICE_ID` | Email service ID for contact forms | Optional |
| `NEXT_PUBLIC_EMAIL_TEMPLATE_ID` | Email template ID | Optional |
| `NEXT_PUBLIC_EMAIL_PUBLIC_KEY` | Email service public key | Optional |

**Required for payment processing*. See `.env.local.example` for setup instructions.

#### Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set up a webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

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
│   ├── app/                           # Next.js App Router pages
│   │   ├── about/                    # About page
│   │   ├── api/                      # API Routes
│   │   │   ├── create-payment-intent/  # One-time donation API
│   │   │   ├── create-subscription/    # Recurring donation API
│   │   │   └── webhooks/
│   │   │       └── stripe/           # Stripe webhook handler
│   │   ├── contact/                  # Contact page
│   │   ├── donate/                   # Donation page with Stripe integration
│   │   ├── gallery/                  # Gallery page
│   │   ├── privacy/                  # Privacy Policy page
│   │   ├── projects/                 # Projects page
│   │   ├── terms/                    # Terms of Service page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles with brand colors
│   │   └── page.tsx                  # Homepage
│   ├── components/                   # React components
│   │   ├── layout/                   # Layout components (Header, Footer)
│   │   ├── sections/                 # Page sections
│   │   └── ui/                       # UI components (Button, Chatbot)
│   ├── lib/                          # Utility functions
│   │   ├── contentful.ts             # Contentful API functions
│   │   └── pdfGenerator.ts           # PDF receipt generation
│   └── types/                        # TypeScript type definitions
│       └── contentful.ts             # Contentful content types
├── public/                           # Static assets
├── .env.local.example                # Environment variables template
├── CONTENTFUL_MIGRATION.md           # Contentful setup guide
└── README.md                         # This file
```

## 🎨 Brand Guidelines

### Colors
- **Primary Blue**: #3b82f6 (Tailwind blue-500) - Trust, Education, Stability
- **Secondary Blue**: #2563eb (Tailwind blue-600) - Depth and Professionalism
- **Accent Gold**: #f59e0b (Tailwind amber-500) - Warmth, Hope, Divine Blessing
- **White**: #ffffff - Purity and Clarity
- **Text**: #1f2937 (Tailwind gray-800) - Readability

### Typography
- **Primary Font**: System UI Sans Serif (ui-sans-serif, system-ui, -apple-system)
- **Display Font**: System UI Serif for headings
- **Monospace**: System UI Monospace

### Design Principles
- Clean, modern design following 2025 trends
- Mobile-first responsive approach
- Accessibility compliance (WCAG 2.1)
- Blue and gold color scheme representing trust, education, and divine blessing
- Biblical foundation with integrated scriptures
- System fonts for optimal performance and cross-platform consistency

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

### Features
- **Payment Methods**: One-time and monthly recurring donations
- **Flexible Amounts**: Preset amounts ($25, $50, $100, $250, $500, $1000) + custom amounts
- **Secure Processing**: Full Stripe integration with PCI-compliant payment handling
- **Donor Management**: Automatic customer creation and management in Stripe
- **Receipt Generation**: Automated PDF receipts via webhook
- **Dedication Options**: Honor and memorial dedication support
- **Email Notifications**: Automated thank-you emails and receipts

### API Endpoints

#### POST `/api/create-payment-intent`
Creates a one-time donation payment intent.

**Request Body:**
```json
{
  "amount": 5000,              // Amount in cents ($50.00)
  "currency": "usd",           // Optional, defaults to USD
  "donorName": "John Doe",
  "email": "john@example.com",
  "metadata": {                // Optional
    "dedication": "In honor of Jane Doe",
    "dedicationType": "honor"
  }
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

#### POST `/api/create-subscription`
Creates a monthly recurring donation subscription.

**Request Body:**
```json
{
  "amount": 5000,              // Monthly amount in cents ($50.00)
  "currency": "usd",           // Optional, defaults to USD
  "donorName": "John Doe",
  "email": "john@example.com",
  "metadata": {                // Optional
    "dedication": "Supporting education",
    "dedicationType": "honor"
  }
}
```

**Response:**
```json
{
  "subscriptionId": "sub_xxx",
  "clientSecret": "pi_xxx_secret_xxx",
  "customerId": "cus_xxx"
}
```

#### POST `/api/webhooks/stripe`
Handles Stripe webhook events for automated processing.

**Supported Events:**
- `payment_intent.succeeded` - One-time donation completed
- `payment_intent.payment_failed` - Payment failed
- `customer.subscription.created` - New recurring donation
- `customer.subscription.updated` - Subscription updated
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Recurring payment succeeded
- `invoice.payment_failed` - Recurring payment failed

### Security
- Server-side validation for all payment requests
- Webhook signature verification using STRIPE_WEBHOOK_SECRET
- Lazy Stripe client initialization to prevent build-time errors
- Minimum ($1) and maximum ($999,999) donation limits
- Email and donor name validation

## 📄 Privacy & Legal Pages

### Privacy Policy (`/privacy`)
Comprehensive privacy policy covering:
- Information collection and usage (personal data, donation information)
- Cookie policy and tracking technologies
- Third-party services (Stripe payment processing)
- Data security measures
- User rights (access, correction, deletion)
- Children's privacy (under 13)
- International data transfers
- Contact information for privacy concerns
- Last updated: November 14, 2025

### Terms of Service (`/terms`)
Complete terms of service including:
- Acceptance of terms and conditions
- Donation policies and payment processing
- Refund policy (30-day window for valid requests)
- Website usage guidelines
- Intellectual property rights
- Disclaimer of warranties
- Limitation of liability
- Indemnification clause
- Governing law (Nigerian jurisdiction)
- Changes to terms notification
- Last updated: November 14, 2025

Both pages are accessible via footer links and follow professional legal standards for nonprofit organizations.

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
