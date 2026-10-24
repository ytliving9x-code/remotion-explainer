import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { ExplainerVideo } from "./Explainer";
import { PistolExplainerVideo } from "./PistolExplainer";
import { UniversalExplainerVideo } from "./UniversalExplainer";
import { XRayVideo } from "./XRayExploded";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Sci-Fi X-Ray & Exploded View 30s TikTok Template */}
      <Composition
        id="XRayExplodedTikTok"
        component={XRayVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Master 30-Second Batch Explainer Template (Vertical 9:16) */}
      <Composition
        id="UniversalExplainerTikTok"
        component={UniversalExplainerVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 30-Second TikTok Pistol Explainer (Vertical 9:16) */}
      <Composition
        id="PistolExplainerTikTok"
        component={PistolExplainerVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          accentColor: "#F59E0B",
          secondaryColor: "#38BDF8",
          warningColor: "#EF4444",
        }}
      />

      <Composition
        id="ExplainerVideo"
        component={ExplainerVideo}
        durationInFrames={660}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: "REMOTION EXPLAINER",
          topicTitle: "Lập Trình Video Với Remotion",
          topicSubtitle:
            "Biến mã nguồn React & Web thành video tương tác đỉnh cao không cần phần mềm dựng phim truyền thống.",
          accentColor: "#6366F1",
          secondaryColor: "#06B6D4",
        }}
      />

      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>

      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};

