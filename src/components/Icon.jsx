import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  FileText,
  FolderGit2,
  GitCompareArrows,
  ListChecks,
  PenTool,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  UserRoundSearch,
  Wrench,
} from 'lucide-react'

const registry = {
  Code2,
  BarChart3,
  BrainCircuit,
  Cloud,
  PenTool,
  ShieldCheck,
  Terminal,
  UserRoundSearch,
  Target,
  GitCompareArrows,
  Route,
  BriefcaseBusiness,
  FileText,
  ListChecks,
  FolderGit2,
  Wrench,
  AlertTriangle,
}

export default function Icon({ name, size = 20, strokeWidth = 1.9, ...rest }) {
  const Component = registry[name] || Sparkles
  return <Component size={size} strokeWidth={strokeWidth} {...rest} />
}
