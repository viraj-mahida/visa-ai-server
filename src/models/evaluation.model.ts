import type { InferSchemaType, Model } from "mongoose";
import mongoose, { model, Schema } from "mongoose";

const SubEvaluation = new Schema({
  subScore: {
    type: Number,
    max: 10,
    min: 0
  },
  subScoreJustification: String,
  summary: String,
  supportingMaterial: String,
  improvementNeeded: String,
  recommendation: String
}, { _id: false })

const Conclusion = new Schema({
  KeyStepsToStrengthenYourCase: String,
  FocusAreasToBoostYourApplication: String,
  TakeImmediateActionForSuccess: String
}, { _id: false })

const EvaluationSchema = new Schema({
  name: String,
  email: String,
  country: String,
  visa: String,
  ChancesOfSuccess: {
    type: Number,
    min: 0,
    max: 85
  },
  overview: String,
  conclusion: Conclusion,
  CriteriaAnalysis: {
    recognizedPrizeOrAwards: SubEvaluation,
    membershipInRecognizedAssociations: SubEvaluation,
    originalContributionsToTheField:  SubEvaluation,
    EmploymentInCriticalCapacity: SubEvaluation,
    HighSalaryOrRemuneration: SubEvaluation,
    PublishedMaterialOrMediaAboutTheBeneficiary: SubEvaluation,
    AuthorshipOfScholarlyArticles: SubEvaluation,
    JudgingParticipationInTheField: SubEvaluation
  }
}, { timestamps: true })

type IEvaluation = InferSchemaType<typeof EvaluationSchema>;

export const Evaluation = (mongoose.models.Evaluation ?? model<IEvaluation>("evaluation", EvaluationSchema)) as Model<IEvaluation>