import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { FormatType, LLMType, PerplexityRequestBody, RoleType } from "../../layers/services/perplexity/types";
import { DEFAULT_TOP_N_INFLUENCERS, INFLUENCERS_SCHEMA } from "./constants";
import { InfluencersResponse } from "./types";

export class InfluencersModel {
  private readonly perplexityService = PerplexityService.instance;

  async getInfluencers(topN: number = DEFAULT_TOP_N_INFLUENCERS) {
    const influencerSchema = INFLUENCERS_SCHEMA.influencers[0];

    const requestBody: PerplexityRequestBody<InfluencersResponse> = {
      model: LLMType.Sonar,
      messages: [
        {
          role: RoleType.System,
          content: "Be precise and concise. Only output structured JSON data with the requested fields."
        },
        {
          role: RoleType.User,
          content: `
            Please perform a discovery of the top ${topN} health influencers on social media. 
            Please output a JSON object with the 'influencers' key containing an array of influencers, with the following fields: 
            ${Object.keys(influencerSchema).join(", ")}
          `
        },
      ],
      response_format: {
          type: FormatType.JsonSchema,
          json_schema: {schema: INFLUENCERS_SCHEMA},
      },
    }

    const response = await this.perplexityService.getStructuredResponse<InfluencersResponse>(requestBody);
    
    return response;
  }
}