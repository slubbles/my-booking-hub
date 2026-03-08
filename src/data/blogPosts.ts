export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-stripe-payment-flows",
    title: "How I Built Secure Stripe Payment Flows for Snarbles",
    excerpt: "A deep dive into implementing Stripe checkout, webhook handling, and subscription management in a production Next.js app.",
    date: "2025-02-15",
    readTime: "6 min read",
    tags: ["Stripe", "Next.js", "Payments"],
    content: [
      "Payment integration is one of those things that seems simple until you actually do it in production. For Snarbles, I needed to build a payment system that could handle real user transactions with sub-30-second processing time - and do it securely.",
      "I had to choose between Stripe Checkout (the hosted page) and Stripe Elements (embedding it myself). Went with Checkout Sessions because honestly, why fight PCI compliance when Stripe handles it for you? Plus users already trust that UI. It just made sense.",
      "The real headache was webhooks. Stripe fires events asynchronously, so your app has to deal with race conditions, duplicate events, and failed deliveries. I ended up building an idempotent handler that checks event IDs before doing anything, wraps updates in database transactions, and logs everything. Saved me so many debugging hours later.",
      "Here's a fun one I didn't expect: Stripe webhooks can arrive before the checkout redirect finishes. So a user lands on the 'success' page but their subscription hasn't actually updated yet. I fixed this with a simple polling approach - the success page checks the user's status every 2 seconds for up to 30 seconds, with a fallback message if the webhook is slow.",
      "For subscription management, I just plugged in Stripe's Customer Portal. Users can update payment methods, view invoices, cancel - all without me building any of that UI. Huge time saver.",
      "If you're building something similar, here's what I'd tell you: always verify webhook signatures, make your event processing idempotent, handle the redirect-vs-webhook race condition, and use Stripe CLI for local webhook testing. That last one alone will save you hours.",
    ],
  },
  {
    slug: "ai-content-generation-architecture",
    title: "Architecting an AI Content Platform with the Grok API",
    excerpt: "How I designed Post Content's backend to handle AI-powered content generation with rate limiting, caching, and user context.",
    date: "2025-01-20",
    readTime: "5 min read",
    tags: ["AI", "Node.js", "Architecture"],
    content: [
      "When I started building Post Content, calling the Grok API was actually the easy part. The hard part was everything around it - making it feel fast, keeping it reliable, and not blowing through the API budget in a week.",
      "The setup is pretty standard: React frontend talks to a Node.js API, which talks to Grok. But I added three middleware layers that made a huge difference - JWT auth, a per-user rate limiter (token bucket style), and Zod validation on every request. Nothing fancy, but it catches problems early.",
      "Rate limiting was non-negotiable. Without it, one power user could drain the entire API budget in minutes. I went with a sliding window approach using in-memory storage. Redis would be better at scale, but honestly for the current user base it works fine. Each user gets 50 generations per hour with a burst of 10 per minute.",
      "The prompt engineering layer is where things got interesting. Instead of just forwarding raw user input to Grok, I wrap it with context - their preferred tone, what type of content they want (hook, thread, reply), which platform it's for. The quality difference between raw prompts and contextual ones is night and day.",
      "Adding streaming changed everything for the UX. Before, users stared at a loading spinner for 3-5 seconds. Now they see tokens appearing in real-time through Server-Sent Events. The total time is basically the same, but it feels way faster. Perception matters.",
      "Biggest takeaway from this project: AI integrations are maybe 20% API calls and 80% everything else - error handling, rate limiting, prompt management, caching, and making sure the whole thing doesn't fall over when the API has a bad day.",
    ],
  },
  {
    slug: "escrow-system-design",
    title: "Designing a Peer-to-Peer Escrow System from Scratch",
    excerpt: "The technical decisions behind One Dollar Ventures' escrow logic - handling trust, disputes, and concurrent transactions.",
    date: "2024-12-10",
    readTime: "7 min read",
    tags: ["Payments", "Architecture", "PostgreSQL"],
    content: [
      "One Dollar Ventures needed something most crowdfunding platforms quietly skip: real escrow. Users put in $1 toward projects, and that money should only reach the creator when specific conditions are met. Getting this right was probably the hardest thing I've built so far.",
      "I modeled the whole thing as a state machine. Every transaction goes through PENDING, then HELD, then either RELEASED or REFUNDED. The key decision was enforcing these transitions at the database level with CHECK constraints and triggers - not just in application code. That way, even if my code has a bug, the database won't let it create an invalid state.",
      "Concurrency was tricky. If two people contribute at the exact same moment, both might pass validation but create an inconsistent total. PostgreSQL's SERIALIZABLE isolation level handles this - it detects conflicting transactions and retries them automatically. Worth the small performance cost for the peace of mind.",
      "For disputes, I kept it simple. Either party can open one within 7 days of a milestone. Funds get frozen immediately, and the dispute form is structured (not free-text) so it captures the actual issue clearly. Makes resolution way faster than reading through walls of angry text.",
      "The money movement uses Stripe Connect with destination charges. Each creator has a connected Stripe account, contributions sit in the platform account until conditions are met, and Stripe handles all the regulatory stuff around holding other people's money. I definitely didn't want to deal with that myself.",
      "I wrote a lot of integration tests for this - simulating concurrent contributions, race conditions on fund releases, double-spend attempts. Every state transition has tests for both the happy path and the error case. When you're handling real money, you don't skip tests.",
      "The big lesson: escrow is really just state machines and invariants. If you model your states correctly and enforce the rules at the database level, the application code becomes surprisingly simple.",
    ],
  },
];
