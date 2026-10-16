import { MdArrowOutward } from "react-icons/md";
import type { Artwork } from "../config";
import WorkArt from "./WorkArt";

interface Props {
  artwork: Artwork;
  accent: [string, string];
  title: string;
  link: string;
}

const WorkImage = ({ artwork, accent, title, link }: Props) => {
  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} on GitHub`}
        data-cursor="disable"
      >
        <div className="work-link">
          <MdArrowOutward />
        </div>
        <div className="work-art">
          <WorkArt artwork={artwork} accent={accent} />
        </div>
      </a>
    </div>
  );
};

export default WorkImage;
