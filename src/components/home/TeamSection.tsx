import React from "react";

const team = [
  {
    name: "Dr. Sneha Bhandari",
    degree: "B.D.S.",
    image: "/images/dr-sneha-bhandari.jpg",
    description: [
      "Dr. Sneha Bhandari has been creating beautiful smiles for 25+ years and is passionate about preserving oral health.",
      "She has developed an outstanding capacity for clinical diagnostics and skills to provide targeted dental treatments.",
      "She engages with her patients & takes them on a journey of oral rejuvenation, emphasizing holistic care and education.",
      "She truly knows how important it is to have the perfect smile & oral environment.",
    ]
  },
  {
    name: "Dr. Sameer Bhandari",
    degree: "B.D.S.",
    image: "/images/dr-sameer-bhandari.jpg",
    description: [
      "Dr. Sameer Bhandari has been practicing dentistry for over 25 years.",
      "His patient base includes people from all walks of life, both local and international. His work is highly appreciated and patients often return for various treatments.",
      "He keeps up with the latest technology and advances in dentistry and patient care.",
      "Dental Aligners are now the main focus of his dental practice.",
    ]
  },
  {
    name: "Dr. Tanmay Bhandari",
    degree: "MBBS",
    image: "/images/dr-tanmay-bhandari.jpg",
    description: [
      "Healthcare Professional & Wellness Coach",
      "Guiding patients towards optimal health through evidence-based holistic practices",
      "Fostering a culture of wellness and self-care",
    ]
  }
];

export const TeamSection = () => (
  <section className="section-padding" id="team">
    <div className="text-center mb-12">
      <h2 className="heading-lg gradient-text">Meet Our Team</h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        Our dentist team brings decades of expertise, passion, and a commitment to delivering the best smiles in Pune.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {team.map((member, idx) => (
        <div
          key={member.name}
          className="bg-white rounded-2xl shadow-md flex flex-col items-center p-8 transition-transform duration-200 hover:scale-105 animate-fade-in"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 object-cover rounded-full shadow mb-6 border-4 border-dental-100"
            loading="lazy"
            style={{ background: "#e6f7fa" }}
          />
          <h3 className="text-dental-600 font-bold text-xl mb-1 text-center">{member.name}</h3>
          <div className="text-dental-500 text-sm font-semibold mb-4 text-center">{member.degree}</div>
          <ul className="text-gray-700 text-sm text-center list-none space-y-2 px-2">
            {member.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;