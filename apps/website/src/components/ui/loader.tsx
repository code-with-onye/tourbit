import { Loader2 } from "lucide-react";
import { FC } from "react";

interface LoaderProps {
  size?: number | string;
  color?: string;
  className?: string;
}

const Loader: FC<LoaderProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <div className={className} role="status" aria-label="Loading">
      <Loader2 size={size} color={color} className="animate-spin" />
    </div>
  );
};

export default Loader;
