// plugins
import Lottie from 'react-lottie';
// assets
import * as animationData from 'assets/lottieAnimations/successAnimation.json';
import './style.scss';

const defaultAuthOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function SuccessPage() {
  return (
    <div className="loading-wrapper">
      <Lottie options={defaultAuthOptions} height={200} width={200} />
      <p>Successfully synced your account.</p>
    </div>
  )
}
