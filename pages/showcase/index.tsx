import Head from "next/head";
import { PageTitle } from "../../components/atoms/PageTitle";

const webvr = `
<a-scene>
  <a-box dynamic-body position="-1 4 -3" rotation="45 45 0" color="#ffaaaa"></a-box>
  <a-plane static-body position="0 0 -4" rotation="-84 77 -78" width="6" height="6" color="#aaaaff"></a-plane>
  <a-box dynamic-body position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
  <a-plane static-body position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
  <a-sky color="#ECECEC"></a-sky>
  <a-camera position="0 2 3.7"></a-camera>
</a-scene>
`;

export default function Page() {
  return (
    <>
      <Head>
        <title>ShowCase | 火曜日のおフロ</title>
        <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
        <script src="//cdn.rawgit.com/donmccurdy/aframe-physics-system/v4.0.1/dist/aframe-physics-system.min.js"></script>
      </Head>

      <main className="grid gap-y-12">
        <PageTitle>ShowCase </PageTitle>
        <h2>
          <a href="https://aframe.io/" target="_blank">
            A-FRAME
          </a>
          で遊んでみる
        </h2>
        <div dangerouslySetInnerHTML={{ __html: webvr }}></div>
      </main>
    </>
  );
}
