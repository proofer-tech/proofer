import { Box } from "@mantine/core";
import FirstSection from "@/app/with-cto/3rd/components/Section/FirstSection";
import SecondSection from "@/app/with-cto/3rd/components/Section/SecondSection";
import ThirdSection from "@/app/with-cto/3rd/components/Section/ThirdSection";

export default function Page() {
  return (
    <Box style={{ overflowX: "hidden" }}>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </Box>
  );
}
