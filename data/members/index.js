import michaelPhoto from './assets/michael_pfp.jpg'
import andrewPhoto from './assets/andrew_pfp.jpg'
import lisaPhoto from './assets/lisa_pfp.jpg'
import bogdanPhoto from './assets/bogdan_pfp.jpg'
import tingtingPhoto from './assets/tingting_pfp.jpg'
import andiPhoto from './assets/andi_pfp.jpg'
import angelaPhoto from './assets/angela_pfp.jpg'
import brianPhoto from './assets/brian_pfp.jpg'
import naazPhoto from './assets/naaz_pfp.jpg'
import harryPhoto from './assets/harry_pfp.jpg'
import jessicaPhoto from './assets/jessica_pfp.jpg'
import amberPhoto from './assets/amber_pfp.jpg'
import adamKolodziejczakPhoto from './assets/adam_kolodziejczak_pfp.jpg'
import khushiPhoto from './assets/khushi_pfp.jpg'
import uzimaMalikPhoto from './assets/uzima_malik_pfp.jpg'
import valeriaOsorioRamirezPhoto from './assets/valeria_osorio_ramirez_pfp.jpg'
import defaultPhoto from './assets/default_pfp.svg'
import philipOreopoulosPhoto from './assets/philip_oreopoulos_pfp.png'
import carolinaNobrePhoto from './assets/carolina_nobre_pfp.jpg'
import nihalHaquePhoto from './assets/nihal_haque_pfp.png'
import zainMustafaPhoto from './assets/zain_mustafa_pfp.webp'
import idoBenHaimPhoto from './assets/ido_ben_haim_pfp.jpg'
import zoeyZhangPhoto from './assets/zoey_zhang_pfp.png'
import ilyaMusabirovPhoto from './assets/ilya_musabirov_pfp.jpg'
import nanMessePhoto from './assets/nan_messe_pfp.jpg'
import juhoLeinonenPhoto from './assets/juho_leinonen_pfp.jpg'
import paulDennyPhoto from './assets/paul_denny_pfp.png'
import viktoriaPammerSchindlerPhoto from './assets/viktoria_pammer_schindler_pfp.jpg'
import ritaGarciaPhoto from './assets/rita_garcia_pfp.jpg'
import johnStamperPhoto from './assets/john_stamper_pfp.webp'
import alexanderSteinmaurerPhoto from './assets/alexander_steinmaurer_pfp.jpg'
import paulVrbikPhoto from './assets/paul_vrbik_pfp.jpg'
import anastasiiaBirilloPhoto from './assets/anastasiia_birillo_pfp.png'
import ruiweiXiaoPhoto from './assets/ruiwei_xiao_pfp.webp'
import sebastianGuertlPhoto from './assets/sebastian_guertl_pfp.jpg'
import christopherEatonPhoto from './assets/christopher_eaton_pfp.webp'
import oscarKarnalimPhoto from './assets/oscar_karnalim_pfp.png'
import markoChoiPhoto from './assets/marko_choi_pfp.jpg'
import rhettAminPhoto from './assets/rhett_amin_pfp.jpg'
import suqingLiuPhoto from './assets/suqing_liu_pfp.jpg'
import stephenClarkPhoto from './assets/stephen_clark_pfp.png'
import muniyaFallahPhoto from './assets/muniya_fallah_pfp.jpg'
import nicholasChingPhoto from './assets/nicholas_ching_pfp.jpg'
import maksymWoychyshynPhoto from './assets/maksym_woychyshyn_pfp.jpg'
import yuriNovielloPhoto from './assets/yuri_noviello_pfp.png'
import yuvaanshKapilaPhoto from './assets/yuvaansh_kapila_pfp.png'
import carlosPhoto from './assets/carlos_suarez_pfp.png'
import joshuaPhoto from './assets/joshua_barkovic_pfp.jpg'
import francoPhoto from './assets/franco_ortiz_pfp.jpg'
import nathanPhoto from './assets/nathan_taback_pfp.jpg'
import zezhuYu from './assets/zezhu_yu_pfp.jpg'
import deluckshanMurugesu from './assets/deluckshan_murugesu_pfp.jpg'
import yousefBulbulia from './assets/yousef_bulbulia_pfp.jpg'
import franyaFranek from '.assets/frantisek_franek_pfp.jpg'

export const normalizeMemberName = (name) => String(name || '').trim().toLowerCase()

export const getMemberAuthorNames = (person) =>
  [person.name, ...(person.aliases || [])].filter(Boolean)

/**
 * Everyone nested under this team group is external to the lab. Project pages
 * split their people on it, so the split follows the team page rather than
 * being maintained a second time alongside it.
 */
export const COLLABORATOR_GROUP_ID = 'frequent-collaborators'

export const isCollaborator = (person) =>
  person.groupId === COLLABORATOR_GROUP_ID ||
  person.parentGroupId === COLLABORATOR_GROUP_ID

/**
 * A `position` reads "role — Institution", so the institution is already in the
 * member record and does not need restating. Set `institution` explicitly on
 * the few people whose position names no institution at all.
 */
export const getMemberInstitution = (person) =>
  person.institution || person.position?.split('—').at(-1).trim() || ''

const basicProfile = (name, slug, position, details = {}) => ({
  name,
  slug,
  image: defaultPhoto,
  position,
  bio: '',
  website: '',
  googlescholar: '',
  email: '',
  linkedin: '',
  ...details,
})

export const directors = [
  {
    name: 'Michael Liut',
    slug: 'michael_liut',
    image: michaelPhoto,
    position: 'Co-Director, CORE Lab; Associate Professor, Teaching Stream — University of Toronto Mississauga',
    bio: 'Michael Liut is a CORE Lab Co-Director, Associate Professor, Teaching Stream, and Computer Science Community Advisor at the University of Toronto Mississauga. His research focuses on computing education, applied AI and machine learning, adaptive educational technologies, data systems, algorithms, and student behaviour.',
    website: 'https://www.michaelliut.ca/',
    googlescholar: 'https://scholar.google.com/citations?user=Jf8s0dMAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['1397294204', '2403113147', '2326232751'],
    email: 'michael.liut@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/mliut/',
  },
  {
    name: 'Angela Zavaleta Bernuy',
    slug: 'angela_zavaleta_bernuy',
    image: angelaPhoto,
    position: 'Co-Director, CORE Lab; Assistant Professor, Computing and Software — McMaster University',
    aliases: [
      'Angela M. Zavaleta Bernuy',
      'Angela Zavaleta-Bernuy',
      'Angela M. Zavaleta-Bernuy',
    ],
    bio: 'Angela Zavaleta Bernuy is a CORE Lab Co-Director and Assistant Professor in Computing and Software at McMaster University. Her research combines computing education and human-computer interaction to design intelligent educational technologies and better support student learning in computing.',
    website: 'https://angelazb.github.io/',
    googlescholar: 'https://scholar.google.com/citations?user=Toos7YkAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['1508784636'],
    email: 'zavaleta@mcmaster.ca',
    linkedin: 'https://www.linkedin.com/in/angela-zavaleta-bernuy/',
  },
]

export const facultyIndustryPartners = [
  {
    name: 'Andrew Petersen',
    slug: 'andrew_petersen',
    image: andrewPhoto,
    position: 'Professor, Teaching Stream',
    institution: 'University of Toronto Mississauga',
    aliases: ['A. Peterson'],
    bio: 'Andrew Petersen is a Professor, Teaching Stream at the University of Toronto Mississauga. His research focuses on introductory computer science education, educational data mining, assessment, classroom interventions, and learning tools such as PCRS.',
    website: 'https://utmandrew.bitbucket.io/',
    googlescholar: 'https://scholar.google.com/citations?user=Aox39roAAAAJ&hl=en',
    semanticScholarAuthorIds: ['47790339', '2283147529'],
    email: 'andrew.petersen@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/andrew-petersen-989b1821/',
  },
  {
    name: 'Lisa Zhang',
    slug: 'lisa_zhang',
    image: lisaPhoto,
    position: 'Associate Professor, Teaching Stream, Computer Science — University of Toronto Mississauga',
    bio: 'Lisa Zhang is an Associate Professor, Teaching Stream, in Computer Science at the University of Toronto Mississauga, with cross-appointments at the Institute for the Study of University Pedagogy and the Institute for Management and Innovation. Her work focuses on machine learning and computing education, including AI education, writing instruction, and undergraduate research mentorship.',
    website: 'https://www.cs.toronto.edu/~lczhang/',
    googlescholar: 'https://scholar.google.com/citations?user=xSTQSikAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['2155671686', '2107938983', '2237733499', '2107938947'],
    email: 'lczhang@cs.toronto.edu',
    linkedin: 'https://www.linkedin.com/in/lisaczhang/',
  },
  {
    name: 'Bogdan Simion',
    slug: 'bogdan_simion',
    image: bogdanPhoto,
    position: 'Associate Professor, Teaching Stream; Associate Chair, Computer Science — University of Toronto Mississauga',
    bio: 'Bogdan Simion is an Associate Professor, Teaching Stream, and Associate Chair of Computer Science at the University of Toronto Mississauga. His research examines active learning, group work, help-seeking, problem solving, writing instruction, productive failure, and language models in computer science education.',
    website: 'https://www.cs.toronto.edu/~bogdan/',
    googlescholar: 'https://scholar.google.com/citations?user=-ObySCYAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['2283145564', '3286344'],
    email: 'bogdan.simion@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/bogdan-simion-1113b27/',
  },
  {
    name: 'Tingting Zhu',
    slug: 'tingting_zhu',
    image: tingtingPhoto,
    position: 'Assistant Professor, Teaching Stream; Geospatial Data Science Program Director & Advisor — University of Toronto Mississauga',
    bio: 'Tingting Zhu is an Assistant Professor, Teaching Stream, and Geospatial Data Science Program Director & Advisor at the University of Toronto Mississauga, with appointments in Computer Science and Geographic Information Science. Her research explores storytelling, generative AI, competency-based curricula, and experiential learning in computing and geography education.',
    website: 'https://sites.utm.utoronto.ca/tzhu/',
    googlescholar: 'https://scholar.google.com/citations?user=_mv3818AAAAJ&hl=en',
    semanticScholarAuthorIds: ['2223929892'],
    email: 'tingting.zhu@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/tingtingzhuphd/',
  },
  {
    name: 'Andi Bergen',
    slug: 'andi_bergen',
    image: andiPhoto,
    position: 'Assistant Professor, Teaching Stream, Computer Science — University of Toronto Mississauga',
    aliases: ['Andreas Bergen'],
    bio: 'Andi Bergen is an Assistant Professor, Teaching Stream, in Computer Science at the University of Toronto Mississauga. His computing education work includes embedding writing instruction across the computer science curriculum and investigating how small language models and retrieval-augmented generation can support student learning.',
    website: '',
    googlescholar: 'https://scholar.google.com/citations?user=NLqbcZkAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['2210504384'],
    email: 'andi.bergen@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/anbergen/',
  },
  {
    name: 'Brian Harrington',
    slug: 'brian_harrington',
    image: brianPhoto,
    position: 'Professor, Teaching Stream — University of Toronto Scarborough',
    bio: 'Brian Harrington is a Professor, Teaching Stream at the University of Toronto Scarborough. His research focuses on CS pedagogy and undergraduate education, including the non-technical skills that help students succeed in academia and industry.',
    website: 'https://www.brianharrington.net/',
    googlescholar: 'https://scholar.google.com/citations?user=uYCeHkcAAAAJ&hl=en&oi=ao',
    semanticScholarAuthorIds: ['2333432396'],
    email: 'brian.harrington@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/brian-harrington-utsc/',
  },
  basicProfile(
    'Anastasiia Birillo',
    'anastasiia_birillo',
    'Head of Education Research — JetBrains',
    {
      image: anastasiiaBirilloPhoto,
      bio: 'Anastasiia Birillo leads education research at JetBrains. Her work focuses on AI-supported programming education, including intelligent hints, in-IDE learning experiences, debugging support, automated feedback, and tools that help learners improve code quality.',
      website: 'https://nbirillo.github.io/',
      imageSource: 'https://nbirillo.github.io/',
    }
  ),
  basicProfile(
    'Philip Oreopoulos',
    'philip_oreopoulos',
    'Professor, Economics and Public Policy — University of Toronto',
    {
      aliases: ['Philip Oreopolos'],
      image: philipOreopoulosPhoto,
      bio: 'Philip Oreopoulos is a Professor of Economics and Public Policy at the University of Toronto. His research in labour economics, applied econometrics, and the economics of education often uses large-scale field experiments and behavioural economics to study education policy and student outcomes.',
      website: 'https://oreopoulos.faculty.economics.utoronto.ca/',
      googlescholar: 'https://scholar.google.com/citations?user=U9eJA3wAAAAJ&hl=en&oi=ao',
      email: 'oreo@economics.utoronto.ca',
      linkedin: 'https://ca.linkedin.com/in/philip-oreopoulos-7321678',
      imageSource: 'https://www.rotman.utoronto.ca/faculty-and-research/research-centres/behavioural-economics-in-action-at-rotman/people/',
    }
  ),
  basicProfile(
    'Christopher Eaton',
    'christopher_eaton',
    'Associate Professor, Teaching Stream; Associate Director, Research, ISUP — University of Toronto Mississauga',
    {
      image: christopherEatonPhoto,
      bio: 'Christopher Eaton is an Associate Professor, Teaching Stream, and Associate Director, Research, at UTM’s Institute for the Study of University Pedagogy. His scholarship connects writing studies, curriculum design, multimodal assessment, and emerging educational technologies, with recent work on generative AI, small language models, and AI literacy.',
      website: 'https://www.utm.utoronto.ca/isup/people/christopher-eaton',
      googlescholar: 'https://scholar.google.com/citations?user=jQ0pKe4AAAAJ&hl=en&oi=ao',
      email: 'chris.eaton@utoronto.ca',
      imageSource: 'https://www.utm.utoronto.ca/isup/people/christopher-eaton',
    }
  ),
  basicProfile(
    'Carolina Nobre',
    'carolina_nobre',
    'Assistant Professor, Computer Science — University of Toronto',
    {
      image: carolinaNobrePhoto,
      bio: 'Carolina Nobre is an Assistant Professor in Computer Science at the University of Toronto. Her research focuses on data visualization, particularly user-adaptive interactive visualizations, multivariate networks, visual literacy, and the design of tools that help people explore and trust complex data.',
      website: 'https://carolinanobre.com/',
      googlescholar: 'https://scholar.google.com/citations?user=EPqQgk0AAAAJ&hl=en',
      email: 'cnobre@cs.toronto.edu',
      imageSource: 'https://carolinanobre.com/',
    }
  ),
  basicProfile(
    'Nihal Haque',
    'nihal_haque',
    'Geriatrician — North York General Hospital; Adjunct Assistant Professor — University of Toronto',
    {
      image: nihalHaquePhoto,
      bio: 'Nihal Haque is a geriatrician at North York General Hospital and an Adjunct Assistant Professor at the University of Toronto. His work brings human-centred AI into geriatric medicine and medical education, including tools for discharge summaries, delirium care, clinician AI literacy, and MedBot, a simulated-patient chatbot for clinical interviewing practice.',
      website: 'https://deptmedicine.utoronto.ca/news/reimagining-geriatric-care-age-artificial-intelligence',
      imageSource: 'https://deptmedicine.utoronto.ca/news/reimagining-geriatric-care-age-artificial-intelligence',
    }
  ),
  basicProfile(
    'Nathan Taback',
    'nathan_taback',
    'Professor, Teaching Stream; Associate Chair, Undergraduate; Special Advisor to the Dean — University of Toronto',
    {
      image: nathanPhoto,
      bio: 'Nathan Taback is a Professor, Teaching Stream, and Associate Chair, Undergraduate, in the University of Toronto’s Department of Statistical Sciences. He works in data science and statistics education and serves as a Special Advisor to the Dean of Arts & Science on computational and data science education.',
      website: 'https://www.statistics.utoronto.ca/people/directories/all-faculty/nathan-taback',
      googlescholar: 'https://scholar.google.com/citations?user=Ji_Iyg0AAAAJ&hl=en&oi=ao',
      email: 'nathan.taback@utoronto.ca',
    }
  ),
  basicProfile(
    'Frantisek Franek',
    'franya_franek',
    ' Professor Emeritus — McMaster University',
    {
      image: franyaFranek,
      bio: "Dr. Frantisek (Franya) Franek\n" +
              "Professor Emeritus, Department of Computing and Software, McMaster University\n\n" +
              "Frantisek \"Franya\" Franek is Professor Emeritus in the Department of Computing and Software at McMaster University, where he served as Professor of Computer Science and Mathematics from 1986 until his retirement in 2025. He holds two doctorates: an RNDr. in Cybernetics from Charles University in Prague (1976) and a Ph.D. in Mathematics from the University of Toronto (1983).\n\n" +
              "Dr. Franek's research centres on algorithms and combinatorics on words, with particular emphasis on string algorithms and the periodic and repetitive structures of strings. His broader research interests span computer science (string algorithms, compilers, databases), combinatorics (design theory and graph theory), and set theory (Boolean algebras and dynamical systems) — the latter reflected in the Balcar–Franek theorem, a foundational result on Boolean algebras that bears his name. He is a member of McMaster's Advanced Optimization Laboratory (AdvOL), and his work falls within the department's Theory of Computation specialization and the Digital & Smart Systems research cluster.\n\n" +
              "Alongside his research, Dr. Franek has been deeply committed to improving education in programming — both software engineering and computer science — as well as in database systems and in compilers and interpreters. His graduate teaching includes CAS 721: Combinatorics and Computing, covering graph theory and algorithms, combinatorial optimization, design theory, and coding theory, and CAS 758: Advanced Compiler Design and Optimization.",
      aliases: ['F. Franek', 'Franya Franek', "Frantisek Franek"],
      websites: ['https://www.cas.mcmaster.ca/~franek/index.html',
                 'https://www.eng.mcmaster.ca/cas/faculty/dr-frantisek-franya-franek/'
                ],
      email: 'franek@mcmaster.ca',
    }
  ),
]

export const currentGraduateStudents = [
  {
    name: 'Naaz Sibia',
    slug: 'naaz_sibia',
    image: naazPhoto,
    position: 'Ph.D. Candidate, Computer Science — University of Toronto',
    bio: 'Naaz is a Ph.D. student in computer science at the University of Toronto. Her research spans data visualization and computing education, including tools that help learners build stronger mental models of programming, databases, and computer systems.',
    website: 'https://www.naazsibia.com/',
    googlescholar: 'https://scholar.google.ca/citations?user=r60zG3UAAAAJ&hl=en',
    semanticScholarAuthorIds: ['2139940171'],
    email: 'naaz.sibia@utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/naaz-sibia/',
  },
  {
    name: 'Harry (Runlong) Ye',
    slug: 'harry_ye',
    image: harryPhoto,
    position: 'Ph.D. Student, Computer Science — University of Toronto',
    aliases: ['Harry Ye', 'Runlong Ye'],
    publicationName: 'Runlong Ye',
    bio: 'Harry is a Ph.D. student in computer science with the University of Toronto’s Dynamic Graphics Project. His research focuses on transparent, controllable AI systems that augment education, research, and other knowledge work.',
    website: 'https://harryye.com',
    googlescholar: 'https://scholar.google.com/citations?user=UAtfVNYAAAAJ&hl=en',
    semanticScholarAuthorIds: ['2184253123'],
    email: 'harryye@cs.toronto.edu',
    linkedin: 'https://www.linkedin.com/in/runlong-ye/',
  },
  {
    name: 'Amber Richardson',
    slug: 'amber_richardson',
    image: amberPhoto,
    position: 'Incoming Ph.D. Student, Computing and Software — McMaster University',
    bio: 'Amber is an incoming Ph.D. student in Computing and Software at McMaster University. Their research examines computing and machine-learning education, first-year writing, self-regulated learning, and student experiences with AI.',
    website: '',
    googlescholar: 'https://scholar.google.ca/citations?user=nV2mdA0AAAAJ&hl=en',
    semanticScholarAuthorIds: ['2346187807'],
    email: 'amber.richardson@mail.utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/j-amber-l-richardson/',
  },
  basicProfile(
    'Valeria Osorio Ramirez',
    'valeria_osorio_ramirez',
    'M.Eng. Student — McMaster University',
    {
      aliases: ['Valeria Ramirez Osorio'],
      publicationName: 'Valeria Ramirez Osorio',
      image: valeriaOsorioRamirezPhoto,
      bio: 'Valeria is an M.Eng. student at McMaster University whose computing education research examines how students use generative AI in computing courses and how coordinated visualizations can help novice programmers connect code with underlying concepts.',
      googlescholar: 'https://scholar.google.com/citations?user=hlp5djYAAAAJ&hl=en',
      email: 'ramirev@mcmaster.ca',
      linkedin: 'https://www.linkedin.com/in/valeria-ramirez-osorio/',
      imageSource: 'https://www.linkedin.com/in/valeria-ramirez-osorio/',
      semanticScholarAuthorIds: ['2330617206', '2382996829'],
      semanticScholarUrls: [
        'https://www.semanticscholar.org/author/Valeria-Ramirez-Osorio/2330617206',
        'https://www.semanticscholar.org/author/Valeria-Ramirez-Osorio/2382996829',
      ],
    }
  ),
  basicProfile(
    'Zezhu (Sam) Yu',
    'zezhu_sam_yu',
    'M.Eng. Student — McMaster University',
    {
      aliases: ['Zezhu Yu', 'Sam Yu'],
      publicationName: 'Zezhu Yu',
      image: zezhuYu,
      bio: 'Zezhu (Sam) Yu is an M.Eng. student at McMaster University and a graduate researcher with the CORE Lab. His work investigates how small language models and retrieval-augmented generation can provide practical, resource-conscious support in computer science courses.',
      website: 'https://www.samproduce.com/',
      linkedin: 'https://www.linkedin.com/in/zezhuyu/',
      semanticScholarAuthorIds: ['2309663951'],
      semanticScholarUrls: [
        'https://www.semanticscholar.org/author/Zezhu-Yu/2309663951',
      ],
    }
  ),
  basicProfile(
    'Deluckshan Murugesu',
    'deluckshan_murugesu',
    'Incoming M.Eng. Student — McMaster University',
    {
      bio: 'Deluckshan is an incoming M.Eng. student at McMaster University and a graduate researcher with the CORE Lab. His project experience includes full-stack and AI development, including an AI-powered patient-education chatbot designed to help people prepare for ENT surgery.',
      image: deluckshanMurugesu,
      linkedin: 'https://ca.linkedin.com/in/deluckshanmurugesu',
    }
  ),
  basicProfile(
    'Adam Kolodziejczak',
    'adam_kolodziejczak',
    'Incoming M.Eng. Student — McMaster University',
    {
      image: adamKolodziejczakPhoto,
      bio: 'Adam is an incoming M.Eng. student at McMaster University and a graduate researcher with the CORE Lab.',
      linkedin: 'https://ca.linkedin.com/in/adam-kolodziejczak-a8b1762b0',
      imageSource: 'https://www.sqrlab.ca/people/',
    }
  ),
]

export const currentUndergraduateStudents = [
  {
    name: 'Jessica Wen',
    slug: 'jessica_wen',
    image: jessicaPhoto,
    position: 'Undergraduate Researcher — University of Toronto Mississauga',
    bio: 'Jessica is an undergraduate researcher at the University of Toronto Mississauga. Her work explores how generative AI can enhance learning experiences and instructional tools in computing education.',
    website: '',
    googlescholar: 'https://scholar.google.ca/citations?user=-mvmx-IAAAAJ&hl=en&oi=sra',
    semanticScholarAuthorIds: ['2368753084'],
    email: 'jessica.wen@mail.utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/jessica-wen1021/',
  },
  {
    name: 'Khushi Malik',
    slug: 'khushi_malik',
    image: khushiPhoto,
    position: 'Undergraduate Researcher — University of Toronto Mississauga',
    bio: 'Khushi is an undergraduate researcher at the University of Toronto Mississauga. Her work spans machine learning and computing education, including self-regulated learning, regression analysis, and interdisciplinary applications of machine-learning models.',
    website: '',
    googlescholar: 'https://scholar.google.com/citations?user=o8zvj34AAAAJ&hl=en',
    semanticScholarAuthorIds: ['2337137118'],
    email: 'khushi.malik@mail.utoronto.ca',
    linkedin: 'https://www.linkedin.com/in/khushi-malik19/',
  },
  basicProfile(
    'Uzima Malik',
    'uzima_malik',
    'Undergraduate Student — University of Toronto Mississauga',
    {
      image: uzimaMalikPhoto,
      bio: 'Uzima is a fourth-year computer science specialist at the University of Toronto Mississauga, with minors in business and mathematics. Uzima’s interests include software development, artificial intelligence, cloud computing, and machine learning.',
      website: 'https://www.uzimamalik.com/',
      linkedin: 'https://www.linkedin.com/in/uzima-m/',
      imageSource: 'https://www.uzimamalik.com/',
    }
  ),
  basicProfile(
    'Emmanuel Deza',
    'emmanuel_deza',
    'Undergraduate Student — CORE Lab',
    {
      bio: 'Emmanuel is an undergraduate student working with the CORE Lab.',
    }
  ),
  basicProfile(
    'Kelvin Leung',
    'kelvin_leung',
    'Undergraduate Student — CORE Lab',
    {
      bio: 'Kelvin is an undergraduate student working with the CORE Lab on research and development in computing and education.',
    }
  ),
  basicProfile(
    'Jingcheng Liang',
    'jingcheng_liang',
    'Undergraduate Student — CORE Lab',
    {
      bio: 'Jingcheng is an undergraduate student working with the CORE Lab on research and development in computing and education.',
    }
  ),
  basicProfile(
    'Lukas Oreopoulos',
    'lukas_oreopoulos',
    'Undergraduate Student — CORE Lab',
    {
      bio: 'Lukas is an undergraduate student working with the CORE Lab on research and development in computing and education.',
      website: 'https://kangleelab.com/current-students',
    }
  ),
  basicProfile(
    'Zain Mustafa',
    'zain_mustafa',
    'Undergraduate Researcher — University of Toronto Mississauga',
    {
      image: zainMustafaPhoto,
      bio: 'Zain is an undergraduate researcher at the University of Toronto Mississauga. His work spans machine learning, computer vision, efficient model design, learning theory, and interdisciplinary applications of machine learning.',
      website: 'https://www.utm.utoronto.ca/ramsey-lab/people/zain-mustafa',
      linkedin: 'https://ca.linkedin.com/in/cszainmustafa',
      imageSource: 'https://www.utm.utoronto.ca/ramsey-lab/people/zain-mustafa',
    }
  ),
]

export const softwareDevelopers = [
  basicProfile(
    'Marko Choi',
    'marko_choi',
    'Software Developer — CORE Lab',
    {
      image: markoChoiPhoto,
      bio: 'Marko is a software developer with the CORE Lab and a University of Toronto computer science alumnus. He contributed to QuickTA, an LLM-powered tutoring system for computer science courses, and has a professional background in full-stack development.',
      linkedin: 'https://hk.linkedin.com/in/markochoi',
      imageSource: 'https://hk.linkedin.com/in/markochoi',
    }
  ),
  basicProfile(
    'Rhett Amin',
    'rhett_amin',
    'Software Developer — CORE Lab',
    {
      image: rhettAminPhoto,
      bio: 'Rhett is a software developer with the CORE Lab and a technical product leader with experience in backend APIs, cloud infrastructure, and full-stack development. He studied computer science at McMaster University, where he led student technology initiatives and contributed to computing education research.',
      linkedin: 'https://ca.linkedin.com/in/rhettamin',
      imageSource: 'https://ca.linkedin.com/in/rhettamin',
    }
  ),
  basicProfile(
    'Josh Barkovic',
    'josh_barkovic',
    'Software Developer — CORE Lab',
    {
      image: joshuaPhoto,
      aliases: ['Joshua Barkovic'],
      bio: 'Josh is a software developer with the CORE Lab and a McMaster University software engineering alumnus. His graduate research focused on fault-aware sensor fusion and autonomous-vehicle safety, complementing his experience building production software systems.',
      linkedin: 'https://ca.linkedin.com/in/jbarkovic',
    }
  ),
]

export const formerGraduateStudents = [
  basicProfile(
    'Ilya Musabirov',
    'ilya_musabirov',
    'CORE Lab Alumni — Former Ph.D. Student',
    {
      currentPosition: 'Now Assistant Professor at UBC',
      image: ilyaMusabirovPhoto,
      bio: 'Ilya is a former CORE Lab Ph.D. student and is now an Assistant Professor of Teaching at UBC.',
      website: 'https://www.cs.ubc.ca/people/ilya-musabirov',
      email: 'ilya@musabirov.info',
      imageSource: 'https://www.cs.ubc.ca/people/ilya-musabirov',
    }
  ),
  basicProfile(
    'Suqing Liu',
    'suqing_liu',
    'CORE Lab Alumni — Former M.Eng. Student',
    {
      currentPosition: 'Now at Meta',
      aliases: ['Suqing Richard Liu', 'Richard Liu'],
      image: suqingLiuPhoto,
      bio: 'Suqing is a former CORE Lab M.Eng. student and is now at Meta.',
      website: 'https://suqingliu.com/',
      linkedin: 'https://www.linkedin.com/in/suqing-richard-liu-22aa05204',
      imageSource: 'https://suqingliu.com/',
    }
  ),
]

export const formerUndergraduateStudents = [
  basicProfile(
    'Muniya Fallah',
    'muniya_fallah',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      image: muniyaFallahPhoto,
      bio: 'Muniya is a former CORE Lab undergraduate researcher.',
      linkedin: 'https://ca.linkedin.com/in/muniya-fallah-b641632a6',
      imageSource: 'https://www.eng.mcmaster.ca/news/scholarship-stories-empowering-students-to-pursue-their-passions-at-mcmaster-engineering/',
    }
  ),
  basicProfile(
    'Nicholas Ching',
    'nicholas_ching',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      currentPosition: 'Now Embedded Software Engineering Intern at Cisco',
      image: nicholasChingPhoto,
      bio: 'Nicholas is a former CORE Lab undergraduate researcher and is now an Embedded Software Engineering Intern at Cisco.',
      website: 'https://www.nicholasching.ca/',
      linkedin: 'https://ca.linkedin.com/in/n-ching',
      imageSource: 'https://www.nicholasching.ca/',
    }
  ),
  basicProfile(
    'Ido Ben Haim',
    'ido_ben_haim',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      currentPosition: 'Now Machine Learning R&D Engineer at Exhilarare',
      image: idoBenHaimPhoto,
      bio: 'Ido is a former CORE Lab undergraduate researcher and is now a Machine Learning R&D Engineer at Exhilarare.',
      linkedin: 'https://ca.linkedin.com/in/idobenhaim',
      imageSource: 'https://cssc.utm.utoronto.ca/learn-more',
    }
  ),
  basicProfile(
    'Zeling (Zoey) Zhang',
    'zeling_zoey_zhang',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      aliases: ['Zeling Zhang', 'Zoey Zhang'],
      currentPosition: 'Now M.Eng at U of T',
      image: zoeyZhangPhoto,
      publicationName: 'Zeling Zhang',
      bio: 'Zeling is a former CORE Lab undergraduate researcher.',
      linkedin: 'https://www.linkedin.com/in/zoeyyyzhang/',
    }
  ),
  basicProfile(
    'Aaditya Dhingra',
    'aaditya_dhingra',
    'CORE Lab Alumni — Former Undergraduate Student',
    {
      currentPosition: 'Now at Mozilla — Software Engineer',
      bio: 'Aaditya is a former CORE Lab undergraduate student and is now a Software Engineer at Mozilla.',
      linkedin: 'https://ca.linkedin.com/in/aaditya-dhingra',
    }
  ),
  basicProfile(
    'Akhil Choraria',
    'akhil_choraria',
    'CORE Lab Alumni — Former Undergraduate Student',
    {
      bio: 'Akhil is a former CORE Lab undergraduate student.',
      linkedin: 'https://ca.linkedin.com/in/akhilchoraria',
    }
  ),
  basicProfile(
    'Franco Ortiz',
    'franco_ortiz',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      currentPosition: 'Now a Master Student in France',
      aliases: ['Franco Ortiz Luna'],
      image: francoPhoto,
      bio: 'Franco is a former CORE Lab undergraduate researcher.',
      email: 'franco.ortiz@mail.utoronto.ca',
    }
  ),
  basicProfile(
    'Maksym Woychyshyn',
    'maksym_woychyshyn',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      image: maksymWoychyshynPhoto,
      bio: 'Maksym is a former CORE Lab undergraduate researcher.',
      website: 'https://maksymw.com/',
      linkedin: 'https://ca.linkedin.com/in/maksym-woychyshyn-a14836197',
      imageSource: 'https://maksymw.com/',
    }
  ),
  basicProfile(
    'Stephen Clark',
    'stephen_clark',
    'CORE Lab Alumni — Former Undergraduate Researcher',
    {
      aliases: ['S. Clark'],
      image: stephenClarkPhoto,
      bio: 'Stephen is a former CORE Lab undergraduate researcher and University of Toronto Mississauga computer science alumnus. He contributed to SSDVis, a web-based visualization tool for teaching modern operating systems concepts.',
      linkedin: 'https://www.linkedin.com/in/stephenclark25/',
      imageSource: 'https://www.linkedin.com/in/stephenclark25/',
    }
  ),
  basicProfile(
    'Boushra Almazroua',
    'boushra_almazroua',
    'CORE Lab Alumni — Former Undergraduate Research Intern',
    {
      bio: 'Boushra is a former CORE Lab undergraduate research intern.',
      linkedin: 'https://sa.linkedin.com/in/boushra-al-mazroua-35473b252',
    }
  ),
  basicProfile(
    'Yashika Jain',
    'yashika_jain',
    'CORE Lab Alumni — Former Undergraduate Student',
    {
      bio: 'Yashika is a former CORE Lab undergraduate student.',
      linkedin: 'https://ca.linkedin.com/in/yashika-jain-1705',
    }
  ),
  basicProfile(
    'Yousef Bulbulia',
    'yousef_bulbulia',
    'CORE Lab Alumni — Former Undergraduate Student',
    {
      bio: 'Yousef is a former CORE Lab undergraduate student.',
      image: yousefBulbulia,
      linkedin: 'https://ca.linkedin.com/in/yousef-bulbulia',
    }
  ),
]

export const facultyCollaborators = [
  basicProfile(
    'Carlos Aníbal Suárez',
    'carlos_anibal_suarez',
    'Professor — Escuela Superior Politécnica del Litoral (ESPOL), Ecuador',
    {
      aliases: ['Carlos Aníbal Suárez', 'Carlos Anibal Suarez', 'C. Suárez', 'C. Suarez', 'Aníbal Suárez', 'Anibal Suarez', 'CA Suárez', 'CA Suarez', 'Carlos Aníbal Suárez Hernandez', 'Carlos Anibal Suarez Hernandez', 'Carlos Suárez Hernandez', 'Carlos Suarez Hernandez', 'Carlos Hernandez', 'CA Suárez Hernandez', 'CA Suarez Hernandez', 'C. Suárez Hernandez', 'C. Suarez Hernandez', 'Carlos Suarez Hernandez'],
      image: carlosPhoto,
      bio: 'Carlos Aníbal Suárez is a professor at Escuela Superior Politécnica del Litoral (ESPOL) in Ecuador and a collaborator with the CORE Lab.',
      googlescholar: 'https://scholar.google.com/citations?user=2KaJJDIAAAAJ&hl=en&oi=ao',
    }
  ),
  basicProfile(
    'Nan Messe',
    'nan_messe',
    'Assistant Professor — Université Toulouse–Jean Jaurès; Researcher — IRIT',
    {
      image: nanMessePhoto,
      bio: 'Nan Messe is an Assistant Professor at Université Toulouse–Jean Jaurès and a researcher at IRIT. Her work spans software and systems engineering, security-by-design, model-driven engineering, and methods for integrating threat and risk analysis into the development of complex systems.',
      website: 'https://nanzhangmesse.github.io/',
      email: 'nan.messe@irit.fr',
      imageSource: 'https://nanzhangmesse.github.io/',
    }
  ),
  basicProfile(
    'Oscar Karnalim',
    'oscar_karnalim',
    'Vice Rector I, Academic and Research; Associate Professor — Maranatha Christian University',
    {
      image: oscarKarnalimPhoto,
      bio: 'Oscar Karnalim is Vice Rector I for Academic and Research and an Associate Professor in Informatics Engineering at Maranatha Christian University. His research spans software engineering and learning technologies, including generative AI, programming assessment, source-code similarity, and academic integrity.',
      website: 'https://www.maranatha.edu/direktori-dosen/oscar-karnalim/',
    }
  ),
  basicProfile(
    'Juho Leinonen',
    'juho_leinonen',
    'Assistant Professor — Aalto University',
    {
      image: juhoLeinonenPhoto,
      bio: 'Juho Leinonen is an Assistant Professor at Aalto University. His research combines educational technology, artificial intelligence, and learning analytics, with a focus on large language models for learning, automated support for programming students, and learnersourcing approaches that turn student activity into reusable learning resources.',
      website: 'https://www.aalto.fi/en/people/juho-leinonen',
      email: 'juho.2.leinonen@aalto.fi',
      imageSource: 'https://www.aalto.fi/en/people/juho-leinonen',
    }
  ),
  basicProfile(
    'Paul Denny',
    'paul_denny',
    'Professor, Computer Science — University of Auckland',
    {
      image: paulDennyPhoto,
      bio: 'Paul Denny is a Professor of Computer Science at the University of Auckland. His research explores collaborative learning, student-generated resources, programming education, and large language models in teaching and assessment, and he is a co-creator of the PeerWise learning platform.',
      website: 'https://www.cs.auckland.ac.nz/~paul/',
      email: 'paul@cs.auckland.ac.nz',
      imageSource: 'https://www.cs.auckland.ac.nz/~paul/',
    }
  ),
  basicProfile(
    'Viktoria Pammer-Schindler',
    'viktoria_pammer_schindler',
    'Associate Professor; Deputy Head, Human-Centred Computing — Graz University of Technology',
    {
      image: viktoriaPammerSchindlerPhoto,
      bio: 'Viktoria Pammer-Schindler is an Associate Professor and Deputy Head of the Institute of Human-Centred Computing at Graz University of Technology. She studies digital and AI-based interactive systems from socio-technical and learning perspectives, with an emphasis on human agency, co-design, and mixed-methods research.',
      website: 'https://www.staff.tugraz.at/viktoria.pammer-schindler/',
      email: 'viktoria.pammer-schindler@tugraz.at',
      imageSource: 'https://www.staff.tugraz.at/viktoria.pammer-schindler/',
    }
  ),
  basicProfile(
    'Rita Garcia',
    'rita_garcia',
    'Adjunct Research Fellow — Victoria University of Wellington',
    {
      image: ritaGarciaPhoto,
      bio: 'Rita Garcia is an Adjunct Research Fellow at Victoria University of Wellington. Her computing education research includes replication studies, collaborative learning, and the development of professional and teamwork dispositions in software engineering and computer science students.',
      website: 'https://ecs.wgtn.ac.nz/Main/RitaGarcia',
      email: 'rita.garcia@vuw.ac.nz',
      imageSource: 'https://ecs.wgtn.ac.nz/Main/RitaGarcia',
    }
  ),
  basicProfile(
    'John Stamper',
    'john_stamper',
    'Associate Professor; Director, METALS — Carnegie Mellon University',
    {
      image: johnStamperPhoto,
      bio: 'John Stamper is an Associate Professor in Carnegie Mellon University’s Human-Computer Interaction Institute and Director of the METALS program. His research focuses on educational data mining, intelligent tutoring systems, and data-driven learning technologies, and includes leadership of the PSLC DataShop educational data repository.',
      website: 'https://hcii.cmu.edu/people/john-stamper',
      email: 'john@stamper.org',
      imageSource: 'https://hcii.cmu.edu/people/john-stamper',
    }
  ),
  basicProfile(
    'Alexander Steinmaurer',
    'alexander_steinmaurer',
    'Postdoctoral Researcher; Program Coordinator — IT:U',
    {
      image: alexanderSteinmaurerPhoto,
      bio: 'Alexander Steinmaurer is a postdoctoral researcher and program coordinator at IT:U in Austria. His research spans programming education, large language models in digital education, educational data, game-based learning, and immersive technologies such as virtual and augmented reality.',
      websites: [
        'https://it-u.at/en/persons/team/alexander-steinmaurer/',
        'https://xstone93.github.io/',
      ],
      email: 'alexander.steinmaurer@it-u.at',
      imageSource: 'https://it-u.at/en/persons/team/alexander-steinmaurer/',
    }
  ),
  basicProfile(
    'Paul Vrbik',
    'paul_vrbik',
    'Senior Lecturer — University of Queensland',
    {
      image: paulVrbikPhoto,
      bio: 'Paul Vrbik is a Senior Lecturer at the University of Queensland. His research and teaching interests include computing and software engineering education, live coding and problem-solving instruction, assessment design, and academic integrity in programming courses.',
      website: 'https://about.uq.edu.au/experts/16776',
      email: 'p.vrbik@uq.edu.au',
      imageSource: 'https://about.uq.edu.au/experts/16776',
    }
  ),
]

export const externalStudentsIndustryCollaborators = [
  basicProfile(
    'Ruiwei Xiao',
    'ruiwei_xiao',
    'Ph.D. Student, Human-Computer Interaction — Carnegie Mellon University',
    {
      image: ruiweiXiaoPhoto,
      bio: 'Ruiwei Xiao is a Ph.D. student in Carnegie Mellon University’s Human-Computer Interaction Institute. Her research combines intelligent tutoring systems, computing education, AI literacy, and the design of productive learner–AI collaboration.',
      website: 'https://hcii.cmu.edu/people/ruiwei-xiao',
      email: 'ruiweix@andrew.cmu.edu',
      imageSource: 'https://hcii.cmu.edu/people/ruiwei-xiao',
    }
  ),
  basicProfile(
    'Sebastian Gürtl',
    'sebastian_gurtl',
    'Researcher — Graz University of Technology',
    {
      aliases: ['Sebastian Gurtl'],
      image: sebastianGuertlPhoto,
      bio: 'Sebastian Gürtl is a researcher at Graz University of Technology. His work connects information retrieval, human-computer interaction, natural-language and multimodal models, and the use of large language models to provide feedback and support learning in computing education.',
      website: 'https://ima.or.at/en/biografie/sebastian_guertl/',
      email: 'sebastian.guertl@tugraz.at',
      imageSource: 'https://ima.or.at/en/biografie/sebastian_guertl/',
    }
  ),
  basicProfile(
    'Yuri Noviello',
    'yuri_noviello',
    'Ph.D. Candidate — Delft University of Technology',
    {
      image: yuriNovielloPhoto,
      bio: 'Yuri Noviello is a Ph.D. candidate at Delft University of Technology. His research investigates artificial intelligence in computer science education, including natural-language processing methods for generating and evaluating learning materials.',
      website: 'https://www.wis.ewi.tudelft.nl/noviello',
      email: 'y.noviello@tudelft.nl',
      imageSource: 'https://www.wis.ewi.tudelft.nl/noviello',
    }
  ),
  basicProfile(
    'Yuvaansh Kapila',
    'yuvaansh_kapila',
    'Student Developer; External Collaborator — CORE Lab',
    {
      image: yuvaanshKapilaPhoto,
      bio: 'Yuvaansh is a student developer and external collaborator with the CORE Lab. His interests include web technologies, artificial intelligence, accessibility, and conversational tools that make digital experiences more accessible.',
      website: 'https://yuvaanshkapila.xyz/',
      linkedin: 'https://ca.linkedin.com/in/yuvaansh-kapila-3b4bab364',
      imageSource: 'https://www.robo-geek.ca/teaching-assistants-and-student-success-stories-stem',
    }
  ),
]

const withMemberLinks = (people, { publicationSource = false } = {}) =>
  people.map(person => ({
    ...person,
    link: `/team/${person.slug}`,
    publicationSource,
  }))

export const memberGroups = [
  {
    id: 'directors',
    title: 'Directors',
    people: withMemberLinks(directors, { publicationSource: true }),
  },
  {
    id: 'current-graduate-students',
    title: 'Current Graduate Students',
    people: withMemberLinks(currentGraduateStudents, { publicationSource: true }),
  },
  {
    id: 'current-undergraduate-students',
    title: 'Current Undergraduate Students',
    navLabel: 'Current Undergraduates',
    people: withMemberLinks(currentUndergraduateStudents, { publicationSource: true }),
  },
  {
    id: 'frequent-collaborators',
    title: 'Frequent Collaborators',
    groups: [
      {
        id: 'faculty-industry-partners',
        title: 'Faculty/Industry Partners',
        people: withMemberLinks([
          ...facultyIndustryPartners,
          ...facultyCollaborators,
        ]),
      },
      {
        id: 'collaborator-students',
        title: 'Students',
        people: withMemberLinks(externalStudentsIndustryCollaborators),
      },
    ],
  },
  {
    id: 'software-developers',
    title: 'Software Developers',
    people: withMemberLinks(softwareDevelopers),
  },
  {
    id: 'pastmembers',
    title: 'Alumni',
    groups: [
      {
        id: 'former-graduate-students',
        title: 'Graduate Alumni',
        people: withMemberLinks(formerGraduateStudents),
      },
      {
        id: 'former-undergraduate-students',
        title: 'Undergraduate Alumni',
        people: withMemberLinks(formerUndergraduateStudents),
      },
    ],
  },
]

const getGroupMembers = (group, parentGroup = null) => {
  const people = (group.people || []).map(person => ({
    ...person,
    groupId: group.id,
    groupTitle: group.title,
    parentGroupId: parentGroup?.id,
    parentGroupTitle: parentGroup?.title,
  }))

  return [
    ...people,
    ...(group.groups || []).flatMap(childGroup => getGroupMembers(childGroup, group)),
  ]
}

export const members = memberGroups.flatMap(group => getGroupMembers(group))

export const membersBySlug = Object.fromEntries(
  members.map(person => [person.slug, person])
)
