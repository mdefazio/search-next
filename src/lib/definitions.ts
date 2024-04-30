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
  provider: "elasticsearch" | "elser" | "OpenAI" | "Cohere" | "Hugging Face",
  modelType: "text-embedding" | "sparse-embedding",

}

