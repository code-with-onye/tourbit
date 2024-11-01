export interface TourStep {
  selector: string;
  title: string;
  content: string;
}

export interface FeatureTourProps {
  steps: TourStep[];
  onComplete: () => void;
  customStyles?: React.CSSProperties;
  persistKey?: string;
}
