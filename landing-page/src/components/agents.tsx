import { getAgents } from "@/lib/agents"
import { AgentsClient } from "@/components/agents-client"

export async function Agents() {
  const agents = await getAgents()

  return <AgentsClient agents={agents} />
}
