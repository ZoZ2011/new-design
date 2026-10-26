import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";

/* ------------------------------------------------------------------ *
 *  Device dimensions (scene units — roughly 1 unit = 2.5 cm)
 * ------------------------------------------------------------------ */
const W = 3.0;
const H = 6.1;
const BODY_DEPTH = 0.26;
const BODY_BEVEL = 0.035;
const BACK_Z = BODY_DEPTH / 2 + BODY_BEVEL; // 0.165

const COLORS = {
  frame: "#7d1828",
  frameDark: "#560f19",
  backGlass: "#4e0c15",
  panel: "#63131f",
  island: "#6c1420",
  metalRing: "#2a0d12",
  metalLight: "#8b8b93",
  lens: "#05060a",
  logo: "#33060f",
};

/* ------------------------------------------------------------------ *
 *  Rounded, bevelled panel — the core building block for the phone
 * ------------------------------------------------------------------ */
function useRoundedGeometry(w: number, h: number, d: number, r: number, bevel: number) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    const rr = Math.max(0.001, Math.min(r, w / 2, h / 2));

    shape.moveTo(x + rr, y);
    shape.lineTo(x + w - rr, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + rr);
    shape.lineTo(x + w, y + h - rr);
    shape.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    shape.lineTo(x + rr, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - rr);
    shape.lineTo(x, y + rr);
    shape.quadraticCurveTo(x, y, x + rr, y);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.001, d),
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 8,
      curveSegments: 48,
      steps: 1,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }, [w, h, d, r, bevel]);

  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
}

interface PanelProps {
  w: number;
  h: number;
  d: number;
  r: number;
  bevel?: number;
  position?: [number, number, number];
  children: React.ReactNode;
}

const Panel = ({ w, h, d, r, bevel = 0.01, position = [0, 0, 0], children }: PanelProps) => {
  const geo = useRoundedGeometry(w, h, d, r, bevel);
  return (
    <mesh geometry={geo} position={position} castShadow receiveShadow>
      {children}
    </mesh>
  );
};

/* ------------------------------------------------------------------ *
 *  Camera lens stack
 * ------------------------------------------------------------------ */
const Lens = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* outer barrel */}
    <mesh rotation-x={Math.PI / 2}>
      <cylinderGeometry args={[0.25, 0.25, 0.11, 72]} />
      <meshPhysicalMaterial
        color={COLORS.metalRing}
        metalness={1}
        roughness={0.18}
        clearcoat={0.6}
        envMapIntensity={1.4}
      />
    </mesh>
    {/* polished chamfer */}
    <mesh rotation-x={Math.PI / 2} position-z={0.056}>
      <cylinderGeometry args={[0.234, 0.234, 0.012, 72]} />
      <meshPhysicalMaterial color={COLORS.metalLight} metalness={1} roughness={0.12} envMapIntensity={1.8} />
    </mesh>
    {/* black bezel */}
    <mesh rotation-x={Math.PI / 2} position-z={0.063}>
      <cylinderGeometry args={[0.207, 0.207, 0.02, 72]} />
      <meshPhysicalMaterial color="#0a0a0f" metalness={0.7} roughness={0.1} clearcoat={1} envMapIntensity={1.2} />
    </mesh>
    {/* coated front glass */}
    <mesh rotation-x={Math.PI / 2} position-z={0.072}>
      <cylinderGeometry args={[0.172, 0.172, 0.02, 72]} />
      <meshPhysicalMaterial
        color={COLORS.lens}
        metalness={0.45}
        roughness={0.03}
        clearcoat={1}
        clearcoatRoughness={0.02}
        iridescence={1}
        iridescenceIOR={1.9}
        iridescenceThicknessRange={[120, 620]}
        envMapIntensity={2.2}
      />
    </mesh>
    {/* purple lens coating ring */}
    <mesh position-z={0.081}>
      <torusGeometry args={[0.118, 0.008, 16, 72]} />
      <meshPhysicalMaterial
        color="#5b4a8f"
        metalness={1}
        roughness={0.1}
        emissive="#1a1030"
        emissiveIntensity={0.6}
        envMapIntensity={1.6}
      />
    </mesh>
    {/* pupil */}
    <mesh rotation-x={Math.PI / 2} position-z={0.084}>
      <cylinderGeometry args={[0.072, 0.072, 0.012, 56]} />
      <meshPhysicalMaterial color="#02030a" metalness={0.3} roughness={0.04} clearcoat={1} envMapIntensity={1.5} />
    </mesh>
  </group>
);

/* ------------------------------------------------------------------ *
 *  Apple logo — parsed from the official SVG contour
 * ------------------------------------------------------------------ */
const APPLE_PATH =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

const AppleLogo = ({ position, scale = 0.0235 }: { position: [number, number, number]; scale?: number }) => {
  const geometries = useMemo(() => {
    const loader = new SVGLoader();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${APPLE_PATH}"/></svg>`;
    const data = loader.parse(svg);
    const geos: THREE.ShapeGeometry[] = [];
    data.paths.forEach((p) => {
      SVGLoader.createShapes(p).forEach((shape) => {
        const g = new THREE.ShapeGeometry(shape, 24);
        g.computeBoundingBox();
        const c = new THREE.Vector3();
        g.boundingBox?.getCenter(c);
        g.translate(-c.x, -c.y, 0);
        geos.push(g);
      });
    });
    return geos;
  }, []);

  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries]);

  return (
    <group position={position} scale={[scale, -scale, scale]}>
      {geometries.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshPhysicalMaterial
            color={COLORS.logo}
            metalness={0.35}
            roughness={0.28}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ *
 *  Canvas-drawn textures (no network requests)
 * ------------------------------------------------------------------ */
const makeScreenTexture = () => {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1536;
  const ctx = c.getContext("2d")!;

  const g = ctx.createLinearGradient(0, 0, c.width, c.height);
  g.addColorStop(0, "#1b0a12");
  g.addColorStop(0.45, "#3f0f1e");
  g.addColorStop(1, "#0a0306");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, c.width, c.height);

  const glow = ctx.createRadialGradient(560, 380, 40, 560, 380, 620);
  glow.addColorStop(0, "rgba(255,96,128,0.38)");
  glow.addColorStop(0.5, "rgba(180,20,60,0.14)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.textAlign = "center";
  ctx.font = "200 190px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("9:41", 384, 440);

  ctx.font = "500 42px 'Segoe UI', system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("Monday, October 26", 384, 512);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

const makeTextTexture = (text: string) => {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "500 62px 'Segoe UI', system-ui, sans-serif";
  ctx.fillStyle = "rgba(24,3,8,0.85)";
  ctx.fillText(text, 256, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

/* ------------------------------------------------------------------ *
 *  Studio environment for physically based reflections
 * ------------------------------------------------------------------ */
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const rt = pmrem.fromScene(room as unknown as THREE.Scene, 0.035);
    scene.environment = rt.texture;
    return () => {
      rt.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);

  return null;
}

/* ------------------------------------------------------------------ *
 *  The phone
 * ------------------------------------------------------------------ */
const IPhone = () => {
  const screenTex = useMemo(makeScreenTexture, []);
  const brandTex = useMemo(() => makeTextTexture("coolmix"), []);
  useEffect(
    () => () => {
      screenTex.dispose();
      brandTex.dispose();
    },
    [screenTex, brandTex]
  );

  return (
    <group>
      {/* ---------- main chassis ---------- */}
      <Panel w={W} h={H} d={BODY_DEPTH} r={0.45} bevel={BODY_BEVEL} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={COLORS.frame}
          metalness={0.95}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.5}
        />
      </Panel>

      {/* ---------- back glass ---------- */}
      <Panel w={W - 0.13} h={H - 0.13} d={0.01} r={0.42} bevel={0.012} position={[0, 0, BACK_Z + 0.002]}>
        <meshPhysicalMaterial
          color={COLORS.backGlass}
          metalness={0.4}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.6}
        />
      </Panel>

      {/* ---------- raised lower back panel ---------- */}
      <Panel w={2.68} h={3.92} d={0.006} r={0.5} bevel={0.009} position={[0, -0.95, BACK_Z + 0.024]}>
        <meshPhysicalMaterial
          color={COLORS.panel}
          metalness={0.55}
          roughness={0.3}
          clearcoat={0.85}
          clearcoatRoughness={0.12}
          envMapIntensity={1.6}
        />
      </Panel>

      {/* ---------- camera island ---------- */}
      <Panel w={1.36} h={1.2} d={0.05} r={0.3} bevel={0.014} position={[-0.7, 2.33, BACK_Z + 0.05]}>
        <meshPhysicalMaterial
          color={COLORS.island}
          metalness={0.9}
          roughness={0.26}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          envMapIntensity={1.4}
        />
      </Panel>

      {/* ---------- three lenses ---------- */}
      <Lens position={[-1.08, 2.6, BACK_Z + 0.1]} />
      <Lens position={[-0.6, 2.42, BACK_Z + 0.1]} />
      <Lens position={[-1.06, 2.12, BACK_Z + 0.1]} />

      {/* ---------- flash ---------- */}
      <group position={[0.56, 2.62, BACK_Z + 0.02]}>
        <mesh rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.135, 0.135, 0.04, 48]} />
          <meshPhysicalMaterial color={COLORS.metalRing} metalness={1} roughness={0.2} envMapIntensity={1.4} />
        </mesh>
        <mesh rotation-x={Math.PI / 2} position-z={0.024}>
          <cylinderGeometry args={[0.105, 0.105, 0.02, 48]} />
          <meshPhysicalMaterial
            color="#f6ecd8"
            emissive="#fff3d6"
            emissiveIntensity={0.35}
            roughness={0.45}
            metalness={0.1}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* ---------- LiDAR ---------- */}
      <group position={[0.58, 2.24, BACK_Z + 0.02]}>
        <mesh rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.105, 0.105, 0.035, 48]} />
          <meshPhysicalMaterial color="#141015" metalness={0.95} roughness={0.22} envMapIntensity={1.5} />
        </mesh>
        <mesh rotation-x={Math.PI / 2} position-z={0.022}>
          <cylinderGeometry args={[0.062, 0.062, 0.012, 48]} />
          <meshPhysicalMaterial color="#050407" metalness={0.3} roughness={0.04} clearcoat={1} />
        </mesh>
      </group>

      {/* ---------- microphone dot ---------- */}
      <mesh position={[0.58, 1.95, BACK_Z + 0.016]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.028, 0.028, 0.02, 24]} />
        <meshPhysicalMaterial color="#0b070a" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ---------- Apple logo ---------- */}
      <AppleLogo position={[0, -0.62, BACK_Z + 0.039]} scale={0.0315} />

      {/* ---------- brand text ---------- */}
      <mesh position={[0, -2.62, BACK_Z + 0.039]}>
        <planeGeometry args={[1.15, 0.29]} />
        <meshPhysicalMaterial
          map={brandTex}
          transparent
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.5}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ---------- side buttons ---------- */}
      <Panel w={0.05} h={0.85} d={0.12} r={0.024} bevel={0.006} position={[W / 2 + 0.002, 0.55, 0]}>
        <meshPhysicalMaterial color={COLORS.frame} metalness={0.95} roughness={0.2} envMapIntensity={1.5} />
      </Panel>
      <Panel w={0.05} h={0.5} d={0.11} r={0.024} bevel={0.006} position={[-W / 2 - 0.002, 1.12, 0]}>
        <meshPhysicalMaterial color={COLORS.frame} metalness={0.95} roughness={0.2} envMapIntensity={1.5} />
      </Panel>
      <Panel w={0.05} h={0.5} d={0.11} r={0.024} bevel={0.006} position={[-W / 2 - 0.002, 0.55, 0]}>
        <meshPhysicalMaterial color={COLORS.frame} metalness={0.95} roughness={0.2} envMapIntensity={1.5} />
      </Panel>
      <Panel w={0.045} h={0.2} d={0.08} r={0.02} bevel={0.005} position={[-W / 2 - 0.002, 1.72, 0]}>
        <meshPhysicalMaterial color={COLORS.frameDark} metalness={0.95} roughness={0.25} envMapIntensity={1.4} />
      </Panel>

      {/* ---------- front: glass + screen ---------- */}
      <Panel w={W - 0.14} h={H - 0.14} d={0.008} r={0.42} bevel={0.008} position={[0, 0, -BACK_Z - 0.004]}>
        <meshPhysicalMaterial color="#08080a" metalness={0.6} roughness={0.06} clearcoat={1} envMapIntensity={1.2} />
      </Panel>

      <mesh position={[0, 0, -BACK_Z - 0.026]} rotation-y={Math.PI}>
        <planeGeometry args={[2.72, 5.82]} />
        <meshBasicMaterial map={screenTex} toneMapped={false} />
      </mesh>

      {/* dynamic island */}
      <Panel w={0.82} h={0.25} d={0.004} r={0.125} bevel={0.004} position={[0, 2.36, -BACK_Z - 0.032]}>
        <meshBasicMaterial color="#000000" />
      </Panel>
    </group>
  );
};

/* ------------------------------------------------------------------ *
 *  Responsive framing + gentle idle motion
 * ------------------------------------------------------------------ */
function SceneContent({ view, spin }: { view: number; spin: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const z = aspect < 0.8 ? 16.5 : aspect < 1.1 ? 14.5 : aspect < 1.5 ? 12.6 : 11.4;
    camera.position.set(0, 0, z);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);

    if (spin) {
      g.rotation.y += d * 0.55;
    } else {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, view, 4, d);
    }

    if (!reduceMotion) {
      g.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
      g.rotation.x = THREE.MathUtils.damp(
        g.rotation.x,
        Math.sin(state.clock.elapsedTime * 0.45) * 0.035,
        3,
        d
      );
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, Math.cos(state.clock.elapsedTime * 0.35) * 0.02, 3, d);
    }
  });

  return (
    <group ref={group}>
      <IPhone />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Page
 * ------------------------------------------------------------------ */
const IPhone3D = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(0);
  const [spin, setSpin] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0508] font-jakarta text-white">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,#3a0c1a_0%,#16070d_45%,#080305_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7a1430]/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* top bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to sign in
        </button>

        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Product Viewer</p>
          <p className="text-sm font-semibold tracking-tight text-white/90">iPhone · Burgundy</p>
        </div>
      </div>

      {/* 3D canvas */}
      <div className="relative z-10 h-[calc(100vh-170px)] min-h-[420px] w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMappingExposure: 1.25 }}
          camera={{ position: [0, 0, 11.4], fov: 32, near: 0.1, far: 100 }}
        >
          <Suspense fallback={null}>
            <StudioEnvironment />
            <ambientLight intensity={0.85} />
            <directionalLight position={[5, 7, 7]} intensity={2.6} />
            <directionalLight position={[-7, 2, 5]} intensity={1.35} color="#ff9fb8" />
            <directionalLight position={[0, -7, 4]} intensity={0.9} color="#ffd3dd" />
            <spotLight
              position={[3, 5, 9]}
              angle={0.9}
              penumbra={1}
              intensity={22}
              distance={30}
              color="#ffe8ee"
            />

            <SceneContent view={view} spin={spin} />

            <ContactShadows
              position={[0, -3.35, 0]}
              opacity={0.55}
              scale={14}
              blur={2.6}
              far={5}
              color="#12040a"
            />
            <OrbitControls
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              minDistance={7}
              maxDistance={22}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI * 2) / 3}
            />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center">
          <p className="text-[11px] font-medium text-white/35">Drag to rotate · Scroll to zoom</p>
        </div>
      </div>

      {/* bottom controls */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 px-5 pb-8 pt-2 sm:gap-3">
        <button
          onClick={() => {
            setSpin(false);
            setView(0);
          }}
          className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
            !spin && view === 0
              ? "border-white/70 bg-white text-[#1a0409]"
              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
        >
          Back
        </button>
        <button
          onClick={() => {
            setSpin(false);
            setView(Math.PI);
          }}
          className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
            !spin && view === Math.PI
              ? "border-white/70 bg-white text-[#1a0409]"
              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
        >
          Front
        </button>
        <button
          onClick={() => setSpin((s) => !s)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
            spin
              ? "border-white/70 bg-white text-[#1a0409]"
              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
        >
          <RotateCcw className={`h-3.5 w-3.5 ${spin ? "animate-spin" : ""}`} />
          Auto-rotate
        </button>
        <button
          onClick={() => {
            setSpin(false);
            setView(0);
          }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-xs font-medium text-white/45 transition hover:text-white/80"
        >
          Reset view
        </button>
      </div>
    </div>
  );
};

const IPhone3DLazy = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0b0508] text-white/70">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading 3D viewer…
      </div>
    }
  >
    <IPhone3D />
  </Suspense>
);

export default IPhone3DLazy;
