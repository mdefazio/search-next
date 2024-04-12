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

export type ModelType = {
  name: string,
  description: string,
  status: "Not downloaded" | "Ready to deploy" | "Running" | "Not connected",
}

export type ProviderType = {
  name: string,
}

export type InferenceType = {
  inference_id: String,
  model: String,
  model_config: String,
  provider: "elasticsearch" | "OpenAI" | "Cohere" | "Hugging Face",
  indices?: number,
  request_total?: number,
  request_errors?: number,
  created_at?: Date,
}

