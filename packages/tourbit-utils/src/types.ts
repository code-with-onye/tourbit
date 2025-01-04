export interface TourStep {
  selector: string;
  title: string;
  content: string;
}

export interface FeatureTourProps {
  tourId: string;
  customStyles?: React.CSSProperties;
  persistKey?: string;
}
