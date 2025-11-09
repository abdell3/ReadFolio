import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../app/config/database';
import Technologie, { ITechnologie } from '../app/Models/Technologie';
import Competence from '../app/Models/Competence';
import Experience from '../app/Models/Experience';
import Projet from '../app/Models/Projet';
import Profil from '../app/Models/Profil';

async function seedTechnologies(): Promise<ITechnologie[]> {
  const count = await Technologie.countDocuments();
  if (count > 0) {
    console.log(`Technologies already seeded (${count})`);
    return Technologie.find().lean();
  }

  const technologies = await Technologie.insertMany([
    { name: 'JavaScript', category: 'Backend' },
    { name: 'TypeScript', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Mongoose', category: 'Database' },
    { name: 'ServiceNow', category: 'Platform' },
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Bootstrap', category: 'Frontend' },
    { name: 'HTML5', category: 'Frontend' },
    { name: 'CSS3', category: 'Frontend' },
    { name: 'Laravel', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'Postman', category: 'Tooling' },
    { name: 'UML', category: 'Methodology' },
  ]);

  console.log(`Seeded ${technologies.length} technologies`);
  return technologies.map((tech) => tech.toObject());
}

async function seedCompetences() {
  const count = await Competence.countDocuments();
  if (count > 0) {
    console.log(`Competences already seeded (${count})`);
    return;
  }

  await Competence.insertMany([
    { name: 'MERN stack', level: 5 },
    { name: 'ServiceNow CSA', level: 4 },
    { name: 'API design (REST & GraphQL)', level: 4 },
    { name: 'Relational & NoSQL data modeling', level: 4 },
    { name: 'JavaScript & TypeScript fundamentals', level: 5 },
    { name: 'UI engineering (Tailwind & Bootstrap)', level: 4 },
    { name: 'Testing & API tooling with Postman', level: 3 },
    { name: 'UML & software design paradigms', level: 4 },
  ]);

  console.log('Seeded competences');
}

async function seedExperiences() {
  const count = await Experience.countDocuments();
  if (count > 0) {
    console.log(`Experiences already seeded (${count})`);
    return;
  }

  await Experience.insertMany([
    {
      title: 'Fullstack JavaScript Developer',
      company: 'Freelance',
      startDate: new Date('2022-02-01'),
      description:
        'Builds and maintains MERN applications, mentors junior developers, and delivers production-ready features for startups.',
      location: 'Marrakech, Morocco',
    },
    {
      title: 'ServiceNow Platform Specialist',
      company: 'Consulting projects',
      startDate: new Date('2023-06-01'),
      description:
        'Implements workflow automation, integrates ServiceNow modules, and ensures platform reliability with CSA expertise.',
      location: 'Remote',
    },
  ]);

  console.log('Seeded experiences');
}

async function seedProfil() {
  const existingProfil = await Profil.findOne();
  if (existingProfil) {
    console.log('Profil already seeded');
    return existingProfil;
  }

  const profil = await Profil.create({
    fullname: 'Abdellah Addar',
    title: 'MERN Stack Developer',
    bio: `24-year-old software developer focused on MERN ecosystems, clean architectures, and delivering polished user experiences.
Certified ServiceNow CSA and lifelong learner exploring modern JavaScript tooling.`,
    avatarUrl: 'https://avatars.githubusercontent.com/u/135748083?v=4',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/abdell3' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/abdellah-addar' },
    ],
    contact: {
      email: 'abdellah.addar@example.com',
      phone: '+212 6 12 34 56 78',
      location: 'Marrakech, Morocco',
    },
  });

  console.log('Seeded profil');
  return profil;
}

async function seedProjects(technologies: ITechnologie[]) {
  const count = await Projet.countDocuments();
  if (count > 0) {
    console.log(`Projects already seeded (${count})`);
    return;
  }

  const techMap = new Map(technologies.map((tech) => [tech.name, tech._id as mongoose.Types.ObjectId]));

  const projects = [
    {
      title: 'MyPortfolio v3',
      summary: 'Personal portfolio highlighting MERN projects and open-source work.',
      description:
        'Interactive portfolio built with React and TypeScript to showcase projects, skills, and certifications. ' +
        'Implements reusable UI components, responsive layouts, and integrates GitHub activity.',
      repoUrl: 'https://github.com/abdell3/MyPortfolio',
      liveUrl: 'https://github.com/abdell3/MyPortfolio',
      category: 'Portfolio',
      technologies: [
        techMap.get('React'),
        techMap.get('TypeScript'),
        techMap.get('Tailwind CSS'),
      ].filter(Boolean),
      tags: ['Portfolio', 'Frontend', 'TypeScript'],
      images: ['https://placehold.co/600x400?text=MyPortfolio'],
      dateStart: new Date('2024-01-10'),
      featured: true,
    },
    {
      title: 'Contactify',
      summary: 'Contact management web app with PHP backend and MySQL storage.',
      description:
        'Full CRUD application managing contacts and interactions. Built with native PHP OOP, PDO, and modular architecture. ' +
        'Includes authentication, search filters, and responsive UI.',
      repoUrl: 'https://github.com/abdell3/Contactify',
      liveUrl: 'https://github.com/abdell3/Contactify',
      category: 'Productivity',
      technologies: [
        techMap.get('PHP'),
        techMap.get('Laravel'),
        techMap.get('HTML5'),
        techMap.get('CSS3'),
      ].filter(Boolean),
      tags: ['PHP', 'CRUD', 'MySQL'],
      images: ['https://placehold.co/600x400?text=Contactify'],
      dateStart: new Date('2023-08-01'),
      dateEnd: new Date('2023-10-15'),
      featured: false,
    },
    {
      title: 'YouQuiz',
      summary: 'Gamified quiz platform built with vanilla HTML, CSS, and JavaScript.',
      description:
        'Lightweight single-page application featuring multiple quiz categories, scoring, animations, and accessibility best practices.',
      repoUrl: 'https://github.com/abdell3/YouQuiz',
      liveUrl: 'https://github.com/abdell3/YouQuiz',
      category: 'Education',
      technologies: [
        techMap.get('JavaScript'),
        techMap.get('HTML5'),
        techMap.get('CSS3'),
      ].filter(Boolean),
      tags: ['JavaScript', 'Gamification', 'Frontend'],
      images: ['https://placehold.co/600x400?text=YouQuiz'],
      dateStart: new Date('2022-11-01'),
      featured: false,
    },
  ];

  await Projet.insertMany(projects);
  console.log('Seeded projects');
}

async function seedDemoData() {
  try {
    await connectDatabase();

    const technologies = await seedTechnologies();
    await Promise.all([seedCompetences(), seedExperiences(), seedProjects(technologies)]);
    await seedProfil();

    console.log('\nDemo data seeded successfully 🎉');
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding demo data:', error);
    await disconnectDatabase();
    process.exit(1);
  }
}

seedDemoData();


