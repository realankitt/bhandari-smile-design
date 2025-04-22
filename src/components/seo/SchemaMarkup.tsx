
export function DentalClinicSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "Bhandari Dental Clinic",
          "image": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1000&auto=format&fit=crop",
          "description": "Bhandari Dental Clinic in Pune specializes in Invisalign clear aligners, guided dental implants, and complete smile makeovers.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Dental Avenue, Koregaon Park",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "18.5204303",
            "longitude": "73.8557592"
          },
          "url": "https://bhandaridentalclinic.com",
          "telephone": "+919999999999",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "20:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday"],
              "opens": "10:00",
              "closes": "18:00"
            }
          ],
          "specialty": ["Invisalign", "Dental Implants", "Smile Makeovers", "Cosmetic Dentistry"],
          "medicalSpecialty": "Dentistry",
          "founder": {
            "@type": "Person",
            "name": "Dr. Tanmay Bhandari",
            "jobTitle": "Lead Dental Consultant"
          }
        })
      }}
    />
  );
}
