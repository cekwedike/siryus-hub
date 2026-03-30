import Spline from '@splinetool/react-spline';

const PIANO_SCENE =
  'https://prod.spline.design/3octavepiano-rppcxfesaP7R0WkI3MKsSLLf/scene.splinecode';

export default function HeroSpline() {
  return (
    <Spline
      scene={PIANO_SCENE}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
