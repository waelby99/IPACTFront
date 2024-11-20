import { Benefit } from "./Benefit";
import { Definition } from "./definition";
import { Implementation } from "./Implementation";
import { KeyFactor } from "./KeyFactor";
import { Limitation } from "./Limitation";
import { Practice } from "./Practice";

export interface Tutoriel {
    id: string;
    definitions: Definition[];
    limitations: Limitation[];
    benefits: Benefit[];
    keyFactors: KeyFactor[];
    practices: Practice[];
    implementations: Implementation[];
    
  }