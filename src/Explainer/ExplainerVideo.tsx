import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { ProgressBar } from "./ProgressBar";
import { SceneIntro } from "./SceneIntro";
import { SceneProblem } from "./SceneProblem";
import { SceneSolution } from "./SceneSolution";
import { SceneHighlights } from "./SceneHighlights";
import { SceneOutro } from "./SceneOutro";
import { ExplainerProps } from "./types";

export const ExplainerVideo: React.FC<ExplainerProps> = ({
  brandName = "REMOTION EXPLAINER",
  topicTitle = "Lập Trình Video Với Remotion",
  topicSubtitle = "Biến mã nguồn React & Web thành video tương tác đỉnh cao không cần phần mềm dựng phim truyền thống.",
  accentColor = "#6366F1",
  secondaryColor = "#06B6D4",
}) => {
  const frame = useCurrentFrame();

  // Determine current chapter title for the header
  let currentSection = "01 / GIỚI THIỆU";
  if (frame >= 540) {
    currentSection = "05 / KẾT LUẬN";
  } else if (frame >= 405) {
    currentSection = "04 / LỢI THẾ";
  } else if (frame >= 255) {
    currentSection = "03 / GIẢI PHÁP";
  } else if (frame >= 120) {
    currentSection = "02 / THÁCH THỨC";
  }

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#070A12",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background */}
      <Background accentColor={accentColor} secondaryColor={secondaryColor} />

      {/* Persistent Navigation & Progress Bar */}
      <ProgressBar
        currentSection={currentSection}
        brandName={brandName}
        accentColor={accentColor}
      />

      {/* Scene 1: Introduction (120 frames / 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <SceneIntro
          topicTitle={topicTitle}
          topicSubtitle={topicSubtitle}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 2: Problem & Pain Points (135 frames / 4.5s) */}
      <Sequence from={120} durationInFrames={135}>
        <SceneProblem />
      </Sequence>

      {/* Scene 3: Solution & Workflow (150 frames / 5s) */}
      <Sequence from={255} durationInFrames={150}>
        <SceneSolution />
      </Sequence>

      {/* Scene 4: Key Highlights & Metrics (135 frames / 4.5s) */}
      <Sequence from={405} durationInFrames={135}>
        <SceneHighlights />
      </Sequence>

      {/* Scene 5: Outro & Call to Action (120 frames / 4s) */}
      <Sequence from={540} durationInFrames={120}>
        <SceneOutro />
      </Sequence>
    </div>
  );
};
