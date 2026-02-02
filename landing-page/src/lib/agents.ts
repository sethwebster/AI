import fs from 'fs';
import path from 'path';

export interface Agent {
  slug: string;
  name: string;
  persona: string;
  agentType: string;
  role: string;
  expertise: string[];
  useCases: string[];
}

const AGENTS_DIR = path.join(process.cwd(), '..', 'agents');

// Map of agent slugs to their display info
const AGENT_METADATA: Record<string, {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tagline: string;
}> = {
  'sentinel': {
    icon: 'Shield',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    tagline: 'Your code\'s watchdog',
  },
  'product-ux-designer': {
    icon: 'TrendingUp',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    tagline: 'World-class product design',
  },
  'docs-engineer': {
    icon: 'FileText',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    tagline: 'Documentation that ships',
  },
  'docs-architect': {
    icon: 'BookOpen',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    tagline: 'Narrative-driven documentation',
  },
  'systems-thinker': {
    icon: 'Cpu',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    tagline: 'Deep problem solver',
  },
  'compiler-expert': {
    icon: 'Layers',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    tagline: 'Language implementation specialist',
  },
  'systems-engineer': {
    icon: 'Server',
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    tagline: 'Infrastructure & reliability',
  },
  'hardware-engineer': {
    icon: 'Zap',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    tagline: 'Embedded & IoT specialist',
  },
};

function parseAgentFile(filename: string): Agent | null {
  try {
    const filePath = path.join(AGENTS_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract frontmatter-like data from markdown
    const nameMatch = content.match(/^#\s+(.+)$/m);
    const personaMatch = content.match(/\*\*Persona:\*\*\s+(.+)$/m);
    const agentTypeMatch = content.match(/\*\*Agent Type:\*\*\s+`(.+)`$/m);
    const roleMatch = content.match(/##\s+Role\s+([\s\S]+?)(?=##|$)/);
    const expertiseMatch = content.match(/##\s+Expertise\s+([\s\S]+?)(?=##|$)/);
    const whenToDeployMatch = content.match(/##\s+When to Deploy\s+([\s\S]+?)(?=##|$)/);

    if (!nameMatch || !personaMatch || !agentTypeMatch) {
      return null;
    }

    const slug = filename.replace('.md', '');
    const name = nameMatch[1].trim();
    const persona = personaMatch[1].trim();
    const agentType = agentTypeMatch[1].trim();
    const role = roleMatch ? roleMatch[1].trim() : '';

    // Extract expertise list
    const expertise: string[] = [];
    if (expertiseMatch) {
      const expertiseText = expertiseMatch[1];
      const expertiseItems = expertiseText.match(/^-\s+(.+)$/gm);
      if (expertiseItems) {
        expertise.push(...expertiseItems.map(item => item.replace(/^-\s+/, '').trim()).slice(0, 3));
      }
    }

    // Extract use cases from "When to Deploy"
    const useCases: string[] = [];
    if (whenToDeployMatch) {
      const whenText = whenToDeployMatch[1];
      const caseItems = whenText.match(/^-\s+(.+)$/gm);
      if (caseItems) {
        useCases.push(...caseItems.map(item => item.replace(/^-\s+/, '').trim()).slice(0, 3));
      }
    }

    return {
      slug,
      name,
      persona,
      agentType,
      role,
      expertise,
      useCases: useCases.length > 0 ? useCases : expertise,
    };
  } catch (error) {
    console.error(`Error parsing agent file ${filename}:`, error);
    return null;
  }
}

export async function getAgents(): Promise<Array<Agent & typeof AGENT_METADATA[string]>> {
  const files = fs.readdirSync(AGENTS_DIR)
    .filter(file => file.endsWith('.md') && file !== 'README.md');

  const agents = files
    .map(parseAgentFile)
    .filter((agent): agent is Agent => agent !== null)
    .map(agent => ({
      ...agent,
      ...(AGENT_METADATA[agent.slug] || AGENT_METADATA['sentinel']),
    }));

  // Sort by a defined order
  const order = [
    'sentinel',
    'product-ux-designer',
    'docs-engineer',
    'docs-architect',
    'systems-thinker',
    'compiler-expert',
    'systems-engineer',
    'hardware-engineer',
  ];

  return agents.sort((a, b) => {
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
}
