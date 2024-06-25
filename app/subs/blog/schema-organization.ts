import { SUB_DOMAIN, SUB_DOMAIN_NAMES } from "@/src/constants";
import { generateUrl } from "@/src/path";

const organizationSchema = {
  "@type": "Organization",
  name: `프루퍼 ${SUB_DOMAIN_NAMES[SUB_DOMAIN.blog]}`,
  url: generateUrl("/", SUB_DOMAIN.blog),
  logo: {
    "@type": "ImageObject",
    width: 308,
    height: 60,
    url: generateUrl("/assets/images/ic_launcher.webp"),
  },
};
export default organizationSchema;
