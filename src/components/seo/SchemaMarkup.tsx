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
              "streetAddress": "Bhandari Dental Clinic, Sujay Garden Commercial Centre, off No 24, Mukund Nagar",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "postalCode": "411037",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "18.49691",
              "longitude": "73.86041"
            },
            "url": "https://bhandaridentalclinic.com",
            "telephone": "+91 9423004777",
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
            ]
          })
        }}
      />
    );
  }