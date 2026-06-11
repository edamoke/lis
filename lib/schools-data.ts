export interface School {
  slug: string
  name: string
  city: string
  location: string
  phone: string
  email: string
  address: string
  grades: string
  tagline: string
  description: string
  whyChooseUs: string[]
  facilities: string[]
  activities: string[]
  programs: string[]
  quickLinks: { label: string; href: string }[]
}

export const schools: School[] = [
  {
    slug: 'nairobi-karen',
    name: 'LIS Nairobi Karen',
    city: 'Nairobi',
    location: 'Karen, Nairobi',
    phone: '+254 717 998 888',
    email: 'info@lis.sc.ke',
    address: 'Karen Campus, Nairobi, Kenya',
    grades: 'KG – A Levels',
    tagline: 'From Kindergarten to A Levels — A Complete Learning Journey',
    description:
      'Light International School Karen is our flagship Nairobi campus, offering a comprehensive Cambridge International learning journey from Kindergarten all the way through to A Levels. Situated in the serene Karen suburb, our campus provides a nurturing, multicultural environment where students develop academically, socially, and personally. We blend technology, character education, and global awareness to produce confident, compassionate graduates ready for top universities worldwide.',
    whyChooseUs: [
      'Full Cambridge International curriculum from KG to A Levels',
      'State-of-the-art science and ICT laboratories',
      'Technology-enhanced classrooms with Google Suite for Education',
      'A-Level internship programme with leading Kenyan companies',
      'Vibrant student council and leadership programmes',
      'Multicultural community representing over 15 nationalities',
      'Regular participation in World Scholars Cup, MUN, and IFLC',
    ],
    facilities: [
      'Science & ICT laboratories',
      'Sports fields (soccer, basketball, rugby)',
      'Swimming pool',
      'Library and resource centre',
      'Modern cafeteria',
      'Performing arts space',
    ],
    activities: [
      'Robotics Club',
      'Digital Arts',
      'Karate & Roller Skating',
      'Mind Games',
      'Swimming',
      'World Scholars Cup',
      'Model United Nations (MUN)',
      'IFLC (International Festival of Language and Culture)',
      'Science & Technology Olympiads',
      'Community service and charity drives',
    ],
    programs: [
      'Cambridge Primary',
      'Cambridge Lower Secondary',
      'Cambridge IGCSE',
      'Cambridge International AS & A Levels',
      'A-Level Corporate Internship Programme',
    ],
    quickLinks: [
      { label: 'Fee Structure', href: '#' },
      { label: 'Admissions', href: '#' },
      { label: 'Academic Calendar', href: '#' },
      { label: 'School Profile', href: '#' },
      { label: 'Parents-Students Handbook', href: '#' },
    ],
  },
  {
    slug: 'nairobi-lavington',
    name: 'LIS Nairobi Lavington',
    city: 'Nairobi',
    location: 'Lavington, Nairobi',
    phone: '+254 729 905 431',
    email: 'info.primary@lis.sc.ke',
    address: 'Lavington, Nairobi, Kenya',
    grades: 'Year 4 – Year 10',
    tagline: 'Academic Excellence at the Heart of Lavington',
    description:
      'The Light International School Lavington campus serves students from Year 4 through Year 10 in one of Nairobi\'s most vibrant neighbourhoods. This campus focuses on bridging primary and secondary education with a strong emphasis on critical thinking, collaborative learning, and character development within the Cambridge International framework. Small class sizes ensure every learner receives personalised attention from highly qualified educators.',
    whyChooseUs: [
      'Cambridge curriculum for Year 4 through Year 10',
      'Small, focused class sizes for personalised learning',
      'Seamless transition pathway to Cambridge IGCSE',
      'Technology-integrated classrooms',
      'Active co-curricular and club programme',
      'Regular inter-school competitions and olympiads',
      'Dedicated pastoral care and counselling',
    ],
    facilities: [
      'Well-equipped classrooms with modern technology',
      'Science laboratory',
      'ICT lab',
      'Sports court',
      'Library',
      'Cafeteria',
    ],
    activities: [
      'Robotics Club',
      'Debate and Public Speaking',
      'Soccer and Basketball',
      'Science Olympiads',
      'Arts and Culture Day',
      'Community service projects',
    ],
    programs: [
      'Cambridge Primary (Year 4 – Year 6)',
      'Cambridge Lower Secondary (Year 7 – Year 9)',
      'Cambridge Checkpoint (Year 9)',
      'Start of Cambridge IGCSE (Year 10)',
    ],
    quickLinks: [
      { label: 'Fee Structure', href: '#' },
      { label: 'Admissions', href: '#' },
      { label: 'Academic Calendar', href: '#' },
      { label: 'Parents-Students Handbook', href: '#' },
    ],
  },
  {
    slug: 'nairobi-kindergarten',
    name: 'LIS Nairobi Kindergarten',
    city: 'Nairobi',
    location: 'Lenana Road, Nairobi',
    phone: '+254 728 663 764',
    email: 'info.kg@lis.sc.ke',
    address: 'Lenana Road, Nairobi, Kenya',
    grades: 'Reception – Year 3',
    tagline: 'A Nurturing Start for Every Young Learner',
    description:
      'Situated along Lenana Road, the Light International School Kindergarten campus provides a warm and stimulating early-years environment for children from Reception through Year 3. Our dedicated early childhood educators follow the Cambridge Primary framework, placing emphasis on play-based discovery, language development, and the social-emotional growth every young child needs to flourish. We celebrate diversity through cultural days, mother\'s day events, and community activities that make every child feel seen and valued.',
    whyChooseUs: [
      'Cambridge Early Years and Primary framework',
      'Experienced, nurturing early-childhood educators',
      'Low teacher-to-child ratios for personalised care',
      'Play-based learning integrated with structured academics',
      'Regular cultural celebrations and community events',
      'Secure, child-friendly campus environment',
      'Seamless transition to LIS primary campuses',
    ],
    facilities: [
      'Bright, child-friendly classrooms',
      'Outdoor play areas',
      'Reading corner and library',
      'Art and craft studio',
      'Safe, secure campus',
    ],
    activities: [
      'Cultural Day celebrations',
      "Mother's Day & special events",
      'Storytelling and reading programmes',
      'Arts, music, and movement',
      'Nature and environmental awareness activities',
      'Sports day',
    ],
    programs: [
      'Reception (Early Years)',
      'Year 1 – Cambridge Primary',
      'Year 2 – Cambridge Primary',
      'Year 3 – Cambridge Primary',
    ],
    quickLinks: [
      { label: 'Fee Structure', href: '#' },
      { label: 'Admissions', href: '#' },
      { label: 'Academic Calendar', href: '#' },
      { label: 'Parents-Students Handbook', href: '#' },
    ],
  },
  {
    slug: 'mombasa',
    name: 'LIS Mombasa',
    city: 'Mombasa',
    location: 'Nyali, Mombasa',
    phone: '+254 784 777 771',
    email: 'info.mba@lis.sc.ke',
    address: 'Nyali, Mombasa, Kenya',
    grades: 'KG – A Levels',
    tagline: 'Coast Excellence — Where Education Meets the Ocean Breeze',
    description:
      'Light International School Mombasa, set in the vibrant Nyali neighbourhood, delivers a complete Cambridge International education from Kindergarten through A Levels. The school blends academic rigour with the rich coastal culture of Mombasa, producing graduates who are globally competitive yet deeply rooted in their community. Students benefit from dedicated science and ICT labs, a thriving co-curricular programme, and an annual French Day competition that has grown into a celebrated inter-school event.',
    whyChooseUs: [
      'Full Cambridge International curriculum KG to A Levels',
      'Annual Inter-School Virtual French Competition',
      'Dedicated science, ICT, and language laboratories',
      'Strong community ties and social responsibility initiatives',
      'Haller Park excursions and environmental education',
      'Multicultural student body and inclusive environment',
      'Career counselling and university placement support',
    ],
    facilities: [
      'Science and ICT laboratories',
      'Sports fields and courts',
      'Library and resource centre',
      'Modern cafeteria',
      'Performing arts space',
      'Safe, secure Nyali campus',
    ],
    activities: [
      'World Animal Welfare Day excursions (Haller Park)',
      'Inter-School Virtual French Competition',
      'World Scholars Cup',
      'Student Council',
      'Swimming',
      'Soccer, Basketball, Rugby',
      'Community service and orphanage visits',
      'Science & Technology Olympiads',
    ],
    programs: [
      'Cambridge Primary',
      'Cambridge Lower Secondary',
      'Cambridge IGCSE',
      'Cambridge International AS & A Levels',
      'CBE (Competency-Based Education) — LA Mombasa Nyali',
    ],
    quickLinks: [
      { label: 'Fee Structure', href: '#' },
      { label: 'Admissions', href: '#' },
      { label: 'Academic Calendar', href: '#' },
      { label: 'School Profile', href: '#' },
      { label: 'Parents-Students Handbook', href: '#' },
    ],
  },
  {
    slug: 'malindi',
    name: 'LIS Malindi',
    city: 'Malindi',
    location: 'Suli-Suli Road, Malindi Town',
    phone: '+254 716 839 822',
    email: 'info.malindi@lis.sc.ke',
    address: 'Plot No. 1856, Suli-Suli Road, Malindi Town, Kilifi County, P.O. Box 348-80200, Malindi, Kenya',
    grades: 'KG – A Levels',
    tagline: 'Where the Indian Ocean Breeze Meets World-Class Education',
    description:
      'Situated along Suli-Suli Road in Malindi Town, Light International School Malindi offers Cambridge International education from Kindergarten through A Levels. Nestled near the Indian Ocean, the campus features modern facilities including science labs, ICT labs, a swimming pool, and expansive sports fields. We champion holistic development — nurturing morally upright, socially responsible, and academically competent students through a rich blend of academics, extracurriculars, mentorship, and alumni engagement.',
    whyChooseUs: [
      'Full Cambridge curriculum from KG to A Levels',
      'Holistic education: moral, social, and academic development',
      'State-of-the-art science and ICT laboratories',
      'Swimming pool and expansive sports fields',
      'Active student council and mentorship programme',
      'Career counselling and university guidance',
      'Thriving alumni network and lifelong community',
      '15+ nationalities represented on campus',
    ],
    facilities: [
      'Science & ICT laboratories',
      'Swimming pool',
      'Sports fields (soccer, basketball)',
      'Library and resource centre',
      'Modern cafeteria',
      'Comfortable dormitories',
    ],
    activities: [
      'World Animal Welfare Day (Haller Park)',
      'Inter-School French Competition',
      "World Scholars' Cup",
      'Student Council',
      'Swimming',
      'Soccer, Basketball, and other sports',
      'Tree planting and environmental activities',
      'Charity and community outreach',
    ],
    programs: [
      'Cambridge Early Years / Reception',
      'Cambridge Primary',
      'Cambridge Lower Secondary',
      'Cambridge IGCSE',
      'Cambridge International AS & A Levels',
    ],
    quickLinks: [
      { label: 'Fee Structure', href: '#' },
      { label: 'Newsletter', href: '#' },
      { label: 'Academic Calendar', href: '#' },
      { label: 'Year Book', href: '#' },
      { label: 'School Profile', href: '#' },
      { label: 'Parents-Students Handbook', href: '#' },
    ],
  },
]

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug)
}
