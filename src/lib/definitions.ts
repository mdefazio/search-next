export type IndexType = {
  id: 'string'
  name: 'string',
  type: 'string',
  health: boolean,
  connected: boolean,
  docsCount: number,
}

export type SplitPanelType = {
  title: String,
  summary: String,
  extraSummary: React.ReactNode,
}

export type InferenceType = {
  inference_id: string,
  service_settings: string,
  provider: "elasticsearch" | "OpenAI" | "Cohere" | "Hugging Face",
  indices?: number,
}

