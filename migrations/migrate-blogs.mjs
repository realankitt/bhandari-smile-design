import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const oldBlogs = [
  {
    title: "Understanding Invisalign Treatment",
    slug: "understanding-invisalign-treatment",
    excerpt: "Discover how Invisalign clear aligners can transform your smile with comfort and convenience. Learn about the treatment process, benefits, and why it might be the right choice for you.",
    content: `
      <h2>What is Invisalign?</h2>
      <p>Invisalign is an innovative orthodontic treatment that uses clear, removable aligners to straighten teeth. Unlike traditional braces, these aligners are virtually invisible and can be removed for eating, drinking, brushing, and flossing.</p>

      <h2>The Invisalign Treatment Process</h2>
      <p>The treatment begins with a consultation where we create a custom treatment plan using advanced 3D imaging technology. You'll receive a series of custom-made aligners that gradually move your teeth into their desired positions.</p>

      <h2>Benefits of Choosing Invisalign</h2>
      <ul>
        <li>Nearly invisible appearance</li>
        <li>Removable for eating and cleaning</li>
        <li>More comfortable than traditional braces</li>
        <li>Fewer office visits required</li>
        <li>Custom-made for your teeth</li>
      </ul>
    `,
    image: "/blog/invisalign-treatment.jpg",
    category: "Invisalign",
    author: "Dr. Sameer Bhandari",
    published_at: new Date("2024-01-15").toISOString()
  },
  {
    title: "The Importance of Regular Dental Check-ups",
    slug: "importance-of-regular-dental-checkups",
    excerpt: "Regular dental check-ups are crucial for maintaining optimal oral health. Learn why preventive care matters and how often you should visit your dentist.",
    content: `
      <h2>Why Regular Check-ups Matter</h2>
      <p>Regular dental check-ups are essential for preventing oral health issues and maintaining a healthy smile. These visits allow us to detect problems early and provide preventive care that can save you time, money, and discomfort in the long run.</p>

      <h2>What Happens During a Check-up?</h2>
      <p>During your regular dental check-up, we perform:</p>
      <ul>
        <li>Professional cleaning and scaling</li>
        <li>Thorough examination of teeth and gums</li>
        <li>Oral cancer screening</li>
        <li>Digital X-rays when necessary</li>
        <li>Personalized oral hygiene advice</li>
      </ul>

      <h2>How Often Should You Visit?</h2>
      <p>Most patients should visit every six months for optimal oral health maintenance. However, some may need more frequent visits based on their individual oral health needs and risk factors.</p>

      <h2>Benefits of Regular Check-ups</h2>
      <ul>
        <li>Early detection of dental issues</li>
        <li>Prevention of serious oral health problems</li>
        <li>Professional cleaning for better oral hygiene</li>
        <li>Cost-effective preventive care</li>
        <li>Maintenance of overall health</li>
      </ul>
    `,
    image: "/blog/regular-dental-checkups.jpg",
    category: "Dental Care",
    author: "Dr. Sneha Bhandari",
    published_at: new Date("2024-02-01").toISOString()
  },
  {
    title: "Modern Dental Technology at Bhandari Dental Clinic",
    slug: "modern-dental-technology-bhandari-clinic",
    excerpt: "Discover how we use cutting-edge dental technology to provide precise, comfortable, and efficient treatments for our patients.",
    content: `
      <h2>Advanced Digital Imaging</h2>
      <p>Our clinic utilizes state-of-the-art digital imaging technology for accurate diagnostics and treatment planning. This includes:</p>
      <ul>
        <li>3D digital scanning for Invisalign treatment</li>
        <li>Digital X-rays for reduced radiation exposure</li>
        <li>Intraoral cameras for detailed examination</li>
      </ul>

      <h2>Laser Dentistry</h2>
      <p>We employ advanced laser technology for various dental procedures, offering:</p>
      <ul>
        <li>More precise treatment</li>
        <li>Reduced recovery time</li>
        <li>Minimal discomfort</li>
        <li>Better outcomes</li>
      </ul>

      <h2>Computer-Aided Design (CAD)</h2>
      <p>Our CAD technology enables us to create precise dental restorations, ensuring perfect fit and natural appearance for crowns, bridges, and other dental work.</p>

      <h2>Benefits of Modern Technology</h2>
      <ul>
        <li>More accurate diagnoses</li>
        <li>Improved treatment planning</li>
        <li>Enhanced patient comfort</li>
        <li>Better treatment outcomes</li>
        <li>Reduced procedure times</li>
      </ul>
    `,
    image: "/blog/modern-dental-technology.jpg",
    category: "Technology",
    author: "Dr. Sameer Bhandari",
    published_at: new Date("2024-03-15").toISOString()
  }
];

async function migrateBlogPosts() {
  for (const blog of oldBlogs) {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .single();

    if (error) {
      console.error(`Failed to migrate "${blog.title}":`, error);
    } else {
      console.log(`Successfully migrated "${blog.title}"`);
    }
  }
}

migrateBlogPosts().catch(console.error);